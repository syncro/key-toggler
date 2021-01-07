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
export const TARGET_ATTR_NAME = 'target-sl';

export class KeyToggler extends HTMLElement {

    isVisible(el) {
        return !! (el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }

    get menuEl() {
        if (! this._menuEl) {
            if (this.hasAttribute(TARGET_ATTR_NAME)) {
                this._menuEl = document.querySelector(this.getAttribute(TARGET_ATTR_NAME));
            } else {
                console.warn('no selector provided for MenuTogler custom element');
            }
        }
        return this._menuEl;
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
            if (this.isVisible(this.menuEl)) {
                this._oldDisplay = this.menuEl.style.display;
                this.menuEl.style.display = 'none';
            } else {
                this.menuEl.style.display = this._oldDisplay || 'block';
            }
        }
    }

    connectedCallback() {
        this.keyHandle = this.toggleTarget.bind(this);
        document.addEventListener('keydown', this.keyHandle);
    }

    disconnectedCallback() {
        if (this.keyHandle) {
            document.removeEventListener('keydown', this.keyHandle);
        }
    }
}

