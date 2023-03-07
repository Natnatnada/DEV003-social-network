import {
  signOff, saveTask, getTask, obtenerPost,
  // llamar funcion delete
  deletePost,
} from '../lib';
// eslint-disable-next-line no-unused-vars
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
    saveTask(title, description);
    taskForm.reset();
  });

  getTask().then(() => {
    console.log('hola muro');
  });

  obtenerPost((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      html += `
        <div class= 'postIndividual'>
        <p>${post.title}</p>
        <p class='description-text'>${post.description}</p>
        <div class= 'btnpost'>
        <button class='deletebtn' data-id='${doc.id}'>Eliminar</button>
        </div>
        </div>
        `;
    });
    feedContainer.innerHTML = html;
    //  funcion para buttonsdelete
    const buttonsdelete = feedContainer.querySelectorAll('.deletebtn');
    // console.log(buttonsdelete);
    buttonsdelete.forEach((button) => {
      // event es un objeto por lo que se extrae el target
      button.addEventListener('click', ({ target: { dataset } }) => {
        // console.log(event.target.dataset.id);
        // console.log(dataset.id);
        deletePost(dataset.id);
      });
    });
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
