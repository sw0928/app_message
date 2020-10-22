import commonbase from './commonBase';

export default commonbase.controller('modifypasswordCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog', function ($scope, $http, $uibModalInstance, toastr, confirmdialog) { //修改密码
	$scope.basedata = {
		oldpwd:null,
		newpwd:null,
		confirmpwd:null
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
    		url:'/iccs/user/editUserPassword',
    		params: {
				"oldPassword": encodeURIComponent($scope.basedata.oldpwd),
				"newPassword": encodeURIComponent($scope.basedata.newpwd),
				"newYesPassword": encodeURIComponent($scope.basedata.confirmpwd)
			}     
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
                    $uibModalInstance.close(true);
                    window.location = "login.html"; 
						        LocalData.set('Authorization',"");
						        LocalData.set('current',"");
						        LocalData.setObject('authorities',"");
						        LocalData.setObject('userInfo',""); 
                });
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error(response.data.message,'错误');
        });             
	};

	//验证两次输入的新密码是否相同
	$scope.isvalidate = true;
	$scope.passwordValidate = () => {
		$scope.isvalidate = ($scope.basedata.newpwd == $scope.basedata.confirmpwd);
	}

}]).controller('receiptSiteCtrl', ['$scope', '$http', '$uibModalInstance','$window', 'wornDeliver', 'toastr', 'confirmdialog', function ($scope, $http, $uibModalInstance, $window, wornDeliver, toastr, confirmdialog) { //修改密码
	$scope.basedata = {
		wornHttp:wornDeliver,
		httpDeliver:null,
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
    		url:'/iccs/user/updateHttpDeliver',
    		params: {
				'httpDeliver': $scope.basedata.httpDeliver,
			}     
        }).then(function (response){
            // 接口调用成功
            //console.log(response)
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
                    $uibModalInstance.close($scope.basedata.httpDeliver);
                });
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error(response.data.message,'错误');
        });             
	};

}]).controller('unbundleCtrl', ['$scope', '$http', '$uibModalInstance','$window', 'toastr', 'confirmdialog', function ($scope, $http, $uibModalInstance,$window, toastr, confirmdialog) { //修改密码
	$scope.basedata = {		
		code:''
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
    		url:'/iccs/authenticator/unBindAuthenticate',
    		data: {
				"code":$scope.basedata.code
			}     
        }).then(function (response){
            // 接口调用成功
            console.log(response)
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
                    //$uibModalInstance.close($scope.basedata.httpDeliver);
                    $window.location.href = 'login.html';
                });
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error(response.data.message,'错误');
        });             
	};

}]).controller('userDetilCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog', function ($scope, $http, $uibModalInstance, toastr, confirmdialog) { //修改密码
	$scope.basedata = {
		httpDeliver:null,
	}
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
  

}]).controller('remindDetilCtrl', ['$scope', '$http','remindInfo', '$uibModalInstance', 'toastr', 'confirmdialog', function ($scope, $http, remindInfo, $uibModalInstance, toastr, confirmdialog) { //修改密码
	$scope.basedata = remindInfo;
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
  

}]);