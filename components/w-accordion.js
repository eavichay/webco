Slim.tag('w-accordion', class extends Slim {
    get template() {
        return `<div slim-repeat="sections" section><div click="toggle" title="[[data.title]]"></div><div content></div></div>`;
    }
    onBeforeCreated() {
        this.sections = [];
        this.accordionHeight = this.getAttribute('height');
    }

    onCreated() {
        const sections = this.rootElement.querySelectorAll('section');
        sections.forEach( section => {
            this.removeChild(section);
            this.sections.push({
                element: section,
                title: section.getAttribute('title')
            });
        });
    }

    onAfterUpdate() {
        this.rootElement.querySelectorAll('div[content]').forEach( (div, idx) => {
            div.appendChild(this.sections[idx].element);
            div.style.height = 0;
            div.style.overflow = 'hidden';
            div.style.transitionProperty = 'height';
            div.style.transitionDuration = '0.3s';
        });
        this.rootElement.querySelectorAll('div[title]').forEach( (div, idx) => {
            div.innerText = this.sections[idx].title;
            div.section = this.sections[idx];
        })
    }

    toggle(e) {
        this.sections.forEach( section => {
            if (e.target.section === section) {
                section.element.parentNode.style.height = this.accordionHeight;
                section.element.parentNode.style.overflow = 'auto';
            } else {
                section.element.parentNode.style.height = 0;
                section.element.parentNode.style.overflow = 'hidden';
            }
        });
    }
});