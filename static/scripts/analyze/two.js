
var vm = new Vue({
    ele: '#app',
    data: {
        dateOne: '',
        dateTwo: '',
    },

    created: function () {
        this.yearChart();
        this.quarterChart();
        this.renderDate();

    },

    methods: {
        getData: function (obj) {
            
        },
        
        yearChart: function () {
            var box = echarts.init(document.getElementById('yearChart'));

            option = {
                color: ['#ED6D00', '#FFC732', '#0094ff'],
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0,// 柱子之间没有间隙
                title : {
                    text: '加权平均额周期对比 (加权平均vs目标) (单位：万元)',
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
                    data: ['日期范围1', '日期范围2', '目标额']
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
                        data: [
                            '金融客户事业部',
                            '行业客户事业部',
                            '通用客户事业部',
                            '港台客户事业部',
                            '公共客户事业部',
                        ]
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
                        name: '日期范围1',
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
                                    color: '#ED6D00',
                                }
                            }
                        },
                        data: [1200, 2000, 1500, 800, 700,],
                    },
                    {
                        name: '日期范围2',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#FFC732',
                                }
                            }
                        },
                        data: [3120, 1200, 2150, 980, 370,],
                    },
                    {
                        name:'目标额',
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
                                    color: '#0094ff',
                                }
                            }
                        },
                        data:[3000,2300, 3400, 1900, 2000]
                    },
                ]
            };
            box.setOption(option);
        },

        quarterChart: function () {
            var box = echarts.init(document.getElementById('quarterChart'));

            option = {
                color: ['#ED6D00', '#FFC732', '#0094ff'],
                barMaxWidth: '20%',// 柱子宽度
                barGap: 0,// 柱子之间没有间隙
                title : {
                    text: '加权平均额周期对比 (加权平均vs目标) (单位：万元)',
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
                    data: ['日期范围1', '日期范围2', '目标额']
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
                        data: [
                            '金融客户事业部',
                            '行业客户事业部',
                            '通用客户事业部',
                            '港台客户事业部',
                            '公共客户事业部',
                        ]
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
                        name: '日期范围1',
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
                                    color: '#ED6D00',
                                }
                            }
                        },
                        data: [1200, 2000, 1500, 800, 700,],
                    },
                    {
                        name: '日期范围2',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#FFC732',
                                }
                            }
                        },
                        data: [3120, 1200, 2150, 980, 370,],
                    },
                    {
                        name:'目标额',
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
                                    color: '#0094ff',
                                }
                            }
                        },
                        data:[3000,2300, 3400, 1900, 2000]
                    },
                ]
            };
            box.setOption(option);
        },

        renderDate: function () {
            laydate.render({
                elem: '#dateOne', //指定元素
                done: function(val) {
                    vm.getDateRange(val, 1);
                }
            });
            laydate.render({
                elem: '#dateTwo', //指定元素
                done: function(val) {
                    vm.getDateRange(val, 2);
                }
            });
        },

        getDateRange: function (val, type) {
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

