import { signOff } from '../lib';
// eslint-disable-next-line no-unused-vars
export const feed = (onNavigate) => {
// ========Creamos los elementos de nuestro feed===========
  const div = document.createElement('div');
  const divPadre = document.createElement('div');
  const title = document.createElement('h2');
  const subTitle = document.createElement('h2');
  const postForm = document.createElement('postForm');
  const postTitle = document.createElement('input');
  // se crea const para texto del post
  const headerPost = document.createElement('h3');
  const postText = document.createElement('textarea');
  const botonGuardar = document.createElement('button');
  const btnLogOut = document.createElement('button');

  // =====Escribimos la info dentro de los elementos=====

  headerPost.textContent = 'Bienvenida a tu muro';
  postTitle.placeholder = 'Escribe aquí lo que piensas';
  botonGuardar.textContent = 'Guardar';
  btnLogOut.textContent = 'Cerrar sesión';
  btnLogOut.className = 'botones';
  title.className = 'titulo';
  subTitle.className = 'subtitulo';
  title.textContent = '<CiberFem>';
  subTitle.textContent = 'Inspiración para programadoras';
  // ============Damos clases a los elementos==============
  divPadre.className = 'divPadre';

  // ==============Damos ID a los elementos===============
  postTitle.id = 'taskTitle';
  // post text id
  postText.id = 'textPost';
  // se agrupan los elementos segun el form
  postForm.append(postTitle, postText, botonGuardar);
  div.append(title, subTitle, headerPost, postForm, divPadre, btnLogOut);

  btnLogOut.addEventListener('click', () => {
    signOff().then(() => {
      console.log('cerrando');
      onNavigate('/');
    }).catch((error) => {
      if (error.code) {
        console.log(error.code);
      }
      // An error happened.
    });
  });
  return div;
};
