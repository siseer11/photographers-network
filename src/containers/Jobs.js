import React from 'react';
import fire from '../config/Fire';
import { GbCard50 } from '../components/gbCard50';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

export default class Jobs extends React.Component {
	state = {
		loading: true,
		jobs: [],
		searchValue: '',
		locationsFiter: [],
		typesFilter: [],
	}

	componentDidMount() {
		const searchQuerry = queryString.parse(this.props.location.search);
		const requests = fire.database().ref('requests');

		if (Object.keys(searchQuerry).length != 0) {
			requests
				.orderByChild(Object.keys(searchQuerry)[0])
				.equalTo(Object.values(searchQuerry)[0])
				.once('value', (snap) => {
					this.setState({
						jobs: Object.values(snap.val() || {}),
						loading: false
					})
				})
		} else {
			requests.once('value', (snap) => {

				let response = Object.values(snap.val());

				let locations = [];
				let types = [];

				response.forEach(el => {
					if (locations.indexOf(el.location) < 0) locations.push(el.location);
					if (types.indexOf(el.type) < 0) types.push(el.type);
				})

				this.setState({
					locations,
					types
				})

				this.setState({
					jobs: Object.values(snap.val() || {}),
					loading: false
				})
			}).then(() => console.log(this.state.jobs))
		}
	}


	inputChangeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	checkboxChangeHandler = (e) => {
		const el = e.target;
		const boxFor = el.dataset.for;
		const val = el.dataset.value;
		if (el.checked) {
			this.setState((prevState) => ({
				[boxFor]: [...prevState[boxFor], val]
			}))
		} else {
			const valIdx = this.state[boxFor].indexOf(val);
			this.setState((prevState) => ({
				[boxFor]: [...prevState[boxFor].slice(0, valIdx), ...prevState[boxFor].slice(valIdx + 1)]
			}))
		}
	}

	render() {
		let { loading, jobs: jobsList, searchValue, locations, types, locationsFiter, typesFilter } = this.state;

		if (searchValue) {
			jobsList = jobsList.filter(el => el.title.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
		}

		if (locationsFiter.length > 0) {
			jobsList = jobsList.filter(el => locationsFiter.includes(el.location))
		}

		if (typesFilter.length > 0) {
			jobsList = jobsList.filter(el => typesFilter.includes(el.type))
		}

		return (
			<div className='jobs-page'>
				{
					loading ? (
						<h2>Loading...</h2>
					) : (
							<JobsView
								jobsList={jobsList}
								searchValue={searchValue}
								changeHandler={this.inputChangeHandler}
								locations={locations}
								types={types}
								checkboxChangeHandler={this.checkboxChangeHandler}
							/>
						)
				}
			</div>
		)
	}
}


const JobsView = ({ jobsList, searchValue, changeHandler, locations, types, checkboxChangeHandler }) => (
	<div className='job-page-inner'>
		<input
			style={{ width: '100vw', height: 50, border: '2px solid black', borderRadius: 5, padding: '0 15px', boxSizing: 'border-box', margin: '10px 0' }}
			type='text'
			value={searchValue}
			onChange={changeHandler}
			name='searchValue'
			placeholder='Search for a job..'
		/>
		{ locations && <h2>Filter By City</h2> }
		{
			locations && locations.map(el => (
				<label key={el}>
					{el}
					<input type='checkbox' data-value={el} data-for='locationsFiter' onChange={checkboxChangeHandler} />
				</label>
			))
		}
		{ types && <h2>Filter By Type</h2> }
		{
			types && types.map(el => (
				<label key={el}>
					{el}
					<input type='checkbox' data-value={el} data-for='typesFilter' onChange={checkboxChangeHandler} />
				</label>
			))
		}
		{
			jobsList.length > 0 ? (
				<React.Fragment>
					<JobsList jobsList={jobsList} />
				</React.Fragment>
			) : (
					<h2> NO JOB FOR YoU MAN! </h2>
				)
		}

	</div>
)



const JobsList = ({ jobsList }) => (
	<ul>
		{
			jobsList.map(el => (
				<Link to={`job/${el.jobbId}`} key={el.jobbId}>
					<GbCard50
						type='half-left'
						source={{
							txt: el.companyName,
							link: `/profile/${el.companyId}`
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