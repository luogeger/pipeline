//  下拉框
//  ==================================================
+function () {
    var speed = 300;
    function paiTa (){
        $('.dropdown-zTree').each(function (index, item){
            $(item).children('ul').slideUp(speed)
            $(item).children('i').css({'transform':'rotate(0deg)'})
            $(item).removeClass('dropdown-shadow flag-open')
        })
    };

    $('body').on('click', '.dropdown-zTree', function (e){
        e.stopPropagation();
        var _this = $(this);
        var _ul = _this.children('ul');
        var _i = _this.children('i');
        var _li = _this.find('li');

        _this.children('ul').slideDown(speed)
        _this.children('i').css({'transform': 'rotate(180deg)'})
        _this.addClass('dropdown-shadow flag-open')

        _li.each(function() {
            $(this).click(function(e) {
                if($(this).hasClass('level0')) {
                }else {
                    _this.children('ul').slideUp(speed)
                    _this.children('i').css({'transform': 'rotate(0deg)'})
                    _this.removeClass('dropdown-shadow flag-open')
                }
            })
        })
    })
    $(document).click(function (){
        paiTa ()
    })
}();
