import React, { PropsWithChildren, ReactElement, ValidationMap, WeakValidationMap } from "react";
import ReactDOM from "react-dom";

type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}


interface HeaderProps {
  courseName: string;
}
interface ContentProps {
  courseParts: Array<CoursePart>;
}

interface TotalProps {
  total: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour  {
  name: "Checking for Error";
  exerciseCount: number;
  description: string;
  newAttribute: string;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const Part: React.FC<{part: CoursePart}> = ({part}) => {
  
  switch (part.name){
    case "Fundamentals": 
      return (
        <><p> {part.name}  {part.exerciseCount}<br/>Description: {part.description} </p></>
      )
    case "Using props to pass data":
      return (
        <><p> {part.name}  {part.exerciseCount}<br/>GroupProjectCount: {part.groupProjectCount} </p></>
      )
    case "Deeper type usage":
      return (
        <><p> {part.name}  {part.exerciseCount}<br/>Description: {part.description} <br/>ExerciseSubmissionLink: {part.exerciseSubmissionLink} </p></>
      )
    case "Checking for Error":
        return (
          <><p> {part.name}  {part.exerciseCount}<br/>Description: {part.description} <br/> new attribute: {part.newAttribute} </p></>
        )
    default:
      return assertNever(part);
  }


}

const Header: React.FC<HeaderProps> = ({courseName}) =>{
  return <h1>{courseName}</h1>
}
const Content: React.FC<ContentProps> = ({courseParts}) => {
  return (
    <>
    {courseParts.map( (content) => <Part key={content.name} part={content}/>)}
    </>
  )
}

  

const Total: React.FC<TotalProps> = ({total}) =>{
return <p>Number of exercises : {total}</p>
}
const App: React.FC = () => {

  const courseName = "Half Stack application development";
  /*const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];*/

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Checking for Error",
      exerciseCount: 21,
      description: "tester ",
      newAttribute: "this is different kinf of attribute"
    }
  ];

  return (

    <div>
      <Header courseName ={courseName}></Header>
      <Content courseParts = {courseParts}></Content>
      <Total total ={courseParts.reduce((t,c) => t + c.exerciseCount,0)}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));