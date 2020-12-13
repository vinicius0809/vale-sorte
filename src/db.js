import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
   apiKey: "AIzaSyDllLfohM6FOAcraMeWeR7WYyGXGEBAavo",
   authDomain: "vale-sorte.firebaseapp.com",
   projectId: "vale-sorte",
   storageBucket: "vale-sorte.appspot.com",
   messagingSenderId: "1003000208135",
   appId: "1:1003000208135:web:c983eb76eeaf8df60143a2",
   measurementId: "G-1D32XM8YNS"
 };
// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();
