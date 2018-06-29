function inputEmail(itemName, hint, label, placeholder, required,  maxSize, uppercase, value) {

    var inputCode="";    
    var requiredStar="";
    if (required == "true" ) {
        requiredStar=" *";
    }

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block"> ';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>&nbsp';
    }

    inputCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';
    inputCode+='    <input axisType="email" class="form-control" style="width:100%;';
    if ( uppercase == "Y" ) { 
        inputCode+='text-transform:uppercase;';
    } 
    inputCode+='"';
    inputCode+=' type="text" '  +
                ' required="'    + required    + '"' + 
                ' maxlength="'   + maxSize     + '"' + 
                ' placeholder="' + placeholder + '"' +
                ' name="'        + itemName    + '"' +
                ' id="'          + itemName    + '"' +
                ' value="'       + value       + '"/>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'email';

    return(inputCode);

}

function isValidInputEmail(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var inputValue=document.getElementById(itemName).value;

    var required = element.getAttribute("required");

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "false" && inputValue == "" ) {
        return(true);
    }
  
    if ( ! isEmail(inputValue) ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid email address.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function isEmail(email) {      
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email); 
} 

function getInputEmail(itemName) { 
    return( document.getElementById(itemName).value ) ; 
}
