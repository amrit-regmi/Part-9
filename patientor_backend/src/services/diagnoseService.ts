import diagnoseData from '../data/diagnoses.json';
import {Diagnoses} from '../types';

const diagnosis: Array<Diagnoses> = diagnoseData;

const getDiagnoses = ():Array<Diagnoses> => {
  return diagnosis;
};

export default getDiagnoses; 