import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => (
	<button type='button' onClick={onClick}>
		{text}
	</button>
);

function generateRandomIndex(length) {
	return Math.floor(Math.random() * length) + 1;
}

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
	function handleClick() {
		let randomIndex = generateRandomIndex(anecdotes.length - 1);
		while (randomIndex === selected) {
			randomIndex = generateRandomIndex(anecdotes.length - 1);
		}
		setSelected(randomIndex);
	}

	function handleUpvote() {
		const totalVotes = [...votes];
		totalVotes[selected] = totalVotes[selected] + 1;
		setVotes(totalVotes);
	}

	return (
		<div>
			<p>{props.anecdotes[selected]}</p>
			<p>has {votes[selected]} votes.</p>
			<Button onClick={handleUpvote} text='vote' />
			<Button onClick={handleClick} text='next anecdote' />
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
