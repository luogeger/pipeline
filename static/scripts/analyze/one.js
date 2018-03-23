$.ajaxSettings.async = false;// 同步请求

var objFn;
var data = {
    results: '',
    chart: {
        yAxis: [],
        sTarget: [],
        sComplete: [],
    },
    yearTitle: {},
    yearTable: {},
    yearTotal: {},
    quarterTable: {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: [],
    },
};

$.getJSON('../static/json/one1.json', function (results) {
    data.results = results.msg;
});

//  处理数据
//  =========================================================
objFn = {
    settleData: function (res) {

        data.chart.yAxis.splice(0,      data.chart.yAxis.length);// 清空之前数组
        data.chart.sTarget.splice(0,    data.chart.sTarget.length);// 清空之前数组
        data.chart.sComplete.splice(0,  data.chart.sComplete.length);// 清空之前数组
        res.half.forEach(function (p1) {
            data.chart.yAxis.push(p1.saleGroup);
            data.chart.sTarget.push(p1.target);
            data.chart.sComplete.push(p1.complete);
        });
        data.yearTable = res.half;
        data.yearTitle = res.title;


        //  ==  季度数据
        if (data.results.h1.quarter.q1)
            data.results.h1.quarter.q1.forEach(function (p1, p2, p3) {
            data.quarterTable.Q1.push(p1)
        });
        if (data.results.h1.quarter.q2)
            data.results.h1.quarter.q2.forEach(function (p1, p2, p3) {
            data.quarterTable.Q2.push(p1)
        });
        if (data.results.h2.quarter.q3)
            data.results.h2.quarter.q3.forEach(function (p1, p2, p3) {
            data.quarterTable.Q3.push(p1)
        });

        if (data.results.h2.quarter.q4)
            data.results.h2.quarter.q4.forEach(function (p1, p2, p3) {
            data.quarterTable.Q4.push(p1)
        });


        // var keyQ;
        // for(key in data.quarterTable){
        //     if (data.quarterTable[key].length === 0) {
        //         data.quarterTable[key]
        //         keyQ = key;
        //         delete data.quarterTable[keyQ]
        //     }
        // }

    },

    chart: function () {
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
                data: data.chart.yAxis
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
                    data: data.chart.sTarget
                },
                {
                    name: '部门完成情况',
                    type: 'bar',
                    barMaxWidth: '20%',
                    color: '#FBC839',
                    itemStyle:{
                        barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
                    },
                    data: data.chart.sComplete
                }
            ]
        };
        box.setOption(option);
    },

    quarter: function (datas) {

    }
};// objFn


//  =========================================================
// == init
objFn.settleData(data.results.h1);
objFn.chart(data);
console.log(data.quarterTable)
// == 年度表格
var yearTable = new Vue({
    el: '#yearTable',
    data: {
        title: data.yearTitle,
        list: data.yearTable,
    }
});

// == 季度表格
var quarterTable = new Vue({
    el: '#quarterTable',
    data: {
        list: data.quarterTable.Q1,
        isActive: 'Q2',
        obj: data.quarterTable,
    },
    methods: {
        Qevent: function (index) {
            var _key = 'Q' + (index + 1);
            this.isActive = _key;
            this.list = data.quarterTable[_key];
        }
    }
});

// == 上半年
$('#yearHalfFirst').click(function () {
    objFn.settleData(data.results.h1);
    objFn.chart(data.chart);
    $('#yearHalfLast').removeClass('year-half-active');
    $(this).addClass('year-half-active');
    yearTable.list = data.yearTable;
    yearTable.title = data.yearTitle;
});


// == 下半年
$('#yearHalfLast').click(function () {
    objFn.settleData(data.results.h2);
    objFn.chart(data.chart);
    $('#yearHalfFirst').removeClass('year-half-active');
    $(this).addClass('year-half-active');
    yearTable.list = data.yearTable;
    yearTable.title = data.yearTitle;

    console.log(data.quarterTable)
});



