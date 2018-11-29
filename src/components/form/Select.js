import React from "react";
import {PropTypes} from 'prop-types';

export const Select = ({
                             svg,
                             value,
                             changeHandler,
                             name,
                             options
                           }) => {
  return (
    <div className='inputWrapper'>
      <label className='inputLabel'>
        {svg}
        <select
          style={{color: 'grey'}}
          value={value}
          onChange={changeHandler}
          name={name}
          className="gb-text-input gb-text-input-trans-background"
        >
          {
            options.map((option, key) => <option key={key} value={option.name}>{option.name}</option>)
          }
        </select>
      </label>
    </div>
  );
};

Select.propTypes = {
  svg : PropTypes.object,
  value : PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
  changeHandler : PropTypes.func.isRequired,
  name : PropTypes.string
};