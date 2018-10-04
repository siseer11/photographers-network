import React from 'react';
import { CustomSelect } from "./CustomSelect";
import { InputField } from './InputField';
import { NameInputSVG } from "./svg/NameInputSVG";
import { LocationSVG } from "./svg/LocationSVG";
import { MoneySVG } from './svg/MoneySVG';
import { CameraSVG } from "./svg/CameraSVG";
import { CalendarSVG } from "./svg/CalendarSVG";
import { TextArea } from './TextArea';
const types = ["nature", "portrait", "dogs", "cats"];

export const CreateJobbForm = ({ 
 today,
 submitHandler, 
 showCustomSelectHandler, 
 changeHandler, 
 showCustomSelect, 
 optionSelectHandler, 
 jobbTitle, 
 jobbLocation, 
 jobbType, 
 jobbBudget,
 jobbDate, 
 jobbDescription}) => (
 <div className="create-jobb-page" className='section-content'>
  <h1>Create Jobb</h1>
  <form onSubmit={submitHandler}>
   <InputField
    svg={<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
    value={jobbTitle}
    changeHandler={changeHandler}
    type='text'
    name='Title'
    placeholder='Name/Title'
   />
   <InputField
    svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
    value={jobbLocation}
    changeHandler={changeHandler}
    type='text'
    name='Location'
    placeholder='Location'
   />
   <div
    className="custom-select gb-text-input gb-text-input-trans-background"
    onClick={showCustomSelectHandler}
   >
    <CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
    {jobbType}
    <CustomSelect
     showCustomSelect={showCustomSelect}
     optionsList={types}
     optionSelectHandler={optionSelectHandler}
    />
   </div>
   <InputField
    svg={<MoneySVG
     classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />}
    value={jobbBudget}
    changeHandler={changeHandler}
    type='number' name='Budget'
    placeholder='Budget' />
   <InputField
    svg={<CalendarSVG
     classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />}
    value={jobbDate || today}
    changeHandler={changeHandler}
    type='date' name='Date' min={today} />
   <TextArea
    svg={<NameInputSVG
     classes="gb-icon gb-icon-medium gb-icon-white inputIcon" />}
    value={jobbDescription}
    name='Description'
    changeHandler={changeHandler}
    placeholder='Jobb description' />
   <input
    className='gb-btn gb-btn-large gb-btn-primary'
    type="submit"
    value="Create" />
  </form>
 </div>
)