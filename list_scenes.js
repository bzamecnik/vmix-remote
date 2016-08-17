$(document).ready(function(){
  var servers = [
    "/example-state.xml",
    "http://lenka-thinkpad.local:8088/api/",
    "http://aws-vmix.pianomad.com:8088/api/"
  ];

  for (i in servers) {
    var option = $("<option>").text(servers[i]);
    $("#servers").append(option);
  }
  $("#api_url").val(servers[0]);

  // -- vMix API function

  function apiUrl() {
    return $("#api_url").val();
  }

  function formatDuration(millis) {
    // convert from milliseconds to HH:MM:SS format
    return new Date(millis).toISOString().substr(11, 8);
  }

  function extractScenes(status_xml, scenesByGroup) {
    function getGroup(sceneNumber) {
      if (scenesByGroup['live'].indexOf(sceneNumber) >= 0) {
        return 'live';
      } else if (scenesByGroup['jingle'].indexOf(sceneNumber) >= 0) {
        return 'jingle';
      } else {
        return 'unused';
      }
    }

    var $status = $(status_xml);
    var $inputs = $status.find("inputs input");
    $("#scenes li").remove();
    $inputs.each(function() {
      var number = $(this).attr("number");
      var title = $(this).attr("title");
      var activeGroup = getGroup(number);
      var durationMillis = formatDuration(parseInt($(this).attr("duration"), 10));
      function makeGroupLabel(group, groupTitle, icon) {
        var inGroup = activeGroup == group;
        return $("<label>", {"class": "btn btn-default", "data-group": group})
          .toggleClass("active", inGroup)
          .append($("<input>", {"type": "radio", "autocomplete": "off", "checked": inGroup ? "" : null}))
          .append($("<span>", {"class": "glyphicon " + icon, "aria-hidden": "true"}))
          .append("&nbsp;" + groupTitle)
      }
      $("#scenes").append(
        $("<li>", {"class": "list-group-item", "data-scene-number": number})
          .append($("<div>", {"class": "btn-group", "data-toggle": "buttons"})
            .append(makeGroupLabel("unused", "Unused", "glyphicon-ban-circle"))
            .append(makeGroupLabel("live", "Live", "glyphicon-star"))
            .append(makeGroupLabel("jingle", "Jingle", "glyphicon-music")))
          .append(number + " - " + durationMillis + " - " + title)
        );
    });
  }

  function getScenesByGroup() {
    function getScenesForGroup(groupName) {
      return $('#scenes li .btn-group *[data-group="' + groupName + '"].active').map(function() {
        return $(this).closest("li").attr("data-scene-number");
      }).toArray();
    }
    return {
      "live": getScenesForGroup("live"),
      "jingle": getScenesForGroup("jingle"),
    };
  }

  function updateStatus() {
    var settings = loadSettings();
    var scenesByGroup = settings['scenesByGroup'];

    $.get(apiUrl()).done(function(status_xml) {
      // print the raw XML status
      $("#status_xml").text(new XMLSerializer().serializeToString(status_xml));
      // process the status
      extractScenes(status_xml, scenesByGroup);
    });
  }

  function saveSettings() {
    var settings = {
      'scenesByGroup': getScenesByGroup()
    };
    window.localStorage['vmixRemote'] = JSON.stringify(settings);
    console.log('settings saved:' + settings);
  }

  function loadSettings() {
    var settings_string = window.localStorage['vmixRemote'];
    if (settings_string) {
      return JSON.parse(settings_string);
    } else {
      return {'scenesByGroup': {'live': [], 'jingle': []}};
    }
  }

  // $("#update_status").click(updateStatus);
  // $("#save_settings").click(saveSettings);

  updateStatus();

  $("#scenes label").on('click', saveSettings);
});
