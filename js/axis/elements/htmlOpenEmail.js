function htmlOpenEmail(itemName, value) {

    var buttonColor = appRules.buttonColor;

    var currCode="";    

    currCode+='<a href="mailto:' + value + '" target="_top" >';
    currCode+='    <i class="fa fa-envelope fa-2x" style="color:#' + buttonColor + '"></i> &nbsp ';
    currCode+='    <div style="display:inline-block" class="axis-label" >' + value +  '</div>';
    currCode+='</a>';

    elementDataTypes[ itemName ] = 'openEmail';

    return(currCode);
}
