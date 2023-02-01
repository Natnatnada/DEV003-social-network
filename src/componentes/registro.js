export const registro = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const buttonNewUser = document.createElement('button');
  const backButton = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');

  title.textContent = '<CiberFem>';
  buttonNewUser.textContent = 'Crear cuenta';
  backButton.textContent = 'Regresar';
  title.textContent = 'Únete a la comunidad CiberFem';

  buttonNewUser.addEventListener('click', () => {
    onNavigate('/logIn');
  });
  backButton.addEventListener('click', () => {
    onNavigate('/');
  });

  homeDiv.append(title, inputEmail, inputPsw, buttonNewUser, backButton);

  return homeDiv;
};
