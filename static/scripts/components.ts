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
        return {

        }
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
        verifyMsg: String,
        value: String
    },
    data () {
        return {
            _value: '',
            empty: false,
        }
    },// data

    created() {
        this._value = this.value;
    },

    methods:{
        input () {
            this.empty = !this._value
                || this._value.length === 0
                || this._value.trim().length === 0;
            this.$emit('input', this._value);
        },
    },// methods

    template:
        `<div class="input-group">
            <input v-model="_value"
                   @input="input"
                   @blur="input"
                   :class="{'has-error': empty}"
                   type="text" class="input-group-form">
            <span v-text="verifyMsg" 
                  v-if="empty"
                  class="input-verify-msg"></span>
        </div>`,

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
    data () {
        return {
            pageNum:    1
        }
    },// data


    computed:{
        pageTotal () {
            return this.total;
        },

        pageLimit () {
            return  this.limit;
        },

        pageSum () {
            return Math.ceil(this.pageTotal / this.pageLimit);
        },

        pageStart () {
            return this.pageNum *10 -9;
        },

        pageEnd () {
            return this.pageNum === this.pageSum ? this.pageTotal:this.pageNum * this.pageLimit;
        }
    },

    methods:{
        paging (type) {
            if(type === 1) this.next()
            if(type === -1) this.prev()
            if(type === 'last') this.last()
            if(type === 'first') this.first()

            this.$emit('on-paging', this.pageNum)
        },

        first () {
            this.pageNum = 1;
        },

        last () {
            this.pageNum = this.pageSum;
        },

        prev () {
            if (this.pageNum === 1) return;
            this.pageNum--
        },

        next () {
            if (this.pageNum === this.pageSum) return;
            this.pageNum ++
        },
    },// methods

    template:
        `<div class="client-page page-css">
            <div @click="paging('first')"
                 class="page-css-first"><i class="fa fa-angle-double-left"></i></div>
            <div @click="paging(-1)" class="page-css-prev" style="margin-right: 10px;"><i
                 class="fa fa-angle-left"></i></div>
            <span>第</span>
            <input @keyup.enter="paging('enter')" 
                   v-model="pageNum"
                   type="text" style="margin: 0 5px;"><span>页，</span>
            <span>共 {{pageSum}} 页，</span>
            <div @click="paging(1)"
                 class="page-css-next"><i class="fa fa-angle-right"></i></div>
            <div @click="paging('last')" 
                 class="page-css-last" style="margin-right: 10px;">
                 <i class="fa fa-angle-double-right"></i></div>
            <span>显示</span>
            <span style="margin-left: 5px;">{{pageStart}}</span>
            <span>-</span>
            <span style="margin-right: 5px;">{{pageEnd}}</span>
            <span>条，</span>
            <span>共&nbsp; {{pageTotal}} &nbsp;条</span>
        </div>`,
});