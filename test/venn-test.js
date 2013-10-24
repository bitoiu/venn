if (typeof define !== 'function') { var define = require('amdefine')(module, require) }

define(
  [ "../venn.js"
  , "../node_modules/chai/chai.js"
  , "../node_modules/lodash/lodash.js"
  ]
  , function (venn, chai, lodash) {

  var should = chai.should()
  , expect = chai.expect

  return function () {

    // Set-up
    var keyFunction = function(person) {
      return person.name
    }

    // People
    var jane20 = {name: "jane", age: "20"}
      , bob30  = {name: "bob",  age: "30"}
      , jane40 = {name: "jane", age: "40"}
      , eric40 = {name: "eric", age: "40"}
      , personSetWithDuplicatedName = [jane20, bob30, jane40]
      , personSetWithDuplicatedObject = [jane20, bob30, jane20]
      , personDistinctSet = [jane20, bob30, eric40]

    describe("venn", function() {

      describe("create", function() {

        it("should return empty array if no args provided", function() {
          venn.create().should.be.empty
          venn.create([]).should.be.empty
        })

        it("should return different instances", function() {
          var fstSet = venn.create([1,2])
          var sndSet = venn.create()

          fstSet.should.not.eql(sndSet)
        })

        it("should not make argument a venn object", function() {

          var objList = venn.create(personDistinctSet)
          expect(personDistinctSet.union).not.be.ok

        })

        it("should remove duplicates and keep ordering (first come first served)", function() {
          venn.create([1,1]).should.eql([1])
          venn.create([1,1,2,1]).should.eql([1,2])
          venn.create([1,1,2,2,2,1,3,4,5,1,1,1,]).should.eql([1,2,3,4,5])

          var objList = venn.create(personSetWithDuplicatedObject)
          var customKeyObjList = venn.create(personSetWithDuplicatedName, keyFunction)

          objList.length.should.equal(2)
          objList[0].should.eql(jane20)
          objList[1].should.eql(bob30)

          customKeyObjList.length.should.equal(2)
          customKeyObjList[0].should.eql(jane20)
          customKeyObjList[1].should.equal(bob30)
        })
      })

      describe("union", function() {

        it("shouldn't change set if empty and keeps order", function (){

          venn.create([1,2,3])
            .union([])
            .should.be.eql([1,2,3])

          venn.create([])
            .union([1,2,3,4])
            .should.be.eql([1,2,3,4])

          var objList = venn.create(personDistinctSet)
            .union([])
            .or([])

          objList.length.should.equal(3)
          lodash.find(objList, jane20).should.be.ok
          lodash.find(objList, bob30).should.be.ok
          lodash.find(objList, eric40).should.be.ok

          objList[0].should.equal(jane20)
          objList[2].should.equal(eric40)

        })

        it("should create union of elements (numbers)", function() {

          var vennInstance = venn.create([1,2,3])
            .or([4,5,6])

          vennInstance.should.be.eql([1,2,3,4,5,6])
          vennInstance.union([1,2,3,4,5,6,7])
          vennInstance.should.be.eql([1,2,3,4,5,6,7])

        })

        it("should create union of elements (objects)", function() {

          var noKeyList = venn.create(personDistinctSet)
            .union(personSetWithDuplicatedName)
            .or([])
            .union([{name:"bob", age:"100"}])

           noKeyList.length.should.equal(5)
           lodash.find(noKeyList, jane20).should.be.ok
           lodash.find(noKeyList, jane40).should.be.ok
           lodash.find(noKeyList, bob30).should.be.ok
           lodash.find(noKeyList, eric40).should.be.ok
           lodash.find(noKeyList, {name: "bob", age :  "100"}).should.be.ok

          keyList = venn.create(personDistinctSet, keyFunction)
            .or(personSetWithDuplicatedName)
            .or([])
            .or([{name:"bob", age:"100"}])

          keyList.length.should.equal(3)
          lodash.find(keyList, jane20).should.be.ok
          lodash.find(keyList, bob30).should.be.ok
          lodash.find(keyList, eric40).should.be.ok

        })
      })

      describe("intersection", function() {

        it("should return empty intersection sets", function() {

          // Empty intersections
          venn.create([1,2,3])
            .intersection([])
            .should.eql([])

          venn.create([])
            .and([1])
            .should.eql([])

          venn.create([1,2,3])
            .and([1,2,3])
            .and([])
            .should.be.empty

          venn.create([])
            .intersection([])
            .should.eql([])

        })

        it("should return intersection set", function(){

          // Non empty intersections
          venn.create([1,2,3])
            .intersection([2])
            .should.eql([2])

          var vennInstance = venn.create([1,2,5,"a"])
          vennInstance.intersection(["a"]).should.eql("a")

          // Tests order as well
          venn.create([1,2,3,4,5,6])
            .intersection([1,3,4,5])
            .and([1,2,3,4])
            .and([1])
            .should.eql([1])

          venn.create([1,2,3])
            .and([3,2,1])
            .and([1,2,3,1,2,3])
            .and([3,2,1])
            .and([3,2,1,1,2,3,1,2,2,2,-1000,10])
            .should.eql([1,2,3])
        })

        it("should return intersection set (objects)", function() {

          var noKeyList = venn.create(personDistinctSet)
            .intersection(personSetWithDuplicatedName)
            .and(personSetWithDuplicatedName)
            .intersection(personDistinctSet)


          noKeyList.length.should.equal(2)
          lodash.find(noKeyList, jane20).should.be.ok
          lodash.find(noKeyList, bob30).should.be.ok

          // tests order
          with (noKeyList[0]) {
            name.should.equal(jane20.name)
            age.should.equal(jane20.age)
          }

          var keyList = venn.create(personSetWithDuplicatedName, keyFunction)
            .intersection(personDistinctSet)

          keyList.length.should.equal(2)
          lodash.find(keyList, jane20).should.be.ok
          lodash.find(keyList, bob30).should.be.ok

          // tests order
          keyList[0].should.eql(jane20)
        })
      })

      describe("not", function() {

        it("should have no impact on empty sets", function() {

          var vennSet = venn.create([])
            .not([])

          vennSet.not([1,2,3])
          vennSet.not([4,5,6])
          vennSet.should.be.empty

          vennSet = venn.create([1,2,3])
            .not([10,11,12])
            .not([])

          vennSet.should.eql([1,2,3])

        })

        it("should remove elements from existing set", function() {

          var vennSet = venn.create([1,2,3])
          vennSet.not([1])
          vennSet.should.eql([2,3])

          vennSet.or([1,4,5]).not([1,4])
          vennSet.should.eql([2,3,5])

          vennSet.not([5,3,2]).should.be.empty

        })

        it("should remove elements from existing set (objects)", function() {

          var noKeyList = venn.create([jane20,jane40,bob30,eric40])
            .not([])
            .not([bob30,eric40])

          noKeyList.length.should.equal(2)
          noKeyList[0].should.eql(jane20)
          noKeyList[1].should.eql(jane40)

          var keyList = venn.create([jane20,eric40,jane40,bob30], keyFunction)
            .not([jane20])


          keyList.length.should.equal(2)
          keyList[0].should.eql(eric40)
          keyList[1].should.eql(bob30)

          keyList.not([eric40]).not([bob30])
          keyList.should.be.empty
        })

      })

      describe("mixed set operations", function (){

        it("should return correct set of unions/intersections with numbers", function() {

          var vennSet = venn.create([1,2,3,4])
            .union([2])
            .and([4,1,3])
            .or([2])
            .intersection([4,3,2,1])
            .not([3,2])
            .or([1,5])
            .not([4])

          vennSet.should.eql([1,5])

        })

        it("should return correct set of unions/intersections with objects", function() {

          var noKeyList = venn.create([])
            .union([jane20,jane20,bob30,jane40])
            .or([jane20,eric40])
            .not([jane20])
            .intersection([jane20,jane20,bob30,jane40,eric40])
            .not([])


          noKeyList.length.should.equal(3)
          noKeyList[0].should.eql(bob30)
          noKeyList[2].should.eql(eric40)

          var keyList = venn.create([], keyFunction)
            .or([jane20,jane20,bob30,jane40])
            .union([jane20,eric40])
            .not([])
            .and([jane20,jane20,bob30,jane40,eric40])
            .union([])
            .not([jane20,jane40])

          keyList.length.should.equal(2)
          keyList[0].should.eql(bob30)
          keyList[1].should.eql(eric40)
        })
      })
    })
  }()
})
