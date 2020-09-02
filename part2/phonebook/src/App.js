import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
				number:{' '}
				<input type='text' value={props.number} onChange={props.handlePhone} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const Person = ({ person }) => (
	<p>
		{person.name} {person.number}
	</p>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [number, setNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data);
		});
	}, []);

	function handleName(event) {
		setNewName(event.target.value);
	}

	function handleNumber(event) {
		setNumber(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!checkIfNameAlreadyExists(newName, persons)) {
			setPersons([...persons, { name: newName, number }]);
			setNewName('');
			setNumber('');
			return;
		}
		alert(`${newName} is already added to the numberbook.`);
	}

	function handleFilter(event) {
		setFilter(event.target.value);
		const filteredPersons = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		setFilteredPersons(filteredPersons);
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
				handlenumber={handleNumber}
			/>
			<h2>Numbers</h2>

			{filter &&
				filteredPersons.map((person, index) => (
					<Person key={index} person={person} />
				))}
			{!filter &&
				persons.map((person, index) => <Person key={index} person={person} />)}
		</div>
	);
};

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

export default App;
