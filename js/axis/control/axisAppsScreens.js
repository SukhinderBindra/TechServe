//*************************************************************************
//*************************************************************************
//**                                                                     **
//**  Title: axisAppsScreens.js                                          **
//**  Author: Sukhinder Bindra.                                          **
//**                                                                     **
//*************************************************************************
//*************************************************************************

//-------------------------------------------------//
// Variable used to give each element a unique ID. //
//-------------------------------------------------//
var idCounter=0;

//---------------------------------------------------------------------//
// When a user click on a record from a list, it opens a new screen.   //
// This variable stores the list item number user clicked on. It helps //
// us update the list when the user comes out of the detail screen.    //
// WORKING AREA OF THE APP. Also used to store the calls of APIs       //
//---------------------------------------------------------------------//
var appRules={};

var postRenderFunctionsArray=[];

//---------------------------------------------------------//
// Make this global to avoid issues with passing by Value. //
//---------------------------------------------------------//
var screenCode="";
var currAppName="";
var currScreenName="";

var axisLocation = {
                     "lat": 0,
                     "lon": 0,
                     "reverseGeocodeNeeded" : "N",
                     "geoLocationReady": "N",
                     "geoLocationSupported": "Y" ,
                     "city": "",
                     "state": "",
                     "stateShort": "",
                     "zip": "",
                     "zip4": "",
                   };

var axisLocationEvents=[];
var geocoder;


var requestedSectionName="";
var requestedScreenName="";


function oopsFunction() {
  log("ERROR: Failed to fetch data for the data factory.");
}

function getDataAndRenderScreen(sectionName, screenName, isMainPage) {

  var screenDef = appRules.screens[screenName];

  if ( !screenDef ) {
    return;
  }

  var dataFactoryName = screenDef.dataFactory;

  requestedSectionName=sectionName;
  requestedScreenName=screenName;

  if ( dataFactoryName && dataFactoryName.length != 0 ) {
    runDataFactory(dataFactoryName, screenName, renderScreen, oopsFunction, isMainPage);
  } else {
    renderScreen(isMainPage);
  }

}

//-------------------------------------------------------------------------------------//
// Purpose     : Render the screen.                                                    //
// Description : This screen is responsible of rendering a screen based on the layout. //
//               To render the individual items on the screen, this function calls     //
//               the function "render()"                                               //
//-------------------------------------------------------------------------------------//
function renderScreen(isMainPage) {

  sectionName = requestedSectionName;
  currScreenName  = requestedScreenName;

  var data=currScreenBundle(currScreenName);

  postRenderFunctionsArray=[];

  var screenDef=appRules.screens[currScreenName];
  var screenCode="";
  var title=screenDef.title;
  var rowsArray=screenDef.rows;
  var dataBundle=currScreenBundle(currScreenName);

  //----------------------------------//
  // Print Title on desktop version.  //
  //----------------------------------//
  screenTitle = screenDef.title;
  if ( typeof screenTitle == "undefined" ) {
      screenTitle="";
  }

  if (typeof isMainPage == "undefined" || ( isMainPage!='Y' && isMainPage!='N')) {
      isMainPage = appScreenStackIsMainPage(currScreenName);
  }

  if ( isMainPage == "Y" ) {
    // Main Page
    $('#footer_' + currAppName).css('display', 'block');
    $('#subMenu_' + currAppName).css('display', 'block');
    $('#desktopLeftMenu_' + currAppName).css('display', 'block');
    $('#desktopBreadcrumb_' + currAppName).css('display', 'none');
    appScreenStackPurge(currScreenName);
  } else {
    $('#footer_' + currAppName).css('display', 'none');
    $('#subMenu_' + currAppName).css('display', 'none');
    $('#desktopLeftMenu_' + currAppName).css('display', 'none');
    $('#desktopBreadcrumb_' + currAppName).css('display', 'block');
  }

  //----------------------------------------------//
  // Find the Screen from the configuration JSON. //
  //----------------------------------------------//
  screenCode='<div id="' + sectionName + '_' + currScreenName + '">';

  var appScreens = appRules["screens"];
  if ( typeof appScreens[currScreenName] == "undefined" ) {
      alert("Invalid Screen Name " + currScreenName);
      return;
  }

  //---------------------------//
  // Initialize Geo Code Stuff //
  //---------------------------//
  axisLocation.lat = 0;
  axisLocation.lon = 0;
  axisLocation.reverseGeocodeNeeded = "N";
  axisLocation.geoLocationReady = "N";
  axisLocation.geoLocationSupported = "Y";

  screenCode+=renderAxisScreen(currScreenName, isMainPage);

  screenCode+='</div>';

  document.getElementById("screen_" + sectionName).innerHTML = screenCode  + "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";

  if ( isMobile != "Y" ) {
      showBreadCrumbs();
  }


  $('input').focusout(function() { validateInput(event.target.id);});

  $('.selectpicker').selectpicker({
      style: 'btn-default',
      size: 'auto'
  });

  $('.axis-tooltip').tooltip({
      selector: "a[rel=tooltip]"
  });

  for ( var funcCnt=0; funcCnt< postRenderFunctionsArray.length; funcCnt++ ) {
    postRenderFunctionsArray[funcCnt]();
  }

  if ( axisLocationEvents.length > 0 ) {
    //----------------------------//
    // Step: Get the Geo Location //
    //----------------------------//
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGeoLocation);
    }
  }

  window.scrollTo(0, 0);
}



