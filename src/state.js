import {observe} from './observe'

export default function(Vue) {

  // proxy `this.$data.xxx` to `this._data.xxx`
  Object.defineProperty(Vue.prototype, '$data', {
    get() {
      return this._data
    },
    set(newData) {
      if (newData != this._data) {
        this._setData(newData)
      }
    }
  })

  // Init state
  Vue.prototype._initState = function() {
    this._initData()
  }

  // Init data
  Vue.prototype._initData = function() {

    // if `data` is pure function could be much better
    let dataFn = this.$options.data

    let data = this._data = dataFn ? (typeof dataFn === 'function' ? dataFn() : dataFn) : {}

    let keys = Object.keys(data)

    let len = keys.length
    let i, key
    
    for (i = 0; i < len; i++) {
      key = keys[i]
      // proxy this attribute to `this._data.xxx`
      // so that data's source is all from `this._data`
      this._proxy(key)
    }
    // observe `data` object
    observe(data, this)
  }

  // proxy `this.xxx` to `this._data.xxx`
  Vue.prototype._proxy = function(key) {
    let _this = this
    Object.defineProperty(_this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return _this._data[key]
      },
      set(newData) {
        _this._data[key] = newData
      }
    })
  }
}