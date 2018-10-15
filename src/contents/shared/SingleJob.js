import React from 'react';
import fire from '../../config/Fire';
import {SingleJobViewWithNav} from '../../components/SingleJobView';
import LoadingPage from '../../components/LoadingPage';

export default class SingleJob extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.loading === false ? (
            <SingleJobFetch {...this.props}/>
          ) : (
            <LoadingPage/>
          )
        }
      </div>
    )
  }
}

class SingleJobFetch extends React.Component {
  state = {
    jobId: '',
    jobDescription: null,
    loadingData: true,
    userApplied: false
  };
  database = fire.database();

  applyForJob = () => {
    const {user} = this.props;
    const {jobId, jobDescription} = this.state;
    this.database
      .ref('requests')
      .child(jobId)
      .child('photographers-applied')
      .child(user.uid)
      .set({
        email: user.email,
        displayName: user.displayName
      })
      .then(() => {
        this.database
          .ref('photographer')
          .child(user.uid)
          .child('applied-jobs')
          .child(jobId)
          .set({
            jobDescription
          })
      })
      .then(() => this.setState({userApplied: true}));
  };

  componentDidMount() {
    const jobId = this.props.match.params.jobid;
    const {user} = this.props;
    this.database
      .ref('requests')
      .child(jobId)
      .once('value', (snap) => {
        const response = snap.val();
        this.setState(()=>({
          jobId: jobId,
          jobDescription: response,
          userApplied: (user?response['photographers-applied'].hasOwnProperty(user.uid): false),
          loadingData : false,
        }))
      }).catch(err => console.log(err))
  }


  render() {
    const {user} = this.props;
    const {loadingData, jobDescription, userApplied} = this.state;
    return (
      <div>
        {
          loadingData ? (
            <LoadingPage/>
          ) : (
            <SingleJobViewWithNav {...jobDescription} user={user} applyHandler={this.applyForJob}
                                  userApplied={userApplied}/>
          )
        }
      </div>
    )
  }
}