function handleGeoLocation(position) {
    axisLocation.lat = position.coords.latitude;
    axisLocation.lon = position.coords.longitude;

    if ( axisLocation.reverseGeocodeNeeded == "Y" ) {
        handleGoogleReverseGeocoder();
    } else {
        handleLocationEvents();
    }

}


//--------------------------------------------------------//
// Get the address of the location based on the lat/long. //
//--------------------------------------------------------//
function handleGoogleReverseGeocoder() {
  if (! geocoder ) {
    geocoder = new google.maps.Geocoder();
  }

  var latlng = new google.maps.LatLng(axisLocation.lat, axisLocation.lon);
  geocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var addrsDtl = results[1].address_components;
        for (var compCnt=0; compCnt < addrsDtl.length; compCnt ++ ) {

            var currRec=addrsDtl[compCnt];
            var currKey=currRec.types[0];
            var currLongVal=currRec.long_name;
            var currShortVal=currRec.short_name;

            switch(currKey) {
                case "locality": axisLocation.city = currLongVal;
                                 break;

                case "administrative_area_level_1":
                                 axisLocation.state      = currLongVal;
                                 axisLocation.stateShort = currShortVal;
                                 break;

                case "postal_code":
                                 axisLocation.zip = currShortVal;
                                 break;

                case "postal_code_suffix":
                                 axisLocation.zip4 = currLongVal;
                                 break;
            }
        }
        handleLocationEvents();
      } else {
        log('Warning: Reverse Geodocer - No results found');
      }
    } else {
      log('ERROR: Reverse Geocoder failed due to: ' + status);
    }
  });
}


function handleLocationEvents() {

    for ( var funcCnt=0; funcCnt< axisLocationEvents.length; funcCnt++ ) {
        axisLocationEvents[funcCnt]();
    }

    axisLocationEvents=[];
}


