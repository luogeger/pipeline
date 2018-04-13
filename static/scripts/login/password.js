var vm = new Vue({
    el: '#app',
    data: function() {
        return {
            passwordList: {
                oldLoginPass: '',
                newLoginPass: ''
            },
            msg: '',
            newLoginPassAgain: ''
        }
    },
    methods: {
        submitHandle: function() {
            if(vm.passwordList.newLoginPass != vm.newLoginPassAgain){
                vm.msg = '两次密码不一致';
                return false;
            }
            $.ajax({
                url: PATH + '/oauth/updateLoginPass',
                type: 'get',
                data: this.passwordList,
                dataType: 'json',
                success: function(result){
                    // console.log(result)
                    if(result.code === 201) {
                        vm.msg = result.msg
                    }else {
                        toastr.success('修改密码成功');
                        location.pathname = '/iboss-prism/pages/login/login.html'
                    }
                },
                error: function(result){
                    console.log('修改密码 请求失败')
                }
            })
        },
        // 键盘回车登录
        keybordEnter: function() {
            var ikeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
            if (ikeyCode == 13){
                this.submitHandle();
            }
        },
    }
})