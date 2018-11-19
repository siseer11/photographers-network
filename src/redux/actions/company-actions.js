import { addNewNotification } from "./notifications-action";

//Create Job
export const createJob = jobData => {
  return (dispatch, getState, { getFirestore }) => {
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
          uid: photographerData.uid,
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
          recipientUserId: photographerData.uid
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

const notification = {
  title: `${jobDescription.companyName} has declined your application for ${
    jobDescription.title
  }.`,
  link: `/open-job/${jobId}`,
  read: false,
  time: new Date(),
  recipientUserId: uid
};
this.props.addNotification(notification);

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
