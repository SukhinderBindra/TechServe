function inputPin(itemID, hint, label, pinSize, centered) {

    var currCode="";    

    if ( centered == "Y" ) {
        currCode+='<div style="text-align:center" >';
    }

    if ( hint != "" ) {
        currCode+='<div class="axis-tooltip" style="display:inline-block">';
        currCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        currCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        currCode+='   </a>';
        currCode+='</div>&nbsp';
    }

    currCode+='<label class="axis-label" >' + label + '</label><br>';

    currCode+='<form action="" class="form-pin" >';

    if ( pinSize >= 1 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-01" name="' + itemID + '-01" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 2 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-02" name="' + itemID + '-02" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 3 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-03" name="' + itemID + '-03" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 4 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-04" name="' + itemID + '-04" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 5 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-05" name="' + itemID + '-05" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 6 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-06" name="' + itemID + '-06" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 7 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-07" name="' + itemID + '-07" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 8 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-08" name="' + itemID + '-08" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 9 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-09" name="' + itemID + '-09" class="input-pin" pattern="\d*" />';
    }
    if ( pinSize >= 10 ) {
        currCode+='  <input type="number" max="9" maxlength="2" size="2" id="' + itemID + '-10" name="' + itemID + '-10" class="input-pin" pattern="\d*" />';
    }

    currCode+='</form>';

    currCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';

    if ( centered == "Y" ) {
        currCode+='</div>';
    }

    elementDataTypes[ itemID ] = 'pin';


    postRenderFunctionsArray.push(
        function() {
            $(document).ready(function() {
                $("input[name^=" + itemID + "]").keyup(function(e) {
                    if($(this).val().length == 1) {
                        $(this).attr('type', 'password');
                        var input_fields = $(this).closest('form').find('input[name^=' + itemID + ']');
                        input_fields.eq(input_fields.index(this) + 1).focus();
                    }
                    if (e.keyCode==8 && e.currentTarget.name !== '' + itemID + '-01') {
                        $(this).attr('type', 'number');
                        var input_fields = $(this).closest('form').find('input[name^=' + itemID + ']');
                        input_fields.eq( input_fields.index(this) - 1 ).attr('type', 'number').focus();
                    }
                });
            });
        }
    );



    return(currCode);

}

function isValidInputPin(itemID) {
    return(true);
}

function getInputPin(itemID) { 
    var val1  = document.getElementById(itemID + '-01');
    var val2  = document.getElementById(itemID + '-02');
    var val3  = document.getElementById(itemID + '-03');
    var val4  = document.getElementById(itemID + '-04');
    var val5  = document.getElementById(itemID + '-05');
    var val6  = document.getElementById(itemID + '-06');
    var val7  = document.getElementById(itemID + '-07');
    var val8  = document.getElementById(itemID + '-08');
    var val9  = document.getElementById(itemID + '-09');
    var val10 = document.getElementById(itemID + '-10');

    var val1Str  = "";
    var val2Str  = "";
    var val3Str  = "";
    var val4Str  = "";
    var val5Str  = "";
    var val6Str  = "";
    var val7Str  = "";
    var val8Str  = "";
    var val9Str  = "";
    var val10Str = "";

    if ( val1  ) val1Str   = val1.value;
    if ( val2  ) val2Str   = val2.value;
    if ( val3  ) val3Str   = val3.value;
    if ( val4  ) val4Str   = val4.value;
    if ( val5  ) val5Str   = val5.value;
    if ( val6  ) val6Str   = val6.value;
    if ( val7  ) val7Str   = val7.value;
    if ( val8  ) val8Str   = val8.value;
    if ( val9  ) val9Str   = val9.value;
    if ( val10 ) val10Str  = val10.value;


    return( val1Str + val2Str + val3Str + val4Str + val5Str + val6Str + val7Str + val8Str + val9Str + val10Str ) ; 
}
