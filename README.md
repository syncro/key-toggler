# KeyToggler 

web component that shows and hides any element by selector after hotkey pressed

Usage:

```html
<key-toggler target-sl="#header" mod-key="ctrl" key="c"></key-toggler>

<script type="module">
    import { KeyToggler } from '/node_modules/key-toggler/index.js';
    
    customElements.define('key-toggler', KeyToggler);
</script>
```
