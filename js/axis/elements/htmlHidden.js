function htmlHidden( itemID, value) {


    var inputCode='<input axisType="hidden" '  +
                  '  type="text" '             +
                  '  style="display:none;"'    + 
                  '  id="' + itemID + '" '   +
                  '  value=\'' + value + '\' />';

    elementDataTypes[ itemID ] = 'text';

    return(inputCode);

}


function getInputHidden(itemID) {
    return(document.getElementById(itemID).value);
}

