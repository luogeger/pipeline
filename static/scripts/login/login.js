var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            loginPassWord: '',            // input密码
            loginList: {                  // 登录提交的对象
                loginAccount: '',
                loginPass: ''
            },
            msg: '',                      // 错误提示
            PATH: 'http://172.16.8.130:8080/iboss-prism',
            // PATH: '/iboss-prism',
            keyStr: "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
            + "wxyz0123456789+/" + "=",   // 加密
            splitData: '',                // 拼接日期
            finishData: '',               // 拼接完成后字符串
        }
    },
    methods: {
        // 获取日期
        split: function() {
            $.ajax({
                async: false,
                url: this.PATH + '/basic/selectNow',
                type: 'get',
                dateType: 'json',
                success: function(result) {
                    console.log(result.msg);

                    var date = result.msg.substring(0,10).split('-');
                    vm.splitData = date.join('');

                    console.log(vm.splitData,'date');
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
        // 登陆
        submitHandle: function() {
            this.split();

            if(vm.loginPassWord != '') {
                this.finishData = vm.loginPassWord + '#3#3#@3' + this.splitData; // 拼接字符串
                var password = this.encode64(this.finishData); // 对数据加密
                vm.loginList.loginPass = password;
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
                    // location.pathname = '../../pipeline/pages/home.html'
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