import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import PropTypes from 'prop-types';
import fire from '../../config/Fire'

export const DashboardHeader = ({ children, links, user, linkHandler, type , updateAvatar}) => {
	let profilePath = `/profile/${user.uid}`;
	return (
		<div>
			
			<div className="gb-card-7-wrapper">
				<div style={{flexDirection : 'column'}} className="gb-card-7-height gb-background-primary">
				<InputFile uid={user.uid} userAvatar={user.photoURL} updateAvatar={updateAvatar}/>
					<div className="card-7-shadow-overlay"/>
					<div className="card-7-content">
						<h1 className="gb-title-xx-large gb-text-white gb-margin-bottom-40 gb-text-align-center">{children}</h1>
						<div className="gb-display-flex">
							{links.map((link, key) => {
								return (<Button key={key} clickHandler={() => linkHandler(link.name, type)}
									classes="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">{link.name}</Button>)
							})}
							<Link to={profilePath} className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">
								Profile
       </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

class InputFile extends React.Component{
	state = {
		submitable : false,
	}

	changeHandler = (e) => {
		const file = this.fileInput.files[0];
		//check that the file is smaller then 1mb
		if(file){
			if(file.size > 1100000){
				console.log('The file must be under 1MB. Please conform to the rules!')
			}else{
				console.log('Perfect sized image')
				const userId = this.props.uid;
				const updateAvatar = this.props.updateAvatar;
				//create storage ref
				let storageRef = fire.storage().ref(`${userId}/avatar`);

				//upload file
				let task = storageRef.put(file);

				task.on('state_changed' , 
					 function progress(snap){
							console.log(snap)
						},	
						function error(err){
							console.log(err)
						},
						function complete(e){
							task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
								console.log('File available at', downloadURL);
								fire.database().ref('users').child(userId).update({
									'photoURL' : downloadURL
								}, (err)=> {
									if(err){
										console.log('fail')
									}else{
										console.log('succes')
										updateAvatar(downloadURL);
									}
								})
							});
						}
				)

			}
		}
		
		
	}
	render(){
		console.log(this.props.userAvatar)
		return(
				<div className='z' style={{flexGrow:1 , width: '100%' , display: 'flex' , alignItems:'center' , justifyContent: 'center'}}>
					<label>
						<img style={{cursor : 'pointer'}} className='gb-avatar gb-avatar-x-large' src={this.props.userAvatar} alt='avatar'/>
						<input multiple  style={{display: 'none'}} ref={node=>this.fileInput=node} onChange={this.changeHandler} type='file' accept=".jpg, .jpeg, .png"></input>
					</label>
				</div>
		)
	}
}

DashboardHeader.propTypes = {
	children : PropTypes.array.isRequired,
	links : PropTypes.array,
	uid : PropTypes.string,
	linkHandler : PropTypes.func,
	type : PropTypes.string,
}