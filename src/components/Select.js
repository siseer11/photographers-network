import React from "react";

export const Select = ({ name, defaultVal, changeHandler, options, icon }) => (
  <label className='inputLabel'>
    {icon}
    <select className='gb-text-input gb-text-input-trans-background gb-select' name={name} defaultValue={defaultVal} onChange={changeHandler}>
      {options.map((option, key) => (
        <option key={key} value={option.val}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
