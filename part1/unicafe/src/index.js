import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, handleClick }) => (
	<button type='button' onClick={handleClick}>
		{text}
	</button>
);

const Statistics = ({ good, neutral, bad }) => (
	<>
		<p>good {good}</p>
		<p>neutral {neutral}</p>
		<p>bad {bad}</p>
	</>
);
const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	function handleGood() {
		setGood(good + 1);
	}

	function handleNeutral() {
		setNeutral(neutral + 1);
	}

	function handleBad() {
		setBad(bad + 1);
	}

	return (
		<React.Fragment>
			<Display text='give feedback' />
			<Button text='good' handleClick={handleGood} />
			<Button text='neutral' handleClick={handleNeutral} />
			<Button text='bad' handleClick={handleBad} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</React.Fragment>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