//--------------------------------------------------------//
// This function is the main function that render a page. //
//--------------------------------------------------------//
function renderAxisScreen(currScreen, isMainPage) {

  var screenDef=appRules.screens[currScreen];
  var screenCode="";
  var title=screenDef.title;
  var populateForm=screenDef.populateForm;
  var rowsArray=screenDef.rows;
  var dataBundle=currScreenBundle(currScreen);

  //----------------------------------//
  // Print Title on desktop version.  //
  //----------------------------------//
  screenTitle = screenDef.title;
  if ( typeof screenTitle == "undefined" ) {
      screenTitle="";
  }

  if ( typeof populateForm == "undefined" ) {
      populateForm="Y";
  }


  //----------------------------------------------------------//
  // Parse the title to see if there are any varialbes in it. //
  //----------------------------------------------------------//
  for (key in dataBundle) {
     var val=dataBundle[key];
     if ( typeof val != "object" ) {
       screenTitle=screenTitle.replace('<?' + key + '>', val);
     }
  }

  appScreenStackAdd(currScreenName, screenTitle);




  if ( isMobile == "Y" ) {
      $('#axis_logo_img').css('display', 'none');
      $('#axis_mobile_title').css('display', 'block');

      if ( isMainPage == "Y" ) {
          document.getElementById('axis_mobile_title').innerHTML='<span><i class="fa fa-home"></i> &nbsp' + screenTitle + ' </span>';
      } else {
          document.getElementById('axis_mobile_title').innerHTML='<span> ' + screenTitle + ' &nbsp <i class="fa fa-chevron-down"></i></span>';
      }
  } else {
      screenCode+='<div class="img-rounded" style="margin-left:15px;margin-right:-15px;text-align:center;background-color:#' + appRules.footerBgColor + '">';
      screenCode+='<h3 style="margin-top:0px;padding-top:10px; padding-bottom: 10px; color:#' + appRules.footerTextColor + '">' + screenTitle + '</h3>';
      screenCode+='</div>';
  }


  //----------------------------------------//
  // Back Button ( Shown if not main page ) //
  //----------------------------------------//
  var backButtonCode="";
  if ( isMainPage != "Y" ) {
    backButtonCode+='<div class="pull-left" style="padding-top: 15px;padding-bottom: 10px">';
    backButtonCode+=htmlButton("AXIS_backButton", "", "", "fa-arrow-left", "N", "N", "N", 0, screenName, screenName, "back", '', '', 'Y', "");
    backButtonCode+='</div>';
  }
  document.getElementById("header_backButton").innerHTML = backButtonCode;

  //--------------------------------------------------//
  // Top Right Menu Button ( Shown if not main page ) //
  //--------------------------------------------------//
  var menuButtonCode="";
  var menuButton = screenDef.menuButton;
  if ( typeof menuButton != "undefined" ) {
      var label           = menuButton.label;
      var icon            = menuButton.icon;
      var badgeInd        = menuButton.badgeInd;
      var wideButton      = menuButton.wideButton;
      var addBackground   = menuButton.addBackground;
      var role            = menuButton.role;
      var conditionDriver = menuButton.conditionDriver;
      var screenName      = menuButton.screenName;
      var dataFactory     = menuButton.dataFactory;
      var url             = menuButton.url;

      label = "";

      var itemValue = "";
      if ( typeof dataBundle[itemID] != "undefined" ) {
          itemValue = dataBundle[itemID];
      }

      menuButtonCode+='<div class="pull-right" style="padding-top: 15px;padding-bottom: 10px">';
      menuButtonCode+=htmlButton(itemID, "", label, icon, wideButton, addBackground, badgeInd, itemValue, screenName, 'screen_' + currAppName, role, dataFactory, conditionDriver, 'Y', url) ;
      menuButtonCode+='</div>';
  }

  document.getElementById("header_subMenu").innerHTML =  menuButtonCode;
  

  // Do not leave space on the top of the screen if there is no back button or menu button
//  if ( isMainPage != "Y" ||  typeof menuButton != "undefined" ) {
//      if ( isMobile == "Y" ) {
//          screenCode+='<br style="line-height:4.5;">';
//      } else {
//          screenCode+='<br style="line-height:4.5;">';
//      }
//  } else {
//          screenCode+='<br style="line-height:1;">';
//  }

   

  for ( var rowCnt=0; rowCnt<rowsArray.length; rowCnt++ ) {
    var colsArray=rowsArray[rowCnt].cols;
    var numberColumns=colsArray.length;
    var colWidth=1;

    switch (numberColumns) {
        case 1 : colWidth=12; break;
        case 2 : colWidth=6;  break;
        case 3 : colWidth=4;  break;
        case 4 : colWidth=3;  break;
        case 5 : colWidth=2;  break;
        case 6 : colWidth=2;  break;
    }

    screenCode+='<div class="row" XXstyle="margin-left:0px;" >';

    for ( var colCnt=0; colCnt<colsArray.length; colCnt++ ) {

      var itemDef=colsArray[colCnt];
      var itemID=itemDef.id;
      var itemType=itemDef.type;
      var itemLabel=itemDef.label;
      var itemHint=itemDef.hint;

      if ( typeof itemHint == "undefined" ) {
          itemHint="";
      }

      var itemValue = "";
      if ( typeof dataBundle[itemID] != "undefined" && populateForm == "Y" ) {
          itemValue = dataBundle[itemID];
      }

      screenCode+='    <div class="col-xs-' + colWidth + '">';

      switch(itemType) {

        case "stars" :
                        if ( itemValue.length == 0 ) {
                            itemValue = "3"
                        }
                        screenCode+=ratingStars(itemID, itemHint, itemLabel, itemValue) ;
                        break;

        case "text" :   var itemPlaceholder   = itemDef.placeholder;
                        var itemMinSize       = itemDef.minSize;
                        var itemMaxSize       = itemDef.maxSize;
                        var itemUppercase     = itemDef.uppercase;
                        var allowSpaces       = itemDef.allowSpaces;
                        var allowSpecialChars = itemDef.allowSpecialChars;
                        var allowDigits       = itemDef.allowDigits;
                        var value             = itemDef.value;

                        var enabled       = "Y";
                        if ( 'enabled' in itemDef ) {
                            enabled=itemDef.enabled;
                        }

                        screenCode+=inputText(itemID, itemHint, itemLabel, itemPlaceholder, enabled, itemMinSize, itemMaxSize,
                                              itemUppercase,allowSpaces, allowSpecialChars, allowDigits, itemValue) ;
                        break;

        case "textarea" :
                        var itemPlaceholder   = itemDef.placeholder;
                        var itemMinSize       = itemDef.minSize;
                        var itemMaxSize       = itemDef.maxSize;
                        var itemUppercase     = itemDef.uppercase;
                        var itemRows          = itemDef.rows;

                        var enabled       = "Y";
                        if ( 'enabled' in itemDef ) {
                            enabled=itemDef.enabled;
                        }

                        screenCode+=inputTextArea(itemID, itemHint, itemLabel, itemPlaceholder, enabled, itemMinSize, itemMaxSize,
                                              itemUppercase, itemRows, itemValue) ;
                        break;

        case "hidden" :
                        var value             = itemDef.value;
                        if ( ! value ) {
                            value = itemValue;
                        }

                        if ( typeof value == "object" ) {
                            value = JSON.stringify(value);
                        }

                        screenCode+=htmlHidden(itemID, value) ;
                        break;

        case "email" :  var placeholder   = itemDef.placeholder;
                        var required      = itemDef.required;
                        var maxSize       = itemDef.maxSize;
                        var uppercase     = itemDef.uppercase;

                        screenCode+=inputEmail(itemID, itemHint, itemLabel, placeholder, required, maxSize, uppercase, itemValue) ;
                        break;

        case "phone" :  var placeholder   = itemDef.placeholder;
                        var required      = itemDef.required;
                        var maxSize       = itemDef.maxSize;

                        screenCode+=inputPhone(itemID, itemHint, itemLabel, placeholder, required, maxSize, itemValue) ;
                        break;

        case "time" :   var required      = itemDef.required;

                        screenCode+=inputTime(itemID, itemHint, itemLabel, required, colWidth, itemValue) ;
                        break;

        case "date" :   var required      = itemDef.required;

                        screenCode+=inputDate(itemID, itemHint, itemLabel, required, itemValue) ;
                        break;

        case "color" :  var required      = itemDef.required;
                        screenCode+=inputColor(itemID, itemHint, itemLabel, required, itemValue) ;
                        break;

        case "icon"  :  var required      = itemDef.required;

                        screenCode+=inputIcon(itemID, itemHint, itemLabel, required, itemValue) ;
                        break;

        case "password" :
                        var itemMinSize       = itemDef.minSize;
                        var itemMaxSize       = itemDef.maxSize;

                        screenCode+=inputPassword(itemID, itemHint, itemLabel, itemMinSize, itemMaxSize, itemValue) ;
                        break;

        case "pin" :
                        var maxSize       = itemDef.maxSize;
                        var centered      = itemDef.centered;

                        if (typeof centered  == "undefined" ) {
                            centered="N";
                        }

                        screenCode+=inputPin(itemID, itemHint, itemLabel, maxSize, centered ) ;
                        break;

        case "like" :   var centered  = itemDef.centered;
    
                        if (typeof centered  == "undefined" ) { 
                            centered="N";
                        }
                        screenCode+=inputLike(itemID, itemHint, itemLabel, itemValue, centered) ;
                        break;

        case "number" :
                         var required  = itemDef.required;
                         var minValue   = itemDef.minValue;
                         var maxValue   = itemDef.maxValue;

                         screenCode+=inputNumber(itemID, itemHint, itemLabel, required, minValue, maxValue, itemValue) ;
                         break;

        case "zip" :     var required     = itemDef.required;
                         var autoPopulate = itemDef.autoPopulate;

                         screenCode+=inputZip(itemID, itemHint, itemLabel, required, autoPopulate, itemValue) ;
                         break;

        case "city" :    var required     = itemDef.required;
                         var uppercase    = itemDef.uppercase;
                         var maxSize      = itemDef.maxSize;
                         var autoPopulate = itemDef.autoPopulate;

                         screenCode+=inputCity(itemID, itemHint, itemLabel, required, uppercase, maxSize, autoPopulate, itemValue) ;
                         break;

        case "state" :   var required     = itemDef.required;
                         var uppercase    = itemDef.uppercase;
                         var maxSize      = itemDef.maxSize;
                         var abbreviated  = itemDef.abbreviated;
                         var autoPopulate = itemDef.autoPopulate;

                         screenCode+=inputState(itemID, itemHint, itemLabel, required, uppercase, maxSize, autoPopulate, abbreviated, itemValue) ;
                         break;

        case "location" :
                         var required    = itemDef.required;
                         var visible     = itemDef.visible;

                         if (typeof visible == "undefined" ) {
                           visible="Y";
                         }

                         screenCode+=inputGPSLocation(itemID, itemHint, itemLabel, required, visible, itemValue);
                         break;

        case "divider" : 
                         var color = itemDef.color;
                         screenCode+=htmlDivider(itemID, color) ;
                         break;

        case "label"   : var centered  = itemDef.centered;
                         //------------------------------------//
                         // Get Style: header, subHeader, body //
                         //------------------------------------//
                         var style     = itemDef.style;
                         var prefix    = itemDef.prefix;

                         if ( typeof prefix == "undefined" ||  prefix == "" ) {
                             prefix = "";
                         }

                         if ( typeof itemLabel == "undefined" ||  itemLabel == "" ) {
                             itemLabel = itemValue;
                         }

                         screenCode+=htmlLabel(style, itemHint, itemLabel, centered, prefix) ;
                         break;

        case "cards"  :  var template         = itemDef.template;
                         var dataFactory      = itemDef.dataFactory;
                         var source           = itemDef.source;
                         var borderColor      = itemDef.borderColor;
                         var backgroundColor  = itemDef.backgroundColor;
                         var screenName       = itemDef.screenName;
                         var role             = itemDef.role;
                         var conditionDriver  = itemDef.conditionDriver;

                         var appData = currScreenBundle( currScreen );
                         screenCode+=htmlCardsList(itemID, backgroundColor, borderColor, template, appData, source, screenName, role, conditionDriver) ;
                         break;

        case "dropdown" :
                         var dataFactory  = itemDef.dataFactory;

                         var data;
                         var valueField;
                         var descField;

                         if ( ! dataFactory || dataFactory == "" ) {
                             data       = itemDef.data;
                             valueField = "val";
                             descField  = "desc";
                         } else {
                             valueField = itemDef.valueField;
                             descField  = itemDef.descField;

                             var dfResult = getDataFactory(dataFactory, 'Y', "section_" + currAppName );

                             data = dfResult[itemDef.source];
                         }

                         screenCode+=inputDropdown(itemID, itemHint, itemLabel, data, valueField, descField, itemValue) ;
                         break;

        case "radio" :
                         var data       = itemDef.data;
                         var numCols    = itemDef.numCols;
                         var required   = itemDef.required;
                         var valueField = "val";
                         var descField  = "desc";

                         screenCode+=inputRadioButton(itemID, itemHint, itemLabel, required, data, valueField, descField, numCols, itemValue) ;
                         break;

        case "checkbox" :
                         var data       = itemDef.data;
                         var numCols    = itemDef.numCols;
                         var required   = itemDef.required;

                         var valueField = "val";
                         var descField  = "desc";

                         screenCode+=inputCheckBox(itemID, itemHint, itemLabel, required, data, valueField, descField, numCols, itemValue) ;
                         break;

        case "image" :
                         var label      = itemDef.label;
                         var height     = itemDef.height;
                         var width      = itemDef.width;
                         var rounded    = itemDef.rounded;
                         var defaultImg = itemDef.defaultImg;
                         var valueField = itemDef.url;
                         var backgroundColor = itemDef.backgroundColor;

                         if ( !backgroundColor ) {
                             backgroundColor="FFF";
                         }

                         if ( ! valueField ) {
                             valueField = itemValue;
                         }

                         screenCode+=htmlImage(itemID, itemHint, label, height, width, rounded, defaultImg, valueField, backgroundColor) ;
                         break;

        case "imageUpload" :
                         var label       = itemDef.label;

                         var crop       = itemDef.crop;
                         var minWidth    = itemDef.minWidth;
                         var maxWidth    = itemDef.maxWidth;
                         var minHeight   = itemDef.minHeight;
                         var maxHeight   = itemDef.maxHeight;
                         var aspectRatio = itemDef.aspectRatio;
                         var dataFactory = itemDef.dataFactory;

                         screenCode+=htmlImageUpload( itemID, itemHint, label, crop, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, dataFactory );
                         break;

        case "html" :
                         var height  = itemDef.height;
                         var width   = itemDef.width;
                         var url     = itemDef.url;

                         if (url == "") {
                             url = itemValue;
                         }

                         screenCode+=htmlPage(itemID, "", height, width, url) ;
                         break;

        case "map" :
                         var label       = itemDef.label         ;
                         var height      = itemDef.height        ;
                         var dataFactory = itemDef.dataFactory   ;
                         var source      = itemDef.source        ;
                         var imageField  = itemDef.imageField    ;
                         var titleField  = itemDef.titleField    ;
                         var descField   = itemDef.descField     ;
                         var latField    = itemDef.latField      ;
                         var lonField    = itemDef.lonField      ;
    
                         var idField     = itemDef.idField       ;
                         var idFieldName = itemDef.idFieldName   ;
                         var screenName  = itemDef.screenName    ;


                         var data  = itemDef.data    ;

                         var dfResult={};
                         if ( !data || data == "" ) {
                             if ( !dataFactory || dataFactory == "" ) {
                                 data=itemValue;
                             } else {
                                 dfResult = getDataFactory(dataFactory, 'Y', "section_" + currAppName );
                                 data = dfResult[source];
                             }
                         }

                         screenCode+=googleMap(itemID, itemHint, label, height, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName);
                         break;

        case "carousel" :
                         var dataFactory = itemDef.dataFactory;
                         var source      = itemDef.source;
                         var imageField  = itemDef.imageField;
                         var titleField  = itemDef.titleField;
                         var descField   = itemDef.descField;
                         var data        = itemDef.data;
                         var rounded     = itemDef.rounded;
                         var backgroundColor     = itemDef.backgroundColor;


                         if ( typeof data == "undefined" || data == "" ) {
                             if ( typeof dataFactory == "undefined" || dataFactory == "" ) {
                                 if ( typeof source == "undefined" || source == "" ) {
                                     data = itemValue;
                                 } else {
                                     data = itemValue[source];
                                 }
                             } else {
                                 dfResult = getDataFactory(dataFactory, 'Y', "section_" + currAppName );
                                 data = dfResult[source];
                             }
                         }

                         if (typeof data == "undefined" ) {
                             log("Data for carousel is undefined.");
                             data=[];
                         }

                         if ( typeof rounded == "undefined" ) {
                             rounded="N";
                         }

                         if ( typeof imageField == "undefined" ) {
                             imageField="";
                         }

                         if ( typeof titleField == "undefined" ) {
                             titleField="";
                         }

                         if ( typeof descField == "undefined" ) {
                             descField="";
                         }

                         if ( typeof backgroundColor == "undefined" ) {
                             backgroundColor="FFF";
                         }

                         screenCode+=htmlImageCarousel(itemID, data, imageField, titleField, descField, rounded, backgroundColor) ;
                         break;

        case "launchpad" :
                         var label      = itemDef.label;
                         var numCols    = itemDef.numCols;
                         var valueField = itemDef.valueField;
                         var descField  = itemDef.descField;
                         var logoField  = itemDef.logoField;
                         var data       = itemDef.data;

                         if (data.length == 0 ) {
                             data = itemValue;
                         }

                         screenCode+=htmlLaunchPad(itemID, itemHint, label, numCols, valueField, descField, logoField, data, dataBundle) ;
                         break;

        case "button" :  var label           = itemDef.label;
                         var icon            = itemDef.icon;
                         var badgeInd        = itemDef.badgeInd;
                         var wideButton      = itemDef.wideButton;
                         var addBackground   = itemDef.addBackground;
                         var role            = itemDef.role;
                         var screenName      = itemDef.screenName;
                         var dataFactory     = itemDef.dataFactory;
                         var conditionDriver = itemDef.conditionDriver;
                         var url             = itemDef.url;

                         screenCode+=htmlButton(itemID, "", label, icon, wideButton, addBackground, badgeInd, itemValue, screenName, 'screen_' + currAppName, role, dataFactory, conditionDriver, 'N', url ) ;

                         break;

        case "piechart" : 
                         var label           = itemDef.label;
                         var valueField      = itemDef.valueField;
                         var labelField      = itemDef.labelField;
                         var legendEnabled   = itemDef.legendEnabled;
                         var holeRadius      = itemDef.holeRadius;
                         var dataFactory     = itemDef.dataFactory;
                         var source          = itemDef.source;

                         var legendEnabledBool=false;
                         if ( legendEnabled == "Y") {
                             legendEnabledBool=true;
                         }

                         var chartData;
                         if ( typeof dataFactory == "undefined" || dataFactory == "" ) {
                             if ( typeof source == "undefined" || source == "" ) {
                                 chartData = itemValue;
                             } else {
                                 chartData = itemValue[source];
                             }
                         } else {
                             var data = getDataFactory(dataFactory, 'Y', "section_" + currAppName );
                             chartData = data[source];
                         }

                         screenCode+=chartPie(itemID, label, chartData, valueField, labelField, legendEnabledBool, holeRadius);
                         break;

        case "barchart" :
                         var label           = itemDef.label;
                         var valueField      = itemDef.valueField;
                         var labelField      = itemDef.labelField;
                         var dataFactory     = itemDef.dataFactory;
                         var source          = itemDef.source;
                         var XAxisName       = itemDef.XAxisName;
                         var YAxisName       = itemDef.YAxisName;
                         var paddingBottom   = itemDef.paddingBottom;

                         var chartData;
                         if ( typeof dataFactory == "undefined" || dataFactory == "" ) {
                             if ( typeof source == "undefined" || source == "" ) {
                                 chartData = itemValue;
                             } else {
                                 chartData = itemValue[source];
                             }
                         } else {
                             var data = getDataFactory(dataFactory, 'Y', "section_" + currAppName );
                             chartData = data[source];
                         }

                         screenCode+=chartBar(itemID, label, chartData, valueField, labelField, XAxisName, YAxisName, paddingBottom);
                         break;

        case "signature" :
                         var label           = itemDef.label;
                         var required        = itemDef.required;

                         screenCode+=htmlSignature(itemID, label);
                         break;

        case "stripe" :
                         var label           = itemDef.label;
                         var dataFactory     = itemDef.dataFactory;
                         var email           = itemDef.email;
                         var key             = itemDef.key;
                         var image           = itemDef.image;
                         var name            = itemDef.name;
                         var amount          = itemDef.amount
                         var description     = itemDef.description;
                         var paramName       = itemDef.paramName;

                         amountValue = dataBundle[amount];
 
                         if (typeof name != "undefined" && name != "" ) {
                             if ( name in dataBundle ) {
                                 name = dataBundle[name];
                             }
                         }

                         if (typeof description != "undefined" && description != "" ) {
                             if ( description in dataBundle ) {
                                 description = dataBundle[description];
                             }
                         }

                         if (typeof key != "undefined" && key != "" ) {
                             if ( key in dataBundle ) {
                                 key = dataBundle[key];
                             }
                         }

                         screenCode+=htmlStripe(itemID, label, dataFactory, paramName, email, key, image, name, description, paramName, amountValue);
                         break;

        case "autocomplete" :
                         var hint        = itemDef.hint;
                         var label       = itemDef.label;
                         var placeholder = itemDef.placeholder;
                         var uppercase   = itemDef.uppercase;
                         var value       = itemDef.value;

                         var baseURL        = itemDef.baseURL;
                         var dataFactory    = itemDef.dataFactory;
                         var paramName      = itemDef.paramName;
                         var source         = itemDef.source;
                         var sourceElement  = itemDef.sourceElement;
                         var sourceKey      = itemDef.sourceKey;

                         screenCode+=inputAutocomplete(itemID, hint, label, placeholder, required, uppercase, value, baseURL, dataFactory, paramName, source, sourceElement, sourceKey );
                         break;

        case "openMap" :
                         var label       = itemDef.label;
                         var value       = itemDef.value;

                         if ( ! value ) {
                             value = itemValue;
                         }

                         screenCode+=htmlOpenMap(itemID, label, value);
                         break;

        case "openPhone" :
                         var value  = itemDef.value;

                         if ( ! value ) {
                             value = itemValue;
                         }

                         screenCode+=htmlOpenPhone(itemID, value);
                         break;

        case "openEmail" :
                         var value  = itemDef.value;

                         if ( ! value ) {
                             value = itemValue;
                         }

                         screenCode+=htmlOpenEmail(itemID, value);
                         break;

        case "htmlDownloadDoc" :

                         var icon            = itemDef.icon;
                         var label           = itemDef.label;
                         var url             = itemDef.url;
                         var name            = itemDef.name;
                         var wideButton      = itemDef.wideButton;

                         screenCode+=htmlDownloadDoc(itemID, icon, label, url, name, wideButton );
                         break;

      }

      screenCode+='    </div>';
    }
    screenCode+='</div><br>';
  }
  return screenCode;
}


