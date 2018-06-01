let vm = new Vue({
    el: '#partner',

    data: {
        // tab
        engineerTabShow:    false,// 工程师tab显示
        tabActive:          0,
        tabContentShow:     'partner-pass',

        // 筛选数据
        selectList:[
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
        selectList2:[
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

        partnerList:        [],// 伙伴数据
        partnerMsgList:     [],// 伙伴信息数据
        engineerList:       [],// 工程师认证数据
        firstMsgCode:       '',// 首选机要信息code
        trActive:           0,// 选中合作伙伴当前行


        // 弹窗
        addPartnerPop:      true,// 合作伙伴
        addPartnerMsgPop:   false,// 合作伙伴信息
        currentDate:        timeYear,// 报备时间
        currentDepartment:  userGroup,// 所属部门
        currentUser:        userName,// 负责销售
        regionList:         [],// 区域
        provinceList:       [],// 省份


        // 添加合作伙伴的字段

        mContact:           '',// 机要联系人
        mAddress:           '',// 机要地址
        currentRegion:      '',// 机要区域code
        currentProvince:    '',// 机要省份code

        mRegionText:        '',// 机要区域文本
        mProvinceText:      '',//机要城市文本
    },// data

    created () {
        this.getPartnerData(()=>{
            this.getPartnerMsgData()
        })

        this.getRegion()
        this.getProvince()
    },

    mounted () {

    },

    methods :{
        getPartnerData (callback) {
            axios.get(PATH +'/cp/crm/selectCustomer' ).then((datas)=>{
                let data = datas.data;
                let list = data.root;
                this.partnerList = list;
                // this.firstMsgCode = list[0].id;

                if (callback) callback();
            });
        },// 伙伴数据

        getPartnerMsgData (customerId) {
            customerId = customerId || this.firstMsgCode;
            let params = {
                customerId: customerId,
                id: '',
            };
            console.log(params);
            axios.get(PATH +'/cp/crm/selectCustomerContact', {params: params} ).then((datas)=>{
                let data = datas.data;
                let list = data.root;
                this.partnerMsgList = list;
            });
        },// 伙伴信息数据

        getRegion: function (region, activeRegion) {
            region = region || 'region';
            activeRegion = activeRegion || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ region).then((datas)=>{
                let data = datas.data;
                this.regionList = data.msg.region;
                this.currentRegion = activeRegion;// 默认区域选中第一个
            });
        },// 区域

        getProvince: function (province) {
            province = province || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then((datas)=>{
                this.provinceList = datas.data.msg[province];
                this.currentProvince = '';
            });
        },// 省份

        // 机要信息的区域和省份
        clickRegionProvinceBtn (code, text, type) {
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

        test () {
            console.log(this.mAddress)
        },

        getEngineerData () {

        },// 工程师认证数据

        // tab切换
        tabBtn (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num;
            this.tabContentShow = type;


        },

        // 选中合作伙伴当前行
        clickPartner (id, index) {
            this.trActive = index;
            this.getPartnerMsgData(id)
        },

        // 添加
        addPartnerBtn (type) {
            this[type] = true;
        },

        // 关闭弹窗
        popUp (attr) {
            this[attr] = false;
        },

        // 输入框blur事件
        inputBlur (val, type) {
            if (type === 'mContact') this.mContact = val;
        },



















        select (event) {
            console.log(event)
        },

        select2 (event) {
            console.log(event)
        }
    },

});

