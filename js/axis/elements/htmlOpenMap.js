// Get Font Awosome Icon name for the user.
function htmlOpenMap(itemName, label, value) {

    var buttonColor = appRules.buttonColor;
    var directive="geo:?q=";


    if (iOS()) {
        directive="maps:?q=";
    } else {
        if ( typeof cordova != "undefined" &&  typeof cordova.platformId != "undefined" && cordova.platformId == "ios" ) {
            directive="maps:?q=";
        }
    }


    var currCode="";    

    currCode+='<a target="_system" href="' + directive + value + '"   >';
    currCode+='    <i class="fa fa-map-marker fa-2x" style="color:#' + buttonColor + '"></i> &nbsp ';
    currCode+='    <div style="display:inline-block" class="axis-label" >' + label +  '</div>';
    currCode+='</a>';

    elementDataTypes[ itemName ] = 'openMap';

    return(currCode);
}

function iOS() {

  if ( typeof navigator == "undefined" ) {
     return false;
  }

  if ( typeof navigatorplatform == "undefined" ) {
     return false;
  }

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
    'MacIntel'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}
