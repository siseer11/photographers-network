import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import fire from "./config/Fire";
import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import MainReducer from "./redux/reducers";
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import { Provider } from "react-redux";

const store = createStore(
  MainReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    reactReduxFirebase(fire, {attachAuthIsReady: true}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.firebaseAuthIsReady.then(()=> {
  ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
  registerServiceWorker();
});


