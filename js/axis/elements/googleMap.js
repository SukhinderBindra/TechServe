function googleMap( itemID, hint, label, height, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName) {

    var htmlCode="";    

    if ( hint != "" ) {
        htmlCode+='<div class="axis-tooltip" style="display:inline-block">';
        htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        htmlCode+='   </a>';
        htmlCode+='</div>&nbsp';
    }

    htmlCode+=' <label class="axis-label">' + label + '</label><br>';
    htmlCode+=' <div id="' + itemID + '" style="width: 100%; height: ' + height + '; padding-bottom: 100%;"></div>'

    postRenderFunctionsArray.push(
        function() { 
            googleMapRender(itemID, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName); 
        }
    );

    return(htmlCode);
}

function googleMapsInit() {

    var apiKey=appRules.googleMapsKey;

   if ( apiKey.length == 0 ) {
       return(0);
   }

    var jsURL='http://maps.google.com/maps/api/js?key=' + apiKey + '&sensor=true'

    spinnerStart();

    jQuery.ajax({
        url: jsURL,
        dataType: 'script',
        success: function (result) {
           googleMapsReady="Y";
        },
        async: false
    });

    spinnerStop();
}

function googleMapRender(itemID, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName) {
   if ( googleMapsReady != "Y" ) {
      setTimeout(function () { googleMapRender(itemID, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName) }, 90);
   } else {
      googleMapRenderReady(itemID, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName);
   }
}


function googleMapRenderReady(itemID, data, imageField, titleField, descField, latField, lonField, idField, idFieldName, screenName) {
    
    var avgLat=0;
    var avgLon=0; 

    for (var locCnt=0; locCnt<data.length; locCnt++ ) {
        currRec=data[locCnt];
        avgLat+=currRec[latField];
        avgLon+=currRec[lonField];
    }

    avgLat = avgLat / data.length;
    avgLon = avgLon / data.length;

    var map = new google.maps.Map(document.getElementById( itemID ), {
      zoom: 13,
      center: new google.maps.LatLng(avgLat, avgLon),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var bounds     = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var mapContentArray=[];

    for (i = 0; i < data.length; i++) {
        currRec=data[i];

        var currImage="";
        var currTitle="";
        var currDesc="";

        var currContent="";

        if ( screenName && screenName != "" ) {
            currContent='<div onclick="transitionFromMap(\'' + screenName + '\', \'' + currScreenName +  '\', \'' + idFieldName + '\', \'' + currRec[idField] + '\')" style="border:0px;text-align:center;">';
        } else {
            currContent='<div style="border:0px;text-align:center;">';
        }

        if ( imageField && imageField != "" ) {
            currContent+='<img src="' + currRec[imageField] + '" data-holder-rendered="true" style="height: 80px; width:auto; text-align:center;  ">';
        }
        currContent+='<div class="caption">';

        if ( titleField && titleField != "" ) {
            currContent+='<h5>' + currRec[titleField] + '</h5>';
        }
              
        if ( descField && descField != "" ) {
            currContent+='<p>' + currRec[descField] + '</p>';
        }

        currContent+='  </div>';
        currContent+='</div>';


        mapContentArray[i] = currContent;
      
        marker = new google.maps.Marker({
            position: new google.maps.LatLng( currRec[latField], currRec[lonField]),
            map: map
        });

        bounds.extend(marker.position);

        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infowindow.setContent(mapContentArray[i]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    map.fitBounds(bounds);
}

function transitionFromMap(screenName, currScreenName, keyFieldName, keyFieldValue) {
    var dataBundle={};
    dataBundle[keyFieldName] = keyFieldValue;
    updateScreenBundle(currScreenName, dataBundle );
    htmlTransitionButtonHandle(screenName, currScreenName);
}




