

export { KeyToggler } from './src/key-toggler.js';

if (document.body.classList.contains('key-togger-autoreg')) {

    customElements.define('key-toggler', KeyToggler);
}