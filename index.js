#!/usr/bin/env node

var fs = require('fs')
var rc = require('./config')
var ls = fs.createWriteStream('./debug.log')
var Document = require('./document')
var key = require('keypress')
var render = require('./render')

key(process.stdin)

process.stdin.setRawMode(true)
process.stdin.resume()

function Hipster (rc, doc) {

  var offset = 0 
  var height = rc.height

  //internal representation of our text file
  doc = doc || new Document()
 
  render = render(doc, rc)
 
  var hip = {

    config: rc,

    plugins: [],

    //the list of things that want to draw.
    renderers: render.renderers,
 
    //the thing that owns drawing. 
    render: render,

    //pass this things to use
    use: function (plugin) {
      if(plugin)
        this.plugins.push(plugin)
      return this
    },

    init: function () {
      var self = this
      this.plugins.forEach(function (plug) {
        plug.call(self, doc, process.stdin, render)
      })
      render.redraw()
      render.cursor(1, 1)
      return this
    }
  }

  return hip
}

var hipster = Hipster(require('./config'))
  .use(require('./plugins/basics'))
  .use(require('./plugins/entry'))
  .use(require('./plugins/easy-writer'))
  .use(require('./plugins/movement'))
  .use(require('./plugins/selection')) //MUST come after movement.
  .use(require('./plugins/line-nums')) //MUST come after selection.
  .use(require('./plugins/control'))
  .init()

