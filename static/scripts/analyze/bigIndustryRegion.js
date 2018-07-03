var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            data: {},
            allRegion: [],
            allIndustry: [],
            colorValue: chartColorValue,
            chartOneX: [],
            chartOneSum: [],
            chartOneRate: [],
            chartOnePie: [],
            chartOneActive: '全国',
            chartTwoX: [],
            chartTwoSum: [],
            chartTwoRate: [],
            chartTwoActive: '全行业',
            tHead: [],
            tBody: [],
            // 时间
            signedStartDate: '',
            signedEndDate: '',
        };
    },
    created: function () {
    },
    mounted: function () {
        var _this = this;
        this.getData(function (_) {
            _this.chartOne();
            _this.chartTwo();
        });
        this.renderDate();
    },
    methods: {
        getData: function (callback) {
            var _this = this;
            var params = {
                type: 'rb',
                signedStartDate: this.signedStartDate,
                signedEndDate: this.signedEndDate,
            };
            axios
                .get(PATH + '/currency/midYear', { params: params })
                .then(function (datas) {
                _this.data = datas.data;
                _this.tHead = _this.data.msg.rbTitle;
                _this.tBody = _this.data.msg.rbList;
                console.log(_this.data.msg);
                if (callback)
                    callback();
            });
        },
        chartOneData: function (region) {
            var _this = this;
            region = region || '全国';
            this.allRegion = []; // 全部清空
            this.chartOneX = []; // 全部清空
            this.chartOneSum = []; // 全部清空
            this.chartOneRate = []; // 全部清空
            this.chartOnePie = []; // 全部清空
            this.data.msg.rbList.forEach(function (item, index) {
                _this.allRegion.push(item.text);
                if (index !== 0) {
                    _this.chartOnePie.push({
                        value: item.rate,
                        name: item.text,
                        itemStyle: {
                            color: _this.colorValue[index + 1],
                        }
                    });
                } // 饼图数据
                if (item.text == region) {
                    item.children.forEach(function (_item) {
                        _this.chartOneX.push(_item.text);
                        _this.chartOneSum.push(_item.sum);
                        _this.chartOneRate.push(_item.rate);
                    });
                }
            });
        },
        chartOne: function (region) {
            this.chartOneData(region);
            var box = echarts.init(document.getElementById('chartOne'));
            var option = {
                title: {
                    text: '区域内 - 各大行业的金额(万元) - 占比(%)',
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
                        data: this.chartOneX,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            // rotate: 20,
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
                        data: this.chartOneSum,
                    },
                    {
                        data: this.chartOneRate,
                        name: '占比',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        yAxisIndex: 1,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0,
                        },
                    },
                    {
                        type: 'pie',
                        radius: '50%',
                        center: ['75%', '50%'],
                        silent: true,
                        itemStyle: {
                            opacity: 0.7,
                        },
                        label: {
                            normal: {
                                formatter: '{b} {c}%',
                            },
                        },
                        data: this.chartOnePie,
                    },
                ]
            };
            box.on('click', function (params) {
                console.log(params);
                if (params.componentSubType === 'pie') {
                }
            });
            box.setOption(option);
        },
        chartTwoData: function (industry) {
            var _this = this;
            this.allIndustry = [];
            this.chartTwoX = [];
            this.chartTwoSum = [];
            this.chartTwoRate = [];
            industry = industry || '全行业';
            this.data.msg.brList.forEach(function (item) {
                _this.allIndustry.push(item.text);
                if (item.text === industry) {
                    item.children.forEach(function (_item) {
                        _this.chartTwoX.push(_item.text);
                        _this.chartTwoSum.push(_item.sum);
                        _this.chartTwoRate.push(_item.rate);
                    });
                }
            });
        },
        chartTwo: function (industry) {
            this.chartTwoData(industry);
            var box = echarts.init(document.getElementById('chartTwo'));
            var option = {
                title: {
                    text: '大行业内 - 各区域的金额(万元) - 占比(%)',
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
                    bottom: '12%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.chartTwoX,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine: {
                            show: false,
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
                        data: this.chartTwoSum,
                    },
                    {
                        data: this.chartTwoRate,
                        name: '占比',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        yAxisIndex: 1,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0,
                        },
                    },
                ]
            };
            box.setOption(option);
        },
        chartActive: function (type, value) {
            if (type === 1) {
                this.chartOneActive = value;
                this.chartOne(value);
            }
            if (type === 2) {
                this.chartTwoActive = value;
                this.chartTwo(value);
            }
        },
        query: function () {
            console.log(111);
            this.getData();
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
                }
            });
        },
    },
});
