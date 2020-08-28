import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection,NumberField } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";

export type NewEntry = Omit<HealthCheckEntry,"id"|"entries">;
interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const isDate =(date: string): boolean => {
  const regex = new RegExp(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
  return regex.test(date);
};
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type:"HealthCheck",
        healthCheckRating: 0
      }}

      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const DateError = "Date is not on required format yyyy-mm-dd";
        const errors: { [field: string]: string } = {};
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty,setFieldValue, setFieldTouched }) => {
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
              placeholder="dd-mm-yy"
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
            
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
                        
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
