/**
 * Created by User on 2018/6/13.
 */

var vm = new Vue ({
    el: '#app',
    data: function() {
        return {
            dialogShow: true,
        }
    },
    methods: {
        // 关闭二级弹窗
        hideDialog: function() {
            this.dialogShow = true;
        },
    }
})