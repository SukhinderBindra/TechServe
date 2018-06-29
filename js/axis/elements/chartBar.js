var barChartCounter=1;
function chartBar(itemID, label, chartData, valueField, labelField, XAxisName, YAxisName, paddingBottom) {

    var htmlCode="";    

    barChartCounter+=1;

    htmlCode+='<div>';
    htmlCode+='    <label  class="axis-label" style="text-align: center; width:100%;">' + label + '</label>';
    htmlCode+='     <div id="' + itemID + barChartCounter + '" class="infoviz"></div>';
    htmlCode+='</div>';


    postRenderFunctionsArray.push(
        function() {
            var chartVersion=jsVersion;
            var chartItemID=itemID + barChartCounter;

            seajs.use([ '/axisGUI/js/ver_' + chartVersion + '/external/infoviz' ], function (InfoViz) {

                InfoViz.clear(chartItemID);

                InfoViz.global_option({
                    'layout': { 'background-color': '#' + appRules.backgroundColor }
                });

                InfoViz.chart(
                     chartItemID ,
                    "barchart",
                    {
                        "vertical_axis_name": YAxisName,
                        "horizontal_axis_name": XAxisName,
                        "horizontal_field": labelField,
                        "vertical_field": valueField,
                        "tooltip_title": "{" + labelField + "}",
                        "tooltip_content": "Value {" + valueField + "}",
                        "data": { 'bar' : { 'axis': 0,
                                            'data': chartData 
                                          } }
                    },
                    {
                        "grid"  : {
                                    "padding-bottom": paddingBottom, 
                                    "horizontal-label-rotate": 30
                                  },
                        "layout": { "shadow-enabled": true },
                        "legend": { "legend-enabled": false }
                    },
                    function(info) {
                        console.log(info);
                    } 
                );
           });
        }
    );

    return(htmlCode);

}
