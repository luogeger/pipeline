var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            loginList: {
                loginAccount: '',
                loginPass: ''
            },
            msg: '',
            PATH: 'http://172.16.8.130:8080/iboss-prism',
            // PATH: '/iboss-prism',
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
        // 登陆
        submitHandle: function() {
            var password = this.encode64(vm.loginList.loginPass); // 对数据加密
            // var password = this.encode64($("#passwordLogin").val()); // 对数据加密
            console.log(password,'password');
            vm.loginList.loginPass = password;
            if(vm.loginList.loginPass == 'AA==') {
                delete vm.loginList.loginPass;
            }
            var _this = this;
            $.ajax({
                url: _this.PATH + '/oauth/login',
                type: 'get',
                data: this.loginList,
                dataType: 'json',
                success: function(result){
                    console.log(result)
                    if (result.code === 201) {
                        vm.msg = result.msg
                        return;
                    }
                    location.pathname = '/iboss-prism/pages/home.html'
                },
                error: function(result){
                    console.log('登陆 请求失败')
                }
            })
        },
        // 键盘回车登录
        keybordEnter: function() {
            var ikeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
            if (ikeyCode == 13){
                this.submitHandle()
            }
        }
    }
})