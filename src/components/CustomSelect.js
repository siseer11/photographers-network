import React from "react";

export const CustomSelect = ({ optionsList , optionSelectHandler, showCustomSelect}) => (
  <ul className="custom-select-dropdown" style={{display: showCustomSelect?'block':'none'}}>
    {
			optionsList.map((el)=>(
				<li key={el} onClick={()=>optionSelectHandler(el)} className='custom-select-option'>{el}</li>
			))
		}
  </ul>
);
