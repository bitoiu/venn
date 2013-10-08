if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define([
    "../venn-util.js"
  , "../node_modules/chai/chai.js"
  ]
  , function (vennUtil, chai) {

    // Setup
    var should = chai.should()
      , expect = chai.expect
      , testProto = []
      , oneToThree
      , threeToSix

    Object.defineProperty(testProto, "testProperty", {
      value : true,
      writable : false,
      enumerable : false
    })

    return function () {

      describe("venn utils", function() {

        beforeEach(function(){
          oneToThree = [1,2,4]
          threeToSix = [3,4,5,6]
        })

        describe("concat", function() {

          it("it should loose properties after the array concat", function() {

            vennUtil.arraySubClass(oneToThree, testProto)
            vennUtil.arraySubClass(threeToSix, testProto)

            oneToThree.testProperty.should.be.ok

            var newArray = oneToThree.concat(threeToSix)

            expect(newArray.testProperty).not.ok

          })

          it("it should keep properties after the venn concat ", function() {
            vennUtil.arraySubClass(oneToThree, testProto)
            oneToThree.testProperty.should.be.ok
            var newArray = vennUtil.concat(oneToThree, threeToSix)

            newArray.testProperty.should.be.ok
            newArray.length.should.equal(7)
          })
        })

        describe("remove duplicates", function() {

          it("should return empty array", function (){

            var emptyArray = []
            vennUtil.arraySubClass(emptyArray, testProto)
            vennUtil.removeDuplicates(emptyArray)

            emptyArray.length.should.equal(0)
            emptyArray.testProperty.should.be.ok

          })

          it("should remove duplicates if any (no change)", function (){

            vennUtil.arraySubClass(oneToThree, testProto)
            oneToThree.testProperty.should.be.ok
            vennUtil.removeDuplicates(oneToThree)

            oneToThree.length.should.equal(3)
            oneToThree.testProperty.should.be.ok

          })

          it("should remove duplicates (with change)", function (){

            var duplicatedArray = [1,2,3,4,1,1,1,1,12,3,4,1]
            vennUtil.arraySubClass(duplicatedArray, testProto)
            duplicatedArray.testProperty.should.be.ok

            duplicatedArray = vennUtil.removeDuplicates(duplicatedArray)

            duplicatedArray.should.eql([1,2,3,4,12])
            duplicatedArray.testProperty.should.be.ok

          })
        })
      })
    }()
  })
