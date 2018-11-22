import {addNewNotification} from "./notifications-action";
import {acceptWorkSuccess} from "./single-job-action-company";

//Create Job
export const createJob = jobData => {
  return (dispatch, getState, {getFirestore}) => {
    const firebase = getState().firebase;
    return getFirestore()
      .collection("jobOffers")
      .add({
        startDate: jobData.date,
        title: jobData.jobTitle,
        requestedSkill: jobData.jobType,
        location: jobData.jobLocation,
        address: jobData.jobAddress,
        description: jobData.jobDescription,
        priceAmount: jobData.jobBudget,
        status: "open",
        downPaymentAmountStatus: "none",
        photographer: "none",
        companyId: firebase.auth.uid,
        company: {
          companyName: firebase.profile.companyName,
          profileImageUrl: firebase.profile.profileImageUrl
        },
        createdAt: new Date().getTime()
      });
  };
};

//Accept an aplicat for an job
export const acceptApplicantForJob = (companyData,
                                      photographerData,
                                      jobData) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore
      .collection("jobOffers")
      .doc(jobData.jobId)
      .update({
        photographer: {
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          uid: photographerData.id,
          profileImageUrl: photographerData.profileImageUrl
        },
        status: "in progress",
        downPaymentAmountStatus: "done"
      })
      .then(() => {
        const notification = {
          createdAt: new Date().getTime(),
          link: `/progress-job/${jobData.jobId}`,
          read: false,
          title: `${companyData.companyName} accepted you for ${jobData.title}`,
          recipientUserId: photographerData.id
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

/*

  */

//Delete a job
export const deleteCurrentJob = jobId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .delete();
  };
};

//Decline an aplicat for the job (Do we really need it?)
export const declineApplicantForJob = (jobData, photographerId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    let photographersWhichApplied = jobData.photographersWhichApplied;

    return firestore
      .collection("jobOffers")
      .doc(jobData.jobId)
      .update({
        photographersWhichApplied: {
          ...photographersWhichApplied,
          [photographerId]: {
            ...photographersWhichApplied[photographerId],
            declined: true
          }
        }
      })
      .then(() => {
        const notification = {
          title: `${
            jobData.company.companyName
            } has declined your application for ${jobData.title}.`,
          link: `/open-job/${jobData.jobId}`,
          read: false,
          time: new Date().getTime(),
          recipientUserId: photographerId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};


//Accept the work
export const acceptWork = jobId => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore.collection('jobOffers').doc(jobId).update({
      status: "closed"
    }).then(() => dispatch(acceptWorkSuccess()));
  };
};

