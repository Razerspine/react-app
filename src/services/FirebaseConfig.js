import React from "react";
import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCjZN6vTVH00CqbaHfl0s2RfZlqCIeXmCA",
    authDomain: "what-is-game.firebaseapp.com",
    databaseURL: "https://what-is-game.firebaseio.com",
    projectId: "what-is-game",
    storageBucket: "what-is-game.appspot.com",
    messagingSenderId: "175855104578",
    appId: "1:175855104578:web:7a226108b7ad2dc5faf3db",
    measurementId: "G-X062J0SMDN"
};

export const FirebaseConfig = Firebase.initializeApp(config);
