Slim.tag('w-select',
``,
class extends Slim {

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'w-options') {
            if (this.wOptions instanceof Array) {
                this.doRender();
                this.selectedOptions = this.select_element.selectedOptions;
            }
        }
    }

    doRender() {
        this.render(`<select #select_element change="handleChange"><option slim-repeat="wOptions" bind value="[[data.${this.valueKey}]]">[[data.${this.labelKey}]]</option></select>`)
    }

    get value() {
        if (this.select_element) {
            return {
                item: this.selectedOptions[0].data,
                value: this.select_element.value,
                label: this.select_element.selectedOptions[0].textContent
            };
        }
    }

    handleChange(e) {
        this.selectedOptions = e.target.selectedOptions;
        this.callAttribute('select', this.value);
    }

});