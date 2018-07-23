$.ajaxSettings.async = true;
$(document).ready(function() {
    // 搜索-预计签约时间
    laydate.render({
        elem: '#startDate' //指定元素
        ,type: 'month'
        ,range: true
        ,value: vm.getYear()
        ,isInitValue: true //允许填充初始值
        // 参数可选value, date(起始时间), endDate(结束时间)
        ,done: function(value) {
            vm.cExpectSignDateRange = value;
            var time = vm.cExpectSignDateRange.split(' - ');
            var startTime,
                endTime;
            startTime = time[0];
            endTime = time[1];
            vm.tableList.expectSignDateStart = startTime;
            vm.tableList.expectSignDateEnd = endTime;

            vm.showData();
        }
    });
    // 新增/修改-预计签约时间
    laydate.render({
        elem: '#signDate' //指定元素
        ,type: 'month'
        ,done: function(value) {
            console.log(value)
            // vm.hExpectSignDate = value;
            vm.handleTemplate.expectSignDate = value;

        }
    });
})

var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            pipelineDataShow: true,       // 默认事业部pipeline信息显示
            pipelineJoinShow: true,      // 默认pipeline交接不显示
            // 模糊查询客户名称
            fuzzyQueryList_1: [],
            fuzzyQueryList_2: [],
            customerNames: '',            // 获取客户名称
            customerNameArray: [],        // 单独存放客户名称的name
            departmentCodeArray: [],      // 单独存放客户所在事业部的code
            classificationLists: [],      // 金融银行分类
            projectTypeLists: [],         // 项目类型分类

            //模糊查询销售
            salesList: [],

            // 定义搜索值信息
            tableList: {},                //存放搜索值
            cCustomerName: '',            // 客户名称
            cSalesName: '',               // 获取销售
            cIndustryLineText: '',        // 行业线
            cProjectSuccessRateText: '',  // 成功率
            cProjectSuccessMinText: '',   // 最小成功率
            cProjectSuccessMinCode: '',   // 最小成功率code
            cProjectSuccessMaxText: '',   // 最大成功率
            cProjectSuccessMaxCode: '',   // 最大成功率code
            projectSuccessRates: [],      // 存放成功率
            cMngSalesGroupText: '',       // 事业部
            cRegionText: '',              // 区域
            cCustomerSourText: '',        // 客户来源
            cSoSolutionText:'',           // 解决方案
            cSoSolutionFirstText: '',     // 大解决方案
            cSoSolutionSecondText: '',    // 小解决方案
            solutionFirstLists: [],       // 存放大解决方案
            solutionSecondLists: [],      // 存放小解决方案
            cLatelyChangeText: '',        // 近期变更过
            cExpectSignDateRange: '',     // 预计签约时间
            defaultYear: '',              // 默认年份

            // 项目更新情况
            changeOneLists: [],           // 存放项目更新情况
            // changeOneListTime: [],        // 显示时间

            noUpdateCase: false,          //
            updateCaseMsg: '',            // 提示语句
            updateCaseShow: true,
            ismaxWidth: true,
            isClicked: -1,                // 下标 表格tr添加active

            customerAttr: [],             // 客户属性
            customerLists: [],            // 客户信息
            regions: '',                  // 区域code
            isHide: false,                // 若区域下无省份，则隐藏省份块
            provinceLists: [],            // 客户所在省份
            finalCustomerProvinceLists: [],// 最终客户名称所在省份
            searchLists: [{               // 初始值基本信息
                latelyChanges: '',        // 近期变更过
                industryLines: ''         // 行业线
            }],
            progressLists: [],           // 项目阶段
            provinceShow: true,          // 省份，默认隐藏
            successReasonShow: true,     // 成功率为0%显示原因，默认隐藏
            successReasonDropShow: true, // 成功率为0%显示原因下拉，默认隐藏
            regionLists: [],              // 最终客户所在区域
            oauthLists: [],               // 初始值权限信息
            mngSalesGroups: [],
            weightedSumTotal: '',         // 加权金额总计
            expectSignSumTotal: '',       // 预计签约金额总计
            items: [],                    // 表格数据
            pscsLists: [],                // 表格项目阶段数据
            noData: false,               // 搜索不到数据
            ascActive: false,            // 点击表格客户名称升序
            descActive: false,           // 点击表格客户名称降序

            // pipeline表格分页
            data: [],
            dataPageTotal: 0,          // 全部数据
            dataPageNum: 1,            // 当前页
            dataPageSum: 1,            // 共多少页
            dataPageMost: 10,          // 页容量
            dataPageStart: 0,
            dataPageEnd: 0,

            // 客户分页
            client: [],
            clientPageTotal: 0,          // 全部数据
            clientPageNum: 1,            // 当前页
            clientPageSum: 1,            // 共多少页
            clientPageMost: 10,          // 页容量
            clientPageStart: 0,
            clientPageEnd: 0,

            opDataKey: '',               // 查询Pipeline变动历史  操作DATA主键

            // 添加/修改 模板
            handleTemplate: {},
            changeLists: [],             // 存放历史变动信息
            isnoNull: 0,
            isActive: 0,
            isModal: false,
            mngSalesGroupsList: [],
            showModal: false,
            salesStaffCode: '',
            salesGroupCode: '',
            isActiveProvince: -1,

            nothing: '',

            // 添加/修改  显示信息
            hReportDate: timeYear,      // 报备时间
            hSalesGroupText: '',        // 事业部
            // hSalesStaffCode: userCode,  // 负责销售code
            hSalesStaffName: userName,  // 负责销售名字
            hCustomerName: '',          // 客户名称
            hProjectType: '',           // 项目类型
            hSolutionText: '',          // 解决方案名称
            hSoSolutionFirstText: '',   // 大解决方案
            hSoSolutionSecondText: '',  // 小解决方案
            /* solutionFirstLists: [],       // 存放大解决方案
             solutionSecondLists: [],      // 存放小解决方案*/
            hIndustryLineText: '',      // 行业线名称
            hClassificationText: '',    // 金融银行分类名称
            hClassificationInput: '',    // 选择其他时手写的金融银行分类名称
            selectClassificationQita: true,    // 金融银行分类是否选了其他
            hSuccessRateText: '',       // 成功率名称
            hProgressText: '',          // 项目阶段名称
            hSuccessReasonText: '',    // 成功率0%原因
            successReasonLists: [],    // 成功率0%原因list
            hCustomerSourceText: '',    // 客户来源名称
            hWeightedSum: 0,            // 加权金额总计（万元）
            hExpectSignDate: '',        // 预计签约时间
            hasFinalCustomer: true,    // 是否填写最终客户名称
            notLinked: false,           //  区域省份是否不可点击

            preSaleStaffs: [],          // 点击修改时获取表格的值
            solutionSub: [],            // 点击修改时获取表格的值

            cpComCode: '',                 // 新增/修改时传给客户管理的客户名称code

            // === 弹窗
            dialogShow: true,           // 外层弹窗
            handleTemplateShow: true,   // 新增修改弹窗
            uploadDialogShow: true,     // 导入弹窗
            customerDialogShow: true,   // 显示客户选择弹窗
            checkDataShow: true,        // 查看pipeline弹窗

            secondDialogShow: true,     // 二级外层弹窗
            revokeShow: true,           // 撤销弹窗
            joinRevokeShow: true,       // 确认撤回弹窗
            allotShow: true,            // 确认分配弹窗

            // 导入
            uploadFileName: '',
            clearShow: true,

            // 客户选择
            // 客户
            clientID: '',
            cCheckIndex: -1,

            hDropText: '',             // 行业下拉框文字
            hDropCode: '',             // 行业 code
            hClientCode: '',           // 客户编号
            hClientName: '',           // 客户名称

            // ==============pipeline交接
            // ===查询
            needOperateNumber: 0,      // 需要交接的数字量
            noJoinData: false,          // 搜索不到数据
            pipelineData: [],           // pipeline表格数据
            weightedSumTotal: '',       // 加权金额总计
            expectSignSumTotal: '',     // 预计签约金额总计
            // join: [],
            joinPageTotal: 0,           // 全部数据
            joinPageNum: 1,             // 当前页
            joinPageSum: 1,             // 共多少页
            joinPageMost: 10,           // 页容量
            joinPageStart: 0,
            joinPageEnd: 0,

            // 查看弹窗所需
            hReportDate: timeYear,      // 报备日期
            hSalesGroupText: userGroup, // 销售小组
            hSalesStaffName: userName,  // 负责销售
            hPreSaleStaffsName: '',     // 负责售前
            hCpCustomerName: 'CPA201805000013',        // 合作伙伴名称
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

            hSalesStaffsCode: '',      // 分配时的事业部code
            hSalesStaffsName: '',      // 分配时的事业部name

            solutionSub: [],            // 点击修改时获取表格的值

            hRemark: '',                // 驳回备注

            isCheck: true,              // 是否是销售老大查看
            isAllotHide: true,          // 是否隐藏分配模块
            isRejectHide: true,         // 是否隐藏驳回模块

            oneDataId: '',              // 再次确认用到的id

            soDepartmentLists: [],      // 查询直销事业部集和销售集
            salesStaffsLists: [],       // 查询直销事业部下的销售集
        }
    },
    mounted: function(){
        this.showPipelineData();
        this.getSoSolution4Tree();
        this.getSuccessRate();
        this.searchData();
        this.getFuzzyList();
        this.getSales();
        // this.showData();
        this.openUpdateCase();
        this.signDate();
        this.getPipelineData();
    },
    methods: {
        // 默认显示事业部pipeline信息
        showPipelineData: function() {
            this.pipelineDataShow = false;
            this.pipelineJoinShow = true;
        },
        // 点击显示pipeline交接
        showPipelineJoin: function() {
            this.pipelineDataShow = true;
            this.pipelineJoinShow = false;

            // ===============pipeline交接
            this.getPipelineData();    // 查询pipeline数据
        },
        // 显示弹框
        showPop: function () {
            vm.dialogShow = false;
        },
        // 关闭弹窗
        hidePop: function () {
            this.dialogShow = true;
            this.handleTemplateShow = true;
            // this.customerDialogShow = true;
            this.uploadDialogShow = true; // 导入pop
        },
        // 显示二级弹框
        showSecondPop: function () {
            this.secondDialogShow = false;
        },
        // 关闭二级弹窗
        hideSecondPop: function() {
            this.secondDialogShow = true;
            this.revokeShow = true;// 确认pop
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
            this.tableList.expectSignDateStart = startTime;
            this.tableList.expectSignDateEnd = endTime;
            this.showData();
        },
        //// ==========客户名称========
        // 表格查询客户名称排序
        ascClick: function() {
            vm.tableList.direction = 'asc';
            this.ascActive = true;
            this.descActive = false;
            vm.showData();
        },
        descClick: function() {
            vm.tableList.direction = 'desc';
            this.descActive = true;
            this.ascActive = false;
            vm.showData();
        },
        // 客户名称键盘回车(如果input为空)
        keyEnterCustomer: function() {
            var ikeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
            if (ikeyCode == 13){
                if(vm.cCustomerName == '') {
                    delete vm.tableList.customerCode;
                    // vm.showData();
                }
            }
        },
        // 模糊查询客户名称
        hideFuzzyQuery: function (type) {
            // var list = 'fuzzyQueryList_' +type;
            // vm[list] = [];
            vm.fuzzyQueryList_1 = [];
            vm.fuzzyQueryList_2 = [];

            vm.salesList = [];
        },// 失焦隐藏模糊列表
        getFuzzyList: function (type) {
            var clientName, params;
            switch (type) {
                case 1:
                    clientName = vm.cCustomerName;
                    break;
                case 2:
                    clientName = vm.hCustomerName;
                    break;
            }
            $.ajax({
                url: PATH +'/crm/selectCustomer4PipelineLike',
                data: {
                    customerName: clientName
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
            console.log(code,'code');
            switch (type) {
                case 1:
                    vm.tableList.customerCode = code;
                    vm.cCustomerName = text;

                    // 判断该客户名称是否是该销售所在事业部下的
                    /*if(departmentCode !== vm.tableList.salesGroupCode) {
                     toastr.warning('没有相关信息 ！');
                     vm.noData = true;

                     vm.closeUpdateCase();  // 关闭右侧项目更新情况
                     return;
                     }*/

                    // this.showData();
                    break;
                case 2:
                    // 判断该客户名称是否是该销售所在事业部下的
                    if(departmentCode !== vm.handleTemplate.salesGroupCode) {
                        toastr.warning('不可建立此客户信息!');
                        return
                    }else {
                        // hasConcat=y   名下存在客户机要信息，hasConcat=n 不存在机要
                        if(hasConcat == 'n') {
                            toastr.warning('该客户名下没有机要信息!');

                            this.cpComCode = code;
                            this.showSecondPop();
                            this.revokeShow = false;
                        }
                        // whole=y 机要信息全    whole=n 机要信息不全
                        else if (whole == 'n') {
                            toastr.warning('该客户名下机要信息不全,请完善客户机要信息!');

                            this.cpComCode = code;
                            this.showSecondPop();
                            this.revokeShow = false;
                        }
                    }
                    vm.hCustomerName = text;
                    vm.handleTemplate.customerCode = code;

                    // 确认弹窗
                    this.showPop();
                    this.revokeShow = false;

                    break;
            }
        },// 选中文字，隐藏模糊列表
        yesBtn:function() {
            // loadMainPage('.content-item', 'client/client.html');
            localStorage.cpComCode =  this.cpComCode;
        },
        //// ==========销售========
        // 销售键盘回车(如果input为空)
        keybordEnterSales: function() {
            var ikeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
            if (ikeyCode == 13){
                if(vm.cSalesName == '') {
                    delete vm.tableList.salesStaffCode;
                }
            }
        },
        // 模糊查询销售
        getSales: function () {
            var params;
            params = {
                name: this.cSalesName,
            };
            axios.get(PATH +'/crm/selectSysUser4PipelineLike', {params: params}).then(function (datas){
                var data = datas.data;
                if (data.code === 201 || data.msg.length === 0) return;
                vm.salesList = data.msg;

                console.log(vm.salesList, 'salesList');
            });
        },// 获取数据
        selectSales: function (text, code) {
            vm.tableList.salesStaffCode = code;
            vm.cSalesName = text;
        },// 选中文字，隐藏模糊列表

        //// ==========搜索获取下拉code========
        // 选中行业线
        searchIndustryLineCode: function(code, text) {
            this.tableList.industryLineCode = code;
            vm.cIndustryLineText = text;
        },
        // 选中最小成功率
        searchSuccessMinCode: function(code, text) {
            this.tableList.successRateCodeMin = code;
            vm.cProjectSuccessMinText = text;
            vm.cProjectSuccessMinCode = code;
        },
        // 选中最大成功率
        searchSuccessMaxCode: function(code, text) {
            this.tableList.successRateCodeMax = code;
            vm.cProjectSuccessMaxText = text;
            vm.cProjectSuccessMaxCode = code;

            vm.cProjectSuccessMinCode = '';
            vm.cProjectSuccessMaxCode = '';
        },
        // 选中事业部
        searchSalesGroupCode: function(code, text) {
            this.tableList.salesGroupCode = code;
            vm.cMngSalesGroupText = text;
        },
        // 选中区域
        searchRegionCode: function(code, text) {
            this.tableList.regionCode = code;
            vm.cRegionText = text;
        },
        // 选中客户来源
        searchCustomerSourceCode: function(code, text) {
            this.tableList.customerSourceCode = code;
            vm.cCustomerSourText = text;
        },
        // 选中大解决方案
        searchSolutionFirst: function(id, text, type) {
            switch (type) {
                case 1:
                    vm.cSoSolutionSecondText = '';
                    this.tableList.soSolutionCode = '';

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
                    this.tableList.soSolutionCode = code;
                    break;
                case 2:
                    vm.hSoSolutionSecondText = text;
                    vm.solutionSub.solutionCode = code;
                    break;
            }
        },
        // 选中近期变更过
        searchLatelyChangeCode: function(code, text) {
            this.tableList.latelyChangeCode = code;
            vm.cLatelyChangeText = text;
        },
        // 新增/修改需要--获取省份
        getProvince: function(province) {
            // province = province || 'regionDb';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function(datas){
                var data = datas.data;
                if (data.code === 201 || data.msg.length === 0) return;
                vm.provinceLists = data.msg[province];
            })
        },
        // 新增/修改需要--获取客户属性
        customerData: function(){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=customerAttr').then(function(datas) {
                var data = datas.data;
                if (data.code === 201 || data.msg.length === 0) return;
                vm.customerAttr = data.msg.customerAttr;
                vm.handleTemplate.customerPropertiesCode = vm.customerAttr[0].code;// 默认选中第一个
            })
        },
        // 新增/修改需要--获取项目类型
        getProjectType: function(){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=projectType').then(function(datas) {
                var data = datas.data;
                if (data.code === 201 || data.msg.length === 0) return;
                vm.projectTypeLists = datas.data.msg.projectType;

                console.log(vm.projectTypeLists,'vm.projectTypeLists------------')
            })
        },
        // 新增/修改需要--最终客户名称所在省份
        getFinalCustomerProvince: function(province) {
            province = province || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then(function(datas){
                var data = datas.data;
                if (data.code === 201 || data.msg.length === 0) return;
                vm.finalCustomerProvinceLists = data.msg[province];
            })
        },
        // 新增/修改需要--获取项目阶段
        getProgresss: function(code){
            var params = {
                successRate: code
            }
            axios.get(PATH +'/basic/selectProgressBySuccessRate',{params: params}).then(function(datas) {
                var data = datas.data;
                if(data.code == 200) {
                    vm.progressLists = data.msg.progress;
                    if(vm.progressLists.length === 1) {
                        vm.handleTemplate.progressCode = vm.progressLists[0].code;
                        vm.hProgressText = vm.progressLists[0].text;
                    }
                }
            })
        },
        // 新增/修改需要--成功率0%原因
        getSuccessReason: function(params){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ params).then(function(datas) {
                var data = datas.data;
                console.log(data,'ssssssssssssssssssssssss')
                if(data.code == 200) {
                    vm.successReasonLists = data.msg.progressXCause || data.msg.progressNCause;
                }
            })
        },
        //// ==========添加获取code========
        // 选中事业部
        selectSalesGroupCode: function(code, text) {
            this.handleTemplate.salesGroupCode = code;
            vm.hSalesGroupText = text;
        },
        // 选中项目类型
        selectProjectType: function(code, text) {
            this.handleTemplate.projectType = code;
            vm.hProjectType = text;
        },
        // 选中行业线
        selectIndustryLineCode: function(code, text) {
            this.handleTemplate.industryLineCode = code;
            vm.hIndustryLineText = text;
        },
        // 选中金融银行分类
        selectClassificationCode: function(code, text) {
            this.handleTemplate.classificationOfFinancialIndustryCode = code;
            this.handleTemplate.classificationOfFinancialIndustry = text;
            vm.hClassificationText = text;

            // 金融银行分类如果选中了其他，则显示输入框，并需手填
            if(code == 'qiTa') {
                this.selectClassificationQita = false;
             }else {
                this.selectClassificationQita = true;
            }

        },
        // 选中成功率
        selectSuccessRateCode: function(code, text) {
            this.handleTemplate.successRateCode = code;
            vm.hSuccessRateText = text;

            // 关联项目阶段
            vm.hProgressText = '';
            this.getProgresss(code);
            if(code === '0') {
                this.successReasonShow = false;
            }

            // 绑定预计签约金额（万元）
            if(vm.solutionSub.expectSignSum !== '') {
                vm.hWeightedSum = accMul(vm.solutionSub.expectSignSum, code);
                vm.hWeightedSum = Math.round(vm.hWeightedSum * 1)/100; // 保留两位小数
            }
        },
        // 选中项目阶段
        selectProgressCode: function(code, text) {
            this.handleTemplate.progressCode = code;
            vm.hProgressText = text;

            if(code === 'n') {
                this.getSuccessReason('progressNCause');
            }else if(code === 'x') {
                this.getSuccessReason('progressXCause');
            }
        },
        successReasonKeyup: function() {
            this.successReasonDropShow = false;
        },
        // 选中成功率0%原因
        selectSuccessReason: function(code, text) {
            // this.handleTemplate.progressCause = code;
            vm.hSuccessReasonText = text;
        },
        // 选中客户来源
        selectCustomerSourceCode: function(code, text) {
            this.handleTemplate.customerSourceCode = code;
            vm.hCustomerSourceText = text;
        },
        // 选中客户属性
        selectCustomerAttr: function(code) {
            vm.handleTemplate.customerPropertiesCode = code;

            vm.nothing = code;
        },
        // 选中项目性质
        selectProjectNature: function(code) {
            vm.handleTemplate.projectNatureCode = code;

            vm.nothing = code;
        },
        // 选中区域
        selectRegion: function(code) {
            vm.handleTemplate.regionCode = code;
            this.isActiveProvince = -1;
            this.getProvince(code);
            this.provinceShow = false;
        },
        // 选中省份
        selectProvince: function(code){
            vm.handleTemplate.provinceCode = code;

            vm.nothing = code;
        },
        // 选中最终客户名称所在区域
        selectFinalCustomerRegion: function(code) {
            vm.handleTemplate.finalCustomerRegion = code;
            this.isActiveProvince = -1;
            this.getFinalCustomerProvince(code);
        },
        // 选中最终客户名称所在省份
        selectFinalCustomerProvince: function(code){
            vm.handleTemplate.finalCustomerProvince = code;

            vm.nothing = code;
        },
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

        // 表格查询 加权金额相加
        addSum: function(sumList){
            var sum = 0;
            for(var i = 0;i < sumList.length;i++){
                sum += parseFloat(sumList[i].expectSignSum)
            }
            // console.log(sum);
            return sum;
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

        // 表格查询
        showData: function(page, limit){
            this.tableList.page = page || 1;
            this.tableList.limit = limit || this.dataPageMost;
            console.log('---查询pipeline的请求参数------');
            console.log(this.tableList);
            this.items = [];
            this.pscsLists = [];

            axios.get(PATH + '/so/queryPipeline', {params: this.tableList}).then(function(datas) {
                var data = datas.data;
                console.log(data,'获取pipeline表格数据');
                vm.pscsLists = data.pscs;  // 获取项目阶段数据

                vm.weightedSumTotal = vm.toThousands(Math.round(data.oth.weightedSumTotal));
                vm.expectSignSumTotal = vm.toThousands(Math.round(data.oth.expectSignSumTotal));

                vm.items = data.root;
                if(vm.items.length !== 0) {
                    if(vm.items[0].soCoreCode) {
                        vm.showOneChange(vm.items[0].soCoreCode, 0); // 默认第一条tr添加active
                    }

                    vm.noData = false;
                    vm.data = data;
                    vm.dataPageTotal = data.totalProperty;

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
                }else { // 如果表格无数据
                    toastr.warning('没有相关信息 ！');
                    vm.noData = true;

                    vm.closeUpdateCase();  // 关闭右侧项目更新情况
                    return;
                }
            })
        },
        // 分页
        calcDataPage: function (type, num) {
            type === 'data' ? vm.dataPage(type, num) : '';
        },// calcDataPage
        // 分页输入回车事件
        dataEnter: function () {
            vm.showData(vm.dataPageNum);
        },
        dataPage: function (type, num) {
            vm.cCheckIndex = -1;
            switch(num)
            {
                case 'first':
                    vm.dataPageNum = 1;
                    vm.showData(1);
                    break;
                case 'last':
                    vm.dataPageNum = vm.dataPageSum;
                    vm.dataPageEnd = vm.dataPageTotal;
                    vm.showData(vm.dataPageNum);
                    break;
                case 1:
                    if(vm.dataPageNum >= vm.dataPageSum)  return;
                    vm.dataPageNum++;
                    vm.showData(vm.dataPageNum);
                    break;
                case -1:
                    if(vm.dataPageNum <= 1)  return;
                    vm.dataPageNum--;
                    vm.showData(vm.dataPageNum);
                    break;

            }
        },
        // 获取解决方案
        getSoSolution4Tree: function(id,code){
            var basic,
                oauth;

            this.solutionFirstLists = [];
            this.solutionSecondLists = [];
            $.ajax({
                url:  PATH + '/so/queryPipelineInitVal',
                type: 'get',
//                    async: false,
                dataType: 'json',
                success: function(result){
                    basic = result.msg.basic;
                    if(result !== null){
                        if(basic !== null){
                            this.searchLists = basic;


                            var solutionLists = this.searchLists.soSolution4Tree;
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
                },
                error: function(result) {
                    console.log('获取解决方案下拉树失败');
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
        // 获取金融银行分类
        getClassification: function(){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=classificationOfFinancialBanks').then(function(datas){
                vm.classificationLists = datas.data.msg.classificationOfFinancialBanks;
            })
        },
        // 获取金融银行分类
        getFinalCustomerRegion: function(){
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=classificationOfFinancialBanks').then(function(datas){
                vm.classificationLists = datas.data.msg.classificationOfFinancialBanks;
            })
        },
        // 获取最终客户名称所在区域
        getFinalCustomerRegion: function(region) {
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=region').then(function(datas) {
                var data = datas.data;
                vm.regionLists = data.msg.region;
            })
        },
        // 搜索框赋值
        searchData: function(params){
            var basic,
                oauth;
            $.ajax({
                url:  PATH + '/so/queryPipelineInitVal?' + params,
                type: 'get',
                dataType: 'json',
                success: function(result){
                    basic = result.msg.basic;
                    oauth = result.msg.oauth;
                    if(result !== null){
                        if(basic !== null){
                            vm.searchLists = basic;
                            // vm.handleTemplate.regionCode = vm.searchLists.regions[0].code;// 默认区域选中第一个
                            // vm.handleTemplate.projectNatureCode = vm.searchLists.projectNatures[0].code;// 默认项目性质选中第一个
                        }
                        if(oauth !== null){
                            vm.oauthLists = oauth;
                            vm.mngSalesGroups = vm.oauthLists.userInfo.mngSalesGroups;
                        }
                    }
                },
                error: function(result) {
                    console.log('搜索请求失败');
                }
            })
        },
        // 查询搜索框
        querySearchForm: function() {
            this.showData();
        },
        // 清空搜索框
        clearSearchForm: function() {
            vm.cCustomerName = '';            // 客户
            vm.cIndustryLineText = '';        // 行业线
            vm.cProjectSuccessRateText = '';  // 成功率
            vm.cProjectSuccessMinText = '',   // 最小成功率
            vm.cProjectSuccessMaxText = '',   // 最大成功率
            vm.cProjectSuccessMinCode = '';
            vm.cProjectSuccessMaxCode = '';
            vm.cMngSalesGroupText = '';       // 事业部
            vm.cRegionText = '';              // 区域
            vm.cCustomerSourText = '';        // 客户来源
            // vm.cSoSolutionText = '';          // 解决方案
            vm.cSoSolutionFirstText = '';     // 大解决方案
            vm.cSoSolutionSecondText = '';    // 小解决方案
            vm.cLatelyChangeText = '';        // 近期变更过
            vm.cSalesName = '';               // 近期变更过

            this.tableList = {};
            this.signDate();
            // this.showData();
        },
        // 清空新增/修改表单
        clearHandle: function() {
            vm.hCustomerName = '';                // 客户名称
            vm.hasFinalCustomer = true;           // 隐藏最终客户名称下的区域省份
            vm.hSalesGroupText = '';              // 事业部
            vm.hProjectType = '';                 // 项目类型
//                vm.hSolutionText = '';          // 解决方案名称
            vm.hSoSolutionFirstText = '';         // 大解决方案
            vm.hSoSolutionSecondText = '';        // 小解决方案
            vm.hIndustryLineText = '';            // 行业线名称
            vm.hClassificationText = '';          // 金融银行分类名称
            vm.hClassificationInput = '';         // 手写的金融银行分类名称
            vm.selectClassificationQita = true;  // 隐藏金融银行分类名称输入框
            vm.hSuccessRateText = '';             // 成功率名称
            vm.hProgressText = '';                // 项目阶段名称
            vm.hCustomerSourceText = '';          // 客户来源名称
            vm.hWeightedSum = 0;                  // 加权金额总计

            vm.handleTemplate = {}
            vm.preSaleStaffs = []
            vm.solutionSub = []
        },
        // 新增/修改 填写最终客户名称
        finalCustomerKeyup: function() {
            if(vm.handleTemplate.finalCustomer == '') {
                this.hasFinalCustomer = true;
                vm.handleTemplate.finalCustomerRegion = '';
                vm.handleTemplate.finalCustomerProvince = '';
            }else {
                this.hasFinalCustomer = false;
            }
        },
        // 新增/修改 填写预计签约金额
        sumKeyup: function() {
            vm.solutionSub.expectSignSum = (Math.round((parseFloat(vm.solutionSub.expectSignSum)) * 100) / 100).toString();   // 保留两位小数
            console.log(vm.solutionSub.expectSignSum,'vm.solutionSub.expectSignSum--key')
            vm.hWeightedSum = accMul(vm.solutionSub.expectSignSum, vm.handleTemplate.successRateCode);
            vm.hWeightedSum = Math.round(vm.hWeightedSum * 1)/100; // 保留两位小数
        },
        // 新增/修改共同代码
        commonData: function() {
            this.clearHandle();                 // 调用（清空新增/修改表单）
            this.customerData();                // 调用（获取客户属性）
            this.getProjectType();              // 调用（获取项目类型）
            this.getFinalCustomerRegion();      // 调用（获取最终客户名称所在区域）
            this.getSoSolution4Tree();          // 调用（获取解决方案下拉树）
        },
        // 新增
        addData: function() {
            this.commonData();

            this.searchData('selectType=limitLevel');  // 调用（--）只是获取区域的默认第一个那条语句
            this.notLinked = false;
            this.provinceShow = true;
            this.getProvince();                 // 调用（获取省份信息）
            this.getClassification();           // 调用（金融银行分类）
            this.getFinalCustomerProvince();    // 调用（获取最终客户名称所在省份信息）

            // 默认填写所属事业部
            vm.handleTemplate.salesGroupCode = vm.oauthLists.userInfo.mngSalesGroups[0].code;
            vm.hSalesGroupText = vm.oauthLists.userInfo.mngSalesGroups[0].text;

            this.showPop();              // 显示弹框
            this.handleTemplateShow = false;
        },
        // 修改
        handleData: function(item){
            this.commonData();
            this.provinceShow = false;
            // this.getProvince();          // 调用（获取省份信息）
            this.getClassification();           // 调用（金融银行分类）
            this.showChange();           // 调用（历史变更信息）

            // 默认填写所属事业部
            vm.handleTemplate.salesGroupCode = vm.oauthLists.userInfo.mngSalesGroups[0].code;
            vm.hSalesGroupText = vm.oauthLists.userInfo.mngSalesGroups[0].text;

            this.showPop();              // 显示弹框
            this.handleTemplateShow = false;
            // 已获取销售code
            // console.log(item.soCoreCode)

            $.ajax({
                url:  PATH + '/so/queryPipelineOne',
                type: 'get',
                dataType: 'json',
                async: false,
                data: {
                    'soCoreCode': item.soCoreCode
                },
                success: function(result){
                    if (result.code === 201) {
                        toastr.error(msg);
                        return;
                    }

                    vm.handleTemplate = result.msg;
                    console.log('-----点击修改的本条数据------');
                    console.log(vm.handleTemplate);

                    console.log(vm.handleTemplate.regionCode,'handleTemplate.regionCode,,,,,,,,,,,,,,,,,,,,,,,')

                    // 如果notModified为true,则区域省份变灰，不能修改；否则限制区域，参数为selectType=limitLevel
                    if(vm.handleTemplate.notModified === true) {
                        vm.searchData();
                        vm.notLinked = true;
                    }else {
                        vm.searchData('selectType=limitLevel');
                        vm.notLinked = false;
                    }

                    vm.getProvince(vm.handleTemplate.regionCode);               // 获取省份信息

                    // 如果最终客户名称为空，则最终客户名称所在区域，省份隐藏；否则显示
                    if(vm.handleTemplate.finalCustomer === null) {
                        vm.hasFinalCustomer = true;
                    }else {
                        vm.hasFinalCustomer = false;
                    }
                    vm.getFinalCustomerProvince(vm.handleTemplate.finalCustomerRegion); // 获取最终客户名称所在省份信息

                    // vm.customerData(vm.handleTemplate.customerPropertiesCode);  // 获取客户属性code
                    vm.hProjectType = vm.handleTemplate.projectType;          // 获取项目类型
                    vm.hCustomerName = vm.handleTemplate.customerName;          // 获取客户名称

                    // 如果金融银行分类是其他，则显示输入框，下拉框显示为其他，并把classificationOfFinancialIndustry赋值给输入框，
                    if(vm.handleTemplate.classificationOfFinancialIndustryCode == 'qiTa') {
                        vm.selectClassificationQita = false;
                        vm.hClassificationText = '其他';
                        vm.hClassificationInput = vm.handleTemplate.classificationOfFinancialIndustry;
                    }else {
                        vm.hClassificationText = vm.handleTemplate.classificationOfFinancialIndustry;
                    }

                    vm.hReportDate = vm.handleTemplate.reportDate;              // 获取报备日期
                    vm.hSalesStaffName = vm.handleTemplate.salesStaffCode;      // 获取销售

                    if(vm.handleTemplate.preSaleStaffs) {
                        for(var i = 0;i< vm.handleTemplate.preSaleStaffs.length;i++){
                            if(vm.handleTemplate.preSaleStaffs[i]) {
                                vm.preSaleStaffs = vm.handleTemplate.preSaleStaffs[i]
                                vm.preSaleStaffs.userCode = vm.handleTemplate.preSaleStaffs[i].userCode;
                            }
                        }
                    }

                    // 获取解决方案名称和预计签约金额
                    if(vm.handleTemplate.solutionSub) {
                        for(var i = 0;i< vm.handleTemplate.solutionSub.length;i++){
                            if(vm.handleTemplate.solutionSub[i]) {
                                vm.solutionSub.solutionCode = vm.handleTemplate.solutionSub[i].solutionCode;

                                vm.hSoSolutionSecondText = vm.handleTemplate.solutionSub[i].solutionName;

                                console.log(vm.solutionSub.solutionCode,'vm.solutionSub.solutionCode')
                                vm.getSoSolution4Tree('', vm.solutionSub.solutionCode);
                                /*vm.hSoSolutionFirstText = '';   // 大解决方案
                                 vm.hSoSolutionSecondText = '';  // 小解决方案*/
                                vm.solutionSub.expectSignSum = vm.handleTemplate.solutionSub[i].expectSignSum;
                            }
                        }
                    }

                    // 获取加权金额
                    vm.hWeightedSum = accMul(vm.solutionSub.expectSignSum, vm.handleTemplate.successRateCode);
                    vm.hWeightedSum = Math.round(vm.hWeightedSum * 1)/100; // 保留两位小数

                    // 遍历修改接口数组中的数据，并赋值给下拉框
                    var userInfo = vm.oauthLists.userInfo;
                    if(userInfo != null) {
                        //事业部
                        if(userInfo.mngSalesGroups != null) {
                            for(var i = 0;i<userInfo.mngSalesGroups.length;i++){
                                if(userInfo.mngSalesGroups[i].code == vm.handleTemplate.salesGroupCode){
                                    vm.hSalesGroupText = userInfo.mngSalesGroups[i].text
                                }
                            }
                        }
                    }
                    if(vm.searchLists != null) {
                        // 行业线
                        if(vm.searchLists.industryLines != null) {
                            for(var i = 0;i<vm.searchLists.industryLines.length;i++){
                                if(vm.searchLists.industryLines[i].code == vm.handleTemplate.industryLineCode){
                                    vm.hIndustryLineText = vm.searchLists.industryLines[i].text;
                                }
                            }
                        }
                        // 成功率
                        if(vm.searchLists.projectSuccessRates != null) {
                            for(var i = 0;i<vm.searchLists.projectSuccessRates.length;i++){
                                if(vm.searchLists.projectSuccessRates[i].code == vm.handleTemplate.successRateCode){
                                    vm.hSuccessRateText = vm.searchLists.projectSuccessRates[i].text;
                                }
                            }
                        }
                        // 项目阶段
                        if(vm.searchLists.progresss != null) {
                            for(var i = 0;i<vm.searchLists.progresss.length;i++){
                                if(vm.searchLists.progresss[i].code == vm.handleTemplate.progressCode){
                                    vm.hProgressText = vm.searchLists.progresss[i].text;
                                }
                            }
                        }
                        // 客户来源
                        if(vm.searchLists.customerSours != null) {
                            for(var i = 0;i<vm.searchLists.customerSours.length;i++){
                                if(vm.searchLists.customerSours[i].code == vm.handleTemplate.customerSourceCode){
                                    vm.hCustomerSourceText = vm.searchLists.customerSours[i].text;
                                }
                            }
                        }
                    }


                    console.log(vm.items.preSaleStaffs,'preSaleStaffs');
                },
                error: function(){
                    console.log('修改信息 请求失败');
                }
            })
        },
        // 添加修改提交
        submitHandle: function(){
            if(!vm.hCustomerName) {
                toastr.warning('客户名称不能为空!');
                return
            }
            else{
                this.getFuzzyList(2);

                for(var i = 0;i < vm.customerNames.length;i++) {
                    vm.customerNameArray.push(vm.customerNames[i].name);
                }
                if($.inArray(vm.hCustomerName, vm.customerNameArray) == -1) {
                    toastr.warning('客户名称不存在!');
                    return
                }
            }

            vm.handleTemplate.salesStaffCode = userCode;         // 销售代码
            vm.handleTemplate.weightedSum = vm.hWeightedSum;     // 加权金额(万元)

            // 金融银行分类如果选中了其他，则显示输入框，并需手填
            if(vm.handleTemplate.classificationOfFinancialIndustryCode == 'qiTa') {
                vm.handleTemplate.classificationOfFinancialIndustry = vm.hClassificationInput;
            }

            // vm.handleTemplate.customerCode = vm.hCustomerName; // 客户名称

            var preSaleStaffList = [],     // 点击修改时获取表格的值
                solutionSubList = [];      // 点击修改时获取表格的值

            if(vm.preSaleStaffs.userCode) {
                preSaleStaffList.push({
                    'userCode':      vm.preSaleStaffs.userCode
                })
            }
            if(preSaleStaffList.length == 0) {
                delete vm.handleTemplate.preSaleStaffs;
            }
            else {
                vm.handleTemplate.preSaleStaffs = JSON.stringify(preSaleStaffList);
            }

            solutionSubList.push({
                'solutionCode':  vm.solutionSub.solutionCode,
                'expectSignSum': vm.solutionSub.expectSignSum
            })

            vm.handleTemplate.solutionSub = JSON.stringify(solutionSubList);

            var paramm = $.param(vm.handleTemplate)

            console.log('-----新增/修改完成后准备提交的数据------');
            console.log(vm.handleTemplate)

            $.ajax({
                url: PATH + '/so/addOrUpdatePipeline',
                type: 'get',
                data: paramm,
                dataType: 'json',
                success: function(result){
                    if (result.code === 201) {
                        toastr.error(result.msg)
                        console.log(result.msg,'error')
                        return;
                    }
                    if(result.success){
                        toastr.success('操作成功');

                        vm.dialogShow = true;       // 调用（弹窗）
                        vm.clearHandle();           // 调用（清空新增/修改表单）
                        vm.showData();              // 再调用（表格查询）
                    }

                    vm.showOneChange();
                },
                error: function(){
                    console.log('提交 请求失败');
                }
            })
        },
        // 历史变更信息
        showChange: function(){
            $.ajax({
                url: PATH + '/so/queryPipelineChangeHis',
                type: 'get',
                dataType: 'json',
                success: function(result){
                    // console.log(result);
                    for(var i = 0;i < result.root.length;i++){
                        var root = result.root[i];
                        vm.changeLists.push(root);
                    }
                },
                error: function(){
                    console.log('查看变动历史 请求失败');
                }
            })
        },

        // 客户选择
        selectCustomer: function() {
            vm.customerDialogShow = false;
            this.getClient();
            vm.cCheckIndex = -1;
        },
        customerDialogHide: function() {
            vm.customerDialogShow = true;
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
        // 行业里的点击事件
        hDrop: function (code, text) {
            vm.hDropText = text;
            vm.hDropCode = code;
        },
        // 获取客户信息
        getClient: function (page, limit) {
            var params = {
                page:         page || 1,
                limit:        limit || this.clientPageMost,
                customerCode: this.hClientCode,
                customerName: this.hClientName,
                industryLine: this.hDropCode,
            };
            //params = Object.assign(params, obj);
            axios.get(PATH +'/crm/queryCustomerList', {params: params}).then(function (datas){
                if (datas.data.root.length === 0) {
                    toastr.warning('没有相关信息 ！');
                    return;
                }
                console.log('-----客户信息数据------');
                console.log(datas.data);
                vm.client = datas.data;
                vm.clientPageTotal = datas.data.totalProperty;
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
            var message = "";
            console.log(code)
            $.ajax({
                url: PATH +'/crm/queryCustomerContactList',
                data: {
                    soCustomerCode: code
                },
                type: 'get',
                async: false,
                dataType: 'json',
                success: function(result) {
                    console.log(result.root);
                    if (result.root.length === 0) {
                        message = 'noData';
                        console.log('`````````````');
                        console.log('no');
                    }else{
                        console.log('`````````````');
                        console.log(result.root);
                        message = "haveData"
                    }
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
            return message;
        },

        // 选中客户表格tr
        selectCustomerName: function(code, name, index) {
            var getMessage = vm.getClientMsg(code);
            vm.cCheckIndex = index;

            if(getMessage == 'noData'){
                toastr.info('该客户下无机要信息 !');
            }else {
                vm.cCheckIndex = index;
                vm.handleTemplate.customerCode = code;
                vm.hCustomerName = name;
            }
        },
        // 选中事件
        selectHandle: function() {
            vm.customerDialogShow = true;
        },

        // 分页的判断
        calcPage: function (type, num) {
            type === 'client' ? vm.clientPage(type, num) : '';
        },// calcPage

        // 分页输入回车事件
        clientEnter: function () {
            vm.getClient(vm.clientPageNum);
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


        // 导入
        upload: function () {
            vm.uploadDialogShow = false;
        },
        // 确认导入
        uploadConfirm: function () {
            var file = importpipeline.files[0];
            vm.uploadFileName = importpipeline.files[0].name;
            if(importpipeline.files[0] == undefined) {
                toastr.warning('请选择上传的文件 ！');
                return
            };
            var fd = new FormData();
            fd.append('pipelineFile', file);
            axios.post('/iboss-prism/so/importPipeline', fd).then(function (datas){
                console.log(datas);
                if (datas.data.code === 201) {
                    toastr.error(datas.data.msg)
                } else{
                    toastr.success('文件上传成功 ！');
                    vm.hidePop();
                }

            });
        },


        // ================pipeline交接
        // 获取pipeline表格数据
        getPipelineData:  function(page, limit) {
            this.needOperateNumber = 0;
            var params = {
                page:         page || 1,
                limit:        limit || this.joinPageMost,
                soType:       'ds',
            };
            axios.get(PATH + '/cp/so/selectPipeline', {params: params}).then(function(datas) {
                var data = datas.data;
                vm.pipelineData = data;
                console.log(vm.pipelineData,'获取pipeline表格数据');

                // 如果表格无数据
                if(vm.pipelineData.root.length === 0) {
                    // toastr.warning('没有相关信息 ！');
                    vm.noJoinData = true;

                    vm.closeUpdateCase();  // 关闭右侧项目更新情况
                    return;
                }
                for(var i = 0;i < vm.pipelineData.root.length;i++) {
                    if(vm.pipelineData.root[i].status === 'assignSalesGroup' || vm.pipelineData.root[i].status === 'rejectSalesStaff' || vm.pipelineData.root[i].status === 'assignSalesStaff') {
                        vm.needOperateNumber++;
                    }
                }
                vm.noJoinData = false;
                vm.joinPageTotal = vm.pipelineData.totalProperty;
                vm.joinPageSum = Math.ceil(vm.joinPageTotal / vm.joinPageMost)
                vm.joinPageStart = (vm.joinPageNum -1) * vm.joinPageMost + 1;

                if (vm.joinPageNum === vm.joinPageSum) {
                    vm.joinPageEnd = vm.joinPageTotal;
                    return;
                }
                vm.joinPageEnd = vm.joinPageStart - 1 + vm.joinPageMost;
            })
        },
        // 分页的判断
        calcJoinPage: function (type, num) {
            type === 'join' ? vm.joinPage(type, num) : '';
        },// calcPage
        // 分页输入回车事件
        joinEnter: function () {
            vm.getPipelineData(vm.joinPageNum);
        },
        // 分页
        joinPage: function (type, num) {
            switch(num)
            {
                case 'first':
                    vm.getPipelineData(1);
                    vm.joinPageNum = 1;
                    break;
                case 'last':
                    vm.getPipelineData(vm.joinPageSum);
                    vm.joinPageNum = vm.joinPageSum;
                    vm.joinPageEnd = vm.joinPageTotal;
                    break;
                case 1:
                    if(vm.joinPageNum >= vm.joinPageSum)  return;
                    vm.joinPageNum++;
                    vm.getPipelineData(vm.joinPageNum);
                    break;
                case -1:
                    if(vm.joinPageNum <= 1)  return;
                    vm.joinPageNum--;
                    vm.getPipelineData(vm.joinPageNum);
                    break;
            }
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
                    vm.hSalesStaffName = vm.handleTemplate.salesStaffName;          // 销售
                    vm.hSalesGroupText = vm.handleTemplate.departmentName;          // 销售小组
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
                }
            })
        },
        // 查询直销事业部集和销售集
        getSoDepartment: function() {
            $.ajax({
                url: PATH +'/basic/selectSoDepartment',
                type: 'get',
                async: false,
                dataType: 'json',
                success: function(result) {
                    console.log(result,'result--查询直销事业部集和销售集');
                    if(result) {
                        if (result.msg.length === 0) {
                            return;
                        }else{
                            vm.soDepartmentLists = result.msg;
                            console.log(vm.soDepartmentLists,'vm.soDepartmentLists');
                            for(var i = 0;i < vm.soDepartmentLists.length;i++) {
                                if(vm.soDepartmentLists[i].text === userGroup) {
                                    vm.salesStaffsLists = vm.soDepartmentLists[i].salesStaffs;
                                }
                            }
                        }

                    }
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
        },
        // 选中分配的事业部
        selectSalesStaffs: function(code, text) {
            vm.hSalesStaffsCode = code;
            vm.hSalesStaffsName = text;
        },
        // 事业部老大点击分配按钮
        allotData: function(id, index) {
            this.dialogShow = false;       // 调用（弹窗）
            this.checkDataShow = false;   // 显示查看pipeline弹窗
            this.isCheck = true;
            this.getOneData(id, index);          // 调用（查询一条数据接口）
        },
        // 1、事业部老大准备分配这条数据
        allotThisData: function() {
            this.getSoDepartment();
            this.isAllotHide = false;            // 显示要分配的事业部
            this.isRejectHide = true;
        },
        ///2、事业部老大点击分配按钮
        allotToBU: function(id) {
            this.showSecondPop();       // 调用（弹窗）
            this.allotShow = false;         // 确认分配pop
        },
        ///3、二次确认分配弹窗点击是
        allotBtn: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: '无',
                directSalesCode: vm.hSalesStaffsCode
            };
            console.log(params,'params')
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
                    vm.hSalesStaffsName = '';
                    return;
                }else {
                    toastr.error(data.msg);
                }
            })
        },
        // 1、事业部老大准备驳回这条数据
        rejectThisData: function() {
            this.isRejectHide = false;
            this.isAllotHide = true;
        },
        // 2、事业部老大点击确认驳回按钮
        rejectToXS: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: vm.hRemark
            };
            console.log(params,'params--事业部老大驳回这条数据')
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
        // 事业部销售点击确认按钮
        confirmData: function(id, index) {
            this.dialogShow = false;       // 调用（弹窗）
            this.checkDataShow = false;   // 显示查看pipeline弹窗
            this.getOneData(id, index);          // 调用（查询一条数据接口）
            // 清空相关信息
            vm.hRemark = '';
            vm.isRejectHide = true;
        },
        // 事业部销售确认这条数据
        confirmThisData: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: '无'
            };
            console.log(params,'params--事业部销售确认这条数据')
            axios.get(PATH +'/cp/so/auditPipeline', {params: params}).then(function(datas) {
                var data = datas.data;
                console.log(data,'data');
                if(data.code == 200) {
                    toastr.success('驳回成功 !');
                    vm.dialogShow = true;         // 调用（弹窗）
                    vm.checkDataShow = true;

                    vm.getPipelineData();            // 再调用（表格查询）
                    return;
                }else {
                    toastr.error(data.msg)
                }
            })
        },
        // 1、事业部销售准备驳回这条数据
        xsRejectThisData: function() {
            this.isRejectHide = false;
            this.isAllotHide = true;
        },
        // 2、事业部销售点击确认驳回按钮
        rejectToXSLeader: function(id, type) {
            var params = {
                auditType: type,
                id: id,
                remark: vm.hRemark
            };
            console.log(params,'params--事业部销售驳回这条数据')
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
                    toastr.error(data.msg);
                }
            })
        },
    }
})
