function htmlButton(itemID, hint, label, icon, fullWidth, addBackground, badgeInd, badgeCnt, screenName, parentID, buttonRole, dataFactory, conditionDriver, isMenuButton, url ) {


    var htmlCode="";    
    var buttonWidth="";
    var buttonMargin="";
    var buttonColor=appRules.buttonColor;
    var buttonTextColor=appRules.buttonTextColor;

    if ( isMobile == "Y" && buttonRole == "detail" ) {
        return "";
    }

    if ( fullWidth == "Y" ) {
        buttonWidth=" width:98%; ";
        buttonMargin=" margin-left: 25px;";
    }

    if ( addBackground == "N" ) {
        buttonTextColor=buttonColor;
    } 

    if ( isMenuButton == "Y" ) {
        buttonColor=appRules.headerTextColor;
        buttonTextColor=appRules.headerTextColor;
    }

    if ( hint != "" ) {
        htmlCode+='<div class="axis-tooltip" style="display:inline-block"> ';
        htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        htmlCode+='   </a>';
        htmlCode+='</div>&nbsp';
    }

    if ( addBackground == "Y" ) {
        htmlCode+='<div style="margin-top:5px;text-align:center;' + buttonWidth + '">';
        htmlCode+='  <a href="#" style="' + buttonWidth + ' background: #' + buttonColor + ';" class="btn rounded" ' ;
    } else {
        var topMargin = " margin-top:5px; ";
        var topMargin = " ";
        htmlCode+='<div style="' + topMargin + ' text-align:center;' + buttonWidth + '">';
        htmlCode+='  <a href="#" style="' + buttonWidth + '" class="rounded" ' ;
    }

    switch ( buttonRole ) {
        case "conditional": 
                htmlCode+='    onclick="htmlConditionalButtonHandle(\'' + screenName + '\', \'' + parentID + '\', \'' + conditionDriver + '\' ); return(false);" >';
                break;
        case "transition" : 
                htmlCode+='    onclick="htmlTransitionButtonHandle(\'' + screenName + '\', \'' + parentID + '\'); return(false);" >';
                break;
        case "save"       : 
                htmlCode+='    onclick="htmlSaveButtonHandle(\'' + screenName + '\'); return(false);" >';
                break;
        case "back"       : 
                htmlCode+='    onclick="htmlBackButtonHandle(); return(false);" >';
                break;
        case "refresh"    : 
                htmlCode+='    onclick="htmlRefreshButtonHandle(\'' + currScreenName + '\', \'' + dataFactory + '\', \'' + parentID + '\'); return(false);" >';
                break;
        case "detail"    : 
                // Show content in the right side of the Desktop view //
                htmlCode+='    onclick="htmlShowDetails(\'' + url + '\',\'' + parentID + '\'); return(false);" >';
                break;
        default          : 
                log("Invalid button role. " + buttonRole);
    }

    htmlCode+='    <span style="vertical-align:middle;font-size:x-large;color:#' + buttonTextColor + '; ' + buttonMargin + ';" class="fa ' + icon + ' XXpull-left"> </span> &nbsp' + 
              '    <span class="" style="vertical-align:middle;font-size:large;color:#' + buttonTextColor + ';">' + label + '</span> ';

    if ( badgeInd == "Y" && badgeCnt > 0 ) {
        htmlCode+='    <span class="badge" style="position:absolute; color:#' + buttonColor + ';background:#' + buttonTextColor + '">' + badgeCnt + '</span>';
    }
    htmlCode+='  </a>';
    htmlCode+='</div>';

    return(htmlCode);

}

function htmlShowDetails(url, parentID) {
    var dataBundle = getDivDataBundle(parentID);

    for (key in dataBundle) {
       var val=dataBundle[key];
       if ( typeof val != "object" ) {
         url=url.replace('<?' + key + '>', val);
       }
    }

    $('#rightFrame').attr("src", url);
}

function htmlConditionalButtonHandle(screenName, parentID, conditionDriver) {
    var dataBundle = getDivDataBundle(parentID);
    var newScrName = dataBundle[conditionDriver];
    if ( ! newScrName ) {
        log("Error. Conditional Button failed. " +  screenName + " was not found in the data.");
        return;
    } else {
        log("Transitioning to " +  newScrName );
    }
    updateScreenBundle(newScrName, dataBundle);
    getDataAndRenderScreen(currAppName, newScrName, 'N');
}

