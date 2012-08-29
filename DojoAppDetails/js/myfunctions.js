function startDojo(){

  require([
  "dojox/mobile/parser", // lightweight parser for mobile apps
  "dojox/mobile", // mobile application
  "dojox/mobile/deviceTheme", // using user-agent, loads appropriate theme
  "dojox/mobile/View" // use the View widget to represent the device screen
  ],
  function(parser) {
    // Parse the page for widgets and get them instantiated
    parser.parse();
  });

  /*
   dojo/ready registers a function to run when the DOM is ready and
   all outstanding require() calls have been resolved
   when working with widgets, dojo/ready should be used instead of domReady!

   http://dojotoolkit.org/reference-guide/1.8/dojo/ready.html#dojo-ready
   http://dojotoolkit.org/reference-guide/1.8/dojo/domReady.html#dojo-domready
  */

  require(["dojo/ready", "dojo/dom", "dojo/dom-style"], 
    function(ready, dom, domStyle){
    ready(function(){
      // use a timeout just to ensure the page is loaded and themed before showing it
      setTimeout(function() {
        var loadingScreen = dom.byId("loadingScreen");
        domStyle.set(loadingScreen, "display", "none");
      }, 2000);
    });
  });

} //end function startDojo()

function getAppDetails() {
// Create a table with the app details and change the contents of the containing element

  if (window.blackberry !== undefined) {
    try {
      var output = "<table>";
      output += "<tr><td><b>Author</td><td>" + blackberry.app.author + "</td></tr>";
      output += "<tr><td><b>Name</b></td><td>" + blackberry.app.name + "</td></tr>";
      output += "<tr><td><b>Version</b></td><td>" + blackberry.app.version + "</td></tr>";
      output += "<tr><td><b>Copyright</b></td><td>" + blackberry.app.copyright + "</td></tr>";
      output += "<tr><td><b>Description</b></td><td>" + blackberry.app.description + "</td></tr>";
      output += "</table>";
    
      require(["dojo/dom"], function (dom){
        dom.byId("appDetailsDiv").innerHTML = output;
      });

    } catch(e) {
      console.error("Exception in getAppDetails: " + e);
    } // end try-catch
  } // end if
} // end function getAppDetails()

function pageLoad(){
  startDojo();
  getAppDetails();
}

window.addEventListener("load", pageLoad, false);