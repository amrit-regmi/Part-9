/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from '../types';
import {isString,isDate} from './genericTypeGuards';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object:any):NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender:parseGender(object.gender),
    occupation:parseOccupation(object.occupation),
    entries: object.entries
    
  };
};

const parseName = (name:any):string => {
 if(!name || !isString(name)){
  throw new Error(`Incorrect or missing name: ${name}`);
 }
 return name;
};

const parseDate = (dob:any):string => {
  if(!isString(dob) || !dob || !isDate(dob) ){
    throw new Error(`Incorrect or missing date of birth: ${dob}`);
  }
  return dob;

};

const parseSsn = (ssn:any):string => {
  const regex = new RegExp(/^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])\d{2}-(\d{3})(\d{1}|[a-zA-Z])?$/);
  if(!ssn || !isString(ssn) ||  !regex.test(ssn) ){
    throw new Error(`Incorrect or missing social security number: ${ssn}`);
  }
  return ssn;
  
};
const parseGender = (gender:any): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation:any):string => {
  if(!occupation  || !isString(occupation) ){
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
  
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


export default toNewPatient;