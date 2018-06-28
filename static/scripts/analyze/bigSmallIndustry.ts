var vm = new Vue({
    el: '#app',

    data () {
        return {
            data:           {},
            allGroup:       saleGroupList,

            department:     {code: '', text: '全部'},
            signedStartDate:'',
            signedEndDate:  '',

        }
    },

    created () {

    },

    mounted () {
        this.getData()
        this.renderDate()
    },

    methods: {
        getData (callback, obj) {
            let params = {
                type: 'bs',
                department: this.department.text,
                signedStartDate: this.signedStartDate,
                signedEndDat: this.signedEndDat,
            };
            params = Object.assign(params, obj);
            axios
                .get(PATH +'/currency/midYear', {params: params})
                .then(datas => {
                    this.data = datas.data;
                    console.log(this.data.msg)
                    if (callback) callback();
                });
        },

        query () {
            this.getData()
        },

        // 绑定日期插件事件
        renderDate () {
            laydate.render({
                elem: '#dateOne', //指定元素
                type: 'month',
                range: true,
                value: this.dateOneClose,
                done: val => {
                    this.signedStartDate = val.substring(0,7);
                    this.signedEndDate   = val.substring(val.length -7, val.length);
                }
            });
        },
    },// methods

});// end