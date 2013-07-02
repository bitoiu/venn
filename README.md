# venn [![Build Status](https://travis-ci.org/bitoiu/venn.png)](https://travis-ci.org/bitoiu/venn) [![NPM version](https://badge.fury.io/js/venn.png)](http://badge.fury.io/js/venn)

fluent API library for set operations:
* supports objects
* AMD and node compatible

## Usage

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