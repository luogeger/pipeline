var vm = new Vue({
    el: '#app',

    data: {
        industry: [],// 行业线
        hDropText: '',// 行业下拉框文字
        clientSubmit: false,

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
        clientID: '',
        client: [],
        cCheckIndex: 0,

        // 添加客户
        cAddIndustryCode: '',// 编辑客户，行业线，选项默认选中
        cGroupText: '',// 所属于事业部
        cIndustryLineText : '',// 行业线

        // 添加的客户信息
        cSalesGroupList: [],
        cReportDate: timeYear,// 报备时间
        cSalesGroupCode: '',// 所属于事业部
        cRegionCode: '',// 区域
        cProvinceCode: '',// 所在省份
        cCustomerCode: '',// 客户编号
        cCustomerName: '',// 客户名称
        cIndustryLineCode: '',// 行业线
        cAddress: '',
        cRemark: '',// 备注


        // 机要信息
        clientMsg: [],
        currentCustomerCode: 0,
        provinceList: [],// 省份
        regionList: [],// 区域

        // 添加机要信息 => 13个字段
        mID: '',
        mSalesStaffCode:    userCode,
        mCustomerCode:      '',
        mSalesStaffName:    userName,
        mContactName:       '',
        mRegionCode:        '',
        mProvinceCode:      '',
        mDepartmentName:    '',
        mTitle:             '',
        mTelPhone:          '',
        mEmail:             '',
        mAddress:           '',
        mRemark:            '',



        // 弹窗
        dialogShow: true,
        addClientShow: true,
        addMsgShow: true,


        // delete 要删除的变量

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
                vm.mRegionCode = datas.body.msg.region[0].code;// 默认区域选中第一个

            });
        },// 区域

        // 省份
        getProvince: function (province) {
            province = province || 'regionHd';
            this.$http.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function (datas){
                vm.provinceList = datas.body.msg[province];
                //vm.cProvinceCode = datas.body.msg[province][0].code;

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
            vm.cCheckIndex = 0;
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

        // 查询机要信息 绑定在tr上
        queryClientMsg: function (code, index) {
            vm.firstClientCode = code;
            vm.getClientMsg(code)
            vm.cCheckIndex = index;
        },




        // 添加客户 按钮事件
        addClient: function () {
            this.getGroup();
            this.showPop();// 显示弹框
            this.clearClient('c');// 清空弹窗信息
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
        clearClient: function (flag) {
            if (flag ===  'c') {
                vm.cSalesGroupCode = '';// 事业部
                vm.cCustomerName = '';// 客户名称
                vm.cCustomerCode = '';// 客户编号
                vm.cRemark = '';// 备注
                vm.cGroupText = '';
                vm.cIndustryLineText = '';
                vm.cAddress = '';
            } else{
                vm.provinceIndex = -1;// 省份
                vm.regionIndex = 0;// 区域
                vm.mContactName = '';
                vm.mDepartmentName = '';
                vm.mTitle   = '';
                vm.mTelPhone    = '';
                vm.mEmail   = '';
                vm.mAddress = '';
                vm.mRemark  = '';
            }

        },

        // 确认客户添加
        addClientConfirm: function () {
            var addObj = {
                salesGroupCode:     vm.cSalesGroupCode,
                customerCode:       vm.cCustomerCode,
                customerName:       vm.cCustomerName,
                industryLineCode:   vm.cIndustryLineCode,
                address:            vm.cAddress,
                remark:             vm.cRemark
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


        // 添加 机要信息 按钮事件
        addMsg: function () {
            vm.dialogShow = false;
            vm.addMsgShow = false;
            this.getRegion();// 获取区域信息
            this.getProvince();// 获取省份信息
            this.clearClient('m');// 清空弹窗信息
        },

        // 机要信息添加 收集字段  vm.firstClientCode
        // ====================================
        addMsgConfirm: function () {
            var addMsgObj = {
                customerCode:      vm.firstClientCode,//
                salesStaffCode:    vm.mSalesStaffCode,
                salesStaffName:    vm.mSalesStaffName,
                contactName:       vm.mContactName,
                regionCode:        vm.mRegionCode,// 区域
                provinceCode:      vm.mProvinceCode,// 省份
                departmentName:    vm.mDepartmentName,
                title:             vm.mTitle,
                telphone:          vm.mTelPhone,
                email:             vm.mEmail,
                address:           vm.mAddress,
                remark:            vm.mRemark,
            };
            console.log(addMsgObj)
            this.$http.get(PATH +'/crm/addOrUpdateCustomerContact', {params: addMsgObj}).then(function (datas){
                if (datas.body.code === 201) {
                    toastr.error(datas.body.msg)
                    return;
                }
                this.hidePop();
                this.getClient();
                toastr.success('添加客户机要信息成功');
            });
            //this.hidePop();
        },


        selectRegion: function (code) {
            vm.mRegionCode = code;
            vm.provinceIndex = -1;
            vm.getProvince(code)
        },

        selectProvince: function (code, index) {
            vm.provinceIndex = index;
            vm.mProvinceCode = code;
        },




        // 添加客户 收集信息
        // ====================================
        selectGroup: function (code, text) {
            vm.cSalesGroupCode = code;
            vm.cGroupText = text;
        },

        selectIndustry: function (code, text) {
            vm.cIndustryLineCode = code;
            vm.cIndustryLineText = text;
        },

        // 编辑客户
        editClient: function (index, id) {
            vm.clientSubmit = true;
            vm.dialogShow = false;
            vm.addClientShow = false;
            this.clearClient();
            this.$http.get(PATH +'/crm/queryCustomerOne?id=' +id).then(function (datas){
                msg =  datas.body.msg;

                vm.cGroupText           = '金融客户事业部';
                vm.cSalesGroupCode      = msg.salesGroupCode;
                vm.cCustomerCode        = msg.customerCode;
                vm.cCustomerName        = msg.customerName;
                vm.cAddress             = msg.address;
                vm.cRemark              = msg.remark;
                vm.clientID             = msg.id;

                for (key in vm.industry){
                    if (vm.industry[key].code === msg.industryLineCode) {
                        vm.cIndustryLineText = vm.industry[key].text;
                        vm.cAddIndustryCode = vm.cIndustryLineCode = msg.industryLineCode;
                    }
                }
            });
        },

        editClientConfirm: function () {
            var editObj = {
                id:  vm.clientID,
                salesGroupCode:     vm.cSalesGroupCode,
                //customerCode:       vm.cCustomerCode,
                customerName:       vm.cCustomerName,
                industryLineCode:   vm.cIndustryLineCode,
                address:            vm.cAddress,
                remark:             vm.cRemark

            };

            this.$http.get(PATH +'/crm/addOrUpdateCustomer', {params: editObj}).then(function (datas){
                console.log(datas)
                if (datas.body.code == 201) {
                    toastr.error(datas.body.msg)
                    return;
                }

                this.getClient();
                this.hidePop();
                toastr.success('修改客户成功 ！')
            });
        },





        // 行业里的点击事件
        hDrop: function (text) {
            vm.hDropText = text;
        },
    },// methods

});// app

// li-checkbox