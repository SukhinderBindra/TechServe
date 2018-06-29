function inputPhone(itemID, hint, label, placeholder, required,  maxSize, value) {

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

    var valuePart1 = value.substr(0,3);
    var valuePart2 = value.substr(3,3);
    var valuePart3 = value.substr(6,4);


    inputCode+='<form id="' + itemID + '" action="" class="form-phone" >';
    inputCode+='  ( ';
    inputCode+='    <input type="number" max="999"  value="' + valuePart1 + '" maxlength="3" size="3" id="' + itemID + '-01" name="' + itemID + '-01" class="form-control input-phone" style="display:inline-block;width:2.53em; padding:3px 3px;" pattern="\d*" required="' + required + '" />';
    inputCode+='  ) ';
    inputCode+='    <input type="number" max="999"  value="' + valuePart2 + '" maxlength="3" size="3" id="' + itemID + '-02" name="' + itemID + '-02" class="form-control input-phone" style="display:inline-block;width:2.53em; padding:3px 3px;" pattern="\d*" required="' + required + '" />';
    inputCode+='  - <input type="number" max="9999" value="' + valuePart3 + '" maxlength="4" size="4" id="' + itemID + '-03" name="' + itemID + '-03" class="form-control input-phone" style="display:inline-block;width:4.53em; padding:3px 3px;" pattern="\d*" required="' + required + '" />';
    inputCode+='</form>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';

    postRenderFunctionsArray.push(
        function() {
            $(document).ready(function() {
                $("input[name^=" + itemID + "-01]").keyup(function(e) {
                    if($(this).val().length == 3) {
                        var input_fields = $(this).closest('form').find('input[name^=' + itemID + ']');
                        input_fields.eq(input_fields.index(this) + 1).focus();
                    }
                });

                $("input[name^=" + itemID + "-02]").keyup(function(e) {
                    if($(this).val().length == 3) {
                        var input_fields = $(this).closest('form').find('input[name^=' + itemID + ']');
                        input_fields.eq(input_fields.index(this) + 1).focus();
                    }
                });

                $("input[name^=" + itemID + "-03]").keyup(function(e) {
                    if($(this).val().length == 3) {
                        var input_fields = $(this).closest('form').find('input[name^=' + itemID + ']');
                        input_fields.eq(input_fields.index(this) + 1).focus();
                    }
                });

            });
        }
    );

    elementDataTypes[ itemID ] = 'phone';

    return(inputCode);

}

function isValidInputPhone(itemID) {
    var element = document.getElementById(itemID + "-01");
    var msgElement = document.getElementById('axis_message_' + itemID);
    var inputValue=getInputPhone(itemID);
    var required = element.getAttribute("required");
  
    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "false" && inputValue == "" ) {
        return(true);
    }

    if ( inputValue.length != 10 ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid phone number.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputPhone(itemID) { 
    return( getPhoneValue(itemID) );
}

function getPhoneValue(itemID) {
    var val1  = document.getElementById(itemID + '-01');
    var val2  = document.getElementById(itemID + '-02');
    var val3  = document.getElementById(itemID + '-03');

    var val1Str  = "";
    var val2Str  = "";
    var val3Str  = "";

    if ( val1  ) val1Str   = val1.value;
    if ( val2  ) val2Str   = val2.value;
    if ( val3  ) val3Str   = val3.value;

    return( val1Str + val2Str + val3Str ) ;
}
