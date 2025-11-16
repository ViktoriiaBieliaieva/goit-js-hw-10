import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const delay = Number(formEl.elements.delay.value);
    const state = formEl.elements.state.value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                icon: '',
                position: 'topRight',
                messageColor: '#fff',
                messageSize: '16px',
                color: '#59a10d',
                close: false,
                progressBar: false,
                animateInside: false,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut'

            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                icon: '',
                position: 'topRight',
                messageColor: '#fff',
                messageSize: '16px',
                color: '#ef4040',
                close: false,
                progressBar: false,
                animateInside: false,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut'
            });
        });
    formEl.reset();
});


