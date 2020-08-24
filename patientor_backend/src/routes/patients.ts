import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';


const patientsRouter = express.Router();

patientsRouter.get('/patients',(_req,res) => {
  res.json(patientService.getPatients());     
});

patientsRouter.post('/patients',(req,res) => {
  try {
    const newPatient = toNewPatient(req.body);  
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default patientsRouter;