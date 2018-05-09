var vm = new Vue({
    el: '#four',

    data: {
        // 当前人的级别
        userLevel: userLevel,
        currentAccYear: currentAccYear,

        // 合计
        yearSum: [ 1, 2, 3, 4],



        yearTitle: '',
        yearList: [],
        half: {},
        h1: {
            title: '',
            list: [],
            sum: [1, 2, 3, 4, 5, 6],
        },
        h2: {
            title: '',
            list: [],
            sum: [6,5,4,3,2,1],
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
        ],
        selectionDefaultText: 2018,
        selectionIsShow: false,
    },// data

    created: function () {
        this.getData()
    },

    methods: {
        getData: function (year) {
            year = year || currentYear;
            axios.get(PATH +'/a/contractAmount?aYear='+ year).then(function (datas){
                var data = datas.data;
                vm.yearTitle    = data.msg.aYearTitle;
                vm.yearList     = data.msg.aYear;
                vm.h1.title     = data.msg.h1Title;
                vm.h1.list      = data.msg.h1;
                vm.h2.title     = data.msg.h2Title;
                vm.h2.list      = data.msg.h2;
                vm.h1.sum       = vm.totalCalc(data.msg.h1, 'half');
                vm.h2.sum       = vm.totalCalc(data.msg.h2, 'half');
                vm.half         = vm.h1;

                vm.totalCalc(data.msg.aYear, 'year');
                vm.totalCalc(data.msg.h1, 'half');
                console.log(data.msg)
            });
        },

        halfToggle: function (flag) {
          if (flag == 1) {
              vm.half = vm.h1;
              vm.isActive = 1;
          } else{
              vm.half = vm.h2;
              vm.isActive = 2;
          }
        },
        
        // 合计
        totalCalc: function (arr, type) {
            if (type === 'year') {
                var complete =[],
                    difference =[],
                    target =[];
                arr.forEach(function (item) {
                    complete.push(item.complete)
                    difference.push(item.difference)
                    target.push(item.target)
                });

                this.yearSum[0] = arrSum(target)
                this.yearSum[1] = arrSum(complete)
                this.yearSum[2] = arrSum(difference)
                this.yearSum[3] = scaleCalc(arrSum(complete), arrSum(target))
            }
            if (type === 'half') {
                var ht = [],
                    hc = [],
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
                    accSub(arrSum(ht), arrSum(hc)),
                    scaleCalc(arrSum(hc), arrSum(ht)),
                    arrSum(t1),
                    arrSum(c1),
                    arrSum(t2),
                    arrSum(c2),
                ];
                for(i = 0; i < tempArr.length; i++){
                    halfArr[i] = tempArr[i];
                }
                return halfArr;
            }

        },

        // 日期选择
        changeSelectionList: function (event) {
            event.cancelBubble = true;// 阻止冒泡
            this.selectionIsShow = true;
        },
        clickItem: function (item) {
            this.selectionDefaultText = item;
            this.selectionIsShow = false;
            this.getData(item)
        },
        appClick: function (e) {
            this.selectionIsShow = false;
        },
    },


});//