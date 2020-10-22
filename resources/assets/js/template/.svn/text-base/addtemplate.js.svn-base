import commonbase from '../commonBase';
export default commonbase.controller('addtemplate', ['$scope', '$window', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'confirmdialog', function($scope, $window, $http, $uibModalInstance, toastr, LocalData, confirmdialog) { //添加用户    
	//初始化数据
	$scope.basedata = {
		miguMobile: "",
		remark: '',
		templateId: null,
		templateSms: '',
		templateType: "1",
		hanging: 0,
		applicant: LocalData.get('current'),
		userId: LocalData.getObject('userInfo').userId
	}

	let dealhtml = (strhtml) => {
		let dd, dds;
		if(strhtml) {
			dd = strhtml.replace(/<\/?.+?>/g, "");
			dds = dd.replace(/ /g, ""); //dds为得到后的内容
		}
		return dds;
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
//	$http({
//		method: 'POST',
//		url: '/iccs/user/queryUserName',
//		params: {
//			loginName: LocalData.get('current')
//		}
//	}).then(function(response) {
//		// 接口调用成功
//		//console.log(response)
//		if(response.data.statusCode === 200) {
//			$scope.basedata.userId = response.data.data[0].userId
//		} else {
//			toastr.warning('出了点小问题', '槽糕');
//		}
//	}, function errorCallback() {
//		toastr.error('系统内部错误', '错误');
//	});
	// 确定
	$scope.ensure = () => {
		$http({
			method: 'POST',
			url: '/iccs/template/templateApply',
			data: {
				"miguMobile": $scope.basedata.miguMobile,
				"modWord": $scope.basedata.templateSms,
				"remark": $scope.basedata.remark,
				"templateSms": dealhtml($scope.basedata.templateSms),
				"templateType": parseInt($scope.basedata.templateType),
				"userId":$scope.basedata.userId
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				confirmdialog.errordialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				}, function() {

				});
			}
		});

	};

}]).controller('addShortChain', ['$scope', '$window', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'confirmdialog', function($scope, $window, $http, $uibModalInstance, toastr, LocalData, confirmdialog) { //添加用户    
	//初始化数据
	$scope.basedata = {
		remark: '',
		templateId: null,
		templateSms: '',
		templateType: "2",
		userId: LocalData.getObject('userInfo').userId
	}

	let dealhtml = (strhtml) => {
		let dd, dds;
		if(strhtml) {
			dd = strhtml.replace(/<\/?.+?>/g, "");
			dds = dd.replace(/ /g, ""); //dds为得到后的内容
		}
		return dds;
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
//	$http({
//		method: 'POST',
//		url: '/iccs/user/queryUserName',
//		params: {
//			loginName: LocalData.get('current')
//		}
//	}).then(function(response) {
//		// 接口调用成功
//		//console.log(response)
//		if(response.data.statusCode === 200) {
//			$scope.basedata.userId = response.data.data[0].userId
//		} else {
//			toastr.warning('出了点小问题', '槽糕');
//		}
//	}, function errorCallback() {
//		toastr.error('系统内部错误', '错误');
//	});
	// 确定
	$scope.ensure = () => {
		$http({
			method: 'POST',
			url: '/iccs/link/templateLinkApply',
			data: {
				"modWord": $scope.basedata.templateSms,
				"remark": $scope.basedata.remark,
				"templateSms": dealhtml($scope.basedata.templateSms),
				"templateType": 2,
				"userId":$scope.basedata.userId
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				confirmdialog.errordialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				}, function() {

				});
			}
		});

	};

}]);