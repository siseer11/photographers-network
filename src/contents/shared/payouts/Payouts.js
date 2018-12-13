import React from "react";
import {Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";

class Payouts extends React.Component {
  render() {
    const {match, jobOffers, profile, auth} = this.props;
    const bank = profile.bankCredentials;

    if (profile.type !== match.params.type) return <Redirect to={`payout/${profile.type}`}/>;
    if (!isLoaded(jobOffers)) return <LoadingPage/>;

    const jobs = jobOffers.filter(job => job.photographer.uid === auth.uid);
    // get the sum of all payouts
    let total = 0;
    jobs.forEach(job => {
      total += Number(job.priceAmount)
    });

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
      <div>
        {
          match.params.type === "photographer" ?
            <React.Fragment>
              <ul className="paymentList">
                {
                  jobs.map(job =>
                    <li key={job.id}>
                      <Link to={`/progress-job/${job.id}`}>
                        <h2 className="uppercase">{job.title} </h2>
                        <p>
                          <span className="medium-black-bold">{job.location.city}</span>
                          <span className="small-grey-bold">{new Date(job.startDate).toLocaleString("en-US", options)}</span>
                        </p>
                        <p className="description">{job.description}</p>
                      </Link>
                      <b>{Number(job.priceAmount) + Number(job.insuranceAmount || 0)} €</b>
                    </li>
                  )
                }
              </ul>
              <div className="black-yellow-box">
                <span className="uppercase light">Total</span>
                <b>{total} € </b>
              </div>
            </React.Fragment> : <h2>Company!</h2>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobOffers: state.firestore.ordered.jobOffers,
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(props => [{
      collection: "jobOffers",
      where: [["payout", "==", false], ["status", "==", "closed"]]
    }]
  ),
  connect(mapStateToProps)
)(Payouts);