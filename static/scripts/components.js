Vue.component('select-list', {
    props: {
        dataList: {
            type: Array,
            default: [{
                    text: '',
                    code: ''
                }]
        },
        // checkedList: {
        //     type: Array
        // },
        value: '',
    },
    data: function () {
        return {
            nowIndex: 0,
            isShow: false,
            defaultText: '请选择 --',
        };
    },
    mounted: function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!_this.$el.contains(e.target))
                _this.isShow = false;
        });
    },
    created: function () {
        // 在watch
        this.defaultText = this.value.text;
    },
    watch: {
        dataList: function () {
            // if (this.checkedList && this.checkedList.length) {// 如果dataList没有数据，默认的文字是 defaultText
            //     this.dataList.forEach((item, index) => {
            //         if (item.text === this.checkedList[0].text ) {
            //             this.nowIndex = index;
            //             this.defaultText = this.dataList[this.nowIndex].text;
            //             this.$emit('input', this.dataList[this.nowIndex]);
            //             return;
            //         }
            //     })
            // }
        },
    },
    methods: {
        toggleShow: function () {
            this.isShow = !this.isShow;
            this.iconRotate = true; // 输入法
        },
        chooseShow: function (index) {
            this.isShow = false;
            this.nowIndex = index;
            this.defaultText = this.dataList[this.nowIndex].text;
            this.$emit('input', this.dataList[this.nowIndex]);
        },
    },
    template: "<div class=\"selection-component\">\n            <div class=\"selection-show\" \n                 :class=\"{'i-border-col i-border-shadow i-icon-col': isShow}\"\n                 @click=\"toggleShow\">\n                <span v-text=\"defaultText\"\n                      class=\"default-text\"></span>\n                <i class=\"fa fa-angle-down\"\n                   :class=\"{'rotate-180': isShow}\"></i>\n            </div>\n            <transition name=\"fade\">\n                <div class=\"selection-list\" v-if=\"isShow\">\n                    <ul>\n                        <li v-for=\"(item, index) in dataList\" \n                            v-text=\"item.text\"\n                            :class=\"{'i-active': index == nowIndex}\"\n                            @click=\"chooseShow(index)\"></li>\n                    </ul>\n                </div>\n            </transition>    \n        </div>",
}); // select-list
Vue.component('pop-up', {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String
        }
    },
    data: function () {
        return {};
    },
    mounted: function () {
    },
    methods: {
        closeSelf: function () {
            this.$emit('on-close');
        }
    },
    template: "<div v-if=\"isShow\" class=\"dialog-wrap\"><!--  -->\n            <div v-if=\"isShow\"  @click=\"closeSelf\" class=\"dialog-cover\"></div>\n            <transition name=\"drop\">\n                <div v-if=\"isShow\" class=\"dialog-content input-width-100\" :style=\"{ width: width }\">\n                    <p @click=\"closeSelf\" class=\"close-dialog\" ><i class=\"fa fa-close\"></i></p>\n                    <slot>empty</slot>\n                </div>\n            </transition>\n        </div>",
});
Vue.component('i-input', {
    props: {
        verifyMsg: String,
        value: String
    },
    data: function () {
        return {
            _value: '',
            empty: false,
        };
    },
    created: function () {
        this._value = this.value;
    },
    methods: {
        input: function () {
            this.empty = !this._value
                || this._value.length === 0
                || this._value.trim().length === 0;
            this.$emit('input', this._value);
        },
    },
    template: "<div class=\"input-group\">\n            <input v-model=\"_value\"\n                   @input=\"input\"\n                   @blur=\"input\"\n                   :class=\"{'has-error': empty}\"\n                   type=\"text\" class=\"input-group-form\">\n            <span v-text=\"verifyMsg\" \n                  v-if=\"empty\"\n                  class=\"input-verify-msg\"></span>\n        </div>",
});
Vue.component('i-page', {
    props: {
        total: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 10
        },
    },
    data: function () {
        return {
            pageNum: 1
        };
    },
    computed: {
        pageTotal: function () {
            return this.total;
        },
        pageLimit: function () {
            return this.limit;
        },
        pageSum: function () {
            return Math.ceil(this.pageTotal / this.pageLimit);
        },
        pageStart: function () {
            return this.pageNum * 10 - 9;
        },
        pageEnd: function () {
            return this.pageNum === this.pageSum ? this.pageTotal : this.pageNum * this.pageLimit;
        }
    },
    methods: {
        paging: function (type) {
            if (type === 1)
                this.next();
            if (type === -1)
                this.prev();
            if (type === 'last')
                this.last();
            if (type === 'first')
                this.first();
            this.$emit('on-paging', this.pageNum);
        },
        first: function () {
            this.pageNum = 1;
        },
        last: function () {
            this.pageNum = this.pageSum;
        },
        prev: function () {
            if (this.pageNum === 1)
                return;
            this.pageNum--;
        },
        next: function () {
            if (this.pageNum === this.pageSum)
                return;
            this.pageNum++;
        },
    },
    template: "<div class=\"client-page page-css\">\n            <div @click=\"paging('first')\"\n                 class=\"page-css-first\"><i class=\"fa fa-angle-double-left\"></i></div>\n            <div @click=\"paging(-1)\" class=\"page-css-prev\" style=\"margin-right: 10px;\"><i\n                 class=\"fa fa-angle-left\"></i></div>\n            <span>\u7B2C</span>\n            <input @keyup.enter=\"paging('enter')\" \n                   v-model=\"pageNum\"\n                   type=\"text\" style=\"margin: 0 5px;\"><span>\u9875\uFF0C</span>\n            <span>\u5171 {{pageSum}} \u9875\uFF0C</span>\n            <div @click=\"paging(1)\"\n                 class=\"page-css-next\"><i class=\"fa fa-angle-right\"></i></div>\n            <div @click=\"paging('last')\" \n                 class=\"page-css-last\" style=\"margin-right: 10px;\">\n                 <i class=\"fa fa-angle-double-right\"></i></div>\n            <span>\u663E\u793A</span>\n            <span style=\"margin-left: 5px;\">{{pageStart}}</span>\n            <span>-</span>\n            <span style=\"margin-right: 5px;\">{{pageEnd}}</span>\n            <span>\u6761\uFF0C</span>\n            <span>\u5171&nbsp; {{pageTotal}} &nbsp;\u6761</span>\n        </div>",
});
Vue.component('i-checkbox', {
    props: {
        dataList: {
            type: Array,
        },
        defaultList: {
            type: Array,
        }
    },
    data: function () {
        return {
            isShow: false,
            checkedList: [],
        };
    },
    created: function () {
        //if (this.defaultList) this.checkedList = this.defaultList;
        console.log(this.defaultList);
    },
    methods: {
        checkBtn: function (index) {
            if (this.checkedList.indexOf(index) === -1) {
                this.checkedList.push(index);
            }
            else {
                index = this.checkedList.indexOf(index);
                this.checkedList.splice(index, 1);
            }
            var emitList = [];
            for (var i = 0; i < this.checkedList.length; i++) {
                emitList.push(this.dataList[this.checkedList[i]]);
            }
            this.$emit('on-check', emitList); // 要传到父组件的是index对应的value,
        },
        isShowJudge: function (index) {
            return this.checkedList.indexOf(index) !== -1;
        }
    },
    template: "<div class=\"i-checkbox-group\">\n            <div v-for=\"(item, index) in dataList\"\n                 @click=\"checkBtn(index)\"\n                 :key=\"item.code\"\n                 class=\"i-checkbox-wrap\">\n                <span class=\"i-checkbox-box\">\n                    <i class=\"fa fa-square-o\"></i> \n                    <transition name=\"fade\">\n                        <i v-if=\"isShowJudge(index)\" class=\"is-show fa fa-check\"></i>\n                    </transition>\n                </span>\n                <span v-text=\"item.text\"></span>        \n            </div>\n        </div>",
});
Vue.component('multiple-list', {
    props: {
        dataList: {
            type: Array,
            default: [{
                    text: '',
                    value: 0
                }]
        },
        defaultList: {
            type: Array,
        },
        value: '',
    },
    data: function () {
        return {
            // nowIndex: 0,
            isShow: false,
            activeIsShow: false,
            checkedIndex: [],
            checkedText: '',
            checkedList: [],
        };
    },
    mounted: function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!_this.$el.contains(e.target))
                _this.isShow = false;
        });
    },
    created: function () {
    },
    watch: {
        dataList: function () {
            var _this = this;
            if (this.defaultList && this.defaultList.length) {
                this.defaultList.forEach(function (item) {
                    _this.dataList.forEach(function (_item, index) {
                        if (item.code === _item.code) {
                            _this.checkedIndex.push(index);
                            _this.checkedList.push(_this.dataList[index]);
                            _this.styleShow(index);
                        }
                    });
                });
                this.textShow();
                this.$emit('input', this.checkedList);
            }
        }
    },
    methods: {
        toggleShow: function () {
            this.isShow = !this.isShow;
        },
        chooseShow: function (index) {
            // this.isShow = false;
            if (this.checkedIndex.indexOf(index) === -1) {
                this.checkedIndex.push(index);
                this.checkedList.push(this.dataList[index]); //
            }
            else {
                this.checkedIndex.splice(this.checkedIndex.indexOf(index), 1); //
                var _index = this.checkedList.indexOf(this.dataList[index]);
                this.checkedList.splice(_index, 1);
            }
            this.$emit('input', this.checkedList);
            this.textShow();
        },
        textShow: function () {
            var text = [];
            this.checkedList.forEach(function (item) {
                text.push(item.text);
            });
            this.checkedText = text.join('，');
        },
        styleShow: function (index) {
            return this.checkedIndex.indexOf(index) !== -1;
        },
    },
    template: "<div class=\"selection-component\">\n            <div class=\"selection-show\" \n                 :class=\"{'i-border-col i-border-shadow i-icon-col': isShow}\"\n                 @click=\"toggleShow\">\n                <span v-text=\"checkedText\"\n                      class=\"default-text\"></span>\n                <i class=\"fa fa-angle-down\"\n                   :class=\"{'rotate-180': isShow}\"></i>\n            </div>\n            <transition name=\"fade\">\n                <div class=\"selection-list\" v-if=\"isShow\">\n                    <ul>\n                        <li v-for=\"(item, index) in dataList\" \n                            :class=\"{'i-text-col': styleShow(index)}\"\n                            :key=\"item.code\"\n                            @click=\"chooseShow(index)\">\n                            <span v-text=\"item.text\"></span>\n                            <transition name=\"fade\">\n                                <i v-if=\"styleShow(index)\" class=\"fa fa-check\"></i>\n                            </transition>   \n                        </li>\n                    </ul>\n                </div>\n            </transition>    \n        </div>",
});
