if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(function() {

  var venn_prototype = []
    , venn = {}

  // Union
  Object.defineProperty(venn_prototype, "union", {
    value : function(set) {
      var result = removeDuplicates(this.concat(set))
      arraySubclass(result, venn_prototype)
      return result
    },
    writable : false,
    enumerable : false
  });

  // Intersection
  Object.defineProperty(venn_prototype, "intersection", {
    value : function (set) {
      var result = intersection(this,set)
      arraySubclass(result, venn_prototype);
      return result
    },
    writable : false,
    enumerable : false
  })

  // Utils
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
      map[value] = {
        count: 1,
        value: value
      }
    })

    secondSet.forEach(function(value) {
      if(map[value]) {
        map[value].count = 2;
      }
    })

    for (var key in map) {
      if( map[key].count == 2) {
        result.push(map[key].value)
      }
    }

    return result
  }

  // this could be the body of union, and create is a union([])
  // thus removing duplicates
  var removeDuplicates = function (array) {

    var map = {}
      , result = []

    array = array || []

    array.forEach(function(value) {
      map[value] = value
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