function runDataFactory(dfName, screenName, callbackOnSuccess, callbackOnFailure, isMainPage) {

    var currDF     = appRules.dataFactory[dfName];

    if ( ! currDF ) {
        currDF = {};
        currDF =  { "url" : appRules.apiEndPoint,
                    "parameters" : { "AXIS_API_KEY" : { "type" : "static", "value": appRules.axisAPIKey},
                                     "AXIS_API"     : { "type" : "static", "value": dfName} },
                    "dataReady" : "N",
                    "data" : {} };
    } 

    var dfURL      = currDF.url;
    var dfParams   = currDF.parameters;
    var dfMethod   = currDF.method;

    if (! dfMethod ) dfMethod = "POST";

    if ( dfURL == "" ) {
        dataBundle=updateScreenBundle(screenName, currDF.data);
        callbackOnSuccess(isMainPage);
        return;
    }

    var ajaxParams = {};
    var dataBundle = {};

    switch (isMainPage) {

      case "N": dataBundle = setDataBundle(screenName);
                for (var key in dataBundle) {
                    var val = dataBundle[key];
                    if ( typeof val != "object" ) {
                        ajaxParams[key] = val;
                    }
                }
                // DO NOT BREAK HERE
      case "Y": dataBundle = currScreenBundle(screenName);
                break;

      default : 
                //-------------------------//
                // Called From save button //
                //-------------------------//
                dataBundle = getDivDataBundle("section_" + currAppName)
                for (var key in dataBundle) {
                    var val = dataBundle[key];
                    if ( typeof val != "object" ) {
                        ajaxParams[key] = val;
                    }
                }
                break;
    }

    for (var key in dfParams) {
        currParam = dfParams[key];
        if ( currParam.type == "static" ) {
            ajaxParams[key] = currParam.value;
        }
    }

    var loginCreds = appRules.loginCredentials;
    for (var key in loginCreds) {
        currParam = loginCreds[key];
        if ( typeof currParam != "object" ) {
            ajaxParams[key] = currParam;
        }
    }

    spinnerStart();
    $.ajax({ url: dfURL, method: dfMethod, data: ajaxParams })
    .done(function(apiResponse) {
        spinnerStop();
        if ( apiResponse.returnStatus &&  apiResponse.returnStatus == "FAIL" ) {
           if ( apiResponse.statusMessage ) {
               toast(apiResponse.statusMessage);
               if ( apiResponse.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                   buildMobileLoginScreen();
               }
           } else {
               toast("Operation failed!");
           }
           return;
        } else {
           if ( apiResponse.statusMessage && apiResponse.statusMessage != "" ) {
               toast(apiResponse.statusMessage);
           }
        }
        currDF.data = apiResponse;
        appData = apiResponse;
        currDF.dataReady = "Y";
        dataBundle=updateScreenBundle(screenName, apiResponse);
        callbackOnSuccess(isMainPage);
    })
    .fail(function(jqXHR,status,error) {
        spinnerStop();
        log("Network or System Error.");
    });
}


//-----------------------------------------------------//
// This function is run with async=false.              //
// It returns the data bundle to the calling function. //
//-----------------------------------------------------//
function getDataFactory(dfName, forceRerunInd, screenName) {

    var currDF     = appRules.dataFactory[dfName];

    if ( ! currDF ) {
        currDF = {};
        currDF =  { "url" : appRules.apiEndPoint,
                    "parameters" : { "AXIS_API_KEY" : { "type" : "static", "value": appRules.axisAPIKey},
                                     "AXIS_API"     : { "type" : "static", "value": dfName} },
                    "dataReady" : "N",
                    "data" : {} };
    }

    var dfURL      = currDF.url;
    var dfParams   = currDF.parameters;
    var dfMethod   = currDF.method;
    var ajaxParams = {}; 

    if (! dfMethod ) dfMethod = "POST";

    if ( forceRerunInd == "N" &&  currDF.dataReady == "Y" ) {
        log("Using existing data from the data factory.");
        return currDF.data;
    }

    var dataBundle = getDivDataBundle(screenName);
    for (var key in dataBundle) {
        var val = dataBundle[key];
        if ( typeof val != "object" ) {
            ajaxParams[key] = val;
        }
    }

    for (var key in dfParams) {
        currParam = dfParams[key];
        if ( currParam.type == "static" ) {
            ajaxParams[key] = currParam.value;
        }
    }

    var loginCreds = appRules.loginCredentials;
    for (var key in loginCreds) {
        currParam = loginCreds[key];
        ajaxParams[key] = currParam;
    }

    spinnerStart();
    $.ajax({ url: dfURL, 
             method: dfMethod, 
             data: ajaxParams, 
             async: false, 
             success: function(data) {
                          var returnStatus = data.returnStatus;
                          if ( typeof retunStatus != "undefined" && returnStatus == "FAIL" ) {
                              var statusMessage = data.statusMessage;
                              if ( typeof statusMessage != "undefined" && statusMessage != "" ) {
                                  log(statusMessage);
                                  if ( statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                                      buildMobileLoginScreen();
                                  }
                              }
                          } else {
                              if ( statusMessage in data ) {
                                  if ( data.statusMessage != "" ) {
                                      toast(data.statusMessage);
                                  }
                              }
                              currDF.data = data;
                              currDF.dataReady = "Y";
                              updateScreenBundle(currScreenName, data);
                          }
                      }  
    })
    .done(function(apiResponse) {
        spinnerStop();
        currDF.data = apiResponse;
        currDF.dataReady = "Y";
        return(apiResponse);
    })
    .fail(function(jqXHR,status,error) {
        spinnerStop();
        log("Network or System Error.");
    });

    return(currDF.data);
}
