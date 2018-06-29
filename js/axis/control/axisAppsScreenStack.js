////  This file contains logic for screen stack (Transistion from one screen to other).
////  The Screen Stack Trace allows the "Back" button to work.
////     var stack=[];
////     stack.push("Bobby");
////     stack.push("Varsha");
////     stack.push("Karan");
////     stack.pop();
////     "Karan"


var appScreenStack={ 
                   };


function appScreenStackPurge() {
    appScreenStack[currAppName]=[];
}


function appScreenStackAdd(transitionScreen, screenTitle) {

    if ( appScreenStackExists(transitionScreen)) {
        appScreenStackPop(transitionScreen);
    }

    var currStactTop = appScreenStack[currAppName][appScreenStack[currAppName].length-1];

    if ( typeof currStactTop == "undefined" || transitionScreen != currStactTop.name ) {
        appScreenStack[currAppName].push( { "name" : transitionScreen, "title" : screenTitle} );
    }
}

function appScreenStackPopParent() {

    if ( appScreenStack[currAppName].length != 1 ) {
        appScreenStack[currAppName].pop();
    }
   
    var lastElement = appScreenStack[currAppName].length - 1;
    if ( lastElement < 0 ) {
        lastElement=0;
    }

    var parentScreen = appScreenStack[currAppName][lastElement].name;

    return(parentScreen);
}

function appScreenStackGetParent() {
    var lastElement = appScreenStack[currAppName].length-1;
    if ( lastElement < 0 ) {
        lastElement=0;
    }
    var parentScreen = appScreenStack[currAppName][lastElement].name;
    return(parentScreen);
}

function appScreenStackParentIsMainPage() {
    var retVal;
    if ( appScreenStack[currAppName].length == 1 ) {
        retVal="Y";
    } else {
        retVal="N";
    }
    return(retVal);
}

function appScreenStackIsMainPage( scrName ) {
    var retVal;

    if ( appScreenStack[currAppName].length == 0 ) {
        return("Y");
    }

    var mainPage=parentScreen = appScreenStack[currAppName][0].name

    if ( scrName == mainPage ) {
        retVal="Y";
    } else {
        retVal="N";
    }
    return(retVal);
}

function appScreenStackGetCurrent() {
    var stackSize = appScreenStack[currAppName].length;
  
    if ( stackSize == 0 ) {
        return("");
    }

    var currStactTop = appScreenStack[currAppName][stackSize-1].name;

    if ( typeof currStactTop == "undefined" ) {
        currStactTop="";
    }
    return(currStactTop);
}

function appScreensStackGetTitles() {

    var retArray = [];
    var arrLength = appScreenStack[currAppName].length;

    for ( var counter=0; counter<arrLength; counter++ ) {
        currTitle = appScreenStack[currAppName][counter].title;
        retArray.push(currTitle);
    }

    return(retArray);
}

// Check if a screens exists in the stack.
function appScreenStackExists(screenName) {
    var arrLength = appScreenStack[currAppName].length;
    for ( var counter=0; counter<arrLength; counter++ ) {
        currScr = appScreenStack[currAppName][counter].name;
        if ( currScr == screenName) {
           return(true);
        }
    }
    return(false);
}

// Pop the stack until the passed screen is popped.
function appScreenStackPop(screenName) {

  var arrLength = appScreenStack[currAppName].length;

  while (arrLength != 0 ) {
     var currRec=appScreenStack[currAppName].pop();

     if ( currRec.name == screenName ) {
         return;
     }
     arrLength = appScreenStack[currAppName].length;
  } 

  return;
}

function showBreadCrumbs() {

    var htmlCode="";

    var bgColor="";
    var txtColor="";

    if ( isMobile == "Y" ) {
       bgColor=appRules.backgroundColor;
       txtColor=appRules.textColor;
    } else {
       bgColor=appRules.footerBgColor;
       txtColor=appRules.footerTextColor;
    }

    if ( appScreenStackIsMainPage(currScreenName) == "N" )  {

        var appStack = appScreenStack[currAppName];
        var screenCount = appStack.length;

        htmlCode='<span style="margin-top:50px;margin-left:25px" ><br>';
        htmlCode+='<h4>';
        htmlCode+='   <ol class="breadcrumb" style="background-color:#' + bgColor + ';color:#' + txtColor + ';padding-top:0px;">';
        for (var counter=0; counter<screenCount; counter++) {
            var scrName = appStack[counter].name;
            var scrTitle = appStack[counter].title;
            if ( screenCount != ( counter+1 ) ) {
                var homeIcon="";
                var leftMargin="margin-left:15px;";

                if ( counter == 0 ) {
                    homeIcon='<i class="fa fa-home"></i> &nbsp ';
                    leftMargin="";
                }
                htmlCode+='  <li  style="width:100%;margin-top:10px;' + leftMargin + ';color:#' + txtColor + '" ><a style="color:#' + txtColor + ';" href="#" onclick="htmlBreadcrumbTransition(\'' + scrName + '\')">' + homeIcon + scrTitle + '</a></li><br><br>';
//            } else {
//                htmlCode+='  <li  style="width:100%;margin-top:10px;margin-left:15px;color:#' + txtColor + '" ><a style="color:#' + txtColor + ';" href="#"> ' + scrTitle + '</a></li><br><br>';
            }
        }
        htmlCode+='</ol></h4>';
        htmlCode+="<br></span>";

        document.getElementById("breadcrumbsBody").innerHTML = htmlCode;

     
        if ( isMobile == "Y" ) {
            $('#breadcrumbsModal').modal('show');
        } else {
            document.getElementById("desktopBreadcrumb_" + currAppName).innerHTML = htmlCode;
        }
    }

    return(htmlCode);

}


