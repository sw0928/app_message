import commonbase from '../commonBase';
export default commonbase.controller('uplinktable', ['$scope', '$http', 'Persist', 'toastr', '$uibModal', 'LocalData', '$filter', '$window',
function ($scope, $http, Persist, toastr, $uibModal, LocalData, $filter, $window) {
	$scope.per = Persist;
	 $scope.per.ordercord = 'uplinktable';
	//初始化数据
    $scope.tablelistdata = null;
    $scope.total = 0;
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		loginName: '',
		phone: '',
		currentPage: 1,
		pageSize: '10'
	}
	Persist.orderObj = {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.phone,
				"expTitle":"上行列表",
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
				"phone": $scope.searchdata.phone,
				"expTitle":"上行列表",
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
			phone: '',
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
    		url:'/iccs/order/queryUpriverList', 
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.phone,
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
}]);
   