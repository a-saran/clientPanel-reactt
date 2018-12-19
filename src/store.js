import { createStore, compose, combineReducers } from "redux";
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//reducers
import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';

const firebaseConfig = {
    apiKey: "AIzaSyAz05K5JJM_eI_KmNnF8c6zz56za-PL-aQ",
    authDomain: "react-clientpanel-775c1.firebaseapp.com",
    databaseURL: "https://react-clientpanel-775c1.firebaseio.com",
    projectId: "react-clientpanel-775c1",
    storageBucket: "react-clientpanel-775c1.appspot.com",
    messagingSenderId: "330424744042"
}

//react-redux-firebase Config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingReducer
})

//local storage
if (localStorage.getItem('settings') == null) {

    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false,
    }
    localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

//state
const initailState = { settings: JSON.parse(localStorage.getItem('settings')) };

//store
const store = createStoreWithFirebase(rootReducer, initailState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store;