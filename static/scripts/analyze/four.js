var vm = new Vue({
    el: '#four',

    data: {
        // 当前人的级别
        userLevel: userLevel,
        currentAccYear: currentAccYear,// 精确到上半年还是下半年
        currentGroup:  '',

        // 合计
        yearTitle: '',
        yearList: [],
        yearSum: [ 1, 2, 3, 4],

        half: {},
        h1: {
            title: '',
            list: [],
            sum: [1, 2, 3, 4, 5, 6],
        },
        h2: {
            title: '',
            list: [],
            sum: [6, 5, 4, 3, 2, 1],
        },

        isActive: currentAccYear,// 上半年 == 1, 下半年 == 2,

        // 下拉框年份选择
        yearRange: [
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2021,
            2022,
            2023,
            2024,
        ],
        selectionDefaultText_1: 2018,
        selectionIsShow_1: false,

        // 下拉框部门选择
        saleGroupList: saleGroupList,
        selectionDefaultText_2: '全部',
        selectionIsShow_2: false,
        sortClass: ['fa fa-sort-amount-desc', 'fa fa-sort-amount-asc', 'fa fa-sort'],
        amountCounter: 0,
        rateCounter: 0,
    },// data

    created: function () {
        this.getData();
        // this.halfToggle(vm.currentAccYear)
    },

    computed:{
        amountClass() {
            if (this.amountCounter <= 0) {
                return this.sortClass[2]
            }
            let n = (this.amountCounter % 2) | 0;
            return this.sortClass[n];
        },
        rateClass() {
            let n = (this.rateCounter % 2) | 0;

            if(this.rateCounter <= 0){
                return this.sortClass[2]
            }
            return this.sortClass[n];
        },
    },

    methods: {
        getData: function (year, obj) {
            year = year || currentYear;
            var params = {
                aYear: year,
                sgc: this.currentGroup,
                property: '',
                direction: '',
            };
            params = Object.assign(params, obj);
            axios.get(PATH +'/a/contractAmount', {params: params}).then(function (datas){
                var data = datas.data,
                    accYear = 'h' +vm.currentAccYear;
                console.log(data)
                vm.yearTitle    = data.msg.aYearTitle;
                vm.yearList     = data.msg.aYear;
                vm.h1.title     = data.msg.h1Title;
                vm.h1.list      = data.msg.h1;
                vm.h2.title     = data.msg.h2Title;
                vm.h2.list      = data.msg.h2;

                vm.totalCalc(data.msg.aYear, 'year');// 合计
                vm.totalCalc(data.msg.h1, 'half', 'h1');// 合计
                vm.totalCalc(data.msg.h2, 'half', 'h2');// 合计
                vm.half         = vm[accYear];
            });
        },


        // 合计
        totalCalc: function (arr, type, accYear) {
            if (type === 'year') {
                var complete =[],
                    difference =[],
                    target =[];
                arr.forEach(function (item) {
                    complete.push(item.complete)
                    difference.push(item.difference)
                    target.push(item.target)
                });

                this.yearSum[0] = arrSum(target)// 目标，数组求和
                this.yearSum[1] = arrSum(complete)// 完成，数组求和
                this.yearSum[2] = accSub(this.yearSum[1], this.yearSum[0])// 差额，减法
                this.yearSum[3] = accMul(this.yearSum[1], this.yearSum[0], '%');// 占比， 除法
            }

            if (type === 'half') {
                var ht = [],// target
                    hc = [],// complete
                    t1 = [],
                    t2 = [],
                    c1 = [],
                    c2 = [],
                    halfArr = [];

                arr.forEach(function (item) {
                    ht.push(item.hTarget);
                    hc.push(item.hComplete);
                    t1.push(item.q1Target);
                    c1.push(item.q1Complete);
                    t2.push(item.q2Target);
                    c2.push(item.q2Complete);
                });

                var i, tempArr = [
                    arrSum(ht),
                    arrSum(hc),
                    accSub(arrSum(hc), arrSum(ht)),
                    accMul(arrSum(hc), arrSum(ht), '%'),
                    arrSum(t1),
                    arrSum(c1),
                    arrSum(t2),
                    arrSum(c2),
                ];
                for(i = 0; i < tempArr.length; i++){
                    halfArr[i] = tempArr[i];
                }
                console.log(accYear, vm[accYear])
                vm[accYear].sum = halfArr;
            }

        },

        // 上下半年的切换
        halfToggle: function (flag) {
            if (flag === 1) {
                vm.half = vm.h1;
                vm.isActive = 1;
            } else{
                vm.half = vm.h2;
                vm.isActive = 2;
            }
        },

        // 年度筛选，部门筛选
        changeSelectionList: function (type) {
            if (type === 1){
                this.selectionIsShow_1 = !this.selectionIsShow_1;
                this.selectionIsShow_2 = false;
            }
            if (type === 2) {
                this.selectionIsShow_2 = !this.selectionIsShow_2;
                this.selectionIsShow_1 = false;
            }
        },
        clickItem: function (type, item, code) {
            if (type === 1) {// 年度
                this.selectionDefaultText_1 = item;
                this.selectionIsShow_1 = false;
                this.getData(item)
            }
            if (type === 2) {// 部门
                this.selectionDefaultText_2 = item.text;
                this.selectionIsShow_2 = false;
                this.currentGroup = item.code;
                this.getData()


            }

        },
        // 完成额排序
        completeAmount: function () {
            this.amountCounter ++;
            this.rateCounter = 0;
            console.log(this.amountCounter)
            var direction = '';
            this.amountCounter %2 === 0 ? direction = 'desc' : direction = 'asc';
            this.getData(null, {property: 'complete',direction: direction})
        },

        // 完成额占比排序
        completeRate: function () {
            this.rateCounter++;
            this.amountCounter = 0;
            var direction = '';
            this.rateCounter %2 === 0 ? direction = 'desc' : direction = 'asc';
            this.getData(null, {property: 'rate',direction: direction})

        },

    },// methods


});//