import commonbase from '../commonBase';

export default commonbase.controller('dayachievement', ['$scope', '$uibModalInstance', 'toastr', '$http', 'userInfo', '$filter','Persist', function ($scope, $uibModalInstance, toastr, $http, userInfo, $filter, Persist) { //每天业绩

	//初始化数据
    $scope.searchdata = {
    	startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
    	endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			currentPage: 1,
			pageSize: '10',
			total: 0
	}	
    //列表数据
	$scope.userlistdata = null;
	//导出
	$scope.importUserBalance = () => {
		$http({
    		method: 'POST',
    		url:'/iccs/statement/queryDayPerformanceList',
    		data: {
					"endDate": $scope.searchdata.endDate,
					"startDate": $scope.searchdata.startDate,
					"offset": 0,
					"pageSize": 0,
					"expTitle":"日业绩统计",
					"exp":"true",
					"userId":userInfo.userId
			},			
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
	//获取列表
	$scope.getDatalist = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/statement/queryDayPerformanceList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"offset": $scope.searchdata.currentPage,
				"pageSize": parseInt($scope.searchdata.pageSize),
				"userId":userInfo.userId	
			}           
        }).then(function (response){
            // 接口调用成功
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.tablelist = response.data.data;
            	if(response.data.data){
            		$scope.searchdata.total = response.data.data.totalCount;
            	}            	
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
	}	
	//初始获取数据
	$scope.getDatalist();
	
	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getDatalist();
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close('true');
    };
    
}]).controller('personachievement', ['$scope', '$uibModalInstance', 'toastr', '$http', 'userInfo', '$filter', function ($scope, $uibModalInstance, toastr, $http, userInfo, $filter) { //每人业绩
	//初始化数据
    $scope.searchdata = {
    	startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
    	endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			currentPage: 1,
			pageSize: '10',
			total:0	
    }
    //重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
    	endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			currentPage: 1,
			pageSize: '10',
		}
		$scope.getDatalist();
	}
    //列表数据
	$scope.listdata = null;
	//查询列表列表
	$scope.getDatalist = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/statement/queryOnlyOnePerformanceList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize,
				"userId":userInfo.userId
			}           
        }).then(function (response){
            // 接口调用成功
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.tablelist = response.data.data;
            	if(response.data.data){
            		$scope.searchdata.total = response.data.data.totalCount;
            	}            	
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
	}	
	//初始获取数据
	$scope.getDatalist();
	
	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getDatalist();
	}
	
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close('true');
    };
    
}]).controller('subclientCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'userInfo', function ($scope, $http, $uibModalInstance, toastr, userInfo) { //子客户
	$scope.loginName = userInfo.loginName;
    //初始化数据
    $scope.searchdata = {
		currentPage: 1,
		pageSize: '10',
		total:0	
    }
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close('true');
	};

	$scope.dealAccountType = (type) => {
		if(type == 1){
			return '管理员';
		}
		if(type == 2){
			return '财务';
		}
		if(type == 3){
			return '运营';
		}
		if(type == 4){
			return '销售总监';
		}
		if(type == 5){
			return '销售经理';
		}
		if(type == 6){
			return '客户经理';
		}
		if(type == 7){
			return '代理商';
		}
		if(type == 8){
			return '客户';
		}
	}
	
    //查询列表列表
	$scope.getDatalist = () => {
		$http({
    		method: 'POST',
    		url:'/iccs/user/queryChildUser',
    		data: {
				"offset": $scope.searchdata.currentPage,
  				"pageSize": $scope.searchdata.pageSize,
  				"parentId": userInfo.userId
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	$scope.tablelist = response.data.data;
            	if(response.data.data){
            		$scope.searchdata.total = response.data.data.totalCount;
            	}            	
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
	}
	$scope.getDatalist();

	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getDatalist();
	}

}]).controller('clientspec', ['$scope', '$uibModalInstance', 'toastr', function ($scope, $uibModalInstance, toastr) { //客户规格
    
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close('true');
    };
    
}])