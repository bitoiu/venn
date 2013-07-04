if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(function() {

  var venn_prototype = []
    , venn = {}

  var _union = function(set) {
    var result = removeDuplicates(this.concat(set))
    arraySubclass(result, venn_prototype)
    return result
  }

  var _intersection = function(set) {
    var result = intersection(this,set)
    arraySubclass(result, venn_prototype);
    return result
  }

  var arraySubclass = [].__proto__
    ? function(array, prototype) {
    array.__proto__ = prototype
  }
    : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property]
  }

  var intersection = function (firstSet, secondSet) {

    if (!firstSet || firstSet.length == 0 || !secondSet || secondSet.length == 0) {
      return []
    }

    var map = {}
      , result = []


    firstSet.forEach(function(value) {
      map[JSON.stringify(value)] = {
        count: 1,
        value: value
      }
    })

    secondSet.forEach(function(value) {

      var hash = JSON.stringify(value)

      if(map[hash]) {
        map[hash].count = 2;
      }
    })

    for (var key in map) {
      if( map[key].count == 2) {
        result.push(map[key].value)
      }
    }

    return result
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

  // this could be the body of union, and create is a union([])
  // thus removing duplicates
  var removeDuplicates = function (array) {

    var map = {}
      , result = []

    array = array || []

    array.forEach(function(value) {
      map[JSON.stringify(value)] = value
    })

    for (var key in map) {
      result.push(map[key])
    }

    return result
  }

  return {
    create: function(array) {
      array = removeDuplicates(array)
      arraySubclass(array, venn_prototype)
      return array
    }
  }

})