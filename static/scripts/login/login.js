var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            loginList: {},
            msg: '',
            PATH: 'http://172.16.8.130:8080/iboss-prism',
            // PATH: '/iboss-prism',
        }
    },
    methods: {
        // 登陆
        submitHandle: function() {
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