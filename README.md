# Compleet

Zero dependency JavaScript autocompletion library.

## Why

Because there weren't any other libraries that did what I needed.

### Usage

```js
const input = document.querySelector("input#myinput");

input.compleet({
// OR
compleet(input, {
    maxResults: 10, // max results, default is 5
    source: function(term, resp) {
        var val = term.split(/\s+/).pop(); // split the value by spaces
        var terms = getTermsFromSomewhere(); // get the terms from somewhere
        var matched = terms.filter(function(t) { return t.startsWith(val); }); // filter the terms

        resp(matched, val); // send the response
    }
});
```

#### Contributing

PRs are always welcome!

