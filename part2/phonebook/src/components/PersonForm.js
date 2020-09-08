import React from 'react';

const PersonForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				name:{' '}
				<input type='text' value={props.newName} onChange={props.handleName} />
			</div>
			<div>
				number:
				<input type='text' value={props.number} onChange={props.handlePhone} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
