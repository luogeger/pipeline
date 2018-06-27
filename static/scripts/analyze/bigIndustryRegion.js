var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            colorValue: ['#ED6D00', '#FFC732', '#8786FE', '#F29EC2', '#26C5C8', '#CBE198'],
            chartOneLegend: [],
            chartOneX: [],
            chartOneSum: [],
            chartOneRate: [],
            chartOnePie: [],
        };
    },
    created: function () {
    },
    mounted: function () {
        this.chartOneData();
    },
    methods: {
        chartOneData: function (region) {
            var _this = this;
            axios
                .get(PATH + '/currency/midYear?type=rb')
                .then(function (datas) {
                _this.chartOneDataDispose(datas.data, region);
                console.log(_this.chartOneSum);
                console.log(_this.chartOneRate);
                _this.chartOne();
                _this.chartTwo();
            });
        },
        chartOneDataDispose: function (data, region) {
            var _this = this;
            console.log(data.msg);
            region = region || '全国';
            data.msg.rbList.forEach(function (item, index) {
                if (index !== 0) {
                    _this.chartOnePie.push({
                        value: item.rate,
                        name: item.text,
                    });
                }
                if (item.text == region) {
                    item.children.forEach(function (_item) {
                        _this.chartOneX.push(_item.text);
                        _this.chartOneSum.push(_item.sum);
                        _this.chartOneRate.push(_item.rate);
                    });
                }
            });
        },
        chartOne: function () {
            var box = echarts.init(document.getElementById('chartOne'));
            var option = {
                title: {
                    text: '区域内各大行业的金额、占比',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
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
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
                ],
                series: [
                    {
                        name: '金额',
                        type: 'bar',
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
                        radius: '30%',
                        center: ['75%', '25%'],
                        silent: true,
                        itemStyle: {
                            opacity: 0.5,
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
        chartTwo: function () {
        },
        test: function () {
            console.log(234);
        }
    },
});