function render(currScreen, currMappings, screenData, screenName, uniqueID) {

  //----------------------------//
  // Here we parse the template //
  //----------------------------//
  var allRows=currScreen["rows"];

  for (var rowCnt=0; rowCnt<allRows.length; rowCnt++ ) {
    var currRow = allRows[rowCnt];
    var allCols=currRow["cols"];

    screenCode+="<div class='well'>";
    screenCode+="  <div class='row'>";
    for (var tempColCnt=0; tempColCnt<allCols.length; tempColCnt++) {
       var currCol    = allCols[tempColCnt];
       var currID      = currCol["id"];
       var currType    = currCol["type"];
       var currWeight  = currCol["weight"];
       var currDataVar = currMappings[currID];
       var currData    = screenData[currDataVar];

       switch (currType) {
           case "image":
               currHeight = currCol["height"];
               currWidth  = currCol["width"];
               screenCode+="<div class='col-xs-" + currWeight + "'>";
               screenCode+=" <img class='rounded' src='" + currData +  "' width='" + currWidth + "' height='" + currHeight + "'>";
               screenCode+="</div>";

               break;
           case "label":
               currStyle  = currCol["style"];
               screenCode+="<div class='col-xs-" + currWeight + "'>";
               screenCode+="<span class='pull-left label-" + currStyle + "'>" + currData + "</span>";
               screenCode+="</div>";
               break;

           case "button":
               var buttonLogo     = currCol["logo"];
               var buttonText     = currCol["text"];
               var buttonOnClick  = currCol["onclick"];
               var onClickType    = buttonOnClick["type"];
               var onClickScreen  = buttonOnClick["screen"];


               screenCode+="<div class='col-xs-" + currWeight + " text-center'>";

               screenCode+='<a href="#" onclick="getDataAndRenderScreen(\'' + appName + '\', \'' + onClickScreen +  '\', \'Y\');return false;"><i class="axis-button fa ' + buttonLogo + ' rounded" style="font-size:28px;padding: 8 16 8 16; border: solid 1px #CCC;" ></i><br>' + buttonText + '</a>';
               screenCode+="</div>";
               break;

       }
    }

    screenCode+="  </div>";
    screenCode+="</div>";

  }
}


