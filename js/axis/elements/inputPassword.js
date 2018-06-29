function inputPassword(itemName, hint, label, minSize, maxSize) {

    var currCode="";    


    if ( hint != "" ) {
        currCode+='<div class="axis-tooltip" style="display:inline-block">';
        currCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        currCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        currCode+='   </a>';
        currCode+='</div>&nbsp';
    }

    currCode+='<label class="axis-label" >' + label + '</label><br>';
    currCode+='    <input axisType="password" class="form-control" style="width:100%; margin:0;';
    currCode+='"';
    currCode+=' type="password" ' +
              ' minlength="' + minSize  + '" ' + 
              ' maxlength="' + maxSize  + '" ' + 
              ' name="'      + itemName + '" ' +
              ' value="'      + "" + '" ' +
              ' id="'        + itemName + '" />';

    currCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'password';

    return(currCode);

}

function isValidInputPassword(itemName) {
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

    return(true);
}

function getInputPassword(itemName) { 
    return( document.getElementById(itemName).value ) ; 
}
