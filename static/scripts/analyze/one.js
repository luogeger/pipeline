$.ajaxSettings.async = false;// 同步请求

var objFn;
var data = {
    results: '',
    chart: {
        yAxis: [],
        sTarget: [],
        sComplete: [],
    },
    year: {
        h1: {
            head: {},
            body: {},
            foot: {}
        },
        h2: {
            head: {},
            body: {},
            foot: {}
        }
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
    floatCalc: function (arg1, arg2) {
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return (arg1*m+arg2*m)/m

    },

    stringCalc: function () {

    },

    settleData: function (flag) {
        // == 年度数据
        var H, title;
        if(flag === 1){
            H = 'h1';
            title = 'h1Title';
        } else {
            H = 'h2';
            title = 'h2Title';
        }
        // 图表数据
        data.chart.yAxis.splice(0,      data.chart.yAxis.length);// 清空之前数组
        data.chart.sTarget.splice(0,    data.chart.sTarget.length);// 清空之前数组
        data.chart.sComplete.splice(0,  data.chart.sComplete.length);// 清空之前数组

        data.results[H].half.forEach(function (p1) {
            data.chart.yAxis.push(p1.saleGroup);
            data.chart.sTarget.push(p1.target);
            data.chart.sComplete.push(p1.complete);
        });

        // 表格数据
        data.year[H].head = data.results[title];
        data.year[H].body = data.results[H].half;

        var target = [], complete = [], difference = [], scale = [];
        data.results[H].half.forEach(function (p1) {
            target.push(p1.target);
            complete.push(p1.complete);
            difference.push(p1.difference);
            scale.push(p1.scale);
        });
        function sum(arr) {
            var s = 0;
            for (var i=arr.length-1; i>=0; i--) {
                //s += arr[i];
                if (typeof arr[i] == 'string') {
                    arr[i] = arr[i].substring(0, arr[i].length -1);
                    //arr[i] = Number(arr[i]);
                    console.log(arr[i])
                    s = objFn.floatCalc(s, arr[i]);
                } else{
                    s = objFn.floatCalc(s, arr[i]);
                }

            }
            if (typeof arr[0] == 'string') {
                return s + '%';
            }
            return s;
        };

        var yearTableTotal = {
            saleGroup: '合计',
            target: sum(target),
            complete: sum(complete),
            difference: sum(difference),
            scale: sum(scale),
        };

        data.year[H].foot = yearTableTotal;





        //  ==  季度数据
        // if (data.results.h1.quarter.q1)
        //     data.results.h1.quarter.q1.forEach(function (p1, p2, p3) {
        //     data.quarterTable.Q1.push(p1)
        // });
        // if (data.results.h1.quarter.q2)
        //     data.results.h1.quarter.q2.forEach(function (p1, p2, p3) {
        //     data.quarterTable.Q2.push(p1)
        // });
        // if (data.results.h2.quarter.q3)
        //     data.results.h2.quarter.q3.forEach(function (p1, p2, p3) {
        //     data.quarterTable.Q3.push(p1)
        // });
        //
        // if (data.results.h2.quarter.q4)
        //     data.results.h2.quarter.q4.forEach(function (p1, p2, p3) {
        //     data.quarterTable.Q4.push(p1)
        // });


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
objFn.settleData(1);
objFn.chart(data);
// == 年度表格
var yearTable = new Vue({
    el: '#yearTable',
    data: {
        title: data.year.h1.head,
        list: data.year.h1.body,
        foot: data.year.h1.foot,
    }
});

// == 季度表格
// var quarterTable = new Vue({
//     el: '#quarterTable',
//     data: {
//         list: data.quarterTable.Q1,
//         isActive: 'Q2',
//         obj: data.quarterTable,
//     },
//     methods: {
//         Qevent: function (index) {
//             var _key = 'Q' + (index + 1);
//             this.isActive = _key;
//             this.list = data.quarterTable[_key];
//         }
//     }
// });

// == 上半年
$('#yearHalfFirst').click(function () {
    objFn.settleData(1);
    objFn.chart(data.chart);
    $('#yearHalfLast').removeClass('year-half-active');
    $(this).addClass('year-half-active');
    yearTable.title = data.year.h1.head;
    yearTable.list = data.year.h1.body;
    yearTable.foot = data.year.h1.foot;
});


// == 下半年
$('#yearHalfLast').click(function () {
    objFn.settleData(2);
    objFn.chart(data.chart);
    $('#yearHalfFirst').removeClass('year-half-active');
    $(this).addClass('year-half-active');
    yearTable.title = data.year.h2.head;
    yearTable.list = data.year.h2.body;
    yearTable.foot = data.year.h2.foot;
});



