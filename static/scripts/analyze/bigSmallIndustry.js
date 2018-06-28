var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            data: {},
            allGroup: saleGroupList,
            department: { code: '', text: '全部' },
            signedStartDate: '',
            signedEndDate: '',
        };
    },
    created: function () {
    },
    mounted: function () {
        this.getData();
        this.renderDate();
    },
    methods: {
        getData: function (callback, obj) {
            var _this = this;
            var params = {
                type: 'bs',
                department: this.department.text,
                signedStartDate: this.signedStartDate,
                signedEndDat: this.signedEndDat,
            };
            params = Object.assign(params, obj);
            axios
                .get(PATH + '/currency/midYear', { params: params })
                .then(function (datas) {
                _this.data = datas.data;
                console.log(_this.data.msg);
                if (callback)
                    callback();
            });
        },
        query: function () {
            this.getData();
        },
        // 绑定日期插件事件
        renderDate: function () {
            var _this = this;
            laydate.render({
                elem: '#dateOne',
                type: 'month',
                range: true,
                value: this.dateOneClose,
                done: function (val) {
                    _this.signedStartDate = val.substring(0, 7);
                    _this.signedEndDate = val.substring(val.length - 7, val.length);
                }
            });
        },
    },
}); // end
