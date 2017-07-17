(function (Slim) {
  class SlimRouter extends Slim {
    
    constructor() {
      super()
      this.onRoute = this.onRoute.bind(this);
      this.routeMap = {};
      this.isError = false;
      this.currentView = null;
      this.notFoundView = null;
      this.defaultComponent = null;
    }
    
    get useShadow() { return true; }
    
    get template() {
      return `
      <slot name="header"></slot>
      <slot name="outlet"></slot>
      <slot name="footer"></slot>
      `
    }
    
    onAdded() {
      window.addEventListener('hashchange', this.onRoute);
    }
    
    onRemoved() {
      window.removeEventListener('hashchange', this.onRoute);
    }
    
    onCreated() {
      this.scanRoutes()
      this.detectNotFoundView()
      this.onRoute({newURL: window.location.href});
    }

    detectDefault() {
      const element = this.querySelector('route[default]')
      if (element) {
        this.defaultComponent = element.getAttribute('component')
      }
    }

    detectNotFoundView() {
      const element = this.querySelector('*[slot="404"]')
      if (element) {
        this.notFoundView = element.cloneNode(true)
        this.notFoundView.setAttribute('slot', 'outlet')
      }
    }
    
    scanRoutes () {
      const routes = this.querySelectorAll('route');
      for (const route of routes) {
        const path = route.getAttribute('path')
        const isDefault = route.hasAttribute('default')
        const component = route.getAttribute('component')
        let parts = [], root
        if (isDefault) {
          root = '!__DEFAULT__!'
        }
        if (path) {
          parts = path.split('/')
          if (!parts[0]) {
            parts.shift()
          }
          root = parts[0]
        }
        const attributes = Array
          .from(route.attributes)
          .filter(attr => attr.nodeName !== 'path' && attr.nodeName !== 'component')
        this.routeMap[root] = {
          parts,
          component,
          attributes
        }
      }
    }

    createView({component, parts, attributes}, urlParts) {
      const params = {}
      parts.forEach((part, index) => {
        if (parts[index].startsWith(':')) {
          const param = parts[index].substr(1)
          params[param] = decodeURI(urlParts[index])
        }
      })
      const view = document.createElement(component)
      view.routeParams = params;
      attributes.forEach(attr => {
        view.setAttribute(attr.nodeName, attr.nodeValue)
      })
      view.setAttribute('slot', 'outlet')
      return view
    }
    
    onRoute({newURL}) {
      let route, view
      try {
        const idx = newURL.indexOf('#') + 2;
        const parts = newURL.slice(idx).split('/')
        route = this.routeMap[parts[0]]
        if (route) {
          view = this.createView(route, parts)
        } else {
          throw new Error('route not found')
        }
      }
      catch (err) {
        route = this.routeMap['!__DEFAULT__!']
        if (route) {
          view = this.createView(route)
        }
      }
      if (this.currentView) {
        this.currentView.remove()
      }
      if (view) {
        this.currentView = view
        this.appendChild(this.currentView)
        if (this.notFoundView) {
          this.notFoundView.remove()
        }
      } else {
        this.appendChild(this.notFoundView)
      }
    }
  }
  Slim.tag('slim-router', SlimRouter)
})(Slim)