import React, { useState } from "react";

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: "Hridayesh",
			phone: 8128128182,
		},
		{
			name: "Hriday",
			phone: 8128128182,
		},
		,
		{
			name: "Avenger",
			phone: 8128128182,
		},
	]);
	const [newName, setNewName] = useState("");
	const [phone, setPhone] = useState("");
	const [filter, setFilter] = useState("");
	const [filteredPersons, setFilteredPersons] = useState(persons);
	function handleSubmit(event) {
		event.preventDefault();
		if (!checkIfNameAlreadyExists(newName, persons)) {
			setPersons([...persons, { name: newName, phone }]);
			setNewName("");
			setPhone("");
			return;
		}
		alert(`${newName} is already added to the phonebook.`);
	}

	function handleName(event) {
		setNewName(event.target.value);
	}

	function handlePhone(event) {
		setPhone(event.target.value);
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
			<label>Filter shown with</label>
			<input type='text' value={filter} onChange={handleFilter} />
			<form onSubmit={handleSubmit}>
				<div>
					name: <input type='text' value={newName} onChange={handleName} />
				</div>
				<div>
					phone: <input type='text' value={phone} onChange={handlePhone} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{filteredPersons.map((person, index) => (
				<p key={index}>
					{person.name} {person.phone}
				</p>
			))}
		</div>
	);
};

export default App;
