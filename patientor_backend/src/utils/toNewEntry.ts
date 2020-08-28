/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {NewEntry, HealthCheckRating, Diagnosis} from '../types'; 
import {isString, isDate} from './genericTypeGuards';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object:any):NewEntry => {
  const baseEntry = {
    date: parseDate(object.date),
    specialist: parseStringField("specaialist",object.specialist),
    description: parseStringField("description",object.description),
    ...(object.diagnosisCodes && {diagnosisCodes: parseDiagnosis(object.diagnosisCodes)})
  };

  switch (object.type){
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        ...baseEntry
      };
    case "Hospital":
      return {
        type:"Hospital",
        discharge : parseDischarge(object.discharge),
        ...baseEntry
      };
    case "OccupationalHealthCheck":
      return {
        type:"OccupationalHealthcare",
        employerName: parseStringField("employerName",object.employerName),
        ...(object.sickLeave && {
          sickLeave: parseSickLeave(object.sickLeave)
        }), ...baseEntry
      };
    default:
      throw new Error(
        `Unknown or missing entry type: ${object.type}`
      );


  }

};

const parseStringField = (fieldname:string,value:any):string=>{
  if(!value || !isString(value)){
    throw new Error (`Incorrect or missing ${fieldname}: ${value}`);
  }
  return value;
};

const parseDate = (date:any):string => {
  if (!isString(date) || !isDate(date) ){
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseDiagnosis = (codes:any): Array<Diagnosis['code']> => {
  if(!Array.isArray(codes)){
    throw new Error (`Incorrect Dignosis codes type, expecting array, Got: ${codes}`);
  }
  
  codes.forEach((code)=> {
    if(!code || !isString(code)){
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;


};

const parseHealthCheckRating = (rating:any):HealthCheckRating => {
  if(!rating || ! isHealthCheckRating(rating)){
    throw new Error(`Incorrect or missing rating: ${rating}`);
  }
  return rating;
};

const parseDischarge = (discharge:any) : {date:string,criteria:string } => {
  if(! discharge){
    throw new Error(` Missing discharge information`);
  }

  if(!discharge.date || !isDate(discharge.date)){
    throw new Error(`Incorrect or missing discharge date: ${discharge.date}`);
  }

  if(!discharge.criteria || !isString(discharge.criteria)){
    throw new Error(`Incorrect or missing discharge criteria: ${discharge.criteria}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};

const parseSickLeave = (sickLeave:any) : {startDate:string,endDate:string} =>{
  if(!sickLeave){
    throw new Error(`Missing sickLeave information`);
  }
  if(!sickLeave.startDate || !isDate(sickLeave.startDate)){
    throw new Error(`Incorrect or missing sickleave start date: ${sickLeave.startDate}`);
  }
  if(!sickLeave.endDate || !isDate(sickLeave.endDate)){
    throw new Error(`Incorrect or missing sickleave end date: ${sickLeave.endDate}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return sickLeave;
};

const isHealthCheckRating = (rating:any): rating is HealthCheckRating => {
  return(Object.values(HealthCheckRating).includes(rating));
};

export default toNewEntry;