import React, { useState } from "react";

function checkIfNameAlreadyExists(name, persons) {
	return persons.some((person) => person.name === name);
}

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [phone, setPhone] = useState("");
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

	return (
		<div>
			<h2>Phonebook</h2>
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
			{persons.map((person, index) => (
				<p key={index}>
					{person.name} {person.phone}
				</p>
			))}
		</div>
	);
};

export default App;
