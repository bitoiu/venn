if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(
  [ "../venn.js"
  , "../node_modules/chai/chai.js"
  ]
  , function (venn, chai) {

  var should = chai.should()
  , expect = chai.expect

  return function () {

    describe("venn with literals", function() {

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

      describe("intersection", function() {

        it("should return the intersection set", function() {

          // Empty intersections
          venn.create([1,2,3])
            .intersection([])
            .should.eql([])

          venn.create([])
            .intersection([1])
            .should.eql([])

          venn.create([])
            .intersection([])
            .should.eql([])

          // Non empty intersections
          venn.create([1,2,3])
            .intersection([2])
            .should.eql([2])

          venn.create([1,2,5,"a"])
            .intersection(["a"])
            .should.eql("a")

          venn.create([1,2,3,4,5,6])
            .intersection([1,3,4,5])
            .intersection([1,2,3,4])
            .intersection([1])
            .should.eql([1])

        })

        it("should prevent duplication of elements", function() {

          venn.create([1,2,3,4])
            .intersection([2,2])
            .should.eql([2])

          venn.create([1,2,3,4])
            .intersection([2,2,4])
            .should.eql([2,4])
        })

      })
    })
  }();
});
