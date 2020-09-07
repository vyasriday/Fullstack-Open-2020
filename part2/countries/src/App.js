import React, { useState, useEffect, Children } from 'react';
import axios from 'axios';

const weatherAPIURL = 'http://api.weatherstack.com/current';
const API_KEY = process.env.REACT_APP_WEATHER_API;
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
				<React.Fragment>
					<DisplayCountry country={filteredCountries[0]} />
					<DisplayWeather city={filteredCountries[0].capital} />
				</React.Fragment>
			)}
			{filteredCountries.length !== 1 && typeof index === 'number' && (
				<DisplayCountry country={filteredCountries[index]} />
			)}
		</div>
	);
};

const DisplayCountry = ({ country, children }) => (
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
		{children}
	</React.Fragment>
);

const DisplayWeather = ({ city }) => {
	const [weatherInfo, setWeatherInfo] = useState();
	useEffect(() => {
		axios
			.get(`${weatherAPIURL}?access_key=${API_KEY}&query=${city}`)
			.then((response) => response.data)
			.then((data) => setWeatherInfo(data.current));
	}, []);
	return (
		<div>
			<h3>Weather in {city}</h3>
			{weatherInfo && (
				<div>
					<p>
						<strong>temperature: </strong> {weatherInfo.temperature} Celcius
					</p>
					<img
						style={{ height: '50px', width: '50px' }}
						src={weatherInfo.weather_icons[0]}
					/>
					<p>
						<strong>wind: </strong> {weatherInfo.wind_speed} mph direction{' '}
						{weatherInfo.wind_dir}
					</p>
				</div>
			)}
		</div>
	);
};

export default App;
