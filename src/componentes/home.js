export const home = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h2')
  const registerButton = document.createElement('button');
  const logInButton = document.createElement('button');
  const logInGoogle = document.createElement('button');

  registerButton.textContent = 'Crea una cuenta';
  logInButton.textContent = 'Inicia sesión';
  title.textContent = '<CiberFem>';
  subTitle.textContent = 'Inspiración para programadoras';
  logInGoogle.textContent = 'Inicia sesión con Google';
  

  registerButton.addEventListener('click', () => {
    onNavigate('/registro');
  });

  logInButton.addEventListener('click', () => {
    onNavigate('/logIn');
  });

  homeDiv.append(title, subTitle, logInButton, logInGoogle, registerButton);
  return homeDiv;
};
