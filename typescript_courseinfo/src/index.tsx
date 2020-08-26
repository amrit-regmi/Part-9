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
  courseParts: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

interface TotalProps {
  total: number;
}

const Header: React.FC<HeaderProps> = ({courseName}) =>{
  return <h1>{courseName}</h1>
}
const Content: React.FC<ContentProps> = ({courseParts}) => {
  return (
    <>
    {courseParts.map( (content) => <p key ={content.name}> {content.name}  {content.exerciseCount}</p> )}
    </>
  )
}

  

const Total: React.FC<TotalProps> = ({total}) =>{
return <p>Number of exercises : {total}</p>
}
const App: React.FC = () => {

  const courseName = "Half Stack application development";
  const courseParts = [
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