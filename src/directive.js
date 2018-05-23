import {
  extend
} from './util.js'
import Watcher from './watcher.js'

export default class Directives {
  constructor(descriptor, vm, el) {
    this.descriptor = descriptor
    this.vm = vm
    this.el = el
    this.expression = descriptor.expression
  }
  
  _bind() {
    let def = this.descriptor.def
    if (typeof def === 'function') {
      this.update = def
    } else {
      extend(this, def)
    }

    if (this.bind) this.bind()
    if (this.update) this.update()

    if (this.update) {
      const dir = this
      this._update = function(val, oldVal) {
        dir.update(val, oldVal)
      }
    } else {
      this._update = function() {}
    }

    let watcher = this._watcher = new Watcher(this.vm, this.expression, this._update)

    if (this.update) {
      this.update(watcher.value)
    }
  }
}