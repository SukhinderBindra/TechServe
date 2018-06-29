function htmlImage( itemID, hint, label, height, width, rounded, defaultValue, value, backgroundColor) {

    var htmlCode="";    

    var heightString="";
    var widthString="";

    if ( value == "" || !value ) {
        value=defaultValue;
    }


    if ( typeof value == "undefined" || value == "" || value == "undefined" ) {
        return("");
    }


    if ( !label ) {
        label="";
    }

    if ( !height || height == 0 ) {
        heightString="";
    } else {
        if ( height.indexOf("%") == -1 ) {
           heightString=height + "px";
        } else {
           heightString=height;
        }
    }

    if ( !width || width == 0 ) {
        widthString="100%";
    } else {
        if ( width.indexOf("%") == -1 ) {
           widthString=width + "px";
        } else {
           widthString=width;
        }
    }

    var roundedStyle="";
    if ( rounded == "Y" ) {
      roundedStyle="border-radius: 50%;";
    }


    htmlCode+='<img id="' + itemID + '" class="img-fluid rounded" ' + 
              '   src="' + value + '" alt="' + label + '" ' +
              '   style="background-color:#' + backgroundColor + ';width:' + widthString + ';height:' + heightString + ';' + roundedStyle + '; display:block; border: 1px solid #' +  appRules.buttonColor + ';">';
 
    if ( label != "") {
      htmlCode+='<br>';
      if ( hint != "" ) {
          htmlCode+='<div class="axis-tooltip" style="display:inline-block"> ';
          htmlCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
          htmlCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
          htmlCode+='   </a>';
          htmlCode+='</div>&nbsp';
      }

      htmlCode+='<label class="axis-label" style="display:inline-block; margin:auto; text-align:center;" >' + label +  '</label><br>';
    }

    elementDataTypes[ itemID ] = 'image';

    return(htmlCode);

}


function getInputImage(itemName) {
    return(document.getElementById(itemName).getAttribute('src'));
}

