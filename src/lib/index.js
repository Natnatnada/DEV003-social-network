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
  getDoc,
  query,
  doc,
  getDocs,
  onSnapshot,
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
export const saveTask = (title, description, author) => addDoc(collection(db, 'task'), { title, description, author });

export const getTask = async () => {
  /* const getPost = collection(db, 'task');
  const docSnap = await getDoc(getPost);
  console.log(docSnap);
  docSnap.forEach((doc) => {
  console.log(doc.data());
  }); */

  // guardas en la constante q lo que obtengas de la búsqueda de la colección que se llame task dentro de la base de datos
  const q = query(collection(db, 'task'));
  // me va a regresar la colección
  const querySnapshot = await getDocs(q);
  // crea un array con cada uno de los post
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, '=>', doc.data());
  });
};
export const obtenerPost = (callback) => onSnapshot(collection(db, 'task'), callback);
