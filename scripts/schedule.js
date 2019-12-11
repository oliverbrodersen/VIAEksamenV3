//Format;
//{classname, examType, dateStart, dateEnd, color}
const keywords = [];
let parameters = false;
let dateFrom, dateTo, semester;
const difference = 110;

//Create classes and keywords from loaded array
if (classes.length !== 0) {
    for (let i = 0; i < classes.length; i++) {
        const str = classes[i].classname.split("-");
        const shortName = str[1].slice(0,3);
        //For each item in classes array createCard
        createCard(i, classes[i].classname, shortName , classes[i].examType, classes[i].roomName, classes[i].teacher, classes[i].hasHDMI, classes[i].hasVGA , classes[i].dateStart, classes[i].dateEnd, classes[i].color, true);
    }
}
//Bind enter key to run function from input
document.getElementById('subjectInput').onkeypress = function(e) {
    if(e.keyCode === 13) {
        search(this.value);
    }
};
//Create card
function createCard(i, classname, nameShort, examType, roomName, teacher, hasHDMI, hasVGA, dateStart, dateEnd, color, init) {
    //Add to context a card with correct information
    if(document.getElementById("class" + i) === null) {
        const dateStartPart = dateStart.split("/");
        const dateEndPart = dateEnd.split("/");
        $( "#content" ).append("<div class='card card" + classname + "' id='class" + i + "' style='border-color: " + color + ";'><h3>" + examType + "</h3><h1>" + classname + "</h1><h3>" + teacher + "</h3><h3 class='room'>" + roomName + "</h3><h2>" + dateStartPart[0] + "/" + dateStartPart[1] + " - " + dateEndPart[0] + "/" + dateEndPart[1] + "</h2></div>");
        if (init)
            createKeyword(i, nameShort, color, true);
        if (hasHDMI === "true")
            $(".card" + classname).addClass("hasHDMI");
        if (hasVGA === "true")
            $(".card" + classname).addClass("hasVGA");
    }
}

//Creates keyword
function createKeyword(i, name, color, add) {
    if (document.querySelector('.' + name) == null) {
        if(add){
            keywords.push({name: name, color: color});
        }
        //\u0022 is unicode for "
        $( "#keywords" ).append("<div class='keyword " + name + "' id='key" + i + "' style='background-color: " + color + ";'>" + name + "<div class='x' onclick='removeKeyword(\u0022" + name + "\u0022)'>&#x2715;</div></div>");
    }
}
//Removes keyword from everywhere
function removeKeyword(word){
    for (let i = 0; i < keywords.length; i++){
        if(keywords[i].name === word){
            keywords.splice(i, 1);
        }
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
                    document.querySelector('.' + classes[j].classname) == null && createCard(j, classes[j].classname, classPart[1] , classes[j].examType, classes[j].roomName, classes[j].teacher, classes[j].hasHDMI, classes[j].hasVGA , classes[j].dateStart, classes[j].dateEnd, classes[j].color, false);
                    break;
            }
        }
    }
}

function search(term){
    $("#subjectInput").val("");
    term = term.toUpperCase();
    createKeyword(keywords.length, term, getColor(), true);
    updateKeywords();
}
function showAll() {
    for (let i = 0; i < classes.length; i++) {
        const str = classes[i].classname.split("-");
        const shortName = str[1].slice(0,3);
        //For each item in classes array createCard
        createCard(i, classes[i].classname, shortName , classes[i].examType, classes[i].roomName, classes[i].teacher, classes[i].hasHDMI, classes[i].hasVGA , classes[i].dateStart, classes[i].dateEnd, classes[i].color, true);
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