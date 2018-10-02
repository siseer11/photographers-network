import React from "react";

export const TextArea = ({ value, name, changeHandler, placeholder }) => (
	<textarea
		className='my-text-area'
		name={name}
		onChange={changeHandler}
		value={value}
		placeholder={placeholder}
	/>
);
