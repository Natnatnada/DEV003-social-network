// importamos la funcion que vamos a testear

import { registro } from '../src/componentes/registro';

// -----------------Función de registro -----------------

describe('Test registro', () => {
  let emailInput;
  let emailTest;
  let passwordTest;
  let createUserBtn;
  beforeEach(() => {
    document.body.appendChild(registro());
    emailInput = querySelector.emailInput;
  });

  it('debe de registrar nuevas usuarias', () => {
    // dadas
    const signUpFormTest = document.createElement('div');
    signUpFormTest.id = 'signUpTest';

    document.body.append(signUpFormTest);

    registro.appendChild(registro());
    registro();

    // entonces
    const formSignIn = document.querySelector('#formSignInTest');

    expect(formSignIn).not.toBeNull();
    console.log(document.body.innerHTML);
  });
});
// TODO:Crear un archivo spec por cada componente (home, registro...)

// -----------------Función de SignIn -----------------
describe('signUpForm', () => {
  it('sould enter with a registered email', async () => {
    const signUpForm = functionSignin('l_dev003@gmail.com', '123l_dev003');
    await expect(signUpForm).resolves.toEqual('string');
  });
});
