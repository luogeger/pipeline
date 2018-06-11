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
        partnerList: [],
        partnerMsgList: [],
        engineerList: [],
        trActive: 0,
        // 弹窗
        addAndEdit: false,
        addPartnerPop: false,
        addPartnerMsgPop: false,
        currentDate: timeYear,
        currentDepartment: userGroup,
        currentUser: userName,
        regionList: [],
        provinceList: [],
        // 合作伙伴的字段
        pID: '',
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
        mRegionText: '华东区',
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
            });
        },
        getProvince: function (province, activeProvince) {
            var _this = this;
            province = province || 'regionHd';
            axios.get(PATH + '/basic/queryDictDataByCategory?categoryCodes=' + province).then(function (datas) {
                _this.provinceList = datas.data.msg[province];
                _this.mProvinceCode = activeProvince; //
            });
        },
        getEngineerData: function () {
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
            this.trActive = 0; // 当前行的样式
            this.pID = ''; // 当前行的ID,
            this.pPage = attr; // 合伙人当前页
            this.getPartnerData();
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
                this.getRegion();
                this.getProvince();
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerPop = true;
                this.addPartnerMsgPop = true;
            }
            if (type === 'addPartnerMsgPop') {
                this.getRegion();
                this.getProvince();
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerMsgPop = true;
            }
        },
        // 提交事件
        submitBtn: function (type) {
            if (type === 'addPartnerMsg')
                this.addPartnerMsg();
        },
        // 编辑事件
        editBtn: function (type, id, obj) {
            this.tempID = id;
            if (type === 'partnerMsg') {
                this.addAndEdit = true; // 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerMsgPop = true;
                this.editPartnerMsg(obj);
            }
        },
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
        // 分页
        calcPage: function (type, num) {
        },
        select: function (event) {
            console.log(event);
        },
        select2: function (event) {
            console.log(event);
        }
    },
});
