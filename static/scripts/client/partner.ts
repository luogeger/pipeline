let vm = new Vue({
    el: '#partner',

    data: {
        // tab
        engineerTabShow:    false,// 工程师tab显示
        tabActive:          0,
        tabContentShow:     '',

        // 分页
        pPage:              1,
        mPage:              1,
        limitPage:          11,

        partnerList:        [],// 伙伴数据
        partnerMsgList:     [],// 伙伴信息数据
        engineerList:       [],// 工程师认证数据
        trActive:           0,// 选中合作伙伴当前行


        // 弹窗
        addPartnerPop:      false,// 合作伙伴
        addPartnerMsgPop:   false,// 合作伙伴信息
        currentDate:        timeYear,// 报备时间
        currentDepartment:  userGroup,// 所属部门
        currentUser:        userName,// 负责销售
        regionList:         [],// 区域
        provinceList:       [],// 省份


        // 合作伙伴的字段
        pID:                '',// 合作伙伴的ID, 也是第一个ID,

        // 合作伙伴机要信息字段
        mID:                '',// 机要信息的ID
        mContact:           '',// 机要联系人
        mTitle:             '',
        mDepartment:        '',
        mEmail:             '',
        mPhone:             '',
        mTelphone1:         '',
        mTelphone2:         '',
        mTelphone3:         '',
        mAddress:           '',// 机要地址
        mMark:              '',
        mRegionCode:        '',// 机要区域code
        mProvinceCode:      '',// 机要省份code
        mRegionText:        '华东区',// 机要区域文本
        mProvinceText:      '',//机要城市文本




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
    },// data

    created () {
        this.tabBtn(0, 'partner-pass');// 显示第一个tab
    },

    mounted () {

    },

    methods :{
        getPartnerData (obj, callback) {
            let params = {
                inPass:     '',
                name:       '',
                limit:      this.limitPage,
                page:       this.pPage,
                property:   '',
                direction:  '',
            };
            params = Object.assign(params, obj);
            axios.get(PATH +'/cp/crm/selectCustomer',  {params: params} )
                .then((datas)=>{
                    let list = datas.data.root;
                    this.partnerList = list;
                    if (this.pID === '') this.pID = list[0].id;

                    if (callback) callback();
            });
        },// 伙伴数据

        getPartnerMsgData (customerId) {
            customerId = customerId || this.pID;
            let params = {
                customerId: customerId,
                id: '',
                // limit:      this.limitPage,
                // page:       this.mPage,
            };
            console.log(params, 'msg, params');
            axios.get(PATH +'/cp/crm/selectCustomerContact', {params: params} )
                .then((datas)=>{
                    let list = datas.data.root;
                    this.partnerMsgList = list;
            });
        },// 伙伴信息数据

        getRegion: function (activeRegion) {
            activeRegion = activeRegion || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes=region').then((datas)=>{
                this.regionList = datas.data.msg.region;
                this.mRegionCode = activeRegion;// 默认区域选中第一个
            });
        },// 区域

        getProvince: function (province) {
            province = province || 'regionHd';
            axios.get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province).then((datas)=>{
                this.provinceList = datas.data.msg[province];
                this.mProvinceCode = '';//
            });
        },// 省份

        getEngineerData () {

        },// 工程师认证数据

        // tab切换
        tabBtn (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num;// tab的样式
            this.tabContentShow = type;// tab里的内容
            switch(type)
            {
                case 'partner-pass':
                    this.tabBtnPass()
                    break;
                case 'partner-other':
                    this.tabBtnOther()
                    break;
                case 'partner-msg':
                    this.tabBtnMsg()
                    break;
                case 'engineer':
                    this.tabBtnEngineer()
                    break;
            }
        },

        tabBtnPass () {
            this.getPartnerData(null, ()=>{
                this.getPartnerMsgData()
            })
        },

        tabBtnOther () {

        },

        tabBtnMsg () {

        },

        tabBtnEngineer () {

        },



        // 选中合作伙伴当前行
        clickPartner (id, index) {
            this.trActive = index;// 当前行的样式
            this.pID = id;// 当前行的ID,
            this.getPartnerMsgData()
        },

        // 添加事件
        addPartnerBtn (type) {
            this[type] = true;
            if (type === 'addPartnerPop' || type === 'addPartnerMsgPop') {
                this.getRegion()
                this.getProvince()
            }
        },

        // 提交事件
        submitBtn (type) {
            if (type === 'addPartnerMsg') this.addPartnerMsg();
        },


        // 关闭弹窗
        popUp (attr) {
            this[attr] = false;// 弹窗显示
            // 清空输入框记录
            // 机要
            this.mContact   = '';
            this.mDepartment    = '';
            this.mTitle = '';
            this.mPhone = '';
            this.mTelphone1 = '';
            this.mTelphone2 = '';
            this.mTelphone3 = '';
            this.mEmail = '';
            this.mMark  = '';
            this.mProvinceText  = '';
            this.mAddress = '';
        },

        // 机要信息的区域和省份
        clickRegionProvinceBtn (code, text, type) {
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
        addPartnerMsg (id) {
            id = id || '';
            let params = {
                // id:             id,
                customerId:     this.pID,
                regionCode:     this.mRegionCode,
                provinceCode:   this.mProvinceCode,
                contactName:    this.mContact,
                department:     this.mDepartment,
                title:          this.mTitle,
                phone:          this.mPhone,
                telphone1:      this.mTelphone1,
                telphone2:      this.mTelphone2,
                telphone3:      this.mTelphone3,
                email:          this.mEmail,
                remark:         this.mMark,
                address:        this.mAddress,
            };


            axios.get(PATH +'/cp/crm/addOrUpdateCustomerContact',  {params: params} )
                .then((datas)=>{
                    let data = datas.data;
                    if (data.code === 201) {
                        toastr.warning(data.msg)
                        return;
                    }

                    this.popUp('addPartnerMsgPop')
                    this.getPartnerMsgData()
                    toastr.warning('机要信息添加成功')
                });

        },//






















        select (event) {
            console.log(event)
        },

        select2 (event) {
            console.log(event)
        }
    },

});

