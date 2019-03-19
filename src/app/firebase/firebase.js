import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDk69W2hL8tNDLYcyI5-3LIllguRskR0DU',
  authDomain: 'nutritionplanner-2acf5.firebaseapp.com',
  databaseURL: 'https://nutritionplanner-2acf5.firebaseio.com',
  projectId: 'nutritionplanner-2acf5',
  storageBucket: 'nutritionplanner-2acf5.appspot.com',
  messagingSenderId: '250306610541'
}

class Firebase {
  constructor() {
    app.initializeApp(config)

    /* Helpers */
    this.fieldValue = app.firestore.FieldValue;

    /* Firebase APIs */
    this.auth = app.auth()
    this.db = app.firestore()
    this.db.settings({ timestampsInSnapshots: true })
  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  
    // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');
}

export default Firebase
