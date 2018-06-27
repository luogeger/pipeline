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
            tBody: []
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
    },
    methods: {
        getData: function (callback) {
            var _this = this;
            axios
                .get(PATH + '/currency/midYear?type=rb')
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
                    text: '区域内 - 各大行业的金额、占比',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // type: 'cross',// hover之后横向虚线
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    left: '1%',
                    right: '3%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.chartOneX,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '金额(万元)',
                        axisLabel: {
                            formatter: '{value} 万元'
                        }
                    },
                    {
                        type: 'value',
                        name: '占比(%)',
                        max: 100,
                        axisLabel: {
                            formatter: '{value} %'
                        },
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
                        name: '占比',
                        type: 'line',
                        yAxisIndex: 1,
                        lineStyle: {
                            type: 'dashed',
                        },
                        data: this.chartOneRate,
                    },
                    {
                        type: 'pie',
                        radius: '50%',
                        center: ['80%', '40%'],
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
                    text: '大行业内 - 各区域的金额、占比',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
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
                    bottom: '1%',
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
                        name: '金额(万元)',
                        axisLabel: {
                            formatter: '{value} 万元'
                        }
                    },
                    {
                        type: 'value',
                        name: '占比(%)',
                        max: 100,
                        axisLabel: {
                            formatter: '{value} %'
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
                        name: '占比',
                        type: 'line',
                        yAxisIndex: 1,
                        lineStyle: {
                            type: 'dashed',
                        },
                        data: this.chartTwoRate,
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
    },
});
