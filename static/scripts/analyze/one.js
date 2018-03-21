var box = echarts.init(document.getElementById('halfYearChart'));

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['部门目标', '部门完成情况'],
    },
    grid: {
        left: '3%',
        right: '4%',
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
            fontSize: '16',
            fontWeight: '600',
        },
        data: [
            '金融客户事业部',
            '行业客户事业部',
            '通用客户事业部',
            '港台客户事业部',
            '公共客户事业部'
        ]
    },
    series: [
        {
            name: '部门目标',
            type: 'bar',
            barMaxWidth: '20%',
            color: '#E56F0B',
            itemStyle:{
                barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
            },
            data: [18203, 23489, 29034, 104970, 131744]
        },
        {
            name: '部门完成情况',
            type: 'bar',
            barMaxWidth: '20%',
            color: '#FBC839',
            itemStyle:{
                barBorderRadius: [0, 50, 50, 0], //（顺时针左上，右上，右下，左下）
            },
            data: [19325, 23438, 31000, 121594, 134141]
        }
    ]
};
box.setOption(option);