var vm = new Vue({
    el: '#app',

    data () {
        return {
            data:           {},
            allRegion:      [],
            allIndustry:    [],
            colorValue:     ['#ED6D00', '#FFC732','#8786FE', '#F29EC2', '#26C5C8', '#CBE198'],

            chartOneX:      [],
            chartOneSum:    [],
            chartOneRate:   [],
            chartOnePie:    [],

            chartTwoX:      [],
            chartTwoSum:    [],
            chartTwoRate:   [],

            tHead:          [],
            tBody:          []
        }
    },

    created () {

    },

    mounted () {
        this.getData(_ => {
            this.chartOne()
            this.chartTwo()
        })
    },

    methods: {
        getData (callback) {
            axios
                .get(PATH +'/currency/midYear?type=rb')
                .then(datas => {
                    this.data = datas.data;
                    this.tHead = this.data.msg.rbTitle;
                    this.tBody = this.data.msg.rbList;
                    console.log(this.data.msg)
                    if (callback) callback();
                });
        },

        chartOneData (region) {
            region = region || '全国';
            this.data.msg.rbList.forEach((item, index) => {
                this.allRegion.push(item.text)
                if (index !== 0) {
                    this.chartOnePie.push({
                        value: item.rate,
                        name: item.text,
                        itemStyle: {
                            color: this.colorValue[index],
                        }
                    })
                }// 饼图数据

                if (item.text == region) {
                    item.children.forEach(_item => {
                        this.chartOneX.push(_item.text)
                        this.chartOneSum.push(_item.sum)
                        this.chartOneRate.push(_item.rate)
                    })

                }
            })
        },

        chartOne (region) {
            this.chartOneData(region)
            let box = echarts.init(document.getElementById('chartOne'));

            let option = {
                title : {
                    text: '区域内 - 各大行业的金额、占比',
                    x:'left',
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
                        },
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
                        radius: '50%',
                        center: ['80%', '40%'],
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

        chartTwoData (industry) {
            industry = industry || '全行业';
            this.data.msg.brList.forEach(item => {
                this.allIndustry.push(item.text)

                if (item.text === industry) {
                    item.children.forEach(_item => {
                        this.chartTwoX.push(_item.text)
                        this.chartTwoSum.push(_item.sum)
                        this.chartTwoRate.push(_item.rate)
                    })
                }
            })

        },

        chartTwo (industry) {
            this.chartTwoData(industry)
            let box = echarts.init(document.getElementById('chartTwo'));

            let option = {
                title : {
                    text: '大行业内 - 各区域的金额、占比',
                    x:'left',
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
                        data: this.chartTwoSum,
                    },
                    {
                        name:'占比',
                        type:'line',
                        yAxisIndex: 1,
                        lineStyle: {
                            type: 'dashed',
                        },
                        data: this.chartTwoRate,
                    },
                ]
            };
            box.setOption(option);
        },// chartTwo


    },

});