function inputDate(itemName, hint, label, required, value) {

    var currCode="";    
    var requiredStar="";
    if (required == "true" ) {
        requiredStar=" *";
    }


    if ( hint != "" ) {
        currCode+='<div class="axis-tooltip" style="display:inline-block">';
        currCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        currCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        currCode+='   </a>';
        currCode+='</div>&nbsp';
    }

    currCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';

    currCode+='<input axisType="date" class="form-control" '        +
              '  maxlength="10" '              +
              '  required="' + required + '" ' +
              '  readonly="true" '             +
              '  type="text" '                 +
              '  id="' + itemName + '"'        +
              '  value="' + value + '"'        +
              '  style="font-size: 100%; width: 100%; background-color:#FFF;" ' +
              '  onfocus="$(\'#' + itemName + '\' ).datepicker(\'show\');' + '">';


    currCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'date';

    postRenderFunctionsArray.push(
        function() { 
            $('#' + itemName).datepicker(); 
        }
    );

    return(currCode);
}

function isValidInputDate(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "Y" && inputValue == "" ) {
        element.classList.add('error');
        msgElement.innerHTML="Date required.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputDate(itemName) {
    return( document.getElementById(itemName).value ) ;
}
