import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowDown} from './svg/ArrowDown';

export const GbCard50Skewed = ({backgroundUrl , type , aboutType , modalHandler , showModal , modalLink , modalButtonValue , modalList}) => (
  <div className={`gb-card-50-skewed ${showModal?'extended':''}`} style={{backgroundImage: `url(${backgroundUrl})`}}>
    {
      showModal?(
        <GbCard50SkewedModal 
          buttonLink = { modalLink }
          list = { modalList }
          buttonValue = { modalButtonValue }
          closeModal={modalHandler}
        />
      ):(
        <React.Fragment>
          <div className='blackoverlay'></div>
          <div className='inner-content'>
            <p className='gb-text-white gb-title-large card-for'>{type}</p>
            <p className='gb-text-white gb-paragraph-large about-type'>{aboutType}</p>
            <div className='arrow-down gb-icon-large'
              onClick={()=>modalHandler(type.toLowerCase())}
            >
              <ArrowDown classes='gb-icon-fill-white gb-icon-large card-50-skewed-arrow'/>
            </div>
          </div>
        </React.Fragment>
      )
    }
  </div>
)

const GbCard50SkewedModal = ({list , buttonLink , buttonValue , closeModal}) => (
  <div className='modal' onClick={(e)=>e.target.classList.contains('modal-list') && closeModal(false)}>
    <ul className='modal-list'>
      {
        list.map((el,idx)=>(
          <li key={idx} className='modal-list-item'>
            {el.icon}
            <p className='gb-text-white gb-paragraph-small modal-list-item-description'>{el.description}</p>
          </li>
        ))
      }
    </ul>
    <Link to={buttonLink} className='modal-button gb-btn gb-btn-white gb-btn-small'>{buttonValue}</Link>
  </div>
)