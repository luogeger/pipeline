var vm = new Vue({
    el: '#app',
    data: {
        industry: [],

        // client
        client: [],
        clientPageTotal: 0,// 全部数据
        clientPageNum: 1,// 当前页
        clientPageSum: 1,// 共多少页
        clientPageMost: 20,// 页容量
        clientPageStart: 0,
        clientPageEnd: 0,

        // clientMsg
        clientMsg: [],

        // add
        dialogShow: true,
        addClientShow: true,
        addMsgShow: true,


        // edit

    },// data

    created: function (){
        this.getIndustry();
        this.getClient();
        this.getClientMsg();

    },// created

    methods: {
        getIndustry: function (){
            this.$http.get(url +'/basic/queryDictDataByCategory?categoryCodes=industryLine').then(function (datas){
                vm.industry = datas.body.msg.industryLine;
                console.log(vm.industry)
            });
        },

        getClient: function () {
            this.$http.get('../static/json/client/client.json').then(function (datas){
                vm.client = datas.body;
                vm.clientPageTotal = datas.body.totalProperty;
                vm.clientPageSum = Math.ceil(vm.clientPageTotal / vm.clientPageMost)
                vm.clientPageStart = (vm.clientPageNum -1) * vm.clientPageMost;
                if (vm.clientPageNum == vm.clientPageSum) {
                    vm.clientPageEnd = vm.clientPageTotal;
                    return;
                }
                vm.clientPageEnd = vm.clientPageStart +20;
            });
        },

        getClientMsg: function () {
            this.$http.get('../static/json/client/clientMsg.json').then(function (datas){
                vm.clientMsg = datas.body;
            });
        },

        calcPage: function (type, num) {
            type === 'client' ? vm.clientPage(type, num) : vm.msgPage(type, num);
        },// calcPage

        clientPage: function (type, num) {
            switch(num)
            {
                case 'first':
                    vm.getClient();
                    vm.clientPageNum = 1;
                    break;
                case 'last':
                    vm.getClient();
                    vm.clientPageNum = vm.clientPageSum;
                    vm.clientPageEnd = vm.clientPageTotal;
                    console.log(vm.clientPageTotal)
                    console.log(vm.clientPageEnd)
                    break;
                case 1:
                    if(vm.clientPageNum >= vm.clientPageSum)  return;
                    vm.clientPageNum++;
                    vm.getClient();
                    break;
                case -1:
                    if(vm.clientPageNum <= 0)  return;
                    vm.clientPageNum--;
                    vm.getClient();
                    break;

            }
        },

        clientEnter: function () {
            vm.getClient();
        },

        msgPage: function (type, num) {
            console.log(type, num, 'msg')
        },

        queryClientMsg: function (id) {
            console.log(id)
        },

        // ==
        addClient: function () {
            vm.dialogShow = false;
            vm.addClientShow = false;
        },

        addMsg: function () {
            vm.dialogShow = false;
            vm.addMsgShow = false;
        },

        allHide: function () {
            vm.dialogShow =     true;
            vm.addClientShow =  true;
            vm.addMsgShow =     true;
        }


    },// methods


});// app

