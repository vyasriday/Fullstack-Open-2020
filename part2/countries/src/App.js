import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [filter, setFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [index, setIndex] = useState();
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
				filteredCountries.map((country, i) => {
					return (
						<div key={i}>
							<p>
								<span>{country.name}</span>
								<button type='button' onClick={() => setIndex(i)}>
									show
								</button>
							</p>
						</div>
					);
				})}
			{filteredCountries.length === 1 && (
				<DisplayCountry country={filteredCountries[0]} />
			)}
			{filteredCountries.length !== 1 && typeof index === 'number' && (
				<DisplayCountry country={filteredCountries[index]} />
			)}
		</div>
	);
};

const DisplayCountry = ({ country }) => (
	<React.Fragment>
		<h2>{country.name}</h2>
		<p>capital {country.capital}</p>
		<p>population {country.population}</p>
		<h3>languages</h3>
		<ul>
			{country.languages.map((language) => (
				<li key={language.name}>{language.name}</li>
			))}
		</ul>
		<img style={{ height: '50px', width: '50px' }} src={country.flag} />
	</React.Fragment>
);

export default App;
