import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_Auth_Domain,
    projectId: process.env.REACT_APP_FIREBASE_Project_Id,
    storageBucket: process.env.REACT_APP_FIREBASE_Storage_Bucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_Messaging_SenderId,
    appId: process.env.REACT_APP_FIREBASE_App_Id
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);