import commonbase from '../commonBase';
export default commonbase.controller('creditdetailCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'creditDetail', 'confirmdialog', 'SysPermission',
function ($scope, $http, $uibModalInstance, toastr, creditDetail, confirmdialog , SysPermission) { //授信详情
	//------- 1取消审核 2审核通过 3立即授信 4拒绝授信 ----
	$scope.SysPermission = SysPermission;

	$scope.basedata = {
		addmoneyTime: creditDetail.addmoneyTime,
		addmoneyUser: creditDetail.addmoneyUser,
		auditTime: creditDetail.auditTime,
		auditUser: creditDetail.auditUser,
		company: creditDetail.company,
		createTime: creditDetail.createTime,
		createUser: creditDetail.createUser,
		fromUserName: creditDetail.fromUserName,
		loginName: creditDetail.loginName,
		parentLoginName: creditDetail.parentLoginName,
		money: creditDetail.money,
		payType: creditDetail.payType,
		remark: creditDetail.remark,
		seqId: creditDetail.seqId,
		status: creditDetail.status
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
	
	//删除该流程
	$scope.deleteProcess = () => {
		confirmdialog.showdialog('您确认要删除该授信流程么？').then(function(){
			$http({
	    		method: 'POST',
	    		url:'/iccs/extension/removeExtension',
	    		params: {"seqId":creditDetail.seqId}	    		
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){           	
			        confirmdialog.successdialog(response.data.message).then(function(){
						$uibModalInstance.close('remove');
					});
	            }else{
	            	toastr.warning(response.data.message,'提示');
	            }
			},function(){
				
			})
        });
	}

}]).controller('auditcreditCtrl', ['$scope', 'Persist','$http','$uibModal', 'LocalData','$uibModalInstance', 'toastr', 'creditDetail', 'confirmdialog', 'SysPermission',
function ($scope,Persist, $http,$uibModal,LocalData, $uibModalInstance, toastr, creditDetail, confirmdialog , SysPermission) { //授信详情
	//------- 1取消审核 2审核通过 3立即授信 4拒绝授信 ----
	$scope.SysPermission = SysPermission;
	let Userinfo = LocalData.getObject('userInfo');
	$scope.per = Persist;
	$scope.accountType = Userinfo.accountType;
	if(LocalData.get('current') == creditDetail.createUser){
		$scope.current = 1
	}else{
		$scope.current = 0
	}
	$scope.basedata = {
		addmoneyTime: creditDetail.addmoneyTime,
		addmoneyUser: creditDetail.addmoneyUser,
		auditTime: creditDetail.auditTime,
		auditUser: creditDetail.auditUser,
		company: creditDetail.company,
		createTime: creditDetail.createTime,
		createUser: creditDetail.createUser,
		fromUserName: creditDetail.fromUserName,
		loginName: creditDetail.loginName,
		parentLoginName: creditDetail.parentLoginName,
		money: creditDetail.money,
		payType: creditDetail.payType,
		remark: creditDetail.remark,
		seqId: creditDetail.seqId,
		status: creditDetail.status
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
	};
	//确认充值
	$scope.confirmrecharge = () => {
		confirmdialog.showdialog('是否确认授信？').then(function(){
			$scope.auditExtension(3);
		});
	}
    //操作授信流程
    $scope.auditExtension = (status) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/extension/auditExtension',
    		data: {
  				"seqId": creditDetail.seqId,
  				"status": status
			}           
       }).then(function (response){
            if(response.data.statusCode === 200){
				confirmdialog.successdialog(response.data.message).then(function(){
					$scope.basedata.status = `${status}`;
					//$uibModalInstance.close(true);
				});
            }else{
            	toastr.warning(response.data.message,'提示');
            }
        }, function errorCallback(){
            
        });
	}
	
	//删除该流程
	$scope.deleteProcess = () => {
		confirmdialog.showdialog('您确认要删除该授信流程么？').then(function(){
			$http({
	    		method: 'POST',
	    		url:'/iccs/extension/removeExtension',
	    		params: {"seqId":creditDetail.seqId}	    		
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){           	
			        confirmdialog.successdialog(response.data.message).then(function(){
						$uibModalInstance.close('remove');
					});
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
            templateUrl: '../../resources/views/recharge/rejectA.html',
            controller: 'rejectProcessBCtrl',
            appendTo:	$('.order-browse'),
            size:'sm',
						resolve: {
            	creditDetail: function () {
            		return $http({
			    		method: 'POST',
			    		url:'/iccs/extension/queryExtensionInfo',
			    		params: {"seqId":creditDetail.seqId}	    		
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){	            	
			            	return response.data.data;
			            }
					},function(){
						
					})
            	}
            }
        });	

				auditprocess.result.then(function (data) {      		
				    $uibModalInstance.close(true);
				 }, function () {
				     $uibModalInstance.close(true);
				});
    }

}]).controller('rejectProcessBCtrl', ['$scope', '$http', '$uibModalInstance','creditDetail', 'toastr', 'confirmdialog', 'LocalData', '$state', 'SysPermission','$window',
function ($scope, $http, $uibModalInstance, creditDetail,toastr, confirmdialog, LocalData, $state, SysPermission,$window) { //流程详情
	//权限
	$scope.SysPermission = SysPermission;		
	$scope.remark = '';
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.close(true);
	};
    $scope.auditExtension = (status) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/extension/auditExtension',
    		data: {
  				"seqId": creditDetail.seqId,
  				"status": status
			}           
       }).then(function (response){
            if(response.data.statusCode === 200){
				confirmdialog.successdialog(response.data.message).then(function(){
					//$scope.basedata.status = `${status}`;
					$uibModalInstance.close(true);
				});
            }else{
            	toastr.warning(response.data.message,'提示');
            }
        }, function errorCallback(){
            
        });
	}
}]);