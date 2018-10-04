import React from "react";
import fire from '../config/Fire';

export default class MyJobOffers extends React.Component {
	componentDidMount() {
		console.log(this.props)
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, this.props);
		return true;
	}


	render() {
		return (
			<React.Fragment>
				{
					this.props.loading ? (
						<h2>looooooooading</h2>
					) : (
							<MyJobOffersFetch {...this.props} />
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
	}
	componentDidMount() {

		//First get the data about the current company which jobs they have
		fire.database()
			.ref('company')
			.child(this.props.user.uid)
			.once('value', (snap) => {
				/*After having the keys of the jobs go ahead and get the data about them */

				let jobsIds = Object.keys(snap.val().postedJobs)

				if (jobsIds.length == 0) {
					this.setState({
						stage: 2,
						loadingDb: false,
					})
				} else {
					this.setState({
						stage: 1,
					})
					jobsIds = jobsIds.map(el => fire.database().ref('requests').child(el).once('value'))

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

	render() {
		const { loadingDb, stage, jobsList } = this.state;
		return (
			<React.Fragment>
				{
					loadingDb ? (
						<h2>Loading db... stage {stage}/2</h2>
					) : (
							<ul>
								{
									jobsList.map((el, idx) => (
										<li key={idx} style={{ background: 'rgba(0,0,0,.3)', margin: 10, padding: 10 }}>
											<h2>{el.title}</h2>
											<p>{el.location}</p>
											<p>{el.companyName} {el.company}</p>
											<p>{el.date}</p>
											<p>{el.description}</p>
											<p>{el.price}</p>
											<p>{el.type}</p>
										</li>
									))
								}
							</ul>
						)
				}
			</React.Fragment>
		)
	}
}