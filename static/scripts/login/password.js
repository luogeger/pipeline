var vm = new Vue({
    el: '#app',
    data: function() {
        return {
            oldLoginPassWord: '',          // input旧密码
            newLoginPassWord: '',          // input新密码
            passwordList: {                // 提交的对象
                oldLoginPass: '',
                newLoginPass: ''
            },
            msg: '',                       // 错误提示
            newLoginPassAgain: '',
            keyStr: "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
            + "wxyz0123456789+/" + "=",    // 加密
            splitData: '',                 // 拼接日期
            finishOldData: '',             // 拼接完成后旧密码字符串
            finishNewData: '',             // 拼接完成后新密码字符串
        }
    },
    methods: {
        // 获取日期
        split: function() {
            $.ajax({
                async: false,
                url: PATH + '/basic/selectNow',
                type: 'get',
                dateType: 'json',
                success: function(result) {
                    var date = result.msg.substring(0,10).split('-');
                    vm.splitData = date.join('');
                },
                error: function(result) {
                    console.log('请求失败');
                }
            })
        },
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
        submitHandle: function() {
            this.split();

            if(vm.newLoginPassWord != vm.newLoginPassAgain){
                vm.msg = '两次密码不一致';
                return false;
            }
            if(vm.oldLoginPassWord != '') {
                this.finishOldData = vm.oldLoginPassWord + '#3#3#@3' + this.splitData; // 拼接字符串

                var oldPassword = this.encode64(this.finishOldData); // 对数据加密
                vm.passwordList.oldLoginPass = oldPassword;
            }
            if(vm.newLoginPassWord != '') {
                this.finishNewData = vm.newLoginPassWord + '#3#3#@3' + this.splitData; // 拼接字符串

                var newPassword = this.encode64(this.finishNewData); // 对数据加密
                vm.passwordList.newLoginPass = newPassword;
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