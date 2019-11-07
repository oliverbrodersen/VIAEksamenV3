function toggleMenu() {
    const menu = $("#menuContainer");
    if (menu.css("height") == "0px")
        menu.css("height", "23em");
    else
        menu.css("height", "0px");
}