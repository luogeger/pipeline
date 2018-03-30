var vm = new Vue({
    el: '#app',

    data: {
        industry: [],// 行业线
        hDropText: '',// 行业下拉框文字

        // 分页
        clientPageTotal: 0,// 全部数据
        clientPageNum: 1,// 当前页
        clientPageSum: 1,// 共多少页
        clientPageMost: 10,// 页容量
        clientPageStart: 1,
        clientPageEnd: 1,
        firstClientCode: '',

        // nowIndex
        industryNowIndex: 0,// 事业部
        regionIndex: 0, // 区域
        provinceIndex: -1, // 省份


        // 客户
        client: [],
        regionList: [],// 区域
        provinceList: [],// 省份
        cCheckIndex: 0,

        // 添加客户
        cGroupText: '',// 所属于事业部
        cIndustryLineText : '',// 行业线

        cSalesGroupList: [],
        cReportDate: timeYear,// 报备时间
        cSalesGroupCode: '',// 所属于事业部
        cRegionCode: '',// 区域
        cProvinceCode: '',// 所在省份
        cCustomerCode: '',// 客户编号
        cCustomerName: '',// 客户名称
        cIndustryLineCode: '',// 行业线
        cRemark: '',// 备注

        // 机要信息
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

        // 行业
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

        // 区域
        getRegion: function (region) {
            region = region || 'region';
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ region).then(function (datas){
                vm.regionList = datas.body.msg.region;
                vm.cRegionCode = datas.body.msg.region[0].code;// 默认区域选中第一个
            });
        },// 区域

        // 省份
        getProvince: function (province) {
            province = province || 'regionHd';
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function (datas){
                vm.provinceList = datas.body.msg[province];
                vm.cProvinceCode = datas.body.msg[province][0].code;
            });
        },// 省份

        // 获取客户信息
        getClient: function (page, limit) {
            var obj = {
                page: page || 1,
                limit: limit || this.clientPageMost,
            };
            this.$http.get(PATH +'/crm/queryCustomerList', {params: obj}).then(function (datas){
                vm.client = datas.body;
                vm.clientPageTotal = datas.body.totalProperty;
                vm.firstClientCode = datas.body.root[0].customerCode;
                vm.clientPageSum = Math.ceil(vm.clientPageTotal / vm.clientPageMost)
                vm.clientPageStart = (vm.clientPageNum *10 -9);
                this.getClientMsg();
                if (vm.clientPageNum === vm.clientPageSum) {
                    vm.clientPageEnd = vm.clientPageTotal;
                    return;
                }
                vm.clientPageEnd = vm.clientPageNum * vm.clientPageMost;
            });
        },

        // 获取机要信息
        getClientMsg: function (code) {
            code = code || this.firstClientCode;
            this.$http.get(PATH +'/crm/queryCustomerContactList?soCustomerCode='+ code).then(function (datas){
                vm.clientMsg = datas.body;
            });
        },

        // 分页的判断
        calcPage: function (type, num) {
            type === 'client' ? vm.clientPage(type, num) : vm.msgPage(type, num);
        },// calcPage

        // 分页输入回车事件
        clientEnter: function () {
            vm.getClient();
        },

        // 客户分页
        clientPage: function (type, num) {
            switch(num)
            {
                case 'first':
                    vm.getClient(1);
                    vm.clientPageNum = 1;
                    break;
                case 'last':
                    vm.getClient(vm.clientPageSum);
                    vm.clientPageNum = vm.clientPageSum;
                    vm.clientPageEnd = vm.clientPageTotal;
                    break;
                case 1:
                    if(vm.clientPageNum >= vm.clientPageSum)  return;
                    vm.clientPageNum++;
                    vm.getClient(vm.clientPageNum);
                    break;
                case -1:
                    if(vm.clientPageNum <= 1)  return;
                    vm.clientPageNum--;
                    vm.getClient(vm.clientPageNum);
                    break;

            }
        },

        // 机要信息分页
        msgPage: function (type, num) {
            console.log(type, num, 'msg')
        },

        // 查询机要信息
        queryClientMsg: function (code, index) {
            vm.getClientMsg(code)
            vm.cCheckIndex = index;
        },




        // 添加客户 按钮事件
        addClient: function () {
            this.getGroup();
            this.getRegion();
            this.getProvince();
            this.showPop();// 显示弹框
            this.clearClient();// 清空弹窗信息
        },

        // 显示弹框
        showPop: function () {
            vm.dialogShow = false;
            vm.addClientShow = false;
        },

        hidePop: function () {
            vm.dialogShow =     true;
            vm.addClientShow =  true;
            vm.addMsgShow =     true;
        },

        // 点击添加客户，清空弹窗信息
        clearClient: function () {
            vm.cSalesGroupCode = '';// 事业部
            vm.cCustomerName = '';// 客户名称
            vm.cCustomerCode = '';// 客户编号
            vm.provinceIndex = -1;// 省份
            vm.regionIndex = 0;// 区域
            vm.cRemark = '';// 备注
            vm.cGroupText = '';
            vm.cIndustryLineText = '';
        },

        // 确认添加
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
            };
            console.log(addObj)

            this.addClientURL(addObj);
        },// addClientConfirm

        // 提交请求
        addClientURL: function (obj) {
            this.$http.get(PATH +'/crm/addOrUpdateCustomer', {params: obj}).then(function (datas){
                if (datas.body.code === 201) {
                    toastr.error(datas.body.msg)
                    return;
                }
                this.hidePop();
                this.getClient();
                toastr.success('添加客户成功');
            });
        },


        // 添加客户机要信息
        addMsg: function () {
            vm.dialogShow = false;
            vm.addMsgShow = false;
        },




        // 添加客户 收集信息
        selectGroup: function (code, text) {
            vm.cSalesGroupCode = code;
            vm.cGroupText = text;
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

        // 编辑客户
        editClient: function (index, id) {
            vm.dialogShow = false;
            vm.addClientShow = false;
            this.clearClient();
            console.log(vm.client.root[index]);
            this.$http.get(PATH +'/crm/queryCustomerOne?id=' +id).then(function (datas){
                msg =  datas.body.msg;
                console.log(msg)
            });

            // vm.cSalesGroupCod       = '';
            // vm.cRegionCod           = '';
            // vm.cProvinceCode        = '';
            // vm.cCustomerCode        = '';
            // vm.cCustomerName        = '';
            // vm.cIndustryLineCode    = '';
            // vm.cRemar               = '';

        },





        hDrop: function (text) {
            console.log(text, 'homeI')
            vm.hDropText = text;
        },


    },// methods

});// app

