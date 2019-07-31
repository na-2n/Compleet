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
    // General options
    maxResults: 10, // max results, default is 5
    raw: false, // whether to use innerHTML or innerText to set autocomplete options, default is false (innerText). DO NOT SET THIS TO TRUE IF YOU DO NOT FILTER THESE, YOU HAVE BEEN WARNED

    // Tag source options
    source: function(term, resp) {
        const val = term.split(" ").pop(); // split the value by spaces
        const terms = getTermsFromSomewhere(); // get the terms from somewhere
        const matched = terms.filter(function(t) { return t.startsWith(val); }); // filter the terms

        resp(matched, val); // send the response
    },
    // OR
    tags: function(resp) {
        getTermsFromSomewhere(function(terms) { resp(terms); });
    }
});
```

#### Contributing

PRs are always welcome!

