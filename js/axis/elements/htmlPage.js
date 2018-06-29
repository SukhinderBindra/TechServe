function htmlPage(itemID, label, height, width, htmlURL) {

    var htmlCode="";    

    var heightString="";
    var widthString="";

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
        widthString="";
    } else {
        if ( width.indexOf("%") == -1 ) {
           widthString=width + "px";
        } else {
           widthString=width;
        }
    }

    spinnerStart();

    htmlCode+='<div style="width:' + widthString + ';height:5000px; margin-left:-15px; margin-right:15px;" >';
    htmlCode+='  <iframe id="' + itemID + '" src="' + htmlURL + '" alt="' + label + '" style="position:absolute; width:' + widthString + ';height:' + heightString + ';" frameBorder="0" ></iframe>';
    htmlCode+='</div>';
 
    postRenderFunctionsArray.push(
        function() {

            document.getElementById(itemID).onload = function() {
                spinnerStop();
            }
        }
    );

    return(htmlCode);

}
