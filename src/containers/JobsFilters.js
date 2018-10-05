import React from 'react';
import WithModal from '../RenderProp/WithModal';
import {CheckBoxList} from '../components/CheckBoxList';

export const Filters = ({filters,checkboxChangeHandler}) => (
 <div className='filters'>
 {
  filters.map((el) => {
   if(el){
    const key = Object.keys(el)[0];
    return (
     <WithModal key={key} className={`${key}-filters`}  closeItemClass='black-overlay'>
      {
       ({showModal}) => (
        <React.Fragment>
         <p className='filter-by'>{key}</p>
         <div className={`filters-holder ${showModal?'shown':'hidden'}`}>
          <div className='black-overlay'></div>
          <div className='filters-list'>
           <div className='filters-list-header'>
            <h2>{key}</h2>
           </div>
           <CheckBoxList list={el[key]} checkboxChangeHandler={checkboxChangeHandler} filterName={key}/>
          </div>
         </div>
        </React.Fragment>
       )
      }  
     </WithModal>
    )
   }else{
    return '';
   }
  })
 }
 </div>
)