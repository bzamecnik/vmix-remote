$(document).ready(function(){
  var servers = [
    "http://lenka-thinkpad.local:8088/api/",
    "http://aws-vmix.pianomad.com:8088/api/"
  ];

  var live_scenes = ["4", "5"];
  var jingle_scenes = ["1", "2", "3"];
  var all_scenes = live_scenes.concat(jingle_scenes);

  var schedule = {
    "currentScene": null,
    "live": null,
    "jingles": []
  };

  function isLive(scene) {
    return live_scenes.indexOf(scene) >= 0;
  }

  function setButtonColors() {
    function setButtonClass(button, css_class) {
      button.removeClass(function (index, css) {
        return (css.match (/(^|\s)btn-\S+/g) || []).join(' ');
      }).addClass(css_class);
    }

    for (i in all_scenes) {
      var scene = all_scenes[i];
      var is_current = scene == schedule["currentScene"];
      var is_scheduled = schedule["jingles"].indexOf(scene) >= 0 || (!is_current && (schedule["live"] == scene));
      var color = "btn-primary";
      if (is_scheduled) {
        color = "btn-warning";
      }
      if (is_current) {
        color = "btn-danger";
      }
      setButtonClass($("#scene-" + scene), color);
    }
  }

  // -- scene queueing

  function enqueueScene(scene) {
    console.log("enqueue scene: " + scene);
    if (isLive(scene)) {
      schedule["live"] = scene;
    } else if (schedule["jingles"].indexOf(scene) < 0) {
      schedule["jingles"].push(scene);
    }
    console.log("queue state: " + JSON.stringify(schedule));
  }

  function dequeueScene() {
    var jingles = schedule["jingles"];
    var nextScene = null;
    if (jingles.length > 0) {
      // select from jingles with higher priority
      nextScene = jingles[0];
      schedule["jingles"] = jingles.slice(1);
    } else {
      // select live
      nextScene = schedule["live"];
    }
    console.log("dequeue scene: " + nextScene);
    console.log("queue state: " + JSON.stringify(schedule));
    return nextScene;
  }

  function updateScenes() {
    setButtonColors();
    var currentScene = schedule["currentScene"];
    console.log("current scene: " + currentScene);
    if (currentScene && !isLive(currentScene)) {
      // Wait for completion, then this function will be invoked again.
      // After completion the current scene will be deleted.
      // Live scene can be switched to another one immediately.
      console.log("can't break into a jingle");
      return;
    }
    var nextScene = dequeueScene();
    console.log("next scene: " + nextScene);
    if (!nextScene) {
      console.log("nothing to play");
      return;
    }
    if (nextScene == currentScene) {
      console.log("nothing to switch");
      return;
    }
    schedule["currentScene"] = nextScene;
    var deferred = $.when({})
      .then(function() { return callVmixFunction("Restart", {"Input": nextScene}); })
      .then(function() { return callVmixFunction("CutDirect", {"Input": nextScene}); })
      .then(function() { return callVmixFunction("Play", {"Input": nextScene}); })
      .then((function(scene) {
        return function() {
          console.log("cutting into scene: " + scene);
          schedule["currentScene"] = scene;
          setButtonColors();
          console.log("queue state: " + JSON.stringify(schedule));
        }
      })(nextScene));
    if (!isLive(nextScene)) {
      deferred = deferred.then(function() {
        console.log("waiting for completion");
        return callVmixFunction("WaitForCompletion", {"Input": -1});
      })
    }
    deferred = deferred.then((function(scene) {
      return function() {
        console.log("DEBUG: after cut");
        if (!isLive(scene)) {
          console.log("scene completed: " + scene);
          schedule["currentScene"] = null;
        }
        updateScenes();
      }
    })(nextScene));
  }

  // -- vMix API function

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
  function vmixFunctionUrl(name, params) {
    params_ = {"Function": name};
    // clone the function params
    for (key in params) {
      params_[key] = params[key];
    }
    return vmixUrl(params_);
  }

  // calls a vMix function
  // and returns a jQuery Deferred object of the HTTP request
  function callVmixFunction(name, params) {
    var url = vmixFunctionUrl(name, params);
    console.log(url);
    return $.get(url).done(function() { console.log("DONE: " + url);});
  }

  // -- custom vMix control functions

  // play selected title with given background
  function playTitleWithBackground(title_scene, background_scene, background_index) {
    $.when({})
      .then(function() { return callVmixFunction("WaitForCompletion", {"Input": "-1"}); })
      .then(function() { return callVmixFunction("SelectIndex", {"Input": background_scene, "Value": background_index}); })
      .then(function() { return callVmixFunction("SetMultiViewOverlay", {"Input": background_scene, "Value": "1," + title_scene}); })
      .then(function() { return callVmixFunction("CutDirect", {"Input": background_scene}); })
      .then(function() { return callVmixFunction("Play", {"Input": background_scene}); })
      .then(function() { return callVmixFunction("Play", {"Input": title_scene}); });
  }

  // -- create the UI elements and bind actions to them

  for (i in servers) {
    var option = $("<option>").text(servers[i]);
    $("#servers").append(option);
  }
  $("#api_url").val(servers[0]);

  $("#programPlay").click(function() {
    callVmixFunction("Play", {"Input": "-1"});
  });
  $("#programPause").click(function() {
    callVmixFunction("Pause", {"Input": "-1"});
  });

  function createButton(scene) {
    var label = (isLive(scene) ? "Live" : "Jingle") + " " + scene;
    var button = $("<button>", {"class": "btn btn-primary"})
      .attr("id", "scene-" + scene)
      .text(label)
      .on("click", {"scene": scene},
        function(event) {
          enqueueScene(event.data.scene);
          updateScenes();
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
