import React from "react";

const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Total = ({ course }) => {
	const sum =
		course.parts[0].exercises +
		course.parts[1].exercises +
		course.parts[2].exercises;
	return <p>Number of exercises {sum}</p>;
};

const Part = ({ part: { name, exercises } }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Content = ({ course }) => {
	return (
		<div>
			<Part part={course.parts[0]} />
			<Part part={course.parts[1]} />
			<Part part={course.parts[2]} />
		</div>
	);
};

const Course = ({ course }) => {
	const { id, name, parts } = course;
	return (
		<React.Fragment>
			<Header name={name} />
			{parts.map((part) => (
				<Part part={part} />
			))}
		</React.Fragment>
	);
};

export default Course;
