
suite('<key-toggler>', () => {

    suiteSetup(() => {
        document.body.insertAdjacentHTML('afterbegin', `
            <div id="header">HEADER</div>
            <key-toggler id="keyToggler" target-sl="#header" mod-key="ctrl" key="c"></key-toggler>
        `);
        customElements.define('key-toggler', KeyToggler);
    });

    test('is key-toggler rendered', (done) => {

        const element = document.getElementById('keyToggler');

        chai.assert.instanceOf(element, KeyToggler);
        done();
    });

    test('is key-toggler toggles on keys pressed', (done) => {

        let target = document.getElementById('header');

        let keyboardEvent = new KeyboardEvent('keydown', { keyCode: 67, ctrlKey: true });
        document.dispatchEvent(keyboardEvent);

        console.log(target);
        chai.assert(target.style.display === 'none');

        done();
    });
});