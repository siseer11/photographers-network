import React from 'react';

export const Select = ({name, defaultVal, changeHandler, options}) => (
    <select name={name} defaultValue={defaultVal} onChange={changeHandler}>
        {options.map((option, key) => <option key={key} value={option.val}>{option.label}</option>)}
    </select>
);