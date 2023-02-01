// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const logIn = () => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const homeButton = document.createElement('button');
  const backButton = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');

  homeButton.textContent = 'Entrar';
  backButton.textContent = 'Regresar al home';
  title.textContent = 'Inicia Sesión';

  homeButton.addEventListener('click', () => {
    console.log(inputEmail.value);
    onNavigate('/feed');
  });
  backButton.addEventListener('click', () => {
    onNavigate('/');
  });

  homeDiv.append(title, inputEmail, inputPsw, homeButton, backButton);

  return homeDiv;
};
