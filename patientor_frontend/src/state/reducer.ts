import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;

    };

export const setPatientList = (patient: Patient[]): Action  => {
  return {
      type: "SET_PATIENT_LIST",
      payload: patient
    };
  };

export const addPatient = (patient: Patient): Action  => {
  return {
      type: "ADD_PATIENT",
      payload: patient
    };
  };

export const setPatient = (patient: Patient): Action  => {
  return {
      type: "SET_PATIENT",
      payload: patient
    };
  };
  
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_PATIENT":
        return {
          ...state,
          patient: {...action.payload }
        };
    default:
      return state;
  }
};
