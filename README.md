# venn [![Build Status](https://travis-ci.org/bitoiu/venn.png)](https://travis-ci.org/bitoiu/venn) [![NPM version](https://badge.fury.io/js/venn.png)](http://badge.fury.io/js/venn)

## Motivation

One of these days I was looking for a library that would allow me to do simple set operations, mostly intersection and unions. There's so many that do it, like underscore, the problem I found was that none of them had a fluent API, so I took a take on doing my own.

Compatible with AMD and node.

### getting started 

A venn set is just an array on steroids:

```javascript

  var venn = require("venn")
  venn.create([1,2])   
  console.log(venn) // [1,2]

```

### union

You can now chain operations to this set, like an union:

```javascript
  venn.create([1,2])
      .union([1,2,3,4])
      .union([5]) // [1,2,3,4,5]  
```

### intersection


```javascript
    venn.create([1,2])
      .union([1,2,3,4]) 
      .intersection([1,5]) // [1]
```

### chaining everything

Or a mix of everything

```javascript
    venn.create([1,2])
      .union([1,2,3,4,5]) 
      .intersection([1,5])
      .union([2]) // [1,5,2]      
```

### Objects

If you're crazy you can use venn without a key function. We'll just figure it out how to index the objects.

```javascript
    venn.create([
        {name: "vitor", age: "23"}
      , {name: "khov",  age: "24"}
      , {name: "pat",   age: "30"}])
      .intersection([
        {name: "vitor",  age: "23"}
      , {name: "newguy", age: "0"}
      , {name: "pat",    age: "50"}])
      .union([
        {name: "khov", age : "10"}
      , {name: "nuno", age : "20"}]) 

    // vitor, khov and nuno
```

### Key function

But really, write your own key function:

```javascript
  
    var myKeyFunction = function(item) {
      return item.name
    }
    
    venn.create([
        {name: "vitor", age: "100"}
      , {name: "khov",  age: "100"}], myKeyFunction)
      .intersection([
        {name: "vitor", age: "0"}
      , {name: "khov",  age: "0"}
      .union([
        {name: "khov",  age : "-100"}
      , {name: "nuno",  age : "20"}]) 
   
    // vitor, khov(the first of them), nuno
```

### Some notes

* The keyFunction only needs to be set once for each venn object (as you would expect)
* Don't forget if you apply a built-in array function like `filter` or `map` the returning object is not a venn object (as you would once again expect)

Let me know if there are improvements I can do to the library. I might take some time to implement the other less used set operations.

