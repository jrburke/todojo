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
