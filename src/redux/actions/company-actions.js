import { addNewNotification } from "./notifications-action";
import {
  actionStarted,
  actionError,
  actionSuccess
} from "./generalLoadingErrorSucces-actions";

//Create Job
export const createJob = (jobData, sentTo = null, sentToId = null) => {
  return (dispatch, getState, { getFirestore }) => {
    const firebase = getState().firebase;
    return getFirestore()
      .collection("jobOffers")
      .add({
        startDate: jobData.jobDate,
        title: jobData.jobTitle,
        requestedSkill: jobData.jobType,
        location: jobData.jobLocation,
        address: jobData.jobAddress,
        description: jobData.jobDescription,
        priceAmount: jobData.jobBudget,
        status: sentTo ? "private" : "open",
        downPaymentAmountStatus: "none",
        photographer: "none",
        companyId: firebase.auth.uid,
        company: {
          companyName: firebase.profile.companyName,
          profileImageUrl: firebase.profile.profileImageUrl
        },
        createdAt: new Date().getTime(),
        sentTo: sentTo,
        sentToId: sentToId
      });
  };
};

//Accept an aplicat for an job
export const acceptApplicantForJob = (
  companyData,
  photographerData,
  jobData
) => {
  return (dispatch, getState, { getFirestore }) => {
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
        status: "in progress"
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

//Delete a job
export const deleteCurrentJob = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .delete();
  };
};

//Decline an aplicat for the job (Do we really need it?)
export const declineApplicantForJob = (jobData, photographerId) => {
  return (dispatch, getState, { getFirestore }) => {
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

//Create a new private job request,
//sent to a specific photographer
export const createPrivateJob = (jobData, company, photographerData) => {
  return (dispatch, getState, { getFirestore }) => {
    const sentToData = {
      uid: photographerData.uid,
      firstName: photographerData.firstName,
      lastName: photographerData.lastName,
      profileImageUrl: photographerData.profileImageUrl
    };
    //add the job to the jobOffers
    return dispatch(createJob(jobData, sentToData, photographerData.uid)).then(
      response => {
        //response is the new created job
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${response.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      }
    );
  };
};

//Sent an open job request as
//private request to a photographer
export const sendPrivateRequestFromExistingJobs = (
  jobData,
  company,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    //Update the job data
    const firestore = getFirestore();

    return firestore
      .collection("jobOffers")
      .doc(jobData.id)
      .update({
        sentTo: {
          uid: photographerData.uid,
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          profileImageUrl: photographerData.profileImageUrl
        },
        sentToId: photographerData.uid
      })
      .then(data => {
        //add notification to the photographer
        const notification = {
          createdAt: new Date().getTime(),
          link: `/private/job/${jobData.id}?user=${photographerData.uid}`,
          read: false,
          recipientUserId: photographerData.uid,
          title: `${company.companyName} has sent you a private job request.`
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

//Make private declined job to public
export const makePrivateJobPublic = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionStarted());
    firestore
      .collection("jobOffers")
      .doc(jobId)
      .update({
        status: "open"
      })
      .then(() => {
        dispatch(actionSuccess());
      })
      .catch(err => {
        dispatch(actionError(err));
      });
  };
};

/*
//Accept the work
export const acceptWork = (jobId, acceptedApplicant) => {
 return dispatch => {
   return database
     .ref("requests")
     .child(jobId)
     .update({
       status: "closed"
     })
     .then(()=> {
       database.ref("photographer").child(acceptedApplicant.uid).child("applied-jobs").child(jobId).update({
         status: "finished"
       })
         .then(()=> {
           dispatch(acceptWorkSuccess());
         });
     })
 };
};
*/

/*


export const deleteCurrentJob = jobId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionStarted());
    new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve("halow");
      }, 2000);
    })
      .then(() => {
        dispatch(actionSuccess());
      })
      .catch(err => {
        dispatch(actionError(err));
      });
  };
};
*/
