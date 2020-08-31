import React, { useState } from "react";

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		if (!checkIfNameAlreadyExists(newName, persons)) {
			setPersons([...persons, { name: newName }]);
			setNewName("");
			return;
		}
		alert(`${newName} is already added to the phonebook.`);
	}

	function handleName(event) {
		setNewName(event.target.value);
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input type='text' value={newName} onChange={handleName} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={index}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
