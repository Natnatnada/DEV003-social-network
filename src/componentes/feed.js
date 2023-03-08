import {
  signOff, saveTask, getTask, obtenerPost, savePost, updatePost,
  getPost,
} from '../lib';
import { auth, db } from '../lib/firebase';
// eslint-disable-next-line no-unused-vars
export const feed = (onNavigate) => {
// ========Creamos los elementos de nuestro feed===========
  const div = document.createElement('div');
  const divPadre = document.createElement('div');
  const titleCiber = document.createElement('h2');
  const subTitle = document.createElement('h2');
  const taskForm = document.createElement('form');
  const postTitle = document.createElement('input');
  // se crea div para innerHtml
  const feedContainer = document.createElement('div');
  // se crea const para texto del post
  const headerPost = document.createElement('h3');
  const postText = document.createElement('textarea');
  const botonGuardar = document.createElement('button');
  const btnLogOut = document.createElement('button');
  // const postHeader = document.createElement('div'); postHeader.classList.add('postHeader');
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
    // console.log('hola muro');
  });
  let editStatus = false;
  let id = '';
  obtenerPost((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();

      if (post.author !== null && post.author !== undefined) {
        postHeader.innerHTML += `<img src='img/user-circle-regular-24.png'><h5>${post.author}</h5>`;
      } else {
        // nuevo HTML que estamos creando += agrega la info que va a leer como HTML
        postHeader.innerHTML += "<img src='img/user-circle-regular-24.png'><h5>Invitado</h5>";
      }
      html += `
        <div class= 'postIndividual'>
          <p>${post.title}</p>
          <p class='description-text'>${post.description}</p>
          <button class='btnEdit' data-id='${doc.id}'>Editar</button>
        </div>
        `;
    });
    feedContainer.innerHTML = html;
    const editBtns = feedContainer.querySelectorAll('.btnEdit');
    console.log(editBtns.length);
    editBtns.forEach((btn) => {
      console.log('eventListener boton');
      btn.addEventListener('click', async (e) => {
        // se escucha el evento y se trae la publicación con id
        const doc = await getPost(e.target.dataset.id);
        const post = doc.data();
        // traemos texto del post para editar y actualizar
        postTitle.value = post.title;
        postText.value = post.description;
        editStatus = true;
        id = doc.id;
        botonGuardar.textContent = 'Publicar';
      });
    });
    console.log(feedContainer);
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // definimos que en caso de que el input esté vacío no se ejecute la función
    if (taskForm.value !== '') {
      if (!editStatus) {
        savePost(taskForm.value);
      } else {
        // actualización
        updatePost(id, {
          title: postTitle.value,
          description: postText.value,
        });
        editStatus = false;
        id = '';
      }
      taskForm.reset();
      botonGuardar.textContent = 'Guardar';
    }
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
