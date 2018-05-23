import dirOn from './directives/on.js'
import dirText from './directives/text.js'
import dirModel from './directives/model.js'

const onRe = /^v-on:|^@/
const modelRe = /^v-model/
const textRe = /^v-text/
const dirAttrRe = /^v-([^:]+)(?:$|:(.*)$)/

export const compileDirectives = function(el, attrs) {
  if (!attrs) return
  const dirs = []

  let i = attrs.length

  while (i--) {
    const attr = attrs[i]
    const name = attr.name
    const value = attr.value
    let arg = name
    if (name.match(dirAttrRe)) {
      if (onRe.test(name)) {
        arg = name.replace(onRe, '')
        pushDir('on', dirOn, arg, value)
      } else if (modelRe.test(name)) {
        arg = name.replace(modelRe, '')
        pushDir('model', dirModel, arg, value)
      } else if (textRe.test(name)) {
        arg = name.replace(textRe, '')
        pushDir('text', dirText, arg, value)
      }
    }
  }

  function pushDir(dirName, def, arg, value) {
    dirs.push({
      el: el,
      name: dirName,
      rawName: name,
      arg: arg,
      value: value,
      rawValue: value,
      expression: value
    })
  }
}