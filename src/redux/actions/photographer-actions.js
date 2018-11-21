import { addNewNotification } from "../actions/notifications-action";

//Apply to a public/open job
export const applyForJob = (jobInfos, photographerData) => {
  return (dispatch, getState, { getFirestore }) => {
    const photographersWhichApplied = jobInfos.photographersWhichApplied || [];
    const photographersWhichAppliedIds =
      jobInfos.photographersWhichAppliedIds || [];
    const firestore = getFirestore();
    return firestore
      .collection("jobOffers")
      .doc(jobInfos.jobId)
      .set(
        {
          photographersWhichApplied: {
            ...photographersWhichApplied,
            [photographerData.uid]: {
              id: photographerData.uid,
              firstName: photographerData.firstName,
              lastName: photographerData.lastName,
              profileImageUrl: photographerData.profileImageUrl
            }
          },
          photographersWhichAppliedIds: [
            ...photographersWhichAppliedIds,
            photographerData.uid
          ]
        },
        { merge: true }
      )
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } applied for your job request "${jobInfos.title}".`,
          link: `/open-job/${jobInfos.jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: jobInfos.companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

/* PRIVATE JOB FUNCTIONALITY */
//Accept private request
export const acceptPrivateJobRequest = (
  jobId,
  title,
  companyId,
  photographerData
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //Update the job in the DB and
    //send notification to the company
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .update({
        photographersWhichApplied: null,
        photographersWhichAppliedIds: null,
        sentTo: null,
        sentToId: null,
        photographer: {
          firstName: photographerData.firstName,
          lastName: photographerData.lastName,
          profileImageUrl: photographerData.profileImageUrl
        },
        status: "in progress"
      })
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } accepted your private request for : "${title}". Go ahead and pay now!`,
          link: `/open-job/${jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};

//Reject private request
export const rejectPrivateJobRequest = (
  jobId,
  title,
  companyId,
  photographerData,
  status
) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    //Update the job in the DB and
    //send notification to the company
    return firestore
      .collection("jobOffers")
      .doc(jobId)
      .update({
        sentTo: null,
        sentToId: null
      })
      .then(() => {
        const notification = {
          title: `${photographerData.firstName} ${
            photographerData.lastName
          } declined your private request for : "${title}"`,
          link:
            status === "private"
              ? `/declined-private-job/${jobId}?company=${companyId}`
              : `/open-job/${jobId}`,
          read: false,
          createdAt: new Date().getTime(),
          recipientUserId: companyId
        };
        return dispatch(addNewNotification(notification));
      });
  };
};
