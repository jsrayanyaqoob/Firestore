import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyB_dVo-1Cv1UKYGf6jBJvcfjTrjSNPvogA",
    authDomain: "rayan-756cc.firebaseapp.com",
    projectId: "rayan-756cc",
    storageBucket: "rayan-756cc.firebasestorage.app",
    messagingSenderId: "542315085701",
    appId: "1:542315085701:web:224623533b90960b118eec",
    measurementId: "G-ENXTXTZK0Q"
};




const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);