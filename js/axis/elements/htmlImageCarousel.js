function htmlImageCarousel( itemName, data, imageField, titleField, descField, rounded, backgroundColor) {

    var active = "active";
    var htmlCode="";    


    htmlCode+='<div style="text-align:center; margin:auto; background-color:#' + backgroundColor + ';" >';
    htmlCode+='<div id="' + itemName + '" class="carousel rounded slide " data-ride="carousel" style="background-color:#' + backgroundColor + ';">';
    htmlCode+='  <ol class="carousel-indicators" style="bottom:-50px;" >';

    for ( var recCnt=0; recCnt<data.length; recCnt++) {
      
         htmlCode+='<li style="margin-left:5px;margin-right:5px" data-target="#' + itemName + '" data-slide-to="' + recCnt + '" class="' + active + '"></li>';
         active="";
    }
    htmlCode+='  </ol>';

    active="active";
    htmlCode+='<div class="carousel-inner" style="margin-bottom:50px;" role="listbox">';

    for ( var recCnt=0; recCnt<data.length; recCnt++) {

        var currRec = data[recCnt];

        var url="";
        var title="";
        var desc="";

        url=currRec[imageField];
        if (typeof url == "undefined") {
            url="";
        }

        if ( titleField != "" ) {
            title=currRec[titleField];
            if (typeof title == "undefined") {
                title="";
            }
        }

        if ( descField != "" ) {
            desc=currRec[descField];
            if (typeof desc == "undefined") {
                desc="";
            }
        }

        var classList="";
   
        if ( rounded == "Y" ) {
            classList=' class="rounded" ';
        }

        if ( url != "" ) {
            htmlCode+='  <div class="item ' + active + '">';
            htmlCode+='    <img  ' + classList + ' src="' + url + '" alt="' + title + '">';
            htmlCode+='    <div class="carousel-caption">';
            htmlCode+='      <h3>' + title + '</h3>';
            htmlCode+='      <p>' + desc + '</p>';
            htmlCode+='    </div>';
            htmlCode+='  </div>';
        }

        active="";
    }


    if ( active == "" ) {
        // Show left and right arrows only if there is atleast one image to present.
        htmlCode+='  </div>';
        htmlCode+='    <a class="left rounded carousel-control" style="background-image: none;" href="#' + itemName + '" role="button" data-slide="prev">';
        htmlCode+='      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
        htmlCode+='      <span class="sr-only">Previous</span>';
        htmlCode+='    </a>';
        htmlCode+='    <a class="right rounded carousel-control" style="background-image: none;" href="#' + itemName + '" role="button" data-slide="next">';
        htmlCode+='      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
        htmlCode+='      <span class="sr-only">Next</span>';
        htmlCode+='    </a>';
        htmlCode+='  </div>';
        htmlCode+='</div>';
    } else {
        // Else empty ouf the htmlCode
        htmlCode="";
    }


//    postRenderFunctionsArray.push(
//        function() {
//            $(document).ready(function() {
//                $('.carousel').carousel({
//                    interval: 3200
//                })

//                $('.carousel').carousel('cycle');

//            });
//        }
//    );


    return(htmlCode);

}
