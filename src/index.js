import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import fire from "./config/Fire";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import MainReducer from "./redux/reducers";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const store = createStore(
  MainReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })
    ),
    reactReduxFirebase(fire, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    }),
    reduxFirestore(fire)
  )
);

ReactDOM.render(<h2>Loading..</h2>, document.getElementById("root"));

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

  registerServiceWorker();
});
