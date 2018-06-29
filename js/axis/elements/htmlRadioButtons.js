function inputRadioButton(itemName, hint, label, required, data, valueField, descField, numCols, value) {

    var inputCode   = "";    
    var bsCols      = "";

    switch (numCols) {
        case "1"  : bsCols = "col-xs-12";
                    break;
        case "2"  : bsCols = "col-xs-6";
                    break;
        case "3"  : bsCols = "col-xs-4";
                    break;
        case "4"  : bsCols = "col-xs-3";
                    break;
        case "6"  : bsCols = "col-xs-2";
                    break;
        default   : bsCols = "col-xs-1";
                    break;
    }

    inputCode+='<fieldset id="' + itemName+ '" ' +  
               '  required="' + required + '" ' +
               '  style="padding:5px; border:1px solid #333;" >';

    inputCode+='<legend style="color:#' + appRules.borderColor + ';margin-bottom: 0px; border-bottom:0px; width:inherit; font-size:14px ">';
    if ( hint != "" ) {
        inputCode+='&nbsp<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>';
    }
    inputCode+='&nbsp<h4 style="display:inline-block" >' + label + '</h4>&nbsp';
    inputCode+='</legend>';

    inputCode+='<div class="row">';

    for ( var recCnt=0; recCnt< data.length; recCnt++ ) {

        inputCode+='<div class="' + bsCols + '">'; 
        inputCode+='  <label  class="axis-label" style="margin-left: 10px;">';
        inputCode+='    <input type="radio" axisType="radio" ' +
                   '       style="padding-bottom: 10px; margin-left: 10px; margin-bottom:10px;" id="axis_message_' + itemName + '_' + recCnt + '" name="' + itemName + '" ' +
                   '       value="' + data[recCnt][valueField] + '"> &nbsp ' +
                   '    <label for="axis_message_' + itemName + '_' + recCnt + '" class="axis-label">' + data[recCnt][descField] + '</label>' ;
        inputCode+='  </label><br>';
        inputCode+='</div>'; 

    }
    inputCode+='</div>';

    inputCode+='</fieldset>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'radio';

    return(inputCode);

}


function isValidInputRadio(itemName) {

    var element = document.getElementById(itemName);

    if ( ! element.getAttribute("required") ) {
        return(true);
    }

    var msgElement = document.getElementById('axis_message_' + itemName);
    var inputValue=getInputRadio(itemName);

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( inputValue.length == 0 ) {
        element.classList.add('error');
        msgElement.innerHTML="Please select one.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}


function getInputRadio(itemName) { 

    var radios = document.getElementsByName(itemName);

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          return(radios[i].value);
          break;
        }
    }

    return("");
}
