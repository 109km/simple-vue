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
      def:def,
      rawValue: value,
      expression: value
    })
  }

  if (dirs.length) return makeNodeLinkFn(dirs)

}

function makeNodeLinkFn(directives) {
  return function nodeLinkFn(vm, el) {
    let i = directives.length
    while (i--) {
      vm._bindDir(directives[i], el)
    }
  }
}

// only for the root element
export const compile = function(el, options) {
  if (el.hasChildNodes()) return function(vm, el) {
    const nodeLink = compileNode(el, options)
    const childLink = compileNodeList(el.childNodes, options)
    nodeLink && nodeLink(vm, el)
    childLink && childLink(vm, el)
    vm._directives.forEach((v) => {
      v._bind()
    })
  }
  else return function(vm, el) {
    compileNode(el, options)
    vm._directives.forEach((v) => {
      v._bind()
    })
  }
}

function compileNodeList(nodeList, options) {
  const links = []
  for (var i = 0; i < nodeList.length; i++) {
    const el = nodeList[i]
    let link = compileNode(el, options)
    link && links.push(link)
    if (el.hasChildNodes()) {
      link = compileNodeList(el.childNodes, options)
      link && links.push(link)
    }
  }

  return function(vm, el) {
    let i = links.length
    while (i--) {
      links[i](vm, el)
    }
  }
}

function compileNode(el, options) {
  return compileDirectives(el, el.attributes)
}