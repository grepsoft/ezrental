import {
    getApps,
    initializeApp
} from 'firebase/app'
import {
    getStorage, 
    ref
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
    storageBucket: "ezrentalyt.appspot.com",
    messagingSenderId: "113657154786",
    appId: "1:113657154786:web:ac90369c3b4091771ba2bb"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

  const storage = getStorage(app)
  export const storageRef = (token : string) => ref(storage, token)