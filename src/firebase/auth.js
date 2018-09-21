import {
  auth,
  googleProvider,
} from './firebase';

export const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const doSignOut = () => auth.signOut();
