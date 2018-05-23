import Dep from './dep.js'

// class `Observer` 
class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    this.walk(value)
  }
}

Observer.prototype.walk = function(obj) {
  let keys = Object.keys(obj),
    i = 0,
    len = keys.length;
  for (; i < len; i++) {
    this.convert(keys[i], obj[keys[i]])
  }
}

Observer.prototype.convert = function(key, value) {
  defineReactive(this.value, key, value)
}

Observer.prototype.addVm = function(vm) {
  if (!this.vms) {
    this.vms = []
  }
  this.vms.push(vm)
}

export function observe(value, vm) {
  let ob = new Observer(value)
  ob.addVm(vm)
  return ob
}

function defineReactive(obj, key, value) {
  let dep = new Dep()

  let property = Object.getOwnPropertyDescriptor(obj, key)

  if (property && property.configurable === false) {
    return
  }

  let getter = property && property.get
  let setter = property && property.set

  // collect dependencies
  Object.defineProperty({
    enumerable: true,
    configurable: true,
    get() {
      let val = getter ? getter.call(obj) : val
      // If is triggered by inner dependencies collecting progress
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      let val = getter ? getter.call(obj) : val
      if (newVal === val) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}