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
        currentDate: timeYear,
        currentDepartment: userGroup,
        currentUser: userName,
        userLevel: userLevel,
        regionList: [],
        provinceList: [],
        allProvinceList: [],
        regionProvinceItem: {},
        regionProvinceList: [],
        regionProvinceText: '',
        regionProvinceIsShow: false,
        partnerTypeList: [],
        industryList: [],
        solutionList: [],
        // 合作伙伴的字段
        pID: '',
        pName: '',
        pBusinessProvince: '',
        pBusinessIndustry: [],
        pSolution: '',
        pRegisteredCapital: '',
        pType: '',
        pLastContractAmount: [
            {
                year: 0,
                contractAmount: '',
            },
            {
                year: 0,
                contractAmount: '',
            },
            {
                year: 0,
                contractAmount: '',
            },
        ],
        pCompanyCase: '',
        pSynopsisOfPartners: '',
        pRemark: '',
        pIsSignedCp: '',
        // 合作伙伴机要信息字段
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
        // 筛选数据
        selectList: [
            {
                label: '区域',
                value: '0'
            },
            {
                label: 'yanjiuyuan',
                value: '1'
            },
            {
                label: 'zhinengzhizhen',
                value: '2'
            },
        ],
        selectList2: [
            {
                label: '省份',
                value: '0'
            },
            {
                label: 'luoxiaoqing',
                value: '1'
            },
            {
                label: 'xiaoijiqiren',
                value: '2'
            },
            {
                label: 'zhonghuaren',
                value: '0'
            },
            {
                label: 'luoxiaoqing',
                value: '1'
            },
            {
                label: 'xiaoijiqiren',
                value: '2'
            },
            {
                label: 'zhonghuaren',
                value: '0'
            },
            {
                label: 'luoxiaoqing',
                value: '1'
            },
            {
                label: 'xiaoijiqiren',
                value: '2'
            },
            {
                label: 'zhonghuaren',
                value: '0'
            },
            {
                label: 'luoxiaoqing',
                value: '1'
            },
            {
                label: 'xiaoijiqiren',
                value: '2'
            },
        ],
    },
    created: function () {
        this.tabBtn(4, 'partner-other'); // 显示第一个tab
        this.getIndustry();
    },
    mounted: function () {
    },
    methods: {
        getPartnerData: function (obj) {
            var _this = this;
            var params = {
                inPass: 'y',
                name: '',
                limit: this.pageLimit,
                page: this.pPage,
                property: '',
                direction: '',
            };
            params = Object.assign(params, obj);
            console.log(params, 'params, partner');
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
        // tab切换
        tabBtn: function (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num; // tab的样式
            this.tabContentShow = type; // tab里的内容
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
            this.getPartnerData();
        },
        tabBtnOther: function () {
            this.trActive = 0; // 当前行的样式
            this.pID = ''; // 当前行的ID,
            this.getPartnerData({ inPass: 'n' });
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
            console.log(type);
            this[type] = true;
            if (type === 'addPartnerPop') {
                this.submitBtnIsShow = true; // 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerPop = true;
                this.addPartnerMsgPop = true;
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
                this.getRegion();
                this.getProvince();
            }
        },
        // 提交事件
        submitBtn: function (type) {
            if (type === 'addPartner')
                this.addPartner();
            if (type === 'addPartnerMsg')
                this.addPartnerMsg();
        },
        // 编辑事件
        editBtn: function (type, id, obj) {
            this.tempID = id;
            if (type === 'partnerMsg') {
                this.submitBtnIsShow = false; // 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerMsgPop = true;
                this.editPartnerMsg(obj);
            }
        },
        // 确认提交合作伙伴 有id 就相当于是编辑
        addPartner: function () {
            var params = {
                id: this.tempID,
                name: this.pName,
                businessProvince: this.pBusinessProvince,
                businessIndustry: this.pBusinessIndustry,
                solution: this.pSolution,
                registeredCapital: this.pRegisteredCapital,
                type: this.pType,
                lastContractAmount: this.pLastContractAmount,
                companyCase: this.pCompanyCase,
                synopsisOfPartners: this.pSynopsisOfPartners,
                remark: this.pRemark,
                isSignedCp: this.pIsSignedCp,
            };
            console.log(params);
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
        // 确认提交机要信息 有id 就相当于是编辑
        addPartnerMsg: function () {
            var _this = this;
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
                _this.popUp('addPartnerMsgPop');
                _this.getPartnerMsgData();
                if (_this.tempID) {
                    toastr.success('机要信息添加成功');
                }
                else {
                    toastr.success('机要信息编辑成功');
                }
            });
        },
        // 关闭弹窗
        popUp: function (attr) {
            this.tempID = '';
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
            this.addAndEdit = false; // 添加和编辑 合伙人，机要信息的弹窗
            this.addPartnerPop = false; // 隐藏
            this.addPartnerMsgPop = false; // 隐藏
        },
        // 机要信息的区域和省份
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
        // 合作伙伴的区域和省份
        regionProvinceBtn: function () {
            var _this = this;
            this.regionProvinceIsShow = !this.regionProvinceIsShow;
            console.log(this.regionProvinceItem);
            for (key in this.regionProvinceItem) {
                this.regionProvinceItem[key].forEach(function (item) {
                    _this.regionProvinceList.push(item);
                });
            }
        },
        // 多选框
        checkboxBtn: function (attr, type) {
            //console.log(type, attr)
            var list = [];
            this.regionProvinceItem[type] = attr;
            for (key in this.regionProvinceItem) {
                this.regionProvinceItem[key].forEach(function (item) {
                    list.push(item.text);
                });
            }
            this.regionProvinceText = list.join('，');
            // attr.forEach(item => {
            //     if (this.regionProvinceList.indexOf(item) === -1) {
            //         this.regionProvinceList.push(item)
            //     }
            // });
            // console.log(this.regionProvinceList)
        },
        // 审批按钮事件
        operateBtn: function (index, id, type) {
            console.log(index, id, type);
            axios
                .get(PATH + '/cp/crm/addOrUpdateCustomer', { id: id })
                .then(function (datas) {
                console.log(datas.data);
            });
        },
        // 最近三年的年份设置
        setRecentYears: function () {
            var year = Number(this.currentDate.substring(0, 4));
            this.pLastContractAmount[0].year = year + '年';
            this.pLastContractAmount[1].year = year - 1 + '年';
            this.pLastContractAmount[2].year = year - 2 + '年';
        },
        select: function (event) {
            console.log(event);
        },
        select2: function (event) {
            console.log(event);
        }
    },
});
