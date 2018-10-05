import React from "react";
import fire from '../config/Fire';
import { Link } from 'react-router-dom';
import {GbCard50} from '../components/gbCard50';
import LoadingPage from "../components/LoadingPage";

export default class MyJobOffers extends React.Component {
	render() {
		return (
			<React.Fragment>
				{
					this.props.loading === false ? (
						<MyJobOffersFetch {...this.props} />
					) : (
						<LoadingPage/>
					)

				}
			</React.Fragment>
		)
	}
}

class MyJobOffersFetch extends React.Component {
	state = {
		loadingDb: true,
		stage: 0,
		jobsList: [],
	};

	componentDidMount() {
		/** 
		* Check if there is a user on and if it is a company
		**/
		if(!this.props.user || this.props.user.type!=='company'){
			this.props.history.replace('/');
		}else{
			//First get the data about the current company which jobs they have
			fire.database()
				.ref('company')
				.child(this.props.user.uid)
				.once('value', (snap) => {
					/*After having the keys of the jobs go ahead and get the data about them */
					let jobsIds = Object.keys(snap.val().postedJobs);

					if (jobsIds.length === 0) {
						this.setState({
							stage: 2,
							loadingDb: false,
						})
					} else {
						this.setState({
							stage: 1,
						});
						jobsIds = jobsIds.map(el => fire.database().ref('requests').child(el).once('value'));

						Promise.all(jobsIds)
							.then((values) => {
								this.setState({
									loadingDb: false,
									stage: 2,
									jobsList: values.map(el => el.val())
								})
							})
					}
				});
		}
	}

	render() {
		const { loadingDb, stage, jobsList } = this.state;
		console.log(jobsList);
		return (
			<React.Fragment>
				{
					loadingDb ? (
						<h2>Loading db... stage {stage}/2</h2>
					) : (
							<ul>
								{
									jobsList.map(el => (
										<Link to={`job/${el.jobbId}`} key={el.jobbId}>
											<GbCard50
												type='half-left'
												source={{
													txt : el.companyName,
													link : `/profile/${el.companyId}`
												}}
												postedTime={el.date}
												category={el.type}
											>
												{el.title}
											</GbCard50>
										</Link>
									))
								}
							</ul>
						)
				}
			</React.Fragment>
		)
	}
}
