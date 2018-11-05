import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "../secrets/firebaseSecrets";
firebase.initializeApp(config);
const auth = firebase.auth();
const db = firebase.database();
export { auth, db };
