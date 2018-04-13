// content-item 的自适应高度
function getContentSize() {
    var wh = document.documentElement.clientHeight;
    var eh = 60;
    ch = (wh - eh) + "px";
    document.getElementById( "contentItem" ).style.minHeight = ch;
}
//window.onload = getContentSize;这个去掉
window.onresize = getContentSize;
setInterval('getContentSize()',20);//自动刷新（每秒一次执行）

$.ajaxSettings.async = false;// 同步请求
var PATH = 'http://172.16.8.130:8080/iboss-prism';
// var PATH = '/iboss-prism';// 131
var timeYear,
    userName,
    userCode,
    userAvatar,
    userGroup,
    userLevel;// 用户级别
$.getJSON(PATH +'/oauth/queryUserInfo', function (datas) {
    var msg = datas.msg;
    timeYear = (msg.currentDate).substring(0, 10);
    userName = msg.userName;
    userCode = msg.userCode;
    userAvatar = msg.avatar;
    userLevel = msg.level;
    userGroup = msg.departmentName;
    $('.user>img').attr('src', userAvatar)
    $('.user .user-name').text(userName)
    $('.user .user-group').text(userGroup)
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
$('.user-name').click(function (e) {
    e.stopPropagation();
    $(this).siblings('ul').removeClass('hide');
});

$('.user-info li').each(function (index, item) {
    $(item).click(function (e) {
        e.stopPropagation();
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

















function accAdd (arg1, arg2) {
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m

};

function accMul(arg1,arg2) {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
};