import React from 'react';
import Profile from '../contents/shared/profile/Profile';
import {shallow} from 'enzyme';

const defaultProps = {
 match : {uid : 'randomid',
 profileData,
 currentUserData,
 currentUserId,
 finishedJobs
}

describe('Profile tests' , () => {
 const shallowRender = (props) => shallow(<Profile {...props} />)
 it('is defined' , () => {

 })
});