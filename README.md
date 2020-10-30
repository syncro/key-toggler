# KeyToggler 

web component that shows and hides any element by selector after hotkey pressed

Usage:

```html
<div id="header">HEADER</div>
<key-toggler target-sl="#header" mod-key="ctrl" key="c"></key-toggler>

<script type="module">
    import { KeyToggler } from '/node_modules/key-toggler/index.js';
    
    customElements.define('key-toggler', KeyToggler);
</script>
```

Note: Don't forget to put focus on web browser tab;)