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

  function extractScenes(status_xml) {
    var $status = $(status_xml);
    var $inputs = $status.find("inputs input");
    $("#scenes li").remove();
    $inputs.each(function() {
      var number = $(this).attr("number");
      var title = $(this).attr("title");
      var durationMillis = formatDuration(parseInt($(this).attr("duration"), 10));
      $("#scenes").append($("<li>").text(number + " - " + durationMillis + " - " + title));
    });
  }

  function updateStatus() {
    $.get(apiUrl()).done(function(status_xml) {
      // print the raw XML status
      $("#status_xml").text(new XMLSerializer().serializeToString(status_xml));
      // process the status
      extractScenes(status_xml);
    });
  }

  $("#update_status").click(updateStatus);
});
