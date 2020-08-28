import diagnoseData from '../../data/diagnoses.json';
import {Diagnosis} from '../types';

const diagnosis: Array<Diagnosis> = diagnoseData;

const getDiagnoses = ():Array<Diagnosis> => {
  return diagnosis;
};

export default getDiagnoses; 