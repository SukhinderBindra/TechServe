function inputDropdown(itemName, hint, label, data, valueField, descField, value) {

    var inputCode="";    

    inputCode+='<div class="form-group">';

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block"> ';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>&nbsp';
    }

    inputCode+='<label class="axis-label">' + label + '</label><br>';

    inputCode+='    <select axisType="dropdown" style="width:100%;" class="form-control selectpicker" id="' + itemName + '">';
    for ( var recCnt=0; recCnt< data.length; recCnt++ ) {
        var selected="";
        var currValue = data[recCnt][valueField];
        if ( currValue  == value ) {
            selected="selected";
        }
        
        inputCode+='         <option value="' + currValue + '" ' + selected + ' >' + data[recCnt][descField] + '</option>'

        if ( currValue == "undefined" )  {
            log("Value of " + label + " is undefined");
        }
    }
    inputCode+='    </select>';
    inputCode+='</div>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'dropdown';

    return(inputCode);

}

function getInputDropdown(itemName) { 
    var e = document.getElementById(itemName);
    var strUser = e.options[e.selectedIndex].value;

    return( strUser );
}
