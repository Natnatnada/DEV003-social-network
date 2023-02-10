export const logIn = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const title = document.createElement('h2');
  const homeButton = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');
  // Aquí pusimos clases  a los botones
  homeButton.className = 'botones';
  inputEmail.className = 'inputs';
  inputPsw.className = 'inputs';
  homeButton.textContent = 'Entrar';
  title.textContent = 'Inicia Sesión';
  inputEmail.placeholder = 'Ingresa tu email aqui';
  inputPsw.placeholder = 'Ingresa tu contraseña';
  inputPsw.type = 'password';

  homeButton.addEventListener('click', () => {
    //                          ;
    onNavigate('/feed');
  });
  homeButton.addEventListener('click', () => {
    //    console.log(inputPsw.value);
    onNavigate('/feed');
  });

  homeDiv.append(title, inputEmail, inputPsw, homeButton);

  return homeDiv;
};
