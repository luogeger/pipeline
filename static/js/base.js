var url = '../static/js/base/';
var files = [
    'first',
    'slimScroll',
    'xiaoi',
    // 上面3个顺序不要改变
    'calendar',
    'carousel',
    'checkbox',
    'dropdown',
    'navigate',
    'paging',
    'progress',
    'radio',
    'tab',
    'toastr',
    'tree-view',
    'tree-view-slim',
    'laydate',
    'topNav',





    // 最后一个
    'last'
];


+function loadJS (url, files) {
    var elements = [];
    files.forEach(function (p1, p2, p3) {
        var script = '' +
            '<script src="'+ url +p1 +'.js"></script>';
        elements.push(script)
    })
    $('body').append(elements.join(''));
}(url, files);

