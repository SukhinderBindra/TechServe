function htmlDivider(itemName, color) {

    var htmlCode="";    

    if ( !color || color == "" ) {
        color=appRules.borderColor;
    }

    htmlCode+='<hr width="100%" style="border-top:1px solid #' + color + '; margin-top: 5px; margin-bottom: 5px;">';

    return(htmlCode);

}
