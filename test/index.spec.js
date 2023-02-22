// importamos la funcion que vamos a testear

// import { async } from 'regenerator-runtime';
import { registro } from '../src/componentes/registro';

jest.mock('..src/lib/firebase');

function tick() {
  return new Promise ((resolve) => {
    setTimeout(resolve, 0);
  });
}

// -----------------Función de registro -----------------

describe('Test registro', () => {
  let emailInput;
  let inputPsw;
  let createAcount;
  let emailErrT;

  beforeEach(() => {
    document.body.appendChild(registro());
    emailInput = document.getElementById('emailInput');
    inputPsw = document.getElementById('inputPsw');
    createAcount = document.getElementById('createAccount');
    emailErrT = document.getElementById('emailErrT');
  });

  it('debe mostrar error', async () => {
    registro.mockImplementationOnce((email, password) => {
      return Promise.reject(
        new Error('Firebase:Error (auth/invalid-email).'),
      );
    });

    inputForSend.click();
await tick();
    expect(emailErrT.innerHTML).toBe(
            'Firebase:Error (auth/invalid-email).',
            console.log('Error:' + emailErrT.innerHTML)); 
     );
});

/* inputForEmail.value = 'labo-girl2@gmail.com';
inputForPassword.value = '1234567';

        inputForSend.click();
await tick();
expect(succcessMessage.innerHTML).toBe(
'email@verify.com'
);
});
});
*/
/* dadas
    const signUpFormTest = document.createElement('div');
    signUpFormTest.id = 'signUpTest';

    document.body.append(signUpFormTest);

    registro.appendChild(registro());
    registro();

     entonces
    const formSignIn = document.querySelector('#formSignInTest');

    expect(formSignIn).not.toBeNull();
    console.log(document.body.innerHTML);
  });
});
 TODO:Crear un archivo spec por cada componente (home, registro...)

 -----------------Función de SignIn -----------------
describe('signUpForm', () => {
  it('sould enter with a registered email', async () => {
    const signUpForm = functionSignin('l_dev003@gmail.com', '123l_dev003');
    await expect(signUpForm).resolves.toEqual('string');
  }); */
// });
