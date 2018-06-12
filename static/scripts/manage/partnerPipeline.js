$.ajaxSettings.async = true;
$(document).ready(function() {
    // 搜索-预计签约时间
    laydate.render({
        elem: '#startDate' //指定元素
        ,type: 'month'
        ,range: true
        // yyyy-MM - yyyy-MM
        ,value: vm.getYear()
        // ,value: vm.defaultYear + '-01 - ' + vm.defaultYear + '-12'
        // ,value: '2018-01 - 2018-12'
        ,isInitValue: true //允许填充初始值
        // 参数可选value, date(起始时间), endDate(结束时间)
        ,done: function(value) {
            vm.cExpectSignDateRange = value;
            var time = vm.cExpectSignDateRange.split(' - ');
            // var time = value.split(' - ');
            var startTime,
                endTime;
            startTime = time[0];
            endTime = time[1];
            vm.searchLists.expectSignDateStart = startTime;
            vm.searchLists.expectSignDateEnd = endTime;
        }
    });
    // 新增/修改-预计签约时间
    laydate.render({
        elem: '#signDate' //指定元素
        ,type: 'month'
        ,done: function(value) {
            vm.handleTemplate.expectSignDate = value;

        }
    });
})

var vm = new Vue({
    el: '#app',
    data: {
        // ===初始值
        initialValLists: [{          // 初始值基本信息
            latelyChanges: '',       // 近期变更过
            industryLines: ''        // 行业线
        }],
        oauthLists: [],              // 初始值权限信息

        customerAttr: [],             // 客户属性
        regions: '',                  // 区域code
        isHide: false,                // 若区域下无省份，则隐藏省份块
        provinceLists: [],            // 客户所在省份
        cpCustomerTypeLists: [],      // 合作伙伴类型

        soDepartmentLists: [],        // 查询直销事业部集和销售集

        // 定义搜索值信息
        searchLists: {},              // 存放搜索值
        cpCustomerName: '',           // 合作伙伴名称
        cIndustryLineText: '',        // 行业线
        cExpectSignDateRange: '',     // 预计签约时间
        cProjectSuccessMinText: '',   // 最小成功率
        cProjectSuccessMinCode: '',   // 最小成功率code
        cProjectSuccessMaxText: '',   // 最大成功率
        cProjectSuccessMaxCode: '',   // 最大成功率code
        projectSuccessRates: [],      // 存放成功率
        cRegionText: '',              // 区域
        cCustomerSourText: '',        // 客户来源
        cpCustomerTypeText: '',       // 合作伙伴类型
        cSoSolutionFirstText: '',     // 大解决方案
        cSoSolutionSecondText: '',    // 小解决方案
        solutionFirstLists: [],       // 存放大解决方案
        solutionSecondLists: [],      // 存放小解决方案

        // ===模糊查询
        // 客户名称
        fuzzyQueryList_1: [],
        fuzzyQueryList_2: [],
        customerNames: '',            // 获取客户名称
        customerNameArray: [],        // 单独存放客户名称的name
        departmentCodeArray: [],      // 单独存放客户所在事业部的code
        // 售前
        preSalesStaffList: [],

        // ===查询
        pipelineData: [],           // pipeline表格数据
        weightedSumTotal: '',       // 加权金额总计
        expectSignSumTotal: '',     // 预计签约金额总计
        // data: [],
        dataPageTotal: 0,           // 全部数据
        dataPageNum: 1,             // 当前页
        dataPageSum: 1,             // 共多少页
        dataPageMost: 10,           // 页容量
        dataPageStart: 0,
        dataPageEnd: 0,
        noData: false,               // 搜索不到数据

        // ===查询审核历史记录
        auditHistoryShow: false,   // 审核历史记录
        auditHistoryTitle: '',     // 审核历史记录 客户姓名
        auditHistoryList: [],      // 审核历史记录数据

        // ===项目更新情况
        changeOneLists: [],           // 存放项目更新情况

        noUpdateCase: false,          //
        updateCaseMsg: '',            // 提示语句
        updateCaseShow: true,
        ismaxWidth: true,
        isClicked: -1,                // 下标 表格tr添加active

        // ===新增/修改
        handleTemplate: {},
        nothing: '',

        hReportDate: timeYear,      // 报备日期
        hSalesGroupText: userGroup, // 销售小组
        hSalesStaffName: userName,  // 负责销售
        hPreSaleStaffsName: '',     // 负责售前
        hCpCustomerName: '',        // 合作伙伴名称  CPA201805000013
        hCpCustomerTypeText: '',    // 合作伙伴类型
        hSoSolutionFirstText: '',   // 大解决方案
        hSoSolutionSecondText: '',  // 小解决方案
        solutionFirstLists: [],     // 存放大解决方案
        solutionSecondLists: [],    // 存放小解决方案
        hIndustryLineText: '',      // 行业线名称
        hWeightedSum: 0,            // 加权金额总计（万元）
        hSuccessRateText: '',       // 成功率名称
        hExpectSignDate: '',        // 预计签约时间
        hCustomerSourceText: '',    // 客户来源名称
        hProgressText: '',          // 项目阶段
        hRegionName: '',            // 区域
        hProvinceName: '',          // 省份

        hSoDepartmentCode: '',      // 分配时的事业部code
        hSoDepartmentName: '',      // 分配时的事业部name

        hRemark: '',                // 驳回备注

        solutionSub: [],            // 点击修改时获取表格的值

        isCheck: true,              // 是否是销售老大查看
        isAllotHide: true,          // 是否隐藏分配模块
        isRejectHide: true,         // 是否隐藏驳回模块

        oneDataId: '',              // 再次确认用到的id

        // ===弹窗
        dialogShow: true,           // 外层弹窗
        handleDataShow: true,       // 新增修改pipeline弹窗
        checkDataShow: true,        // 查看pipeline弹窗

        secondDialogShow: true,     // 二级外层弹窗
        revokeShow: true,           // 确认撤回弹窗
        allotShow: true,            // 确认分配弹窗

        listss: [
            {hPreSaleStaffsName: ''}
        ]
    },
    created: function() {
        this.initialValData();        // 初始值
        this.getSuccessRate();
        this.getCpCustomerType();    // 初始值-合作伙伴类型
        this.getSoSolution4Tree();   // 初始值-解决方案
        this.signDate();
        this.getFuzzyList();       // 模糊查询客户名称
         /* this.getPreSalesStaff();     // 模糊查询售前*/
        this.openUpdateCase();      // 显示表格右侧项目更新情况
        this.getPipelineData();     // 查询pipeline数据
    },
    methods: {
        // 关闭一级弹窗
        dialogHide: function() {
            vm.dialogShow = true;
        },
        // 显示二级弹框
        showSecondPop: function () {
            this.secondDialogShow = false;
        },
        // 关闭二级弹窗
        hideSecondPop: function() {
            this.secondDialogShow = true;
            this.revokeShow = true;        // 确认撤回pop
            this.allotShow = true;         // 确认分配pop
        },

        // 格式化数字
        toThousands: function(num) {
            var num = (num || 0).toString(),   // toString() 转换成字符串
                result = "";
            while(num.length > 3) {
                result = "," + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if(num) {
                result = num + result;
            }
            return result;
        },
        // 初始值--
        initialValData: function(){
            var basic,
                oauth;
            axios.get(PATH +'/so/queryPipelineInitVal').then(function(datas) {
                var data = datas.data;
                basic = data.msg.basic;
                oauth = data.msg.oauth;
                if(data !== null){
                    if(basic !== null){
                        vm.initialValLists = basic;

                        console.log(vm.initialValLists,'vm.initialValLists');

                        vm.handleTemplate.region = vm.initialValLists.regions[0].code;// 默认区域选中第一个
                        // vm.handleTemplate.regionCode = vm.initialValLists.regions[0].code;// 默认区域选中第一个

                        console.log(vm.handleTemplate.region,'vm.handleTemplate.region');
                        console.log(vm.initialValLists.regions[0].code,'vm.initialValLists.regions[0].code');
                    }
                    if(oauth !== null){
                        vm.oauthLists = oauth;
                        vm.mngSalesGroups = vm.oauthLists.userInfo.mngSalesGroups;
                    }
                }
            })
        },
        // 获取成功率
        getSuccessRate: function(){
            axios.get(PATH +'/so/queryPipelineInitVal').then(function(datas) {
                var data = datas.data;
                if(data.code == 200) {
                    vm.projectSuccessRates = data.msg.basic.projectSuccessRates;
                }
            })
        },
        // 初始值--获取解决方案
        getSoSolution4Tree: function(id, code){
            var basic,
                oauth;
            this.solutionFirstLists = [];
            this.solutionSecondLists = [];

            axios.get(PATH +'/so/queryPipelineInitVal').then(function(datas) {
                var data = datas.data;
                basic = data.msg.basic;
                if(data !== null){
                    if(basic !== null){
                        // 解决方案
                        var solutionLists = basic.soSolution4Tree;
                        if(solutionLists !== null) {
                            for(var i = 0;i < solutionLists.length;i++) {
                                vm.solutionFirstLists.push(solutionLists[i]);

                                if(solutionLists[i].children != null) {
                                    for (var j = 0; j < solutionLists[i].children.length; j++) {
                                        var childrenLists = solutionLists[i].children[j];
                                        if(id === childrenLists.parentId) {
                                            vm.solutionSecondLists.push(childrenLists);
                                        }

                                        // 如果code == 修改时解决方案传过来的code，则给大解决方案input添加值
                                        if(solutionLists[i].children[j].data.code === code) {
                                            vm.hSoSolutionFirstText = solutionLists[i].text;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        // 初始值--获取省份
        getProvince: function(province) {
            province = province || 'regionHd';
            var params = {
                categoryCodes: province
            };
            axios.get(PATH +'/basic/queryDictDataByCategory', {params:params}).then(function(datas) {
                var data = datas.data;
                vm.provinceLists = data.msg[province];
            })
        },
        // 初始值--获取合作伙伴类型
        getCpCustomerType: function() {
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=cooperativePartnerType').then(function(datas){
                vm.cpCustomerTypeLists = datas.data.msg.cooperativePartnerType;

                console.log(vm.cpCustomerTypeLists,'获取合作伙伴类型');
            })
        },
        // 失焦隐藏模糊列表
        hideFuzzyQuery: function (type) {
            // var list = 'fuzzyQueryList_' +type;
            // vm[list] = [];
            // === 隐藏合作伙伴客户名称
            vm.fuzzyQueryList_1 = [];
            vm.fuzzyQueryList_2 = [];
            // === 隐藏销售
            vm.salesList = [];
            // === 隐藏售前
            vm.preSalesStaffList = [];
        },
        // 初始值--模糊查询合作伙伴客户名称
        getFuzzyList: function (type) {
            var clientName;
            switch (type) {
                case 1:
                    clientName = vm.cpCustomerName;
                    break;
                case 2:
                    clientName = vm.hCpCustomerName;
                    break;
            }
            $.ajax({
                url: PATH +'/cp/crm/selectCustomer4Like',
                data: {
                    name: clientName
                },
                type: 'get',
                async: false,
                dataType: 'json',
                success: function(result) {
                    var list = 'fuzzyQueryList_' +type;
                    if (result.code === 201 || result.msg.length === 0) return;
                    vm[list] = result.msg;
                    vm.customerNames = result.msg;
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
        },// 获取数据
        selectFuzzyText: function (type, text, code, departmentCode, hasConcat, whole) {
            console.log(code);
            switch (type) {
                case 1:
                    vm.searchLists.cpCustomerCode = code;
                    vm.cpCustomerName = text;
                    break;
                case 2:
                    // 判断该客户名称是否是该销售所在事业部下的
                    if(departmentCode !== vm.handleTemplate.salesGroupCode) {
                        toastr.warning('不可建立此客户信息!');
                    }else {
                        // hasConcat=y   名下存在客户机要信息，hasConcat=n 不存在机要
                        if(hasConcat == 'n') {
                            toastr.warning('该客户名下没有机要信息!');
                        }
                        // whole=y 机要信息全    whole=n 机要信息不全
                        else if (whole == 'n') {
                            toastr.warning('该客户名下机要信息不全,请完善客户机要信息!');
                        }
                    }
                    vm.hCpCustomerName = text;
                    vm.handleTemplate.cpCustomerCode = code;
                    break;
            }
        },// 选中文字，隐藏模糊列表
        // 初始值--模糊查询售前
        getPreSalesStaff: function() {
            $.ajax({
                url: PATH + '/basic/selectPreSalesStaff4Like',
                data: {
                    menn: this.hPreSaleStaffsName
                },
                dataType: 'json',
                type: 'get',
                success: function(result) {
                    console.log(result);
                    if(result.code === 201 || result.msg.length === 0) return;

                    vm.preSalesStaffList = result.msg;
                    console.log(vm.preSalesStaffList,'vm.preSalesStaffList')
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
        },
        selectPreSalesStaff: function(name,email) {
            vm.hPreSaleStaffsName = name;
            // vm.hPreSaleStaffsName = name + '，';
            vm.handleTemplate.preSalesStaff = email;
        },
        addLlist: function() {
            this.listss.push({hPreSaleStaffsName: ''})
        },
        deleteLlist: function(index) {
            this.listss.splice(index,1);
        },
        // 查询直销事业部集和销售集
        getSoDepartment: function() {
            $.ajax({
                url: PATH +'/basic/selectSoDepartment',
                type: 'get',
                async: false,
                dataType: 'json',
                success: function(result) {
                    console.log(result,'result--getSoDepartment');
                    if(result) {
                        if (result.msg.length === 0) {
                            return;
                        }else{
                            console.log(result,'result.msg--getSoDepartment');
                            vm.soDepartmentLists = result.msg;
                            console.log(vm.soDepartmentLists,'vm.soDepartmentLists');
                        }
                    }
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
        },
        // 获取年份
        getYear: function() {
            var yearRange;
            $.ajax({
                async: false,
                url: PATH + '/oauth/queryUserInfo',
                type: 'get',
                dateType: 'json',
                success: function(result) {
                    var date = result.msg.currentDate;
                    this.defaultYear = date.slice(0, 4);
                    yearRange = this.defaultYear + '-01 - ' + this.defaultYear + '-12';
                },
                error: function(result) {
                    console.log('获取年份失败');
                }
            })
            return yearRange;
        },
        signDate: function() {
            this.cExpectSignDateRange = this.getYear();
            var time = this.cExpectSignDateRange.split(' - ');
            var startTime,
                endTime;
            startTime = time[0];
            endTime = time[1];
            this.searchLists.expectSignDateStart = startTime;
            this.searchLists.expectSignDateEnd = endTime;
            this.getPipelineData();
        },
        // 搜索框查询
        querySearchForm: function() {
            this.getPipelineData();
        },
        // 搜索框清空
        clearSearchForm: function() {
            vm.cpCustomerName = '';                 // 合作伙伴名称
            vm.cIndustryLineText = '';              // 行业线
            // vm.cProjectSuccessRateText = '';     // 成功率
            vm.cProjectSuccessMinText = '',         // 最小成功率
            vm.cProjectSuccessMaxText = '',         // 最大成功率
            //     vm.cProjectSuccessMinCode = '';
            // vm.cProjectSuccessMaxCode = '';
            // vm.cMngSalesGroupText = '';          // 事业部
            vm.cRegionText = '';                    // 区域
            vm.cCustomerSourText = '';              // 客户来源
            vm.cpCustomerTypeText = '';             // 客户来源
            vm.cSoSolutionFirstText = '';           // 大解决方案
            vm.cSoSolutionSecondText = '';          // 小解决方案
            // vm.cLatelyChangeText = '';           // 近期变更过
            // vm.cSalesName = '';                  // 近期变更过

            this.searchLists = {};
            this.signDate();
            this.getPipelineData();
        },
        //// ==========搜索获取下拉code========
        // 选中行业线
        searchIndustryLineCode: function(code, text) {
            this.searchLists.industryLine = code;
            vm.cIndustryLineText = text;
        },
        // 选中最小成功率
        searchSuccessMinCode: function(code, text) {
            this.searchLists.successRateCodeMin = code;
            vm.cProjectSuccessMinText = text;
            vm.cProjectSuccessMinCode = code;
        },
        // 选中最大成功率
        searchSuccessMaxCode: function(code, text) {
            this.searchLists.successRateCodeMax = code;
            vm.cProjectSuccessMaxText = text;
            vm.cProjectSuccessMaxCode = code;

            vm.cProjectSuccessMinCode = '';
            vm.cProjectSuccessMaxCode = '';
        },
        // 选中区域
        searchRegionCode: function(code, text) {
            this.searchLists.regionCode = code;
            vm.cRegionText = text;
        },
        // 选中客户来源
        searchCustomerSourceCode: function(code, text) {
            this.searchLists.customerSourceCode = code;
            vm.cCustomerSourText = text;
        },
        // 选中合作伙伴类型
        searchCpCustomerTypeCode: function(code, text) {
            this.searchLists.cooperativePartnerType = code;
            vm.cpCustomerTypeText = text;
        },
        // 选中大解决方案
        searchSolutionFirst: function(id, text, type) {
            switch (type) {
                case 1:
                    vm.cSoSolutionSecondText = '';
                    this.searchLists.soSolutionCode = '';

                    vm.cSoSolutionFirstText = text;
                    this.getSoSolution4Tree(id);
                    break;
                case 2:
                    this.searchSolutionSecond('', '', 2);
                    vm.hSoSolutionFirstText = text;
                    this.getSoSolution4Tree(id);
                    break;
            }
        },
        // 选中小解决方案
        searchSolutionSecond: function(code, text, type) {
            switch (type) {
                case 1:
                    vm.cSoSolutionSecondText = text;
                    this.searchLists.soSolutionCode = code;
                    break;
                case 2:
                    vm.hSoSolutionSecondText = text;
                    vm.handleTemplate.solutionCode = code;
                    break;
            }
        },


        // ====查询
        // 获取表格右侧项目更新情况数据
        showOneChange: function(soCoreCode, index) {
            vm.changeOneLists = [] // 先清空项目更新情况列表
            this.isClicked = index; // tr添加active
            var params = {
                opDataKey: soCoreCode
            };
            axios.get(PATH + '/so/queryPipelineChangeHis', {params:params}).then(function(datas) {
                var data = datas.data;
                if(data.root.length == 0) {
                    vm.noUpdateCase = true;
                    vm.updateCaseMsg = '暂无项目更新情况';
                }else {
                    vm.noUpdateCase = false;
                    vm.updateCaseMsg = '';
                    for(var i = 0;i < data.root.length;i++){
                        var root = data.root[i];
                        vm.changeOneLists.push(root);
                    }
                }
            })
        },
        // 显示表格右侧项目更新情况
        openUpdateCase: function() {
            this.updateCaseShow = false
            this.ismaxWidth = false
        },
        // 关闭表格右侧项目更新情况
        closeUpdateCase: function() {
            this.updateCaseShow = true
            this.ismaxWidth = true
        },

        // 获取pipeline表格数据
        getPipelineData:  function(page, limit) {
            this.searchLists.page = page || 1;
            this.searchLists.limit = limit || this.dataPageMost;
            console.log(this.searchLists,'获取pipeline表格数据请求参数')

            axios.get(PATH + '/cp/so/selectPipeline', {params: this.searchLists}).then(function(datas) {
                var data = datas.data;
                vm.pipelineData = data;
                console.log(vm.pipelineData,'获取pipeline表格数据');
                // 如果表格无数据
                if(data.root.length === 0) {
                    toastr.warning('没有相关信息 ！');
                    vm.noData = true;

                    vm.closeUpdateCase();  // 关闭右侧项目更新情况
                    return;
                }
                else {
                    // 默认第一条tr添加active
                    if(vm.pipelineData.root[0].soCoreCode) {
                        vm.showOneChange(vm.pipelineData.root[0].soCoreCode, 0);
                    }
                }
                //vm.weightedSumTotal = vm.toThousands(Math.round(vm.pipelineData.oth.weightedSumTotal));      // 预计签约金额(万元)总计
                //vm.expectSignSumTotal = vm.toThousands(Math.round(vm.pipelineData.oth.expectSignSumTotal));  // 加权金额总计(万元)总计

                /*for(var i = 0;i < vm.pipelineData.length;i++){
                    var root = result.root[i];
                    vm.items.push(root);
                }*/
                vm.noData = false;
                vm.dataPageTotal = vm.pipelineData.totalProperty;
                if(vm.dataPageTotal < 10) {
                    vm.dataPageNum = 1;
                }
                vm.dataPageSum = Math.ceil(vm.dataPageTotal / vm.dataPageMost)
                vm.dataPageStart = (vm.dataPageNum -1) * vm.dataPageMost + 1;

                if (vm.dataPageNum === vm.dataPageSum) {
                    vm.dataPageEnd = vm.dataPageTotal;
                    return;
                }
                vm.dataPageEnd = vm.dataPageStart - 1 + vm.dataPageMost;
            })
        },
        // 分页
        calcDataPage: function (type, num) {
            type === 'data' ? vm.dataPage(type, num) : '';
        },// calcDataPage
        // 分页输入回车事件
        dataEnter: function () {
            vm.getPipelineData(vm.dataPageNum);
        },
        dataPage: function (type, num) {
            vm.cCheckIndex = -1;
            switch(num)
            {
                case 'first':
                    vm.dataPageNum = 1;
                    vm.getPipelineData(1);
                    break;
                case 'last':
                    vm.dataPageNum = vm.dataPageSum;
                    vm.dataPageEnd = vm.dataPageTotal;
                    vm.getPipelineData(vm.dataPageNum);
                    break;
                case 1:
                    if(vm.dataPageNum >= vm.dataPageSum)  return;
                    vm.dataPageNum++;
                    vm.getPipelineData(vm.dataPageNum);
                    break;
                case -1:
                    if(vm.dataPageNum <= 1)  return;
                    vm.dataPageNum--;
                    vm.getPipelineData(vm.dataPageNum);
                    break;
            }
        },

        // ====新增/修改
        // 清空新增/修改表单
        clearHandle: function() {
            this.hReportDate = timeYear;    // 报备日期
            vm.hSalesStaffName = userName;  // 销售
            vm.hPreSaleStaffsName = '';     // 售前
            vm.hCpCustomerName = '';        // 合作伙伴名称
            vm.hCpCustomerTypeText = '';    // 合作伙伴类型
            vm.hSalesGroupText = userGroup; // 事业部
            vm.hSolutionText = '';          // 解决方案名称
            vm.hSoSolutionFirstText = '',   // 大解决方案
            vm.hSoSolutionSecondText = '',  // 小解决方案
            vm.hIndustryLineText = '';      // 行业线名称
            vm.hSuccessRateText = '';       // 成功率名称
            vm.hWeightedSum = 0;            // 加权金额总计
            vm.hCustomerSourceText = '';    // 客户来源名称
            vm.hProgressText = '';          // 项目阶段名称

            vm.handleTemplate = {};
        },
        commonData: function() {
            this.clearHandle();          // 调用（清空新增/修改表单）
            this.getProvince();          // 调用（获取省份信息）
            this.getCpCustomerType();    // 调用（获取合作伙伴类型）

            // 默认填写所属事业部
            /*vm.handleTemplate.cpDepartmentKey = vm.oauthLists.userInfo.mngSalesGroups[0].code;
            vm.hSalesGroupText = vm.oauthLists.userInfo.mngSalesGroups[0].text;*/

            this.dialogShow = false;           // 显示弹窗
            this.handleDataShow = false;       // 显示新增修改pipeline弹窗
            this.auditHistoryShow = false;      // 隐藏审核记录
        },
        // 获取单条数据
        getOneData: function(id, index) {
            var params = {
                id: id
            };
            axios.get(PATH +'/cp/so/selectPipeline', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'data');
                if(data.code === 201) return;
                vm.handleTemplate = data.root[0];
                console.log('-----本条数据------');
                console.log(data.root,'data.root');

                if(data.root.length != 0) {
                    vm.getProvince(vm.handleTemplate.region);                       // 省份信息
                    vm.getSoSolution4Tree('', vm.handleTemplate.solutionCode);

                    vm.hReportDate = vm.handleTemplate.reportDate;                  // 报备日期
                    vm.hSalesStaffName = vm.handleTemplate.cpSalesStaffName;        // 销售
                    vm.hSalesGroupText = vm.handleTemplate.cpDepartmentName;        // 销售小组
                    vm.hPreSaleStaffsName = vm.handleTemplate.preSalesStaff;        // 售前
                    vm.hCpCustomerName = vm.handleTemplate.cpCustomerName;          // 合作伙伴名称
                    vm.hCpCustomerTypeText = vm.handleTemplate.cpCustomerTypeName;  // 合作伙伴类型
                    vm.hSoSolutionSecondText = vm.handleTemplate.solutionName;      // 解决方案
                    vm.hIndustryLineText = vm.handleTemplate.industryLineName;      // 行业线
                    vm.hSuccessRateText = vm.handleTemplate.successRateName;        // 成功率
                    vm.hWeightedSum = vm.handleTemplate.weightedSum;                // 加权金额总计（万元）
                    vm.hCustomerSourceText = vm.handleTemplate.customerSourceName;  // 客户来源
                    vm.hProgressText = vm.handleTemplate.progressName;              // 项目阶段

                    // ===查看pipeline数据
                    vm.hRegionName = vm.handleTemplate.regionName;                  // 区域
                    vm.hProvinceName = vm.handleTemplate.provinceName;              // 省份
                    vm.oneDataId = vm.handleTemplate.id;                            // 获取id

                    // ===查看审核历史记录
                    vm.auditHistoryList = vm.handleTemplate.auditLogs;
                    vm.auditHistoryTitle = vm.handleTemplate.customerName
                }
            })
        },
        // 查询审核历史记录
        getHistoryLog:function(id) {
            this.getOneData(id);               // 调用（查询一条数据接口）
            this.dialogShow = false;          // 显示弹窗
            this.handleDataShow = true;       // 隐藏新增修改pipeline弹窗
            this.auditHistoryShow = true;     // 显示审核记录
        },
        // 点击新增按钮
        addData: function() {
            this.commonData();                // 调用（新增/修改共同代码）
        },
        // 点击编辑按钮
        editData: function(id, index) {
            this.commonData();               // 调用（新增/修改共同代码）
            this.isCheck = false;
            this.getOneData(id, index);      // 调用（查询一条数据接口）
            console.log(id,'id');
            },
        // 选中合作伙伴类型
        selectCpCustomerTypeCode: function(code, text) {
            this.handleTemplate.cpCustomerType = code;
            vm.hCpCustomerTypeText = text;
        },// 选中行业线
        selectIndustryLineCode: function(code, text) {
            // this.handleTemplate.industryLineCode = code;
            this.handleTemplate.industryLine = code;
            vm.hIndustryLineText = text;
        },
        // 选中成功率
        selectSuccessRateCode: function(code, text) {
            this.handleTemplate.successRate = code;
            // this.handleTemplate.successRateCode = code;
            vm.hSuccessRateText = text;

            if(vm.handleTemplate.expectSignSum != '') {
                vm.hWeightedSum = accMul(vm.handleTemplate.expectSignSum, code);
                vm.hWeightedSum = Math.round(vm.hWeightedSum * 1)/100; // 保留两位小数
            }
        },
        // 选中项目阶段
        selectProgressCode: function(code, text) {
            this.handleTemplate.progress = code;
            vm.hProgressText = text;
        },
        // 选中客户来源
        selectCustomerSourceCode: function(code, text) {
            this.handleTemplate.customerSource = code;
            vm.hCustomerSourceText = text;
        },
        // 选中区域
        selectRegion: function(code) {
            this.handleTemplate.region = code;
            this.isActiveProvince = -1;
            this.getProvince(code);
        },
        // 选中省份
        selectProvince: function(code){
            vm.handleTemplate.province = code;

            vm.nothing = code;
        },
        // 选中分配的事业部
        selectSoDepartment: function(code, text) {
            vm.hSoDepartmentCode = code;
            vm.hSoDepartmentName = text;
        },
        // 新增/修改 填写预计签约金额
        sumKeyup: function() {
            vm.hWeightedSum = accMul(vm.handleTemplate.expectSignSum, vm.handleTemplate.successRate);
            vm.hWeightedSum = Math.round(vm.hWeightedSum * 1)/100; // 保留两位小数
        },
        // 新增/修改准备提交的数据
        collectData: function() {
            vm.handleTemplate.salesStaffCode = userCode;      // 销售代码
            vm.handleTemplate.weightedSum = vm.hWeightedSum;  // 加权金额(万元)

            console.log('-----新增/修改完成后准备提交的数据------');
            console.log(vm.handleTemplate);

            return vm.handleTemplate;
        },
        // 保存
        submitToPD: function() {
            var params = this.collectData();

            $.ajax({
                async: false,
                url: PATH + '/cp/so/addOrUpdatePipline',
                type: 'get',
                data: params,
                dateType: 'json',
                success: function(result) {
                    // var data = datas.data;
                    console.log(result,'保存');
                    if (result.code === 201) {
                        toastr.error(result.msg)
                        console.log(result.msg,'error')
                        return;
                    }else {
                        vm.oneDataId = result.msg.cpSoId;
                        vm.dialogShow = true;         // 调用（弹窗）
                        vm.handleDataShow = true;
                        vm.clearHandle();                // 调用（清空新增/修改表单）
                        vm.getPipelineData();            // 再调用（表格查询）
                    }
                    toastr.success('操作成功');
                },
                error: function(result) {
                    console.log('保存失败');
                }
            })
           /* axios.get(PATH +'/cp/so/addOrUpdatePipline', {params: params}).then(function(datas) {
            // axios.get('http://172.16.20.34:8080/iboss-prism/cp/so/addOrUpdatePipline', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'保存');
                if (data.code === 201) {
                    toastr.error(data.msg)
                    console.log(data.msg,'error')
                    return;
                }
                if(data.success){
                    vm.oneDataId = data.msg.cpSoId;
                    vm.dialogShow = true;         // 调用（弹窗）
                    vm.handleDataShow = true;
                    vm.clearHandle();                // 调用（清空新增/修改表单）
                    vm.getPipelineData();            // 再调用（表格查询）
                }
                toastr.success('操作成功');

                // vm.showOneChange();
            })*/
        },
        // 提交至事业部
        submitToBU: function() {
            this.submitToPD();
            // var params = this.collectData();
            var params = {
                auditType: 'submit',
                id: vm.oneDataId,
                remark: '无'
            };
            console.log(params,'params');
            axios.get(PATH +'/cp/so/auditPipeline', {params: params}).then(function(datas) {
                var data = datas.data
                console.log(datas);
                if (data.code === 201) {
                    toastr.error(data.msg)
                    console.log(data.msg,'error')
                    return;
                }
                if(data.success){
                    vm.dialogShow = true;         // 调用（弹窗）
                    vm.handleDataShow = true;
                    vm.clearHandle();                // 调用（清空新增/修改表单）
                    vm.getPipelineData();            // 再调用（表格查询）
                }
                toastr.success('操作成功');

                vm.oneDataId = '';
            })
        },
        // 点击撤回按钮
        revokeData: function(id) {
            this.showSecondPop();
            this.revokeShow = false;

            this.oneDataId = id;
        },
        // 确定撤回
        auditBtn: function(type) {
            var params = {
                auditType: type,
                id: this.oneDataId,
                remark: '无'
            };
            console.log(params,'params-确定撤回')
            axios.get(PATH +'/cp/so/auditPipeline', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'data-确定撤回');
                if(data.code == 200) {
                    if (type === 'revoke') {
                        toastr.success('撤回成功 !');
                        vm.secondDialogShow = true;
                        vm.revokeShow = true;

                        vm.getPipelineData();            // 再调用（表格查询）
                        return;
                    }
                }else {
                    toastr.error(data.msg)
                }

                this.oneDataId = '';
            })
        },
        // 点击分配按钮
        allotData: function(id, index) {
            this.dialogShow = false;         // 调用（弹窗）
            this.checkDataShow = false;      // 显示查看pipeline弹窗
            this.isCheck = true;
            this.getOneData(id, index);      // 调用（查询一条数据接口）
        },
        // 1、销售老大准备分配这条数据
        allotThisData: function() {
            this.getSoDepartment();
            this.isAllotHide = false;            // 显示要分配的事业部
            this.isRejectHide = true;
        },
        // 2、销售老大点击确认分配按钮
        allotToBU: function(id) {
            this.showSecondPop();           // 调用（弹窗）
            this.allotShow = false;        // 确认分配pop
        },
        // 3、二次确认分配弹窗点击是
        allotBtn: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: '无',
                directSalesCode: vm.hSoDepartmentCode
            };
            console.log(params,'params')
            // axios.get('http://172.16.20.34:8080/iboss-prism/cp/so/auditPipeline ', {params: params}).then(function(datas) {
            axios.get(PATH +'/cp/so/auditPipeline ', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'data');
                if(data.code == 200) {
                    toastr.success('分配成功 !');
                    vm.dialogShow = true;         // 调用（弹窗）
                    vm.checkDataShow = true;      // 显示查看pipeline弹窗
                    vm.secondDialogShow = true;
                    vm.allotShow = true;
                    vm.getPipelineData();            // 再调用（表格查询）

                    // 清空相关信息
                    vm.isAllotHide = true;
                    vm.hSoDepartmentName = '';
                    return;
                }else {
                    toastr.error(data.msg);
                }
            })
        },
        // 1、销售老大准备驳回这条数据
        rejectThisData: function() {
            this.isRejectHide = false;
            this.isAllotHide = true;
        },
        // 2、销售老大点击确认驳回按钮
        rejectToXS: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: vm.hRemark
            };
            console.log(params,'params--销售老大驳回这条数据')
            axios.get(PATH +'/cp/so/auditPipeline', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'data');
                if(data.code == 200) {
                    toastr.success('驳回成功 !');
                    vm.dialogShow = true;         // 调用（弹窗）
                    vm.handleDataShow = true;
                    vm.getPipelineData();         // 再调用（表格查询）

                    // 清空相关信息
                    vm.hRemark = '';
                    vm.isRejectHide = true;
                    return;
                }else {
                    toastr.error(data.msg)
                }
            })
        },
    }
})