var signatureCanvas;
var signaturePad;

function htmlSignature(itemID, label) {

    var htmlCode="";    

    var pageWidth=document.getElementById("mainDiv").clientWidth;
    var sigWidth=pageWidth-50;
    var wStyle=sigWidth + 'px';

    htmlCode+='  <div>';
    htmlCode+='    <div style="text-align:center;">';
    htmlCode+='        <label class="axis-label" >' + label +  '</label>';
    htmlCode+='    </div>';
    htmlCode+='    <div style="text-align:center;">';
    htmlCode+='        <canvas id="' + itemID + '" style="background-color:white;width:' + wStyle + ';height:' + wStyle + ';" class="rounded form-control" ></canvas>';
    htmlCode+='    </div>';

    var buttonTextColor=appRules.buttonTextColor;
    var buttonColor=appRules.buttonColor;

    htmlCode+='    <div style="margin-top:5px;text-align:center;width:98%;">';
    htmlCode+='        <a href="#" style="XXwidth:98%; background: #' + buttonColor  + ';" class="btn rounded" onclick="clearSignature(); return(false);" >';
    htmlCode+='            <span style="font-size:x-large; color:#' + buttonTextColor + '; margin-left:10px; margin-right:10px;" class="fa fa-eraser  pull-left"> </span> ' +
              '            <span class="" style="font-size:large;margin-right:10px;color:#' + buttonTextColor + ';">Clear</span> ';
    htmlCode+='        </a>';
    htmlCode+='    </div>';

    htmlCode+='  </div>';


    elementDataTypes[ itemID ] = 'signature';

    postRenderFunctionsArray.push(
        function() {
            signatureCanvas = document.getElementById(itemID);
            resizeCanvas();
            signaturePad = new SignaturePad(signatureCanvas);
        }
    );

    return(htmlCode);
} 

function saveSignature() {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        window.open(signaturePad.toDataURL());
    }
}
        
function clearSignature() {
  var cWidth  = signatureCanvas.clientWidth  ;
  var cHeight = signatureCanvas.clientHeight  ;
  signatureCanvas.getContext("2d").clearRect(0, 0, cWidth, cHeight);
}
        
function resizeCanvas() {
    var wRatio = 300 / signatureCanvas.clientWidth  ;
    var hRatio = 150 / signatureCanvas.clientHeight ;
    signatureCanvas.getContext("2d").scale(wRatio, hRatio);
}

function isValidSignature(itemID) {
    if (signaturePad.isEmpty()) {
        return(false);
    }
    return(true);
}

function getSignature(itemID) {
    return(signaturePad.toDataURL());
}
