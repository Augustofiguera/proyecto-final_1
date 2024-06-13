import { createNotification } from "../components/notification.js";


const password = document.querySelector('#password');
const email = document.querySelector('#email');
const form = document.querySelector('#form');
const notification = document.querySelector('#notificacion');


form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: email.value,
            password: password.value
        }
        await axios.post('/api/login', user);
        window.location.pathname = `/principal/`
    } catch (error) {
        createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML = '';
    }, 5000);
    }
});
