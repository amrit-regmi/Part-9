import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';


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

patientsRouter.get('/patients/:id',(req,res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    if(patient){
      res.json(patient);
    }
    else {
      res.sendStatus(404);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

patientsRouter.post('/patients/:id/entries', (req,res)=>{
  try{
    const newEntry = toNewEntry(req.body);
    const entry = patientService.addEntry(req.params.id,newEntry);
    if(entry){
      res.json(entry);
    }
    else {
      res.sendStatus(404);
    }
  }catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }

});

export default patientsRouter;