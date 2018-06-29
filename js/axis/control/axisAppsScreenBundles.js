//This file contains logic for screen stack (Transistion from one screen to other).  // The Screen Stack Trace allows the "Back" button to work.
//     var stack=[];
//     stack.push("Bobby");
//     stack.push("Varsha");
//     stack.push("Karan");
//     stack.pop();
//     "Karan"


var appDataBundles={ 
                   };


function currScreenBundle(screenName) {
    var  dataBundle;

    if ( typeof appDataBundles[currAppName] == "undefined" ) {
        appDataBundles[currAppName] = {};
    }

    if ( typeof appDataBundles[currAppName][screenName] == "undefined" ) {
         appDataBundles[currAppName][screenName] = { };
    }

    dataBundle = appDataBundles[currAppName][screenName]

    return(dataBundle);
}


function updateScreenBundle(screenName, dataBundle) {

    currScreenBundle(screenName);

    for (var key in dataBundle) {
        var val = dataBundle[key];
        appDataBundles[currAppName][screenName][key] = val;
    }
}


function setDataBundle(screenName) {

    //----------------------------------------------------------------------------------------//
    // Step: Add elements in the current screens input data bundle to the output data bundle. //
    //----------------------------------------------------------------------------------------//
    var dataBundle = currScreenBundle(screenName);

    //----------------------------------------------------------------------------
    // Step: Find all elements in the current Screen and add them the data bundle.
    //----------------------------------------------------------------------------
    var allRows = appRules.screens[screenName].rows;

    for (var rowCnt=0; rowCnt<allRows.length; rowCnt++ ) {
        var currRow = allRows[rowCnt];
        var allCols = currRow["cols"];
        for (var colCnt=0; colCnt<allCols.length; colCnt++) {
            var currItem = allCols[colCnt];
            var currID   = currItem["id"];


            if ( document.getElementById(currID) != null ) {
                var currValue = getValueOf(currID);

                if ( currValue != "" ) {
                    dataBundle[currID] = currValue;
                }
            }
        }
    }

    appDataBundles[currAppName][screenName] = dataBundle;
    return(dataBundle);    
}

function getDivDataBundle(parentID) {

    var dataBundle = {};

    if ( parentID != "undefined" && parentID != "" ) { 
        var currParentElement = document.getElementById(parentID); 
        if ( currParentElement ) {

            var elements = currParentElement.getElementsByTagName("*");

            for (var i = 0; i < elements.length; i++) {
                var itemID  = elements[i].id;

                if ( itemID != ""  && ! itemID.startsWith("axis_message_") && itemID != 'footer_' + currAppName && itemID != 'screen_' + currAppName ) {
                    var itemVal = getValueOf(itemID);
                    itemID=itemID.split("-")[0]; 
                    if ( ! (itemID in dataBundle)  ) { // Avoid messing up multipart inputs like Phone and Time.
                        dataBundle[itemID] = itemVal;
                    }
                }
            }
        }
    }


    var currDataBundle = currScreenBundle(currScreenName);

    for (var key in currDataBundle) {
        var val = currDataBundle[key];
        if ( typeof val != "object" && ! (key in dataBundle)  ) { // added the second part because refresh button from list was not working. - 19 Mar 2017
            dataBundle[key] = val;
        }
    }

    return(dataBundle);
}
