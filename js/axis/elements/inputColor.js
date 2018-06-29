function inputColor(itemName, hint, label, required, value) {

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

    currCode+='<div id="color_' + itemName + '" class="input-group colorpicker-component">';
    currCode+='    <input id="' + itemName + '" type="text" size="7" value="' + value + '" style="z-index:0" class="form-control" required="' + required + '"  />';
    currCode+='    <span class="input-group-addon"><i></i></span>';
    currCode+='</div>';

    currCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'color';

    postRenderFunctionsArray.push(
        function() { 
            $('#color_' + itemName).colorpicker( {color: '#' + value, format: 'hex' }); 
        }
    );

    return(currCode);
}

function isValidInputColor(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "Y" && inputValue == "" ) {
        element.classList.add('error');
        msgElement.innerHTML="Color required.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputColor(itemName) {
    return( document.getElementById(itemName).value ) ;
}
