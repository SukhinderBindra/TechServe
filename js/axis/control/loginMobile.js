function buildMobileLoginScreen() {

    // Step 1: Show the splash page.
    
    var imageField  = "image"
    var itemID      = "loginPage";
    var titleField  = "title";
    var descField   = "desc";
    var data        = appRules.loginSplashPage;
    var rounded         = "Y";
    var backgroundColor = appRules.backgroundColor;

    backgroundColor="";
    var screenCode="";

    screenCode+='<div style="max-height:75vh;margin-top:15px;margin-left:15px;margin-right:15px">';
    screenCode+=htmlImageCarousel(itemID, data, imageField, titleField, descField, rounded, backgroundColor) ;
    screenCode+='</div>';

    screenCode+="<br>";
    screenCode+='<div style="margin-top:5px;text-align:center;">';
    screenCode+='  <a href="#" style="width:80%; background: #' + appRules.buttonColor + ';" class="btn rounded" ' ;
    screenCode+='    onclick="showMobilePhoneNumberPage(); return(false);" >';
    screenCode+='    <span class="" style="vertical-align:middle;font-size:large;color:#' + appRules.buttonTextColor + ';">Sign Up</span> ';    
    screenCode+='  </a>';
    screenCode+='</div>';
    screenCode+="<br>";

    document.getElementById("mainDiv").innerHTML = screenCode;
}

var postRenderFunctionsArray=[];
var mobileLoginPhoneNumber="";
var mobileLoginServiceProvider="";
var customerId=0;

// Step 2: Get Phone Number and service provider name.
function showMobilePhoneNumberPage() {

    var centered  = "Y";
    var prefix    = "";
    var hint      = "";
    postRenderFunctionsArray=[];

    var screenCode="";


    // Label
    screenCode+='<br><br>';
    screenCode+=htmlLabel("subHeader", hint, "Enter Phone Number", centered, prefix) ;

    // Phone Number
    screenCode+='<div style="text-align:center;">';
    screenCode+=inputPhone("userPhone", hint, "",  "", "false", "", mobileLoginPhoneNumber) ;
    screenCode+='</div>';
    screenCode+='<br><br>';


    // Dropdown
    var valueField = "val";
    var descField  = "desc";
    var dropdownData =  [ 
                          { "val" : "Alltel"      , "desc": "Alltel Wireless"   }, 
                          { "val" : "ATT"         , "desc": "AT&T Wireless"     }, 
                          { "val" : "Boost"       , "desc": "Boost Mobile"      },
                          { "val" : "Cricket"     , "desc": "Cricket"           },
                          { "val" : "Metro"       , "desc": "Metro PCS"         },
                          { "val" : "Sprint"      , "desc": "Sprint"            },
                          { "val" : "Straight"    , "desc": "Straight Talk"     },
                          { "val" : "TMobile"     , "desc": "T-Mobile"          },
                          { "val" : "USCell"      , "desc": "U.S. Cellular"     },
                          { "val" : "Verizon"     , "desc": "Verizon"           },
                          { "val" : "Virgin"      , "desc": "Virgin Mobile"     } 
                        ];

    screenCode+='<div style="width:75%" class="centered">';
    screenCode+=inputDropdown("serviceProvider", "", "Service Provider", dropdownData, valueField, descField, mobileLoginServiceProvider) ;
    screenCode+='</div>';
    screenCode+='<br><br>';


    // Get PIN Button
    screenCode+="<br>";
    screenCode+="<br>";
    screenCode+="<br>";
    screenCode+="<br>";
    screenCode+='<div style="margin-top:5px;text-align:center;">';
    screenCode+='  <a href="#" style="width:80%; background: #' + appRules.buttonColor + ';" class="btn rounded" ' ;
    screenCode+='    onclick="mobilePhoneCreateAccount(); return(false);" >';
    screenCode+='    <span class="" style="vertical-align:middle;font-size:large;color:#' + appRules.buttonTextColor + ';">Next</span> ';
    screenCode+='  </a>';
    screenCode+='</div>';
    screenCode+="<br>";

    document.getElementById("mainDiv").innerHTML = screenCode;

    for ( var funcCnt=0; funcCnt< postRenderFunctionsArray.length; funcCnt++ ) {
        postRenderFunctionsArray[funcCnt]();
    }

    $('.selectpicker').selectpicker({
        style: 'btn-default',
        size: 'auto'
    });

}


