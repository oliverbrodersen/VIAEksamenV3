function toggleMenu() {
    const menu = $("#menuContainer");
    if (menu.css("height") == "0px")
        menu.css("height", "23em");
    else
        menu.css("height", "0px");
}
//calc(100% - 22em)
function toggleSidebar() {
    const menu = $("#sidebar"), content = $("#content"), button = $("#toggle");
    if(menu.css("left") === "0px"){
        content.css("width", "100%").css("left", "0");
        menu.css("left", "-22em");
        button.text(">")
    }
    else{
        content.css("width", "calc(100% - 22em)").css("left", "22em");
        menu.css("left", "0");
        button.text("<")
    }
}