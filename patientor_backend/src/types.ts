export interface Diagnoses {
  code: string,
  name: string,
  latin?:string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry{
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {"startDate":string, "endDate":string }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {"date":string,"criteria":string}

}

export type Entry = 
  | HealthCheckEntry 
  | OccupationalHealthCareEntry
  | HospitalEntry;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit <Patient,'id'>;

export enum Gender {
  Male = 'male', 
  Female='female',
  Other='other'
}