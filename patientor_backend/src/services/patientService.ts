import patientData from '../../data/patients';
import {Patient,NewPatientEntry, PublicPatient, Entry,NewEntry} from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): PublicPatient[] => {
  return (patients.map( ({ id,name,dateOfBirth,gender ,occupation }) => ({ id,name,dateOfBirth,gender ,occupation })));
};

const getPatient = (id:string): Patient | undefined => {
  return (patients.find( patient => patient.id === id));
};

const addPatient = (data:NewPatientEntry):Patient => {
  const newId: string = uuid();
  const newPatient = {...data, id: newId};
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id:string, data:NewEntry|undefined):Entry|undefined=> {
  const newId: string = uuid();
  const newEntry= {...data, id:newId} as Entry ;
  const patient = patients.find( patient => patient.id === id);
  if(patient){
    patient.entries = [...patient.entries,newEntry];
    return  newEntry;
  }else{
    return;
  }
  
};

export default {getPatients,addPatient,getPatient,addEntry}; 