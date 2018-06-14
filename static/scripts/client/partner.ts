let vm = new Vue({
    el: '#partner',

    data: {
        tempID:             '',// 用于区分(编辑、添加),(合作伙伴、机要信息) 弹窗关闭的时候，一定要清空
        // tab
        engineerTabShow:    false,// 工程师tab显示
        tabActive:          0,
        tabContentShow:     '',

        // 分页
        pageLimit:          10,// 页容量
        pPageTotal:         0,
        pPage:              1,// 合伙人当前页
        mPageTotal:         0,
        mPage:              1,// 机要信息当前页

        // dataList
        partnerList:        [],// 伙伴数据
        partnerMsgList:     [],// 伙伴信息数据
        engineerList:       [],// 工程师认证数据
        trActive:           0,// 选中合作伙伴当前行



        // 弹窗
        submitBtnIsShow:    false,// 添加和编辑 合伙人，机要信息的按钮
        addAndEdit:         false,// 添加和编辑 合伙人，机要信息的弹窗
        addPartnerPop:      false,// 合作伙伴
        addPartnerMsgPop:   false,// 合作伙伴信息
        titleAddPartner: false,
        titleEditPartner: false,
        titleAddMsg: false,
        titleEditMsg: false,
        currentDate:        timeYear,// 报备时间
        currentDepartment:  userGroup,// 所属部门
        currentUser:        userName,// 负责销售
        userLevel:          userLevel,// xs, xsld, dqxyh
        regionList:         [],// 区域
        provinceList:       [],// 省份
        allProvinceList:    [],// 所有省份
        regionProvinceItem: {},// 选中的省份item
        regionProvinceText: '',// 选中的省分text
        regionProvinceIsShow: false,// 合作伙伴的区域和省份
        partnerTypeList:    [],// 合伙人类型 下拉框
        partnerTypeCheckedList: [],//默认选中，编辑的时候用到
        industryList:       [],// 业务行业
        solutionList:       [],// 合作产品
        radioIsShow:        false,// 是否直签


        // 合作伙伴的字段
        pID:                '',     // 合作伙伴的ID, 也是第一个ID,
        pName:               '',	//合作伙伴名称
        pBusinessProvince:   [],	//业务省份(城市)（协议内容）
        pBusinessIndustry:   [],	//主要业务行业(协议内容)
        pSolution:           '',	//主要合作产品
        pRegisteredCapital:  '',	//注册资本
        pType:               '',	//合作伙伴类型
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

        ],	//近期销售合同额
        pCompanyCase:        '',    //公司案例
        pSynopsisOfPartners: '',    //合作伙伴简介
        pRemark:             '',	//备注
        pIsSignedCp:         '',	//是否是直签合作伙伴客户


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
        mRegionText:        '',// 机要区域文本
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
        this.getIndustry()
    },

    mounted () {

    },

    methods :{
        getPartnerData (obj) {
            let params = {
                id:         '',
                inPass:     'y',
                name:       '',
                limit:      this.pageLimit,
                page:       this.pPage,
                property:   '',
                direction:  '',
            };
            params = Object.assign(params, obj);
            axios.get(PATH +'/cp/crm/selectCustomer',  {params: params} )
                .then((datas)=>{
                    let data = datas.data;
                    this.partnerList = data.root;
                    this.pPageTotal  = data.totalProperty;// 数据总量
                    if (this.pID === '') this.pID = data.root[0].id;//当前行的ID, 添加和编辑机要信息后，不是跳转第一页的第一条数据，而是停留在当前

                    this.getPartnerMsgData()
            });
        },// 伙伴数据

        getPartnerMsgData (customerId) {
            customerId = customerId || this.pID;
            let params = {
                customerId: customerId,
                id: '',
                // limit:      this.pageLimit,
                // page:       this.mPage,
            };
            // console.log(params, 'params, msg');
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
                //this.getAllProvince(this.regionList)
            });
        },// 区域

        getProvince: function (province, activeProvince) {
            province = province || 'regionHd';
            axios
                .get(PATH +'/basic/queryDictDataByCategory?categoryCodes='+ province)
                .then((datas)=>{
                this.provinceList = datas.data.msg[province];
                this.mProvinceCode = activeProvince;//
            });
        },// 省份

        getEngineerData () {

        },// 工程师认证数据

        // 所有省份
        getAllProvince (arr) {
            axios
                .get(PATH +'/basic/queryRegions')
                .then((datas)=>{
                    this.allProvinceList = datas.data.msg;
                });
        },

        // 合伙人类型
        getPartnerType () {
            axios
                .get(PATH +'/basic/queryDictDataByCategory?categoryCodes=cooperativePartnerType')
                .then((datas)=>{
                    this.partnerTypeList = datas.data.msg.cooperativePartnerType;
                });
        },

        // 行业
        getIndustry (){
            axios
                .get(PATH +'/basic/queryDictDataByCategory?categoryCodes=industryLine')
                .then(datas => {
                    this.industryList = datas.data.msg.industryLine;
                });
        },

        // 合作产品
        getSolution (){
            axios
                .get(PATH +'/basic/selectSoSolutionLargeClass')
                .then(datas => {
                    this.solutionList = datas.data.msg;
                });
        },

        // 关闭弹窗
        popUp (attr) {
            this.tempID = '';
            this.pIsSignedCp = '';// 是否签约客户
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

            // 合伙人
            this.partnerTypeCheckedList = [];

            //
            this.addAndEdit       = false;// 添加和编辑 合伙人，机要信息的弹窗
            this.addPartnerPop    = false;// 隐藏
            this.addPartnerMsgPop = false;// 隐藏
        },

        // tab切换
        tabBtn (num, type) {
            //type == partner-pass, partner-other, partner-msg, engineer
            this.tabActive = num;// tab的样式
            this.tabContentShow = type;// tab里的内容

            if (type === 'partner-pass') this.tabBtnPass();
            if (type === 'partner-other') this.tabBtnOther();
            if (type === 'partner-msg') this.tabBtnMsg();
            if (type === 'engineer') this.tabBtnEngineer();


        },

        tabBtnPass () {
            this.trActive = 0;// 当前行的样式
            this.pID = '';// 当前行的ID,
            this.getPartnerData()
        },

        tabBtnOther () {
            this.trActive = 0;// 当前行的样式
            this.pID = '';// 当前行的ID,
            this.getPartnerData({inPass: 'n'})
        },

        tabBtnMsg () {

        },

        tabBtnEngineer () {

        },

        // 分页
        paging (type, attr) {
            console.log(type, attr)
            if (type === 'partner-pass') {
                this.trActive = 0;// 当前行的样式
                this.pID = '';// 当前行的ID,
                this.pPage = attr;// 合伙人当前页
                this.getPartnerData()
            }

            if (type === 'partner-other') {
                this.trActive = 0;// 当前行的样式
                this.pID = '';// 当前行的ID,
                this.pPage = attr;// 合伙人当前页
                this.getPartnerData({inPass: 'n'})

            }
        },


        // 选中合作伙伴当前行
        clickPartner (id, index) {
            this.trActive = index;// 当前行的样式
            this.pID = id;// 当前行的ID,
            this.getPartnerMsgData()
        },

        // 添加事件
        addPartnerBtn (type) {
            console.log(type)
            this[type] = true;
            if (type === 'addPartnerPop') {
                this.submitBtnIsShow  = true;// 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit       = true;// 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerPop    = true;
                this.addPartnerMsgPop = true;

                this.titleAddPartner  = true;// title
                this.titleAddMsg      = true;// title
                this.titleEditPartner = false;//title
                this.titleEditMsg     = false;//title

                this.getRegion()
                this.getProvince()
                this.getAllProvince()// 所有省份
                this.getPartnerType()// 合伙人类型
                this.getIndustry()// 行业
                this.getSolution()// 合作产品
                this.setRecentYears()// 最近三年年份设置
            }

            if (type === 'addPartnerMsgPop') {
                this.submitBtnIsShow  = false;// 添加和编辑 合伙人，机要信息的按钮
                this.addAndEdit       = true;// 添加和编辑 合伙人，机要信息的弹窗
                this.addPartnerMsgPop = true;
                this.titleAddPartner  = false;// title
                this.titleAddMsg      = true;// title
                this.titleEditPartner = false;//title
                this.titleEditMsg     = false;//title


                this.getRegion()
                this.getProvince()
            }
        },

        // 提交事件
        submitBtn (type) {
            if (type === 'addPartner') this.addPartner();
            if (type === 'addPartnerMsg') this.addPartnerMsg();
        },

        // 编辑事件
        editBtn (type, id, obj) {
            this.tempID = id;
            if (type === 'partnerMsg') {
                this.addAndEdit       = true;// 添加和编辑 合伙人，机要信息的弹窗
                this.submitBtnIsShow  = false;// 添加和编辑 合伙人，机要信息的按钮
                this.addPartnerMsgPop = true;// 机要信息 pop


                this.titleAddPartner  = false;// title
                this.titleAddMsg      = false;// title
                this.titleEditPartner = false;//title
                this.titleEditMsg     = true;//title
                this.editPartnerMsg(obj);
            }

            if (type === 'edit') {
                // 编辑合伙人在 operatedBtnEdit()
            }
        },

        // 确认提交合作伙伴 有id 就相当于是编辑
        addPartner () {
            let params = {
                id:                 this.tempID,
                name:               this.pName,//合作伙伴名称
                businessProvince:   this.pBusinessProvince,//业务区域、省份
                businessIndustry:   this.pBusinessIndustry,//主要业务行业
                solution:           this.pSolution,//主要合作产品
                registeredCapital:  this.pRegisteredCapital,//注册资本
                type:               this.pType,//合作伙伴类型
                lastContractAmount: this.pLastContractAmount,//近期销售合同额
                companyCase:        this.pCompanyCase,    //公司案例
                synopsisOfPartners: this.pSynopsisOfPartners,    //合作伙伴简介
                remark:             this.pRemark,//备注
                isSignedCp:         this.pIsSignedCp,//是否是直签合作伙伴客户
            };

            console.log(params)
        },

        // 确认提交机要信息 有id 就相当于是编辑
        addPartnerMsg () {
            let params = {
                id:             this.tempID,
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
            axios
                .get(PATH +'/cp/crm/addOrUpdateCustomerContact',  {params: params} )
                .then((datas)=>{
                    let data = datas.data;
                    if (data.code === 201) {
                        toastr.warning(data.msg)
                        return;
                    }

                    this.popUp('addPartnerMsgPop')
                    this.getPartnerMsgData()
                    if (this.tempID) {
                        toastr.success('机要信息添加成功')
                    }else{
                        toastr.success('机要信息编辑成功')
                    }

                });

        },

        // 编辑按钮只是渲染数据，只是编辑的提交有id
        editPartnerMsg (obj) {
            console.log(obj)
            this.addPartnerMsgPop = true;
            this.getRegion(obj.regionCode)
            this.getProvince(obj.regionCode, obj.provinceCode)

            this.mRegionCode    = obj.regionCode;
            this.mProvinceCode  = obj.provinceCode;
            this.mContact       = obj.contactName;
            this.mDepartment    = obj.department;
            this.mTitle         = obj.title;
            this.mPhone         = obj.phone;
            this.mTelphone1     = obj.telphone1;
            this.mTelphone2     = obj.telphone2;
            this.mTelphone3     = obj.telphone3;
            this.mEmail         = obj.email;
            this.mMark          = obj.remark;
            this.mAddress       = obj.address;
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

        // 合作伙伴的区域和省份
        regionProvinceBtn () {
            this.regionProvinceIsShow = !this.regionProvinceIsShow;
            for (key in this.regionProvinceItem) {
                this.regionProvinceItem[key].forEach(item => {
                    if (this.pBusinessProvince.indexOf(item) === -1) {
                        this.pBusinessProvince.push(item)
                    }

                })
            }
            console.log(this.pBusinessProvince)

        },
        
        // 多选框
        checkboxBtn (attr, type) {
            //console.log(type, attr)

            let list = [];
            this.regionProvinceItem[type] = attr;
            for (key in this.regionProvinceItem) {
                this.regionProvinceItem[key].forEach(item => {
                    if (this.pBusinessProvince.indexOf(item) === -1) {
                        this.pBusinessProvince.push(item)
                    }else{
                        let index = this.pBusinessProvince.indexOf(item);
                        this.pBusinessProvince.splice(index, 1);
                    }
                })
            }// 整理item, 放进list


            this.pBusinessProvince.forEach(item => {
                list.push(item.text)
            });

            this.regionProvinceText = list.join('，');
            // for (key in this.regionProvinceItem){
            //     this.regionProvinceItem[key].forEach(item => {
            //         list.push(item.text)
            //     })
            // }
            // this.regionProvinceText = list.join('，');


        },

        // 审批按钮事件
        operateBtn (index, id, type, item) {
            console.log(index, id, type, item)
            if (type === 'edit') this.operateBtnEdit(id, item);// 编辑合伙人

        },

        // 编辑合伙人
        operateBtnEdit (id, item) {
            this.addAndEdit       = true;// 添加和编辑 合伙人，机要信息的弹窗
            this.addPartnerPop    = true;
            this.submitBtnIsShow  = true;// 添加和编辑 合伙人，机要信息的按钮
            this.addPartnerMsgPop = false;// 机要信息 pop
            this.titleAddPartner  = false;// title
            this.titleAddMsg      = false;// title
            this.titleEditPartner = true;//title
            this.titleEditMsg     = false;//title
            this.getPartnerType()// 合伙人类型
            this.getIndustry()// 行业
            this.getSolution()// 合作产品


            let partnerTypeCheckedItem = {
                code: item.typeCode,
                text: item.type,
            };
            this.partnerTypeCheckedList.push(partnerTypeCheckedItem);

        },

        // 直签
        isSignedCp (flag) {
            this.pIsSignedCp = flag;
        },















        // 最近三年的年份设置
        setRecentYears () {
            let year = Number(this.currentDate.substring(0,4));
            this.pLastContractAmount[0].year = year +'年';
            this.pLastContractAmount[1].year = year-1 +'年';
            this.pLastContractAmount[2].year = year-2 +'年';

        },



        select (event) {
            console.log(event)
        },

        select2 (event) {
            console.log(event)
        }
    },

});

