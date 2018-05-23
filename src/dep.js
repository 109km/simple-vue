/**
 * `Dep` class
 * Used for connecting data and watcher
 */

let uid = 0

export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
}

Dep.target = null

// Add sub watcher
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub)
}

// Add current Dep.target to `subs`
Dep.prototype.depend = function() {
  Dep.target.addDep(this)
}

Dep.prototype.removeSub = function(sub) {
  this.subs.$remove(sub)
}

Dep.prototype.notify = function() {
  let subs = this.subs
  let i = 0,
    len = subs.length

  for (; i < len; i++) {
    subs[i].update()
  }
}