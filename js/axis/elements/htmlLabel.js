function htmlLabel(subType, hint, label, centered, prefix) {

    var htmlCode="";    

    if ( hint != "" ) {
        htmlCode+='<div class="axis-tooltip" style="display:inline-block">';
        htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        htmlCode+='   </a>';
        htmlCode+='</div>&nbsp';
    }

    if ( prefix != "" ) {
        htmlCode+='<div style="display:inline-block">';
        htmlCode+='  <span class="axis-label fa ' + prefix + '"></span>';
        htmlCode+='</div>&nbsp';
    }

    var centeredText="display:inline-block;";

    if ( centered=="Y" || centered=="C" ) {
       centeredText="text-align: center;"; 
    }

    if ( centered=="L" ) {
       centeredText="text-align: left;";
    }

    if ( centered=="R" ) {
       centeredText="text-align: right; margin-right: 10px;";
    }

 
    switch(subType) {

        case "header"    : htmlCode+="<h2 class='XXaxis-label' style='vertical-align:middle;" + centeredText + "'>" + label + "</h2>";
                           break;

        case "subHeader" : htmlCode+="<h4  class='XXaxis-label' style='vertical-align:middle; margin-top:5px; margin-bottom:5px;" + centeredText + "'>" + label + "</h4>";
                           break;

        case "body"      : htmlCode+="<div  class='XXaxis-label' style='vertical-align:middle;" + centeredText + "'>" + label + "</div>";
                           break

        case "subText"   : htmlCode+='<div  class="XXaxis-label" style="vertical-align:middle;padding-top:5px;padding-bottom:5px;' + centeredText + '"><sub>' + label + '</sub></div>';
                           break;

        case "supText"   : htmlCode+='<div  class="XXaxis-label" style="vertical-align:middle;padding-top:5px;padding-bottom:5px;' + centeredText + '"><sup>' + label + '</sup></div>';
                           break;
    }

    return(htmlCode);

}
