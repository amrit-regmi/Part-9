import React from "react";
import { Grid, Button, Divider} from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection,NumberField, EntryTypeSelection } from "./FormField";
import {HealthCheckEntry ,OccupationalHealthcareEntry, Diagnosis, HospitalEntry } from "../types";
import { useStateValue } from "../state";

export type NewEntry = | Omit<HealthCheckEntry,"id"|"entries"> 
                       | Omit<OccupationalHealthcareEntry,"id"|"entries"> 
                       | Omit<HospitalEntry, "id" | "entries">;                 
interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const isDate =(date: string): boolean => {
  const regex = new RegExp(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
  return regex.test(date);
};

interface InitialValues {
  description: string;date: string;specialist: string;diagnosisCodes?: Array<Diagnosis['code']>;
}

const getInitialValuesForEntryType = ({description,date,specialist, diagnosisCodes}: InitialValues,entryType: NewEntry['type']): NewEntry  => {
  const baseValues = {description,date, specialist, diagnosisCodes};
  switch (entryType) {
    case "Hospital":
      return {
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        },
        ...baseValues
      };
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: 0,
        ...baseValues
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        ...baseValues
      };
   
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  const initialValuesBase: InitialValues =  {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  } ;

  

  const [initialValues,setInitalValue ] = React.useState(initialValuesBase );
  
  if(!initialValues) return null;

  return (
    <Formik
      initialValues= {{...initialValues,type:"HealthCheck",healthCheckRating:0}}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const numberError = "Invalid number / Number out of range";
        const DateError = "Date is not on required format yyyy-mm-dd";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: any= {};
        if (!values.description ) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        } else if(!isDate(values.date)){
          errors.date= DateError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type){
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }

            if (values.healthCheckRating> 3 || values.healthCheckRating< 0 || !Number.isInteger(values.healthCheckRating)) {
              errors.healthCheckRating = numberError;
            }
            break;
          
          case "Hospital":
            if(!values.discharge?.criteria){
              errors.discharge = { criteria: requiredError,...errors.discharge};
            }
            if(!values.discharge?.date){
              errors.discharge = { date: requiredError,...errors.discharge};
            } else if(!isDate(values.discharge.date)){
              errors.discharge= { date: DateError,...errors.discharge};
            }
            break;

          case "OccupationalHealthcare":
            if(!values.employerName){
              errors.employerName = requiredError;
            }

            if(values.sickLeave?.startDate || values.sickLeave?.endDate){
              
              if(!values.sickLeave.startDate){
                
                errors.sickLeave=  { startDate: requiredError,...errors.sickLeave};
              }else if(!isDate(values.sickLeave.startDate)){
                errors.sickLeave=  { startDate: DateError,...errors.sickLeave};
              }

              if(!values.sickLeave.endDate){
                errors.sickLeave=  { endDate: requiredError,...errors.sickLeave};
              }else if(!isDate(values.sickLeave.endDate)){
                errors.sickLeave=  { endDate: DateError,...errors.sickLeave};
              }
            }
            break;


        }
  
        return errors;
      }}
    >
      {({  isValid, values, dirty,setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">

            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            
            
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            /> 

            <EntryTypeSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              options= {[{value: "Hospital", label:"Hospital"}, {value: "OccupationalHealthcare" ,label:"OccupationalHealthcare"}, {value: "HealthCheck" ,label:"HealthCheck"}]}
              setinitialValues = {()=>{
                setInitalValue(getInitialValuesForEntryType(values,"OccupationalHealthcare"));
              }}
            /> 
            
          
            {(values.type ==="HealthCheck") &&
              <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
             
            
          } 

          {values.type ==="OccupationalHealthcare" && 
          <>
            <Field 
              label="Employer"
              name="employerName"
              component={TextField}
            />
            <label><b>Sick Leave</b></label>
            <Divider></Divider>
            <Field 
              label="Start Date"
              name="sickLeave.startDate"
              component={TextField}
            />

            <Field 
              label="End Date"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
          } 

          {values.type ==="Hospital" && 
          <>
            <label><b>Discharge</b></label>
            <Divider></Divider>
            <Field 
              fluid 
              label="Discharge Date"
              name="discharge.date"
              component={TextField}
            />
            <Field 
              label="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </>
          }
            

            
                        
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
