
var vm = new Vue({
    el: '#weightCycle',
    data: {
        // 当前人的级别
        userLevel: userLevel,

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


        // 参数
        currentYear: currentYear,// 当前年份
        currentAccYear: 'h'+ currentAccYear,// 上半年， 下半年
        currentQuarter: 'q'+ currentQuarter,// 当前季度
        halfQuarter: '',
        unitCode: '',
        unitType: '',
        dateOne: '',
        dateOneClose: sszDate,
        dateTwo: '',
        dateTwoClose: szDate,

        // 数据
        chartColor: chartColor,// 图表颜色

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
        // yearLegend:  ['截止日期1', '截止日期2', '目标额'],
        yearLegend:  ['本周', '上周', '目标额'],
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
        quarterLegend:  ['截止日期1', '截止日期2', '目标额'],
        quarterXaxis: [],
        quarterDataOne: [],
        quarterDataTwo: [],
        quarterDataTarget: [],


        // 增长额详情
        growthDetailShow:   false,
        notDetailList:      false,
        growthDetailTitle:  '',
        growthDetailList:   [],


    },

    created: function () {
        this.getYearData();
        this.getQuarterData();

    },

    mounted: function () {
        this.renderDate();// 绑定日期插件事件
    },

    methods: {

        getYearData: function (index, params, callback) {
            this.yearTabActiveIndex = index = index || 0;// 默认选中第一个 tab

            var obj = {
                aYear: this.currentYear,
                hq: this.currentAccYear,
                closingDate1: this.dateOneClose,
                closingDate2: this.dateTwoClose,
            };
            params = Object.assign(obj, params)
            axios
                .get(PATH +'/a/weightedCycleComparison', {params: params})
                .then(function (datas){
                    var data = datas.data,
                        msg = datas.data.msg;
                    if (data.code === 201) {
                        toastr.error('暂无相关数据!')
                        return;
                    }
                    vm.yearTableTitle = msg.subTitles;
                    vm.yearTable.head = msg.data[index].rowTitle;
                    msg.data[index].rowData.forEach(function (item) {
                        item.bz = Number(item.bz.toFixed(0));
                        item.sz = Number(item.sz.toFixed(0));
                    });// 本周和上周取整
                    vm.yearTable.body = msg.data[index].rowData;
                    vm.yearTable.foot = vm.totalCalc(msg.data[index].rowData, 'year');// 图表的刷新也在这个方法内部


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

        getQuarterData: function (index, params, callback) {
            this.quarterTabActiveIndex = index = index || 0;// 季度的切换都是选中第一个tab

            var obj = {
                aYear: this.currentYear,
                hq: this.currentQuarter,
                closingDate1: this.dateOneClose,
                closingDate2: this.dateTwoClose,
                // startDate1: '',
                // startDate2: '',
            };
            params = Object.assign(obj, params)
            axios.get(PATH +'/a/weightedCycleComparison', {params: params}).then(function (datas){
                var data = datas.data,
                    msg  = datas.data.msg;
                if (data.code === 201) {
                    toastr.error('暂无相关数据!')
                    return;
                }

                vm.quarterTableTitle = msg.subTitles;
                vm.quarterTable.head = msg.data[index].rowTitle;
                vm.quarterTable.body = msg.data[index].rowData;

                msg.data[index].rowData.forEach(function (item) {
                    item.bz = Number(item.bz.toFixed(0));
                    item.sz = Number(item.sz.toFixed(0));
                });// 本周和上周取整
                vm.quarterTable.foot = vm.totalCalc(msg.data[index].rowData, 'quarter');// 图表的刷新也在这个方法内部


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

            var option = {
                color: this.chartColor,
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0.1,// 柱子之间没有间隙
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
                        data: this.yearDataTarget,
                    },
                ]
            };
            box.setOption(option);
        },

        quarterChart: function () {
            var box = echarts.init(document.getElementById('quarterChart'));

            var option = {
                color: this.chartColor,
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0.1,// 柱子之间没有间隙
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
                        data: this.quarterDataOne,
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
                        data: this.quarterDataTwo,
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
                        // label: {
                        //     normal: {
                        //         show: true,
                        //         position: 'top',
                        //         textStyle: {
                        //             color: this.chartColor[2],
                        //         }
                        //     }
                        // },
                        data: this.quarterDataTarget,
                    },
                ]
            };
            box.setOption(option);
        },

        // 计算表格合计的方法
        totalCalc: function (arrData, type) {
            // 图表数据
            var unit =[], prev =[], current =[], target =[], compareSzRise =[];
            arrData.forEach(function (item) {
                unit.push(item.unit)
                prev.push(item.sz)
                current.push(item.bz)
                target.push(item.target)
                compareSzRise.push(item.compareSzRise)
            });
            if (type === 'year') {
                vm.yearXaxis = unit;
                vm.yearDataOne = current;
                vm.yearDataTwo = prev;
                vm.yearDataTarget = target;
                vm.yearChart();
            } else{

                vm.quarterXaxis = unit;
                vm.quarterDataOne = current;
                vm.quarterDataTwo = prev;
                vm.quarterDataTarget = target;
                vm.quarterChart();
            }



            // 合计数据
            var footObj = {
                unit: '合计',
                bz: sum(current),
                sz: sum(prev),
                target: sum(target),
                compareSzRise: sum(compareSzRise),
                compareSzRate: scaleNum(sum(compareSzRise), sum(prev)),
            };

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
            };// 数组求和
            function scaleNum(A, B) {
                if (B === 0) return '-';
                var div = Math.floor((A/B) *10000) / 10000;
                div = Number(div*100).toFixed(1);
                if (div === '0.0') div = '0';
                div += "%";
                return div;
            };// 增长率的计算
            return footObj;
        },

        // 绑定日期插件事件
        renderDate: function () {
            laydate.render({
                elem: '#dateOne', //指定元素
                value: this.dateOneClose,
                done: function (val) {
                    vm.getDateRange(val, 1)
                }
            });
            laydate.render({
                elem: '#dateTwo', //指定元素
                value: this.dateTwoClose,
                done: function (val) {
                    vm.getDateRange(val, 2)
                }
            });

        },

        getDateRange: function (val, type) {
            var parmas;
            if (type === 1) {
                vm.dateOneClose = val.substring(0,10);
                parmas = {
                    closingDate1: vm.dateOneClose,
                };
            } else {
                vm.dateTwoClose = val.substring(0,10);
                parmas = {
                    closingDate2: vm.dateTwoClose,
                };
            }
            this.getYearData(null, parmas)
            this.getQuarterData(null, parmas)
        },// getDateRange

        // 所有弹窗的按钮
        popBtn: function (type, item) {
            if (type === 'half') this.growthDetail(item);// 增长额详情
        },

        // 取消所有弹窗
        hidePop: function (type) {
            this[type]         = false;
            this.notDetailList = false;
        },

        // 增长额详情
        growthDetail: function (item, callback) {
            var _this = this;
            console.log(item)
            var params = {
                aYear:          this.currentYear,
                hq:             this.currentAccYear,
                startDate1:     '2018-1-1',// 先写死，随便写的
                startDate2:     '2018-1-1',// 先写死，随便写的
                closingDate1:   this.dateOneClose,
                closingDate2:   this.dateTwoClose,
                unitCode:       item.unitCode,
                unitType:       item.unitType,
            };
            axios
                .get(PATH +'/a/weightedCycleComparisonDifferenceDetail', {params: params})
                .then(function (datas){
                    var data = datas.data;
                    console.log(data)
                    if (data.code === 201) {
                        toastr.error('暂无相关数据!')
                        return;
                    }
                    _this.growthDetailTitle= data.msg.oth.subTitle;
                    _this.growthDetailList = data.msg.root;
                    _this.notDetailList    = !data.msg.root.length;
                    _this.growthDetailShow = true;

                    if (callback) callback();
                });
        },









        // 年份选择
        changeSelectionList: function (event) {
            event.cancelBubble = true;// 阻止冒泡
            this.selectionIsShow = true;
        },
        clickItem: function (item) {
            this.selectionDefaultText = item;
            this.selectionIsShow = false;

            // 重新请求数据
            this.currentYear = item;
            this.getYearData();
            this.getQuarterData();
        },
        mainClick: function (e) {
            this.selectionIsShow = false;
        },
    },// methods

});

