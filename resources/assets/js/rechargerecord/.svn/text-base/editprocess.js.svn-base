import commonbase from '../commonBase';
export default commonbase.controller('processdetailCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'FlowDetail', 'confirmdialog', 'LocalData', '$state', 'SysPermission',
function ($scope, $http, $uibModalInstance, toastr, FlowDetail, confirmdialog, LocalData, $state, SysPermission) { //流程详情
	//1未审核、2已审核、3已充值
	$scope.SysPermission = SysPermission;
	
	$scope.basedata = {
		company: FlowDetail.company,
		fromUserName: FlowDetail.fromUserName,
		money: FlowDetail.money,
		payType: FlowDetail.payType,
		rechargeId: FlowDetail,
		recharger: FlowDetail.loginName,
		rejectMsg:FlowDetail.rejectMsg,
		remark: FlowDetail.remark,
		status:FlowDetail.status
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
	};

	//删除该流程
    $scope.deleteProcess = () => {
		 confirmdialog.showdialog('您确认要删除该充值流程么？').then(function(){
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

}]).controller('auditprocessCtrl', ['$scope','Persist', '$http','$uibModal', '$uibModalInstance', 'toastr', 'FlowDetail', 'confirmdialog', 'LocalData', '$state', 'SysPermission','$window',
function ($scope,Persist, $http,$uibModal, $uibModalInstance, toastr, FlowDetail, confirmdialog, LocalData, $state, SysPermission,$window) { //流程详情
	//权限
	$scope.SysPermission = SysPermission;
	$scope.per = Persist;
	$scope.basedata = {
		company: FlowDetail.company,
		fromUserName: FlowDetail.fromUserName,
		money: FlowDetail.money,
		payType: FlowDetail.payType,
		rechargeId: FlowDetail,
		recharger: FlowDetail.loginName,
		rejectMsg:FlowDetail.rejectMsg,
		remark: FlowDetail.remark,
		status:FlowDetail.status
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
					//关闭弹窗
					if(status == 3){
						$uibModalInstance.close(true);
					}
					
					$scope.basedata.status = `${status}`;
				}); 
            }else{
				toastr.warning(response.data.message,'提示');
			}
        });
	}
	
	//删除该流程
    $scope.deleteProcess = () => {
		 confirmdialog.showdialog('您确认要删除该充值流程么？').then(function(){
			$http({
	    		method: 'POST',
	    		url:'/iccs/addMoney/removeAddMoneyFlow',
	    		params: {"seqId": FlowDetail.seqId}
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){           	
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
            templateUrl: '../../resources/views/recharge/reject.html',
            controller: 'rejectProcessCtrl',
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
}]).controller('rejectProcessCtrl', ['$scope', '$http', '$uibModalInstance','FlowDetail', 'toastr', 'confirmdialog', 'LocalData', '$state', 'SysPermission','$window',
function ($scope, $http, $uibModalInstance, FlowDetail,toastr, confirmdialog, LocalData, $state, SysPermission,$window) { //流程详情
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