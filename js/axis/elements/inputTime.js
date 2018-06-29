function inputTime(itemName, hint, label, required, colWidth, value) {

    var inputCode="";    
    var backgroundColor = appRules.backgroundColor;

    var hoursLabel = "Hrs:";
    var minsLabel  = "Min:";

    if ( colWidth != 12 ) {
        hoursLabel = "";
        minsLabel  = ":";
    }

    var hVal="";
    var mVal="";
    var amPmVal="";

    if ( typeof value == "undefined" ) {
        value = "";
    }

    var valueParts1=value.split(" ");


    //----------------------//
    // Set Hour and Minutes //
    //----------------------//
    if ( valueParts1.length > 0 ) {
       var hoursMinsArr = valueParts1[0].split(":");
 
       if ( hoursMinsArr.length > 0 ) {
           hVal=hoursMinsArr[0];
       }

       if ( hoursMinsArr.length > 1 ) {
           mVal=hoursMinsArr[1];
       }
    } 

    //--------------//
    // Set  AM / PM //
    //--------------//
    if ( valueParts1.length > 1 ) {
        amPmVal=valueParts1[1];
    } else {
        amPmVal='AM';
    }
    if ( amPmVal != 'AM' && amPmVal != 'PM' ) {
        amPmVal='AM';
    }
   

    if ( hint != "" ) {
        inputCode+='<div class="axis-tooltip" style="display:inline-block">';
        inputCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        inputCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        inputCode+='   </a>';
        inputCode+='</div>&nbsp';
    }

    inputCode+='<label class="axis-label" >' + label + '</label><br>';

    inputCode+='  <div axisType="time" id="' + itemName + '" style="white-space: nowrap;">';
    inputCode+='     <span style="font-size: medium ">' + hoursLabel + '</span>';
    inputCode+='     <input axisType="time_hour" class="form-control" style="margin:0; max-width: 45px;text-align: center; display: inline-block;" type="number" min="0" max="12" id="' + itemName + '_hour" value="' + hVal + '">';

    inputCode+='     <span style="font-size:medium; margin:0; padding:0" >' + minsLabel + '</span>';
    inputCode+='     <input axisType="time_minutes" class="form-control" style="margin:0; max-width: 45px;text-align: center; display: inline-block;" type="number" min="0" max="59" id="' + itemName + '_minutes" value="' + mVal + '">';

    inputCode+='     <select axisType="time_AMPM" id="' + itemName + '_AMPM" style="font-weight: 400; -webkit-appearance: none; border: 0; background: #' + backgroundColor + ';  ">';


    if ( amPmVal == "AM" ) {
        inputCode+='       <option selected value="AM">AM</option>';
    } else {
        inputCode+='       <option          value="AM">AM</option>';
    }

    if ( amPmVal == "PM" ) {
        inputCode+='       <option selected value="PM">PM</option>';
    } else {
        inputCode+='       <option          value="PM">PM</option>';
    }

    inputCode+='     </select>';
    inputCode+='  </div>';

    inputCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName              ] = 'time';
    elementDataTypes[ itemName + '_hour'    ] = 'time_hour';
    elementDataTypes[ itemName + '_minutes' ] = 'time_minutes';

    return(inputCode);
}

function isValidInputHour(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName.replace("_hour", ""));
    var inputValue=document.getElementById(itemName).value;
  
    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( ! isTwoDigit(inputValue) ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid Hour.";
        msgElement.style.display = "block";
        return(false);
    }

    if ( inputValue > 12 || inputValue < 0 ) {
        element.classList.add('error');
        msgElement.innerHTML="Valid Values 0 - 12. ";
        msgElement.style.display = "block";
        return(false);
    } 

    return(true);
}

function isValidInputMinutes(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName.replace("_minutes", ""));
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( ! isTwoDigit(inputValue) ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid Minutes.";
        msgElement.style.display = "block";
        return(true);
    }

    if ( parseInt(inputValue,10) > 59 || parseInt(inputValue,10) < 0 ) {
        element.classList.add('error');
        msgElement.innerHTML="Invalid Minutes.";
        msgElement.style.display = "block";
        return(true);
    }

    return(true);
}

function isTwoDigit(str) {
  var twoDigits = /^\d{1,2}$/.test(str);
  return(twoDigits);
}

function getInputTime(itemName) { 
    var timeHours   = document.getElementById(itemName + "_hour").value;
    var timeMinutes = document.getElementById(itemName + "_minutes").value;

    var e = document.getElementById(itemName + "_AMPM");
    var timeAMPM = e.options[e.selectedIndex].value;

    var outputTime = timeHours + ':' + timeMinutes + ' ' + timeAMPM;

    return( outputTime );
}
