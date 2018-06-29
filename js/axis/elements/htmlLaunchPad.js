function htmlLaunchPad(itemName, hint, label, numCols, valueField, descField, logoField, data, dataBundle ) {

    var htmlCode  = "";    
    var bsCols    = "";
    var bsWidth   = 12;
    var buttonColor     = appRules.buttonColor;

    var badgeColor     = appRules.buttonColor;
    var badgeTextColor = appRules.buttonTextColor;

    var badgeInd="Y";

    switch (numCols) {
        case "1"  : bsCols = "col-xs-12"; bsWidth=12; break;
        case "2"  : bsCols = "col-xs-6" ; bsWidth=6 ; break;
        case "3"  : bsCols = "col-xs-4" ; bsWidth=4 ; break;
        case "4"  : bsCols = "col-xs-3" ; bsWidth=3 ; break;
        case "6"  : bsCols = "col-xs-2" ; bsWidth=2 ; break;
        default   : bsCols = "col-xs-1" ; bsWidth=1 ; break;
    }

    htmlCode+='<fieldset id="' + itemName+ '" style="padding:5px; border:1px solid #' + buttonColor + ';" >';

    htmlCode+='<legend  class="axis-label" style="margin-bottom: 0px; border-bottom:0px; width:inherit; font-size:14px; color:#' + buttonColor + ';">';
    if ( hint != "" ) {
        htmlCode+='&nbsp <div class="axis-tooltip" style="display:inline-block"> ';
        htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        htmlCode+='   </a>';
        htmlCode+='</div>&nbsp';
    }
    htmlCode+='&nbsp <h4 style="display:inline-block" >' + label + '</h4> &nbsp';
    htmlCode+='</legend>';
    htmlCode+='<br>';
    htmlCode+='<div class="row">';

    var bsCurrWidth=0;

    for ( var recCnt=0; recCnt< data.length; recCnt++ ) {

        var screenName  = data[recCnt][valueField];
        var screenLabel = data[recCnt][descField];
        var buttonLogo  = data[recCnt][logoField];
        var badgeVal    = data[recCnt].badgeVal;

        var screenEnabled = dataBundle[screenName];
        var muted="";

        htmlCode+='<div class="' + bsCols + '" style="text-align:center;"><br>'; 
        htmlCode+='  <label  class="axis-label ">';


        if ( typeof screenEnabled != "undefined" && screenEnabled == "N" ) {
            muted=" text-muted ";
        }

        htmlCode+='<div class="col-xs-' + bsCols + ' text-center">';

        if ( muted == "" ) {
            htmlCode+='  <a href="#" style="color: #' + buttonColor + ';" onclick="htmlTransitionButtonHandle(\'' + screenName + '\', \'' + currScreenName +  '\')">' ;
        } else {
            htmlCode+='  <a href="#" style="color: #' + buttonColor + ';">' ;
        }

        htmlCode+='    <i class="fa ' + buttonLogo + ' rounded ' + muted + '" ' ;
        htmlCode+='      style="font-size:xx-large; padding-left: -20px; border: solid 0px #' + buttonColor + ';" >' ;
        htmlCode+='    </i>';
        if ( badgeInd == "Y" && badgeVal > 0 ) {
            htmlCode+='    <span class="badge" style="position:absolute; color:#' + badgeColor + ';background:#' + badgeTextColor + '">' + badgeVal + '</span>';
        }
        htmlCode+='    <br>';
        if ( muted == "" ) {
            htmlCode+='    <span style="font-weight: normal;color:#' + buttonColor + '">' + screenLabel + '</span>';
        } else {
            htmlCode+='    <span style="font-weight:normal;" class="' + muted + ';">' + screenLabel + '</span>';
        }
        htmlCode+='  </a>';
        htmlCode+='</div>';

        htmlCode+='  </label>';
        htmlCode+='</div>'; 

        bsCurrWidth+=bsWidth;
        if ( bsCurrWidth >= 12 ) {
            htmlCode+='</div>'; 
            htmlCode+='<br>'; 
            htmlCode+='<br>'; 
            htmlCode+='<div class="row">'; 
            bsCurrWidth=0;
        }

    }
    htmlCode+='</div>';

    htmlCode+='</fieldset>';

    return(htmlCode);

}

