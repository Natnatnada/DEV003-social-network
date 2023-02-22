import { entrarConGoogle, signInUser } from '../lib/index';

export const home = (onNavigate) => {
  // creamos elementos
  const homeDiv = document.createElement('div');
  const homeContainer = document.createElement('div');
  const imgContainer = document.createElement('div');
  const deskContainer = document.createElement('div');
  // se crea div para insertar imagen del boton google
  const googleimg = document.createElement('div');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h2');
  const registerButton = document.createElement('button');
  const logInButton = document.createElement('button');
  const logInGoogle = document.createElement('button');
  const inputEmail = document.createElement('input');
  const logInEmailErr = document.createElement('div');
  const inputPsw = document.createElement('input');
  const logInGeneralErr = document.createElement('div');

  // Aquí le dimos clases a los elementos
  registerButton.className = 'botones';
  logInButton.className = 'botones';
  logInGoogle.className = 'googleIcon';
  logInEmailErr.classList.add('errors', 'hide');
  logInGeneralErr.classList.add('errors', 'hide');
  // se asigna clase para dar estilo al div para el boton de google
  googleimg.classList = 'googleIcon';
  logInGoogle.id = 'btnlogInGoogle';
  title.className = 'titulo';
  subTitle.className = 'subtitulo';
  homeDiv.className = 'homediv';
  deskContainer.className = 'deskContainer';
  imgContainer.className = 'imgContainer';
  homeContainer.className = 'homeContainer';
  registerButton.textContent = 'Crea una cuenta';
  logInButton.textContent = 'Inicia sesión';
  title.textContent = '<CiberFem>';
  subTitle.textContent = 'Inspiración para programadoras';
  inputEmail.className = 'inputs';
  inputEmail.placeholder = 'ingresa tu email aqui';
  inputPsw.className = 'inputs';
  inputPsw.placeholder = 'ingresa tu contraseña';
  inputPsw.type = 'password';
  logInEmailErr.textContent = 'El email ya está en uso';

  registerButton.addEventListener('click', () => {
    onNavigate('/registro');
  });

  homeContainer.append(
    inputEmail,
    inputPsw,
    logInButton,
    registerButton,
    logInGoogle,
    logInEmailErr,
    logInGeneralErr,
  ); // revisar porqué marca error
  deskContainer.append(imgContainer, homeContainer);
  homeDiv.append(title, subTitle, deskContainer);
  // funcion para login con usuarios creados  signInWithEmailAndPassword -> signInUser
  logInButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInUser(inputEmail.value, inputPsw.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // pasa onNavigate como parametro llevando al feed si el usuario se logea
        onNavigate('/feed');
      })
      .catch((error) => {
        // const errorCode = error.code;

        let logInTextMsg = 'Ups, ocurrió un error';
        if (error.code === 'auth/email-already-in-use') {
          logInTextMsg = 'Email ya en uso';
        } else if (error.code === 'auth/invalid-email') {
          logInTextMsg = 'Email inválido';
        }
        logInGeneralErr.textContent = logInTextMsg;
        logInGeneralErr.classList.remove('hide');
      });
  });

  // pasando la función entrarConGoogle del index.js a home.js
  logInGoogle.addEventListener('click', () => {
    entrarConGoogle()
      .then((result) => {
        // The signed-in user info.
        // const user = result.user;
        console.log(result);
        onNavigate('/feed');
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      }).catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log(errorCode, errorMessage, email);
      });
  });

  return homeDiv;
};
