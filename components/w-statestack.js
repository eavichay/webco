/**
 * Created by eavichay on 30/03/2017.
 */
Slim.tag(
    'w-statestack',

    `
    `,

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

        onCreated() {
            this.currentState = this.getAttribute('state');
            this.stack = [];
            while (this.firstChild) {
                this.stack.push(this.firstChild);
                this.removeChild(this.firstChild);
            }
        }

        setState(newVal) {
            this.setAttribute('state', newVal);
        }

        update() {
            this.stack.forEach( child => {
                if (child.getAttribute && child.getAttribute('state') !== this.currentState && child.parentNode === this) {
                    this.removeChild(child);
                } else if (child.getAttribute && child.getAttribute('state') === this.currentState) {
                    this.appendChild(child);
                }
            });
            super.update();
        }

});