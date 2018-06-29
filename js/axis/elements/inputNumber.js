function inputNumber(itemName, hint, label, required, minVal, maxVal, value) {

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
    inputCode+='    <input axisType="number" class="form-control" style="width:100%;';
    inputCode+='"';
    inputCode+=' type="number" ' +
               ' required="'     + required + '" ' + 
               ' min="'          + minVal   + '" ' + 
               ' max="'          + maxVal   + '" ' + 
               ' name="'         + itemName + '" ' +
               ' id="'           + itemName + '" ' +
               ' value="'        + value    + '" />';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'number';

    return(inputCode);
}

function isValidInputNumber(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var minVal = element.getAttribute("min");
    var maxVal = element.getAttribute("max");
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "false" && inputValue.length == 0 ) {
        return(true);
    }
  
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

function getInputNumber(itemName) { 
    return( document.getElementById(itemName).value ) ; 
}
