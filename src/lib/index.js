import {
  signInWithPopup, GoogleAuthProvider,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut, createUserWithEmailAndPassword,
} from 'firebase/auth';

// signInWithEmailAndPassword, onAuthStateChanged ,signOut
import { auth } from './firebase';

const provider = new GoogleAuthProvider();
export function entrarConGoogle() {
  // Nos falta hacer el llamado de la función que es logInGoogle
  return signInWithPopup(auth, provider);
}
// Funcion para crear un usuario
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
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
