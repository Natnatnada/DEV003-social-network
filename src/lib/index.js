import {
  signInWithPopup, GoogleAuthProvider,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// signInWithEmailAndPassword, onAuthStateChanged ,signOut
import { auth } from './firebase';

const provider = new GoogleAuthProvider();
export function entrarConGoogle() {
  // Nos falta hacer el llamado de la función que es logInGoogle
  return signInWithPopup(auth, provider);
}
// funcion para iniciar sesion con usuario ya creado
export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
// funcion para cerrar sesion
export function signOff() {
  return signOut(auth);
}
// onAuthStateChanged
