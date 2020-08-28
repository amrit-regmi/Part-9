import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { useStateValue,setPatient, addEntry } from "../state";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon,List,Card, Button} from 'semantic-ui-react';
import AddEntryModal from "../AddEntryModel";
import { NewEntry } from "../AddEntryModel/AddEntryForm";


const PatientPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const patientId = useParams<{ id: string }>().id;

  const openModal = (): void => setModalOpen(true);
  const [{ patient }, dispatch] = useStateValue();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  
  

  const setGenderIcon = (gender: string|undefined) => {
    switch (gender) {
      case "male":
        return <Icon name='mars' size='large' />;
      case "female":
        return <Icon name='venus' size='large'/>;
      case "other":
        return <Icon  name='mars stroke vertical' size='large'/>;

    }
  };

  

  React.useEffect (() => {
    if(patient && patient.id === patientId) return;
    
    const getPatient = async () => {
      try{
        const patientResponse  =  await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
        dispatch(setPatient(patientResponse.data));   
        
      }
      catch (e) {
        console.log(e);
      }
    };


    getPatient();

  });

  if(!patient) return null;

  return(
   <> 
   <h3> {patient.name } {setGenderIcon(patient.gender)} </h3>
   <p>ssn: {patient?.ssn} <br/>
      occupation: {patient.occupation}
  </p>
  <Button type="submit"
            color="green"
            onClick={() => openModal()}> 
            Add new Entry
    </Button>
    <Entries entries={patient.entries}></Entries> 
    <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getHealthRatingColor: any = (healthCheckRating: number) =>{
  switch (healthCheckRating){
    case (0):
      return "green";
    case(1):
      return "yellow";
    case(2):
      return "pink";
    case(3):
    return "red";
  }
  
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Entries: React.FC<{entries: Entry[]}> = ({entries}) => {
  


  return (
    <>
    <h4>Entries</h4>
    
    {entries.map((entry,i) => {
      return (<EntryDetails entry={entry} key={i}></EntryDetails>);
      })}
    </>
  );
};


const DiagnosisDetail: React.FC <{diagnosisCode: string}> = ({diagnosisCode}) =>{
  const [{ diagnosis }] = useStateValue();
  return(
  <List.Item as = 'li'> {diagnosisCode} {diagnosis[diagnosisCode] && diagnosis[diagnosisCode].name}</List.Item>
  );
};

const EntryDetails: React.FC <{entry: Entry}> = ({entry}) => {
  switch (entry.type){
    case "Hospital":
      return(
        <Card fluid>
          <Card.Content >
            <Card.Header>{entry.date} <Icon name= "hospital" size="large"/></Card.Header>
          </Card.Content> 
          <Card.Content description = {entry.description}/>
          <Card.Content extra>
            {entry.diagnosisCodes &&
            <List as ='ul'>
                { entry.diagnosisCodes.map((code,i) => <DiagnosisDetail  key={i} diagnosisCode ={code}/>)}
            </List>}

          </Card.Content>
          <Card.Content>
            <h5>Discharge: {entry.discharge.date} </h5>
            <Card.Meta>  {entry.discharge.criteria} </Card.Meta>
          </Card.Content>      
        </Card>    
      );
    
    case "HealthCheck":
      return(
        <Card fluid>
          <Card.Content >
            <Card.Header>{entry.date} <Icon name="user md" size="large"/></Card.Header>
          </Card.Content> 
          <Card.Content description = {entry.description}/>
          <Card.Content extra>
              
            {entry.diagnosisCodes &&
            <List as ='ul'>
                { entry.diagnosisCodes.map((code,i) => <DiagnosisDetail  key={i} diagnosisCode ={code}/>)}
            </List>}
              <Icon name="heart" color={getHealthRatingColor(entry.healthCheckRating)}/>

          </Card.Content>
    
        </Card>    
      );
    case "OccupationalHealthcare":
      return(
        <Card fluid>
          <Card.Content >
      <Card.Header>{entry.date} <Icon name="stethoscope" size="large"/>  {entry.employerName}</Card.Header>
          </Card.Content> 
          <Card.Content description = {entry.description}/>
          <Card.Content extra>     
            {entry.diagnosisCodes &&
            <List as ='ul'>
                { entry.diagnosisCodes.map((code,i) => <DiagnosisDetail  key={i} diagnosisCode ={code}/>)}
            </List>}
          </Card.Content>
          {entry.sickLeave && 
          <Card.Content>
            <h5>Sick Leave</h5>
            {entry.sickLeave.startDate} <b>to</b> {entry.sickLeave?.endDate}
          </Card.Content>  }    
        </Card>  );
    default:
      return assertNever(entry);
  }
};






/*const OccupationalHealthCare: React.FC<{entry: Entry}> =({entry}) =>{
  
};
const HealthCheck: React.FC<{entry: Entry}> =({entry}) =>{
  
};*/

export default PatientPage;