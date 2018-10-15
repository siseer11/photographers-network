import React from 'react';
import PropTypes from 'prop-types';

export const CheckBoxList = ({list , checkboxChangeHandler , filterName}) => (
 <React.Fragment>
  {list.map(el=>(
   <label key={el}>
    <input type='checkbox' data-value={el} data-for={`${filterName}Filter`} onChange={checkboxChangeHandler} />
    {el}
   </label>
  ))}
 </React.Fragment>
)

CheckBoxList.propTypes = {
 list : PropTypes.array,
 checkboxChangeHandler : PropTypes.func,
 filterName : PropTypes.string,
}