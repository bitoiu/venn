/** Universal Module Definition: https://github.com/umdjs/umd **/
if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function (require, exports, module) {

  function Venn(initialSet) {
    this.currentSet = initialSet || []
  }

  Venn.prototype.union = function (set){
    this.currentSet = this.currentSet.concat(set)
    return this
  }

  Venn.prototype.intersect = function() {
    return this
  }

  Venn.prototype.result = function () {
    return this.currentSet
  }

  var set = function(value) {
    return new Venn(value)
  }

  return {
    set : set
  }

})