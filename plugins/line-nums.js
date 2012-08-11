
//show line numbers.
//line numbers are drawn into
//the space provided by the "margin".
//option. 
//you can make it as wide as you want.

module.exports = function (doc) {

  var rc = this.config

  function padNum(n, m) {
    n = '' + n
    while(n.length < m)
      n = '0' + n
    return n.slice(n.length - (m))
  }

  this.renderers.push(function (line, x, y) {

    if(rc.margin) { 
      var num = padNum(y, rc.margin - 1)
      num = num[ y % 2 ? 'yellow' : 'green']
      y % 10 || (num = num.bold) 
      return num + ' ' + line 
    }

  })
}
