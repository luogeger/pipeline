var vm = new Vue({
    el: '#four',

    data: {
        yearTitle: '',
        yearList: [],
        half: {},
        h1: {
            title: '',
            list: [],
        },
        h2: {
            title: '',
            list: [],
        },

        isActive: 1,

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
                vm.half         = vm.h1;
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