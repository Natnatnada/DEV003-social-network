/* eslint-disable indent */
import {
  signOff, saveTask, getTask, obtenerPost, getUser
} from '../lib';
import { auth } from '../lib/firebase';
// eslint-disable-next-line no-unused-vars
// const usuario = auth.userInfo;

export const feed = (onNavigate) => {
// ========Creamos los elementos de nuestro feed===========
  const div = document.createElement('div');
  const divPadre = document.createElement('div');
  const titleCiber = document.createElement('h2');
  const subTitle = document.createElement('h2');
  const taskForm = document.createElement('form');
  const postTitle = document.createElement('input');
  // se crea div para innetHtml
  const feedContainer = document.createElement('div');
  // se crea const para texto del post
  const headerPost = document.createElement('h3');
  const postText = document.createElement('textarea');
  const botonGuardar = document.createElement('button');
  const btnLogOut = document.createElement('button');

  // =====Escribimos la info dentro de los elementos=====
  postTitle.type = 'text';
  headerPost.textContent = 'Bienvenida a tu muro';
  postTitle.placeholder = 'Escribe aquí lo que piensas';
  botonGuardar.textContent = 'Guardar';
  btnLogOut.textContent = 'Cerrar sesión';
  btnLogOut.className = 'botones';
  titleCiber.className = 'titulo';
  subTitle.className = 'subtitulo';
  // clase container post
  feedContainer.className = 'muroContainer';
  titleCiber.textContent = '<CiberFem>';
  subTitle.textContent = 'Inspiración para programadoras';
  // ============Damos clases a los elementos==============
  divPadre.className = 'divPadre';

  // ==============Damos ID a los elementos===============

  postTitle.id = 'postTitle';
  taskForm.id = 'taskForm';
  // post text id
  postText.id = 'postText';
  botonGuardar.id = 'botonGuardar';
  // id del div para pintar post en el muro
  feedContainer.id = 'feedContainer';

  // se agrupan los elementos segun el form
  taskForm.append(postTitle, postText, botonGuardar);
  div.append(titleCiber, subTitle, headerPost, taskForm, feedContainer, divPadre, btnLogOut);

  // taskForm = document.getElementById('taskForm');

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // console.log('submitted');
    const title = postTitle.value;
    // console.log(postTitle.value);
    const description = postText.value;
    //  console.log(postText.value);
    saveTask(title, description, auth.currentUser.displayName);
    taskForm.reset();
  });

  getTask().then(() => {
    console.log();
  });

  obtenerPost((querySnapshot) => {
    // let html = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();
        /*html += `
        <div class= 'postIndividual'>
          <div class='postHeader'>
            <img src='img/user-circle-regular-24.png'>
            <h5>Nombre de usuario</h5>
          </div>
          <p class='postTitle'>${post.title}</p>
          <p class='description-text'>${post.description}</p>
          <div class='postFooter'>
            <button class='likeBtn'>
              <img src='img/heart-regular-24.png'>
              <img src='img/heart-solid-24.png'>
            </button>
          </div>
        </div>
        `; */
// En lugar de escribirlo en HTML lo escribimos como elementos para manipularlos
      const postIndividual = document.createElement('div');
      postIndividual.classList.add('postIndividual');

      const postHeader = document.createElement('div');
      // agregando una clase al elemento
      postHeader.classList.add('postHeader');
      // Aquí checamos si hay autor
      if (post.author !== null && post.author !== undefined) {
        postHeader.innerHTML += `<img src='img/user-circle-regular-24.png'><h5>${post.author}</h5>`;
      } else {
        // nuevo HTML que estamos creando += agrega la info que va a leer como HTML
        postHeader.innerHTML += "<img src='img/user-circle-regular-24.png'><h5>Invitado</h5>";
      }

      const postTitle2 = document.createElement('p');
      postTitle2.classList.add('postTitle');
      postTitle2.append(`${post.title}`);

      const postDescription = document.createElement('p');
      postDescription.classList.add('description-text');
      postDescription.append(`${post.description}`);

      const postFooter = document.createElement('div');
      postFooter.classList.add('postFooter');

      const likeBtn = document.createElement('button');
      likeBtn.classList.add('likeBtn');
      likeBtn.innerHTML += "<img src='img/heart-regular-24.png'><img src='img/heart-solid-24.png'>";

      postFooter.append(likeBtn);
      postIndividual.append(postHeader, postTitle2, postDescription, postFooter);
      feedContainer.append(postIndividual);
// detectamos si el boton está prendido o está apagado
      likeBtn.addEventListener('click', (event) => {
        // el objeto al que le damos click
        const boton = event.target.parentElement;
        // contains es un booleano
        if (boton.classList.contains('active')) {
          // si sí contiene active lo quitamos
          boton.classList.remove('active');
          // si no contiene active lo agregamos
        } else {
          boton.classList.add('active');
        }
      });
      //console.log(post);
    });
    // feedContainer.innerHTML = html;
    //console.log(feedContainer);
  });

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
