/** Universal Module Definition: https://github.com/umdjs/umd **/
if (typeof module === 'object' && typeof define !== 'function') {
  var define = function (factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function (require, exports, module) {

  var venn = require('../venn')
    , chai = require('chai')
    , should = chai.should()
    , expect = chai.expect

  return function () {

    describe("init", function() {

      it("should have empty array with no argument", function() {
        venn.create().should.be.empty

      })

      it("should keep different instances", function() {

        var fstSet = venn.create([1,2])
        var sndSet = venn.create()

        fstSet.should.not.equal(sndSet)
      })

      it("should keep different instances which might have the same result", function() {
        var fstSet = venn.create([1,2])
        var sndSet = venn.create([1,2])

        fstSet.should.eql(sndSet)
      })

    })

    describe("union", function() {

      it("shouldn't change set if empty", function (){

        venn.create([1,2,3])
          .union([])
          .should.be.eql([1,2,3])

        venn.create([1,2,3,4])
          .union([])
          .should.be.eql([1,2,3,4])
      })

      it("should create simple union of elements", function() {

        venn.create([1,2,3])
          .union([4,5,6])
          .should.be.eql([1,2,3,4,5,6])
      })
    })
  }();
});
