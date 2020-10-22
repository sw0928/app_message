import commonbase from './commonBase';

export default commonbase.controller('commonaside', ['$scope', 'Persist', '$http', 'toastr', '$window', '$uibModal', 'echarts', 'LocalData', 'confirmdialog', '$filter',
function ($scope, Persist, $http, toastr,$window, $uibModal, echarts, LocalData, confirmdialog, $filter) {
	$scope.per = Persist;
	$scope.userInfo = LocalData.getObject('userInfo');
	//console.log($scope.userInfo)
	$scope.returnAccountType = () => {
		if(LocalData.getObject('userInfo').accountType == 1){
			return '管理员';
		}
		if(LocalData.getObject('userInfo').accountType == 2){
			return '财务';
		}
		if(LocalData.getObject('userInfo').accountType == 3){
			return '运营';
		}
		if(LocalData.getObject('userInfo').accountType == 4){
			return '销售总监';
		}
		if(LocalData.getObject('userInfo').accountType == 5){
			return '销售经理';
		}
		if(LocalData.getObject('userInfo').accountType == 6){
			return '客户经理';
		}
		if(LocalData.getObject('userInfo').accountType == 7){
			return '代理商';
		}
		if(LocalData.getObject('userInfo').accountType == 8){
			return '客户';
		}
	}
    
	//-------账户余额  信用额度   定价
	$scope.userdata = {
		userAccount:null,
		userPrice:null
	}
	$scope.queryUserPriceAndAccount = () => {
		$http({
    		method: 'POST',
    		url:'/iccs/capital/queryUserPrice'   
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	$scope.userdata.userPrice = response.data.data;
            }
		});
		$http({
    		method: 'POST',
    		url:'/iccs/user/queryUserAccountInfo'   
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	$scope.userdata.userAccount = response.data.data;
            }
        });
	}
	// 初始
	$scope.queryUserPriceAndAccount();
    //审核情况    
    $scope.getCheckSituation = () => {
    	let myChart = echarts.init(document.getElementById('check-situation'));
    	let baroption = {
		    color: ['#f5a623', '#4c8efe', '#8ec41e'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    calculable: true,
		    xAxis: [
		        {
		            type: 'category',
		            axisTick: {show: false},
		            data: ['十月', '十一月', '十二月']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            name: '充值未审核',
		            type: 'bar',
		            barGap: 0,
		            data: [20, 32, 101]
		        },
		        {
		            name: '授信未审核',
		            type: 'bar',
		            data: [30, 82, 91]
		        },
		        {
		            name: '退款未审核',
		            type: 'bar',
		            data: [150, 60, 101]
		        }
		    ]
		};
		myChart.setOption(baroption);
    }
    
	//消费量统计    
    $scope.getExpenseStatistics = () => {
    	let myChart = echarts.init(document.getElementById('consumption'));    	
    	let circleoption = {
    		color:['#478ffe','#84b0ff'],
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '24',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            data:[
		                {value:335, name:'充值量'},
		                {value:310, name:'消费量'}
		            ]
		        }
		    ]
		};
		myChart.setOption(circleoption);
	};
	//模板审核情况
	$scope.templateData = null;
	$scope.templateMonth = $filter("date")(new Date(), "M");
	$scope.getAuditsituation = () => {
		let myChart = echarts.init(document.getElementById('auditsituation'));
		let circleoption = {
    		color:['#0767fb','#84b0ff','#478ffe'],
		    series: [
		        {
		            name:'审核情况',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '24',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            data:[]
		        }
		    ]
		};
		$http({
    		method: 'POST',
			url:'/iccs/template/statisticeTemplateApply',
			params:{
				"month":$scope.templateMonth
			} 
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
				$scope.templateData = response.data.data.pieDate;
				$scope.dealStatistics(circleoption,response.data.data.pieDate);
				myChart.setOption(circleoption);
            }
        });	
	};
	//处理统计data
	$scope.dealStatistics = (optionObj,datalist) => {
		angular.forEach(datalist,item => {
			optionObj.series[0].data.push({
				value:item.CUT,
				name:item.REVIEW
			});
		});
	}

	//签名审核情况
	$scope.signatureData = null;
	$scope.signatureMonth = $filter("date")(new Date(), "M");
	$scope.getSignatureaudit = () => {
    	let myChart = echarts.init(document.getElementById('signatureaudit'));    	
    	let circleoption = {
    		color:['#478ffe','#84b0ff'],
		    series: [
		        {
		            name:'审核情况',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '24',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            data:[]
		        }
		    ]
		};
		$http({
    		method: 'POST',
			url:'/iccs/signature/statisticeSignatureApply',
			params:{
				"month":$scope.signatureMonth
			} 
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
				$scope.signatureData = response.data.data.pieDate;
				$scope.dealStatistics(circleoption,response.data.data.pieDate);
				myChart.setOption(circleoption);
            }
        });	
		myChart.setOption(circleoption);
    };
    //查询联系人分组
    $scope.contactsGroupList = [];
    $scope.searchGroupsList = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/contactsGroup/queryContactsGroup'   
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	$scope.contactsGroupList = response.data.data;
            }
        });
    }
    
    $scope.searchGroupsList();
	
    
    //添加联系人分组
    $scope.addContactsGroup = () => {
    	let addContactsgroup = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/contacts/addgroup.html',
            controller: 'addContactsgroupCtrl',
            resolve: {
                GroupList: function () {
                	return $scope.contactsGroupList
                }
            }
        });

        addContactsgroup.result.then(function (data) {
            $scope.searchGroupsList();
        }, function () {
            
        });
	}
	
	//选中联系人分组
	$scope.selectedGroup = (group) => {
		$scope.per.SelectedGroup = group.groupNo;
		$scope.$emit('SelectedGroup',group.groupNo);
	}
    
    //删除联系人分组
    $scope.delContactsgroup = (group,$event) => {
		$event.stopPropagation();
    	confirmdialog.showdialog('您确认要删除该分组么？').then(function(){
			$http({
	    		method: 'POST',
	    		url:'/iccs/contactsGroup/removeContactsGroup',
	    		params:{
	    			"contactsGroupId":group.groupNo
	    		}
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){
	            	confirmdialog.successdialog(response.data.message).then(function(){
						$scope.searchGroupsList();
					});	            	
	            }
	        });
        });    	
    }
    
    //修改密码
    $scope.modifyPassword = () => {
    	let modifypassword = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/dialog/modifypassword.html',
            controller: 'modifypasswordCtrl',
            resolve: {
                
            }
        });

        modifypassword.result.then(function (data) {
            
        }, function () {
            
        });
    }
 //MFA设置
    $scope.mfaSend = () => {
    	$window.location.href = 'dynamic_verify.html';
    }   
    //修改回执地址
    $scope.receiptSite = (http) => {
    	let receiptSite = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/dialog/receiptSite.html',
            controller: 'receiptSiteCtrl',
            resolve: {
                wornDeliver: function () {
                	return http
                }
            }
        });

        receiptSite.result.then(function (data) {
            $scope.userInfo.httpDeliver = data;
            LocalData.setObject('userInfo',$scope.userInfo);
        }, function () {
            
        });
    }
    //解绑mfa
    $scope.mfaUnbundle = () => {
    	let mfaUnbundle = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/dialog/unbundle.html',
            controller: 'unbundleCtrl',
            resolve: {
                
            }
        });

        mfaUnbundle.result.then(function (data) {
           // $scope.userInfo.httpDeliver = data;
            //LocalData.setObject('userInfo',$scope.userInfo);
        }, function () {
            
        });
    }
    //帮助中心查询
	$scope.helpswitch = 1;
	$scope.showSearchText = false;
	//查询问题
	let searchIssue = () => {
		$http({
			method: 'POST',
			url:'/iccs/helper/queryIssue',
			params:{
				"issueName":$scope.searchcontent?$scope.searchcontent:"",
				"loginName":LocalData.get('current')
			}
		}).then(function (response){
			// 接口调用成功
			if(response.data.statusCode === 200){
				$scope.questionList = response.data.data;
			}
		});
	}
	//初始显示问题
	searchIssue();
	//查询文档
	let searchDocument = () => {
		$http({
			method: 'POST',
			url:'/iccs/helper/queryDocuments',
			params:{ 	
				"content": $scope.searchcontent,
				"offset": 1,
				"pageSize": 10,
				"type": 0
			}
		}).then(function (response){
			// 接口调用成功
			if(response.data.statusCode === 200){
				
			}
		});
	}

	$scope.searchHelpenter = () => {
		if($scope.showSearchText){
			if($scope.helpswitch == 2){
				searchDocument();
			}else{
				searchIssue();
			}
		}
	}

	//账户信息
	$scope.showAccountInfo = false;
	
}]).controller('addContactsgroupCtrl', ['$scope','GroupList', '$http', '$uibModalInstance', 'toastr', 'confirmdialog', function ($scope,GroupList, $http, $uibModalInstance, toastr, confirmdialog) { //新增联系人分组
	$scope.groupName = null;
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {
    	for (let i = 0; i < GroupList.length; i++) { 
			  if($scope.groupName == GroupList[i].groupName){
			    	toastr.warning('分组名称已存在，请重新输入!','槽糕');
			    	return false;
			  }
			}
        $http({
    		method: 'POST',
    		url:'/iccs/contactsGroup/createContactsGroup',
    		params: {
			  	"groupName": $scope.groupName			  
			}     
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
				confirmdialog.successdialog(response.data.message).then(function(){
					$uibModalInstance.close(true);
				});	            	
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error('系统内部错误','错误');
        });
    };

}]);
   