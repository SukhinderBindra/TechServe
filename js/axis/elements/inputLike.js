function inputLike( itemID, hint, label, value, centered) {

    var htmlCode="";    

    var textColor=appRules.textColor;
    var color=appRules.textColor;
 
    var displayYes     = "none";
    var displayNo      = "none";
    var displayUnknown = "none";

    switch (value) {

        case "Y": displayYes = "block";
                  break;

        case "N": displayNo = "block";
                  break;

        default : displayUnknown = "block";
                  break;
    }

    if ( centered == "Y" ) {
        htmlCode+='<div style="text-align:center;">';
    }

    if ( hint != "" ) {
        htmlCode+='<div class="axis-tooltip" style="display:inline-block">';
        htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        htmlCode+='   </a>';
        htmlCode+='</div>&nbsp';
    }

    htmlCode+='<label  class="axis-label" axisValue="' + value + '" id="' + itemID + '">' + label + '</label><br>';

    htmlCode+='<div id="' + itemID + '_unknown" style="display:' + displayUnknown + ';" >';
    htmlCode+='  <i onclick="inputLikeSetYes(\'' +  itemID + '\')" class="fa fa-thumbs-o-up fa-flip-horizontal" style="font-size:calc(200%); color:#' + color + '"></i>&nbsp &nbsp';
    htmlCode+='  <i onclick="inputLikeSetNo(\'' +  itemID + '\')" class="fa fa-thumbs-o-up fa-flip-vertical fa-flip-horizontal" style="font-size:calc(200%); color:#' + color + '"></i><br>';
    htmlCode+='</div>';

    htmlCode+='<div id="' + itemID + '_yes" style="display:' + displayYes + ';" >';
    htmlCode+='  <i onclick="inputLikeSetYes(\'' +  itemID + '\')" class="fa fa-thumbs-up fa-flip-horizontal" style="font-size:calc(200%); color:#' + color + '"></i>&nbsp &nbsp';
    htmlCode+='  <i onclick="inputLikeSetNo(\'' +  itemID + '\')" class="fa fa-thumbs-o-up fa-flip-vertical fa-flip-horizontal" style="font-size:calc(200%); color:#' + color + '"></i><br>';
    htmlCode+='</div>';

    htmlCode+='<div id="' + itemID + '_no" style="display:' + displayNo + ';" >';
    htmlCode+='  <i onclick="inputLikeSetYes(\'' +  itemID + '\')" class="fa fa-thumbs-o-up fa-flip-horizontal" style="font-size:calc(200%); color:#' + color + '"></i>&nbsp &nbsp';
    htmlCode+='  <i onclick="inputLikeSetNo(\'' +  itemID + '\')" class="fa fa-thumbs-up fa-flip-vertical fa-flip-horizontal"   style="font-size:calc(200%); color:#' + color + '"></i><br>';
    htmlCode+='</div>';

    if ( centered == "Y" ) {
        htmlCode+='</div>';
    }

    elementDataTypes[ itemID ] = 'like';

    return(htmlCode);
}


function inputLikeSetYes(itemID) {
    $('#' + itemID + '_unknown').css('display', 'none');
    $('#' + itemID + '_yes').css('display', 'block');
    $('#' + itemID + '_no').css('display', 'none');

    var element = document.getElementById(itemID);
    element.setAttribute("axisValue", "Y");
}

function inputLikeSetNo(itemID) {
    $('#' + itemID + '_unknown').css('display', 'none');
    $('#' + itemID + '_yes').css('display', 'none');
    $('#' + itemID + '_no').css('display', 'block');

    var element = document.getElementById(itemID);
    element.setAttribute("axisValue", "N");
}

function getInputLine(itemID) {
    var element = document.getElementById(itemID);
    return (element.getAttribute("axisValue"));
}

