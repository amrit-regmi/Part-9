export const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight/Math.pow(height/100,2);
  let result = "";
  switch (true){
    case ( bmi < 18.5):
      result = "Underweight";
      break;
    case (  bmi >= 18.5  && bmi <= 24.9):
      result = "Normal (Healthy Weight)";
      break;
    case (  bmi >= 25  && bmi <= 29.9):
      result = "Overweight";
      break;
    case (  bmi >= 30.0):
      result =  "Very Overweight ";
      break; 

  }

  return result;
  
};


const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height,weight));

