function ratingStars(itemName, hint, label, value) {

    var ratingCode="";    
 
    var checkedString1="";
    var checkedString2="";
    var checkedString3="";
    var checkedString4="";
    var checkedString5="";

    if ( value ) {
        switch (value) {
            case 1: checkedString1=' checked="checked" ';
                    break;
            case 2: checkedString2=' checked="checked" ';
                    break;
            case 3: checkedString3=' checked="checked" ';
                    break;
            case 4: checkedString4=' checked="checked" ';
                    break;
            case 5: checkedString5=' checked="checked" ';
                    break;
        }
    }

    if ( hint != "" ) {
        ratingCode+='<div class="axis-tooltip" style="display:inline-block">';
        ratingCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        ratingCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        ratingCode+='   </a>';
        ratingCode+='</div>&nbsp';
    }

    ratingCode+='<label class="axis-label" >' + label + '</label><br>';
    ratingCode+='<div id="' + itemName + '" class="acidjs-rating-stars">';
    ratingCode+='    <form>';
    ratingCode+='        <input type="radio" name="' + itemName + '" id="' + itemName + '-5" value="5" ' + checkedString5 + '/><label for="' + itemName + '-5"></label>';
    ratingCode+='        <input type="radio" name="' + itemName + '" id="' + itemName + '-4" value="4" ' + checkedString4 + '/><label for="' + itemName + '-4"></label>';
    ratingCode+='        <input type="radio" name="' + itemName + '" id="' + itemName + '-3" value="3" ' + checkedString3 + '/><label for="' + itemName + '-3"></label>';
    ratingCode+='        <input type="radio" name="' + itemName + '" id="' + itemName + '-2" value="2" ' + checkedString2 + '/><label for="' + itemName + '-2"></label>';
    ratingCode+='        <input type="radio" name="' + itemName + '" id="' + itemName + '-1" value="1" ' + checkedString1 + '/><label for="' + itemName + '-1"></label>';
    ratingCode+='    </form>';
    ratingCode+='</div>';

    elementDataTypes[ itemName ] = 'ratingStars';

    return(ratingCode);

}


function getRatingStars(itemName) { 
    
    if ( document.getElementById(itemName + '-1').checked ) { 
        return(1);
    }

    if ( document.getElementById(itemName + '-2').checked ) { 
        return(2);
    }

    if ( document.getElementById(itemName + '-3').checked ) { 
        return(3);
    }

    if ( document.getElementById(itemName + '-4').checked ) { 
        return(4);
    }

    if ( document.getElementById(itemName + '-5').checked ) { 
        return(5);
    }

    return(0);

}
