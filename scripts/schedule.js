//Format;
//{classname, examType, dateStart, dateEnd, color}
const keywords = [];
let parameters = false;
let dateFrom, dateTo, semester;
//Create classes and keywords from loaded array
if (classes.length !== 0) {
    for (let i = 0; i < classes.length; i++) {
        //For each item in classes array createCard
        createCard(i, classes[i].classname, classes[i].nameShort, classes[i].examType, classes[i].dateStart, classes[i].dateEnd, classes[i].color, true);
    }
}
//Bind enter key to run function from input
document.getElementById('subjectInput').onkeypress = function(e) {
    if(e.keyCode === 13) {
        search(this.value);
    }
};
//Create card
function createCard(i, classname, nameShort, examType, dateStart, dateEnd, color, init) {
    //Add to context a card with correct information
    if(document.getElementById("class" + i) === null) {
        const dateStartPart = dateStart.split("-");
        const dateEndPart = dateEnd.split("-");
        $( "#content" ).append("<div class='card card" + classname + "' id='class" + i + "' style='border-color: #" + color + ";'><h1>" + classname + "</h1><h3>" + examType + "</h3><h2>" + dateStartPart[1] + "/" + dateStartPart[2] + " - " + dateEndPart[1] + "/" + dateEndPart[2] + "</h2></div>");
        if (init)
            createKeyword(i, nameShort, color, true);
    }
}

//Creates keyword
function createKeyword(i, name, color, add) {
    if (document.querySelector('.' + name) == null) {
        if(add)
            keywords.push({name: name, color: color});
        //\u0022 is unicode for "
        $( "#keywords" ).append("<div class='keyword " + name + "' id='key" + i + "' style='background-color: #" + color + ";'>" + name + "<div class='x' onclick='removeKeyword(\u0022" + name + "\u0022)'>&#x2715;</div></div>");
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
            if(keywords[i].name === classes[j].nameShort || keywords[i].name === classPart[0] || keywords[i].name === classPart[3] || keywords[i].name === classPart[2] || keywords[i].name === classes[j].classname || keywords[i].name === classes[j].examType && document.querySelector('.' + classes[j].classname) == null){
                //Create card
                createCard(j,classes[j].classname,classes[j].nameShort,classes[j].examType,classes[j].dateStart,classes[j].dateEnd,classes[j].color, false);
                //Create keyword tag
                createKeyword(i, keywords[i].name, classes[j].color, false);
            }
        }
    }
}
function setParameters(){
    parameters = true;
    let print = "";
    if($("#dateFrom").val() !== ""){
        dateFrom = new Date($("#dateFrom").val());
    }
    if($("#dateTo").val() !== ""){
        dateTo = new Date($("#dateTo").val());
    }
}

function search(term){
    $("#subjectInput").val("");
    term = term.toUpperCase();
    createKeyword(keywords.length, term, "ff66aa", true);
    updateKeywords();
}