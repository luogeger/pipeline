var vm = new Vue({
    el: '#partner',
    data: {
        tempID: '',
        // tab
        engineerTabShow: false,
        tabActive: 0,
        tabContentShow: '',
        // 分页
        pageLimit: 10,
        pPageTotal: 0,
        pPage: 1,
        mPageTotal: 0,
        mPage: 1,
        // dataList
        partnerList: [],
        partnerMsgList: [],
        engineerList: [],
        trActive: 0,
        // 弹窗
        submitBtnIsShow: false,
        addAndEdit: false,
        addPartnerPop: false,
        addPartnerMsgPop: false,
        titleAddPartner: false,
        titleEditPartner: false,
        titleAddMsg: false,
        titleEditMsg: false,
        currentDate: timeYear,
        currentDepartment: userGroup,
        currentUser: userName,
        userLevel: userLevel,
        userPermission: userPermission,
        regionList: [],
        provinceList: [],
        allProvinceList: [],
        // regionProvinceItem: {},// 选中的省份item
        defaultCheckedCode: [],
        // defaultCheckedList: [],// 默认选中的省份list
        defaultCheckedText: '',
        regionProvinceIsShow: false,
        partnerTypeList: [],
        partnerTypeCheckedList: [],
        industryList: [],
        checkedIndustryList: [],
        solutionList: [],
        checkedSolutionList: [],
        radioIsShow: false,
        auditTitle: '',
        // 合作伙伴的字段
        pID: '',
        pName: '',
        pBusinessProvince: [],
        pBusinessIndustry: [],
        pSolution: [],
        pRegisteredCapital: '',
        pType: '',
        pLastContractAmount: [],
        pCompanyCase: '',
        pSynopsisOfPartners: '',
        pRemark: '',
        pIsSignedCp: '',
        // 机要信息字段
        mID: '',
        mContact: '',
        mTitle: '',
        mDepartment: '',
        mEmail: '',
        mPhone: '',
        mTelphone1: '',
        mTelphone2: '',
        mTelphone3: '',
        mAddress: '',
        mMark: '',
        mRegionCode: '',
        mProvinceCode: '',
        mRegionText: '',
        mProvinceText: '',
        auditRemark: '',
        auditShow: false,
        revokeShow: false,
        ignoreShow: false,
        auditHistoryShow: false,
        auditHistoryData: [],
    },
    created: function () {
        this.tabBtn(0, 'partner-pass'); // 显示第一个tab
        this.getIndustry();
    },
    mounted: function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!_this.$el.contains(e.target))
                _this.regionProvinceIsShow = false; // 添加合伙人时候，区域省份下拉菜单隐藏
        });
    },
    computed: {},
    methods: {
        getPartnerData: function (obj) {
            var _this = this;
            var params = {
                id: '',
                inPass: 'y',
                name: '',
                limit: this.pageLimit,
                page: this.pPage,
                property: '',
                direction: '',
            };
            params = Object.assign(params, obj);
            axios.get(PATH + '/cp/crm/selectCustomer', { params: params })
                .then(function (datas) {
                var data = datas.data;
                _this.partnerList = data.root;
                _this.pPageTotal = data.totalProperty; // 数据总量
                if (_this.pID === '')
                    _this.pID = data.root[0].id; //当前行的ID, 添加和编辑机要信息后，不是跳转第一页的第一条数据，而是停留在当前
                _this.getPartnerMsgData();
            });
        },
        getPartnerMsgData: function (customerId) {
            var _this = this;
            customerId = customerId || this.pID;
            var params = {
                customerId: customerId,
                id: '',
            };
            // console.log(params, 'params, msg');
            axios.get(PATH + '/cp/crm/selectCustomerContact', { params: params })
                .then(function (datas) {
                var list = datas.data.root;
                _this.partnerMsgList = list;
            });
        },
        getRegion: function (activeRegion) {
            var _this = this;
            activeRegion = activeRegion || 'regionHd';
            axios.get(PATH + '/basic/queryDictDataByCategory?categoryCodes=region').then(function (datas) {
                _this.regionList = datas.data.msg.region;
                _this.mRegionCode = activeRegion; // 默认区域选中第一个
                //this.getAllProvince(this.regionList)
            });
        },
        getProvince: function (province, activeProvince) {
            var _this = this;
            province = province || 'regionHd';
            axios
                .get(PATH + '/basic/queryDictDataByCategory?categoryCodes=' + province)
                .then(function (datas) {
                _this.provinceList = datas.data.msg[province];
                _this.mProvinceCode = activeProvince; //
            });
        },
        getEngineerData: function () {
        },
        // 所有省份
        getAllProvince: function (arr) {
            var _this = this;
            axios
                .get(PATH + '/basic/queryRegions')
                .then(function (datas) {
                _this.allProvinceList = datas.data.msg;
            });
        },
        // 合伙人类型
        getPartnerType: function () {
            var _this = this;
            axios
                .get(PATH + '/basic/queryDictDataByCategory?categoryCodes=cooperativePartnerType')
                .then(function (datas) {
                _this.partnerTypeList = datas.data.msg.cooperativePartnerType;
            });
        },
        // 行业
        getIndustry: function () {
            var _this = this;
            axios
                .get(PATH + '/basic/queryDictDataByCategory?categoryCodes=industryLine')
                .then(function (datas) {
                _this.industryList = datas.data.msg.industryLine;
            });
        },
        // 合作产品
        getSolution: function () {
            var _this = this;
            axios
                .get(PATH + '/basic/selectSoSolutionLargeClass')
                .then(function (datas) {
                _this.solutionList = datas.data.msg;
            });
        },
        // 关闭弹窗
        popUp: function (attr) {
            this.tempID = '';
            this.pIsSignedCp = ''; // 是否签约客户
            this[attr] = false; // 弹窗显示
            // 清空输入框记录
            // 机要
            this.mContact = '';
            this.mDepartment = '';
            this.mTitle = '';
            this.mPhone = '';
            this.mTelphone1 = '';
            this.mTelphone2 = '';
            this.mTelphone3 = '';
            this.mEmail = '';
            this.mMark = '';
            this.mProvinceText = '';
            this.mAddress = '';
            // 合伙人
            this.pName = '';
            this.pRegisteredCapital = '';
            this.pCompanyCase = '';
            this.pSynopsisOfPartners = '';
            this.pRemark = '';
            //this.partnerTypeCheckedList = {};// 合作伙伴类型
            this.pType = {}; // 合作伙伴类型
            this.checkedIndustryList = []; // 业务行业清空
            this.checkedSolutionList = []; // 合作产品清空
            this.pBusinessProvince = []; // 区域，省份清空
            this.defaultCheckedCode = []; // 区域，省份清空
            this.defaultCheckedText = ''; // 区域，省份文字清空
            //
            this.addAndEdit = false; // 添加和编辑 合伙人，机要信息的弹窗
            this.addPartnerPop = false; // 隐藏
            this.addPartnerMsgPop = false; // 隐藏
        },
        // tab切换
        tabBtn: function (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num; // tab的样式
            this.tabContentShow = type; // tab里的内容
            this.partnerList = []; // 清空表格
            this.partnerMsgList = []; // 清空表格
            if (type === 'partner-pass')
                this.tabBtnPass();
            if (type === 'partner-other')
                this.tabBtnOther();
            if (type === 'partner-msg')
                this.tabBtnMsg();
            if (type === 'engineer')
                this.tabBtnEngineer();
        },
        tabBtnPass: function () {
            this.trActive = 0; // 当前行的样式
            this.pID = ''; // 当前行的ID,
            this.getPartnerData({ page: 1 });
        },
        tabBtnOther: function () {
            this.trActive = 0; // 当前行的样式
            this.pID = ''; // 当前行的ID,
            this.getPartnerData({ inPass: 'n', page: 1 });
        },
        tabBtnMsg: function () {
        },
        tabBtnEngineer: function () {
        },
        // 分页
        paging: function (type, attr) {
            console.log(type, attr);
            if (type === 'partner-pass') {
                this.trActive = 0; // 当前行的样式
                this.pID = ''; // 当前行的ID,
                this.pPage = attr; // 合伙人当前页
                this.getPartnerData();
            }
            if (type === 'partner-other') {
                this.trActive = 0; // 当前行的样式
                this.pID = ''; // 当前行的ID,
                this.pPage = attr; // 合伙人当前页
                this.getPartnerData({ inPass: 'n' });
            }
        },
        // 选中合作伙伴当前行
        clickPartner: function (id, index) {
            this.trActive = index; // 当前行的样式
            this.pID = id; // 当前行的ID,
            this.getPartnerMsgData();
        },
        // 添加事件
        addPartnerBtn: function (type) {
            this[type] = true;
            if (type === 'addPartnerPop') {
                this.submitBtnIsShow = true; // 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerPop = true;
                this.addPartnerMsgPop = true;
                this.titleAddPartner = true; // title
                this.titleAddMsg = true; // title
                this.titleEditPartner = false; //title
                this.titleEditMsg = false; //title
                this.getRegion();
                this.getProvince();
                this.getAllProvince(); // 所有省份
                this.getPartnerType(); // 合伙人类型
                this.getIndustry(); // 行业
                this.getSolution(); // 合作产品
                this.setRecentYears(); // 最近三年年份设置
            }
            if (type === 'addPartnerMsgPop') {
                this.submitBtnIsShow = false; // 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerMsgPop = true;
                this.titleAddPartner = false; // title
                this.titleAddMsg = true; // title
                this.titleEditPartner = false; //title
                this.titleEditMsg = false; //title
                this.getRegion();
                this.getProvince();
            }
        },
        // 提交事件
        submitBtn: function (type) {
            var _this = this;
            if (type === 'addPartner')
                this.addPartner();
            if (type === 'addPartnerMsg') {
                this.addPartnerMsg(function () {
                    _this.getPartnerMsgData();
                    if (_this.tempID == '') {
                        toastr.success('机要信息添加成功');
                    }
                    else {
                        toastr.success('机要信息编辑成功');
                    }
                    _this.popUp('addPartnerMsgPop');
                });
            }
        },
        // 编辑事件
        editBtn: function (type, id, obj) {
            this.tempID = id;
            if (type === 'partnerMsg') {
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.submitBtnIsShow = false; // 添加和编辑 合伙人，机要信息的按钮
                this.addPartnerMsgPop = true; // 机要信息 pop
                this.titleAddPartner = false; // title
                this.titleAddMsg = false; // title
                this.titleEditPartner = false; //title
                this.titleEditMsg = true; //title
                this.editPartnerMsg(obj);
            }
            if (type === 'edit') {
                // 编辑合伙人在 operatedBtnEdit()
            }
        },
        // 确认提交合作伙伴 有id 就相当于是编辑
        addPartner: function () {
            var _this = this;
            var paramsPartner = {
                id: this.tempID,
                name: this.pName,
                businessProvince: JSON.stringify(this.pBusinessProvince),
                businessIndustry: JSON.stringify(this.pBusinessIndustry),
                solution: JSON.stringify(this.pSolution),
                registeredCapital: this.pRegisteredCapital,
                type: this.pType.code,
                lastContractAmount: JSON.stringify(this.pLastContractAmount),
                companyCase: this.pCompanyCase,
                synopsisOfPartners: this.pSynopsisOfPartners,
                remark: this.pRemark,
                isSignedCp: this.pIsSignedCp,
            };
            axios
                .get(PATH + '/cp/crm/addOrUpdateCustomer', { params: paramsPartner })
                .then(function (res) {
                var data = res.data;
                console.log(data);
                if (data.code === 201) {
                    toastr.warning(data.msg);
                    return;
                }
                if (data.code === 200) {
                    if (_this.tempID == '') {
                        _this.pID = data.msg.cpCustomerId;
                        _this.addPartnerMsg(function () {
                            _this.getPartnerData({ inPass: 'n' });
                            _this.getPartnerMsgData();
                            toastr.success('合作伙伴添加成功！');
                        });
                    }
                    else {
                        _this.tempID = '';
                        if (_this.tabActive === 0)
                            _this.getPartnerData(); // 需要判断是通过还是非通过的合作伙伴基础信息
                        if (_this.tabActive === 4)
                            _this.getPartnerData({ inPass: 'n' }); // 需要判断是通过还是非通过的合作伙伴基础信息
                        _this.getPartnerMsgData();
                        toastr.success('合作伙伴编辑成功！');
                    }
                    _this.popUp('addPartnerPop');
                }
            });
        },
        // 确认提交机要信息 有id 就相当于是编辑
        addPartnerMsg: function (callback) {
            var params = {
                id: this.tempID,
                customerId: this.pID,
                regionCode: this.mRegionCode,
                provinceCode: this.mProvinceCode,
                contactName: this.mContact,
                department: this.mDepartment,
                title: this.mTitle,
                phone: this.mPhone,
                telphone1: this.mTelphone1,
                telphone2: this.mTelphone2,
                telphone3: this.mTelphone3,
                email: this.mEmail,
                remark: this.mMark,
                address: this.mAddress,
            };
            axios
                .get(PATH + '/cp/crm/addOrUpdateCustomerContact', { params: params })
                .then(function (datas) {
                var data = datas.data;
                if (data.code === 201) {
                    toastr.warning(data.msg);
                    return;
                }
                if (callback) {
                    callback();
                }
            });
        },
        // 编辑按钮只是渲染数据，只是编辑的提交有id
        editPartnerMsg: function (obj) {
            console.log(obj);
            this.addPartnerMsgPop = true;
            this.getRegion(obj.regionCode);
            this.getProvince(obj.regionCode, obj.provinceCode);
            this.mRegionCode = obj.regionCode;
            this.mProvinceCode = obj.provinceCode;
            this.mContact = obj.contactName;
            this.mDepartment = obj.department;
            this.mTitle = obj.title;
            this.mPhone = obj.phone;
            this.mTelphone1 = obj.telphone1;
            this.mTelphone2 = obj.telphone2;
            this.mTelphone3 = obj.telphone3;
            this.mEmail = obj.email;
            this.mMark = obj.remark;
            this.mAddress = obj.address;
        },
        // 审批按钮事件
        operateBtn: function (index, id, type, item) {
            console.log(index, id, type, item);
            if (type === 'edit')
                this.operateBtnEdit(id, item); // 编辑合伙人
            if (type === 'recall')
                this.operateBtnRecall(id); // 撤回
            if (type === 'audit')
                this.operateBtnAudit(id, item); // 审批
            if (type === 'ignore')
                this.operateBtnIgnore(id); // 忽略
            if (type === 'auditHistory')
                this.operateBtnHistory(item, id); // 历史记录
        },
        // 领导审批按钮
        operateBtnAudit: function (id, item) {
            this.tempID = id;
            this.auditTitle = item.name; // 审批时候的客户名称
            this.auditShow = true;
            this.auditRemark = ''; // 审批记录清空
        },
        // 编辑合伙人
        operateBtnEdit: function (id, item) {
            this.tempID = id; // 区分是添加还是编辑
            this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
            this.addPartnerPop = true;
            this.submitBtnIsShow = true; // 添加和编辑 合伙人，机要信息的按钮
            this.addPartnerMsgPop = false; // 机要信息 pop
            this.titleAddPartner = false; // title
            this.titleAddMsg = false; // title
            this.titleEditPartner = true; //title
            this.titleEditMsg = false; //title
            this.getPartnerType(); // 合伙人类型
            this.getIndustry(); // 行业
            this.getSolution(); // 合作产品
            this.getAllProvince(); // 所有省份
            var typeItem = {
                code: item.typeCode,
                text: item.type,
            };
            //this.partnerTypeCheckedList.push(typeItem);
            this.checkedIndustryList = item.businessIndustry; // 行业线
            this.checkedSolutionList = item.solution; // 合作产品
            this.defaultRender(item.area); // 区域省份
            this.pRegisteredCapital = item.registeredCapital; // 注册资本
            this.pLastContractAmount = item.lastContractAmount; // 最近三年合同额
            this.pName = item.name; // 客户名称
            this.pIsSignedCp = item.isSignedCp; // 是否直签
            this.pCompanyCase = item.companyCase; // 案例
            this.pSynopsisOfPartners = item.synopsisOfPartners; // 简介
            this.pRemark = item.remark; // 备注
            this.pType = typeItem; // 合作伙伴类型
        },
        // 撤回
        operateBtnRecall: function (id) {
            this.revokeShow = true;
            this.tempID = id;
        },
        // 忽略
        operateBtnIgnore: function (id) {
            this.ignoreShow = true;
            this.tempID = id;
        },
        // 审核历史
        operateBtnHistory: function (item, id) {
            this.auditHistoryShow = true;
            this.auditHistoryList = item;
        },
        // 取消，撤回，忽略，(同意， 驳回)的小弹窗
        cancelConfirmBtn: function (attr, type) {
            var _this = this;
            // console.log(attr, ',', type)
            if (type === 'cancel') {
                this[attr] = false;
                this.tempID = '';
            }
            if (attr === 'revoke' && type === 'confirm') {
                this.operateBtnUrl(this.tempID, attr, function () {
                    _this.tempID = '';
                    _this.pID = '';
                    _this.trActive = 0;
                    _this.revokeShow = false;
                    _this.getPartnerData({ inPass: 'n' });
                });
            }
            if (attr === 'ignore' && type === 'confirm') {
                this.operateBtnUrl(this.tempID, attr, function () {
                    _this.tempID = '';
                    _this.pID = '';
                    _this.trActive = 0;
                    _this.ignoreShow = false;
                    _this.getPartnerData({ inPass: 'n' });
                });
            }
            if (attr === 'pass' || attr === 'reject') {
                if ((this.auditRemark.length === 0 || this.auditRemark.trim().length === 0) && attr === 'reject') {
                    toastr.error('请填写驳回理由！');
                    return;
                }
                ;
                this.operateBtnUrl(this.tempID, attr, function () {
                    _this.tempID = '';
                    _this.pID = '';
                    _this.trActive = 0;
                    _this.auditShow = false;
                    _this.getPartnerData({ inPass: 'n', page: 1 });
                    toastr.success('审批成功！');
                });
            }
        },
        // 撤回，忽略，通过，驳回的请求
        operateBtnUrl: function (id, type, callback) {
            var params = {
                id: id,
                auditType: type,
                remark: this.auditRemark,
            };
            axios
                .get(PATH + '/cp/crm/audit', { params: params })
                .then(function (datas) {
                var data = datas.data;
                if (data.code === 201) {
                    toastr.warning(data.msg);
                    return;
                }
                if (callback)
                    callback();
            });
        },
        // 机要信息 的区域和省份
        clickRegionProvinceBtn: function (code, text, type) {
            if (type === 'region') {
                this.mProvinceText = '';
                this.mRegionCode = code;
                this.mRegionText = text;
                this.getProvince(code);
            }
            if (type === 'province') {
                this.mProvinceCode = code;
                this.mProvinceText = text;
            }
            //this.mAddress = this.mRegionText + this.mProvinceText + this.mAddress;
        },
        // 合作伙伴 的区域和省份
        partnerRegionProvinceBtn: function () {
            this.regionProvinceIsShow = !this.regionProvinceIsShow;
        },
        // 区域、省份的多选框
        checkboxBtn: function (item, type) {
            var flag = this.ifInclude(item.code);
            if (typeof flag === 'number') {
                this.pBusinessProvince.splice(flag, 1);
            }
            else {
                this.pBusinessProvince.push(item);
            }
            this.defaultCheckedCode = [];
            this.defaultCheckedText = '';
            this.textShow();
            this.styleShow(item.code);
            //this.regionProvinceIsShow = false;
        },
        // 点击的省份是否已经被选中
        ifInclude: function (code) {
            var i, len = this.pBusinessProvince.length;
            for (i = 0; i < len; i++) {
                if (this.pBusinessProvince[i].code === code) {
                    return i;
                }
            }
            return false;
        },
        // 编辑的时候默认选中的区域，省份的渲染
        defaultRender: function (data) {
            for (key in data) {
                if (key !== 'businessAreas') {
                    this.pBusinessProvince = this.pBusinessProvince.concat(data[key]);
                }
            }
            this.textShow();
        },
        // 区域、省份的样式勾选
        styleShow: function (code) {
            return this.defaultCheckedCode.indexOf(code) !== -1;
        },
        // 区域、省份选中的 text, code
        textShow: function () {
            var _this = this;
            var text = [];
            this.pBusinessProvince.forEach(function (item) {
                _this.defaultCheckedCode.push(item.code);
                text.push(item.text);
            });
            this.defaultCheckedText = text.join('，');
        },
        // 直签
        isSignedCp: function (flag) {
            this.pIsSignedCp = flag;
        },
        // 对象数组转字符串
        transString: function (arr) {
            var str = '';
            arr.forEach(function (item) {
                str += item;
            });
            console.log(str);
            return str;
        },
        // 撤回，忽略，审批，记录历史
        hidePop: function (attr) {
            this[attr] = false;
        },
        // 最近三年的年份设置
        setRecentYears: function () {
            var year = Number(this.currentDate.substring(0, 4));
            var arr = [
                {
                    year: year,
                    contractAmount: '',
                },
                {
                    year: year - 1,
                    contractAmount: '',
                },
                {
                    year: year - 2,
                    contractAmount: '',
                },
            ];
            this.pLastContractAmount = arr;
        },
    },
});
