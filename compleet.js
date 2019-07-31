// vim:ts=8 smarttab sw=4 expandtab sts=0

HTMLInputElement.prototype.compleet = function(opts) { compleet(this, opts); };

function compleet(input, opts) {
    opts.source = opts.source || opts.tags ? function(s, cb) {
        opts.tags(function(ts) {
            let term = s.split(" ").pop();

            if (term && term.trim()) {
                term = term.trim().toLowerCase();

                cb(ts.filter(function(t) { return t.toLowerCase().startsWith(term); }), term);
            } else {
                cb([], "");
            }
        });
    } : null;

    const ul = document.createElement("ul");
    let curList = [];
    let curVal = "";
    let index = 0;

    ul.style.width = input.clientWidth + "px";

    const bounds = input.getBoundingClientRect();

    ul.style.top = bounds.top + bounds.height + "px";
    ul.style.left = bounds.left - 10 + "px";
    ul.classList.add("compleet-list");
    ul.classList.add("hidden");

    input.parentElement.appendChild(ul);

    input.onkeydown = function(e) {
        switch (e.keyCode) {
            case 40: {
                if (index + 1 !== curList.length) {
                    e.preventDefault();
                    index++;
                }
                break;
            }

            case 38: {
                if (index - 1 > -1) {
                    e.preventDefault();
                    index--;
                }
                break;
            }

            case 13:
            case 9: {
                if (curList[index]) {
                    e.preventDefault();
                    ul.classList.add("hidden");
                    const regex = new RegExp(curVal + "$");

                    input.value = input.value.replace(regex, curList[index]).trim();
                }
                break;
            }
        }
    };

    input.onkeyup = function() {
        let child;

        while ((child = ul.firstChild)) {
            ul.removeChild(child);
        }

        curList = [];
        curVal = "";

        const val = input.value;

        if (!val) {
            ul.classList.add("hidden");
            return;
        }
        
        ul.classList.remove("hidden");

        opts.source(val, function(t, v) {
            t = t.slice(0, opts.maxResults || 5);

            if (index >= t.length) {
                index = t.length - 1;
            }

            if (!v.trim()) {
                ul.classList.add("hidden");
                curList = [];
                return;
            }

            curList = t;
            curVal = v;

            if (!t || !t.length) {
                ul.classList.add("hidden");
                return;
            }

            for (var i = 0; i < t.length; i++) {
                const term = t[i];

                if (!term.trim()) {
                    ul.classList.add("hidden");
                    return;
                }

                const li = document.createElement("li");

                if (i === index) {
                    li.classList.add("selected");
                }

                li[opts.raw ? "HTML" : "innerText"] = term; 

                li.onclick = function() {
                    ul.classList.add("hidden");
                    const regex = new RegExp(v + "$");

                    input.value = val.replace(regex, term).trim();
                };

                ul.appendChild(li);
            }
        });
    };
}
