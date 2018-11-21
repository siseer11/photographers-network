import { addNewNotification } from "../actions/notifications-action";

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
