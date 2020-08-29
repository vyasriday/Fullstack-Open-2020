import React, { useState } from "react";
import ReactDOM from "react-dom";

const getAverage = ({ good, neutral, bad }) =>
	(good + neutral * 0 + bad * -1) / getTotal({ good, neutral, bad });

const getTotal = ({ good, neutral, bad }) => good + neutral + bad;
const Display = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, handleClick }) => (
	<button type='button' onClick={handleClick}>
		{text}
	</button>
);

const Statistics = ({ good, neutral, bad }) => {
	if (good || neutral || bad) {
		return <p>No Feedback given</p>;
	}
	return (
		<>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {good + neutral + bad}</p>
			<p>average {getAverage({ good, neutral, bad }) || 0}</p>
			<p>positive {`${good / getTotal({ good, neutral, bad }) || 0}%`} </p>
		</>
	);
};
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
