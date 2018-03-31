// vim:ts=8 smarttab sw=4 expandtab sts=0

HTMLInputElement.prototype.compleet = function(opts) {
    const that = this;
    const ul = document.createElement("ul");
    var index = 0;
    var curList = [];

    ul.style.width = this.clientWidth + "px";

    const bounds = this.getBoundingClientRect()

    ul.style.top = bounds.top + bounds.height + "px";
    ul.style.left = bounds.left - 10 + "px";
    ul.classList.add("compleet-list");
    ul.classList.add("hidden");

    this.parentElement.appendChild(ul);
    
    this.onkeyup = function(e) {
        ul.innerHTML = "";

        const val = this.value;

        if (!val) {
            ul.classList.add("hidden");
        } else {
            ul.classList.remove("hidden");
        }

        opts.source(val, function(t, v) {
            t = t.slice(0, opts.maxResults || 5);

            if (index >= t.length) index = t.length - 1;

            switch (e.key) {
                case "ArrowDown": {
                    if (index + 1 !== t.length) index++;
                    break;
                }

                case "ArrowUp": {
                    if (index - 1 > -1) index--;
                    break;
                }

                case "Enter": {
                    if (t[index]) {
                        ul.classList.add("hidden");
                        const regex = new RegExp(v + "$");

                        that.value = val.replace(regex, t[index]).trim();
                    }
                    return;
                }
            }

            if (!t || !t.length) {
                ul.classList.add("hidden");
                return;
            }

            for (var i = 0; i < t.length; i++) {
                const term = t[i];

                if (!term.trim()) {
                    !ul.classList.add("hidden");
                    return;
                }

                const li = document.createElement("li");

                if (i === index) {
                    li.classList.add("selected");
                }

                li.innerHTML = term;

                li.onclick = function() {
                    ul.classList.add("hidden");
                    const regex = new RegExp(v + "$")

                    that.value = val.replace(regex, term).trim();
                }

                ul.appendChild(li);
            }
        });
    }
};
