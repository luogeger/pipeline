var timeYear = '2018-01-02';
var PATH = 'http://172.16.8.34:8089/iboss-prism';
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

loadMainPage('.content-item', 'manage/manage.html');
loadMainPage('.content-item', 'client/client.html');
