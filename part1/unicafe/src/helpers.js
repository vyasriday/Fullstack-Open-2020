export const getAverage = ({ good, neutral, bad }) =>
	(good + neutral * 0 + bad * -1) / getTotal({ good, neutral, bad });

export const getTotal = ({ good, neutral, bad }) => good + neutral + bad;
