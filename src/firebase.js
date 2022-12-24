/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcFaURPqvA-Wse-8cfSjmhUWbIxGfd30I',
  authDomain: 'sentiment-analysis-frontend.firebaseapp.com',
  projectId: 'sentiment-analysis-frontend',
  storageBucket: 'sentiment-analysis-frontend.appspot.com',
  messagingSenderId: '543501614849',
  appId: '1:543501614849:web:5ae8a51778016dbece6500',
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line import/prefer-default-export
export const auth = getAuth(app);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
};

export const loginWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    }).catch((err) => {
      const errorMessage = err.message;
      console.log(errorMessage);
    });
};

export const registerWithEmailAndPassword = (email, password) => {
  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInWithGithub = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    const { user } = result;
    console.log(user);
  }).catch((err) => {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  });
};
