var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            data: {},
            allGroup: saleGroupList,
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
        };
    },
    created: function () {
    },
    mounted: function () {
        var _this = this;
        this.getData(function () {
            _this.chartPie();
            _this.chartLine();
        });
        this.renderDate();
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
            console.log(params);
            axios
                .get(PATH + '/currency/midYear', { params: params })
                .then(function (datas) {
                _this.data = datas.data;
                _this.chartPieLineData();
                console.log(_this.data.msg);
                if (callback)
                    callback();
            });
        },
        query: function () {
            this.getData();
        },
        chartPieLineData: function () {
            var _this = this;
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
        chartPie: function () {
            var box = echarts.init(document.getElementById('chartPie'));
            var option = {
                silent: true,
                title: {
                    text: '大行业签约情况 - 占比',
                    top: '10px',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                legend: {
                    bottom: 0,
                    data: this.pieLegend,
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                formatter: '{b}\n {c}%',
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
                    text: '大行业签约情况 - 金额',
                    top: '10px',
                    x: 'left',
                    textStyle: {
                        fontSize: 14,
                    }
                },
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
                        name: '(万元)',
                        type: 'value',
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
        chartBar: function () {
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
}); // end
