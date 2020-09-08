import React, { useState, useEffect } from 'react';
import personsService from './services/persons.';
import Axios from 'axios';
const Filter = ({ value, handleFilter }) => {
	return (
		<React.Fragment>
			<label>Filter shown with</label>
			<input type='text' value={value} onChange={handleFilter} />
		</React.Fragment>
	);
};

const PersonForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				name:{' '}
				<input type='text' value={props.newName} onChange={props.handleName} />
			</div>
			<div>
				number:
				<input type='text' value={props.number} onChange={props.handlePhone} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const Person = ({ person, handleDelete }) => (
	<p>
		{person.name} {person.number}
		<button onClick={handleDelete}>delete</button>
	</p>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [number, setNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		personsService.getAll().then((persons) => {
			setPersons(persons);
		});
	}, []);

	useEffect(() => {
		const filteredPersons = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		setFilteredPersons(filteredPersons);
	}, [filter]);

	function handleName(event) {
		setNewName(event.target.value);
	}

	function handlePhone(event) {
		setNumber(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (checkIfNameAlreadyExists(newName, persons)) {
			alert(`${newName} is already added to the numberbook.`);
			return;
		}
		const newPerson = {
			name: newName,
			number,
		};
		personsService.addPerson(newPerson).then((person) => {
			setPersons([...persons, person]);
			setNewName('');
			setNumber('');
		});
	}

	function handleFilter(event) {
		setFilter(event.target.value);
	}

	function handleDelete(id) {
		const person = persons.find((person) => person.id === id);
		const shouldDelete = window.confirm(`Delete ${person.name}?`);
		if (shouldDelete) {
			personsService
				.deletePerson(id)
				.then((response) =>
					setPersons(persons.filter((person) => person.id !== id))
				);
		}
	}

	return (
		<div>
			<h2>numberbook</h2>
			<Filter value={filter} handleFilter={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				number={number}
				handleName={handleName}
				handlePhone={handlePhone}
			/>
			<h2>Numbers</h2>

			{filter &&
				filteredPersons.map((person, index) => (
					<Person
						key={person.id}
						person={person}
						handleDelete={() => handleDelete(person.id)}
					/>
				))}
			{!filter &&
				persons.map((person, index) => (
					<Person
						key={person.id}
						person={person}
						handleDelete={() => handleDelete(person.id)}
					/>
				))}
		</div>
	);
};

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

export default App;
