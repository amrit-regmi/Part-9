import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.json('pong');
});

app.use('/api',diagnoseRouter);
app.use('/api',patientsRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});