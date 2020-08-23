import express from 'express';
import {calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack');
} );

app.get('/bmi',(req,res) => {
  const  height= Number(req.query.height);
  const weight= Number (req.query.weight);
  if (isNaN(height) || isNaN(weight) ){
    res.status(404).json({error: " malformated parameters"});
  }else{
    const response = {weight: weight, height:height, bmi:calculateBmi(height,weight) };
    res.json(response);
  }
  
});

app.post('/exercise',(req,res)=> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 const {daily_exercises , target } : {daily_exercises: number[], target:number} = req.body;

 if (daily_exercises.length === 0 || !target){
  res.json({'error': 'parameters missing'});
  return;
 }
 
 if( !daily_exercises.every(a => !isNaN(a)) || isNaN(target)) {
  res.json({'error': 'malformatted parameters'});
  return;
 }

 const exercises = calculateExercises(daily_exercises,target);
 res.json(exercises);

});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});