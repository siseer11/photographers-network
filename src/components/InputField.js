import React from "react";

export const InputField = ({
  svg,
  value,
  changeHandler,
  type,
  name,
  placeholder
}) => {
  return (
    <div className='inputWrapper'>
      <label className='inputLabel'>
        {svg}
        <input
          value={value}
          onChange={changeHandler}
          type={type}
          name={name}
          className="gb-text-input gb-text-input-trans-background"
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
