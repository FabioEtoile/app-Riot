import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import app, { db } from './firebase';

const auth = getAuth(app);

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      favorites: []
    });

    return userCredential.user;
  } catch (error) {
    console.error("Erreur création utilisateur:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur connexion:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur déconnexion:", error);
    throw error;
  }
};
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
