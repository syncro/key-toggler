/**
 *
 * web component that shows and hides any element by selector after hotkey pressed
 *
 * <key-toggler target-sl="#header" mod-key="ctrl" key="c"></key-toggler>

 <script type="module">
 import { KeyToggler } from '/path/to/key-toggler.js';

 customElements.define('key-toggler', KeyToggler);
 </script>
 *
 *
 */

export const KEY_DEFAULT = 'c';
export const KEY_ATTR_NAME = 'key';
export const MOD_ATTR_NAME = 'mod-key';
export const METHOD_ATTR_NAME = 'method';
export const EVENT_ATTR_NAME = 'event';
export const TARGET_ATTR_NAME = 'target-sl';

export class KeyToggler extends HTMLElement {

    isVisible(el) {
        return !! (el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }

    get targetEl() {
        if (! this._targetEl) {
            if (this.hasAttribute(TARGET_ATTR_NAME)) {
                this._targetEl = document.querySelector(this.getAttribute(TARGET_ATTR_NAME));
            } else {
                console.warn('no selector provided for key toggler custom element');
            }
        }
        return this._targetEl;
    }

    modKeyPressed(event) {
        if (this.hasAttribute(MOD_ATTR_NAME)) {
            let value = false;
            switch (this.getAttribute(MOD_ATTR_NAME)) {
                case 'meta':
                    value = (event.metaKey);
                    break;
                case 'shift':
                    value = (event.shiftKey);
                    break;
                default:
                    value = (event.ctrlKey);
                    break;
            }
            return value;
        } else {
            return (event.ctrlKey);
        }
    }

    letterKeyPressed(event) {
        let key = KEY_DEFAULT;
        if (this.hasAttribute(KEY_ATTR_NAME) && this.getAttribute(KEY_ATTR_NAME).match(/a-Az-Z/)) {
            this.key = this.getAttribute(KEY_ATTR_NAME);
        }
        return (String.fromCharCode(event.which).toLowerCase() === key);
    }

    toggleTarget(event) {
        if (this.modKeyPressed(event) && this.letterKeyPressed(event)) {
            if (this.isVisible(this.targetEl)) {
                this._oldDisplay = this.targetEl.style.display;
                this.targetEl.style.display = 'none';
            } else {
                this.targetEl.style.display = this._oldDisplay || 'block';
            }
        }
    }

    callMethod(event) {
        let methodName = this.getAttribute(METHOD_ATTR_NAME);
        if (methodName && typeof this.targetEl[methodName] === 'function') {
            this.targetEl[methodName].call(this.targetEl, event);
        }
    }

    fireEvent(event) {
        let eventName = this.getAttribute(EVENT_ATTR_NAME);
        this.targetEl.dispatchEvent(new CustomEvent(eventName));
    }

    connectedCallback() {
        if (this.hasAttribute(METHOD_ATTR_NAME)) {
            this.keyHandle = this.callMethod.bind(this);
        } else if (this.hasAttribute(EVENT_ATTR_NAME)) {
            this.keyHandle = this.fireEvent.bind(this);
        } else {
            this.keyHandle = this.toggleTarget.bind(this);
        }
        document.addEventListener('keydown', this.keyHandle);
    }

    disconnectedCallback() {
        if (this.keyHandle) {
            document.removeEventListener('keydown', this.keyHandle);
        }
    }
}

