const express = require('express');
const app = express();

const PORT = 3001;
const persons = [
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

app.get('/info', (req, res) => {
	const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `;
	res.send(html);
});

app.listen(PORT, () => console.log('Server listening on port ', PORT));
