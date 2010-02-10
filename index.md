# todojo

This is a description of Dojo's general approach to day-to-day coding, and a comparison with other toolkits.

* [General Approach](#general)
* [MVC](#mvc)
    * [Display the user interface (View)](#view)
    * [Get the data used by the interface (Model)](#model)
    * [Change the data and interface. (Controller)](#controller)
* [From jQuery](jquery/)

## <a name="general">General Approach</a>

Dojo's general approach:

* JavaScript is powerful and enjoyable language. Enjoy it, do not mask it behind something else. In addition, JavaScript runs in other places, not just the browser. Dojo can run in other JS environments.
* However, browser and DOM APIs can be difficult to work with across browsers. Smooth over browser differences.
* Do not extend global objects, specifically avoiding adding things to native prototypes. The goal is to operate well with other toolkits in the page, or even another version of Dojo.
* Build discrete modules. The toolkit follows this approach, and more importantly makes it easy for you to use the same approach for your code.
* Provide a basic level of functionality in one file, dojo.js, called Dojo Base. Include other useful modules that can be loaded via the module system (Dojo Core, the modules in the dojo directory).
* Provide lots of CLA-backed modules, including a widget system (dijit), and many utilities, some that are experimental (dojox), all building on Dojo Core.
* Built in performance: Dojo Base is fast at running tasks, and the integrated build system allows you to optimize your code for best performance.

This approach can be contrasted with some other toolkits. All of these toolkits aim to smooth over browser differences.

* Prototype and MooTools prefer to extend native prototypes. This can be difficult to do in ways that do not conflict with other libraries, or multiple versions of the same library. However, this approach can feel more familiar to developers from some languages, like Ruby.
* jQuery aims to not modify globals, and is primarily focused on the DOM and Ajax calls. Similar functionality is available in Dojo Base. jQuery has plugins, but their goal is just to add a utility method to the jQuery object, a fairly narrow view of a module.
* YUI is most similar to Dojo: it as a module system, but seems to focus more on applications developers consuming already-built YUI components vs. encouraging use of the YUI plumbing to make application level components. But it is possible to build your own application components in YUI.

The distinguishing factor for Dojo: it wants you to make modular code that is fast and uses the same tools as the built-in Dojo modules. Turtles all the way down.

The principle actors of this modular system:

* [dojo.require](http://docs.dojocampus.org/dojo/require)
* [dojo.provide](http://docs.dojocampus.org/dojo/provide)
* [dojo.declare](http://docs.dojocampus.org/dojo/declare)
* [dojo.mixin](http://docs.dojocampus.org/dojo/mixin)
* [dojo.extend] (http://docs.dojocampus.org/dojo/extend)
* [dojo.hitch] (http://docs.dojocampus.org/dojo/hitch)

dojo.require loads modules, dojo.provide tells the loader a module has loaded, and creates an empty JavaScript object that matches the name used in the dojo.provide call.

dojo.declare is a system for defining objects that work a little bit like traditional classes, however, they still retain some of JavaScript's prototype behaviors. dojo.declare is used extensively in Dijit widgets. dojo.declare is a great way to encapsulate functionality into a component that can be instantiated many times in an application.

dojo.mixin and dojo.extend are ways to combine extra functionality into existing objects. dojo.mixin combines the extra functionality directly on the target object, where dojo.extend works on the target object's prototype.

dojo.hitch is used to set the right value of "this" to be that of your module or object instance for APIs that accept function callbacks.

## <a name="mvc">MVC</a>

What parts make up a dynamic web site? It generally breaks down into a (Model, View, Controller)[http://en.wikipedia.org/wiki/Model-View-Controller] (MVC) approach.

* [Display the user interface (View)](#view)
* [Get the data used by the interface (Model)](#model)
* [Change the data and interface. (Controller)](#controller)

How you approach each part depends on the type of application you are building. Dojo allows you to start small, just progressively enhancing a simple web page, to something large like a single-page web application.

The following sections describe the Dojo features that correspond to the different parts of MVC.

### <a name="view">Display the user interface (View)</a>

The user interface normally means HTML. Dojo Core is specifically constructed to give you utilities to manipulate HTML.

#### Building HTML
* [dojo.cache](http://docs.dojocampus.org/dojo/cache) for loading HTML.
* [dojo.create](http://docs.dojocampus.org/dojo/create) for creating a new HTML element.
* [dojo.replace](http://docs.dojocampus.org/dojo/replace) for using templatized HTML.
* [dojo.place](http://docs.dojocampus.org/dojo/place) for creating and placing HTML relative to some other element.
* [i18n modules](http://docs.dojocampus.org/quickstart/internationalization/index) for building localized UI. Useful when used with dojo.replace.

#### Working with the DOM

* [dojo.query](http://docs.dojocampus.org/dojo/query) to find DOM nodes in a page.
* [dojo.NodeList](http://docs.dojocampus.org/dojo/NodeList) to allow chained operations for working with nodes found via dojo.query.
* [dojo.NodeList-traverse](http://docs.dojocampus.org/dojo/NodeList-traverse) additional methods to NodeList that help traverse the DOM.
* [dojo.NodeList-manipulate](http://docs.dojocampus.org/dojo/NodeList-manipulate) additional methods to NodeList to help manipulate the DOM.
* [dojo.anim](http://docs.dojocampus.org/dojo/anim), [dojo.fadeOut](http://docs.dojocampus.org/dojo/fadeOut), [dojo.fadeIn](http://docs.dojocampus.org/dojo/fadeIn) for doing animations.
* [dojo.dnd](http://docs.dojocampus.org/dojo/dnd) for drag and drop support.
* [dojo.parser](http://docs.dojocampus.org/dojo/parser) for parsing HTML for declarative UI widgets (mostly used with Dijit widgets).

#### Modifying HTML/DOM
dojo.attr](http://docs.dojocampus.org/dojo/attr), dojo.hasAttr](http://docs.dojocampus.org/dojo/hasAttr), dojo.removeAttr](http://docs.dojocampus.org/dojo/removeAttr), dojo.getNodeProp](http://docs.dojocampus.org/dojo/getNodeProp) for dealing with an element's attributes and properties. There are some edge cases when using dojo.attr, try using dojo.getNodeProp when just wanting to read a property on an element.
dojo.addClass](http://docs.dojocampus.org/dojo/addClass), dojo.removeClass](http://docs.dojocampus.org/dojo/removeClass), dojo.hasClass](http://docs.dojocampus.org/dojo/hasClass), dojo.toggleClass](http://docs.dojocampus.org/dojo/toggleClass) for dealing with element classes.
* [dojo.style](http://docs.dojocampus.org/dojo/style) for getting/setting style properties on an element. Favor using dojo.addClass/dojo.removeClass where possible.
* [dojo.position](http://docs.dojocampus.org/dojo/position) for getting the border-box x/y coordinates and size of a DOM node.
* [dojo.marginBox](http://docs.dojocampus.org/dojo/marginBox) for getting/setting the margin-box of node
* [dojo.contentBox](http://docs.dojocampus.org/dojo/contentBox) for getting/setting the content-box of node
* [dojo.destroy](http://docs.dojocampus.org/dojo/destroy) for destroying elements
* [dojo.empty](http://docs.dojocampus.org/dojo/empty) for emptying an element of children

#### Relation to Dijit

Outside of Dojo Core, Dijit is normally used to add in rich UI widgets into the page. Dijit widgets all use dojo.declare() to define themselves, as some sort of derived object from dojo._Widget. dojo.parser is used to find declarative widgets in HTML.

A simplified breakdown of Dijit widgets:
* A base "class", [dijit._Widget](http://docs.dojocampus.org/dijit/_Widget), that defines a widget lifecycle, utility methods for managing proper creation/destruction widget resources.
* A dojo.mixin for templated widgets, [dijit._Templated[(http://docs.dojocampus.org/dijit/_Templated), that use HTML templates.
    * HTML templates can be fetched via dojo.cache
    * HTML templates can be templatize, using dojo.replace to replace token values.
* A set of constructor functions (like a "class") that are defined via dojo.declare for each widget. Special care is given to i18n and a11y.

There is more to Dijit widgets, but the above are the basics, and demonstrate what you could use to build your own widget system.

### <a name="model">Get the data used by the interface (Model)</a>

* [dojo.xhr](http://docs.dojocampus.org/dojo/xhr) for doing XMLHttpRequests.
* [dojo.io.script](http://docs.dojocampus.org/dojo/io/script) for doing JSONP calls, attaching scripts.
* [dojo.io.iframe](http://docs.dojocampus.org/dojo/io/iframe) for sending requests via iframes, useful if uploading files.
* [dojo.fromJson](http://docs.dojocampus.org/dojo/fromJson), [dojo.toJson](http://docs.dojocampus.org/dojo/toJson) for working with JSON.
* [dojo.objectToQuery](http://docs.dojocampus.org/dojo/objectToQuery)
* [dojo.queryToObject](http://docs.dojocampus.org/dojo/queryToObject)
* [dojo.Deferred](http://docs.dojocampus.org/dojo/Deferred), [dojo.DeferredList](http://docs.dojocampus.org/dojo/DeferredList) are used by the IO calls to set up work to happen later when an IO call completes or has an error. dojo.DeferredList is useful if you need to wait for a series of IO calls that all return dojo.Deferreds.
* [dojo.rpc](http://docs.dojocampus.org/dojo/rpc) is an approach to communicating via Remote Procedure Calls (RPC) with backend servers.
* [dojo.data](http://docs.dojocampus.org/dojo/data) is a standard interface to representing data sources. A particular data store implements one or many of the different dojo.data sub-interfaces. Dijit leverages dojo.data to tie data generically to the dijit widgets.

### <a name="controller">Change the data and interface. (Controller)</a>

* [dojo.ready](http://docs.dojocampus.org/dojo/ready) is a way to register work to be done when the page loads, a common way to trigger your controller work to start.
* [dojo.connect](http://docs.dojocampus.org/dojo/connect) to bind to DOM events and to other JavaScript methods. The basic wiring call for hooking up routing of behavior.
* [dojo.publish](http://docs.dojocampus.org/dojo/publish)/[dojo.subscribe](http://docs.dojocampus.org/dojo/subscribe) allows decoupled sending and receiving of events. dojo.publish is a great way to communicate state without knowing the specific end points, and dojo.subscribe can be used to register for specific state changes without having to know how they are triggered.
* [dojo.hash](http://docs.dojocampus.org/dojo/hash) provides methods for monitoring and updating the hash in the browser URL, useful to communicate the basic page state. Uses dojo.subscribe to communicate hash changes.
* [dojo.cookie](http://docs.dojocampus.org/dojo/cookie) gets/sets cookies for saving state.

## Tying it Together

Dojo uses modular code to build up an MVC system for your web app. Here are some examples on how you can use Dojo to structure your application.

### Simple enhanced web site.

Index.html loads dojo, and uses djConfig's require property to automatically load call for page's behavior:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Sample Dojo page</title>
        <script djConfig="baseUrl: './base/', require: ['app']"
                src="http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojo/dojo.xd.js.uncompressed.js"></script>
    </head>
    <body>
        <h1>Simple Dojo-enhanced page</h1>
    </body>
    </html>
    
app.js requires any dependencies, then binds behavior to the DOM:

    dojo.provide("app");
    
    dojo.require("dojo.cache");
    
    dojo.ready(function(){
        //Update the View with some HTML
        dojo.body().innerHTML = dojo.cache("app", "hello.html");
    
        //Use dojo.query to attach behaviors to the HTML
        //(This will not fire in this example, it is just used for illustration)
        dojo.query("a").onclick(function(evt) {
            //
            dojo.xhr({
                url: "some/api",
                load: function(data) {
                    //Do something with data (the model) here.
                }
            })
            
        });
    });

[Here are the files for this sample](sample/).

### Rich web application.

[Mozilla Raindrop](http://mozillalabs.com/raindrop/) is an example of a rich web application with many modules, many of them widgets based on dijit._Widget and dijit._Templated.

It differs slightly from a standard Dojo install: it uses [RequireJS](http://github.com/jrburke/requirejs) to load modules. So you will see calls to require() and require.def() instead of dojo.require() and dojo.provide() but they are conceptually similar.

### Basic structure

* Raindrop is a single page web app, [inflow/index.html](http://hg.mozilla.org/labs/raindrop/file/0383bb083ba0/client/inflow/index.html).
* It has a script tag to load Dojo.
* It uses module system to load one JS module, [inflow.js](http://hg.mozilla.org/labs/raindrop/file/0383bb083ba0/client/inflow/inflow.js)
* inflow loads all the modules it needs, most of the modules are widgets
* Each widget is like a mini MVC pattern, uses rd.api() to load model.
* Page state is communicated via fragment IDs that are translated to dojo.publish() calls. Allows decoupled state communication.
