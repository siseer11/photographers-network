import React from "react";
import {Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../../components/LoadingPage";
import CredentialsInput from "./CredentialsInput";

class Payouts extends React.Component {
  state = {
    error: "",
    showModal: false
  };

  showModal = state => {
    this.setState({showModal: state})
  };

  cashOut = total => {
    this.setState({showModal: true});
  };

  afterClose = () => {
    this.setState({showModal: false})
  };

  render() {
    const {match, jobOffers, profile, auth} = this.props;
    const bank = profile.bankCredentials;

    if (profile.type !== match.params.type) return <Redirect to={`payouts/${profile.type}`}/>;
    if (!isLoaded(jobOffers)) return <LoadingPage/>;

    const jobs = jobOffers.filter(job => job.photographer.uid === auth.uid);
    // get the sum of all payouts
    let total = 0;
    jobs.forEach(job => {
      total += Number(job.priceAmount)
    });

    return (
      <div className="section-content with-padding">
        {
          match.params.type === "photographer" ?
            <React.Fragment>
              <h1>Your payouts</h1>
              <ul className="paymentList">
                {
                  jobs.map(job =>
                    <li key={job.id}>
                      <Link to={`/progress-job/${job.id}`}>{job.title} </Link>
                      <span>{Number(job.priceAmount) + Number(job.insuranceAmount || 0)} €</span>
                    </li>
                  )
                }
              </ul>
              <hr/>
              <p>
                <b>Total: </b>{total} € <br/>
                <span>(Insurance amount included.)</span>
              </p>
              <p>We do our payouts monthly. If your total amount is below 200€, we won't pay you.</p>
              {
                (!bank || bank.iban === "" || bank.bic === "") &&
                <React.Fragment>
                  <p>You didn't add your bank credentials yet. Please press the button to add your details.</p>
                  <button onClick={() => this.cashOut(total)}
                          className="gb-btn gb-btn-medium gb-btn-primary">
                    Add
                  </button>
                </React.Fragment>
              }
              {
                this.state.showModal &&
                <CredentialsInput closeHandler={() => this.showModal(false)}/>
              }
              {this.state.error !== "" && <p className="error-message">{this.state.error}</p>}
            </React.Fragment> :
            <h1>Company payouts</h1>
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

/*

 */