const express = require('express');
const morgan = require('morgan');
const app = express();

// json body response
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			tokens.body(req, res),
		].join(' ');
	})
);

function generateId() {
	return Math.floor(Math.random() * 100000 + 1);
}

function checkIfNameExists(name) {
	return persons.find((person) => person.name === name);
}

const PORT = 3001;
let persons = [
	{
		name: 'Hridayesh',
		number: '12121212',
		id: 1,
	},
	{
		name: 'Harsh',
		number: '1234567890',
		id: 2,
	},
	{
		name: 'Marry',
		number: '121212121',
		id: 3,
	},
	{
		name: 'Dan Abramov',
		number: '1212121212',
		id: 4,
	},
];

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	if (!person) {
		return res.status(404).send({ error: 'Not found' });
	}
	res.status(200).json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		persons = persons.filter((person) => person.id !== id);
		return res.json(person);
	}
	res.status(404).send({ error: 'Not found' });
});

app.post('/api/persons', (req, res) => {
	const body = req.body;
	if (!body.name && body.number) {
		res.status(401).send({ error: 'name and number are required parameters' });
	} else {
		if (checkIfNameExists(body.name)) {
			return res.status(401).send({ error: 'name must be unique' });
		}
		const person = {
			id: generateId(),
			name: body.name,
			number: body.number,
		};
		persons = persons.concat(person);
		res.status(201).json(person);
	}
});

app.get('/info', (req, res) => {
	const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `;
	res.send(html);
});

app.listen(PORT, () => console.log('Server listening on port ', PORT));
