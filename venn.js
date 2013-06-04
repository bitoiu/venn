/** Universal Module Definition: https://github.com/umdjs/umd **/
if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function (require, exports, module) {

  var Venn = Array

  Venn.prototype = new Array

  Venn.prototype.union = function (value){
    if(isArray(value)) {
      this.concat(value)
    }
    return this
  }

  Venn.prototype.intersect = function() {
    return this
  }

  /** Utils **/
  var isArray = function(object) {
    return Object.prototype.toString.call( object ) === '[object Array]'
  }

  /** API **/
  var create = function (value) {
    return value ? new Venn(value) : new Venn()
  }

  return {
    create: create
  }

})