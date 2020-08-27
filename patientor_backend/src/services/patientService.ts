import patientData from '../../data/patients';
import {Patient,NewPatientEntry, PublicPatient} from '../types';
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

export default {getPatients,addPatient,getPatient}; 