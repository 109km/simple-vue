import lifecycle from './lifecycle'
import state from './state'

class Vue {
  constructor(options) {
    this.init(options)
  }
  // init the instance
  init(options) {
    this._directives = []
    this._watchers = []

    let el = document.querySelector(options.el)

    this.$options = options

    for (let k in options.methods) {
      this[k] = options.methods[k]
    }

    // init state
    this._initState()

    // compile html to el
    this._compile(el, options)

  }

}

state(Vue)
lifecycle(Vue)

window.Vue = Vue