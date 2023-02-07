import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
//import { showMessage } 

export const registro = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const buttonNewUser = document.createElement('button');
  const backButton = document.createElement('button');
  const createAcount = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');

  const nameUser = document.createElement('input');
  const formcontainer = document.createElement('div');
  const signUpForm = document.createElement('form');
  title.textContent = '<CiberFem>';
  buttonNewUser.textContent = 'ENTRA CON TU USARIO';
  backButton.textContent = 'Regresar';
  title.textContent = 'Únete a la comunidad CiberFem';
  createAcount.textContent = 'crea tu usaurio';
  // Aquí ponemos clases a los botones
  buttonNewUser.className = 'botones';
  createAcount.className = 'botones';
  backButton.className = 'botones';
  inputEmail.className = 'inputs';
  inputPsw.className = 'inputs';
  nameUser.className = 'inputs';
  formcontainer.className = 'formbox';
  signUpForm.className = 'signUpForm';
  inputEmail.placeholder = 'ingresa tu email aqui';
  inputPsw.placeholder = 'ingresa tu contraseña';
  nameUser.placeholder = 'Ingresa Nombre de usuario';
  inputPsw.type = 'password';
  createAcount.type = 'submit';
  console.log(signUpForm);
  console.log(createAcount);

  buttonNewUser.addEventListener('click', () => {
    onNavigate('/logIn');
  });
  backButton.addEventListener('click', () => {
    onNavigate('/');
  });

  signUpForm.append(inputEmail, inputPsw, nameUser, createAcount);
  formcontainer.append(title, signUpForm, backButton, buttonNewUser);
  homeDiv.append(formcontainer);
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const Psw = inputPsw.value;
    const User = nameUser.value;
    console.log(email, Psw, User);

    try {
      const userData = await createUserWithEmailAndPassword(auth, email, Psw);
      console.log(userData);
      signUpForm.reset();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage('Email ya en uso', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showMessage('Email invalido ', 'error');
      } else if (error.code === 'auth/weak-password') {
        showMessage('contraseña debil ', 'error');
      } else if (error.code) {
        showMessage('Ups', 'error');
      }
    }
  });

  return homeDiv;
};

// const signUpForm = document.querySelector('#signUpForm');
