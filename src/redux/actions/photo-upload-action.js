// action types
export const ADD_TO_STORAGE_SUCCESS = "ADD_TO_STORAGE_SUCCESS";
export const ADD_TO_DATABASE_SUCCESS = "ADD_TO_DATABASE_SUCCESS";
export const REMOVE_FROM_STORAGE_SUCCESS = "REMOVE_FROM_STORAGE_SUCCESS";
export const REMOVE_FROM_STORAGE_ERROR = "REMOVE_FROM_STORAGE_ERROR";
export const REMOVE_FROM_DATABASE_SUCCESS = "REMOVE_FROM_DATABASE_SUCCESS";
export const REMOVE_FROM_DATABASE_ERROR = "REMOVE_FROM_DATABASE_ERROR";

/**
 * Removes entry of storage.
 *
 * @param storageRef
 * @returns {function(*, *, {getFirebase: *})}
 */
export const removeFromStorage = storageRef => {
  return (dispatch, getState, {getFirebase}) => {
    const storage = getFirebase().storage();
    storage.ref(storageRef).delete()
      .then(() => dispatch({type: REMOVE_FROM_STORAGE_SUCCESS}))
      .catch(err => dispatch({type: REMOVE_FROM_STORAGE_ERROR}));
  }
};

/**
 * Removes field from database.
 *
 * @param collection
 * @param doc
 * @param field
 * @returns {function(*, *, {getFirestore: *})}
 */
export const removeFromDatabase = (collection, doc, field) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(collection).doc(doc).update({
      [field]: firestore.FieldValue.delete()
    })
      .then(() => dispatch({type: REMOVE_FROM_DATABASE_SUCCESS}))
      .catch(err => dispatch({type: REMOVE_FROM_DATABASE_ERROR}));
  }
};

/**
 * Adds image to storage.
 *
 * @param storageRef
 * @param file
 * @param fileId
 * @returns {function(*, *, {getFirebase: *})}
 */
export const addToStorage = (storageRef, file, fileId) => {
  return (dispatch, getState, {getFirebase}) => {
    const storage = getFirebase().storage();
    const storageReference = storage.ref(`${storageRef}/${fileId}`);
    return storageReference.put(file)
      .then(snap => {
        dispatch({type: ADD_TO_STORAGE_SUCCESS});
        return snap.ref.getDownloadURL();
      });
  };
};

/**
 * Adds image to database.
 *
 * @param collection
 * @param doc
 * @param data
 * @param field
 * @returns {function(*, *, {getFirestore: *})}
 */
export const addToDatabase = (collection, doc, data, field) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    return firestore.collection(collection).doc(doc).update({
      [field]: data
    })
      .then(() => dispatch({type: ADD_TO_DATABASE_SUCCESS, data: {url: data.url, id: data.id}}));
  };
};