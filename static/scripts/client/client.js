
var vm = new Vue({
    el: '#app',

    data: {
        industry: [],// 行业线
        // 用户级别
        userLevel: userLevel,// xs, xsld, dquyh
        levelActive: '',

        // 查询
        hDropText: '',// 行业下拉框文字
        hDropCode: '',// 行业 code
        hClientCode: '',// 客户编号
        hClientName: '',// 客户名称

        clientSubmit: false,// 控制添加和编辑客户的 btn,title
        msgSubmit: false,// 控制添加和编辑机要信息的 btn,title

        // 分页
        clientPageTotal: 0,// 全部数据
        clientPageNum: 1,// 当前页
        clientPageSum: 1,// 共多少页
        clientPageMost: 10,// 页容量
        clientPageStart: 1,
        clientPageEnd: 1,
        firstClientCode: '',// 第一条记录的 客户编号

        // nowIndex
        industryNowIndex: 0,// 事业部
        regionIndex: 0, // 区域
        provinceCode: -1, // 省份


        // 客户
        clientID: '',
        client: [],
        cCheckIndex: 0,

        // 审批的数据
        currentClientID: '',
        disposeRemark: '',

        // 添加客户
        cAddIndustryCode: '',// 编辑客户，行业线，选项默认选中
        cGroupText: '',// 所属于事业部
        cIndustryLineText : '',// 行业线

        // 添加的客户信息
        clientMsgID: '',
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
        uploadShow: true,
        revokeShow: true,// 撤回pop
        disposeShow: true,// 审批pop
        ignoreShow: true,// 忽略pop

        // 审批 (通过、驳回)



        // upload
        uploadFileName: '',
        clearShow: true,

        // 点击客户信息以后需要隐藏和现实的dom元素
        noData: false,// 客户table的 '没有数据!'
        noDataMsg: false,// 客户table的 '请输入客户名称进行查询!'
        clientNameQuery: false,// 请输入客户名称进行查询！ == 是否显示
        clientMsgQueryBtn: true,// 隐藏行业 + 隐藏客户编号

        onlySale: true,// 只有在销售的客户信息层面才能看到添加客户和导入按钮
        msgBtnIsShow: true,// 添加机要信息按钮

    },// data

    created: function (){
        if (this.userLevel !== 'xs') this.onlySale = false;// (添加客户 + 导入)按钮
        switch(this.userLevel) {
            case 'xs':
                this.levelActive = 'me';
                break;
            case 'xsld':
                this.levelActive = 'department';
                break;
            case 'dqxyh':
                this.levelActive = 'all';
                break;
        };// 不同客户查看到不同的客户信息

        this.getIndustry();
        this.getClient();
    },// created

    mounted (){

    },

    methods: {

        // 行业
        getIndustry: function (){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=industryLine').then(function (datas){
                vm.industry = datas.data.msg.industryLine;
            });
        },// 行业

        // 所属事业部
        getGroup: function () {
            axios.get(PATH +'/oauth/queryUserInfo').then(function (datas){
                vm.cSalesGroupList = datas.data.msg.mngSalesGroups;
            });
        },

        // 区域
        getRegion: function (region) {
            region = region || 'region';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ region).then(function (datas){
                vm.regionList = datas.data.msg.region;
                vm.mRegionCode = datas.data.msg.region[0].code;// 默认区域选中第一个

            });
        },// 区域

        // 省份
        getProvince: function (province) {
            province = province || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function (datas){
                vm.provinceList = datas.data.msg[province];
            });
        },// 省份


        // 导入
        upload: function () {
            vm.dialogShow = false;
            vm.uploadShow = false;
        },


        // 确认导入
        uploadConfirm: function () {
            var file = importFile.files[0];
            vm.uploadFileName = importFile.files[0].name;
            if(importFile.files[0] == undefined) {
                toastr.warning('请选择上传的文件 ！');
                return
            };
            var fd = new FormData();
            fd.append('crmFile', file);

            console.log(vm.uploadFileName);
            console.log(fd);
            axios.post('/iboss-prism/crm/importCrm', fd).then(function (datas){
                console.log(datas);
                if (datas.data.code === 201) {
                    toastr.error(datas.data.msg)
                } else{
                    toastr.success('文件上传成功 ！');
                    vm.hidePop();
                }

            });
        },

        // 获取客户信息
        getClient: function (page, limit,) {
            var params = {
                page:         page || 1,
                limit:        limit || this.clientPageMost,
                customerCode: this.hClientCode,
                customerName: this.hClientName,
                industryLine: this.hDropCode,
                queryType:    this.levelActive,
            };
            //params = Object.assign(params, obj);
            axios.get(PATH +'/crm/queryCustomerList', {params: params}).then(function (datas){
                console.log(datas.data.root)
                if (datas.data.root.length === 0) {// 客户信息为空
                    vm.msgBtnIsShow = false;// 机要信息按钮
                    vm.noData = true;// 客户table的 '没有数据!'
                    vm.noDataMsg = true;// 客户table的 '请输入客户名称进行查询!'
                    vm.clientNameQuery = false;// 客户table的 '请输入客户名称进行查询!'
                    vm.client = [];// 数据list

                    toastr.info('没有数据 !');
                    return;
                };
                vm.noData = false;// 客户table的 '没有数据!'
                vm.clientNameQuery = false;// 请输入客户名称进行查询！ == 是否显示
                vm.client = datas.data;// 数据list
                vm.msgBtnIsShow = true;// 不能显示添加机要信息按钮
                // 分页
                vm.clientPageTotal = datas.data.totalProperty;
                vm.firstClientCode = datas.data.root[0].customerCode;
                vm.clientPageSum = Math.ceil(vm.clientPageTotal / vm.clientPageMost);
                vm.clientPageStart = (vm.clientPageNum *10 -9);
                vm.getClientMsg();
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
            axios.get(PATH +'/crm/queryCustomerContactList?soCustomerCode='+ code).then(function (datas){
                if (datas.data.root.length === 0) {
                    vm.noDataMsg = true;
                    vm.clientMsg = [];
                } else{
                    vm.noDataMsg = false;
                    vm.clientMsg = datas.data;
                }
            });
        },

        // 分页的判断
        calcPage: function (type, num) {
            type === 'client' ? vm.clientPage(type, num) : vm.msgPage(type, num);
        },// calcPage

        // 分页输入回车事件
        clientEnter: function () {
            vm.getClient(vm.clientPageNum);
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
        queryClientMsg: function (code, index, id) {
            vm.firstClientCode = code;
            vm.getClientMsg(code)
            vm.cCheckIndex = index;
            vm.currentClientID = id;
        },

        // 用户级别信息查询
        changeClientList:function (level) {
            vm.levelActive = level;
            if (level === 'all') {
                vm.client = [];// 清空客户信息
                vm.clientMsg = [];// 清空客户机要信息

                vm.clientMsgQueryBtn = false;// 行业 + 客户编号
                vm.noData = false;// 客户table的 '没有数据!'
                vm.noDataMsg = true;// 客户机要信息table的 '没有数据!'
                vm.clientNameQuery = true;// 客户table的 '请输入客户名称进行查询!'
                vm.onlySale = false;// (添加客户 + 导入)按钮
                vm.msgBtnIsShow = false;// 机要信息按钮

                // 分页数据修改
                vm.clientPageTotal = 0;// 全部数据
                vm.clientPageNum = 1;// 当前页
                vm.clientPageSum = 0;// 共多少页
                vm.clientPageStart = 0;// 开始
                vm.clientPageEnd = 0;// 结束

                this.resetBtn();
                return;
            }
            if (level === 'me') {
                vm.clientMsgQueryBtn = true;// 行业 + 客户编号
                vm.noData = true;// 客户table的 '没有数据!'
                vm.noDataMsg = false;// 客户机要信息table的 '没有数据!'
                vm.clientNameQuery = false;// 客户table的 '请输入客户名称进行查询!'
                vm.onlySale = true;// (添加客户 + 导入)按钮
                vm.msgBtnIsShow = true;// 机要信息按钮

                this.resetBtn();
            }

            this.getClient()
        },


        // 添加客户 按钮事件
        addClient: function () {
            this.getGroup();
            this.showPop();// 显示弹框
            this.addClientShow = false;
            this.clearClient('c');// 清空弹窗信息
        },

        // 显示弹框
        showPop: function () {
            vm.dialogShow = false;
            //vm.addClientShow = false;
        },

        hidePop: function () {
            this.dialogShow =     true;
            this.addClientShow =  true;
            this.addMsgShow =     true;
            this.uploadShow =     true;
            this.revokeShow =     true;// 撤回pop
            this.disposeShow =    true;// 审批pop
            this.ignoreShow =     true;// 忽略pop
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
                vm.provinceCode = -1;// 省份
                vm.regionIndex = 0;// 区域
                vm.mProvinceCode = '';
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

            this.addClientURL(addObj);
        },// addClientConfirm

        // 提交请求
        addClientURL: function (obj) {
            axios.get(PATH +'/crm/addOrUpdateCustomer', {params: obj}).then(function (datas){
                if (datas.data.code === 201) {
                    toastr.error(datas.data.msg)
                    return;
                }
                vm.hidePop();
                vm.getClient();
                toastr.success('添加客户成功');
            });
        },


        // 添加 机要信息 按钮事件
        // ====================================
        addMsg: function () {
            this.clearClientMsg();
            vm.msgSubmit = false;
            vm.dialogShow = false;
            vm.addMsgShow = false;
            this.getRegion();// 获取区域信息
            this.getProvince();// 获取省份信息

        },


        // 清空机要信息输入框内容
        clearClientMsg: function () {
            vm.mContactName =        '';
            vm.mRegionCode =         '';
            vm.mProvinceCode =       '';
            vm.mDepartmentName =     '';
            vm.mTitle =              '';
            vm.mTelPhone =           '';
            vm.mEmail =              '';
            vm.mAddress =            '';
            vm.mRemark =             '';
        },


        // 机要信息添加 收集字段  vm.firstClientCode
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

            axios.get(PATH +'/crm/addOrUpdateCustomerContact', {params: addMsgObj}).then(function (datas){
                if (datas.data.code === 201) {
                    toastr.error(datas.data.msg)
                    return;
                }
                vm.hidePop();
                vm.getClientMsg(vm.firstClientCode);
                toastr.success('添加客户机要信息成功');
            });
            //this.hidePop();
        },



        // 编辑 机要信息 按钮事件
        // ====================================
        editMsg: function (id) {
            vm.clientMsgID = id;
            vm.clearClientMsg();
            vm.getRegion();
            axios.get(PATH +'/crm/queryCustomerContactOne?id=' +id)
                .then(function (datas){
                    var msg = datas.data.msg;
                    var code = datas.data.code;
                    if (code === 201) {
                        toastr.error(msg);
                        return;
                    }

                    if (code === 200) {
                        new Promise((resolve,reject) =>{
                            vm.getProvince(msg.regionCode);

                            //先执行这里的代码，只有这里代码执行完，才会执行下面的代码
                            resolve(msg);
                        }).then(msg =>{
                            // 处理成功resolve的数据

                            vm.mRegionCode =         msg.regionCode;
                            vm.mProvinceCode =       msg.provinceCode;
                            vm.mContactName =        msg.contactName;
                            vm.mDepartmentName =     msg.departmentName;
                            vm.mTitle =              msg.title;
                            vm.mTelPhone =           msg.telphone;
                            vm.mEmail =              msg.email;
                            vm.mAddress =            msg.address;
                            vm.mRemark =             msg.remark;


                            vm.msgSubmit = true;
                            vm.dialogShow = false;
                            vm.addMsgShow = false;

                        }).catch(err => {
                            // 处理reject失败的数据
                            console.log(err, 'Promise');
                        })
                    }
                });
        },

        editMsgConfirm: function (id) {
            var editMsgObj = {
                id: vm.clientMsgID,
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

            axios.get(PATH +'/crm/addOrUpdateCustomerContact', {params: editMsgObj} ).then(function (datas) {
               var msg = datas.data.msg;
               var code = datas.data.code;
               if (code === 201) {
                   toastr.error(msg)
                   return;
               } else{
                   vm.getClientMsg(vm.firstClientCode);
                   toastr.success('编辑机要信息成功 ！');
                   vm.hidePop();
               }

            });
        },

        selectRegion: function (code) {
            vm.mRegionCode = code;
            vm.provinceCode = -1;
            vm.getProvince(code)
        },

        selectProvince: function (code, item) {
            vm.provinceCode = code;
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
            axios.get(PATH +'/crm/queryCustomerOne?id=' +id).then(function (datas){
                msg =  datas.data.msg;

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

            axios.get(PATH +'/crm/addOrUpdateCustomer', {params: editObj}).then(function (datas){
                if (datas.data.code === 201) {
                    toastr.error(datas.data.msg)
                    return;
                }

                vm.cCheckIndex = 0;
                vm.getClient();
                vm.hidePop();
                toastr.success('修改客户成功 ！')
            });
        },


        // 查询
        queryBtn: function () {
            vm.getClient()
        },

        resetBtn: function () {
            vm.hClientCode = '';
            vm.hClientName = '';
            vm.hDropText = '';
            vm.hDropCode = '';
        },

        // 撤回
        revokeBtn: function (id) {
            this.showPop();
            this.revokeShow = false;
        },

        // 确认撤回
        confirmRevoke: function () {

        },

        // 忽略
        ignoreBtn: function () {
            this.showPop();
            this.ignoreShow = false;// 忽略的pop
        },

        // 确认忽略
        confirmIgnore: function () {
            var params = {
                id: this.currentClientID,
            };
            axios.get(PATH +'/crm/ignore', {params: params}).then(function (datas){
                var data = datas.data;
                console.log(data);
                if (data.code === 200) {
                    vm.hidePop();
                    vm.getClient()
                    toastr.success('客户信息已忽略 !')
                };
                if (data.code !== 200) {
                    toastr.error(data.msg)
                }
            });
        },


        // 审批
        disposeBtn: function (id) {
            this.showPop();
            this.disposeShow = false;
        },

        // 审批 -- 通过
        passRevokeBtn: function (type) {
            var params = {
                id: this.currentClientID,
                auditType: type,
                remark: this.disposeRemark,
            };
            axios.get(PATH +'/crm/audit', {params: params}).then(function (datas){
                var data = datas.data;
                if (data.code === 200) {
                    vm.hidePop();
                    vm.disposeRemark = '';// 清空审批的备注
                    vm.getClient()
                    toastr.success('审批完成 !')
                };
                if (data.code !== 200) {
                    toastr.error(data.msg)
                };

            });
        },




        // 行业里的点击事件
        hDrop: function (code, text) {
            vm.hDropText = text;
            vm.hDropCode = code;
        },
    },// methods

});// app