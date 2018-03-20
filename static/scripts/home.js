var data2 = {
    "code": 200,
    "msg": [
        {
            "children": [],
            "id": "1",
            "parentId": "0",
            "leaf": true,
            "text": "Pipeline管理",
            "data": {
                "menuCode": "pipelineMng",
                "dataUrl": "/pipelineMng",
                "menuType": "1",
                "menuClass": "none"
            }
        },
        {
        "id": "2",
        "parentId": "0",
        "leaf": false,
        "text": "Pipeline分析",
        "children": [
            {
            "id": "3",
            "parentId": "2",
            "leaf": false,
            "text": "年中(终)分析",
            "children": [{
                "id": "4",
                "parentId": "3",
                "leaf": true,
                "text": "区域分析",
                "children": null,
                "data": {
                    "menuCode": "regionAnalysis",
                    "dataUrl": "/regionAnalysis",
                    "menuType": "1",
                    "menuClass": "none"
                }
            }, {
                "id": "5",
                "parentId": "3",
                "leaf": true,
                "text": "解决方案签约分析",
                "children": null,
                "data": {
                    "menuCode": "soSolutionAnalysis",
                    "dataUrl": "/soSolutionAnalysis",
                    "menuType": "1",
                    "menuClass": "none"
                }
            }, {
                "id": "7",
                "parentId": "3",
                "leaf": true,
                "text": "行业分析",
                "children": null,
                "data": {
                    "menuCode": "hyAnalysis",
                    "dataUrl": "/a",
                    "menuType": "1",
                    "menuClass": "none"
                }
            }],
            "data": {
                "menuCode": "halfAnalysis",
                "dataUrl": "/halfAnalysis",
                "menuType": "1",
                "menuClass": "none"
            }
        },
            {
            "id": "6",
            "parentId": "2",
            "leaf": true,
            "text": "签约额统计汇总",
            "children": null,
            "data": {
                "menuCode": "expectSignSumReport",
                "dataUrl": "/expectSignSumReport",
                "menuType": "1",
                "menuClass": "none"
            }
        },
            {
            "id": "9",
            "parentId": "2",
            "leaf": true,
            "text": "加权平均额周期对比",
            "children": null,
            "data": {
                "menuCode": "jqpj",
                "dataUrl": "/c",
                "menuType": "1",
                "menuClass": "none"
            }
        },
            {
            "id": "10",
            "parentId": "2",
            "leaf": true,
            "text": "解决方案加权平均额情况",
            "children": null,
            "data": {
                "menuCode": "jjfa",
                "dataUrl": "/d",
                "menuType": "1",
                "menuClass": "none"
            }
        },
            {
            "id": "11",
            "parentId": "2",
            "leaf": true,
            "text": "销售合同额完成情况",
            "children": null,
            "data": {
                "menuCode": "xshte",
                "dataUrl": "/e",
                "menuType": "1",
                "menuClass": "none"
            }
        }
        ],
        "data": {
            "menuCode": "pipelineAnalysis",
            "dataUrl": "/pipelineAnalysis",
            "menuType": "1",
            "menuClass": "none"
        }
    },
        {
        "id": "12",
        "parentId": "0",
        "leaf": false,
        "text": "目标",
        "children": [{
            "id": "13",
            "parentId": "12",
            "leaf": true,
            "text": "公司目标额",
            "children": null,
            "data": {
                "menuCode": "gsmbe",
                "dataUrl": "/g",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "14",
            "parentId": "12",
            "leaf": true,
            "text": "个人目标额",
            "children": null,
            "data": {
                "menuCode": "grmbe",
                "dataUrl": "/g1",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "15",
            "parentId": "12",
            "leaf": true,
            "text": "解决方案目标额",
            "children": null,
            "data": {
                "menuCode": "jjfambe",
                "dataUrl": "g2",
                "menuType": "1",
                "menuClass": "none"
            }
        }],
        "data": {
            "menuCode": "mb",
            "dataUrl": "/f",
            "menuType": "1",
            "menuClass": "none"
        }
    },
        {
        "id": "16",
        "parentId": "0",
        "leaf": false,
        "text": "权限",
        "children": [{
            "id": "17",
            "parentId": "16",
            "leaf": true,
            "text": "用户",
            "children": null,
            "data": {
                "menuCode": "yh",
                "dataUrl": "yh",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "18",
            "parentId": "16",
            "leaf": true,
            "text": "角色",
            "children": null,
            "data": {
                "menuCode": "js",
                "dataUrl": "js",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "19",
            "parentId": "16",
            "leaf": true,
            "text": "资源",
            "children": null,
            "data": {
                "menuCode": "zy",
                "dataUrl": "zy",
                "menuType": "1",
                "menuClass": "none"
            }
        }],
        "data": {
            "menuCode": "qx",
            "dataUrl": "cd",
            "menuType": "1",
            "menuClass": "none"
        }
    },
        {
        "id": "21",
        "parentId": "0",
        "leaf": false,
        "text": "数据链接",
        "children": [{
            "id": "20",
            "parentId": "21",
            "leaf": true,
            "text": "查询解决方案",
            "children": null,
            "data": {
                "menuCode": "jiejuefangan",
                "dataUrl": "basic/querySoSolution4Tree",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "22",
            "parentId": "21",
            "leaf": true,
            "text": "查询DictData",
            "children": null,
            "data": {
                "menuCode": "dictDataData",
                "dataUrl": "basic/queryDictDataByCategory?categoryCodes=region",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "23",
            "parentId": "21",
            "leaf": true,
            "text": "查询DictCategory",
            "children": null,
            "data": {
                "menuCode": "dictCategory",
                "dataUrl": "basic/queryDictCategory",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "24",
            "parentId": "21",
            "leaf": true,
            "text": "查询菜单导航树",
            "children": null,
            "data": {
                "menuCode": "queryMenu4Nav",
                "dataUrl": "oauth/queryMenu4Nav",
                "menuType": "1",
                "menuClass": "none"
            }
        }, {
            "id": "25",
            "parentId": "21",
            "leaf": true,
            "text": "查询销售小组",
            "children": null,
            "data": {
                "menuCode": "selectSalesGroup4Dropdown",
                "dataUrl": "basic/selectSalesGroup4Dropdown",
                "menuType": "1",
                "menuClass": "none"
            }
        }],
        "data": {
            "menuCode": "data",
            "dataUrl": "aa",
            "menuType": "1",
            "menuClass": "none"
        }
    }],
        "success": true
}

var data = {
    "code": 200,
    "msg": [
        {
            "children": [],
            "data": {
                "createTime": "2017-3-14",
                "dataUrl": "/pipelineMng",
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
            "children": [
                {
                    "children": [
                        {
                            "children": [],
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/regionAnalysis",
                                "id": 4,
                                "menuClass": "none",
                                "menuCode": "regionAnalysis",
                                "menuName": "区域分析",
                                "menuType": "1",
                                "parentMenuCode": "halfAnalysis"
                            },
                            "id": "regionAnalysis",
                            "leaf": true,
                            "parentId": "halfAnalysis",
                            "text": "区域分析"
                        },
                        {
                            "children": [],
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/soSolutionAnalysis",
                                "id": 5,
                                "menuClass": "none",
                                "menuCode": "soSolutionAnalysis",
                                "menuName": "解决方案签约分析",
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
                        "menuName": "年中(终)分析",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "halfAnalysis",
                    "leaf": false,
                    "parentId": "pipelineAnalysis",
                    "text": "年中(终)分析"
                },
                {
                    "children": [],
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "/expectSignSumReport",
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
                }
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
        {
            "children": [
                {
                    "children": [],
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "/halfAnalysis",
                        "id": 3,
                        "menuClass": "none",
                        "menuCode": "halfAnalysis",
                        "menuName": "分析测试项目...",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "halfAnalysis",
                    "leaf": false,
                    "parentId": "pipelineAnalysis",
                    "text": "分析测试项目..."
                },
                {
                    "children": [
                        {
                            "children": [],
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/regionAnalysis",
                                "id": 4,
                                "menuClass": "none",
                                "menuCode": "regionAnalysis",
                                "menuName": "签约三级菜单。。。",
                                "menuType": "1",
                                "parentMenuCode": "halfAnalysis"
                            },
                            "id": "regionAnalysis",
                            "leaf": true,
                            "parentId": "halfAnalysis",
                            "text": "签约三级菜单。。。"
                        },
                        {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "children": [],
                                            "data": {
                                                "createTime": "2017-3-14",
                                                "dataUrl": "/regionAnalysis",
                                                "id": 4,
                                                "menuClass": "none",
                                                "menuCode": "regionAnalysis",
                                                "menuName": "区域分析",
                                                "menuType": "1",
                                                "parentMenuCode": "halfAnalysis"
                                            },
                                            "id": "regionAnalysis",
                                            "leaf": true,
                                            "parentId": "halfAnalysis",
                                            "text": "区域分析"
                                        },
                                        {
                                            "children": [],
                                            "data": {
                                                "createTime": "2017-3-14",
                                                "dataUrl": "/soSolutionAnalysis",
                                                "id": 5,
                                                "menuClass": "none",
                                                "menuCode": "soSolutionAnalysis",
                                                "menuName": "解决方案签约分析",
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
                                        "menuName": "年中(终)分析",
                                        "menuType": "1",
                                        "parentMenuCode": "pipelineAnalysis"
                                    },
                                    "id": "halfAnalysis",
                                    "leaf": false,
                                    "parentId": "pipelineAnalysis",
                                    "text": "年中(终)分析"
                                },
                                {
                                    "children": [],
                                    "data": {
                                        "createTime": "2017-3-14",
                                        "dataUrl": "/expectSignSumReport",
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
                                }
                            ],
                            "data": {
                                "createTime": "2017-3-14",
                                "dataUrl": "/soSolutionAnalysis",
                                "id": 5,
                                "menuClass": "none",
                                "menuCode": "soSolutionAnalysis",
                                "menuName": "签约三级菜单。。。",
                                "menuType": "1",
                                "parentMenuCode": "halfAnalysis"
                            },
                            "id": "soSolutionAnalysis",
                            "leaf": true,
                            "parentId": "halfAnalysis",
                            "text": "签约三级菜单。。。"
                        }
                    ],
                    "data": {
                        "createTime": "2017-3-14",
                        "dataUrl": "/expectSignSumReport",
                        "id": 6,
                        "menuClass": "none",
                        "menuCode": "expectSignSumReport",
                        "menuName": "签约测试项目...",
                        "menuType": "1",
                        "parentMenuCode": "pipelineAnalysis"
                    },
                    "id": "expectSignSumReport",
                    "leaf": true,
                    "parentId": "pipelineAnalysis",
                    "text": "签约测试项目..."
                }
            ],
            "data": {
                "createTime": "2017-3-14",
                "dataUrl": "/pipelineMng",
                "id": 1,
                "menuClass": "fa fa-user-circle-o",
                "menuCode": "pipelineMng",
                "menuName": "pipeline测试项",
                "menuType": "1",
                "parentMenuCode": "0"
            },
            "id": "pipelineMng",
            "leaf": true,
            "parentId": "0",
            "text": "pipeline测试项",
        },
    ],
    "success": true
};

$('.nav-top-panels').iTopNav(data.msg)