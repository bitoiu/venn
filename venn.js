if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(function() {

  var venn_prototype = []
    , venn = {}

  var _union = function(set) {

    var map = this.concat(set)
      .reduce(function(curr, next) {
        curr[uid(next)] = next
        return curr
      }, {})

    var result = []
    for (var key in map) {
      result.push(map[key])
    }

    arraySubclass(result, venn_prototype)
    return result
  }

  var _intersection = function(set) {

    if(!set || set.length == 0 || !this || this.length == 0) {
      set = []
    } else {
      var map = this.reduce(function(curr, next) {
        curr[uid(next)] = next
        return curr
      }, {})

      set = set.filter(function(key){

        var uidKey = uid(key)

        if(map[uidKey])
        {
          delete map[uidKey]
          return true
        }
        return false
      })
    }

    arraySubclass(set, venn_prototype)
    return set
  }

  var uid = function(value) {
    if(typeof value == "string" ) {
      return value
    }
    return JSON.stringify(value)
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

  var arraySubclass = [].__proto__
    ? function(array, prototype) {
    array.__proto__ = prototype
  }
    : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property]
  }

  return {
    create: function(array) {
      return _union.call(array || [], [])
    }
  }
})