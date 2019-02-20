# venn 
 
[![NPM version](https://badge.fury.io/js/venn.png)](http://badge.fury.io/js/venn)

## Motivation

One of these days I was looking for a library that would allow me to do simple set operations, mostly intersection and union. There's a lot of libraries that do this but I didn't find one with a fluent API. This a stab at one:

Compatible with AMD and node.

### getting started 

A venn set is just an array on steroids:

```javascript

  var venn = require("venn")
  venn.create([1,2])   
  console.log(venn) // [1,2]

```

### union

You can now chain operations to this set, using `union` or `or`:

```javascript
  venn.create([1,2])
      .union([1,2,3,4])
      .or([5]) // [1,2,3,4,5]
```

`union` and `or` are just alias for the same operation.

### intersection


```javascript
    venn.create([1,2])
      .union([1,2,3,4]) 
      .intersection([1,5]) // [1]
```

if you prefer you can also use `and` instead of `intersection`


### not

If you want to be negative about it, you can check out `not`

```javascript
    venn.create([1,2,3,4,5])
      .not([4])
      .not([5]) // [1,2,3]
```

### chaining everything

Or a mix of everything

```javascript
    venn.create([1,2])
      .or([1,2,3,4,5])
      .and([1,5])
      .or([2]) // [1,5,2]
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
      .and([
        {name: "vitor", age: "0"}
      , {name: "khov",  age: "0"}
      .or([
        {name: "khov",  age : "-100"}
      , {name: "nuno",  age : "20"}]) 
   
    // vitor, khov(the first of them), nuno
```

### Some notes

* The keyFunction only needs to be set once for each venn object (as you would expect)
* Don't forget if you apply a built-in array function like `filter` or `map` the returning object is not a venn object (as you would once again expect)

Let me know if there are improvements I can do to the library. I might take some time to implement the other less used set operations.