// Step 3: Get Pin and authenticate.
function mobilePhoneCreateAccount() {

    mobileLoginPhoneNumber=getPhoneValue("userPhone");

    if ( mobileLoginPhoneNumber.length == 0 ) {
        toast("Phone number needed.");
        return;
    }

    if ( mobileLoginPhoneNumber.length != 10 ) {
        toast("Incomplete Phone number.");
        return;
    }

    mobileLoginServiceProvider = getInputDropdown("serviceProvider");

    var formData = new FormData();
    formData.append('phoneNumber',     mobileLoginPhoneNumber);
    formData.append('serviceProvider', mobileLoginServiceProvider);
    formData.append('AXIS_API', 'mobileUserAdd');
    formData.append('AXIS_API_KEY', appRules.axisAPIKey);

    spinnerStart();
    $.ajax({
        url  : appRules.apiEndPoint,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
                      spinnerStop();
                      if ( data.returnStatus == "FAIL" ) {
                          toast(data.statusMessage);
                      } else {
                          customerId = data.customerId; 
                          showMobileLoginPinPage();
                      }
                  },
        error :  function(data) {
                    spinnerStop();
                    toast("Network Error!");
                 }
    });
}


function showMobileLoginPinPage() {

    var centered  = "Y";
    var prefix    = "";
    var hint      = "";
    postRenderFunctionsArray=[];

    var screenCode="";


    // Label
    screenCode+='<br><br>';
    screenCode+=htmlLabel("subHeader", hint, "Enter Pin Number", centered, prefix) ;
    screenCode+='<br>';
    screenCode+=htmlLabel("body", hint, "You should receive a pin number via SMS soon.", centered, prefix) ;
    screenCode+='<br>';

    // Phone Number
    screenCode+='<div style="text-align:center;">';
    screenCode+=inputPin("userPin", hint, "",  4, "Y") ;
    screenCode+='</div>';
    screenCode+='<br><br>';


    // Get PIN Button
    screenCode+="<br>";
    screenCode+='<div class="row">';
    screenCode+='  <div class="col-xs-6">';
    screenCode+='    <div style="margin-top:5px;text-align:center;">';
    screenCode+='      <a href="#" style="width:80%; background: #' + appRules.buttonColor + ';" class="btn rounded" ' ;
    screenCode+='        onclick="showMobilePhoneNumberPage(); return(false);" >';
    screenCode+='        <span class="" style="vertical-align:middle;font-size:large;color:#' + appRules.buttonTextColor + ';">Back</span> ';
    screenCode+='      </a>';
    screenCode+='    </div>';
    screenCode+='  </div>';
    screenCode+='  <div class="col-xs-6">';
    screenCode+='    <div style="margin-top:5px;text-align:center;">';
    screenCode+='      <a href="#" style="width:80%; background: #' + appRules.buttonColor + ';" class="btn rounded" ' ;
    screenCode+='        onclick="validatePinAndShowApp(); return(false);" >';
    screenCode+='        <span class="" style="vertical-align:middle;font-size:large;color:#' + appRules.buttonTextColor + ';">Done</span> ';
    screenCode+='      </a>';
    screenCode+='    </div>';
    screenCode+='  </div>';
    screenCode+="<div>";

    document.getElementById("mainDiv").innerHTML = screenCode;

    for ( var funcCnt=0; funcCnt< postRenderFunctionsArray.length; funcCnt++ ) {
        postRenderFunctionsArray[funcCnt]();
    }
}

function validatePinAndShowApp() {

    var mobileValidationPin=getInputPin("userPin");

    if ( mobileValidationPin.length == 0 ) {
        toast("Pin needed.");
        return;
    }

    var formData = new FormData();
    formData.append('userPin',    mobileValidationPin);
    formData.append('customerId', customerId);
    formData.append('AXIS_API', 'mobilePinValidate');
    formData.append('AXIS_API_KEY', appRules.axisAPIKey);

    spinnerStart();
    $.ajax({
        url  : appRules.apiEndPoint,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
                      spinnerStop();
                      if ( data.returnStatus == "FAIL" ) {
                          toast(data.statusMessage);
                      } else {
                          tokenId = data.tokenId;

                          appRules.loginCredentials.tokenId    = data.tokenId;
                          appRules.loginCredentials.customerId = customerId;
                          window.localStorage.setItem("tokenId", tokenId);
                          window.localStorage.setItem("customerId", customerId);
                          loadApps();
                          window.scrollTo(0, 0);
                      }
                  },
        error :  function(data) {
                    spinnerStop();
                    toast("Network Error!");
                 }
    });
}

