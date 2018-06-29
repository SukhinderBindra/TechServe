function loadApps() {

  var appLogo=appRules.logo;
  var headerBgColor=appRules.headerBgColor;
  var headerTextColor=appRules.headerTextColor;
  var footerBgColor=appRules.footerBgColor;
  var footerTextColor=appRules.footerTextColor;
  var footerShowLabel=appRules.footerShowLabel;
  var appLogo=appRules.logo;
  var logoSizePct=appRules.logoSizePct;
  var appsList=appRules.apps;
  var appCode="";


  if ( !footerShowLabel ) {
    footerShowLabel="Y";
  }
  buildCSS();

  /*----------------*/
  /* Build top menu */
  /*----------------*/
  appCode+='    <nav style="display:block;background:#' + headerBgColor + '" class="navbar navbar-default navbar-fixed-top templatemo-nav" role="navigation">';
  appCode+='        <div class="container-fluid" style="margin-left:20px; margin-right:20px">';
  appCode+='            <div class="navbar-header">';
  appCode+='                <div id="header_backButton"></div>';
  if ( isMobile == "Y" ) {
      appCode+='                <h3 class="centered" style="vertical-align:middle; margin-top:10px; color:#' + headerTextColor + ';" onclick="showBreadCrumbs();" id="axis_mobile_title"> </h3>';
  } else {
      appCode+='                <h3 class="centered" style="vertical-align:middle; margin-top:10px; color:#' + headerTextColor + ';" onclick="showBreadCrumbs();" id="axis_mobile_title"> </h3>';
  }
  appCode+='                <div id="header_subMenu"></div>';
  appCode+='            </div>';

  appCode+='    </div>';
  appCode+='  </nav>';
  appCode+='  <br>'; //One looks OK on the mobile view.

  if ( isMobile != "Y" ) {
    appCode+='  <br><br>';
  }


  /*---------------------------------*/
  /* Build the body of the sections. */
  /*---------------------------------*/
  if ( isMobile == "Y" ) {

    for (var Counter=0; Counter< appsList.length; Counter++) {
      appName  = appsList[Counter].appName;
      subMenus = appsList[Counter].subMenus;
      appCode+='            <section id="section_' + appName + '" style="margin-right:0px;display:none ">';
      appCode+='              <div class="container-fluid" style="margin-right:0px">';
      appCode+='                <div class="row" style="width:100%; margin-left:0px; margin-right:0px;">';
      appCode+='                  <div class="col-lg-12">';
  
      /*----------------------------------------*/
      /* This is what is presented in the view. */
      /*----------------------------------------*/
      appCode+='                    <div id="screen_' +  appName + '"></div>';
  
      /*--------------------------------------------------*/
      /* Build the footer menu if any subMenu is defined. */
      /*--------------------------------------------------*/
      var numSubMenus = subMenus.length;
      if (numSubMenus > 0 ) {
          var subMenuSize;
  
          switch (numSubMenus) {
              case 1 : subMenuSize=12; break;
              case 2 : subMenuSize=6;  break;
              case 3 : subMenuSize=4;  break;
              case 4 : subMenuSize=3;  break;
              case 5 : subMenuSize=2;  break;
              case 6 : subMenuSize=2;  break;
              default : subMenuSize=1;
          }
  
          appCode+='<div id="footer_' + appName + '" >';
          if ( numSubMenus == 5 ) {
              appCode+='<div class="row navbar-fixed-bottom">';
              appCode+='  <div class="col-xs-12">';
              appCode+='  <div class="row">';
              appCode+='  <div class="col-xs-12">';
          } else {
              appCode+='  <div class="col-xs-12 navbar-fixed-bottom">';
          }
          appCode+='    <div class="row" style="background:#' + footerBgColor + '; border-style:solid; border-top-color:#' + footerBgColor + '; border-width:1px 0px 0px 0px; margin-bottom:0px; margin-top:8px">';
  
          var xtraPadding = "";
  
          for (var subMenuCnt=0; subMenuCnt < numSubMenus; subMenuCnt++ ) {
              currSubMenuLogo=subMenus[subMenuCnt].subMenuLogo;
              currSubMenuText=subMenus[subMenuCnt].subMenuText;
              currSubMenuScreen=subMenus[subMenuCnt].screenName;
  
              if ( numSubMenus == 5 ) {
                  xtraPadding=" margin-left:10px; padding-left:10px; ";
              }
  
              appCode+='    <div style="' + xtraPadding + ';" class="col-xs-' + subMenuSize + ' text-center">';
              appCode+='      <a class="axis-footer-icon" href="#" onclick="getDataAndRenderScreen(\'' + appName + '\', \'' + currSubMenuScreen + '\', \'Y\');return false;">';
              appCode+='        <i class="fa ' + currSubMenuLogo + ' axis-footer-icon" style="font-size:40px;margin-top:7px;margin-bottom:0px;"></i>';
              if ( footerShowLabel == "Y" ) {
                appCode+='        <br><span class="axis-footer-icon" >' + currSubMenuText + '</span>';
              }
              appCode+='    </a></div>';
          }
          appCode+='    </div>';
          appCode+='  </div>';
  
          if ( numSubMenus == 5 ) {
              appCode+='  </div>';
              appCode+='  </div>';
              appCode+='</div>';
          }

          appCode+='</div>';
      }

      appCode+='                  </div>';
      appCode+='                </div>';
      appCode+='              </div>';
      appCode+='            </section>';

    }

  } else {

    //------------------------------//
    //      Begin Desktop Menu      //
    //------------------------------//
   
    appCode+='<div class="row">';   // LAYOUT GRID
    appCode+='  <div class="col-sm-8">'; // CENTER GRID
    
    for (var Counter=0; Counter< appsList.length; Counter++) {
      appName  = appsList[Counter].appName;
      subMenus = appsList[Counter].subMenus;
      appCode+='            <div id="section_' + appName + '" style="display:none;">'; // Section Start
      appCode+='                <div class="row" style="width:100%; margin-left:0px; margin-right:0px;">'; // Row Start
  
      /*--------------------------------------------------*/
      /* Build the sub - menu if any subMenu is defined. */
      /*--------------------------------------------------*/
      var numSubMenus = subMenus.length;
      if (numSubMenus > 0 ) {
          var subMenuSize;
  
          switch (numSubMenus) {
              case 1 : subMenuSize=12; break;
              case 2 : subMenuSize=6;  break;
              case 3 : subMenuSize=4;  break;
              case 4 : subMenuSize=3;  break;
              case 5 : subMenuSize=2;  break;
              case 6 : subMenuSize=2;  break;
              default : subMenuSize=1;
          }
  
          active=" active";
          appCode+='<div class="row" style="margin-left:5px;">';  // ROW - Start
          appCode+='    <div class="col-sm-3" id="desktopSubMenu_' + appName + '" style="background-color:#' + footerBgColor + '">'; // Submenu - Start

          appCode+='      <div class="navbar navbar-static-top navbar-fixed-left navbar-custom1" ';  // navbar - Start
          appCode+='           id="desktopLeftMenu_' + appName + '"';                                       
          appCode+='           style="padding-left:0px; margin-left:0px; white-space: nowrap; font-size: 120%; background-color:#' + footerBgColor + '">';

          appCode+='        <br>';
          appCode+='        <ul  id="footer_' + appName + '" class="nav navbar-nav">';
          for (var subMenuCnt=0; subMenuCnt < numSubMenus; subMenuCnt++ ) {
              currSubMenuLogo=subMenus[subMenuCnt].subMenuLogo;
              currSubMenuText=subMenus[subMenuCnt].subMenuText;
              currSubMenuScreen=subMenus[subMenuCnt].screenName;
              appCode+='    <li style="width:100%" role="presentation" class="' + active + '">';
              appCode+='      <a href="#' + currSubMenuText + '" aria-controls="' + currSubMenuText + '" ';
              appCode+='          role="tab" onclick="getDataAndRenderScreen(\'' + appName + '\', \'' + currSubMenuScreen + '\', \'Y\');return false;" ';
              appCode+='          data-toggle="tab" style="color:#' + footerTextColor + '">';
              appCode+='        <h5> <i class="fa ' + currSubMenuLogo + '" ></i>  &nbsp ' + currSubMenuText + '</h5>';
              appCode+='      </a>';
              appCode+='    </li>';
              active="";
          }
          appCode+='        </ul>';
          appCode+='      </div>'; // navbar - End

          // Breadcrumbs for desktop
          appCode+='      <div class="navbar navbar-static-top navbar-fixed-left navbar-custom1" ';
          appCode+='           id="desktopBreadcrumb_' + appName + '"';                                       
          appCode+='           style="display:none;padding-left:0px; margin-left:0px; ; white-space: nowrap; font-size: 120%; background-color:#' + footerBgColor + '">';
          appCode+='      </div>';

          appCode+='    </div>'; // Submenu - End

          // Body of the screen show shere.
          appCode+='    <div class="col-sm-9">';
          appCode+='         <div class="container-fluid" id="screen_' +  appName + '" >';
          appCode+='         </div>';
          appCode+='    </div>';

          appCode+='</div>';  // ROW - End

        }



        appCode+='        </div>';   // Row End
        appCode+='</div>';             // Section End

      }

      appCode+='</div>';  // CENTER GRID


      //--------------------------------
      // Right side of the desktop page.
      //--------------------------------
      appCode+='  <div class="col-sm-4">'; // EAST - Start
      appCode+='      <div class="videoWrapper">'; 
      appCode+='          <iframe id="rightFrame" class="pull-right" src="" ';
      appCode+='                  style="width:100%;height:550px;" ';
      appCode+='                  onload="window.parent.scrollTo(0,0);" ';
      appCode+='                  frameBorder="0" XXallowfullscreen>';
      appCode+='          </iframe>';
      appCode+='      </div>'; 
      appCode+='  </div>'; // EAST - End

      appCode+='</div>';  // LAYOUT GRID

  } // End Desktop Menu //

  document.getElementById("mainDiv").innerHTML = appCode + "<br><br><br><br><br>";
  $('#section_' + appsList[0].appName).css('display', 'block');

  currAppName=appsList[0].appName;

  firstScreen=appsList[0].subMenus[0].screenName; 

  currScreenName=firstScreen;

  getDataAndRenderScreen(currAppName, firstScreen, "Y");



}

