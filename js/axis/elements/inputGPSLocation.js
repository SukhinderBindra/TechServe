function inputGPSLocation(itemID, hint, label, required, visible, value) {

    var inputCode="";    
    var textColor = appRules.textColor;

    if ( visible == "Y" ) {
      inputCode+='<div>';
    } else {
      inputCode+='<div style="display:none">';
    }
    inputCode+='  <label class="axis-label" >' + label + '</label><br>';
    inputCode+='  <span class="fa fa-location-arrow " ' ;
    inputCode+='    style="font-size:large; padding-left: -20px; border: solid 0px #' + textColor + ';" >' ;
    inputCode+='  </span>';
    inputCode+='  <input axisType="location" class="form-control" style="width:80%;border:0px; background-color:' + appRules.backgroundColor + ';"';
    inputCode+='     type="text" readonly disabled id="' + itemID + '" value="' + value + '" />';

    inputCode+='  <span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';
    inputCode+='</div>';

    elementDataTypes[ itemID ] = 'location';

    //---------------------//
    // Check Auto Populate //
    //---------------------//
    if ( value.length == 0 ) {
        axisLocation.reverseGeocodeNeeded = "Y";
        axisLocationEvents.push(
            function() {
                inputGPSLocationPopulate(itemID);
            }
        );
    }

    return(inputCode);
}

function inputGPSLocationPopulate(itemID) {
    var element = document.getElementById(itemID);
    document.getElementById(itemID).value = axisLocation.lat + ',' + axisLocation.lon;
    return(0);
}

function isValidInputGPSLocation(itemID) {
    var msgElement = document.getElementById('axis_message_' + itemID);
    var element = document.getElementById(itemID);
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemID).value;

    element.classList.remove('error');
    msgElement.style.display = "none";
  
    if ( required == "Y" && inputValue.length == 0 ) {
        element.classList.add('error');
        msgElement.innerHTML="Required.";
        msgElement.style.display = "block";
        return(false);
    } 

    return(true);
}

function getInputGPSLocation(itemID) { 
    return( document.getElementById(itemID).value ) ; 
}
