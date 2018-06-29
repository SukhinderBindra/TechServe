function inputTextArea(itemName, hint, label, placeholder, enabled, minChars, maxChars, uppercase, rows, value) {

    var inputCode="";    
    var requiredStar="";    

    if ( minChars != 0 ) {
        requiredStar=" *";
    }

    var disabled="";
    if ( enabled != "Y" ) {
        disabled=" disabled ";
    }

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>&nbsp';
    }

    inputCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';
    inputCode+='    <textarea axisType="textarea" class="rounded" style="border: 1px solid #ccc;width:100%;';
    if ( uppercase == "Y" ) {
        inputCode+='text-transform:uppercase;';
    } 
    inputCode+='"';
    inputCode+=' type="textarea" ' + disabled    +
               ' minlength="'      + minChars    + '" ' + 
               ' maxlength="'      + maxChars    + '" ' + 
               ' rows="'           + rows        + '" ' + 
               ' placeholder="'    + placeholder + '" ' +
               ' name="'           + itemName    + '" ' +
               ' id="'             + itemName    + '" >' + value +'</textarea>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'textarea';

    return(inputCode);

}

function isValidInputTextArea(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var minChars = element.getAttribute("minlength");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error')
    msgElement.style.display = "none";
  
    if ( inputValue.length < minChars ) {
        element.classList.add('error');
        msgElement.innerHTML="Input too small. Minimum size is " + minChars + ".";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputTextArea(itemName) { 
    return( document.getElementById(itemName).value ) ; 
}
