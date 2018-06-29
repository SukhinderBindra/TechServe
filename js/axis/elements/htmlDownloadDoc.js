function htmlDownloadDoc(itemID, buttonIcon, buttonLabel, docUrl, docName, fullWidth ) {

    var htmlCode="";    
    var buttonWidth="";
    var buttonMargin="";


    var buttonColor=appRules.buttonColor;
    var buttonTextColor=appRules.buttonTextColor;

    if ( fullWidth == "Y" ) {
        buttonWidth=" width:98%; ";
        buttonMargin=" margin-left: 25px;";
    }

    htmlCode+='<div style="margin-top:5px;text-align:center;' + buttonWidth + '">';
    htmlCode+='    <a href="#" style="' + buttonWidth + ' background: #' + buttonColor + ';" class="btn rounded" ' ;
    htmlCode+='        onclick="downloadFile(\'' + docUrl + '\'); return false;" >';
    htmlCode+='        <span style="font-size:x-large;color:#' + buttonTextColor + '; ' + buttonMargin + ';" class="fa ' + buttonIcon + ' pull-left"> &nbsp </span> ';
    htmlCode+='        <span class="" style="font-size:large;color:#' + buttonTextColor + ';">' + buttonLabel + '</span> ';
    htmlCode+='    </a>';
    htmlCode+='</div>';

    return(htmlCode);

}


function downloadFile(uri) {
    window.open(uri, '_system');
}    

