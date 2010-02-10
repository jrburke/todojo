# From jQuery

This is a short mapping of jQuery to Dojo. These mappings in Dojo assume Dojo 1.4 or later.

This mapping is still under development, see [this list as a start](http://matthiasschuetz.com/javascript-framework-matrix/en/effects)

## General comments

### jQuery() compared to dojo.query()

In general, dojo.query('selector') is analagous to jQuery('selector') -- both use CSS3 selectors to select elements in the DOM. In Dojo parlance, dojo.query() returns an object that is of type dojo.NodeList -- all the methods you can use to work with the returned nodes from dojo.query() are implemented on dojo.NodeList's prototype. A dojo.NodeList is just a native JavaScript array with the special chainable methods in dojo.NodeList.prototype mixed into the array.

This means you can add your own custom methods, similar to jQuery plugins, by adding the method to dojo.NodeList.prototype. Here is an example that adds a method that colors all the matched nodes from a query operation red:

In jQuery you would do:

    jQuery.fn.turnRed = function() {
        this.css("color", "red");
        return this;
    };

In Dojo:

    dojo.NodeList.prototype.turnRed = function() {
        this.style("color", "red");
        return this;
    };

### CSS3 Psuedo classes/filters

Psuedo classes (or as they are referred to in "jQuery Enlightenment", filters) are parts of a CSS selector that start with a colon, for instance :checked, :enabled.

dojo.query only supports CSS3 psuedo classes, so it does not include some pseudo classes used by jQuery, like :first, :last, :odd, :even, :eq, :visible and :hidden. Those types of selectors are not directly supported by querySelectorAll(), the underlying node selection engine being built into browsers, so dojo.query has tried to avoid building in expectations of using them later. The hope is as time goes on that dojo.query can just delegate directly to querySelectorAll(). This decision may be revisited at some point.

Using dojo.require("dojo.NodeList-traverse); will add these methods to dojo.NodeList's prototype, giving an approximation of some of those jQuery pseudo classes:

* first()
* last()
* odd()
* even()

### this

jQuery is focused on DOM manipulation, so the default value of "this" in event bindings (like .click()) or looping (like .each()) is the DOM node that is the target of the action. However since Dojo is focused on building reusable modules that live as JavaScript objects, the normal assumption is that "this" is probably something you want to bind to your module code.

For event bindings, instead of:

    jQuery(node).click(function() {
        //this is the DOM node
        alert(this.nodeName);
    });

you can do this:

    dojo.query(node).onclick(function(evt) {
        //evt.target is the DOM node
        alert(evt.target.nodeName);
    });

For looping constructs:

    jQuery('p').each(function() {
        //this is each p node
        alert(p.nodeName);
    });

you can do this:

    dojo.query('p').forEach(function(node) {
        //node is each p node
        alert(node.nodeName);
    });

