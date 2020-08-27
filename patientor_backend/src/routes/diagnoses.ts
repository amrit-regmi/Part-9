import express from 'express';
import getDiagnoses from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/diagnosis',(_req,res) => {
  res.json(getDiagnoses());     
});

export default diagnoseRouter;


