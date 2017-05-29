/**
 * Created by eavichay on 30/03/2017.
 */
Slim.tag(
    'w-statestack',

    ``,

    class extends Slim {

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue === newValue) {
                return;
            }

            if (name === 'state') {
                this.currentState = newValue;
                this.update();
            }
        }

        onBeforeCreated() {
            this._initialize();
        }

        setState(newVal) {
            this.setAttribute('state', newVal);
        }

        _initialize() {
            if (this._created) return;
            this.currentState = this.getAttribute('state');
            this.stack = [];
            while (this.firstChild) {
                this.stack.push(this.firstChild);
                this.removeChild(this.firstChild);
            }
            this._created = true;
            this.update();
        }

        onAdded() {
            this._initialize();
        }

        update() {
            if (!this.stack) {
                this.onBeforeCreated();
            }
            this.stack.forEach( child => {
                if (child.getAttribute && child.getAttribute('in-state') !== this.currentState && child.parentNode === this) {
                    this.removeChild(child);
                } else if (child.getAttribute && child.getAttribute('in-state') === this.currentState) {
                    this.appendChild(child);
                }
            });
            super.update();
        }

});