import commonbase from '../commonBase';
export default commonbase.controller('tradesCtrl', ['$scope', 'Persist','LocalData', '$http', 'toastr', '$filter', function ($scope, Persist, LocalData, $http, toastr, $filter) {
    //初始化数据
    $scope.searchdata = {
        dealDate:$filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
        endDate:$filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
        sendType:"",
        userName:'',
        currentPage:1,
        pageSize:'10',
        total:0     
    }
	Persist.expenserecordObj = {
    	"dealDate": $scope.searchdata.dealDate,
      "sendType":$scope.searchdata.sendType,
      "endDate": $scope.searchdata.endDate,                
      "userName": $scope.searchdata.userName,
      "expTitle":"交易明细",
					"exp":"true",
			"offset": 0,
			"pageSize": 0		
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.expenserecordObj = {
    	"dealDate": $scope.searchdata.dealDate,
      "sendType":$scope.searchdata.sendType,
      "endDate": $scope.searchdata.endDate,                
      "userName": $scope.searchdata.userName,
      "expTitle":"交易明细",
					"exp":"true",
			"offset": 0,
			"pageSize": 0			
    }
},true)
//获得列表数据
	$scope.getTableList = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/recharge/queryDealDetailList',
    		data: {
                "dealDate": $scope.searchdata.dealDate,
                "sendType":$scope.searchdata.sendType,
                "endDate": $scope.searchdata.endDate,
                "offset":$scope.searchdata.currentPage,
                "pageSize":$scope.searchdata.pageSize,
                "userName": $scope.searchdata.userName
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
                    Persist.ExpenseCount = $scope.searchdata.total =  response.data.data.totalCount;
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
    //表单重置
    $scope.formReset = () => {
        $scope.searchdata = {
          dealDate:$filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
        	endDate:$filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
	        dealType:"",
	        userName:'',
	        currentPage:1,
	        pageSize:'10',
        }
        $scope.getTableList();
    }


}]);
   