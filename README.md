# venn [![Build Status](https://travis-ci.org/bitoiu/venn.png)](https://travis-ci.org/bitoiu/venn) [![NPM version](https://badge.fury.io/js/venn.png)](http://badge.fury.io/js/venn)

![wiki stolen logo](http://upload.wikimedia.org/wikipedia/commons/9/99/Venn0001.svg)

fluent API library for set operations:
* supports objects
* AMD and node compatible

### Usage

A venn set is just an array with some added features:

```javascript

  var venn = require("venn")
  
  venn.create([1,2]) // returns [1,2]
```

You can now chain operations to this set, like a union

```javascript
  venn.create([1,2])
      .union([1,2,3,4]) // returns [1,2,3,4]  
```

Or an intersection

```javascript
    venn.create([1,2])
      .union([1,2,3,4]) 
      .intersection([1,5]) // returns [1]
```

Or a mix of everything

```javascript
    venn.create([1,2])
      .union([1,2,3,4]) 
      .intersection([1,5])
      .union([2]) // returns [1,5,2]      
```

You can also use objects

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
      , {name: "nuno", age : "20"}]) // returns vitor, khov and nuno
```
