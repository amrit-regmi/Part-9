import patientData from '../data/patients.json';
import {Patient,NewPatientEntry} from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData as  Array<Patient>;

const getPatients = ():Omit<Patient,'ssn'>[] => {
  return (patients.map( ({ id,name,dateOfBirth,gender ,occupation }) => ({ id,name,dateOfBirth,gender ,occupation })));
};

const addPatient = (data:NewPatientEntry):Patient => {
  const newId: string = uuid();
  const newPatient = {...data, id: newId};
  patients.push(newPatient);
  return newPatient;
};

export default {getPatients,addPatient}; 