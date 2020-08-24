import express from 'express';
import getDiagnoses from '../services/diagnoseService'

const diagnoseRouter = express.Router();

diagnoseRouter.get('/diagnoses',(_req,res) => {
  res.json(getDiagnoses());     
});

export default diagnoseRouter;


