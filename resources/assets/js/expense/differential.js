import commonbase from '../commonBase';
export default commonbase.controller('differentialCtrl', ['$scope', 'Persist', 'LocalData', '$http', 'toastr', '$uibModal', 'confirmdialog', '$filter',
function ($scope, Persist, LocalData, $http, toastr, $uibModal, confirmdialog, $filter) {
    //初始化数据
    $scope.searchdata = {
        startDate:$filter("date")(new Date(), "yyyy-MM-dd")+' 00:00:00',
        endDate:$filter("date")(new Date(), "yyyy-MM-dd")+' 23:59:59',
        currentPage:1,
        pageSize:'10',
        total:0     
    }
	Persist.expenserecordObj = {
    	"startDate": $scope.searchdata.startDate,             
      "endDate": $scope.searchdata.endDate,
      "expTitle":"差价返还",
					"exp":"true",
			"offset": 0,
			"pageSize": 0	
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.expenserecordObj = {
    	"startDate": $scope.searchdata.startDate,             
      "endDate": $scope.searchdata.endDate,
      "expTitle":"差价返还",
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
    		url:'/iccs/recharge/queryPriceSpreadList',
    		data: {
                "startDate": $scope.searchdata.startDate,             
                "endDate": $scope.searchdata.endDate,
                "offset":$scope.searchdata.currentPage,
                "pageSize":$scope.searchdata.pageSize                
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
            startDate:$filter("date")(new Date(), "yyyy-MM-dd")+' 00:00:00',
        		endDate:$filter("date")(new Date(), "yyyy-MM-dd")+' 23:59:59',
		        currentPage:1,
		        pageSize:'10',
        }
        $scope.getTableList();
    }
    
    //退还差价
	$scope.refund = () => {
		confirmdialog.showdialog('确定核对正确，生成充值流程!').then(function(){
			confirmdialog.successdialog('申请退款成功！').then(function(){			
			
			});			
		},function(){
			
		});
	}

}]);
   