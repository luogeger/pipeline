$.ajaxSettings.async = false;// 同步请求

var objFn;
var data = {
    results: '',
    aYear: 2018,
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
    quarter: {
        Q1: {

        },
        Q2: {

        },
        Q3: {

        },
        Q4: {

        },

    },
};

$.getJSON(PATH +'/a/contractVolume?aYear='+ data.aYear, function (datas) {
    console.log(datas)
    data.results = datas.msg;
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

        data.year[H].foot = {
            saleGroup: '合计',
            target: sum(target),
            complete: sum(complete),
            difference: sum(difference),
            scale: sum(scale),
        };







        //  ==  季度数据
        function Qsum (arr) {
            var target = [], complete = [], difference = [], scale = [],
                m1 = [], m2 =[], m3 =[], c1 =[], c2 =[], c3 = [];
            arr.body.forEach(function (p1) {
                target.push(p1.target);
                complete.push(p1.complete);
                difference.push(p1.difference);
                scale.push(p1.scale);
                m1.push(p1.m1Target);
                m2.push(p1.m2Target);
                m3.push(p1.m3Target);
                c1.push(p1.m1Complete);
                c2.push(p1.m2Complete);
                c3.push(p1.m3Complete);
            });
            arr.foot = {
                saleGroup: '合计',
                target: sum(target),
                complete: sum(complete),
                difference: sum(difference),
                scale: sum(scale),
                m1: sum(m1),
                m2: sum(m2),
                m3: sum(m3),
                c1: sum(c1),
                c2: sum(c2),
                c3: sum(c3),
            }


        };// Qsum
        if (data.results.h1.quarter.q1) {
            data.quarter.Q1.head = data.results.h1.quarter.q1Title;
            data.quarter.Q1.body = data.results.h1.quarter.q1;
            Qsum (data.quarter.Q1);
        }
        if (data.results.h1.quarter.q2) {
            data.quarter.Q2.head = data.results.h1.quarter.q2Title;
            data.quarter.Q2.body = data.results.h1.quarter.q2;
            Qsum (data.quarter.Q2);
        }
        if (data.results.h2.quarter.q3) {
            data.quarter.Q3.head = data.results.h2.quarter.q3Title;
            data.quarter.Q3.body = data.results.h2.quarter.q3;
            Qsum (data.quarter.Q3);
        }
        if (data.results.h2.quarter.q4) {
            data.quarter.Q4.head = data.results.h2.quarter.q4Title;
            data.quarter.Q4.body = data.results.h2.quarter.q4;
            Qsum (data.quarter.Q4);
        }
        console.log(data.quarter)
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
var quarterTable = new Vue({
    el: '#quarterTable',
    data: {
        Q: data.quarter,
        head: data.quarter.Q1.head,
        list: data.quarter.Q1.body,
        foot: data.quarter.Q1.foot,
        isActive: '',
        currentTime: timeYear,
    },

    created:function () {
        var month = this.currentTime.substring(5,7);
        var arr = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
        var qActiveIndex;
        arr.forEach(function (p1, p2) {
            p1.forEach(function (p1) {
                if (Number(month) === p1) {
                    qActiveIndex = p2;
                }
            })
        })

        this.Qevent(qActiveIndex);// 选中当前季度
    },

    methods: {
        Qevent: function (index) {
            var _key = 'Q' + (index + 1);
            this.isActive = _key;

            this.head = data.quarter[_key].head;
            this.list = data.quarter[_key].body;
            this.foot = data.quarter[_key].foot;
        },

        // 计算当前的季度

    }
});

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



