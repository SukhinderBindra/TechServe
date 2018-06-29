function inputZip(itemID, hint, label, required, autoPopulate, value) {

    var inputCode="";    

    minVal=1001;
    maxVal=99999;

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
    inputCode+='    <input axisType="zip" class="form-control" style="width:100%;';
    inputCode+='"';
    inputCode+=' type="number" ' +
               ' required="'     + required + '" ' + 
               ' min="'          + minVal   + '" ' + 
               ' max="'          + maxVal   + '" ' + 
               ' name="'         + itemID   + '" ' +
               ' id="'           + itemID   + '" ' +
               ' value="'        + value    + '" />';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';

    elementDataTypes[ itemID ] = 'zip';

    //---------------------//
    // Check Auto Populate //
    //---------------------//
    if ( autoPopulate == "Y" && value.length == 0 ) {
        axisLocation.reverseGeocodeNeeded = "Y";
        axisLocationEvents.push(
            function() {
                inputZipPopulate(itemID);
            }
        );
    }

    return(inputCode);
}

function inputZipPopulate(itemID) {
    document.getElementById(itemID).value = axisLocation.zip;
    return(0);
}

function isValidInputZip(itemID) {
    var element = document.getElementById(itemID);
    var msgElement = document.getElementById('axis_message_' + itemID);
    var minVal = element.getAttribute("min");
    var maxVal = element.getAttribute("max");
    var inputValue=document.getElementById(itemID).value;

    element.classList.remove('error');
    msgElement.style.display = "none";
  
    if ( inputValue.length == 0 || parseInt(inputValue, 10) < parseInt(minVal, 10) ) {
        element.classList.add('error');
        msgElement.innerHTML="Input too small. Minimum value is " + minVal + ".";
        msgElement.style.display = "block";
        return(false);
    } 

    if ( parseInt(inputValue, 10) > parseInt(maxVal, 10) ) {
        element.classList.add('error');
        msgElement.innerHTML="Input too large. Maximum value is " + maxVal + ".";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputZip(itemID) { 
    return( document.getElementById(itemID).value ) ; 
}
