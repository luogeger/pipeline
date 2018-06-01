Vue.component('select-list', {
    props: {
        selections: {
            type: Array,
            default: [{
                label: 'test',
                value: 0
            }]
        }
    },// props

    data () {
        return {
            nowIndex: 0,
            isShow: false,
        }
    },// data

    mounted () {
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) this.isShow = false;
        })
    },

    methods:{
        toggleShow () {
            this.isShow = !this.isShow;
            this.iconRotate = true;// 输入法
        },
        chooseShow (index) {
            this.isShow = false;
            this.nowIndex = index;
            this.$emit('on-change', this.selections[this.nowIndex]);
        }
    },// methods

    template:
        `<div class="selection-component">
            <div class="selection-show" 
                 :class="{'i-border-col i-border-shadow i-icon-col': isShow}"
                 @click="toggleShow">
                <span class="default-text">{{selections[nowIndex].label}}</span>
                <i class="fa fa-angle-down"
                   :class="{'rotate-180': isShow}"></i>
            </div>
            <transition name="fade">
                <div class="selection-list" v-if="isShow">
                    <ul>
                        <li v-for="(item, index) in selections" 
                            :class="{'i-active': index == nowIndex}"
                            @click="chooseShow(index)">
                        {{item.label}}</li>
                    </ul>
                </div>
            </transition>    
        </div>`,
});// select-list

Vue.component('pop-up', {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },

    data () {

    },

    mounted () {

    },
    methods: {
        closeSelf () {
            this.$emit('on-close');
        }
    },

    template:
        `<div v-if="isShow" class="dialog-wrap"><!--  -->
            <div v-if="isShow"  @click="closeSelf" class="dialog-cover"></div>
            <transition name="drop">
                <div v-if="isShow" class="dialog-content input-width-100">
                    <p @click="closeSelf" class="close-dialog" ><i class="fa fa-close"></i></p>
                    <slot>empty</slot>
                </div>
            </transition>
        </div>`,

});

Vue.component('i-input', {
    props: {
        verifyMsg: {
            type: String,
            default: '验证消息',
        }
    },
    data () {
        return {
            verifyMsgIsShow: false,
            inputValue: '',
        }
    },// data

    mounted () {
    },

    methods:{
        inputBlur () {
            if (this.checkSpace(this.inputValue) === 0){
                this.verifyMsgIsShow = true;
            } else {
                this.verifyMsgIsShow = false;
            }

            this.$emit('on-blur', this.inputValue);
        },

        checkSpace (str) {// 判断内容都为空
            while(str.lastIndexOf(" ")>=0){
                str = str.replace(" ","");
            }
            if(str.length === 0){
                return 0;// 为空
            }
            return 1;// 不为空
        }// 判断内容都为空
    },// methods

    template:
        `<div class="input-group">
            <input @blur="inputBlur"
                   @keyup="inputBlur"
                   v-model="inputValue"
                   :class="{'has-error': verifyMsgIsShow}"
                   type="text" class="input-group-form">
            <span v-text="verifyMsg" 
                  v-if="verifyMsgIsShow"
                  class="input-verify-msg"></span>
        </div>`,

});