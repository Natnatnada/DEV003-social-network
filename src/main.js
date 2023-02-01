// eslint-disable-next-line import/no-cycle
import { home } from './componentes/home.js';
// eslint-disable-next-line import/no-cycle
import { registro } from './componentes/registro.js';
// eslint-disable-next-line import/no-cycle
import { logIn } from './componentes/logIn.js';
//import { feed } from './componentes/feed.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': home,
  '/logIn': logIn,
  '/registro': registro,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  rootDiv.removeChild(rootDiv.firstChild);
  rootDiv.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];

window.onpopstate = () => {
  rootDiv.removeChild(rootDiv.firstChild);
  rootDiv.append(component());
};
rootDiv.appendChild(component());

