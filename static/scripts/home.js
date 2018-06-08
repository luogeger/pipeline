var PATH = 'http://172.16.8.130:8080';
// var PATH = '';// 测试环境，不需要 /
var timeYear,// 2018-04-18
    currentYear,
    currentMonth,
    currentDay,
    currentAccYear,// 精确到上半年还是下班年
    currentQuarter,// 当前季度
    szDate,// 上周
    sszDate,// 上上周
    // ====
    userName,// 用户名
    userCode,
    userAvatar,
    userGroup,// 用户所在事业部
    navData,// 导航数据
    userLevel,// 用户级别  xs  xsld  dqcyh
    saleGroupList,// 所有部门
    chartColor = ['#ED6D00', '#FFC732', '#C23531'];


axios.get(PATH +'/oauth/queryUserInfo').then(function (datas) {
    var data = datas.data, msg = data.msg;
    szDate          = (msg.szDate).substring(0, 10);// 上周
    sszDate         = (msg.sszDate).substring(0, 10);// 上上周
    timeYear        = (msg.currentDate).substring(0, 10);
    currentYear     = (msg.currentDate).substring(0, 4);
    currentMonth    = (msg.currentDate).substring(5, 7);
    currentDay      = (msg.currentDate).substring(8, 10);
    userName        = msg.userName;
    userCode        = msg.userCode;
    userAvatar      = msg.avatar;
    userLevel       = msg.level;
    userGroup       = msg.departmentName;
    saleGroupList   = msg.mngSalesGroups;
    saleGroupList.push({code: '', text: '全部'});
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


    axios.get(PATH +'/oauth/queryMenu4Nav').then(function (datas) {
        $('.nav-top-panels').iTopNav(datas.data.msg);
        loadMainPage('.content-item', 'manage/manage.html');
        // loadMainPage('.content-item', 'manage/partnerPipeline.html');
    })
})










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
    vm.selectionIsShow_1 = false;// 点击顶部下拉框隐藏
    vm.selectionIsShow_2 = false;// 点击顶部下拉框隐藏
});

// 退出登录
$('.sign-out').click(function () {
    $.getJSON(PATH +'/oauth/logout', function (datas) {
        console.log(datas);
        window.location.href = 'login/login.html';
    })
});
/*
 *   content-item 的自适应高度
 * */
function getContentSize() {
    var wh = document.documentElement.clientHeight;
    var eh = 60;
    ch = (wh - eh) + "px";
    document.getElementById( "contentItem" ).style.minHeight = ch;
}
window.onresize = getContentSize;
setInterval('getContentSize()',20);//自动刷新（每秒一次执行）


/*
 *   公用方法
 * */
function accAdd (arg1, arg2) {// 加法
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
};// 加法

function accSub (arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};// 减法

function accMul(arg1,arg2) {// 乘法
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
};// 除法

function checkSpace(str){// 判断内容都为空
    while(str.lastIndexOf(" ")>=0){
        str = str.replace(" ","");
    }
    if(str.length === 0){
        return 0;// 为空
    }
    return 1;// 不为空
}// 判断内容都为空

function arrSum (arr) {// 数组求和
    var s=0, i;
    for (i=arr.length-1; i>=0; i--) {
        if (typeof arr[i] === 'string') {
            arr[i] = arr[i].substring(0, arr[i].length -1);
            s = accAdd(s, arr[i]);
        } else{
            s = accAdd(s, arr[i]);
        }
    }
    if (typeof arr[0] === 'string') {
        return s + '%';
    }
    return s;
};// 数组求和

function scaleCalc(A, B) {// 增长率的计算
    if (B === 0) return '-';
    var div = Math.floor((A/B) *10000) / 10000;
    div = Number(div*100).toFixed(2);
    //if (div === '0.0') div = '0';
    div += "%";
    return div;
};// 百分比计算



