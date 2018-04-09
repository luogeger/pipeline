$.ajaxSettings.async = false;// 同步请求
var PATH = 'http://172.16.8.130:8080/iboss-prism';
var timeYear,
    userName,
    userCode,
    userAvatar;
$.getJSON(PATH +'/oauth/queryUserInfo', function (datas) {
    var msg = datas.msg;
    timeYear = (msg.currentDate).substring(0, 10);
    userName = msg.userName;
    userCode = msg.userCode;
    userAvatar = msg.avatar;
    $('.user>img').attr('src', userAvatar)
    $('.user .user-name').text(userName)
});

var data = {
    "code": 200,
    "msg": [
        {
            "children": null,
            "data": {
                "createTime": "2017-3-14",
                "dataUrl": "manage/manage.html",
                "id": 1,
                "menuClass": "fa fa-briefcase",
                "menuCode": "pipelineMng",
                "menuName": "Pipeline管理",
                "menuType": "1",
                "parentMenuCode": "0"
            },
            "id": "pipelineMng",
            "leaf": true,
            "parentId": "0",
            "text": "Pipeline管理"
        },
        {
            "children": null,
            "data": {
                "createTime": "2017-3-14",
                "dataUrl": "client/client.html",
                "id": 1,
                "menuClass": "fa fa-user-circle-o",
                "menuCode": "pipelineMng",
                "menuType": "1",
                "parentMenuCode": "0"
            },
            "id": "pipelineMng",
            "leaf": true,
            "parentId": "0",
            "text": "客户管理",
        },
        {
            "children": [
                {
                    "children": null,
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "analyze/one.html",
                        "id": 6,
                        "menuClass": "none",
                        "menuCode": "expectSignSumReport",
                        "menuName": "签约额统计汇总",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "expectSignSumReport",
                    "leaf": true,
                    "parentId": "pipelineAnalysis",
                    "text": "签约额统计汇总"
                },
                {
                    "children": null,
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "analyze/two.html",
                        "id": 6,
                        "menuClass": "none",
                        "menuCode": "expectSignSumReport",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "expectSignSumReport",
                    "leaf": true,
                    "parentId": "pipelineAnalysis",
                    "text": "加权平均额  周期对比"
                },
                {
                    "children": null,
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "analyze/three.html",
                        "id": 6,
                        "menuClass": "none",
                        "menuCode": "expectSignSumReport",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "expectSignSumReport",
                    "leaf": true,
                    "parentId": "pipelineAnalysis",
                    "text": "加权平均额    解决方案"
                },
                {
                    "children": null,
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "analyze/four.html",
                        "id": 6,
                        "menuClass": "none",
                        "menuCode": "expectSignSumReport",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "expectSignSumReport",
                    "leaf": true,
                    "parentId": "pipelineAnalysis",
                    "text": "销售合同额完成情况"
                },
                {
                    "children": [
                        {
                            "children": null,
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/regionAnalysis",
                                "id": 4,
                                "menuClass": "none",
                                "menuCode": "regionAnalysis",
                                "menuType": "1",
                                "parentMenuCode": "halfAnalysis"
                            },
                            "id": "regionAnalysis",
                            "leaf": true,
                            "parentId": "halfAnalysis",
                            "text": "签约额统计汇总"
                        },
                        {
                            "children": null,
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/soSolutionAnalysis",
                                "id": 5,
                                "menuClass": "none",
                                "menuCode": "soSolutionAnalysis",
                                "menuType": "1",
                                "parentMenuCode": "halfAnalysis"
                            },
                            "id": "soSolutionAnalysis",
                            "leaf": true,
                            "parentId": "halfAnalysis",
                            "text": "解决方案签约分析"
                        }
                    ],
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "/halfAnalysis",
                        "id": 3,
                        "menuClass": "none",
                        "menuCode": "halfAnalysis",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "halfAnalysis",
                    "leaf": false,
                    "parentId": "pipelineAnalysis",
                    "text": "测试----------"
                },
            ],
            "data": {
                "createTime": "2017-3-14",
                "dataUrl": "/pipelineAnalysis",
                "id": 2,
                "menuClass": "fa fa-dashboard",
                "menuCode": "pipelineAnalysis",
                "menuName": "Pipeline分析",
                "menuType": "1",
                "parentMenuCode": "0"
            },
            "id": "pipelineAnalysis",
            "leaf": false,
            "parentId": "0",
            "text": "Pipeline分析"
        },
    ],
    "success": true
};

$('.nav-top-panels').iTopNav(data.msg);



// user
$('.user-info').click(function (e) {
    e.stopPropagation();
    $(this).children('ul').removeClass('hide');
});

$('.user-info li').each(function (index, item) {
    $(item).click(function (e) {
        e.stopPropagation();
        console.log(23432)
        $('.user-info').children('ul').addClass('hide');
    })
});

$(document).click(function () {
    $('.user-info').children('ul').addClass('hide');
});

// 退出登录
$('.sign-out').click(function () {
    $.getJSON(PATH +'/oauth/logout', function (datas) {
        console.log(datas);
        window.location.href = 'login/login.html';
    })
})


loadMainPage('.content-item', 'manage/manage.html');
// loadMainPage('.content-item', 'client/client.html');