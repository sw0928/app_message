import commonbase from '../commonBase';
export default commonbase.controller('timingtable', ['$scope', '$http', 'Persist','confirmdialog', 'toastr', '$uibModal', 'LocalData', '$filter', '$window',
function ($scope, $http, Persist, confirmdialog, toastr, $uibModal, LocalData, $filter, $window) {
	$scope.per = Persist;
    //初始化数据
  $scope.per.ordercord = 'timingtable';
   $scope.tablelistdata = null;
   $scope.current = LocalData.get('current')
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		loginName: '',
		msgContent: '',
		orderState: "",
		currentPage: 1,
		pageSize: '10',
		total:0
	}
	Persist.orderObj = {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"msgContent": $scope.searchdata.msgContent,
				"orderState": $scope.searchdata.orderState,
				"expTitle":"定时列表",
				"exp":"true",
				"offset": 0,				
				"pageSize": 0
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.orderObj = {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"msgContent": $scope.searchdata.msgContent,
				"orderState": $scope.searchdata.orderState,
				"expTitle":"定时列表",
				"exp":"true",
				"offset": 0,				
				"pageSize": 0
    }
},true)
	//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
			loginName: '',
			msgContent: '',
			orderState: "",
			currentPage: 1,
			pageSize: '10'
		}
		$scope.searchTable();
	}
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/order/queryTimingOrderList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"msgContent": $scope.searchdata.msgContent,
				"orderState": $scope.searchdata.orderState,
				"offset": $scope.searchdata.currentPage,				
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
            		$scope.per.OrederCount = $scope.searchdata.total = response.data.data.totalCount;
            	}
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
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
            templateUrl: '../../resources/views/order/detailTime.html',
            controller: 'orderDetailTimeCtrl',
            size:'sm',
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
	
	//取消订单
	$scope.cancelOrder = (orderInfo) => {
		let orderDetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/order/cancel.html',
            controller: 'orderCancelCtrl',
            size:'sm',
            resolve: {
                orderInfo:function () {
					return orderInfo;	
				}
            }
        });

        orderDetail.result.then(function (data) {
            $scope.searchTable()
        }, function () {
            $scope.searchTable()
        });
	}
}]).controller('orderCancelCtrl', ['$scope', '$uibModalInstance', 'toastr', 'orderInfo', '$http', function ($scope, $uibModalInstance, toastr, orderInfo, $http) { //订单详情   
	// 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    $scope.searchdata = {
		orderId: orderInfo.orderId?orderInfo.orderId:'',
		cancelDesc: '',		
	}
    // 确定
    $scope.ensure = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/order/cancelTimingOrder',
    		data: {
				"orderId": $scope.searchdata.orderId,
				"cancelDesc": $scope.searchdata.cancelDesc,	
				"onTime":1
			}   
        }).then(function (response){
            // 接口调用成功            
            console.log(response)
            if(response.data.statusCode === 200){
            	$uibModalInstance.close(true);       
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
         
	};	
}]).controller('orderDetailTimeCtrl', ['$scope', '$uibModalInstance', 'toastr', 'orderInfo', '$http', function ($scope, $uibModalInstance, toastr, orderInfo, $http) { //订单详情
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
		orderId: orderInfo.orderId?orderInfo.orderId:'',
		phone: '',
		currentPage: 1,
		pageSize: '10'	
	}
		//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			orderId: orderInfo.orderId?orderInfo.orderId:'',
			phone: '',		
			currentPage: 1,
			pageSize: '10',
			
		}
		$scope.getTableList();
	}
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;		
			$http({
				method: 'POST',
				url:'/iccs/order/queryTimingOrderPhoneList',
				data: {
					"offset": $scope.searchdata.currentPage,
					"orderId": $scope.searchdata.orderId,
					"pageSize": $scope.searchdata.pageSize,
					"phone": $scope.searchdata.phone,					
				}           
			}).then(function (response){
				// 接口调用成功				
				$scope.showloading= 1;
				if(response.data.statusCode === 200){				
					$scope.tablelistdata = response.data.data.data;
					console.log($scope.tablelistdata)
					if(response.data.data){
						$scope.total = response.data.data.totalCount;
					}            	
				}else{
					toastr.warning(response.data.message,'槽糕');
				}
			});  	
    }
    
    $scope.getTableList();    
    $scope.searchTable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
    }


}]);
   