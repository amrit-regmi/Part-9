import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const patientId = useParams<{ id: string }>().id;
  const [{ patient }, dispatch] = useStateValue();

  const setGenderIcon = (gender: string|undefined) => {
    const icon = gender === "female" ? <Icon female name='venus' size='large'/> : <Icon male name='mars' size='large' />;
    return icon;
  };

  React.useEffect (() => {
    if(patient && patient.id === patientId) return;
    
    const getPatient = async () => {
      try{
        const response  =  await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
        dispatch({ type: "SET_PATIENT", payload: response.data });
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