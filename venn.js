if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(["./venn-util.js"]
 , function(vennUtil) {

  var venn_prototype = []

  var _union = function(set) {

    return vennUtil.removeDuplicates(
      vennUtil.concat(this,set), this.keyFunction)
  }

  var _intersection = function(set) {

    var that = this

    if(!set || set.length == 0 || !this || this.length == 0) {
      this.length = 0
    } else {

      var copiedVenn = [].concat(this)
        , visited = {}
        , key

      this.length = 0

      set.forEach(function(element) {
        visited[getKey.call(that,element)] = true
      })

      copiedVenn.forEach(function(element) {

        key = getKey.call(that,element)
        if( visited[key] ) {
          that.push(element)
          delete visited[key]
        }
      })
    }

    return this
  }

  var getKey = function(value) {
    if (!this.keyFunction) {
      return vennUtil.bruteForceKey(value)
    } else {
      return this.keyFunction(value)
    }
  }

  // Venn properties
  Object.defineProperty(venn_prototype, "union", {
    value : _union,
    writable : false,
    enumerable : false
  });

  Object.defineProperty(venn_prototype, "intersection", {
    value : _intersection,
    writable : false,
    enumerable : false
  })

  return {
    create: function(array, keyFunction) {

      var venn = array ? [].concat(array) : []
      vennUtil.arraySubClass(venn, venn_prototype)

      Object.defineProperty(venn, "keyFunction", {
        writable : false,
        enumerable : false,
        value : keyFunction

      })

      return venn.union([])
    }
  }
})