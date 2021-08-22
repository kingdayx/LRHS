import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB03VZWSXoWSvyyJGdgEkMCQ_Bj7rEDgwU",
  authDomain: "lrhs-fb924.firebaseapp.com",
  projectId: "lrhs-fb924",
  storageBucket: "lrhs-fb924.appspot.com",
  messagingSenderId: "906159672829",
  appId: "1:906159672829:web:a7ed0e563b6bacad389d94",
  measurementId: "G-QZJ3WXLTD5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signup({ email, password, displayName }) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      firebase
        .database()
        .ref("students/" + displayName.trim())
        .child("students")
        .update({
          email: email,
          password: password,
          displayname: displayName.trim(),
          useruid: userInfo.user.uid,
        });
    });
}

export function search(query, callback) {
  clientRef
    .orderByChild("displayName")
    .startAt(query)
    // .endAt(query + '\uf8ff')
    .on("value", (snap) => {
      callback(snap.val());
    });
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  });
}

export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
