var windowMoveOffset = [0, 0];
var windowMoveState = "NOT_MOVING";
var movingWindow = "";
    
function activateWindow(windowName) {
  //Deacivate all windows
  $(".window-frame").css("background-image", "none");
  
  //Activate current window
  $("#"+ windowName +"-window .window-frame").css("background-image", "url('images/window-frame.png')");
}

function stopDragWindow() {
  if(windowMoveState == "MOVING") {
    $("#"+ movingWindow +"-window").offset($(".moving-window-placeholder").offset());
    $(".moving-window-placeholder").remove();
    windowMoveState = "NOT_MOVING";
    activateWindow(movingWindow);
  }
}

function startDragWindow(windowName, e) {
  $(".moving-window-placeholder").remove();
  $("body").append("<div class='moving-window-placeholder'></div>");
  $(".moving-window-placeholder").offset($("#"+ windowName +"-window").offset());
  $(".moving-window-placeholder").width($("#"+ windowName +"-window").width());
  $(".moving-window-placeholder").height($("#"+ windowName +"-window").height());
  
  movingWindow = windowName;
  windowMoveOffset = [e.clientX - $("#"+ windowName +"-window").offset().left, e.clientY - $("#"+ windowName +"-window").offset().top];
  windowMoveState = "MOVING";
}

function dragWindow(e) {
  if(windowMoveState == "MOVING") {
    $(".moving-window-placeholder").offset({
      "left": e.clientX - windowMoveOffset[0],
      "top": e.clientY - windowMoveOffset[1]
    });
  }
}