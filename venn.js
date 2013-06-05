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

  return {
    create: function(array) {
      array = array || []
      arraySubclass(array, venn_prototype)
      return array
    }
  }

})