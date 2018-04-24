
var vm = new Vue({
    el: '#weightCycle',
    data: {
        // 参数
        currentYear: currentYear,// 当前年份
        currentAccYear: 'h'+ currentAccYear,// 上半年， 下半年
        currentQuarter: 'q'+ currentQuarter,// 当前季度
        halfQuarter: '',
        unitCode: '',
        unitType: '',
        dateOne: '',
        dateOneClose: '',
        dateTwo: '',
        dateTwoClose: '',

        // 数据
        chartColor: chartColor,

        // 半年 - 表格数据
        currentHalfYearActive: currentAccYear,// 半年的 active
        yearTabActiveIndex: 0,// tab 的 active
        yearTableTitle: [],
        yearTable: {
            head: {},
            body: [],
            foot: {},
        },

        // 半年 - 图表数据
        yearLegend:  ['日期范围1', '日期范围2', '目标额'],
        yearXaxis: [],
        yearDataOne: [],
        yearDataTwo: [],
        yearDataTarget: [],

        // 季度 - 表格数据
        quarterTabList: ['Q1', 'Q2', 'Q3', 'Q4'],
        currentQuarterActive: currentQuarter,// 季度 的 active
        quarterTabActiveIndex: 0,// tab 的 active
        quarterTableTitle: [],
        quarterTable: {
            head: {},
            body: [],
            foot: {},
        },


        // 季度 - 图表数据
        quarterLegend:  ['日期范围1', '日期范围2', '目标额'],
        quarterXaxis: [],
        quarterDataOne: [],
        quarterDataTwo: [],
        quarterDataTarget: [],


    },

    created: function () {
        this.renderDate();// 日期
        this.getYearData();
        this.getQuarterData();

    },

    methods: {

        getYearData: function (index, parmas, callback) {
            index = index || 0;
            parmas = {
                aYear: this.currentYear,
                hq: this.currentAccYear,
                closingDate1: '',
                closingDate2: '',
            };
            axios.get(PATH +'/a/weightedCycleComparison', {params: parmas}).then(function (datas){
                var data = datas.data,
                    msg = datas.data.msg;
                if (data.code === 201) {
                    toastr.error('暂无相关数据!')
                    return;
                }
                vm.yearTableTitle = msg.subTitles;
                vm.yearTable.head = msg.data[index].rowTitle;
                vm.yearTable.body = msg.data[index].rowData;

                // 图表数据
                var unit =[], prev =[], current =[], target =[];
                msg.data[index].rowData.forEach(function (item) {
                    unit.push(item.unit)
                    prev.push(item.sz)
                    current.push(item.bz)
                    target.push(item.target)
                });
                vm.yearXaxis = unit;
                vm.yearDataOne = current;
                vm.yearDataTwo = prev;
                vm.yearDataTarget = target;





                vm.yearChart()
                if (callback) callback();
            });
        },

        // 半年tab 的切换
        changeYearTab: function (index) {
            this.yearTabActiveIndex = index;
            this.getYearData(index)
        },

        // 半年的切换
        changeYearDate: function (type) {
            this.currentHalfYearActive = type;
            this.currentAccYear = 'h' + type;
            this.getYearData()
        },

        getQuarterData: function (index, parmas, callback) {
            this.quarterTabActiveIndex = index = index || 0;// 季度的切换都是选中第一个tab

            parmas = {
                aYear: this.currentYear,
                hq: this.currentQuarter,
                closingDate1: '',
                closingDate2: '',
            };
            axios.get(PATH +'/a/weightedCycleComparison', {params: parmas}).then(function (datas){
                var data = datas.data,
                    msg  = datas.data.msg;
                if (data.code === 201) {
                    toastr.error('暂无相关数据!')
                    return;
                }

                vm.quarterTableTitle = msg.subTitles;
                vm.quarterTable.head = msg.data[index].rowTitle;
                vm.quarterTable.body = msg.data[index].rowData;

                // 图表数据
                var unit =[], prev =[], current =[], target =[];
                msg.data[index].rowData.forEach(function (item) {
                    unit.push(item.unit)
                    prev.push(item.sz)
                    current.push(item.bz)
                    target.push(item.target)
                });
                vm.yearXaxis = unit;
                vm.yearDataOne = current;
                vm.yearDataTwo = prev;
                vm.yearDataTarget = target;


                vm.quarterChart()
                if (callback) callback();
            });
        },

        // 季度tab 的切换
        changeQuarterTab: function (index) {
            this.quarterTabActiveIndex = index;
            this.getQuarterData(index)
        },

        // 季度 的切换
        changeQuarterData: function (quarter) {
            this.currentQuarterActive = quarter +1;
            this.currentQuarter = 'q'+ (quarter +1);
            this.getQuarterData()

        },
        
        yearChart: function () {
            var box = echarts.init(document.getElementById('yearChart'));

            option = {
                color: this.chartColor,
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0,// 柱子之间没有间隙
                title : {
                    text: '半年加权平均额周期对比 (加权平均vs目标) (单位：万元)',
                    x:'left',
                    top: '20px',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: this.yearLegend,
                },

                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: this.yearXaxis,
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                    // {
                        // type: 'value',
                        // name: '目标额',
                        // min: 0,
                        // max: 25,
                        // interval: 5,
                        // axisLabel: {
                        //     formatter: '{value} °C'
                        // }
                    // }
                    
                ],
                series: [
                    {
                        name: this.yearLegend[0],
                        type: 'bar',
                        //animationDuration: 5000,// 动画持续时间
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[0],
                                }
                            }
                        },
                        data: this.yearDataOne,
                    },
                    {
                        name: this.yearLegend[1],
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[1],
                                }
                            }
                        },
                        data: this.yearDataTwo,
                    },
                    {
                        name: this.yearLegend[2],
                        type:'line',
                        symbol: 'arrow',
                        symbolSize: 20,
                        //yAxisIndex: 1, // 右边没有显示了
                        lineStyle: {
                            opacity: 0,// 没有线条了
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[2],
                                }
                            }
                        },
                        data: this.yearDataTarget,
                    },
                ]
            };
            box.setOption(option);
        },

        quarterChart: function () {
            var box = echarts.init(document.getElementById('quarterChart'));

            option = {
                color: this.chartColor,
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0,// 柱子之间没有间隙
                title : {
                    text: '季度加权平均额周期对比 (加权平均vs目标) (单位：万元)',
                    x:'left',
                    top: '20px',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: this.quarterLegend,
                },

                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: this.quarterXaxis,
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    },

                ],
                series: [
                    {
                        name: this.quarterLegend[0],
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[0],
                                }
                            }
                        },
                        data: this.yearDataOne,
                    },
                    {
                        name: this.quarterLegend[1],
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[1],
                                }
                            }
                        },
                        data: this.yearDataTwo,
                    },
                    {
                        name: this.quarterLegend[2],
                        type:'line',
                        symbol: 'arrow',
                        symbolSize: 20,
                        //yAxisIndex: 1, // 右边没有显示了
                        lineStyle: {
                            opacity: 0,// 没有线条了
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: this.chartColor[2],
                                }
                            }
                        },
                        data: this.yearDataTarget,
                    },
                ]
            };
            box.setOption(option);
        },

        renderDate: function () {
            console.log(laydate.render)
            laydate.render({
                elem: '#dateOne', //指定元素
                range: true,
                done: function(val) {
                    console.log(val, 1);
                }
            });
            laydate.render({
                elem: '#dateTwo', //指定元素
                range: true,
                done: function(val) {
                    console.log(val, 2);
                }
            });
        },

        getDateRange: function (val, type) {
            console.log(val, type)
            type === 1? dateOne(val) : dateTwo(val);

            function dateOne(val) {
                vm.dateOne = val;
            };

            function dateTwo(val) {
                vm.dateTwo = val;
            };
        },

    },
});

