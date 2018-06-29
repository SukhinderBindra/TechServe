function htmlStripe(itemID, label, dataFactory, paramName, email, key, image, name, description, paramName, amount) {

    var htmlCode="";
    var buttonColor=appRules.buttonColor;
    var buttonTextColor=appRules.buttonTextColor;
    var buttonMargin=" margin-left: 25px;";
    var icon="fa-credit-card";

    if ( amount <= 0 ) {
        return("");
    }

    htmlCode+='<div style="margin-top:5px;text-align:center;width:98%;">';
    htmlCode+='  <a href="#" style="width:98%; background: #' + buttonColor + ';" class="btn rounded" ' ;
    htmlCode+='    onclick="handleStripeCall(\'' + dataFactory + '\', \'' + 
                                                   paramName   + '\', \'' + 
                                                   email       + '\', \'' + 
                                                   key         + '\', \'' + 
                                                   image       + '\', \'' + 
                                                   name        + '\', \'' + 
                                                   description + '\', \'' + 
                                                   amount      + '\')">'; 

    htmlCode+='    <span style="vertical-align:middle;font-size:x-large;color:#' + buttonTextColor + '; ' + buttonMargin + ';" ';
    htmlCode+='          class="fa ' + icon + ' "> </span> &nbsp' ;
    htmlCode+='    <span class="" style="vertical-align:middle;font-size:large;color:#' + buttonTextColor + ';">' + label + '</span> ';
    htmlCode+='  </a>';
    htmlCode+='</div>';

    postRenderFunctionsArray.push(
        function() { 
            StripeInit();
        }
    );

    return(htmlCode);
}

function handleStripeCall(dataFactory, paramName, email, key, image, name, description, amount) {
   
   log("image=" + image  + ".");

    scrollTo(0,0);

    var cents = amount * 100 ;

    var handler = StripeCheckout.configure({ key: key,
                                             image: image,
                                             locale: 'auto',
                                             allowRememberMe: false,
                                             token: function(token) {
                                                        callStripeDataFactory(dataFactory, paramName, token.id);
                                           }});
    handler.open({ name        : name,
                   description : description,
                   zipCode     : true,
                   amount      : cents });
}

function callStripeDataFactory(dataFactory, paramName, stripeToken) {

    toast("Applying Payment");

    //------------------//
    // Set data bundle. //
    //------------------//
    var dataBundle = { };
    dataBundle[paramName] = stripeToken;
    updateScreenBundle(currScreenName, dataBundle);


    //-------------------//
    // Call dataFactory. //
    //-------------------//
    apiResult = getDataFactory(dataFactory, "Y", currScreenName);
    if ( ! apiResult ||  ! 'returnStatus' in apiResult || apiResult.returnStatus == "FAIL" ) {
        toast(apiResult.statusMessage);
        if ( apiResult.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
            buildMobileLoginScreen();
        }
        return;
    } 


    //--------------//
    // Show toast.  //
    //--------------//
    if ( "statusMessage" in apiResult && apiResult.statusMessage != "" ) {
        toast(apiResult.statusMessage);

        var parentID = appScreenStackGetParent();
        var screenDef = appRules.screens[currScreenName];
        if ( !screenDef ) { return; }
        var dataFactoryName = screenDef.dataFactory;
        
        htmlRefreshButtonHandle( currScreenName, dataFactoryName , parentID);
    }

}

function StripeInit() {
    var jsURL='https://checkout.stripe.com/checkout.js';
    spinnerStart();
    jQuery.ajax({
        url      : jsURL,
        dataType : 'script',
        success  : function (result) { StripeReady="Y"; },
        async    : false
    });
    spinnerStop();
}

