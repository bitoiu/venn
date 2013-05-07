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
  //var expect = chai.expect;

  return function () {

    describe("set", function() {

      it("should have empty array with no argument", function() {
        venn.set().result().should.be.empty
      })

      it("should keep different instances", function() {

        var fstSet = venn.set([1,2])
        var sndSet = venn.set()

        fstSet.result().should.not.equal(sndSet.result())
      })

      it("should keep different instances which might have the same result", function() {
        var fstSet = venn.set([1,2])
        var sndSet = venn.set([1,2])

        fstSet.result().should.eql(sndSet.result())
      })

    })

    describe("union", function() {

      it("shouldn't change set if empty", function (){

        venn
          .set([1,2,3])
          .union()
          .result()
          .should.be.eql([1,2,3])

        venn
          .set([1,2,3,4])
          .union([])
          .result()
          .should.be.eql([1,2,3,4])
      })

      it("should create simple union of elements", function() {

        venn
          .set([1,2,3])
          .union([4,5,6])
          .result()
          .should.be.eql([1,2,3,4,5,6])

      })

    })
  }();
});
