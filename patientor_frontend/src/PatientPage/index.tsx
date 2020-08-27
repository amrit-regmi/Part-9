import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { useStateValue,setPatient } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const patientId = useParams<{ id: string }>().id;
  const [{ patient }, dispatch] = useStateValue();

  const setGenderIcon = (gender: string|undefined) => {
    switch (gender) {
      case "male":
        return <Icon male name='mars' size='large' />;
      case "female":
        return <Icon female name='venus' size='large'/>;
      case "other":
        return <Icon  name='mars stroke vertical' size='large'/>;

    }
  };

  React.useEffect (() => {
    if(patient && patient.id === patientId) return;
    
    const getPatient = async () => {
      try{
        const response  =  await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
        dispatch(setPatient(response.data));
      }
      catch (e) {
        console.log(e);
      }
    };
    getPatient();

  });
  return(
   <> 
   <h3> {patient?.name } {setGenderIcon(patient?.gender)} </h3>
   <p>ssn: {patient?.ssn} <br/>
      occupation: {patient?.occupation}</p>
    </>
  );
};

export default PatientPage;