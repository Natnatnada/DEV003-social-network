import {
  signInWithPopup, GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
// se importan las funciones desde firestore base de datos

import {
  collection,
  addDoc,
} from 'firebase/firestore';

import { auth, db } from './firebase';

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
// funcion para ver si la usuaria esta logeada
export function getUser(user) {
  return onAuthStateChanged(auth, user);
}
// funcion para guardar tareas/post en firestore
export const saveTask = (title, description) => addDoc(collection(db, 'task'), { title, description });
