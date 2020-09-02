import React, { useState } from "react";

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
				name:{" "}
				<input type='text' value={props.newName} onChange={props.handleName} />
			</div>
			<div>
				phone:{" "}
				<input type='text' value={props.phone} onChange={props.handlePhone} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const Person = ({ person }) => (
	<p>
		{person.name} {person.phone}
	</p>
);

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: "Hridayesh",
			phone: 8128128182,
		},
	]);
	const [filteredPersons, setFilteredPersons] = useState(persons);
	const [newName, setNewName] = useState("");
	const [phone, setPhone] = useState("");
	const [filter, setFilter] = useState("");

	function handleName(event) {
		setNewName(event.target.value);
	}

	function handlePhone(event) {
		setPhone(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!checkIfNameAlreadyExists(newName, persons)) {
			setPersons([...persons, { name: newName, phone }]);
			setFilteredPersons([...filteredPersons, { name: newName, phone }]);
			setNewName("");
			setPhone("");
			return;
		}
		alert(`${newName} is already added to the phonebook.`);
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
			<h2>Phonebook</h2>
			<Filter value={filter} handleFilter={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				person={newName}
				phone={phone}
				handleName={handleName}
				handlePhone={handlePhone}
			/>
			<h2>Numbers</h2>
			{filteredPersons.map((person, index) => (
				<Person key={index} person={person} />
			))}
		</div>
	);
};

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

export default App;
