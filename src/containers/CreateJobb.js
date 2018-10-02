import React from "react";
import { CustomSelect } from "../components/CustomSelect";
import {InputField} from '../components/InputField';
import { NameInputSVG } from "../components/svg/NameInputSVG";
import { LocationSVG } from "../components/svg/LocationSVG";
import {MoneySVG} from '../components/svg/MoneySVG';
import { CameraSVG } from "../components/svg/CameraSVG";
import { CalendarSVG } from "../components/svg/CalendarSVG";
import LoadingPage from '../components/LoadingPage';
import {Redirect} from 'react-router-dom';
import {TextArea} from '../components/TextArea';
import fire from "../config/Fire";

const types = ["nature", "portrait", "o3", "o4"];

export default class CreateJobb extends React.Component {
  state = {
    jobbTitle: "",
		jobbLocation: "",
		jobbType : 'nature',
		jobbBudget : '',
		jobbDate : '',
		jobbDescription : '',
  };

  createValidDate = date => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
	};
	
	optionSelectHandler = (type) => {
		this.setState({
			jobbType : type,
		})
	}

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect == true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

	changeHandler = (e) => {
		this.setState({
			[`jobb${e.target.name}`] : e.target.value
		})
	}

	componentDidMount(){
		if(this.props.loadedResponse && this.props.type != 'company'){
			this.props.history.replace('/dashboard');
		}
	}


	inputChecker = () => {
		const {jobbTitle , jobbLocation , jobbType , jobbBudget , jobbDate} = this.state;
		if(!jobbTitle){
			return 'Title must be not empty'
		}
		if(!jobbLocation){
			return 'Location must be not empty'
		}
		if(!jobbType){
			return 'Type must be completed'
		}
		if(!jobbBudget || Number(jobbBudget) <= 0) {
			return 'Budget must be completed and greater then 0';
		}
		if(!jobbDate){
			return 'Date must be selected'
		}
		return true;

	}

	submitHandler = (e) => {
		e.preventDefault();
		const {jobbTitle , jobbLocation , jobbType , jobbBudget , jobbDate , jobbDescription} = this.state;
		const jobbId = fire.database().ref('requests').push().key;
		if(this.inputChecker()===true){
			console.log(this.props.user.displayName);
			fire.database()
			.ref('requests')
			.child(jobbId)
			.set({
				'title' : jobbTitle,
				'description' : 'z',
				'price' : Number(jobbBudget),
				'location' : jobbLocation,
				'type' : jobbType,
				'date' : jobbDate,
				'status' : 'open',
				'payment' : 'soooooon',
				'phootgrapher' : 'none',
				'company' : this.props.user.uid,
				'companyName' : this.props.user.displayName
			})
			.then(()=>{
				fire.database()
				.ref('company')
				.child(this.props.user.uid)
				.child('postedJobs')
				.child(jobbId)
				.set({
					'jobId' : jobbId
				}).then(()=>{
					console.log('job was pushed');
					setTimeout(()=>{
						this.props.history.push('/dashboard');
					},1000)
				}).catch((err)=>console.log(err));

			})
			.catch((err)=>console.log(err))
		}else{
			console.log(this.inputChecker())
		}

	}

  render() {
		const today = this.createValidDate(new Date());
    const { jobbTitle, jobbLocation , jobbType , jobbBudget , jobbDate , jobbDescription} = this.state;
		
		
    return (
			<React.Fragment>
			{
				!this.props.loadedResponse?(
					<LoadingPage />
				):(
					this.props.type!='company'?(
						<Redirect to='/dashboard' />
					):(
						<div className="create-jobb-page" className='section-content'>
							<h1>Create Jobb</h1>
							<form onSubmit={this.submitHandler}>
								<InputField svg={<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>} value={jobbTitle} changeHandler={this.changeHandler} type='text' name='Title' placeholder='Name/Title' />
								<InputField svg={<LocationSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>} value={jobbLocation} changeHandler={this.changeHandler} type='text' name='Location' placeholder='Location' />
								<div
									className="custom-select gb-text-input gb-text-input-trans-background"
									onClick={this.showCustomSelectHandler}
								>
									<CameraSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon" />
									{jobbType}
									<CustomSelect
										showCustomSelect={this.state.showCustomSelect}
										optionsList={types}
										optionSelectHandler={this.optionSelectHandler}
									/>
								</div>
								<InputField svg={<MoneySVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>} value={jobbBudget} changeHandler={this.changeHandler} type='number' name='Budget' placeholder='Budget' />
								<InputField svg={<CalendarSVG classes="gb-icon gb-icon-medium gb-icon-fill-white inputIcon"/>} value={jobbDate || today} changeHandler={this.changeHandler} type='date' name='Date' min={today} />
								<TextArea svg={<NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>} value={jobbDescription} name='Description' changeHandler={this.changeHandler} placeholder='Jobb description'/>
								<input className='gb-btn gb-btn-large gb-btn-primary' type="submit" value="Create" />
							</form>
						</div>
					)
				)
			}
			</React.Fragment>
    );
  }
}




