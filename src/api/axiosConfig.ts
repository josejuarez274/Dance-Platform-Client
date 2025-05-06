import axios from 'axios';

let baseURL;

if (window.location.hostname === 'localhost') {
    baseURL = 'http://localhost:8080';
} else if (window.location.hostname.includes('ngrok')) {
    baseURL = '';//'https://0276-2600-1700-a670-b6d0-94c-70c1-e528-9fa0.ngrok-free.app';
} else {
    baseURL = ''; //'https://dance-platform-service-445921.appspot.com';
}

console.warn('*** BaseURL: ', baseURL)

export default axios.create({
    baseURL: baseURL,
    headers: {'ngrok-skip-browser-warning': 'true'},
});