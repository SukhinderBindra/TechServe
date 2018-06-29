// Get Font Awosome Icon name for the user.
function inputIcon(itemName, hint, label, required, value) {

    var currCode="";    

    if ( value == "" ) {
        value="fa-save";
    }

    if ( hint != "" ) {
        currCode+='<div class="axis-tooltip" style="display:inline-block"> ';
        currCode+='   <a title="' + hint + '" data-html="true" rel="tooltip">';
        currCode+='       <span class="axis-label glyphicon glyphicon-question-sign"></span>';
        currCode+='   </a>';
        currCode+='</div>&nbsp';
    }

    currCode+='<label class="axis-label" >' + label +  '</label><label class="axis-icon"></label><br>';

    currCode+='<div id="icon_' + itemName + '" class="form-group">';
    currCode+='  <div class="input-group">';
    currCode+='    <input id="' + itemName + '" data-placement="bottomRight" class="form-control icp icp-auto" value="' + value + '" type="text" />';
    currCode+='    <span class="input-group-addon axis-icon"></span>';
    currCode+='  </div>';
    currCode+='</div>';

    currCode+='<span class="axis-icon" style="display:none; font-size: calc(100% - 4px);" id="axis_message_' + itemName + '"></span>';

    elementDataTypes[ itemName ] = 'icon';

    postRenderFunctionsArray.push(
        function() {

            $.iconpicker.batch('.icp.iconpicker-element', 'destroy');

            // Live binding of buttons
            $(document).on('click', '.action-placement', function(e) {
                $('.action-placement').removeClass('active');
                $(this).addClass('active');
                $('.icp-opts').data('iconpicker').updatePlacement($(this).text());
                e.preventDefault();
                return false;
            });

            $('.icp-auto').iconpicker();

            $('.icp-dd').iconpicker({
                //title: 'Dropdown with picker',
                //component:'.btn > i'
            });

            $('.icp-glyphs').iconpicker({
                title: 'Prepending glypghicons',
                icons: $.merge(['glyphicon-home', 'glyphicon-repeat', 'glyphicon-search',
                    'glyphicon-arrow-left', 'glyphicon-arrow-right', 'glyphicon-star'], $.iconpicker.defaultOptions.icons),
                fullClassFormatter: function(val){
                    if(val.match(/^fa-/)){
                        return 'fa '+val;
                    }else{
                        return 'glyphicon '+val;
                    }
                }
            });
            // Events sample: This event is only triggered when the actual input value is changed by user interaction
            $('.icp').on('iconpickerSelected', function(e) {
                  $('.iconpicker-popover').hide();
            });
        }
    );

    return(currCode);
}

function isValidInputIcon(itemName) {
    var element = document.getElementById(itemName);
    var msgElement = document.getElementById('axis_message_' + itemName);
    var required = element.getAttribute("required");
    var inputValue=document.getElementById(itemName).value;

    element.classList.remove('error');
    msgElement.style.display = "none";

    if ( required == "Y" && inputValue == "" ) {
        element.classList.add('error');
        msgElement.innerHTML="Icon required.";
        msgElement.style.display = "block";
        return(false);
    }

    return(true);
}

function getInputIcon(itemName) {
    return( document.getElementById(itemName).value ) ;
}
