/*
This file assumes Java 1.6 or greater is installed, and that Rhino is part
of the scripting library in Java 1.6. Then run the distribution script:

> jrunscript dist.js

*/

/*jslint regexp: false, nomen: false, plusplus: false */
/*global load: false, print: false, quit: false, logger: false,
  fileUtil: false, java: false, Packages: false, readFile: false */

"use strict";

load("logger.js");
load("fileUtil.js");

var files, i, mdFile, htmlFile, fileContents,
    runtime = Packages.java.lang.Runtime.getRuntime(),
    process, preContents, postContents, h1, path, length, j;

//Copy all the files to a dist directory
fileUtil.deleteFile("./todojo/");
fileUtil.copyDir("../", "./todojo/", /\w/);

//Remove the dist folder from that directory
fileUtil.deleteFile("./todojo/dist");

preContents = fileUtil.readFile("pre.html");
postContents = fileUtil.readFile("post.html");

//Convert each .md file to an HTML file
files = fileUtil.getFilteredFileList("./todojo", /\.md$/, true);
for (i = 0; (mdFile = files[i]); i++) {
    htmlFile = mdFile.replace(/\.md$/, ".html");

    logger.trace("Creating " + htmlFile);

    //Do Markdown
    process = runtime.exec(["/bin/sh", "-c", "./Markdown.pl --html4tags " + mdFile + " > " + htmlFile]);
    process.waitFor();

    //Build up a complete HTML file.
    fileContents = fileUtil.readFile(htmlFile);
    fileContents = preContents + fileContents + postContents;

    //Set the title of the HTML page
    h1 = fileContents.match(/<h1>([^<]+)<\/h1>/);
    if (h1 && h1[1]) {
        h1 = h1[1];
    } else {
        h1 = "";
    }
    fileContents = fileContents.replace(/\$\{title\}/, h1);

    //Adjust the path the main.css
    path = htmlFile.replace(/\/[^\/]+$/, "").replace(/^\.\/todojo\//, "");
    if (!path) {
        path = "main.css";
    } else {
        length = path.split("/").length;
        path = "";
        for (j = 0; j < length; j++) {
            path += "../";
        }
        path += "main.css";
    }
    fileContents = fileContents.replace(/\main\.css/, path);

    fileUtil.saveFile(htmlFile, fileContents);

    //Remove the .md file
    fileUtil.deleteFile(mdFile);
}

