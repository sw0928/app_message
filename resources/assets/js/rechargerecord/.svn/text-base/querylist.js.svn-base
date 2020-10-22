import commonbase from '../commonBase';
export default commonbase.controller('querylistCtrl', ['$scope', '$http', 'Persist', 'LocalData', 'toastr', '$uibModal', '$state', '$filter', '$window',
function ($scope, $http, Persist, LocalData, toastr, $uibModal, $state, $filter, $window) {
	let Userinfo = LocalData.getObject('userInfo');
	$scope.per = Persist;
	if(Userinfo.accountType == 8){
		$scope.per.asideswitch = '';
	}
	$scope.per.rechargerecord = 'querylist';
	$scope.getDay = (day) => {
    //Date()返回当日的日期和时间。
    var days = new Date();
    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
    var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
    //setTime()以毫秒设置 Date 对象。
    days.setTime(gettimes);
    var year = days.getFullYear();
    var month = days.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var today = days.getDate();
    if(today<10){
        today="0"+today;
    }
    return year + "-" + month + "-" + today;
	}
    //初始化数据
    $scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $scope.getDay(-90) +' 00:00:00',
		currentPage: 1,
		pageSize: '10',
		fromUserName: null,
		toUserName: null,
		total:0
	}
    Persist.rechargeObj = {
    	"endDate": $scope.searchdata.endDate,
			"startDate": $scope.searchdata.startDate,
			"fromUserName": $scope.searchdata.fromUserName,
			"toUserName": $scope.searchdata.toUserName,
			"expTitle":"充值记录",
			"exp":"true",
			"offset": 0,
			"pageSize": 0
    }
  $scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.rechargeObj = {
    	"endDate": $scope.searchdata.endDate,
			"startDate": $scope.searchdata.startDate,
			"fromUserName": $scope.searchdata.fromUserName,
			"toUserName": $scope.searchdata.toUserName,
			"expTitle":"充值记录",
					"exp":"true",
			"offset": 0,
			"pageSize": 0
    }
},true)
	//表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $scope.getDay(-90) +' 00:00:00',		
			currentPage: 1,
			pageSize: '10',
			fromUserName: null,
			toUserName: null,
			total:0
		}  
		$scope.getTableList();
	}
	
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/addMoney/queryAddMoneyRecordList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				"fromUserName": $scope.searchdata.fromUserName,
				"toUserName": $scope.searchdata.toUserName,
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
            		Persist.RechargeCount = $scope.searchdata.total = response.data.data.totalCount;
            	}
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
    }
    $scope.getTableList();
    
    $scope.searchtable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
    }


}]);