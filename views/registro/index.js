//importaciones
import { createNotification } from "../components/notification.js";


//selectores
const form = document.querySelector('#form'); //formulario
//inputs
const name = document.querySelector('#nombre');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password_confirm = document.querySelector('#password_confirm');
const info = document.querySelector('.info')
const notification = document.querySelector('#notificacion');
//boton
const btn = document.querySelector('#btn')


//regex
const REGEX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const REGEX_NAME = /^[A-Z\u00d1][a-zA-Z-ÿí\u00d1]+(\s*[A-Z\u00d1][a-zA-ÿí\u00d1\s]*)$/

//validaciones
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let password_confirmValidation = false;


//funcion

const validation = (input, regexvalidation) => {
    //funcion de activar la funcion
    if (nameValidation && emailValidation && passwordValidation && password_confirmValidation) {
        btn.disabled = false;
        btn.classList.remove('disabled:opacity-60')
      } else {
        btn.disabled = true;
        btn.classList.add('disabled:opacity-60')
        
      }

    if (input.value === '') {
        input.classList.remove('outline-red-700,', 'outline-2', 'outline');
        input.classList.remove('outline-green-500,', 'outline-2', 'outline');
        input.classList.add('focus:outline-indigo-700');
        info.style.display = 'none';
    } else if (regexvalidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.add('outline-green-500', 'outline-2', 'outline');
        info.style.display = 'none';
     } else if (!regexvalidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.remove('outline-green-500', 'outline-2', 'outline');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
        info.style.display = 'block';
        
     }
}



// eventos

name.addEventListener('input', e => {
nameValidation = REGEX_NAME.test(e.target.value);
  validation(name, nameValidation);
})

email.addEventListener('input', e => {
    emailValidation = REGEX_EMAIL.test(e.target.value);
      validation(email, emailValidation);
    })

password.addEventListener('input', e => {
    passwordValidation = REGEX_PASSWORD.test(e.target.value);
    password_confirmValidation = e.target.value === password_confirm.value
    validation(password, passwordValidation);
    validation(password_confirm, password_confirmValidation);
})    

password_confirm.addEventListener('input', e => {
    password_confirmValidation = e.target.value === password.value
    validation(password_confirm, password_confirmValidation);
}) 


form.addEventListener('submit', async e =>{
  e.preventDefault();
  try {
    const newUsers = {
      name: name.value,
      email: email.value,
      password: password.value,
    }

    const { data } = await axios.post('/api/users', newUsers);
    createNotification(false, data);
    setTimeout(() => {
      notification.innerHTML = '';
    }, 5000);

    name.value = '';
    email.value = '';
    password.value = '';
    password_confirm.value = '';

    validation(name, false);
    validation(email, false);
    validation(password, false);
    validation(password_confirm, false);


  } catch (error) {
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML = '';
    }, 5000);
    
    
  }
  

});