if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(function() {

  var venn_prototype = []

  var arraySubClass = [].__proto__
    ? function(array, prototype) {
    array.__proto__ = prototype
  }
    : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property]
  }

  var _union = function(set) {

    return removeDuplicates(
      concat(this,set), this.keyFunction)
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

  var _not = function(set) {

    var that = this

    if(!set || set.length == 0 || !this || this.length == 0) {
      return this
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
        if( !visited[key] ) {
          that.push(element)
          delete visited[key]
        }
      })
    }

    return this
  }

  var getKey = function(value) {
    if (!this.keyFunction) {
      return bruteForceKeyFunction(value)
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

  Object.defineProperty(venn_prototype, "or", {
    value : _union,
    writable : false,
    enumerable : false
  });

  Object.defineProperty(venn_prototype, "intersection", {
    value : _intersection,
    writable : false,
    enumerable : false
  })

  Object.defineProperty(venn_prototype, "and", {
    value : _intersection,
    writable : false,
    enumerable : false
  })

  Object.defineProperty(venn_prototype, "not", {
    value : _not,
    writable : false,
    enumerable : false
  })

  return {
    create: function(array, keyFunction) {

      var venn = array ? [].concat(array) : []
      arraySubClass(venn, venn_prototype)

      Object.defineProperty(venn, "keyFunction", {
        writable : false,
        enumerable : false,
        value : keyFunction

      })

      return venn.union([])
    }
  }
    
  /** Helper functions **/

  function concat(vennArray, nonVennArray) {

    nonVennArray.forEach(function(element) {
      vennArray.push(element)
    })

    return vennArray
  }

  function removeDuplicates(vennArray, keyFunction) {

    var copy = [].concat(vennArray)
      , visited = {}
      , key
    vennArray.length = 0

    keyFunction = keyFunction || bruteForceKeyFunction

    copy.forEach(function(element) {

      key = keyFunction(element)

      if( !visited[key] ) {
        vennArray.push(element)
        visited[key] = true
      }
    })

    return vennArray
  }

  function bruteForceKeyFunction(value) {
    if(typeof value == "string" ) {
      return value
    }
    return JSON.stringify(value)
  }
    
})