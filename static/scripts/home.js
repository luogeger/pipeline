// content-item 的自适应高度
function getContentSize() {
    var wh = document.documentElement.clientHeight;
    var eh = 60;
    ch = (wh - eh) + "px";
    document.getElementById( "contentItem" ).style.minHeight = ch;
}
window.onresize = getContentSize;
setInterval('getContentSize()',20);//自动刷新（每秒一次执行）

$.ajaxSettings.async = false;// 同步请求

// var PATH = 'http://172.16.8.130:8080/iboss-prism';
var PATH = '/iboss-prism';// 131
var timeYear,// 2018-04-18
    currentYear,
    currentMonth,
    currentDay,
    currentAccYear,// 精确到上半年还是下班年
    currentQuarter,// 当前季度
    // ====
    userName,
    userCode,
    userAvatar,
    userGroup,// 用户所在事业部
    navData,// 导航数据
    userLevel,// 用户级别  xs  xsld  dqcyh
    chartColor = ['#2F4554', '#61A0A8', '#C23531'];
$.getJSON(PATH +'/oauth/queryUserInfo', function (datas) {
    var msg         = datas.msg;
    timeYear        = (msg.currentDate).substring(0, 10);
    currentYear     = (msg.currentDate).substring(0, 4);
    currentMonth    = (msg.currentDate).substring(5, 7);
    currentDay      = (msg.currentDate).substring(8, 10);
    userName        = msg.userName;
    userCode        = msg.userCode;
    userAvatar      = msg.avatar;
    userLevel       = msg.level;
    userGroup       = msg.departmentName;
    currentAccYear  = function () {
        var half, arr = [[1,2,3,4,5,6],[7,8,9,10,11,12]];
        arr.forEach(function (p1, p2) {
            p1.forEach(function (p1) {
                if (Number(currentMonth) === p1) {
                    half = p2 +1;
                }
            })
        });
        return half;

    }();
    currentQuarter  = function () {
        var quarter, arr = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]];
        arr.forEach(function (p1, p2) {
            p1.forEach(function (p1) {
                if (Number(currentMonth) === p1) {
                    quarter = p2 +1;
                }
            })
        });
        return quarter;
    }();
    $('.user>img').attr('src', userAvatar)
    $('.user .user-name').text(userName)
    $('.user .user-group').text(userGroup)



    console.log(userLevel)
});

$.getJSON(PATH +'/oauth/queryMenu4Nav', function (datas) {
    navData = datas.msg;// 顶部导航数据
    $('.nav-top-panels').iTopNav(navData);
});



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


// loadMainPage('.content-item', 'manage/manage.html');
loadMainPage('.content-item', 'analyze/weightCycle.html');














































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

// 判断内容都为空
function checkSpace(str){
    while(str.lastIndexOf(" ")>=0){
        str = str.replace(" ","");
    }
    if(str.length === 0){
        return 0;// 为空
    }
    return 1;// 不为空
}