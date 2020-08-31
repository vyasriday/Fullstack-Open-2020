import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		setPersons([...persons, { name: newName }]);
		setNewName("");
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
