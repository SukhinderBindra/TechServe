function htmlToggleButton(itemID, Yicon, Ylabel, YBgColor, YTxtColor, Nicon, Nlabel, NBgColor, NTxtColor, parentID, itemValue, fullWidth, dataFactory) {

    var htmlCode="";    
    var buttonWidth="";
    var buttonMargin="";


    var buttonIcon=Nicon;
    var buttonLabel=Nlabel;
    var buttonColor=NBgColor;
    var buttonTextColor=NTxtColor;


    if ( itemValue == "Y" ) {
        buttonIcon=Yicon;
        buttonLabel=Ylabel;
        buttonColor=YBgColor;
        buttonTextColor=YTxtColor;
     }

    if ( fullWidth == "Y" ) {
        buttonWidth=" width:98%; ";
        buttonMargin=" margin-left: 25px;";
    }

    htmlCode+='<div style="margin-top:5px;text-align:center;' + buttonWidth + '">';
    htmlCode+='  <a href="#" style="' + buttonWidth + ' background: #' + buttonColor + ';" class="btn rounded" ' ;
    htmlCode+='    onclick="htmlRefreshButtonHandle(\'' + currScreenName + '\', \'' + dataFactory + '\', \'' + parentID + '\'); return(false);" >';
    htmlCode+='    <span style="font-size:x-large;color:#' + buttonTextColor + '; ' + buttonMargin + ';" class="fa ' + buttonIcon + ' pull-left"> &nbsp </span> ';
    htmlCode+='    <span class="" style="font-size:large;color:#' + buttonTextColor + ';">' + buttonLabel + '</span> ';
    htmlCode+='  </a>';
    htmlCode+='</div>';

    return(htmlCode);

}
