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
    var keyItemFunction = function(item) {
      return item.name
    }

    var personSet = [
        {name: "vitor", age: "23"}
      , {name: "khov", age: "24"}
      , {name: "vitor", age: "23"}]

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

          var objList = venn.create(personSet)
          expect(personSet.union).not.be.ok

        })


        it("should remove duplicates", function() {
          venn.create([1,1]).should.eql([1])
          venn.create([1,1,2,1]).should.eql([1,2])
          venn.create([1,1,2,2,2,1,3,4,5,1,1,1,]).should.eql([1,2,3,4,5])

          var objList = venn.create(personSet)
          var customKeyObjList = venn.create(personSet, keyItemFunction)

          objList.length.should.equal(2)
          lodash.find(objList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(objList, {name: "khov", age : "24"}).should.be.ok

          customKeyObjList.length.should.equal(2)
          lodash.find(customKeyObjList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(customKeyObjList, {name: "khov", age : "24"}).should.be.ok
        })

      })

      describe("union", function() {

        it("shouldn't change set if empty", function (){

          venn.create([1,2,3])
            .union([])
            .should.be.eql([1,2,3])

          venn.create([])
            .union([1,2,3,4])
            .should.be.eql([1,2,3,4])

          var objList = venn.create([
                        {name: "vitor", age: "23"}
                      , {name: "khov", age: "24"}
                      , {name: "pat", age: "30"}
                      ])

          objList.length.should.equal(3)
          lodash.find(objList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(objList, {name: "khov", age : "24"}).should.be.ok
          lodash.find(objList, {name: "pat", age : "30"}).should.be.ok

        })

        it("should create simple union of elements", function() {

          venn.create([1,2,3])
            .union([4,5,6])
            .should.be.eql([1,2,3,4,5,6])

          var objList = venn.create([
                        {name: "vitor", age: "23"}
                      , {name: "khov", age: "24"}
                      ]).union([
                        {name: "pat", age: "30"}
                      , {name: "vitor", age: "23"}
                      , {name: "shang", age: "23"}
                      ]).union([{name: "vitor", age: "23"}])

          objList.length.should.equal(4)
          lodash.find(objList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(objList, {name: "khov", age : "24"}).should.be.ok
          lodash.find(objList, {name: "pat", age : "30"}).should.be.ok
          lodash.find(objList, {name: "shang", age : "23"}).should.be.ok

        })

        it("should prevent duplication of elements", function() {
          venn.create([1,2,3])
            .union([1,4,5,6])
            .should.be.eql([1,2,3,4,5,6])

          venn.create([
              {name: "vitor", age: "23"}
            , {name: "vitor", age: "23"}
            , {name: "vitor", age: "23"}
            ]).length.should.equal(1)
        })
      })

      describe("intersection", function() {

        it("should return an empty intersection set", function() {

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

        })

        it("should return intersection of literals", function(){

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

        if("should return intersection of object", function() {
          var objList = venn.create([
                          {name: "vitor", age: "23"}
                        , {name: "khov", age: "24"}
                        , {name: "pat", age: "30"}
                      ]).intersection([
                          {name: "vitor", age: "23"}
                        , {name: "newguy", age: "0"}
                        , {name: "pat", age: "30"}
                      ])

          objList.length.should.equal(2)
          lodash.find(objList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(objList, {name: "pat", age : "30"}).should.be.ok
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

      describe("mashups", function (){

        it("should unite and intersect a set of objects without a custom keyFunction", function() {
          var objList = venn.create([
                        {name: "vitor", age: "23"}
                      , {name: "khov", age: "24"}
                      , {name: "pat", age: "30"}
                    ]).intersection([
                        {name: "vitor", age: "23"}
                      , {name: "newguy", age: "0"}
                      , {name: "pat", age: "50"}
                    ]).union([
                        {name: "khov", age : "10"}
                      , {name: "nuno", age : "20"}
                    ])

          objList.length.should.equal(3)
          lodash.find(objList, {name: "vitor", age : "23"}).should.be.ok
          lodash.find(objList, {name: "khov", age : "10"}).should.be.ok
          lodash.find(objList, {name: "nuno", age : "20"}).should.be.ok
        })

        it("should unite and intersect a set of objects with a custom keyFunction", function() {

          var keyFunction = function(item) {
            return item.id
          }

          var objList = venn.create([
                        {id: 0, name: "vitor", age: "23"}
                      , {id: 1, name: "khov", age: "24"}
                      , {id: 2, name: "pat", age: "30"}
                     ], keyFunction )
                        .intersection([
                          {id: 2, name: "vitor", age: "23"}
                        , {id: 2, name: "newguy", age: "0"}
                        , {id: 2, name: "pat", age: "50"} ])
                        .union([
                         {id: 1, name: "khov", age : "10"}
                       , {id: 10, name: "nuno", age : "20"} ])

          objList.length.should.equal(3)
          lodash.find(objList, {id: 2}).should.be.ok
          lodash.find(objList, {id: 1}).should.be.ok
          lodash.find(objList, {id: 10}).should.be.ok
        })
      })
    })
  }()
})
