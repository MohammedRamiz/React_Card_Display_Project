import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB07r2OTZYq0qpzI1j09PX572akNrYNGX4",
    authDomain: "first-project-7c7e4.firebaseapp.com",
    databaseURL: "https://first-project-7c7e4.firebaseio.com",
    projectId: "first-project-7c7e4",
    storageBucket: "first-project-7c7e4.appspot.com",
    messagingSenderId: "542917387151",
    appId: "1:542917387151:web:985b641a14f8774f38a1fa",
    measurementId: "G-K9F8HSS11J"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()

  export {firebaseApp}
  export default db