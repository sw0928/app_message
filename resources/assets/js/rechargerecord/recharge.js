import commonbase from '../commonBase';

export default commonbase.controller('rechargerecordCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', '$state', 'LocalData', 'SysPermission',
	function($scope, Persist, $http, toastr, $uibModal, $state, LocalData, SysPermission) {
		$scope.per = Persist;
		$scope.per.asideswitch = 5;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'rechargemodule';
		$scope.SysPermission = SysPermission;

		$scope.showdialog = () => {
			if($scope.per.rechargerecord == 'process') {
				$scope.addprocess();
			}
			if($scope.per.rechargerecord == 'refund' && $scope.SysPermission.accountType != 2) {
				$scope.addrefund();
			}
			if($scope.per.rechargerecord == 'creditflow' && $scope.SysPermission.accountType != 2) {
				$scope.addcreditprocess();
			}
		}

		$scope.showbtntext = () => {
			if($scope.per.rechargerecord == 'process' && $scope.SysPermission.showRechargeA()) {
				return '新增流程';
			}
			if($scope.per.rechargerecord == 'refund' && $scope.SysPermission.accountType != 2) {
				return '新增退款';
			}
			if($scope.per.rechargerecord == 'creditflow' && $scope.SysPermission.showCredit()) {
				return '新增授信';
			}
			return false;
		}
		//导出
		$scope.importUserBalance = () => {			
			$http({
	    		method: 'POST',
	    		url:'/iccs/addMoney/queryAddMoneyRecordList',
	    		data: Persist.rechargeObj,
	        }).then(function (response){
	            // 接口调用成功
	            if(response.status === 200){
	            	setTimeout(function(){
            		Persist.download(response.data.data.expTaskId);
            	},1000)
	            }else{
	            	toastr.warning(response.data.message,'槽糕');
	            }
	        });
		}
		//新增充值流程
		$scope.addprocess = () => {
			let addprocess = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/recharge/addprocess.html',
				controller: 'addprocessCtrl',
				//size: 'lg',
				resolve: {
					Userlist: function() {
						return $http({
							method: 'POST',
							url: '/iccs/addMoney/queryUserName',
							params: {
								userName: ''
							}
						}).then(function(response) {
							// 接口调用成功
							if(response.data.statusCode === 200) {
								return response.data.data;
							} else {
								toastr.warning('出了点小问题', '槽糕');
							}
						}, function errorCallback() {
							toastr.error('系统内部错误', '错误');
						});
					},
				}
			});

			addprocess.result.then(function(data) {
				$state.reload();
			}, function() {

			});
		}

		//新增授信流程
		$scope.addcreditprocess = () => {
			let creditprocess = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/recharge/addcreditprocess.html',
				controller: 'creditprocessCtrl',
				resolve: {
					Userlist: function() {
						return $http({
							method: 'POST',
							url: '/iccs/extension/queryUserName',
							params: {
								userName: ''
							}
						}).then(function(response) {
							// 接口调用成功							
							if(response.data.statusCode === 200) {
								return response.data.data.data;
							}
						});
					},
				}
			});

			creditprocess.result.then(function(data) {
				$state.reload();
			}, function() {

			});
		}

		//新增退款
		$scope.addrefund = () => {
			let refund = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/recharge/addrefund.html',
				controller: 'refundCtrl',
				resolve: {
					Userlist: function() {
						return $http({
							method: 'POST',
							url: '/iccs/addMoney/queryUserName',
							params: {
								userName: LocalData.get('current')
							}
						}).then(function(response) {
							// 接口调用成功
							if(response.data.statusCode === 200) {
								return response.data.data;
							} else {
								toastr.warning('出了点小问题', '槽糕');
							}
						}, function errorCallback() {
							toastr.error('系统内部错误', '错误');
						});
					},
				}
			});

			refund.result.then(function(data) {
				$state.reload();
			}, function() {

			});
		}

	}
]).controller('addprocessCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog', 'Userlist', function($scope, $http, $uibModalInstance, toastr, confirmdialog, Userlist) { //新增流程
	$scope.usersList = Userlist;
	//初始化数据
	$scope.basedata = {
		company: '',
		fromUserName: null,
		money: '',
		payType: '',
		remark: '',
		rechargefinance: false,
		efundfinance: false
	}
	//控制是否传财务
	//	$scope.controlfinance = (element, paramData) => {
	//		if($(element.target).prop('checked')) {
	//			if(paramData == 'recharge') {
	//				$scope.basedata.rechargefinance = false;
	//			} else {
	//				$scope.basedata.refundfinance = false;
	//			}
	//		}
	//	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	$scope.seach = (name) => {
		$http({
			method: 'POST',
			url: '/iccs/addMoney/queryUserName',
			params: {
				userName: name
			}
		}).then(function(response) {
			// 接口调用成功
			//console.log(response)
			if(response.data.statusCode === 200) {
				if(response.data.data.length >0){
						$scope.basedata.company =response.data.data[0].company;
					}else{
						$scope.basedata.company ='';
					}
			} else {
				toastr.warning('出了点小问题', '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};
	// 确定
	$scope.ensure = () => {

		$http({
			method: 'POST',
			url: '/iccs/addMoney/createAddMoneyFlow',
			data: {
				"company": $scope.basedata.company,
				//fromUserName": $scope.basedata.refundfinance ? -1 : $scope.basedata.fromUserName,
				"money":($scope.basedata.money * 1).toFixed(2),
				"payType": parseInt($scope.basedata.payType),
				//"rechargeId": $scope.basedata.rechargefinance ? -1 : ($scope.basedata.recharger ? $scope.basedata.recharger.userId : null),
				"recharger": $scope.basedata.recharger ? $scope.basedata.recharger.loginName : null, //$scope.basedata.rechargefinance ? -1 : ($scope.basedata.recharger ? $scope.basedata.recharger.loginName : null),
				"remark": $scope.basedata.remark
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};

}]).controller('creditprocessCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'Userlist', 'confirmdialog',
	function($scope, $http, $uibModalInstance, toastr, LocalData, Userlist, confirmdialog) { //新增授信流程
		$scope.usersList = Userlist;
		//初始化数据
		$scope.basedata = {
			company: '',
			extension: '',
			money: '',
			payType: '',
			remark: ''
		}
		// 取消
		$scope.cancel = () => {
			$uibModalInstance.dismiss({
				$value: 'cancel'
			});
		};
		$scope.seach = (name) => {
			$http({
				method: 'POST',
				url: '/iccs/addMoney/queryUserName',
				params: {
					userName: name
				}
			}).then(function(response) {
				// 接口调用成功
				//console.log(response)
				if(response.data.statusCode === 200) {
					if(response.data.data.length >0){
						$scope.basedata.company =response.data.data[0].company;
					}else{
						$scope.basedata.company ='';
					}
					
				} else {
					toastr.warning('出了点小问题', '槽糕');
				}
			}, function errorCallback() {
				toastr.error('系统内部错误', '错误');
			});
		};
		// 确定
		$scope.ensure = () => {
			$http({
				method: 'POST',
				url: '/iccs/extension/createExtension',
				data: {
					"company": $scope.basedata.company,
					"extensionId": 1,
					"extensionName": $scope.basedata.extension ? $scope.basedata.extension.loginName : null,
					"fromUserName": LocalData.get('current'),
					"money": $scope.basedata.money,
					"payType": $scope.basedata.payType,
					"remark": $scope.basedata.remark
				}
			}).then(function(response) {
				if(response.data.statusCode === 200) {
					confirmdialog.successdialog(response.data.message).then(function() {
						$uibModalInstance.close(true);
					});
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			}, function errorCallback() {
				toastr.error('系统内部错误', '错误');
			});
		};

	}
]).controller('refundCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'Userlist', 'confirmdialog', function($scope, $http, $uibModalInstance, toastr, Userlist, confirmdialog) { //新增退款
	$scope.usersList = Userlist;
	//初始化数据
	$scope.basedata = {
		company: '',
		money: '',
		payType: '',
		recharger: null,
		remark: '',
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.ensure = () => {
		$http({
			method: 'POST',
			url: '/iccs/addMoney/createQuitMoneyFlow',
			data: {
				"company": $scope.basedata.company,
				"money": ($scope.basedata.money * 1).toFixed(3),
				"payType": parseInt($scope.basedata.payType),
				"recharger": $scope.basedata.recharger ? $scope.basedata.recharger.loginName : null, //$scope.basedata.rechargefinance ? -1 : ($scope.basedata.recharger ? $scope.basedata.recharger.loginName : null),
				"remark": $scope.basedata.remark
			}
		}).then(function(response) {
			// 接口调用成功
				console.log(response)
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};

}]).controller('refunddetailCtrl', ['$scope', '$uibModalInstance', 'toastr', function($scope, $uibModalInstance, toastr) { //退款详情
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.ensure = () => {
		$uibModalInstance.close(true);
	};

}]);