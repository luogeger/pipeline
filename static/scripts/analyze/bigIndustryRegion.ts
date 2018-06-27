var vm = new Vue({
    el: '#app',

    data () {
        return {
            colorValue:     ['#ED6D00', '#FFC732','#8786FE', '#F29EC2', '#26C5C8', '#CBE198'],
            chartOneLegend: [],
            chartOneX:      [],
            chartOneSum:    [],
            chartOneRate:   [],
            chartOnePie:    [],
        }
    },

    created () {

    },

    mounted () {
        this.chartOneData()
    },

    methods: {
        chartOneData (region) {
            axios
                .get(PATH +'/currency/midYear?type=rb')
                .then(datas => {
                    this.chartOneDataDispose(datas.data, region)
                    console.log(this.chartOneSum)
                    console.log(this.chartOneRate)
                    this.chartOne()
                    this.chartTwo()
                });

        },

        chartOneDataDispose (data, region) {
            console.log(data.msg)
            region = region || '全国';
            data.msg.rbList.forEach((item, index) => {
                if (index !== 0) {
                    this.chartOnePie.push({
                        value: item.rate,
                        name: item.text,
                    })
                }

                if (item.text == region) {
                    item.children.forEach(_item => {
                        this.chartOneX.push(_item.text)
                        this.chartOneSum.push(_item.sum)
                        this.chartOneRate.push(_item.rate)
                    })

                }
            })
        },

        chartOne () {
            let box = echarts.init(document.getElementById('chartOne'));

            let option = {
                title : {
                    text: '区域内各大行业的金额、占比',
                    x:'left',
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
                        name:'金额',
                        type:'bar',
                        barWidth: '40%',
                        itemStyle:{
                            barBorderRadius: [5, 5, 0, 0], //（顺时针左上，右上，右下，左下）
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
                        name:'占比',
                        type:'line',
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

            box.on('click', params => {
                console.log(params)
                if (params.componentSubType === 'pie') {

                }
            });

            box.setOption(option);



        },// chartOne

        chartTwo () {

        },

        test () {
            console.log(234)
        }

    },

});