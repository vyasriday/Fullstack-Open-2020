import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
	<React.Fragment>
		{props.parts.map((part, index) => (
			<Part key={index} part={part} />
		))}
	</React.Fragment>
);

const Part = (props) => (
	<p>
		{props.part.name} {props.part.exercises}
	</p>
);

const Total = (props) => (
	<p>
		Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
	</p>
);

const App = () => {
	const course = "Half Stack application development";
	const parts = [
		{
			name: "Fundamentals of React",
			exercises: 10,
		},
		{
			name: "Using props to pass data",
			exercises: 7,
		},
		{
			name: "State of a component",
			exercises: 14,
		},
	];
	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total
				exercises1={parts[0].exercises}
				exercises2={parts[1].exercises}
				exercises3={parts[2].exercises}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
