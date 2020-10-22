import commonbase from '../commonBase';
export default commonbase.controller('refundflowCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', '$filter', '$window',
function ($scope, Persist, $http, toastr, $uibModal, LocalData, $filter, $window) { 
	$scope.per = Persist;
  $scope.per.rechargerecord = 'refund';
	Persist.RechargeCount = 0;
	$scope.getDay = (day) => {
    //Date()返回当日的日期和时间。
    var days = new Date();
    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
    var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
    //setTime()以毫秒设置 Date 对象。
    days.setTime(gettimes);
    var year = days.getFullYear();
    var month = days.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var today = days.getDate();
    if(today<10){
        today="0"+today;
    }
    return year + "-" + month + "-" + today;
	}
//初始化数据
  $scope.total = 0;
 	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $scope.getDay(-90) +' 00:00:00',
		fromUserName: null,
		status: "",
		currentPage: 1,
		pageSize: '10'				
	}  
		//表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $scope.getDay(-90) +' 00:00:00',
			fromUserName: null,
			status: "",
			currentPage: 1,
			pageSize: '10',
			total:0			
		}
		$scope.getTableList();
	}
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
			headers: { Authorization:LocalData.get('Authorization') },
    		method: 'POST',
    		url:'/iccs/addMoney/queryAddMoneyFlowList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate":$scope.searchdata.startDate,
				"fromUserName": $scope.searchdata.fromUserName,
				"status": $scope.searchdata.status,
				"offset": $scope.searchdata.currentPage,
				"flowType":3,
				"pageSize": $scope.searchdata.pageSize		
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.tablelistdata = response.data.data;
            	if(response.data.data){
            		Persist.RechargeCount = $scope.searchdata.total = response.data.data.totalCount;
            	}
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
    }
    
    $scope.getTableList();
    
    $scope.searchTableList = () => {    	
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
	}

    //操作
	$scope.unaudited = (param) => {
    	let refunddetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/refunddetail.html',
            controller: 'refunddetailCtrl',
            appendTo:	$('.order-browse'),
            size:'lg',
            resolve: {
                FlowDetail: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/addMoney/queryAddMoneyFlow',
			    		params: {
							"seqId": param.seqId	
						}           
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){
			            	return response.data.data;
			            }else{
			            	toastr.warning(response.data.message,'槽糕');
			            }
			        }, function errorCallback(){
			            toastr.error('系统内部错误','错误');
			        });
                }
            }
        });	

        refunddetail.result.then(function (data) {
            $scope.searchTableList();
        }, function () {
            $scope.searchTableList();
        });
    }

}]).controller('refunddetailCtrl', ['$scope', 'Persist', '$http','$uibModal', '$uibModalInstance', 'toastr', 'FlowDetail', 'confirmdialog', 'LocalData', '$state', 'SysPermission','$window',
function ($scope,Persist, $http, $uibModal, $uibModalInstance, toastr, FlowDetail, confirmdialog, LocalData, $state, SysPermission,$window) { //流程详情
	//权限
	$scope.SysPermission = SysPermission;
	$scope.per = Persist;
	$scope.basedata = {
		company: FlowDetail.company,
		fromUserName: FlowDetail.fromUserName,
		money: FlowDetail.money,
		payType: FlowDetail.payType,
		recharger: FlowDetail.loginName,
		remark: FlowDetail.remark, 
		rejectMsg:FlowDetail.rejectMsg,
		status:FlowDetail.status,
		createUser:FlowDetail.createUser
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
	};

	//----------  1未审核、2已审核、3已充值  -------------
	//确认充值
	$scope.confirmrecharge = () => {
		confirmdialog.showdialog('是否确认充值？').then(function(){
			$scope.auditAddMoneyFlow(3);
		});
	}

	//操作充值流程
    $scope.auditAddMoneyFlow = (status) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/addMoney/auditAddMoneyFlow',
    		data: {
				"seqId": FlowDetail.seqId,
				"status": status		
			}           
       }).then(function (response){
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
					//$uibModalInstance.close(true);
					$scope.basedata.status = `${status}`;
				}); 
            }else{
				toastr.warning(response.data.message,'提示');
			}
        });
	}
	
	//删除该流程
    $scope.deleteProcess = () => {
		 confirmdialog.showdialog('您确认要删除该退款流程么？').then(function(){
			$http({
	    		method: 'POST',
	    		url:'/iccs/addMoney/removeAddMoneyFlow',
	    		params: {"seqId": FlowDetail.seqId}
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){           	
			        $state.reload();
			        $uibModalInstance.close(true);
	            }else{
	            	toastr.warning(response.data.message,'提示');
	            }
			},function(){
				
			})
        });
	}
//驳回流程
		$scope.rejectProcess = () => {
    	let auditprocess = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/rejectD.html',
            controller: 'rejectProcessDCtrl',
            appendTo:	$('.order-browse'),
            size:'sm',
            resolve: {
                FlowDetail: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/addMoney/queryAddMoneyFlow',
			    		params: {
							"seqId": FlowDetail.seqId	
						}           
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){
			            	return response.data.data;
			            }else{
			            	toastr.warning(response.data.message,'槽糕');
			            }
			        }, function errorCallback(){
			            toastr.error('系统内部错误','错误');
			        });
                }
            }
        });	

        auditprocess.result.then(function (data) {
            $uibModalInstance.close(true);
        }, function () {
            $uibModalInstance.close(true);
        });
    }

}]).controller('rejectProcessDCtrl', ['$scope', '$http', 'FlowDetail','$uibModalInstance', 'toastr', 'confirmdialog', 'LocalData', '$state', 'SysPermission','$window',
function ($scope, $http, FlowDetail, $uibModalInstance, toastr, confirmdialog, LocalData, $state, SysPermission,$window) { //流程详情
	//权限
	$scope.SysPermission = SysPermission;		
	$scope.basedata = {
		remark: '',
		
	}
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.close(true);
	};
 $scope.auditExtension = (status) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/addMoney/auditAddMoneyFlow',
    		data: {
				"seqId": FlowDetail.seqId,
				"status": status,
				"rejectMsg":$scope.basedata.remark
			}           
       }).then(function (response){
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
					//关闭弹窗
					if(status == 4){
						$uibModalInstance.close(true);
					}
					
					$scope.basedata.status = `${status}`;
				}); 
            }else{
				toastr.warning(response.data.message,'提示');
			}
        });
	}
}]);
   