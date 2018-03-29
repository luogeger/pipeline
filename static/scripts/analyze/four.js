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
    },// data

    created: function (year) {
        year = year || '2018';
        this.$http.get(PATH +'/a/contractAmount?aYear='+ year).then(function (datas){
            vm.yearTitle    = datas.body.msg.aYearTitle;
            vm.yearList     = datas.body.msg.aYear;
            vm.h1.title     = datas.body.msg.h1Title;
            vm.h1.list      = datas.body.msg.h1;
            vm.h2.title     = datas.body.msg.h2Title;
            vm.h2.list      = datas.body.msg.h2;
            vm.half         = vm.h1;
        });

    },

    methods: {
        halfToggle: function (flag) {
          if (flag == 1) {
              vm.half = vm.h1;
              vm.isActive = 1;
          } else{
              vm.half = vm.h2;
              vm.isActive = 2;
          }
        },
    },




});//