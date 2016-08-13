$(document).ready(function(){
  var servers = [
    "http://lenka-thinkpad.local:8088/api/",
    "http://aws-vmix.pianomad.com:8088/api/"
  ];

  var is_current_live = false;

  var live_scenes = ["2", "3"];
  var jingle_scenes = ["4", "5", "6", "10"];
  function isLive(scene) {
    return live_scenes.indexOf(scene) >= 0;
  }
  }

  function apiUrl() {
    return $("#api_url").val();
  }

  function vmixUrl(params) {
    query = "";
    for (key in params) {
      query += key + "=" + params[key] + "&";
    }
    url = apiUrl() + "?" + query;
    return url;
  }

  // create URL for a vMix function with parameters
  function vmixFunction(name, params) {
    params_ = {"Function": name};
    // clone the function params
    for (key in params) {
      params_[key] = params[key];
    }
    return vmixUrl(params_);
  }

  // http://www.jefferydurand.com/jquery/sequential/javascript/ajax/2015/04/13/jquery-sequential-ajax-promise-deferred.html
  function getAjaxDeferred(url){
    return function(){
      // wrap with a deferred
      var defer = $.Deferred();
      console.log(url);
      $.ajax({ url: url, method: 'GET'}).complete(function(){
        // resolve when complete always.  Even on failure we
        // want to keep going with other requests
        defer.resolve();
      });
      // return a promise so that we can chain properly in the each
      return defer.promise();
    };
  }

  // make a single HTTP GET request to a given URL
  function httpGet(url) {
    $.get(url);
  }

  // make synchronous multiple HTTP GET requests to a given URLs
  function httpGetSequence(urls) {
    var base = $.when({});
    $.each(urls, function(index, url) {
      base = base.then(getAjaxDeferred(url));
    });
  }

  function scheduleScene(input) {
    if (is_current_live) {
      httpGetSequence([
        vmixFunction("Restart", {"Input": input}),
        vmixFunction("CutDirect", {"Input": input})
      ]);
    } else {
      httpGetSequence([
        vmixFunction("WaitForCompletion", {"Input": "-1"}),
        vmixFunction("Restart", {"Input": input}),
        vmixFunction("CutDirect", {"Input": input})
      ]);
    }
    // TODO: this must be called after the last HTTP request
    is_current_live = isLive(input);
  }

  // -- create the UI elements and bind actions to them

  for (i in servers) {
    var option = $("<option>").text(servers[i]);
    $("#servers").append(option);
  }
  $("#api_url").val(servers[0]);

  $("#programPlay").click(function() {
    httpGet(vmixFunction("Play", {"Input": "-1"}));
  });
  $("#programPause").click(function() {
    httpGet(vmixFunction("Pause", {"Input": "-1"}));
  });

  function createButton(scene) {
    var label = (isLive(scene) ? "Live" : "Jingle") + " " + scene;
    var button = $("<button>", {"class": "btn btn-primary"})
      .text(label)
      .on("click", {"scene": scene},
        function(event) {
          scheduleScene(event.data.scene);
        }
      );
    return $("<div>", {"class": "col-sm-2"}).append(button);
  }

  for (i in live_scenes) {
    var scene = live_scenes[i];
    $("#live_scenes").append(createButton(scene));
  }
  for (i in jingle_scenes) {
    var scene = jingle_scenes[i];
    $("#jingle_scenes").append(createButton(scene));
  }
});
