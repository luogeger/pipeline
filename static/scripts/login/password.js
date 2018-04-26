var vm = new Vue({
    el: '#app',
    data: function() {
        return {
            passwordList: {
                oldLoginPass: '',
                newLoginPass: ''
            },
            msg: '',
            newLoginPassAgain: '',
            keyStr: "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
            + "wxyz0123456789+/" + "=",
        }
    },
    methods: {
        // base64加密开始
        encode64: function(input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2)
                    + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },
        // base64加密结束
        submitHandle: function() {
            var oldPassword = this.encode64(vm.passwordList.oldLoginPass); // 对数据加密
            var newPassword = this.encode64(vm.passwordList.newPassword); // 对数据加密
            /*console.log(oldPassword,'password');
            console.log(newPassword,'password');*/
            vm.passwordList.oldLoginPass = oldPassword;
            vm.passwordList.newPassword = newPassword;
            if(vm.passwordList.oldLoginPass == 'AA==') {
                delete vm.passwordList.oldLoginPass;
            }
            else if(vm.passwordList.newLoginPass == 'AA==') {
                delete vm.passwordList.newLoginPass;
            }
            else if(vm.passwordList.newLoginPass != vm.newLoginPassAgain){
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
                        location.pathname = '/iboss-prism/pipeline/pages/login/login.html'
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