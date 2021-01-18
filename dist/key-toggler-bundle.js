(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

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
  var KEY_DEFAULT = 'c';
  var KEY_ATTR_NAME = 'key';
  var MOD_ATTR_NAME = 'mod-key';
  var METHOD_ATTR_NAME = 'method';
  var EVENT_ATTR_NAME = 'event';
  var TARGET_ATTR_NAME = 'target-sl';
  var KeyToggler = /*#__PURE__*/function (_HTMLElement) {
    _inherits(KeyToggler, _HTMLElement);

    var _super = _createSuper(KeyToggler);

    function KeyToggler() {
      _classCallCheck(this, KeyToggler);

      return _super.apply(this, arguments);
    }

    _createClass(KeyToggler, [{
      key: "isVisible",
      value: function isVisible(el) {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
      }
    }, {
      key: "modKeyPressed",
      value: function modKeyPressed(event) {
        if (this.hasAttribute(MOD_ATTR_NAME)) {
          var value = false;

          switch (this.getAttribute(MOD_ATTR_NAME)) {
            case 'meta':
              value = event.metaKey;
              break;

            case 'shift':
              value = event.shiftKey;
              break;

            default:
              value = event.ctrlKey;
              break;
          }

          return value;
        } else {
          return event.ctrlKey;
        }
      }
    }, {
      key: "letterKeyPressed",
      value: function letterKeyPressed(event) {
        var key = KEY_DEFAULT;

        if (this.hasAttribute(KEY_ATTR_NAME) && this.getAttribute(KEY_ATTR_NAME).match(/a-Az-Z/)) {
          this.key = this.getAttribute(KEY_ATTR_NAME);
        }

        return String.fromCharCode(event.which).toLowerCase() === key;
      }
    }, {
      key: "toggleTarget",
      value: function toggleTarget(event) {
        if (this.modKeyPressed(event) && this.letterKeyPressed(event)) {
          if (this.isVisible(this.targetEl)) {
            this._oldDisplay = this.targetEl.style.display;
            this.targetEl.style.display = 'none';
          } else {
            this.targetEl.style.display = this._oldDisplay || 'block';
          }
        }
      }
    }, {
      key: "callMethod",
      value: function callMethod(event) {
        var methodName = this.getAttribute(METHOD_ATTR_NAME);

        if (methodName && typeof this.targetEl[methodName] === 'function') {
          this.targetEl[methodName].call(this.targetEl, event);
        }
      }
    }, {
      key: "fireEvent",
      value: function fireEvent(event) {
        var eventName = this.getAttribute(EVENT_ATTR_NAME);
        this.targetEl.dispatchEvent(new CustomEvent(eventName));
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        if (this.hasAttribute(METHOD_ATTR_NAME)) {
          this.keyHandle = this.callMethod.bind(this);
        } else if (this.hasAttribute(EVENT_ATTR_NAME)) {
          this.keyHandle = this.fireEvent.bind(this);
        } else {
          this.keyHandle = this.toggleTarget.bind(this);
        }

        document.addEventListener('keydown', this.keyHandle);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.keyHandle) {
          document.removeEventListener('keydown', this.keyHandle);
        }
      }
    }, {
      key: "targetEl",
      get: function get() {
        if (!this._targetEl) {
          if (this.hasAttribute(TARGET_ATTR_NAME)) {
            this._targetEl = document.querySelector(this.getAttribute(TARGET_ATTR_NAME));
          } else {
            console.warn('no selector provided for key toggler custom element');
          }
        }

        return this._targetEl;
      }
    }]);

    return KeyToggler;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  var AUTOREG_ATTR_NAME = 'key-toggler-autoreg';
  var AUTOREG_TAG_NAME = 'key-toggler';
  var regKeyToggler = function regKeyToggler() {
    if (document && document.body && document.body.classList.contains(AUTOREG_ATTR_NAME) || document.documentElement && document.documentElement.classList.contains(AUTOREG_ATTR_NAME)) {
      customElements.define(AUTOREG_TAG_NAME, KeyToggler);
    }
  };
  regKeyToggler();

  exports.AUTOREG_ATTR_NAME = AUTOREG_ATTR_NAME;
  exports.AUTOREG_TAG_NAME = AUTOREG_TAG_NAME;
  exports.KeyToggler = KeyToggler;
  exports.regKeyToggler = regKeyToggler;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=key-toggler-bundle.js.map
