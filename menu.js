var menu = [];

function initMenu($parent, menuItems) {
  menu = menuItems;
  
  var $menu = $("<div id='menu'/>");
  
  //Apple
  $menu.append("<span class='menu-item'><img src='images/apple.png'></span>");
  $parent.prepend($menu);
  
  //Menu items
  for(item in menu) {
    var $item = $("<span class='menu-item' id='menu-"+ item +"' onmousedown='showMenu(\""+ item +"\");'/>");
    $item.append(item);
    $menu.append($item);
  }  
}

function showMenu(currentMenu) {
  $("body").append("<div class='dropDownMenu'></div>");
  $(".dropDownMenu").offset({
    "left": $("#menu-" + currentMenu).offset().left,
    "top": $("#menu").offset().top + $("#menu").height()
  });     
  
  for(var i=0; i<menu[currentMenu].length; i++) {
    if(menu[currentMenu][i] == "---") {
      $(".dropDownMenu").append("<div class='menu-separator'></div>");
    }
    else {
      $(".dropDownMenu").append("<li>"+ menu[currentMenu][i] +"</li>");
    }
  }
}

function hideMenu() {
  $(".dropDownMenu").remove();
}