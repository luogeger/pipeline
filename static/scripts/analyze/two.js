console.log('two.js')

// laydate
laydate.render({
    elem: '#dateOne', //指定元素
    range: true,
});
laydate.render({
    elem: '#dateTwo', //指定元素
    range: true,
});

var vm = new Vue({
    ele: '#app',
    data: {

    },

    created: function () {
        this.yearChart();
        this.quarterChart();
    },

    methods: {
        yearChart: function () {
            var box = echarts.init(document.getElementById('yearChart'));

            option = {
                color: ['#ED6D00', '#FFC732'],
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
                    data: ['目标额', '完成额',]
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
                    }
                ],
                series: [
                    {
                        name: '目标额',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: [1200, 2000, 1500, 800, 700,],
                    },
                    {
                        name: '完成额',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: [3120, 1200, 2150, 980, 370,],
                    },
                ]
            };
            box.setOption(option);
        },

        quarterChart: function () {
            var box = echarts.init(document.getElementById('quarterChart'));

            option = {
                color: ['#ED6D00', '#FFC732'],
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
                    data: ['目标额', '完成额',]
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
                    }
                ],
                series: [
                    {
                        name: '目标额',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: [1200, 2000, 1500, 800, 700,],
                    },
                    {
                        name: '完成额',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
                        },
                        data: [3120, 1200, 2150, 980, 370,],
                    },
                ]
            };
            box.setOption(option);
        },


    },
});

