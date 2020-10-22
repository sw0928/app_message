import commonbase from '../commonBase';
export default commonbase.controller('ordertable', ['$scope', 'Persist', '$http', 'LocalData', '$filter', 'toastr', '$uibModal', 'SysPermission', function ($scope, Persist, $http,LocalData, $filter, toastr, $uibModal, SysPermission) {
	$scope.per = Persist;	
	$scope.per.ordercord = 'ordertable';
	$scope.tablelistdata = null;
	$scope.SysPermission = SysPermission;
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		loginName: '',
		mobileNumber:'',
		msgContent: '',
		currentPage: 1,
		pageSize: '10',
		queryType: 0,
		sendType: '',
		total:0
	}
	Persist.orderObj = {
    	"startDate": $scope.searchdata.startDate,
			"endDate": $scope.searchdata.endDate,
			"loginName": $scope.searchdata.loginName,
			"mobileNumber": $scope.searchdata.mobileNumber,
			"msgContent": $scope.searchdata.msgContent,
			"offset": 0,
			"pageSize": 0,
			"expTitle":"订单列表",
				"exp":"true",
			"queryType": parseInt($scope.searchdata.queryType),
			"sendType": $scope.searchdata.sendType
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.orderObj = {
    	"startDate": $scope.searchdata.startDate,
			"endDate": $scope.searchdata.endDate,
			"loginName": $scope.searchdata.loginName,
			"mobileNumber": $scope.searchdata.mobileNumber,
			"msgContent": $scope.searchdata.msgContent,
			"offset": 0,
			"pageSize": 0,
			"expTitle":"订单列表",
				"exp":"true",
			"queryType": parseInt($scope.searchdata.queryType),
			"sendType": $scope.searchdata.sendType
    }
},true)
	//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
			loginName: '',
			mobileNumber:'',
			msgContent: '',
			currentPage: 1,
			pageSize: '10',
			queryType: 0,
			sendType: ''
		}
		$scope.searchTable();
	}
	
		
	//获取订单列表
	let getOrderTableList = () => {
		//console.log($scope.searchdata.startDate);	
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/order/queryOrderList',
    		data: {				
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"mobileNumber": $scope.searchdata.mobileNumber,
				"msgContent": $scope.searchdata.msgContent,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize,
				"queryType": parseInt($scope.searchdata.queryType),
				"sendType": $scope.searchdata.sendType			
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
            		$scope.per.OrederCount = $scope.searchdata.total = response.data.data.totalCount;
            	}            	
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
	}
	
	//获取历史订单接口
	let gethistoryTableList = () => {
		$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/order/querySendHistoryList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate":$scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.mobileNumber,				
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
			}           
        }).then(function (response){
            // 接口调用成功
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.tablelistdata = response.data.data;
            	if(response.data.data){
            		$scope.total = response.data.data.totalCount;
            	}            	
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
    }
    //获取列表数据
    $scope.getTableList = () => {
		if($scope.searchdata.queryType == 2){
			gethistoryTableList();
		}else{
			getOrderTableList();
		}    	
    }
    
    $scope.getTableList();
    
    $scope.searchTable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
	}
    
    //查看
    $scope.showDetail = (orderInfo) => {
    	let orderDetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/order/detail.html',
            controller: 'orderDetailCtrl',
            appendTo:	$('.order-browse'),
            size:'xl',
            resolve: {
                orderInfo:function () {
					return orderInfo;	
				}
            }
        });

        orderDetail.result.then(function (data) {
            
        }, function () {
            
        });
    }
}]).controller('orderDetailCtrl', ['$scope', '$uibModalInstance', 'toastr', 'orderInfo', '$http', function ($scope, $uibModalInstance, toastr, orderInfo, $http) { //订单详情
   $scope.tabletype = 1;
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
	$scope.searchdata = {
		orderSn: orderInfo.orderSn?orderInfo.orderSn:orderInfo.createSn,
		phone: '',
		status: '',		
		currentPage: 1,
		pageSize: '10'	
	}
		//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			orderSn: orderInfo.orderSn?orderInfo.orderSn:orderInfo.createSn,
			phone: '',
			status: '',	
			currentPage: 1,
			pageSize: '10',
			
		}
		$scope.getTableList();
	}
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
		if($scope.tabletype == 1){
			$http({
				method: 'POST',
				url:'/iccs/order/queryOrderInfoList',
				data: {
					"offset": $scope.searchdata.currentPage,
					"orderSn": $scope.searchdata.orderSn,
					"pageSize": $scope.searchdata.pageSize,
					"phone": $scope.searchdata.phone,
					"status": $scope.searchdata.status			
				}           
			}).then(function (response){
				// 接口调用成功
				$scope.showloading= 1;
				if(response.data.statusCode === 200){
					$scope.tablelistdata = response.data.data;
					if(response.data.data){
						$scope.total = response.data.data.totalCount;
					}            	
				}else{
					toastr.warning(response.data.message,'槽糕');
				}
			});
		}else{
			$http({
				method: 'POST',
				url:'/iccs/order/queryAnswerList',
				data: {
					"offset": $scope.searchdata.currentPage,
					"orderSn": $scope.searchdata.orderSn,
					"pageSize": $scope.searchdata.pageSize,
					"phone": $scope.searchdata.phone		
				}           
			}).then(function (response){
				// 接口调用成功
				$scope.showloading= 1;
				if(response.data.statusCode === 200){
					$scope.tablelistdata = response.data.data;
					if(response.data.data){
						$scope.total = response.data.data.totalCount;
					}            	
				}else{
					toastr.warning(response.data.message,'槽糕');
				}
			});
		}    	
    }
    
    $scope.getTableList();
    
    $scope.searchTable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
    }


}]);
   