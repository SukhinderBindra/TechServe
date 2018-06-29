var typingTimer;                //timer identifier
var doneTypingInterval = 500;   //time in ms (0.5 seconds)


function inputAutocomplete(itemID, hint, label, placeholder, required, uppercase, value, baseURL, dataFactory, paramName, source, sourceElement, sourceKey) {

    var inputCode="";    
    var requiredStar="";
    if (required == "Y" ) {
        requiredStar=" *";
        required=" required ";
        
    }

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div> &nbsp';
    }

    inputCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"> &nbsp' + requiredStar + '</label><br>';
    inputCode+='    <input axisType="autocomplete" class="form-control" style="width:100%;';
    if ( uppercase == "Y" ) {
        inputCode+='text-transform:uppercase;';
    } 

    inputCode+='"';
    inputCode+=' type="text" '   +
                ' required="'    + required    + '" ' +  
                ' placeholder="' + placeholder + '" ' +
                ' name="'        + itemID      + '" ' +
                ' id="'          + itemID      + '" ' +
                ' value="'       + value       + '" />';
    inputCode+='<div id="' + itemID + '-suggesstion-box"></div>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemID + '"></span>';

    if ( typeof baseURL == "undefined" || baseURL == "" ) {
        baseURL = appRules.apiEndPoint;
    }

    postRenderFunctionsArray.push(
        function() {
            $("#" + itemID).keyup(function(){
                clearTimeout(typingTimer);
                if ($("#" + itemID).val()) {
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                }
            });


           function doneTyping() {

               var params = {};

               var loginCreds = appRules.loginCredentials;
               for (var key in loginCreds) {
                   currParam = loginCreds[key];
                   if ( typeof currParam != "object" ) {
                       params[key] = currParam;
                   }
               }

               params["AXIS_API_KEY"] = appRules.axisAPIKey;
               params["AXIS_API"] = dataFactory;
               params[paramName]  = $("#" + itemID ).val();

               $.ajax({
                        type   : "POST",
                        url    : baseURL,
                        data   : params,
                        success: function(data) {
                            $("#" + itemID + "-suggesstion-box").show();
    
                            responseArr    = data[source];
                            responseLength = responseArr.length;

                            if ( responseLength == 0 ) {
                                $("#" + itemID ).css("background","#F00");
                                return;
                            }

                            if ( responseLength == 1 && responseArr[0][sourceElement].toUpperCase() == $("#" + itemID ).val().toUpperCase() ) {
                                var currData=responseArr[0][sourceElement];
                                setAutoCompleteValue(itemID, currData);
                                $("#" + itemID ).css("background","#FFF");
                            } else {
                                htmlData='<ul style="float:left; list-style:none; margin:0; padding:0; width:190px">';
                                for ( var Count=0; Count<responseLength; Count++ ) {
                                    var currData=responseArr[Count][sourceElement];
                                    var currKey=responseArr[Count][sourceKey];
                                    htmlData+='<li style="padding:10px; background:#FAFAFA; border-bottom:#F0F0F0 1px solid;" onClick="setAutoCompleteValue(\'' + itemID + '\' , \'' + currData + '\', \'' + sourceKey + '\' , \'' + currKey + '\')">';
                                    htmlData+=currData;
                                    htmlData+="</li>";
                                }
                                htmlData+="</ul>";
    
                                $("#" + itemID + "-suggesstion-box").html(htmlData);
                                $("#" + itemID ).css("background","#FFF");
                            }
                        }
                    });
            }
        });

    elementDataTypes[ itemID ] = 'autocomplete';

    return(inputCode);

}

function isValidInputAutocomplate(itemID) {
    var element = document.getElementById(itemID);
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemID).value;
    var msgElement = document.getElementById('axis_message_' + itemID);

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "Y" && inputValue.length == 0 ) {
        element.classList.add('error');
        msgElement.innerHTML="Required field.";
        msgElement.style.display = "block";
        return(false);
    }

    var isValid = element.getAttribute("isValid");
    if ( typeof isValid != 'undefiled' && isValid == "N" ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid field.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputAutocomplate(itemID) { 
    return( document.getElementById(itemID).value ) ; 
}

function setAutoCompleteValue(itemID, val, keyName, keyVal) {
    $("#" + itemID).val(val);
 
    var param = { };
    param[keyName] = keyVal;
    updateScreenBundle(currScreenName, param);

    $("#" + itemID ).css("background","#FFF");
    $("#" + itemID + "-suggesstion-box").hide();
}


