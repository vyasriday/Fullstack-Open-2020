import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [filter, setFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	function handleFilter(e) {
		setFilter(e.target.value);
	}

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		filter.length > 0
			? setFilteredCountries(
					countries.filter((country) => country.name.includes(filter))
			  )
			: setFilteredCountries([]);
	}, [filter]);

	return (
		<div>
			<label>
				find countries
				<input type='text' value={filter} onChange={handleFilter} />
			</label>
			{filteredCountries.length > 10 && (
				<p>Too many matches, specify another filter</p>
			)}
			{filteredCountries.length <= 10 &&
				filteredCountries.length > 1 &&
				filteredCountries.map((country) => <p>{country.name}</p>)}
			{filteredCountries.length === 1 && (
				<React.Fragment>
					<h2>{filteredCountries[0].name}</h2>
					<p>capital {filteredCountries[0].capital}</p>
					<p>population {filteredCountries.population}</p>
					<h3>languages</h3>
					<ul>
						{filteredCountries[0].languages.map((language) => (
							<li key={language.name}>{language.name}</li>
						))}
					</ul>
					<img
						style={{ height: '50px', width: '50px' }}
						src={filteredCountries[0].flag}
					/>
				</React.Fragment>
			)}
		</div>
	);
};

export default App;
