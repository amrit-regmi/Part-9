interface result {
  periodLength : number,
  trainingDays: number,
  target: number,
  average: number,
  targetMet : boolean,
  rating : number,
  ratingDescription: string
}

export const calculateExercises = (data: Array <number>, target: number): result => {
  
  const periodLength = data.length;
  const trainingDays = data.filter(p => p !== 0).length; 
  const average = data.reduce((p,c) => p+c,0)/periodLength;

  if(isNaN(average) || isNaN(target)){
    throw new Error('Provided values were not numbers!');
  }
  
  const targetMet = average >= target ? true: false;
  const rating = targetMet? 3 : average/target > 0.8 ? 2 : 1;
  const ratingDescription = rating === 3? "Good job you met the target, keep pushing " : rating ===2 ? "Almost there, little more effort needed" : "No where near, try harder";

  return {periodLength,trainingDays,target,average,targetMet,rating,ratingDescription};
};

/*
const argv: Array <string> = process.argv.slice(3);
const target = Number(process.argv[2]);
const data: Array<number> = argv.map(n=> Number(n));

console.log(calculateExercises(data,target));*/
