import React, {Component} from 'react';
import {PhotographerCard} from './PhotographerCard';
export const PhotographerResults = ({photographers}) => (
    <React.Fragment>
        {photographers.map((photographer, key) => {
            return (<PhotographerCard key={key} uid={photographer.uid} userPic={photographer.photoURL} userName={photographer.displayName}
                                      userLocation={photographer.location}/>);
        })}
    </React.Fragment>
);
