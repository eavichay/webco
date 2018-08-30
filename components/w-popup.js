Slim.tag('w-popup',
``,
class extends Slim {

  get template () {
    return `
      <style>
        :host {
          display: inline;
          position: relative;
          width: auto;
          user-select: none;
          height: auto;
        }

        #trigger {
          cursor: context-menu;
          position: absolute;
        }

        #content {
          width: max-content;
          position: absolute;
          display: block;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid black;
          border-radius: 3px;
          padding: 5px;
        }
      </style>

      <div id="wrapper">
        <span id="trigger" s:if="!toggled" s:id="trigger" mousedown="toggle">
          <slot name="trigger"></slot>
        </span>
        <span click="toggle" id="content" s:if="toggled" s:id="content">
          <slot name="content"></slot>
        </span>
      </div>

      <style s:if="boxShadow">
        #content {
          box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 2px 0;
        }
      </style>
    `;
  }

  get useShadow () {
    return true;
  }

  constructor () {
    super();
    this.toggled = false;
    this.boxShadow = false;
    this.keepTrigger = false;
    this.hide = (evt) => {
      if (!evt) {
        this.toggled = false;
        return;
      }
      this.toggled = this.toggled && evt.path.includes(this);
    }
  }

  updateConfig () {
    this.boxShadow = this.hasAttribute('with-shadow');
  }

  static get observedAttributes () {
    return ['with-shadow'];
  }

  attributeChangedCallback (name, val, oldVal) {
    super.attributeChangedCallback(name, val, oldVal);
    this.updateConfig();
  }

  toggle () {
    this.toggled = !this.toggled;
  }

  show () {
    this.toggled = true;
  }

  connectedCallback () {
    super.connectedCallback();
    this.updateConfig();
    window.addEventListener('mousedown', this.hide);
    window.addEventListener('mouseup', this.hide);
  }

  disconnectedCallback () {
    window.removeEventListener('mousedown', this.hide);
    window.removeEventListener('mouseup', this.hide);
  }

});