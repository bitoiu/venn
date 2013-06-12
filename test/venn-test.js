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

    describe("create", function() {

      it("should have empty array with no argument", function() {
        venn.create().should.be.empty
        venn.create([]).should.be.empty
      })

      it("should keep different instances", function() {
        var fstSet = venn.create([1,2])
        var sndSet = venn.create()

        fstSet.should.not.eql(sndSet)
      })

      it("should keep different instances which might have the same result", function() {
        var fstSet = venn.create([1,2])
        var sndSet = venn.create([1,2])

        fstSet.should.eql(sndSet)
      })

      it("should remove duplicates", function() {
        venn.create([1,1]).should.eql([1])
        venn.create([1,1,2,1]).should.eql([1,2])
        venn.create([1,1,2,2,2,1,3,4,5,1,1,1,]).should.eql([1,2,3,4,5])
      })

    })

    describe("union", function() {

      it("shouldn't change set if empty", function (){

        var fstSet = venn.create([1,2,3])
          .union([])
          .should.be.eql([1,2,3])

        venn.create([])
          .union([1,2,3,4])
          .should.be.eql([1,2,3,4])
      })

      it("should create simple union of elements", function() {

        venn.create([1,2,3])
          .union([4,5,6])
          .should.be.eql([1,2,3,4,5,6])
      })

      it("should prevent duplication of elements", function() {
        venn.create([1,2,3])
          .union([1,4,5,6])
          .should.be.eql([1,2,3,4,5,6])
      })
    })
  }();
});
