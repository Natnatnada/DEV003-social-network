// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const home = () => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const registerButton = document.createElement('button');
  const logInButton = document.createElement('button');

  registerButton.textContent = 'Crea una cuenta';
  logInButton.textContent = 'Inicia sesión';
  title.textContent = '<CiberFem>';

  registerButton.addEventListener('click', () => {
    onNavigate('/registro');
  });

  logInButton.addEventListener('click', () => {
    onNavigate('./logIn');
  });

  homeDiv.appendChild(title, logInButton, registerButton);

  return homeDiv;
};
