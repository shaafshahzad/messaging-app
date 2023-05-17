import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBn8HVsMrszslWvqdAnyxVpCdqsN3nBQXI',
  authDomain: 'messaging-app-6332f.firebaseapp.com',
  projectId: 'messaging-app-6332f',
  storageBucket: 'messaging-app-6332f.appspot.com',
  messagingSenderId: '279562989852',
  appId: '1:279562989852:web:7957b696945a4a030f4ad9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };