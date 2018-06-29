// Get Font Awosome Icon name for the user.
function htmlOpenPhone(itemName, value) {

    var buttonColor = appRules.buttonColor;

    var currCode="";    

    currCode+='<a href="tel:' + value + '">';
    currCode+='    <i class="fa fa-phone fa-2x" style="color:#' + buttonColor + '"></i> &nbsp ';
    currCode+='    <div style="display:inline-block" class="axis-label" >' + value +  '</div>';
    currCode+='</a>';

    elementDataTypes[ itemName ] = 'openPhone';

    return(currCode);
}
