import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getTotal, getAverage } from "./helpers";

const Display = ({ text }) => <h2>{text}</h2>;

const Button = ({ text, handleClick }) => (
	<button type='button' onClick={handleClick}>
		{text}
	</button>
);

const Statistic = ({ text, value }) => (
	<td>
		{text} {value}
	</td>
);

const Statistics = ({ good, neutral, bad }) => {
	if (!good && !neutral && !bad) {
		return <p>No Feedback given</p>;
	}
	return (
		<table>
			<tbody>
				<tr>
					<Statistic text='good' value={good} />
				</tr>
				<tr>
					<Statistic text='neutral' value={neutral} />
				</tr>
				<tr>
					<Statistic text='bad' value={bad} />
				</tr>
				<tr>
					<Statistic text='all' value={good + neutral + bad} />
				</tr>
				<tr>
					<Statistic
						text='average'
						value={getAverage({ good, neutral, bad }) || 0}
					/>
				</tr>
				<tr>
					<Statistic
						text='positive'
						value={`${good / getTotal({ good, neutral, bad }) || 0}%`}
					/>
				</tr>
			</tbody>
		</table>
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
