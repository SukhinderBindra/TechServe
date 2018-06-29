/* #####################################################################
   #
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */
   
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    var apiMethod = 'POST';


    function authenticationHandler(thisID)
    {

        switch(thisID) {
            case "login-form":
                var $lg_email=$('#login_email').val();
                var $lg_password=$('#login_password').val();
                if (!isValidEmailAddress($lg_email)) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Invalid email format.");
                    return false;
                }
                if ($lg_password.length < 2) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Password too short.");
                    return false;
                }
                axisAPILogin();
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error.");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK.");
                    modalAnimate(formLost, formResetPIN);
                }
                axisAPIGetNewPin();
                return false;
                break;

            case "register-form":
                var $rg_email=$('#register_email').val();
                var $rg_firstname=$('#register_firstname').val();
                var $rg_lastname=$('#register_lastname').val();
                var $rg_password=$('#register_password').val();
                var $rg_phone=$('#register_phone').val();

                if (!isValidEmailAddress($rg_email)) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Invalid email format.");
                    return false;
                }
                if ( $rg_phone.length == 0 ) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Person or Phone Number needed.");
                    return false;
                }
                axisAPIRegister();
                return false;
                break;

            case "reset-pin-form":
                var $rp_email=$('#resetpin_email').val();
                var $rp_password=$('#resetpin_password').val();
                var $rp_pin=$('#resetpin_pin').val();

                if (!isValidEmailAddress($rp_email)) {
                    msgChange($('#div-reset-pin-msg'), $('#icon-reset-pin-msg'), $('#text-reset-pin-msg'), "error", "glyphicon-remove", "Invalid email format.");
                    return false;
                }
                if ( $rp_password.length < 2 ) {
                    msgChange($('#div-reset-pin-msg'), $('#icon-reset-pin-msg'), $('#text-reset-pin-msg'), "error", "glyphicon-remove", "Password too short.");
                    return false;
                }

                if ( $rp_pin.length == 0 ) {
                    msgChange($('#div-reset-pin-msg'), $('#icon-reset-pin-msg'), $('#text-reset-pin-msg'), "error", "glyphicon-remove", "Enter PIN.");
                    return false;
                }
                axisAPIChangePasswordByPIN();
                return false;
                break;

            default:
                log("ERROR: Invalid form type!");
                return false;
        }
        return false;
    }
    
    
    function modalAnimate (oldForm, newForm) {
        oldForm.style.display = 'none';
        newForm.style.display = 'block';
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };


    function preparePayload(parameters) {

        var payload={};

        //--------------------------------------------------------------//
        // Parse the parameters and get values to pass.                 //
        // If value starts with '#', then get the value of the element. //
        //--------------------------------------------------------------//
        for (key in parameters) {
           val = parameters[key];

           if ( val.charAt(0) == '#' ) {
              var newKey = val.slice(1);
              val = document.getElementById(newKey).value;
           }
           payload[key] = val;
        }

        //--------------------------//
        // Add the credentials too. //
        //--------------------------//
        //var creds = appRules.loginCredentials;
        //for (key in creds) {
        //   val = creds[key];
        //   if ( val.length != 0 ) {
        //      payload[key] = val;
        //   }
        //}
     
        payload["AXIS_API_KEY"]=appRules.axisAPIKey;

        // log("payload=" + JSON.stringify(payload));
        return payload;
    }

    function axisAPILogin() {

        var payload = preparePayload(appRules.loginScreens.login);

        spinnerStart();
        $.ajax({
            url    : appRules.apiEndPoint,
            method : apiMethod,
            data   : payload
        })
        .done(function(data) {
            spinnerStop();
            if(data.returnStatus === 'SUCCESS') {
                appRules.loginCredentials.tokenId    = data.tokenId;
                appRules.loginCredentials.customerId = data.customerId;

                window.localStorage.setItem("tokenId", tokenId);
                window.localStorage.setItem("customerId", customerId);
                loadApps();
                window.scrollTo(0, 0);
            } else {
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Invalid user name or password.");
            }
        })
        .fail(function(jqXHR,status,error) {
            spinnerStop();
            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error.");
        });
    }


    function axisAPIRegister() {

        var payload = preparePayload(appRules.loginScreens.signup);
    
        spinnerStart();
        $.ajax({
            url: appRules.apiEndPoint,
            method: apiMethod,
            data: payload
        })
        .done(function(data) {
            spinnerStop();
            if(data.returnStatus === 'SUCCESS') {
                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK.");
                $('#login-modal').modal('hide');
                toast("Check your email for PIN.");
                window.scrollTo(0, 0);
            } else {
                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", data.statusMessage);
            }
        })
        .fail(function(jqXHR,status,error) {
            spinnerStop();
            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Registeration error.");
        });
    }

    function axisAPIChangePasswordByPIN() {

        var payload = preparePayload(appRules.loginScreens.changePassword);

        spinnerStart();
        $.ajax({
            url: appRules.apiEndPoint,
            method: apiMethod,
            data: payload
        })
        .done(function(data) {
            spinnerStop();
            if(data.returnStatus === 'SUCCESS') {

                msgChange($('#div-resetpin-msg'), $('#icon-resetpin-msg'), $('#text-resetpin-msg'), "success", "glyphicon-ok", "Password Changed.");

                tokenId = data.tokenId;
                customerId = data.customerId;

                window.localStorage.setItem("tokenId", tokenId);
                window.localStorage.setItem("customerId", customerId);
                loadApps();
                window.scrollTo(0, 0);

            } else {
                msgChange($('#div-resetpin-msg'), $('#icon-resetpin-msg'), $('#text-resetpin-msg'), "error", "glyphicon-remove", data.statusMessage);
            }
        })
        .fail(function(jqXHR,status,error) {
            spinnerStop();
            msgChange($('#div-resetpin-msg'), $('#icon-resetpin-msg'), $('#text-resetpin-msg'), "error", "glyphicon-remove", "Reset Using PIN error.");
        });
    }


    function axisAPIGetNewPin() {

        var payload = preparePayload(appRules.loginScreens.getPin);

        spinnerStart();
        $.ajax({
            url    : appRules.apiEndPoint,
            method : apiMethod,
            data   : payload
        })
        .done(function(data) {
            spinnerStop();
            if(data.returnStatus === 'SUCCESS') {
                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "PIN Sent.");
                modalAnimate(formLost, formResetPIN); 
                toast("Check your email for PIN.");
            } else {
                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", data.statusMessage);
            }
        })
        .fail(function(jqXHR,status,error) {
            spinnerStop();
            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Pin request error.");
        });
    }


    function logout() {

        var payload = { tokenId: appRules.loginCredentials.tokenId, 
                        customerId: appRules.loginCredentials.customerId,
                        AXIS_API: 'Logout',
                        AXIS_API_KEY: appRules.axisAPIKey
                      };

        spinnerStart();
        $.ajax({ url    : appRules.apiEndPoint, 
                 method : apiMethod, 
                 data   : payload })
        .done(function(data) {
            spinnerStop();
            window.localStorage.clear();
            window.location.reload();
        })
        .fail(function(jqXHR,status,error) {
            spinnerStop();
            window.localStorage.clear();
            window.location.reload();
        });
    }

    function axisExit() {
        window.location.replace('http://' + domainName);
    }

    function lightToast(message) {
        document.getElementById('light_toast').innerHTML=message;
        $('.light_toast').stop().fadeIn(300).delay(2000).fadeOut(300);
    }

    function darkToast(message) {
        document.getElementById('dark_toast').innerHTML=message;
        $('.dark_toast').stop().fadeIn(300).delay(2000).fadeOut(300);
    }

    function toast(message) {
        if ( appRules.toastType == "dark" ) {
            darkToast(message);
        } else {
            lightToast(message);
        }
    }

    function spinnerStart() {
        document.getElementById('axis_spinner').style.display = 'block';
    }

    function spinnerStop() {
        document.getElementById('axis_spinner').style.display = 'none';
    }


      var formLogin ;
      var formLost ;
      var formRegister ;
      var formResetPIN ;

      function buildLoginScreen() {

        var appLogo=appRules.logo;
        var appCode="";

        buildCSS();


        
        appCode+='  <div style="margin-top:-45px; XXposition:fixed; transform:translate(0%, -100%);">';
        appCode+='     <button style="padding-left:15px; padding-right:15px;margin-right:5px;" type="submit" id="login_button" class="btn btn-primary pull-right rounded"> <span> &nbsp Login &nbsp </span></button>';
        appCode+='  </div>';
        appCode+='  <div class="row" style="position:fixed; top:50%; transform:translate(5%, -50%); width:100%; align:middle;"  >';
        appCode+='    <div class="col-lg-4">';
        appCode+='    </div>';
        appCode+='    <div class="col-lg-4">';
        appCode+='      <img class="centered img-responsive" src="' + appLogo +  '" alt="logo img">';
        appCode+='      <br><br><br>';
        appCode+='      <span class="centered" style="width:90%; text-align:center;">' + appRules.loginCaption + '</span>' ;
        appCode+='      <br><br><br>';

        appCode+='      <form id="login-form" style="display:none;">';
        appCode+='          <div class="modal-body">';
        appCode+='              <div id="div-login-msg">';
        appCode+='                  <div id="icon-login-msg" class="glyphicon glyphicon-chevron-right"></div>';
        appCode+='                  <span id="text-login-msg">Login using email & password.</span>';
        appCode+='              </div>';
        appCode+='              <input id="login_email" class="form-control" autocomplete="off" type="text" placeholder="E-Mail" required>';
        appCode+='              <input id="login_password" class="form-control" type="password" placeholder="Password" required>';
        appCode+='          </div>';
        appCode+='          <div class="modal-footer">';
        appCode+='              <div>';
        appCode+='                  <button type="submit" onclick="authenticationHandler(\'login-form\');return false;" class="btn btn-primary btn-lg btn-block">Login</button>';
        appCode+='              </div>';
        appCode+='              <div>';
        appCode+='                  <button id="login_lost_btn" type="button" class="btn btn-link">Lost Password?</button>';
        appCode+='                  <button id="login_register_btn" type="button" class="btn btn-link">Register</button>';
        appCode+='                  <button id="login_resetpin_btn" type="button" class="btn btn-link">Use PIN</button>';
        appCode+='              </div>';
        appCode+='          </div>';
        appCode+='      </form>';

        appCode+='      <form id="lost-form" style="display:none;">';
        appCode+='          <div class="modal-body">';
        appCode+='              <div id="div-lost-msg">';
        appCode+='                  <div id="icon-lost-msg" class="glyphicon glyphicon-chevron-right"></div>';
        appCode+='                  <span id="text-lost-msg">Get password reset PIN.</span>';
        appCode+='              </div>';
        appCode+='              <input id="lost_email" class="form-control" autocomplete="off" type="text" placeholder="E-Mail" required>';
        appCode+='          </div>';
        appCode+='          <div class="modal-footer">';
        appCode+='              <div>';
        appCode+='                  <button type="submit" onclick="authenticationHandler(\'lost-form\');return false;" class="btn btn-primary btn-lg btn-block">Request PIN</button>';
        appCode+='              </div>';
        appCode+='              <div>';
        appCode+='                  <button id="lost_login_btn" type="button" class="btn btn-link">Log In</button>';
        appCode+='                  <button id="lost_register_btn" type="button" class="btn btn-link">Register</button>';
        appCode+='                  <button id="lost_resetpin_btn" type="button" class="btn btn-link">Use PIN</button>';
        appCode+='              </div>';
        appCode+='          </div>';
        appCode+='      </form>';

        appCode+='      <form id="register-form" style="display:block;">';
        appCode+='          <div class="modal-body">';
        appCode+='              <div id="div-register-msg">';
        appCode+='                  <div id="icon-register-msg" class="glyphicon glyphicon-chevron-right"></div>';
        appCode+='                  <span id="text-register-msg">Register an account.</span>';
        appCode+='              </div>';
        appCode+='              <input id="register_email" class="form-control" autocomplete="off" type="text" placeholder="E-Mail" required>';
        appCode+='              <input id="register_firstname" class="form-control" autocomplete="off" type="text" placeholder="First Name" >';
        appCode+='              <input id="register_lastname" class="form-control" autocomplete="off" type="text" placeholder="Last Name" >';
        appCode+='              <input id="register_password" class="form-control" autocomplete="off" type="text" placeholder="Password (Min 6 chars)" >';
        appCode+='              <input id="register_phone" class="form-control" autocomplete="off" type="text" placeholder="Phone Number" >';
        appCode+='          </div>';
        appCode+='          <div class="modal-footer">';
        appCode+='              <div>';
        appCode+='                  <button type="submit" onclick="authenticationHandler(\'register-form\');return false;" class="btn btn-primary btn-lg btn-block">Register</button>';
        appCode+='              </div>';
        appCode+='              <div>';
        appCode+='                  <button id="register_login_btn" type="button" class="btn btn-link">Log In</button>';
        appCode+='                  <button id="register_lost_btn" type="button" class="btn btn-link">Lost Password?</button>';
        appCode+='                  <button id="register_resetpin_btn" type="button" class="btn btn-link">Use PIN</button>';
        appCode+='              </div>';
        appCode+='          </div>';
        appCode+='      </form>';

        appCode+='      <form id="reset-pin-form" style="display:none;">';
        appCode+='          <div class="modal-body">';
        appCode+='              <div id="div-reset-pin-msg">';
        appCode+='                  <div id="icon-reset-pin-msg" class="glyphicon glyphicon-chevron-right"></div>';
        appCode+='                  <span id="text-reset-pin-msg">Reset password using PIN.</span>';
        appCode+='              </div>';
        appCode+='              <input id="resetpin_email" class="form-control" autocomplete="off" type="text" placeholder="E-Mail" required>';
        appCode+='              <input id="resetpin_password" class="form-control" type="password" placeholder="New Password" >';
        appCode+='              <input id="resetpin_pin" class="form-control" autocomplete="off" type="text" placeholder="PIN Number" >';
        appCode+='          </div>';
        appCode+='          <div class="modal-footer">';
        appCode+='              <div>';
        appCode+='                  <button type="submit" onclick="authenticationHandler(\'reset-pin-form\');return false;" class="btn btn-primary btn-lg btn-block">Use PIN</button>';
        appCode+='              </div>';
        appCode+='              <div>';
        appCode+='                  <button id="resetpin_login_btn" type="button" class="btn btn-link">Log In</button>';
        appCode+='                  <button id="resetpin_lost_btn" type="button" class="btn btn-link">Lost Password?</button>';
        appCode+='              </div>';
        appCode+='          </div>';
        appCode+='      </form>';
        appCode+='    </div>';
        appCode+='    <div class="col-lg-4">';
        appCode+='    </div>';
        appCode+='  </div>';


        document.getElementById("mainDiv").innerHTML = appCode; // + "<br><br><br><br><br>";

        formLogin    = document.getElementById('login-form');
        formLost     = document.getElementById('lost-form');
        formRegister = document.getElementById('register-form');
        formResetPIN = document.getElementById('reset-pin-form');

        $('#login_register_btn').click( function () { modalAnimate(formLogin, formRegister) });
        $('#register_login_btn').click( function () { modalAnimate(formRegister, formLogin); });
        $('#login_lost_btn').click( function () { modalAnimate(formLogin, formLost); });
        $('#lost_login_btn').click( function () { modalAnimate(formLost, formLogin); });
        $('#login_button').click( function () { modalAnimate(formRegister, formLogin); });

        $('#lost_register_btn').click( function () { modalAnimate(formLost, formRegister); });
        $('#register_lost_btn').click( function () { modalAnimate(formRegister, formLost); });

        $('#register_resetpin_btn').click( function () { modalAnimate(formRegister, formResetPIN); });
        $('#lost_resetpin_btn').click( function () { modalAnimate(formLost, formResetPIN); });
        $('#login_resetpin_btn').click( function () { modalAnimate(formLogin, formResetPIN); });

        $('#resetpin_login_btn').click( function () { modalAnimate(formResetPIN, formLogin); });
        $('#resetpin_lost_btn').click( function () { modalAnimate(formResetPIN, formLost); });

      }

