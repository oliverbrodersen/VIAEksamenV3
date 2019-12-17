//Format;
//{classname, examType, dateStart, dateEnd, color}
const keywords = [];
const difference = 110;
let favorites = [];

//Create classes and keywords from loaded array
classes.length !== 0 && showAll();
//Bind enter key to run function from input
document.getElementById('subjectInput').onkeypress = function(e) {
    if(e.keyCode === 13) {
        search(this.value);
    }
};
//Create card
function createCard(i, classname, nameShort, examType, roomName, teacher, isGroup, hasHDMI, hasVGA, dateStart, dateEnd, color, is7thSemester, init) {
    //Add to context a card with correct information
    if(document.getElementById("class" + i) === null) {
        const dateStartPart = dateStart.split("/");
        const dateEndPart = dateEnd.split("/");
        $( "#content" ).append("<div class='card' id='card" + classname + "' style='border-color: " + color + ";' onclick='favcard(\u0022" + classname + "\u0022)'>" +
            "<img class='fav' src='img/star.png' alt='fav'/>" +
            "<h3>" + examType + "</h3>" +
            "<h1>" + classname + "</h1>" +
            "<h3>" + teacher + "</h3>" +
            "<h3 class='room'>" + roomName + "</h3>" +
            "<h2>" + dateStartPart[0] + "/" + dateStartPart[1] + ((dateStart === dateEnd) ? '' : " - " + dateEndPart[0] + "/" + dateEndPart[1]) + "</h2>" +
            "<img class='group' src='img/solo.png' alt='group'/></div>");
        init && createKeyword(i, nameShort, color, true);
        hasHDMI === "true" && $("#card" + classname).addClass("hasHDMI");
        hasVGA === "true" &&  $("#card" + classname).addClass("hasVGA");
        isGroup === "true" &&  $("#card" + classname + " .group").attr("src", "img/group.png");

        for (let j = 0; j < favorites.length; j++) {
            if (favorites[j] === classname){
                $("#card" + classname).prependTo($("#content"));
                $("#card" + classname + " .fav").attr("src", "img/Astar.png");
            }
        }
    }
}

//Creates keyword
function createKeyword(i, name, color, add) {
    if (document.querySelector('.' + name) == null) {
        add && keywords.push({name: name, color: color});
        //\u0022 is unicode for "
        $( "#keywords" ).append("<div class='keyword " + name + "' id='key" + i + "' style='background-color: " + color + ";'>" + name + "<div class='x' onclick='removeKeyword(\u0022" + name + "\u0022)'>&#x2715;</div></div>");
    }
}
//Removes keyword from everywhere
function removeKeyword(word){
    for (let i = 0; i < keywords.length; i++){
        keywords[i].name === word && keywords.splice(i, 1);
    }
    //Redo the search
    updateKeywords();
}

//Update search
function updateKeywords(){
    //Clear containers
    $("#keywords").empty();
    $("#content").empty();
    //For each keyword
    for (let i = 0; i < keywords.length; i++){
        //Check if the keyword is finding stuff
        for(let j = 0; j < classes.length; j++){
            const classPart = classes[j].classname.split("-");
            //Create keyword tag
            createKeyword(i, keywords[i].name, keywords[i].color, false);
            switch (keywords[i].name) {
                case classPart[0]:
                case classPart[1]:
                case classPart[2]:
                case classes[j].classname:
                case classes[j].examType.toUpperCase():
                case classes[j].teacher.toUpperCase():
                case classes[j].roomName.toUpperCase():
                    document.querySelector('#card' + classes[j].classname) == null && createCard(j, classes[j].classname, classPart[1] , classes[j].examType, classes[j].roomName, classes[j].teacher, classes[j].groupExam, classes[j].hasHDMI, classes[j].hasVGA , classes[j].dateStart, classes[j].dateEnd, classes[j].color, classes[j].is7thSemester, true);
                    break;
            }
        }
    }
}
function favcard(t) {
    if (favorites.includes(t)){
        favorites.splice(favorites.indexOf(t),1);
        $("#card" + t + " .fav").attr("src", "img/star.png");
        $("#card" + t).appendTo($("#content"));
    }
    else{
        favorites.push(t);
        $("#card" + t).prependTo($("#content"));
        $("#card" + t + " .fav").attr("src", "img/Astar.png");
     }
    let fav = "";
    for (let i = 0; i < favorites.length; i++) {
        fav += favorites[i] + "£"
    }
    Cookies.set('fav',fav);

}
function search(term){
    $("#subjectInput").val("");
    term = term.toUpperCase();
    createKeyword(keywords.length, term, getColor(), true);
    updateKeywords();
}
function showAll() {
    if (Cookies.get('fav') === undefined)
        Cookies.set("fav","");
    const cookie = Cookies.get('fav'), fav = cookie.split("£");
    $("#content").empty();
    for (let i = 0; i < classes.length; i++) {
        const t= classes[i].classname;
        const str = t.split("-");
        const shortName = str[1];
        //For each item in classes array createCard
        createCard(i, t, shortName , classes[i].examType, classes[i].roomName, classes[i].teacher, classes[i].groupExam, classes[i].hasHDMI, classes[i].hasVGA , classes[i].dateStart, classes[i].dateEnd, classes[i].color, classes[i].is7thSemester, true);
        for (let j = 0; j < fav.length; j++) {
            if (fav[j] === t){
                favorites.push(t);
                $("#card" + t).prependTo($("#content"));
                $("#card" + t + " .fav").attr("src", "img/Astar.png");
            }
        }
    }
}
function clearAll() {
    keywords.length = 0;
    updateKeywords();
}
function getColor(){
    let largest, a, b, c;do{
        a = Math.floor(Math.random() * (255 - 110)) + 110;
        b = Math.floor(Math.random() * (255 - 110)) + 110;
        c = Math.floor(Math.random() * (255 - 110)) + 110;
        largest = a;
        if(b > largest)
            largest = b;
        if(c > largest)
            largest = c;
    }
    while((a + b + c) < (difference * 4.1) || largest < 200);
    return rgbToHex(a,b,c);
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}