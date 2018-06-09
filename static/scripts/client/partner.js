var vm = new Vue({
    el: '#partner',
    data: {
        // tab
        engineerTabShow: false,
        tabActive: 0,
        tabContentShow: '',
        // 分页
        pPage: 1,
        mPage: 1,
        limitPage: 11,
        partnerList: [],
        partnerMsgList: [],
        engineerList: [],
        trActive: 0,
        // 弹窗
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
        this.tabBtn(0, 'partner-pass'); // 显示第一个tab
    },
    mounted: function () {
    },
    methods: {
        getPartnerData: function (obj, callback) {
            var _this = this;
            var params = {
                inPass: '',
                name: '',
                limit: this.limitPage,
                page: this.pPage,
                property: '',
                direction: '',
            };
            params = Object.assign(params, obj);
            axios.get(PATH + '/cp/crm/selectCustomer', { params: params })
                .then(function (datas) {
                var list = datas.data.root;
                _this.partnerList = list;
                if (_this.pID === '')
                    _this.pID = list[0].id;
                if (callback)
                    callback();
            });
        },
        getPartnerMsgData: function (customerId) {
            var _this = this;
            customerId = customerId || this.pID;
            var params = {
                customerId: customerId,
                id: '',
            };
            console.log(params, 'msg, params');
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
        getProvince: function (province) {
            var _this = this;
            province = province || 'regionHd';
            axios.get(PATH + '/basic/queryDictDataByCategory?categoryCodes=' + province).then(function (datas) {
                _this.provinceList = datas.data.msg[province];
                _this.mProvinceCode = ''; //
            });
        },
        getEngineerData: function () {
        },
        // tab切换
        tabBtn: function (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num; // tab的样式
            this.tabContentShow = type; // tab里的内容
            switch (type) {
                case 'partner-pass':
                    this.tabBtnPass();
                    break;
                case 'partner-other':
                    this.tabBtnOther();
                    break;
                case 'partner-msg':
                    this.tabBtnMsg();
                    break;
                case 'engineer':
                    this.tabBtnEngineer();
                    break;
            }
        },
        tabBtnPass: function () {
            var _this = this;
            this.getPartnerData(null, function () {
                _this.getPartnerMsgData();
            });
        },
        tabBtnOther: function () {
        },
        tabBtnMsg: function () {
        },
        tabBtnEngineer: function () {
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
            if (type === 'addPartnerPop' || type === 'addPartnerMsgPop') {
                this.getRegion();
                this.getProvince();
            }
        },
        // 提交事件
        submitBtn: function (type) {
            if (type === 'addPartnerMsg')
                this.addPartnerMsg();
        },
        // 关闭弹窗
        popUp: function (attr) {
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
        // 确认提交机要信息
        addPartnerMsg: function (id) {
            var _this = this;
            id = id || '';
            var params = {
                // id:             id,
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
            axios.get(PATH + '/cp/crm/addOrUpdateCustomerContact', { params: params })
                .then(function (datas) {
                var data = datas.data;
                if (data.code === 201) {
                    toastr.warning(data.msg);
                    return;
                }
                _this.popUp('addPartnerMsgPop');
                _this.getPartnerMsgData();
                toastr.warning('机要信息添加成功');
            });
        },
        select: function (event) {
            console.log(event);
        },
        select2: function (event) {
            console.log(event);
        }
    },
});
