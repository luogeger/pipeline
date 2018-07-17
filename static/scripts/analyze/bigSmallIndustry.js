var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            data: {},
            tableData: [],
            allGroup: saleGroupList,
            // allGroup:       [{code: 'asdf', text:'机器人'},{code: 'lkjkl', text:'只能'}],
            // 查询条件
            department: { code: '', text: '全部' },
            signedStartDate: '',
            signedEndDate: '',
            // 数据
            chartColor: chartColorValue,
            pieData: [],
            pieLegend: [],
            lineData: [],
            lineDataX: [],
            chartActiveBar: '全行业',
            barLegend: [],
            barX: [],
            barSum: [],
            barRate: [],
            barBsRate: [],
            industryRate: [],
        };
    },
    created: function () {
        this.query();
    },
    mounted: function () {
        this.renderDate();
    },
    watch: {
        department: function () {
            this.query();
        },
    },
    methods: {
        getData: function (callback, obj) {
            var _this = this;
            var params = {
                type: 'bs',
                department: this.department.code,
                signedStartDate: this.signedStartDate,
                signedEndDate: this.signedEndDate,
            };
            params = Object.assign(params, obj);
            axios
                .get(PATH + '/currency/midYear', { params: params })
                .then(function (datas) {
                _this.data = datas.data;
                _this.tableData = _this.data.msg.bsList; // 表格数据
                _this.chartPieLineData();
                if (callback)
                    callback();
            });
        },
        query: function () {
            var _this = this;
            this.getData(function () {
                _this.chartPie();
                _this.chartLine();
                _this.chartBar();
            });
        },
        chartPieLineData: function () {
            var _this = this;
            this.pieLegend = [];
            this.pieData = [];
            this.lineData = [];
            this.lineDataX = [];
            this.data.msg.bsList.forEach(function (item, index) {
                _this.pieLegend.push(item.text);
                _this.pieData.push({
                    value: item.sum,
                    name: item.text,
                    itemStyle: { color: _this.chartColor[index] }
                });
                _this.lineData.push(item.sum);
                _this.lineDataX.push(item.text);
            });
        },
        chartBarData: function (industry) {
            var _this = this;
            industry = industry || '全行业';
            this.barLegend = [];
            this.barX = [];
            this.barSum = [];
            this.barRate = []; // 大行业占比
            this.barBsRate = []; // 全行业占比
            this.industryRate = []; // 根据全行业和大行业数据进行切换
            if (industry === '全行业') {
                this.data.msg.bsList.forEach(function (item) {
                    _this.barLegend.push(item.text);
                    item.children.forEach(function (_item) {
                        _this.barX.push(_item.text);
                        _this.barSum.push(_item.sum);
                        _this.barRate.push(_item.rate);
                        _this.barBsRate.push(_item.bsRate);
                        _this.industryRate = _this.barBsRate;
                    });
                });
            }
            else {
                this.data.msg.bsList.forEach(function (item) {
                    _this.barLegend.push(item.text);
                    if (industry === item.text) {
                        item.children.forEach(function (_item) {
                            _this.barX.push(_item.text);
                            _this.barSum.push(_item.sum);
                            _this.barRate.push(_item.rate);
                            _this.barBsRate.push(_item.bsRate);
                            _this.industryRate = _this.barRate;
                        });
                    }
                });
            }
        },
        chartPie: function () {
            var box = echarts.init(document.getElementById('chartPie'));
            var option = {
                silent: true,
                title: {
                    text: '大行业签约情况 - 占比(%)',
                    top: '10px',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                // legend: {
                //     bottom: 0,
                //     data: this.pieLegend,
                // },
                series: [
                    {
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '60%'],
                        label: {
                            normal: {
                                // formatter: '{b}\n {c}%',
                                formatter: '{b} : {c} ({d}%)',
                            },
                        },
                        data: this.pieData,
                    }
                ]
            };
            box.setOption(option);
        },
        chartLine: function () {
            var box = echarts.init(document.getElementById('chartLine'));
            var option = {
                title: {
                    text: '大行业签约情况 - 金额(万元)',
                    top: '10px',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                // legend: {
                //     // data:['签约金额'],
                //     // selectedMode:false,//取消图例上的点击事件
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [
                    {
                        data: this.lineDataX,
                        type: 'category',
                        axisLabel: {
                            formatter: function (params) {
                                var newParamsName = ""; // 最终拼接成的字符串
                                var paramsNameNumber = params.length; // 实际标签的个数
                                var provideNumber = 4; // 每行能显示的字的个数
                                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                                /**
                                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                 */
                                // 条件等同于rowNumber>1
                                if (paramsNameNumber > provideNumber) {
                                    /** 循环每一行,p表示行 */
                                    for (var p = 0; p < rowNumber; p++) {
                                        var tempStr = ""; // 表示每一次截取的字符串
                                        var start = p * provideNumber; // 开始截取的位置
                                        var end = start + provideNumber; // 结束截取的位置
                                        // 此处特殊处理最后一行的索引值
                                        if (p == rowNumber - 1) {
                                            // 最后一次不换行
                                            tempStr = params.substring(start, paramsNameNumber);
                                        }
                                        else {
                                            // 每一次拼接字符串并换行
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr; // 最终拼成的字符串
                                    }
                                }
                                else {
                                    // 将旧标签的值赋给新标签
                                    newParamsName = params;
                                }
                                //将最终的字符串返回
                                return newParamsName;
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        // name: '金额(元)',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 元'
                        }
                    }
                ],
                series: [
                    {
                        data: this.lineData,
                        name: '签约金额',
                        type: 'line',
                        symbolSize: 8,
                        color: 'rgba(255,138,65,1)',
                        encode: {
                            x: 0,
                            y: 3
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: 'rgba(255,138,65,1)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgba(255,138,65,0.7)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(255,138,65,0)'
                                        }]
                                }
                            }
                        },
                    },
                ]
            };
            box.setOption(option);
        },
        chartBar: function (industry) {
            this.chartBarData(industry);
            var box = echarts.init(document.getElementById('chartBar'));
            var option = {
                title: {
                    text: '小行业签约情况 - 金额(万元) - 占比(%)',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                legend: {
                    selectedMode: false,
                    bottom: 0,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    left: '1%',
                    right: '3%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.barX,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            rotate: 30,
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        // name: '金额(万元)',
                        axisLabel: {
                            formatter: '{value} 万元'
                        }
                    },
                    {
                        type: 'value',
                        // name: '占比(%)',
                        max: 100,
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        }
                    }
                ],
                series: [
                    {
                        data: this.barSum,
                        name: '金额',
                        type: 'bar',
                        color: chartColor[3],
                        barWidth: '40%',
                        itemStyle: {
                            barBorderRadius: [5, 5, 0, 0],
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                    },
                    {
                        data: this.industryRate,
                        name: '占比',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 8,
                        yAxisIndex: 1,
                        lineStyle: {
                            opacity: 0,
                        },
                    },
                ]
            };
            box.setOption(option);
        },
        chartActiveBtn: function (type, industry) {
            console.log(industry);
            if (type === 1) {
                this.chartActiveBar = industry;
                this.chartBar(industry);
            }
        },
        // 绑定日期插件事件
        renderDate: function () {
            var _this = this;
            laydate.render({
                elem: '#dateOne',
                type: 'month',
                range: true,
                value: this.dateOneClose,
                done: function (val) {
                    _this.signedStartDate = val.substring(0, 7);
                    _this.signedEndDate = val.substring(val.length - 7, val.length);
                    _this.query();
                }
            });
        },
    },
}); // end
