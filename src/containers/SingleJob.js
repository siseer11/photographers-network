import React from 'react';
import fire from '../config/Fire';
import {SingleJobViewWithNav} from '../components/SingleJobView';
import LoadingPage from '../components/LoadingPage';

export default class SingleJob extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.loading ? (
            <LoadingPage/>
          ) : (
            <SingleJobFetch {...this.props}/>
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
        this.database
          .ref('requests')
          .child(jobId)
          .child('photographers-applied')
          .child(user.uid)
          .once('value', snapshot => {
            this.setState({
              jobId: jobId,
              jobDescription: snap.val(),
              loadingData: false,
              userApplied: snapshot.exists()
            })
          });
      })
      .catch(err => console.log(err))
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
