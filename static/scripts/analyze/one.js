$.ajaxSettings.async = false;// 同步请求

var objFn;
var data = {
    results: '',
    yAxis: [],
    sTarget: [],
    sComplete: [],
};


$.getJSON('../static/json/one.json', function (results) {
    data.results = results.msg;
});



objFn = {
    settleData: function (results) {
        data.yAxis.splice(0, data.yAxis.length);
        data.sTarget.splice(0, data.sTarget.length);
        data.sComplete.splice(0, data.sComplete.length);
        results.half.forEach(function (p1) {
            data.yAxis.push(p1.saleGroup)
            data.sTarget.push(p1.target)
            data.sComplete.push(p1.complete)
        });
    },

    half: function (datas) {
        var box = echarts.init(document.getElementById('halfYearChart'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['部门目标', '部门完成情况'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                name: '合同额完成后进度(万元)',
                type: 'category',
                nameTextStyle:{
                    color: '#000',
                    fontSize: '16',
                    fontWeight: '600',
                },
                data: datas.yAxis
            },
            series: [
                {
                    name: '部门目标',
                    type: 'bar',
                    barMaxWidth: '20%',
                    color: '#E56F0B',
                    itemStyle:{
                        barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
                    },
                    //data: [18203, 23489, 29034, 104970, 131744]
                    data: datas.sTarget
                },
                {
                    name: '部门完成情况',
                    type: 'bar',
                    barMaxWidth: '20%',
                    color: '#FBC839',
                    itemStyle:{
                        barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
                    },
                    //data: [19325, 23438, 31000, 121594, 134141]
                    data: datas.sComplete
                }
            ]
        };
        box.setOption(option);
    },

    quarter: function (datas) {

    }
};// objFn

// == init
objFn.settleData(data.results.h1);
objFn.half(data);

// == 上半年
$('#yearHalfFirst').click(function () {
    objFn.settleData(data.results.h1);
    objFn.half(data);
    $('#yearHalfLast').removeClass('year-half-active');
    $(this).addClass('year-half-active');
})


// == 下半年
$('#yearHalfLast').click(function () {
    objFn.settleData(data.results.h2);
    objFn.half(data);
    $('#yearHalfFirst').removeClass('year-half-active');
    $(this).addClass('year-half-active');
})