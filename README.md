A simple implementation of vue.

### How to use
1. Use `npm i` to install the dependent packages
2. Use `webpack-server-dev` to start a server used for devleoping
3. Open `http://localhost:8080/`
4. `index.html` shows the simplest version of Vue, including 3 core concepts `Observer` `Dep` `Watcher`.
And `index2.html` shows a relatively complete version of Vue, except the 3 core concepts mentioned above, this version includes more functions: `directives` `compile`, and it shows how the code connect all these functions together.

### Main code flow

1. Proxy `this.xxx` to `this._data.xxx`. `this._data` is an internal attribute.

2. Proxy `this.$data` to `this._data`.

3. Add watchers to all attributes of `data`, so any `get/set` action will be catched. And build the connection with `Wathcer` through `Dep`.

4. `Dep` is like a box that may contains many `Wather` instances.

5. Compile html according to `el` attribute. Find all directives in the html, and create `Directive` instances for them. In each `directive`, it will also create `watchers` according to the attributes used in the `directive`.

