import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export const home = (onNavigate) => {
  //creamos elementos
  const homeDiv = document.createElement('div');
  const homeContainer = document.createElement('div');
  const imgContainer = document.createElement('div');
  const deskContainer = document.createElement('div');
  //se crea div para insertar imagen del boton google
  const googleimg = document.createElement('div');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h2');
  const registerButton = document.createElement('button');
  const logInButton = document.createElement('button');
  const logInGoogle = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPsw = document.createElement('input');

  // Aquí le dimos clases a los elementos
  registerButton.className = 'botones';
  logInButton.className = 'botones';
  logInGoogle.className = 'googleIcon';
  //se asigna clase para dar estilo al div para el boton de google
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


  registerButton.addEventListener('click', () => {
    onNavigate('/registro');
  });

  logInButton.addEventListener('click', () => {
    onNavigate('/feed');
  });

  logInGoogle.addEventListener('click', () => {
    entrarConGoogle(onNavigate);
  });
  homeContainer.append(inputEmail, inputPsw, logInButton, registerButton, logInGoogle);
  deskContainer.append(imgContainer, homeContainer);
  homeDiv.append(title, subTitle, deskContainer);
  return homeDiv;
};

const provider = new GoogleAuthProvider();
// const auth = getAuth();

function entrarConGoogle(onNavigate) { // Nos falta hacer el llamado de la función que es logInGoogle
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
}
