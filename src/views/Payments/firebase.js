import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBD6n7DtFD6WJ97uhhHFxAKzRd-HQZJVE",
  authDomain: "omb-3omb.firebaseapp.com",
  databaseURL: "https://omb-3omb-default-rtdb.firebaseio.com",
  projectId: "omb-3omb",
  storageBucket: "omb-3omb.appspot.com",
  messagingSenderId: "913623475419",
  appId: "1:913623475419:web:7205f1e6a9818b3f1b58fe",
  measurementId: "G-G5VRC6CJG2"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default database;