var axisCropCounter=0;

function htmlImageUpload( itemID, hint, label, crop, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory ) {

    var buttonColor     = appRules.buttonColor;
    var buttonTextColor = appRules.buttonTextColor;
    var borderColor     = appRules.borderColor;
    var htmlCode="";

    htmlCode+='  <div style="text-align:center;" id="' + currAppName + '_UploadStep_1'  + '" >'; 
    htmlCode+='    <label for="' + currAppName + '_fileSelect" class="custom-file-upload rounded" ';
    htmlCode+='           style="border: 1px solid #' + buttonColor  + '; background-color:#' + buttonColor + '" >';
    htmlCode+='      <i class="fa fa-picture-o" style="color:#' + buttonTextColor + '"></i>  ';
    htmlCode+='      <span style="color:#' + buttonTextColor + '"> &nbsp Choose Image</span> ';
    htmlCode+='    </label>';
    htmlCode+='    <input type="file" id="' + currAppName + '_fileSelect" onchange="htmlImageUploadHandleStep1(  \'' + itemID + '\' , \'' + crop + '\', ' + minWidth + ', ' + minHeight + ', ' + maxWidth + ', ' + maxHeight + ', ' + aspectRatio + ', \'' + dataFactory + '\' );"/>';
    htmlCode+='  </div><br>'; 
 
    elementDataTypes[ itemID ] = 'imageUpload';

    return(htmlCode);
}


//--------------------//
// -- Upload Image -- //
//--------------------//
function htmlImageUploadHandleStep1( itemID, crop, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory ) {
  
    var fileSelect = document.getElementById(currAppName + '_fileSelect');  
    var formData = new FormData();
    formData.append('file', fileSelect.files[0]);

    formData.append('customerId', appRules.loginCredentials["customerId"]);
    formData.append('tokenId', appRules.loginCredentials["tokenId"]);
    formData.append('AXIS_API', 'PhotoUpload');
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
                          if ( data.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                              buildMobileLoginScreen();
                          }
                      } else {
                          imageURL = data.imageUrl;
                          if ( crop == "Y" ) {
                              showCropper(imageURL, itemID, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory );
                          } else {
                              runUploadDataFactory(itemID, dataFactory, imageURL);
                          }
                      }
                  },
        error :  function(data) {
                    spinnerStop();
                    toast("Network Error!");
                 }
    });
}

