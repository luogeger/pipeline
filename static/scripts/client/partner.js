var vm = new Vue({
    el: '#partner',
    data: {
        // tab
        engineerTabShow: false,
        tabActive: 0,
        tabContentShow: 'partner-pass',
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
        partnerList: [],
        partnerMsgList: [],
        engineerList: [],
        firstMsgCode: '',
        trActive: 0,
        // 弹窗
        addPartnerPop: true,
        addPartnerMsgPop: false,
        currentDate: timeYear,
        currentDepartment: userGroup,
        currentUser: userName,
        regionList: [],
        provinceList: [],
        // 添加合作伙伴的字段
        mContact: '',
        mAddress: '',
        currentRegion: '',
        currentProvince: '',
        mRegionText: '',
        mProvinceText: '',
    },
    created: function () {
        var _this = this;
        this.getPartnerData(function () {
            _this.getPartnerMsgData();
        });
        this.getRegion();
        this.getProvince();
    },
    mounted: function () {
    },
    methods: {
        getPartnerData: function (callback) {
            var _this = this;
            axios.get(PATH + '/cp/crm/selectCustomer').then(function (datas) {
                var data = datas.data;
                var list = data.root;
                _this.partnerList = list;
                // this.firstMsgCode = list[0].id;
                if (callback)
                    callback();
            });
        },
        getPartnerMsgData: function (customerId) {
            var _this = this;
            customerId = customerId || this.firstMsgCode;
            var params = {
                customerId: customerId,
                id: '',
            };
            console.log(params);
            axios.get(PATH + '/cp/crm/selectCustomerContact', { params: params }).then(function (datas) {
                var data = datas.data;
                var list = data.root;
                _this.partnerMsgList = list;
            });
        },
        getRegion: function (region, activeRegion) {
            var _this = this;
            region = region || 'region';
            activeRegion = activeRegion || 'regionHd';
            axios.get(PATH + '/basic/queryDictDataByCategory?categoryCodes=' + region).then(function (datas) {
                var data = datas.data;
                _this.regionList = data.msg.region;
                _this.currentRegion = activeRegion; // 默认区域选中第一个
            });
        },
        getProvince: function (province) {
            var _this = this;
            province = province || 'regionHd';
            axios.get(PATH + '/basic/queryDictDataByCategory?categoryCodes=' + province).then(function (datas) {
                _this.provinceList = datas.data.msg[province];
                _this.currentProvince = '';
            });
        },
        // 机要信息的区域和省份
        clickRegionProvinceBtn: function (code, text, type) {
            if (type === 'region') {
                this.currentRegion = code;
                this.mProvinceText = '';
                this.mRegionText = text;
                this.getProvince(code);
            }
            if (type === 'province') {
                this.currentProvince = code;
                this.mProvinceText = text;
            }
            this.mAddress = this.mRegionText + this.mProvinceText;
        },
        test: function () {
            console.log(this.mAddress);
        },
        getEngineerData: function () {
        },
        // tab切换
        tabBtn: function (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num;
            this.tabContentShow = type;
        },
        // 选中合作伙伴当前行
        clickPartner: function (id, index) {
            this.trActive = index;
            this.getPartnerMsgData(id);
        },
        // 添加
        addPartnerBtn: function (type) {
            this[type] = true;
        },
        // 关闭弹窗
        popUp: function (attr) {
            this[attr] = false;
        },
        // 输入框blur事件
        inputBlur: function (val, type) {
            if (type === 'mContact')
                this.mContact = val;
        },
        select: function (event) {
            console.log(event);
        },
        select2: function (event) {
            console.log(event);
        }
    },
});