function checkCredentialsNeeded() {
   // Check if we already have credentials?
   var loginCredentials = appRules.loginCredentials;

   var credentialsFound = "Y";
   for ( var key in loginCredentials ) {
     keyValue = window.localStorage.getItem(key);
     if ( keyValue != null ) {
         appRules.loginCredentials[key] = keyValue;
     } else {
       credentialsFound = "N";
       break;
     }
   }

   if ( credentialsFound == "Y" ) {
     loadApps();
   } else {
     if ( appRules.loginType == "M" ) {
         buildMobileLoginScreen();
     } else {
         buildLoginScreen();
     }
   }
}

function buildCSS() {
  var bgColor=appRules.backgroundColor;
  var txtColor=appRules.textColor;

  var btnColor=appRules.buttonColor;
  var btnTxtColor=appRules.buttonTextColor;

  var appCSS = 'body        { background-color: #' + bgColor   + '; }';
  appCSS += '  .axis-button { background-color: #' + btnColor  + '; color: #' + btnTxtColor + '; }';
  appCSS += '  .axis-footer-icon   { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-icon a:link    { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-icon a:visited { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-icon a:hover   { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-icon a:focus   { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-icon a:active  { color: #' + appRules.footerTextColor + '; text-decoration: none; }';
  appCSS += '  .axis-footer-label  { color: #' + appRules.footerTextColor + '; }';
  appCSS += '  .axis-icon          { color: #' + appRules.buttonColor + '; }';
  appCSS += '  .axis-label         { color: #' + txtColor + '; }';

  appCSS += '.acidjs-rating-stars input:checked ~ label { color: #' + appRules.buttonColor + '; }';
  appCSS += '.acidjs-rating-stars label { color: #' + appRules.buttonTextColor + '; }'


  appCSS += '.navbar-default .navbar-toggle .icon-bar  { background-color: #' + appRules.headerTextColor + '  !important; }';

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = appCSS;
  document.getElementsByTagName('head')[0].appendChild(style);
}


