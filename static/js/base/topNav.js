// 头部导航
//  ==================================================
+function($, window) {
    var TopNav = function (self, opt) {
        this.element = self;
        this.init(opt);
    };

    TopNav.prototype = {
        constructor: TopNav,

        init: function (opt) {
            this.render(opt);
            this.elements(opt);
            this.bind(opt);
        },// init

        render: function (opt) {
            var click = 'onclick=\"loadPage(\'.content-item\', \'url\')\"';
            var html = '';
            opt.forEach(function (item, index) {// 遍历一级菜单
                if (index === 0) {
                    html += '<div class="panel i-border-col">';
                    if (!Boolean(item.children)) {// 没有子菜单可以点击
                        html += '<div class="panel-title i-text-col" onclick=\"loadMainPage(\'.content-item\', \''+item.data.dataUrl +'\')\">';
                    } else{
                        html += '<div class="panel-title i-text-col">';
                    }
                }else {
                    html += '<div class="panel">';
                    if (!Boolean(item.children)) {// 没有子菜单可以点击
                        html += '<div class="panel-title" onclick=\"loadMainPage(\'.content-item\', \''+item.data.dataUrl +'\')\">';
                    } else {
                        html += '<div class="panel-title">';
                    }

                }
                html += '<i class=" '+item.data.menuClass+' "></i>';
                html += '<span>'+ item.text +'</span>';
                if (Boolean(item.children)) {
                    html += '<i class="fa fa-angle-down"></i>';
                    html += '</div>';
                    html += '<ul>';
                    item.children.forEach(function (item) {// 遍历二级菜单
                        if (Boolean(item.children)) {// 如果二级菜单有子菜单
                            html += '<li data-flag="true"><div><span>'+ item.text +'</span><i class="fa fa-angle-right"></i></div><ul>';
                            item.children.forEach(function (item) {// 遍历三级菜单
                                html += '<li onclick=\"loadMainPage(\'.content-item\', \''+item.data.dataUrl +'\')\"><div><span>'+ item.text +'</span></div></li>';
                            })
                            html += '</ul></li>';
                        }
                        else{
                            html += '<li onclick=\"loadMainPage(\'.content-item\', \''+item.data.dataUrl +'\')\"><div><span>'+ item.text +"</span></div></li>";
                        }

                    })
                    html += '</ul>';
                } else{
                    html += '</div>';
                }
                html += '</div>';

            })

            this.element.html(html)
            return html;
        },// render

        elements: function (opt) {
            var _this = $(this.element);
            this.$panels     = _this.children('.panel');
            this.$title      = _this.find('.panel-title');
            this.$ul         = _this.find('ul');
            this.$li         = _this.find('li');

        },// elementsb

        bind: function () {
            var self = this;

            this.$panels.each(function (index, item) {
                var _item = $(item);

                _item.click(function () {

                });// click

                _item.mouseenter(function () {
                    $(this).children('ul').fadeIn()
                });// enter

                _item.mouseleave(function () {
                    $(this).children('ul').hide()
                });// leave
            })// $title

            this.$li.each(function (index, item) {
                var _item = $(item);

                _item.mouseenter(function () {
                    $(this).children('ul').fadeIn()
                })// enter

                _item.mouseleave(function () {
                    $(this).children('ul').hide()
                })// leave

                _item.click(function () {
                    if (_item.attr('data-flag') === 'true') {return};// 如果有三级菜单，
                    $(this).parents('.panel').siblings('.panel').each(function (inx, itm) {
                        $(itm).removeClass('i-border-col').children('.panel-title').removeClass('i-text-col')
                    })
                    $(this).parents('.panel').addClass('i-border-col').children('.panel-title').addClass('i-text-col')
                })
            });// $li

            this.$title.each(function (index, item) {
                var _item = $(item);
                _item.click(function () {
                    $(this).parent('.panel').siblings('.panel').each(function (inx, itm) {
                        $(itm).removeClass('i-border-col').children('.panel-title').removeClass('i-text-col')
                    })

                    $(this).parent('.panel').addClass('i-border-col').children('.panel-title').addClass('i-text-col')
                });
            })
        },// bind

        event: function () {

        },// event

    };// prototype

    $.fn.iTopNav = function (opt) {
      return new TopNav(this, opt)
    };
}($, window);






