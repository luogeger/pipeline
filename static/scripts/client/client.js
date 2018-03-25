var vm = new Vue({
    el: '#app',
    data: {
        industry: [],
        client: [],
        clientPageTotal: '',
        clientPageNum: 1,
        clientPagePage: 19,
        clientPageStart: 20,
        clientPageEnd: 40,


        clientMsg: [],
    },// data

    created: function (){
        this.getIndustry();
        this.getClient();
        this.getClientMsg();

    },// created

    methods: {
        getIndustry: function (){
            this.$http.get('../static/json/client/industry.json').then(function (datas){
                vm.industry = datas.body.msg.industryLine;
            });
        },

        getClient: function () {
            this.$http.get('../static/json/client/client.json').then(function (datas){
                vm.client = datas.body;
                vm.clientPageTotal = datas.body.totalProperty;
            });
        },

        getClientMsg: function () {
            this.$http.get('../static/json/client/clientMsg.json').then(function (datas){
                vm.clientMsg = datas.body;
            });
        },

        calcPage: function (type, num) {
            // 数量 类型
            type == 'client' ? vm.clientPage(type, num) : vm.msgPage(type, num);

        },// calcPage

        clientPage: function (type, num) {
            console.log(type, num, 'client')
        },

        msgPage: function (type, num) {
            console.log(type, num, 'msg')
        }



    },// methods


});// app

