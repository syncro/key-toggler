

import { KeyToggler } from './src/key-toggler.js';

export { KeyToggler };

export const AUTOREG_ATTR_NAME = 'key-toggler-autoreg';
export const AUTOREG_TAG_NAME = 'key-toggler';

export const regKeyToggler = function() {

    if (document && (document.body && document.body.classList.contains(AUTOREG_ATTR_NAME))
        || (document.documentElement && document.documentElement.classList.contains(AUTOREG_ATTR_NAME))) {

        customElements.define(AUTOREG_TAG_NAME, KeyToggler);
    }

}

regKeyToggler();