import React from "react";
import PropTypes from 'prop-types';

export const TextArea = ({ value, name, changeHandler, placeholder }) => (
	<textarea
		className='my-text-area'
		name={name}
		onChange={changeHandler}
		value={value}
		placeholder={placeholder}
	/>
);

TextArea.propTypes = {
	value : PropTypes.string.isRequired,
	name : PropTypes.string,
	changeHandler : PropTypes.func.isRequired,
	placeholder : PropTypes.string,
}