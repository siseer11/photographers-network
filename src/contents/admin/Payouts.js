import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {isLoaded, firestoreConnect} from "react-redux-firebase";
import LoadingPage from "../../components/LoadingPage";

const Payouts = ({match, jobOffers}) => {
  if (!isLoaded(jobOffers)) return <LoadingPage/>;
  const payouts = getPayouts(Object.values(jobOffers));
  // get the sum of all payouts
  let total = 0;
  payouts.forEach(payout => {total += Number(payout.amount)});

  return (
    <div className="section-content with-padding">
      {
        match.params.type === "photographer" ?
          <React.Fragment>
            <h1>Photographer payouts</h1>
            <ul>
              {
                payouts.map(payout =>
                  <li key={payout.uid}>
                    <span>{payout.name}</span>
                    <span>{payout.amount} €</span>
                  </li>
                )
              }
            </ul>
            <hr/>
            <p><b>Total: </b>{total} €</p>
          </React.Fragment> :
          <h1>Company payouts</h1>
      }
    </div>
  );
};

/**
 * Returns array of payouts and groups payments
 * of the same photographer.
 *
 * @param jobs
 * @returns {Array}
 */
const getPayouts = jobs => {
  const payouts = [];
  jobs.forEach(job => {
    const nameIndex = payouts.findIndex(payout => payout.uid === job.photographer.uid);
    // checks, if there is already an entry with the same photographer uid
    if(nameIndex !== -1) {
      payouts[nameIndex].amount += Number(job.priceAmount); // ? + Number(job.insuranceAmount);
    } else {
      payouts.push({
        uid: job.photographer.uid,
        name: `${job.photographer.firstName} ${job.photographer.lastName}`,
        amount: Number(job.priceAmount)
      });
    }
  });
  return payouts;
};

const mapStateToProps = state => ({
  jobOffers: state.firestore.data.jobOffers
});

export default compose(
  firestoreConnect(props => [{
      collection: "jobOffers",
      where: [["payout", "==", false], ["status", "==", "closed"]]
    }]
  ),
  connect(mapStateToProps)
)(Payouts);