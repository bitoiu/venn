/** Universal Module Definition: https://github.com/umdjs/umd **/
if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function (require, exports, module) {

  var venn = require('../venn');
  var chai = require('chai')
  var should = chai.should();
  var expect = chai.expect;

  return function () {

    describe("union", function() {

      it("should return empty untion", function (){

        var set = venn
                  .set([1,2,3])
                  .union([4])
                  .result()

        set.length.should.equal(4)

      })
    })
  }();
});