function htmlTransitionButtonHandle(screenName, parentID) {
    var isMainPage = 'N';
    var dataBundle = getDivDataBundle(parentID);
    updateScreenBundle(screenName, dataBundle);

    //----------------------------------------------------------------------------------------------------------------
    // Special Case: screenName is already in the screen Stack. User is basically requesting to go back a few screens.
    //----------------------------------------------------------------------------------------------------------------
    if (appScreenStackExists(screenName)) {
        appScreenStackPop(screenName);
        isMainPage = appScreenStackIsMainPage(screenName);
    }

    getDataAndRenderScreen(currAppName, screenName, isMainPage);
}


function htmlBreadcrumbTransition(screenName) {
    htmlTransitionButtonHandle(screenName, currScreenName);
    $('#breadcrumbsModal').modal('hide');
}


function htmlBackButtonHandle() {
    var parentName = appScreenStackPopParent();
    var isMainPage  = appScreenStackIsMainPage( parentName );
    getDataAndRenderScreen(currAppName, parentName, isMainPage);
}


function htmlSaveButtonHandle(screenName) {
 
    if ( ! isValidateCurrentScreen() )  {
        toast("Invalid input.");
        return;
    }

    setDataBundle(currScreenName);

    var dataFactory = appRules.screens[currScreenName].menuButton.dataFactory;

    //Step: Run the Data Factory for the current page.
    var apiResult = getDataFactory(dataFactory, "Y", currAppName + "_" + currScreenName);

    if ( ! apiResult ||  ! 'returnStatus' in apiResult || apiResult.returnStatus == "FAIL" ) {
        toast(apiResult.statusMessage);
        if ( apiResult.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
            buildMobileLoginScreen();
        }
        return;
    } else {
        toast("Data Saved.");
    }

    if ( ! screenName ) {
       screenName=appScreenStackGetParent(); 
    }


    // If current screen is the main page, no need to go to transition.
    var isMainPage  = appScreenStackIsMainPage( currScreenName );
    if ( isMainPage == "Y" ) {
        log("Saved main page - " + screenName);
        return;
    }


    // Step: Runt the Data Factory of the target Screen
    var dataFactoryName = appRules.screens[screenName].dataFactory;

    if ( dataFactoryName ) {

        apiResult = getDataFactory(dataFactoryName, "Y", currAppName + "_" + screenName);
  
        if ( ! apiResult ||  ! 'returnStatus' in apiResult || apiResult.returnStatus == "FAIL" ) {
            toast(apiResult.statusMessage);
            if ( apiResult.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                buildMobileLoginScreen();
            }
            return;
        }

        updateScreenBundle(screenName, apiResult);

    }

    // Step: Render the target Screen
    requestedSectionName=currAppName;
    requestedScreenName=screenName;
    isMainPage  = appScreenStackIsMainPage( screenName );

    renderScreen(isMainPage);
}

function htmlRefreshButtonHandle(screenName, dataFactory, parentID) {

    var dataBundle = getDivDataBundle(parentID);
    updateScreenBundle(screenName, dataBundle);

    //---------------------------------------//
    // Step: Run the requested data factory. //
    //---------------------------------------//
    var apiResult = getDataFactory(dataFactory, "Y", parentID);

    if ( ! apiResult ||  ! 'returnStatus' in apiResult || apiResult.returnStatus == "FAIL" ) {
        toast(apiResult.statusMessage);
        if ( apiResult.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
            buildMobileLoginScreen();
        }
        return;
    }

    var dataFactoryName = appRules.screens[currScreenName].dataFactory;

    if ( dataFactoryName ) {

        apiResult = getDataFactory(dataFactoryName, "Y", parentID);

        if ( ! apiResult ||  ! 'returnStatus' in apiResult || apiResult.returnStatus == "FAIL" ) {
            toast(apiResult.statusMessage);
            if ( apiResult.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                buildMobileLoginScreen();
            }
            return;
        }
    }

    requestedSectionName=currAppName;
    requestedScreenName=currScreenName;

    var isMainPage  = appScreenStackParentIsMainPage();

    renderScreen(isMainPage);
}

function htmlRefreshPage() {

}

function htmlButtonOperationSuccess() {
    htmlBackButtonHandle();
}

function htmlButtonOperationFailed() {
    toast("Operation Failed!");
}
