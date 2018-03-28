var vm = new Vue({
    el: '#app',

    data: {
        industry: [],// 行业线

        // 分页
        clientPageTotal: 0,// 全部数据
        clientPageNum: 1,// 当前页
        clientPageSum: 1,// 共多少页
        clientPageMost: 10,// 页容量
        clientPageStart: 0,
        clientPageEnd: 0,
        firstClientCode: '',


        // client
        client: [],
        regionList: [],// 区域
        provinceList: [],// 省份

        // nowIndex
        industryNowIndex: 0,// 事业部
        regionIndex: 0, // 区域
        provinceIndex: -1, // 省份

        // addClient
        cIndustryLineText: '',
        cSalesGroupList: [],
        cReportDate: timeYear,// 报备时间
        cSalesGroupCode: '',// 所属于事业部
        cRegionCode: '',// 区域
        cProvinceCode: '',// 所在省份
        cCustomerCode: '',// 客户编号
        cCustomerName: '',// 客户名称
        cIndustryLineCode: '',// 行业线
        cRemark: '',// 备注

        // clientMsg
        clientMsg: [],

        // addClientMsg

        // add
        dialogShow: true,
        addClientShow: true,
        addMsgShow: true,



        // edit

    },// data

    created: function (){
        this.getIndustry();
        this.getClient();
    },// created

    methods: {

        getIndustry: function (){
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=industryLine').then(function (datas){
                vm.industry = datas.body.msg.industryLine;
            });
        },// 行业

        // 所属事业部
        getGroup: function () {
            this.$http.get(PATH +'/oauth/queryUserInfo').then(function (datas){
                vm.cSalesGroupList = datas.body.msg.mngSalesGroups;
            });
        },

        getRegion: function (region) {
            region = region || 'region';
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ region).then(function (datas){
                vm.regionList = datas.body.msg.region;
                vm.cRegionCode = datas.body.msg.region[0].code;// 默认区域选中第一个
            });
        },// 区域

        getProvince: function (province) {
            province = province || 'regionHd';
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function (datas){
                vm.provinceList = datas.body.msg[province];
                vm.cProvinceCode = datas.body.msg[province][0].code;
            });
        },// 省份

        getClient: function () {
            //this.$http.get('../static/json/client/client.json').then(function (datas){
            this.$http.get(PATH +'/crm/queryCustomerList').then(function (datas){
                vm.client = datas.body;
                vm.clientPageTotal = datas.body.totalProperty;
                vm.firstClientCode = datas.body.root[0].customerCode;
                vm.clientPageSum = Math.ceil(vm.clientPageTotal / vm.clientPageMost)
                vm.clientPageStart = (vm.clientPageNum -1) * vm.clientPageMost;
                this.getClientMsg();
                if (vm.clientPageNum === vm.clientPageSum) {
                    vm.clientPageEnd = vm.clientPageTotal;
                    return;
                }
                vm.clientPageEnd = vm.clientPageStart + vm.clientPageMost;
            });
        },

        getClientMsg: function () {
            //this.$http.get('../static/json/client/clientMsg.json').then(function (datas){
            this.$http.get(PATH +'/crm/queryCustomerContactList?soCustomerCode='+ this.firstClientCode).then(function (datas){
                vm.clientMsg = datas.body;
            });
        },

        calcPage: function (type, num) {
            type === 'client' ? vm.clientPage(type, num) : vm.msgPage(type, num);
        },// calcPage

        // 分页
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
                    if(vm.clientPageNum <= 1)  return;
                    vm.clientPageNum--;
                    vm.getClient();
                    break;

            }
        },

        // 分页输入回车事件
        clientEnter: function () {
            vm.getClient();
        },

        msgPage: function (type, num) {
            console.log(type, num, 'msg')
        },

        queryClientMsg: function (id) {
            console.log(id)
        },

        // 添加客户 按钮事件
        addClient: function () {
            vm.dialogShow = false;
            vm.addClientShow = false;
            this.getGroup();
            this.getRegion();
            this.getProvince();
            this.clearClient();
        },

        clearClient: function () {
            vm.cSalesGroupCode = '';// 事业部
            vm.cCustomerName = '';// 客户名称
            vm.cCustomerCode = '';// 客户编号
            vm.provinceIndex = -1;// 省份
            vm.regionIndex = 0;// 区域
            vm.cRemark = '';// 备注
        },

        addClientURL: function (obj) {
            this.$http.get(PATH +'/crm/addOrUpdateCustomer', {params: obj}).then(function (datas){
                if (datas.body.code === 201) {
                    toastr.error(datas.body.msg)
                    return;
                }
                this.allHide();
                this.getClient();
                toastr.success('添加客户成功');
            });
        },

        addClientConfirm: function () {
            var addObj = {
                reportDate:         vm.cReportDate,
                salesGroupCode:     vm.cSalesGroupCode,
                regionCode:         vm.cRegionCode,
                provinceCode:       vm.cProvinceCode,
                customerCode:       vm.cCustomerCode,
                customerName:       vm.cCustomerName,
                industryLineCode:   vm.cIndustryLineCode,
                remark:             vm.cRemark,
            }

            for(key in addObj){
                if (addObj[key] === '') {
                    console.log(key)
                }
            }

            this.addClientURL(addObj);
        },// addClientConfirm


        // 添加客户机要信息
        addMsg: function () {
            vm.dialogShow = false;
            vm.addMsgShow = false;
        },



        allHide: function () {
            vm.dialogShow =     true;
            vm.addClientShow =  true;
            vm.addMsgShow =     true;
        },

        // 添加客户 收集信息
        selectGroup: function (code) {
            vm.cSalesGroupCode = code;
        },

        selectRegion: function (code, index) {
            vm.regionIndex = index;
            vm.cRegionCode = code;
            vm.provinceIndex = -1;
            vm.getProvince(code)
        },

        selectProvince: function (code, index) {
            vm.provinceIndex = index;
            vm.cProvinceCode = code;
        },

        selectIndustry: function (code, text) {
            vm.cIndustryLineCode = code;
            vm.cIndustryLineText = text;
        },



    },// methods

});// app

