import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

export const registro = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const buttonNewUser = document.createElement('button');
  const backButton = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');
  const nameUser = document.createElement('input');

  title.textContent = '<CiberFem>';
  buttonNewUser.textContent = 'Crear cuenta';
  backButton.textContent = 'Regresar';
  title.textContent = 'Únete a la comunidad CiberFem';
  // Aquí ponemos clases a los botones
  buttonNewUser.className = 'botones';
  backButton.className = 'botones';
  inputEmail.className = 'inputs';
  inputPsw.className = 'inputs';
  nameUser.className = 'inputs';

  inputEmail.placeholder = 'ingresa tu email aqui';
  inputPsw.placeholder = 'ingresa tu contraseña';
  nameUser.placeholder = 'Ingresa Nombre de usuario';
  inputPsw.type = 'password';

  buttonNewUser.addEventListener('click', () => {
    onNavigate('/logIn');
  });
  backButton.addEventListener('click', () => {
    onNavigate('/');
  });

  homeDiv.append(title, inputEmail, inputPsw, buttonNewUser, backButton, nameUser);

  return homeDiv;
};

// buttonNewUser