function init() {
  googleMapsInit();
  if  ( appRules.loginScreen == "Y" ) {
    checkCredentialsNeeded();
  } else {
    loadApps();
  }
}


function log(message) {
  console.log(message);
}

function showSection(sectionName) {
    var appsList=appRules.apps;
    var firstScreen
    for (var Counter=0; Counter< appsList.length; Counter++) {
        currAppName=appsList[Counter].appName;
        if ( sectionName == currAppName ) {
            $('#section_' + currAppName).css('display', 'block');
            firstScreen=appsList[Counter].subMenus[0].screenName;
        } else {
            $('#section_' + currAppName).css('display', 'none');
        }
    }

    $("#nav-main").collapse('hide');
    currAppName=sectionName;
    sectionScreen = appScreenStackGetCurrent();

    if (sectionScreen == "") {
        currAppName=sectionName;
        currScreenName=firstScreen;
        getDataAndRenderScreen(currAppName, firstScreen, "Y");
    } else {
        sectionTitle=appRules.screens[sectionScreen].title;
        if ( typeof sectionTitle == "undefined" ) {
            sectionTitle="";
        }
    }
}


function getValueOf(elementName) {


    var elementType = elementDataTypes [ elementName ];

    switch (elementType) {
        case "ratingStars" : return getRatingStars(elementName);
                             break;

        case "text" :        return getInputText(elementName);
                             break;

        case "textarea" :    return getInputTextArea(elementName);
                             break;

        case "hidden" :      return getInputHidden(elementName);
                             break;

        case "email" :       return getInputEmail(elementName);
                             break;

        case "image" :       return getInputImage(elementName);
                             break;

        case "phone" :       return getInputPhone(elementName);
                             break;

        case "time" :        return getInputTime(elementName);
                             break;

        case "date" :        return getInputDate(elementName);
                             break;

        case "color" :       return getInputColor(elementName);
                             break;

        case "icon" :       return getInputIcon(elementName);
                             break;

        case "password" :    return getInputPassword(elementName);
                             break;

        case "pin"      :    return getInputPin(elementName);
                             break;

        case "number" :      return getInputNumber(elementName);
                             break;

        case "zip" :         return getInputZip(elementName);
                             break;

        case "city" :        return getInputCity(elementName);
                             break;

        case "state" :       return getInputState(elementName);
                             break;

        case "signature" :   return getSignature(elementName);
                             break;

        case "dropdown" :    return getInputDropdown(elementName);
                             break;

        case "radio" :       return getInputRadio(elementName);
                             break;

        case "checkbox" :    return getInputCheckBox(elementName);
                             break;

        case "like" :        return getInputLine(elementName);
                             break;
    }

    return("");
}


