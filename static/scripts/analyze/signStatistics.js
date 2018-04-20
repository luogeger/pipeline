var vm = new Vue({
    el: '#signStatistics',
    data: {
        // 下拉框年份选择
        yearRange: [
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
        ],
        selectionDefaultText: currentYear,
        selectionIsShow: false,


        // chart
        legendName: ['部门目标', '部门完成情况'],
        legendColor: ['#E56F0B', '#FBC839'],
        chartYAxis: [],
        chartTarget: [],
        chartComplete: [],

        // 年份
        halfYearActive: -1,
        year: {
            head: {},
            body: [],
            foot: {},

            h1: {
                head: {},
                body: [],
            },
            h2: {
                head: {},
                body: [],
            },
        },

        // 季度
        currentQuarterIndex: -1,// 当前季度
        quarterTabActive: -1,// 当前季度的样式排除
        quarter: {
            quarterTotal: {},
            head: {},
            body: [],
            foot: {},
        },
    },// data

    created: function () {
        this.getData(null, ()=>{
            this.changeHalfYear()
            this.yearChart()
            this.currentQuarter()
            this.changeQuarter()
        })
    },

    methods: {
        // 获取数据
        getData: function (year, callback) {
            year = year || currentYear;
            axios.get(PATH +'/a/contractVolume?aYear='+ year).then(function (datas){
                var data = datas.data;
                var msg  = data.msg;
                console.log(data)
                vm.year.h1.head        = msg.h1Title;
                vm.year.h1.body        = msg.h1.half;
                vm.year.h2.head        = msg.h2Title;
                vm.year.h2.body        = msg.h2.half;
                vm.quarter.quarterTotal          = Object.assign(msg.h1.quarter, msg.h2.quarter);// 所以季度信息
                if (callback) callback();
            });
        },

        // 渲染图表
        yearChart: function () {
            var box = echarts.init(document.getElementById('halfYearChart'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: this.legendName,
                },
                grid: {
                    left: '2%',
                    right: '2%',
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
                        fontSize: '14',
                        fontWeight: '600',
                    },
                    data: this.chartYAxis,
                },
                series: [
                    {
                        name: this.legendName[0],
                        type: 'bar',
                        barMaxWidth: '20%',
                        color: this.legendColor[0],
                        itemStyle:{
                            barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: this.chartTarget,
                    },
                    {
                        name: this.legendName[1],
                        type: 'bar',
                        barMaxWidth: '20%',
                        color: this.legendColor[1],
                        itemStyle:{
                            barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: this.chartComplete,
                    }
                ]
            };
            box.setOption(option);
        },

        // 半年切换
        changeHalfYear: function (type) {
            type = type || 1;
            var half = 'h' + type;
            this.halfYearActive = type;
            this.year.head = this.year[half].head;
            this.year.body = this.year[half].body;
            total(this.year[half].body);// 合计

            // 图表切换


            // 合计
            function total (arr) {
                var target = [], complete = [], difference = [], scale = [], group =[];
                arr.forEach(function (item) {
                    target.push(item.target)
                    complete.push(item.complete)
                    difference.push(item.difference)
                    scale.push(item.scale)
                    group.push(item.saleGroup)
                });

                function sum (arr) {
                    var s=0, i;
                    for (i=arr.length-1; i>=0; i--) {
                        if (typeof arr[i] === 'string') {
                            arr[i] = arr[i].substring(0, arr[i].length -1);
                            s = accAdd(s, arr[i]);
                        } else{
                            s = accAdd(s, arr[i]);
                        }
                    }
                    if (typeof arr[0] === 'string') {
                        return s + '%';
                    }
                    return s;
                }

                function scaleNum() {
                    var div = Math.floor((sum(complete) / sum(target)) * 10000) / 10000;
                    div = Number(div*100).toFixed(1);
                    div += "%";
                    return div;
                };

                vm.chartYAxis       = group;// 图表X轴数据
                vm.chartTarget      = target;// 图表X轴数据
                vm.chartComplete    = complete;// 图表X轴数据
                vm.yearChart();
                vm.year.foot = {
                    saleGroup:  '合计',
                    target:     sum(target),
                    complete:   sum(complete),
                    difference: sum(difference),
                    scale:      scaleNum(),
                };
            };
        },// changeHalfYear

        // 当前季度
        currentQuarter: function currentQuarter() {
            var month = timeYear.substring(5,7);
            var arr = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
            var quarter;
            arr.forEach(function (p1, p2) {
                p1.forEach(function (p1) {
                    if (Number(month) === p1) {
                        quarter = p2;
                    }
                })
            })
            this.currentQuarterIndex = quarter;
            // return quarter;
        },

        // 季度切换
        changeQuarter: function (index) {
            // 更换季度索引
            if (index === undefined) index = this.currentQuarterIndex;
            this.quarterTabActive = index;// 选中当前季度

            // 更换表格数据
            var body = 'q' + (index +1);
            var head = body +'Title';
            this.quarter.head = this.quarter.quarterTotal[head];
            this.quarter.body = this.quarter.quarterTotal[body];
            total(this.quarter.body);// 计算合计

            // 合计
            function total (arr) {
                var target = [], complete = [], difference = [], scale = [],
                    m1 = [], m2 =[], m3 =[], c1 =[], c2 =[], c3 = [];
                arr.forEach(function (item) {
                    target.push(item.target);
                    complete.push(item.complete);
                    difference.push(item.difference);
                    scale.push(item.scale);
                    m1.push(item.m1Target);
                    m2.push(item.m2Target);
                    m3.push(item.m3Target);
                    c1.push(item.m1Complete);
                    c2.push(item.m2Complete);
                    c3.push(item.m3Complete);
                });

                function sum (arr) {
                    var s=0, i;
                    for (i=arr.length-1; i>=0; i--) {
                        if (typeof arr[i] === 'string') {
                            arr[i] = arr[i].substring(0, arr[i].length -1);
                            s = accAdd(s, arr[i]);
                        } else{
                            s = accAdd(s, arr[i]);
                        }
                    }
                    if (typeof arr[0] === 'string') {
                        return s + '%';
                    }
                    return s;
                }

                function scaleNum(complete, target) {
                    var div = Math.floor((sum(complete) / sum(target)) * 10000) / 10000;
                    div = Number(div*100).toFixed(1);
                    div += "%";
                    return div;
                };


                vm.quarter.foot = {
                    saleGroup: '合计',
                    target:     sum(target),
                    complete:   sum(complete),
                    difference: scaleNum(complete, target),
                    scale:      sum(scale),
                    m1:         sum(m1),
                    m2:         sum(m2),
                    m3:         sum(m3),
                    c1:         sum(c1),
                    c2:         sum(c2),
                    c3:         sum(c3),
                };
            };

        },


        // 日期选择
        changeSelectionList: function (event) {
            event.cancelBubble = true;// 阻止冒泡
            this.selectionIsShow = true;
        },
        clickItem: function (item) {
            this.selectionDefaultText = item;
            this.selectionIsShow = false;
            this.getData(item)
        },
        mainClick: function (e) {
            this.selectionIsShow = false;
        },
    },
});// end