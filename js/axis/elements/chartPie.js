var chartCounter=1;
function chartPie(itemID, label, chartData, valueField, labelField, legentEnabled, holeRadius) {

    var htmlCode="";    

    chartCounter+=1;

    htmlCode+='<div>';
    htmlCode+='    <label  class="axis-label" style="text-align: center; width:100%;">' + label + '</label>';
    htmlCode+='     <div id="' + itemID + chartCounter + '" class="infoviz"></div>';
    htmlCode+='</div>';


    postRenderFunctionsArray.push(
        function() {
            var chartVersion=jsVersion;
            var chartItemID=itemID + chartCounter;

            seajs.use([ '/axisGUI/js/ver_' + chartVersion + '/external/infoviz' ], function (InfoViz) {

                InfoViz.clear(chartItemID);

                InfoViz.global_option({
                    'layout': { 'background-color': '#' + appRules.backgroundColor }
                });

                InfoViz.chart(
                     chartItemID ,
                    "piechart",
                    {
                        "value_field": valueField,
                        "label_field": labelField,
                        "tooltip_title": "{" + labelField + "}",
                        "tooltip_content": "Value {" + valueField + "}",
                        "data": chartData
                    },
                    {
                        "layout": { "shadow-enabled": true },
                        "legend": { "legend-enabled": legentEnabled },
                        "piechart": { "hole-radius": holeRadius }
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
