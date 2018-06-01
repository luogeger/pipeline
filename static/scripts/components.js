Vue.component('select-list', {
    props: {
        selections: {
            type: Array,
            default: [{
                    label: 'test',
                    value: 0
                }]
        }
    },
    data: function () {
        return {
            nowIndex: 0,
            isShow: false,
        };
    },
    mounted: function () {
        var _this = this;
        document.addEventListener('click', function (e) {
            if (!_this.$el.contains(e.target))
                _this.isShow = false;
        });
    },
    methods: {
        toggleShow: function () {
            this.isShow = !this.isShow;
            this.iconRotate = true; // 输入法
        },
        chooseShow: function (index) {
            this.isShow = false;
            this.nowIndex = index;
            this.$emit('on-change', this.selections[this.nowIndex]);
        }
    },
    template: "<div class=\"selection-component\">\n            <div class=\"selection-show\" \n                 :class=\"{'i-border-col i-border-shadow i-icon-col': isShow}\"\n                 @click=\"toggleShow\">\n                <span class=\"default-text\">{{selections[nowIndex].label}}</span>\n                <i class=\"fa fa-angle-down\"\n                   :class=\"{'rotate-180': isShow}\"></i>\n            </div>\n            <transition name=\"fade\">\n                <div class=\"selection-list\" v-if=\"isShow\">\n                    <ul>\n                        <li v-for=\"(item, index) in selections\" \n                            :class=\"{'i-active': index == nowIndex}\"\n                            @click=\"chooseShow(index)\">\n                        {{item.label}}</li>\n                    </ul>\n                </div>\n            </transition>    \n        </div>",
}); // select-list
Vue.component('pop-up', {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    data: function () {
    },
    mounted: function () {
    },
    methods: {
        closeSelf: function () {
            this.$emit('on-close');
        }
    },
    template: "<div v-if=\"isShow\" class=\"dialog-wrap\"><!--  -->\n            <div v-if=\"isShow\"  @click=\"closeSelf\" class=\"dialog-cover\"></div>\n            <transition name=\"drop\">\n                <div v-if=\"isShow\" class=\"dialog-content input-width-100\">\n                    <p @click=\"closeSelf\" class=\"close-dialog\" ><i class=\"fa fa-close\"></i></p>\n                    <slot>empty</slot>\n                </div>\n            </transition>\n        </div>",
});
Vue.component('i-input', {
    props: {
        verifyMsg: {
            type: String,
            default: '验证消息',
        }
    },
    data: function () {
        return {
            verifyMsgIsShow: false,
            inputValue: '',
        };
    },
    mounted: function () {
    },
    methods: {
        inputBlur: function () {
            if (this.checkSpace(this.inputValue) === 0) {
                this.verifyMsgIsShow = true;
            }
            else {
                this.verifyMsgIsShow = false;
            }
            this.$emit('on-blur', this.inputValue);
        },
        checkSpace: function (str) {
            while (str.lastIndexOf(" ") >= 0) {
                str = str.replace(" ", "");
            }
            if (str.length === 0) {
                return 0; // 为空
            }
            return 1; // 不为空
        } // 判断内容都为空
    },
    template: "<div class=\"input-group\">\n            <input @blur=\"inputBlur\"\n                   @keyup=\"inputBlur\"\n                   v-model=\"inputValue\"\n                   :class=\"{'has-error': verifyMsgIsShow}\"\n                   type=\"text\" class=\"input-group-form\">\n            <span v-text=\"verifyMsg\" \n                  v-if=\"verifyMsgIsShow\"\n                  class=\"input-verify-msg\"></span>\n        </div>",
});
