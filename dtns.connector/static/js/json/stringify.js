// exports = module.exports = stringify
// exports.getSerialize = serializer

function circular_stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, getJSONSerialize(replacer, cycleReplacer), spaces)
}

function getJSONSerialize(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}


// var circular_stringify = require('json-stringify-safe');

// @param {Object} options
// - indent {Number}
// - offset {Number}
function stringify (object, replacer, indent, options) {
  options || (options = {});
  var str = circular_stringify(object, replacer, indent, options.decycler);

  if (!indent) {
    return str;
  }

  var offset = options.offset || 0;
  var spaces = space(offset);

  str = str
  .replace(/^|\n/g, function (match) {
    return match
      // carriage return
      ? match + spaces
      // Line start
      : spaces;
  })
  .slice(offset);

  return str;
}


function space (n) {
  var output = '';
  while (n --) {
    output += ' ';
  }

  return output;
}

// For testing
stringify._space = space;
