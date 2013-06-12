/** Universal Module Definition: https://github.com/umdjs/umd **/
if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function (require, exports, module) {

  var venn_prototype = []
    , venn = {}

  // Union
  Object.defineProperty(venn_prototype, "union", {
    value : function(set) {
      var val = this.concat(set)
      arraySubclass(val, venn_prototype)
      return val
    },
    writable : false,
    enumerable : false
  });

  // Utils
  var arraySubclass = [].__proto__
    ? function(array, prototype) {
    array.__proto__ = prototype
  }
    : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property]
  }

  var removeDuplicates = function (array) {

    var map = {}
    var result = []

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