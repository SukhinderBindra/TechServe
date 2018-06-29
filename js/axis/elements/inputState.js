function inputState(itemID, hint, label, required, uppercase, maxSize, autoPopulate, abbreviated, value) {

    var inputCode="";    
    var requiredStar="";
    if (required == "true" ) {
        requiredStar=" *";
    }

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>&nbsp';
    }

    inputCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';
    inputCode+='    <input axisType="state" class="form-control" style="width:100%;';
    if ( uppercase == "Y" ) {
        inputCode+='text-transform:uppercase;';
    }
    inputCode+='"';
    inputCode+=' type="text" ' +
               ' required="'     + required     + '" ' + 
               ' abbreviated="'  + abbreviated  + '" ' + 
               ' maxlength="'    + maxSize      + '" ' + 
               ' name="'         + itemID       + '" ' +
               ' id="'           + itemID       + '" ' +
               ' value="'        + value        + '" />';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';

    elementDataTypes[ itemID ] = 'state';

    //---------------------//
    // Check Auto Populate //
    //---------------------//
    if ( autoPopulate == "Y" && value.length == 0 ) {
        axisLocation.reverseGeocodeNeeded = "Y";
        axisLocationEvents.push(
            function() {
                inputStatePopulate(itemID);
            }
        );
    }

    return(inputCode);
}

function inputStatePopulate(itemID) {
    var element = document.getElementById(itemID);
    var abbreviated = element.getAttribute("abbreviated");

    if ( abbreviated == "Y" ) {
        document.getElementById(itemID).value = axisLocation.stateShort;
    } else {
        document.getElementById(itemID).value = axisLocation.state;
    }
    return(0);
}

function isValidInputState(itemID) {
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

function getInputState(itemID) { 
    return( document.getElementById(itemID).value ) ; 
}
