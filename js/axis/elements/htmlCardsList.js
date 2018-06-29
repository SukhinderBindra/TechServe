function htmlCardsList(itemName, backgroundColor, borderColor, templateName, inputData, source, screenName, role, conditionDriver)  {

    if (typeof(inputData[source]) == 'undefined') {
        log("ERROR: " + source + " not found in input data:");
        log("    " + JSON.stringify(inputData));
        return("");
    }

    var inputCode="";    
    var chartData=inputData[source];
    var currTemplate = appRules.templates[templateName];
    if ( ! currTemplate ) {
       log("Error rendering cards list " + itemName);
       log("Invalid template :" + templateName);
       return;
    }

    var templateRows = currTemplate.rows;

    for ( var recCnt=0; recCnt<chartData.length; recCnt++ ) {

        var currDataRec=chartData[recCnt];

        inputCode+='<div class="row" id="' + itemName + '-' + recCnt + '"' ;
        inputCode+=' style="background-color:#' + backgroundColor + ';margin-top:7px;margin-right:0px;margin-left:0px;padding:7px;border: 1px solid #' + 
                     borderColor + 
                   ' ;transition: 0.3s;border-radius:5px;">';

        for (var templateRowCnt=0; templateRowCnt<templateRows.length; templateRowCnt++ ) {

            var templateRow=templateRows[templateRowCnt].cols;
            inputCode+='<div class="row">';

            for (var templateColCnt=0; templateColCnt<templateRow.length; templateColCnt++ ) {
                var currItem        = templateRow[templateColCnt];
                var itemID          = currItem.id; 
                var itemType        = currItem.type; 
                var itemWeight      = currItem.weight; 
                var itemValue       = currDataRec[itemID];

                if ( typeof itemValue == "undefined" ) {
                    itemValue=inputData[itemID];
                }

                inputCode+='<div class="col-xs-' + itemWeight + '" ';
                switch (itemType) {
                    case "label"   : var centered  = currItem.centered;
                                     var style     = currItem.style;
                                     var prefix    = currItem.prefix;

                                     if ( typeof prefix == "undefined" ||  prefix == "" ) {
                                         prefix = "";
                                     }

                                     if ( role == "conditional" ) {
                                         inputCode+='    onclick="htmlConditionalButtonHandle(\'' + screenName + '\', \'' + itemName + '-' + recCnt + '\', \'' + conditionDriver + '\')" ';
                                     } else {
                                         inputCode+='    onclick="htmlTransitionButtonHandle(\'' +  screenName + '\', \'' + itemName + '-' + recCnt + '\')" ';
                                     }
                                     inputCode+=" >"
                                     inputCode+=htmlLabel(style, "", itemValue, centered, prefix) ;
                                     inputCode+=htmlHidden(itemID + '-' + recCnt, itemValue) ;
                                     break;
                    case "like" :    var itemLabel = currItem.label;
                                     var centered  = currItem.centered;

                                     if (typeof centered  == "undefined" ) {
                                         centered="N";
                                     }

                                     inputCode+=inputLike(itemID + '-' + recCnt, "", itemLabel, itemValue, centered) ;
                                     break;
                    case "hidden"  : inputCode+=" >"
                                     inputCode+=htmlHidden(itemID + '-' + recCnt, itemValue) ;
                                     break;
                    case "divider" : var color     = currItem.color;
                                     inputCode+=" >"
                                     inputCode+=htmlDivider("", color) ;
                                     break;
                    case "image"   : var dataType  = currItem.dataType;
                                     var height    = currItem.height;
                                     var width     = currItem.width;
                                     var rounded   = currItem.rounded;
                                     if ( role == "conditional" ) {
                                         inputCode+='    onclick="htmlConditionalButtonHandle(\'' + screenName + '\', \'' + itemName + '-' + recCnt + '\', \'' + conditionDriver + '\')" ';
                                     } else {
                                         inputCode+='    onclick="htmlTransitionButtonHandle(\'' +  screenName + '\', \'' + itemName + '-' + recCnt + '\')" ';
                                     }
                                     inputCode+=" >"
                                     inputCode+=htmlImage(itemID + '-' + recCnt, "", "", height, width, rounded, itemValue) ;
                                     break;
                    case "button" :  var label           = currItem.label;
                                     var icon            = currItem.icon;
                                     var btnRole         = currItem.role;
                                     var badgeInd        = currItem.badgeInd;
                                     var wideButton      = currItem.wideButton;
                                     var addBackground   = currItem.addBackground;
                                     var btnScreenName   = currItem.screenName;
                                     var dataFactory     = currItem.dataFactory;
                                     var btnConditionDriver = currItem.conditionDriver;
                                     var url                = currItem.url;

                                     if ( ! btnRole ) {
                                         btnRole = "transition";
                                     }

                                     inputCode+=" >"
                                     inputCode+=htmlButton(itemID + '-' + recCnt, "", label, icon, wideButton, addBackground, badgeInd, 0, btnScreenName, itemName + '-' + recCnt, btnRole, dataFactory, btnConditionDriver, "N", url ) ;
                                     break;

                    case "toggleButton" :  
                                     var Yicon           = currItem.Yicon;
                                     var Ylabel          = currItem.Ylabel;
                                     var YBgColor        = currItem.YBgColor;
                                     var YTxtColor       = currItem.YTxtColor;
                                     var Nicon           = currItem.Nicon;
                                     var Nlabel          = currItem.Nlabel;
                                     var NBgColor        = currItem.NBgColor;
                                     var NTxtColor       = currItem.NTxtColor;
                                     var wideButton      = currItem.wideButton;
                                     var dataFactory     = currItem.dataFactory;


                                     inputCode+=" >"
                                     inputCode+=htmlToggleButton(itemID + '-' + recCnt, Yicon, Ylabel, YBgColor, YTxtColor, Nicon, Nlabel, NBgColor, NTxtColor, itemName + '-' + recCnt, itemValue, wideButton, dataFactory) ;
                                     break;

                    case "openMap" :
                                     var label       = currItem.label;
                                     var value       = currItem.value;
            
                                     if ( ! value ) {
                                         value = itemValue;
                                     }

                                     inputCode+=" >"
                                     inputCode+=htmlOpenMap(itemID, label, value);
                                     break;

                    case "openPhone" :
                                     var value  = currItem.value;

                                     if ( ! value ) {
                                         value = itemValue;
                                     }

                                     inputCode+=" >"
                                     inputCode+=htmlOpenPhone(itemID, value);
                                     break;

                    case "openEmail" :
                                     var value  = currItem.value;

                                     if ( ! value ) {
                                         value = itemValue;
                                     }

                                     inputCode+=" >"
                                     inputCode+=htmlOpenEmail(itemID, value);
                                     break;


                }
                inputCode+='</div>';
            }
            inputCode+='</div>';
        }
        inputCode+='</div>';
    }
    return(inputCode);
}

function cardClickMessage(itemName) {
    alert("You clicked on " + itemName);
}
