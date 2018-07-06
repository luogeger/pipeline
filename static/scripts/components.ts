Vue.component('select-list', {
    props: {
        dataList: {
            type: Array,
            default: [{
                text: '',
            }]
        },
        checkedList: {
            type: Array
        },
        value: ''
    },// props

    data () {
        return {
            nowIndex: 0,
            isShow: false,
            defaultText: '请选择 --'
        }
    },// data

    mounted () {
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) this.isShow = false;
        })
    },

    created () {
        // 在watch
    },

    watch: {
        dataList () {
            //this.$emit('input', this.dataList[this.nowIndex].code);
            if (this.checkedList && this.checkedList.length) {
                this.dataList.forEach((item, index) => {
                    if (item.text === this.checkedList[0].text ) {
                        this.nowIndex = index;
                        this.defaultText = this.dataList[this.nowIndex].text;
                        this.$emit('input', this.dataList[this.nowIndex].code);
                        return;
                    }
                })
            }
        },
    },


    methods:{
        toggleShow () {
            this.isShow = !this.isShow;
            this.iconRotate = true;// 输入法
        },
        chooseShow (index) {
            this.isShow = false;
            this.nowIndex = index;
            this.defaultText = this.dataList[this.nowIndex].text;
            this.$emit('input', this.dataList[this.nowIndex].code);
        },

    },// methods

    template:
        `<div class="selection-component">
            <div class="selection-show" 
                 :class="{'i-border-col i-border-shadow i-icon-col': isShow}"
                 @click="toggleShow">
                <span v-text="defaultText"
                      class="default-text"></span>
                <i class="fa fa-angle-down"
                   :class="{'rotate-180': isShow}"></i>
            </div>
            <transition name="fade">
                <div class="selection-list" v-if="isShow">
                    <ul>
                        <li v-for="(item, index) in dataList" 
                            v-text="item.text"
                            :class="{'i-active': index == nowIndex}"
                            @click="chooseShow(index)"></li>
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

Vue.component('i-checkbox', {
    props: {
        dataList: {
            type: Array,
        },
        defaultList: {
            type: Array,
        }

    },
    data () {
        return {
            isShow: false,
            checkedList: [],
        }
    },// data

    created () {
        //if (this.defaultList) this.checkedList = this.defaultList;
        console.log(this.defaultList)

    },
    methods:{
        checkBtn (index) {
            if(this.checkedList.indexOf(index) === -1){ // 如果不在就把index添加到临时数组
                this.checkedList.push(index);
            } else{ // 如果在就把这index从临时数组删除
                index = this.checkedList.indexOf(index);
                this.checkedList.splice(index, 1);
            }

            let emitList = [];
            for(let i = 0; i < this.checkedList.length; i++){
                emitList.push(this.dataList[this.checkedList[i]]);
            }
            this.$emit('on-check', emitList); // 要传到父组件的是index对应的value,
        },

        isShowJudge (index) {
            return this.checkedList.indexOf(index) !== -1;
        }
    },

    template:
        `<div class="i-checkbox-group">
            <div v-for="(item, index) in dataList"
                 @click="checkBtn(index)"
                 :key="item.code"
                 class="i-checkbox-wrap">
                <span class="i-checkbox-box">
                    <i class="fa fa-square-o"></i> 
                    <transition name="fade">
                        <i v-if="isShowJudge(index)" class="is-show fa fa-check"></i>
                    </transition>
                </span>
                <span v-text="item.text"></span>        
            </div>
        </div>`,

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
    },// props

    data () {
        return {
            // nowIndex: 0,
            isShow: false,
            activeIsShow: false,
            checkedIndex: [],
            checkedText:  '',
            checkedList: [],
        }
    },// data

    mounted () {
        document.addEventListener('click', e => {
            if (!this.$el.contains(e.target)) this.isShow = false;
        })
    },

    created () {
    },

    watch: {
        dataList () {
            // console.log('data,', this.dataList)
            // console.log('default', this.defaultList)
            if (this.defaultList && this.defaultList.length) {
                this.defaultList.forEach(item => {
                    this.dataList.forEach((_item, index) => {
                        if (item.code === _item.code) {
                            this.checkedIndex.push(index);
                            this.checkedList.push(this.dataList[index]);
                            this.styleShow(index)
                        }
                    })
                });
                this.textShow()
                this.$emit('input', this.checkedList);
                // console.log('checkedIndex,', this.checkedIndex)
                // console.log('checkedList,', this.checkedList)
            }

        }
    },


    methods:{
        toggleShow () {
            this.isShow = !this.isShow;
        },
        chooseShow (index) {
            // console.log('index,', index)
            // console.log('checkedIndex,', this.checkedIndex)
            // console.log('checkedList,', this.checkedList)
            this.isShow = false;

            if(this.checkedIndex.indexOf(index) === -1){ // 如果不在就把index添加到临时数组
                this.checkedIndex.push(index);
                this.checkedList.push(this.dataList[index])//
            } else{ // 如果在就把这index从临时数组删除
                this.checkedIndex.splice(this.checkedIndex.indexOf(index), 1);//
                let _index = this.checkedList.indexOf(this.dataList[index]);
                this.checkedList.splice(_index, 1)
            }
            console.log('checkedList,', this.checkedList)
            this.$emit('input', this.checkedList);
            this.textShow()

            console.log('checkedList,', this.checkedList)
        },

        textShow () {
            let text = [];
            this.checkedList.forEach(item => {
                text.push(item.text);
            });
            this.checkedText = text.join('，');
        },

        styleShow (index) {
            return this.checkedIndex.indexOf(index) !== -1
        },
    },// methods

    template:
        `<div class="selection-component">
            <div class="selection-show" 
                 :class="{'i-border-col i-border-shadow i-icon-col': isShow}"
                 @click="toggleShow">
                <span v-text="checkedText"
                      class="default-text"></span>
                <i class="fa fa-angle-down"
                   :class="{'rotate-180': isShow}"></i>
            </div>
            <transition name="fade">
                <div class="selection-list" v-if="isShow">
                    <ul>
                        <li v-for="(item, index) in dataList" 
                            :class="{'i-text-col': styleShow(index)}"
                            :key="item.code"
                            @click="chooseShow(index)">
                            <span v-text="item.text"></span>
                            <transition name="fade">
                                <i v-if="styleShow(index)" class="fa fa-check"></i>
                            </transition>   
                        </li>
                    </ul>
                </div>
            </transition>    
        </div>`,
});