var menu = [];
menu["Arkiv"] = ["Ny spelomg&aring;ng", "Demo", "---", "Avsluta"];
menu["Redigera"] = ["&Aring;ngra", "---", "Klipp ut", "Kopiera", "Klistra in", "Rensa", "Markera allt"];
menu["Special"] = ["Visa hajsk&aring;r...", "---", "Ljud", "---", "G&aring; till karnevalen"];

function showMenu(currentMenu) {
  $("body").append("<div class='dropDownMenu'></div>");
  $(".dropDownMenu").offset({
    "left": $("#menu-" + currentMenu).offset().left,
    "top": $("#menu").offset().top + $("#menu").outerHeight()
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