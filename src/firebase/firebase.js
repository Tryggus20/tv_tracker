import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBUlNC-sRDO03zhg7MVSyjsdoYNbHMR-1o",
  authDomain: "tvtracker-b1047.firebaseapp.com",
  databaseURL: "https://tvtracker-b1047-default-rtdb.firebaseio.com/",
  projectId: "tvtracker-b1047",
  storageBucket: "tvtracker-b1047.appspot.com",
  messagingSenderId: "196942929255",
  appId: "1:196942929255:web:ed8fe27e1597962f1823c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}; 