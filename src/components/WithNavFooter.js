import React from 'react';
import GbNavBar from './gbNav';
import {GbFooter} from './Footer';
import { InstagramSVG } from '../components/svg/InstagramSVG';
import { FacebookSVG } from '../components/svg/FacebookSVG';
import { TwitterSVG } from '../components/svg/TwitterSVG';

export const WithNavFooter = WrappedComponent => (
 class extends React.Component{
  render(){
   return(
    <div className='app-wrapper'>
    <GbNavBar
					righLinks={this.props.user ? [{ txt: 'Dashboard', link: 'dashboard' }] : ([{
						txt: 'Sign in',
						link: 'signIn'
					}])
					}
					loggedIn={false}
				/>
    <WrappedComponent {...this.props}/>
    <GbFooter
					socialMedias={[
						{ icon: <InstagramSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small' />, link: '#' },
						{ icon: <TwitterSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small' />, link: '#' },
						{ icon: <FacebookSVG classes='gb-icon-fill-black-opacity-30 gb-icon-small' />, link: '#' }]}
				/>
    </div>
   )
  }
 }
)