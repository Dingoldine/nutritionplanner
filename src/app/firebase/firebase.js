import app from 'firebase/app'
import 'firebase/auth'

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
    this.auth = app.auth()
  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)
}

export default Firebase
