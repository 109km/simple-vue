import Dep from './dep.js'

let uid = 0

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    vm._watchers.push(this)
    this.vm = vm
    this.expOrFn = expOrFn
    this.expression = expOrFn
    this.cb = cb
    this.id = ++uid
    this.deps = []
    this.depIds = new Set()
    // Call `get` immediately when `watcher` instance is created
    this.value = this.get()

  }
  getter() {
    console.log('getter:',this.vm[this.expOrFn]);
    return this.vm[this.expOrFn]
  }
  setter(value) {
    this.vm[this.expOrFn] = value
  }
  update() {
    this.run()
  }
  run() {
    let value = this.get()
    let oldValue = this.value
    // trigger only when value changes
    if (value != oldValue) {
      this.cb.call(this.vm, value, oldValue)
    }
  }
  get() {
    Dep.target = this
    let value = this.getter.call(this)
    Dep.target = null
    return value
  }
  set(value) {
    this.setter.call(this, value)
  }
  addDep(dep) {
    if (!this.depIds.has(dep.id)) {
      this.deps.push(dep)
      this.depIds.add(dep.id)
      dep.addSub(this)
    }
  }
}