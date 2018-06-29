function inputText(itemName, hint, label, placeholder, enabled, minSize, maxSize, uppercase, allowSpaces, allowSpecialChars, allowDigits, value) {

    var inputCode="";    
    var requiredStar="";
    var required="";
    if (minSize != 0 ) {
        requiredStar=" *";
        required=" required ";
        
    }

    var disabled="";
    if ( enabled == "N" ) {
        disabled=" disabled ";
    }
    

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div> &nbsp';
    }

    inputCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';
    inputCode+='    <input axisType="text" class="form-control" style="width:100%;';
    if ( uppercase == "Y" ) {
        inputCode+='text-transform:uppercase;';
    } 

    inputCode+='"';
    inputCode+=' type="text" ' +
                ' required="' + required + '" ' +  disabled +
                ' allowSpaces="' + allowSpaces + '" ' + 
                ' allowSpecialChars="' + allowSpecialChars + '" ' + 
                ' allowDigits="' + allowDigits + '" ' + 
                ' minlength="' + minSize + '" ' + 
                ' maxlength="' + maxSize + '" ' + 
                ' placeholder="' + placeholder + '" ' +
                ' name="' + itemName + '" ' +
                ' id="' + itemName + '" ' +
                ' value="' + value + '" />';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'text';

    return(inputCode);

}

function isValidInputText(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var minSize = element.getAttribute("minlength");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";
  
    if ( inputValue.length < minSize ) {
        element.classList.add('error');
        msgElement.innerHTML="Input too small. Minimum size is " + minSize + ".";
        msgElement.style.display = "block";
        return(false);
    }

    var allowSpaces = element.getAttribute("allowSpaces");
    if ( allowSpaces == "N" ) {
        if ( inputValue.indexOf(' ') >= 0 ) {
            element.classList.add('error');
            msgElement.innerHTML="Spaces not allowed.";
            msgElement.style.display = "block";
            return(false);
        } 
    }

    var allowSpecialChars = element.getAttribute("allowSpecialChars");
    if ( allowSpecialChars == "N" ) {
        if(/^[a-zA-Z0-9- ]*$/.test(inputValue) == false) {
            element.classList.add('error');
            msgElement.innerHTML="Special characters not allowed.";
            msgElement.style.display = "block";
            return(false);
        } 
    }

    var allowDigits = element.getAttribute("allowDigits");
    if ( allowDigits == "N" ) {
        if( inputValue.match(/\d+/g) ) {
            element.classList.add('error');
            msgElement.innerHTML="Digits not allowed.";
            msgElement.style.display = "block";
            return(false);
        }
    }

    return(true);
}

function getInputText(itemName) { 
//    log("inputText.js: In getInputText. itemName = " +  itemName);
    return( document.getElementById(itemName).value ) ; 
}
