import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addPerson = (person) =>
	axios.post(baseUrl, person).then((response) => response.data);

const deletePerson = (id) =>
	axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const updatePerson = (id, person) =>
	axios.put(`${baseUrl}/${id}`, person).then((response) => response.data);

export default {
	getAll,
	addPerson,
	deletePerson,
	updatePerson,
};