function showCropper(imageURL, itemID, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory ) {
    
    var buttonColor     = appRules.buttonColor;
    var buttonTextColor = appRules.buttonTextColor;
    var borderColor     = appRules.borderColor;
    var htmlCode="";

    axisCropCounter+=1;


    htmlCode+='    <div id="' + currAppName + '_formContainer" style="text-align:center;">';
    htmlCode+='        <input type="hidden" id="x' + '_Crop_' + currAppName + '" >';
    htmlCode+='        <input type="hidden" id="y' + '_Crop_' + currAppName + '" >';
    htmlCode+='        <input type="hidden" id="w' + '_Crop_' + currAppName + '" >';
    htmlCode+='        <input type="hidden" id="h' + '_Crop_' + currAppName + '" >';
    htmlCode+='        <br>';
    htmlCode+='        <label for="' + currAppName + '_fileSelect" class="custom-file-upload rounded" onclick="cropImage_' + currAppName + '();"';
    htmlCode+='               style="border: 1px solid #' + buttonColor  + '; background-color:#' + buttonColor + '; text-align:center;" >';
    htmlCode+='            <i class="fa fa-crop" style="color:#' + buttonTextColor + '"></i> <span style="color:#' + buttonTextColor + '">&nbsp Crop Image &nbsp</span>';
    htmlCode+='        </label>';
    htmlCode+='    </div>';

    htmlCode+='    <img onload="setJcrop_' + currAppName + '(' + axisCropCounter + ');" src="' + imageURL + '" id="' + currAppName + '_UploadImage_' + axisCropCounter + '" alt="Upload Image" class="img-fluid" />';

    htmlCode+='  <script>';


    //---------------------------------------------------
    //  http://deepliquid.com/content/Jcrop_Manual.html
    //---------------------------------------------------
    htmlCode+='    function setJcrop_' + currAppName + '(cropCounter) {                  ';
    htmlCode+='                                                                          ';
    htmlCode+='      JcropAPI = $("#" + currAppName + "_UploadImage_" + cropCounter).data("Jcrop");     ';
    htmlCode+='      if (JcropAPI) {                                                     ';
    htmlCode+='          JcropAPI.destroy();                                             ';
    htmlCode+='          $("#" + currAppName + "_UploadImage_" + cropCounter).removeAttr("style");      ';
    htmlCode+='      }                                                  ';
    htmlCode+='                                                         ';
    htmlCode+='      $("#" + currAppName + "_UploadImage_" + cropCounter).Jcrop({    ';
    htmlCode+='          onChange    : updateSize_' + currAppName + ',  ';
    htmlCode+='          onSelect    : updateSize_' + currAppName + ',  ';
    htmlCode+='          minSize     : [ ' + minWidth + ', ' + minHeight + ' ],        ';
    htmlCode+='          maxSize     : [ ' + maxWidth + ', ' + maxHeight + ' ],        ';
    htmlCode+='          setSelect   : [ 0, 0, ' + minWidth + ', ' + minHeight + '],   ';
    htmlCode+='          boxWidth    : 400,                             ';
    htmlCode+='          boxHeight   : 400,                             ';
    htmlCode+='          aspectRatio : ' + aspectRatio + '              ';
    htmlCode+='      });                                                ';
    htmlCode+='    }                                                    ';

// , minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory 
//  htmlCode+='          allowSelect : true,                            ';
//  htmlCode+='          allowResize : true,                            ';
//  htmlCode+='          allowMove   : true,                            ';

    htmlCode+='    function updateSize_' + currAppName + '(c) {   ';
    htmlCode+='      $("#x_Crop_' + currAppName + '").val(c.x);   ';
    htmlCode+='      $("#y_Crop_' + currAppName + '").val(c.y);   ';
    htmlCode+='      $("#w_Crop_' + currAppName + '").val(c.w);   ';
    htmlCode+='      $("#h_Crop_' + currAppName + '").val(c.h);   ';
    htmlCode+='    }';

    htmlCode+='    function cropImage_' + currAppName + '() {   ';
    htmlCode+='      var xOffset = $("#x_Crop_' + currAppName + '").val();'  ;
    htmlCode+='      var yOffset = $("#y_Crop_' + currAppName + '").val();'  ;
    htmlCode+='      var wCrop   = $("#w_Crop_' + currAppName + '").val();'  ;
    htmlCode+='      var hCrop   = $("#h_Crop_' + currAppName + '").val();'  ;

    htmlCode+='      var formData = new FormData();';

    htmlCode+='      formData.append("customerId", appRules.loginCredentials["customerId"]);';
    htmlCode+='      formData.append("tokenId", appRules.loginCredentials["tokenId"]);';
    htmlCode+='      formData.append("AXIS_API", "CropURL");';
    htmlCode+='      formData.append("AXIS_API_KEY", appRules.axisAPIKey);';

    htmlCode+='      formData.append("fileURL", "' + imageURL + '");';
    htmlCode+='      formData.append("hCrop"  , parseInt(hCrop));';
    htmlCode+='      formData.append("wCrop"  , parseInt(wCrop));';
    htmlCode+='      formData.append("xOffset", parseInt(xOffset));';
    htmlCode+='      formData.append("yOffset", parseInt(yOffset));';

    htmlCode+='      spinnerStart();';
    htmlCode+='      $.ajax({';
    htmlCode+='        url  : appRules.apiEndPoint, ';
    htmlCode+='        type : "POST",';
    htmlCode+='        data : formData,';
    htmlCode+='        processData : false,  ';
    htmlCode+='        contentType : false,  ';
    htmlCode+='        success : function(data) {  ';
    htmlCode+='                      spinnerStop();';
    htmlCode+='                      if ( data.returnStatus == "FAIL" ) {  ';
    htmlCode+='                          toast(data.statusMessage);  ';
    htmlCode+='                      } else {  ';
    htmlCode+='                          imageUrl = data.imageUrl;  ';
    htmlCode+='                          runUploadDataFactory( "' + itemID + '" , "' + dataFactory + '", imageUrl);';
    htmlCode+='                      }  ';
    htmlCode+='                  },  ';
    htmlCode+='        error :  function(data) {  ';
    htmlCode+='                    spinnerStop();';
    htmlCode+='                    toast("Network Error!");  ';
    htmlCode+='                 }  ';
    htmlCode+='      });  ';
    htmlCode+='    }';
    htmlCode+='  </script>';
    
    $('#' + currAppName + '_UploadStep_1').html(htmlCode);
}

function runUploadDataFactory(itemID, dataFactory, imageURL) {

    var currDF = appRules.dataFactory[dataFactory];

    if ( ! currDF ) {
        currDF = {};
        currDF =  { "url" : appRules.apiEndPoint,
                    "parameters" : { "AXIS_API_KEY" : { "type" : "static", "value": appRules.axisAPIKey},
                                     "AXIS_API"     : { "type" : "static", "value": dataFactory} },
                    "dataReady" : "N",
                    "data" : {} };
    }

    var dfURL      = currDF.url;
    var dfParams   = currDF.parameters;
    var dfMethod   = currDF.method;
    if (! dfMethod ) dfMethod = "POST";

    var ajaxParams= {};


    var loginCreds = appRules.loginCredentials;
    for (var key in loginCreds) {
        currParam = loginCreds[key];
        if ( typeof currParam != "object" ) {
            ajaxParams[key] = currParam;
        }
    }

    var currBundle = currScreenBundle(currScreenName);
    for (var key in currBundle) {
        currParam = currBundle[key];
        if ( typeof currParam != "object" ) {
            ajaxParams[key] = currParam;
        }
    }

    for (var key in dfParams) {
        currParam = dfParams[key];
        if ( currParam.type == "static" ) {
            ajaxParams[key] = currParam.value;
        }
    }

    ajaxParams[itemID]=imageURL;

    spinnerStart();
    $.ajax({ url: dfURL, method: dfMethod, data: ajaxParams })
    .done(function(apiResponse) {
        spinnerStop();
        if ( apiResponse.returnStatus && apiResponse.returnStatus == "FAIL" ) {
           if ( apiResponse.statusMessage ) {
               toast(apiResponse.statusMessage);
           } else {
               toast("Operation failed!");
           }
            if ( apiResonse.statusMessage.toUpperCase() == "USER NOT LOGGED IN." ) {
                buildMobileLoginScreen();
            }
           return;
        }
        htmlBackButtonHandle();
    })
    .fail(function(jqXHR,status,error) {
        spinnerStop();
        log("Network or System Error.");
    });
}
