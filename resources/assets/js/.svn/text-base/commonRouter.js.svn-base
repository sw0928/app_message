 import commonbase from './commonBase';
 import commoninterface from './interface';
 
 export default commonbase.config(['$stateProvider', function($stateProvider) {
    let baseUrl = '../../resources/views';
	/* $stateProvider.state('searcharticle', {
		url: '/articlelist',
		controller: 'searchArticleCtrl',
		templateUrl: '../../admin/adminpages/content.articlelist',
		data: {
			pageTitle: '搜索文章'
		},
		resolve: {
			channelList: ['bangInterface', 'Persist', function (bangInterface, Persist) {
				if (Persist.channels) {
					return Persist.channelList;
				} else {
					return bangInterface.listChannels().$promise.then(function (response) {
						if (response.result === true) {
							Persist.channels = response.data;
							Persist.setChannels(response.data);
							return Persist.channelList;
						} else {
							return null;
						}
					});
				}
			}]			
		}
	}); */
	//数据中心
     $stateProvider.state('datacenter',{
		url: 'datacenter',
		controller:'datacenter',
		templateUrl: `${baseUrl}/datacenter.html`,	
		data: {
			pageTitle: '数据中心'
		},
        resolve: {
           
        }
    });
  //短信群发
	$stateProvider.state('saveorder',{
		url: '/saveorder',
		controller:'saveorder',
		templateUrl: `${baseUrl}/submitorder.html`,	
		data: {
			pageTitle: '短信群发'
		},
        resolve: {
           
        }
    });
  //动态发送
	$stateProvider.state('dynamic',{
		url: '/dynamic',
		controller:'dynamic',
		templateUrl: `${baseUrl}/dynamic.html`,	
		data: {
			pageTitle: '动态发送'
		},
        resolve: {
           
        }
    });
    //语音发送
	$stateProvider.state('voice',{
		url: '/voice',
		controller:'voice',
		templateUrl: `${baseUrl}/voice.html`,	
		data: {
			pageTitle: '语音发送'
		},
        resolve: {
           
        }
    });
	//********************订单浏览********************
	$stateProvider.state('orderlist',{
		url: '/orderlist',
		controller:'orderlist',
		templateUrl: `${baseUrl}/orderbrowse.html`,	
		data: {
			pageTitle: '订单浏览'
		},
        resolve: {
           
        }
    });
    //订单列表
    $stateProvider.state('orderlist.ordertable',{
		url: '/ordertable',
		controller:'ordertable',
		templateUrl: `${baseUrl}/order/orderlist.html`,	
		data: {
			pageTitle: '订单列表'
		},
        resolve: {
           
        }
    });
    //定时列表
    $stateProvider.state('orderlist.timingtable',{
		url: '/timingtable',
		controller:'timingtable',
		templateUrl: `${baseUrl}/order/timinglist.html`,	
		data: {
			pageTitle: '定时列表'
		},
        resolve: {
           
        }
    });
    //上行列表
    $stateProvider.state('orderlist.uplinktable',{
		url: '/uplinktable',
		controller:'uplinktable',
		templateUrl: `${baseUrl}/order/uplinklist.html`,	
		data: {
			pageTitle: '上行列表'
		},
        resolve: {
           
        }
    });
    //下行列表
    $stateProvider.state('orderlist.downlinktable',{
		url: '/downlinktable',
		controller:'downlinktable',
		templateUrl: `${baseUrl}/order/downlinklist.html`,	
		data: {
			pageTitle: '下行列表'
		},
        resolve: {
           
        }
	});
	 //语音订单
	 $stateProvider.state('orderlist.voicetable',{
		url: '/voicetable',
		controller:'voicetable',
		templateUrl: `${baseUrl}/order/voicelist.html`,	
		data: {
			pageTitle: '语音订单'
		},
        resolve: {
           
        }
    });
    //用户管理
    $stateProvider.state('usermanage',{
		url: '/usermanage',
		controller:'usermanage',
		templateUrl: `${baseUrl}/usermanage.html`,	
		data: {
			pageTitle: '用户管理'
		}        
    });    
    //联系人管理
    $stateProvider.state('contactmanager',{
		url: '/contactmanager',
		controller:'ctctmanagerCtrl',
		templateUrl: `${baseUrl}/contacts/list.html`,	
		data: {
			pageTitle: '联系人管理'
		},
        resolve: {
           
        }
    });
    //***************充值记录****************
    $stateProvider.state('rechargerecord',{
		url: '/rechargerecord',
		controller:'rechargerecordCtrl',
		templateUrl: `${baseUrl}/recharge.html`,	
		data: {
			pageTitle: '充值记录'
		},
        resolve: {
           
        }
    });
    //充值查询
    $stateProvider.state('rechargerecord.querylist',{
		url: '/querylist',
		controller:'querylistCtrl',
		templateUrl: `${baseUrl}/recharge/querylist.html`,	
		data: {
			pageTitle: '充值查询'
		},
        resolve: {
           
        }
    });
    //充值流程
    $stateProvider.state('rechargerecord.processlist',{
		url: '/processlist',
		controller:'processlistCtrl',
		templateUrl: `${baseUrl}/recharge/processlist.html`,	
		data: {
			pageTitle: '充值流程'
		},
        resolve: {
           
        }
    });
    //授信流程
    $stateProvider.state('rechargerecord.creditflow',{
		url: '/creditflow',
		controller:'creditflowCtrl',
		templateUrl: `${baseUrl}/recharge/creditflow.html`,	
		data: {
			pageTitle: '授信流程'
		},
        resolve: {
           
        }
    });
    //退款流程
    $stateProvider.state('rechargerecord.refundflow',{
		url: '/refundflow',
		controller:'refundflowCtrl',
		templateUrl: `${baseUrl}/recharge/refundflow.html`,	
		data: {
			pageTitle: '退款流程'
		},
        resolve: {
           
        }
    });
    //*********消费记录**********
    $stateProvider.state('expenserecord',{
		url: '/expenserecord',
		controller:'expenserecordCtrl',
		templateUrl: `${baseUrl}/expenserecord.html`,	
		data: {
			pageTitle: '消费记录'
		},
        resolve: {
           
        }
    });
    //交易明细
    $stateProvider.state('expenserecord.trades',{
		url: '/trades',
		controller:'tradesCtrl',
		templateUrl: `${baseUrl}/expense/trades.html`,	
		data: {
			pageTitle: '交易明细'
		},
        resolve: {
           
        }
    });
    //差价返还
    $stateProvider.state('expenserecord.differential',{
		url: '/differential',
		controller:'differentialCtrl',
		templateUrl: `${baseUrl}/expense/differential.html`,	
		data: {
			pageTitle: '差价返还'
		},
        resolve: {
           
        }
    });
    //模板申请 
    $stateProvider.state('templateapply',{
		url: '/templateApply',
		controller:'templateApplyCtrl',
		templateUrl: `${baseUrl}/templateapply.html`,	
		data: {
			pageTitle: '模板申请'
		},
        resolve: {
           
        }
    });
     //语音申请 
    $stateProvider.state('templateVoice',{
		url: '/templateVoice',
		controller:'templateVoiceCtrl',
		templateUrl: `${baseUrl}/template/templateVoice.html`,	
		data: {
			pageTitle: '语音申请'
		},
        resolve: {
           
        }
    });
     //短链申请 
    $stateProvider.state('templateChain',{
		url: '/templateChain',
		controller:'templateChainCtrl',
		templateUrl: `${baseUrl}/template/templateChain.html`,	
		data: {
			pageTitle: '短链申请'
		},
        resolve: {
           
        }
    });
    //签名申请
    $stateProvider.state('signatureapply',{
		url: '/signatureapply',
		controller:'signatureapplyCtrl',
		templateUrl: `${baseUrl}/signatureapply.html`,	
		data: {
			pageTitle: '签名申请'
		},
        resolve: {
           
        }
    });
    //业绩统计
    $stateProvider.state('performancelist',{
		url: '/performancelist',
		controller:'performanceCtrl',
		templateUrl: `${baseUrl}/perfstatistics.html`,	
		data: {
			pageTitle: '业绩统计'
		},
        resolve: {
           
        }
    });
    //发送量统计
    $stateProvider.state('sendnumder',{
		url: '/sendnumder',
		controller:'sendnumderCtrl',
		templateUrl: `${baseUrl}/statistics/sendnumder.html`,	
		data: {
			pageTitle: '业绩统计'
		},
        resolve: {
           
        }
    });
    //账单统计
    $stateProvider.state('bill',{
		url: '/bill',
		controller:'billCtrl',
		templateUrl: `${baseUrl}/statistics/bill.html`,	
		data: {
			pageTitle: '账单统计'
		},
        resolve: {
           
        }
    });
    //分析报告
    $stateProvider.state('report',{
		url: '/report',
		controller:'reportCtrl',
		templateUrl: `${baseUrl}/statistics/report.html`,	
		data: {
			pageTitle: '分析报告'
		},
        resolve: {
           
        }
    });
}]);