//---------------------------------------------------------------//
// This function is called when an input looses focus.           //
// The jQuery Trigger for this is setup in the main html page.   //
//---------------------------------------------------------------//
function validateInput(elementName) {

    var element = document.getElementById(elementName);
    if ( ! element ) {
        return(true);
    }

    var elementType =   element.getAttribute("axisType");

    switch (elementType) {
        case "ratingStars" :
                             break;

        case "text" :        return(isValidInputText(elementName));
                             break;

        case "textarea" :    return(isValidInputTextArea(elementName));
                             break;

        case "email":        return(isValidInputEmail(elementName));
                             break;

        case "phone":        return(isValidInputPhone(elementName));
                             break;

        case "time_hour":    return(isValidInputHour(elementName));
                             break;

        case "time_minutes": return(isValidInputMinutes(elementName));
                             break;

        case "date":         return(isValidInputDate(elementName));
                             break;

        case "color":        return(isValidInputColor(elementName));
                             break;

        case "icon":         return(isValidInputIcon(elementName));
                             break;

        case "password" :    return(isValidInputPassword(elementName));
                             break;

        case "pin"      :    return(isValidInputPin(elementName));
                             break;

        case "number" :      return(isValidInputNumber(elementName));
                             break;

        case "zip" :         return(isValidInputZip(elementName));
                             break;

        case "city" :        return(isValidInputCity(elementName));
                             break;

        case "state" :       return(isValidInputState(elementName));
                             break;

        case "signature" :   return(isValidSignature(elementName));
                             break;
    }
    return(true);
}

function isValidateCurrentScreen() {

    var retStatus=true;

    var elements = document.getElementById('screen_' + currAppName).getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
        var itemID  = elements[i].id;
        if ( itemID != ""  && ! itemID.startsWith("axis_message_") && itemID != 'footer_' + currAppName && itemID != 'screen_' + currAppName ) {
            if ( ! validateInput(itemID) ) {
                retStatus=false;
            }
        }
    }
    return(retStatus);
}


