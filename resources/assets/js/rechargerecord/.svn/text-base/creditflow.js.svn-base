import commonbase from '../commonBase';
export default commonbase.controller('creditflowCtrl', ['$scope', 'Persist', '$http','LocalData', 'toastr', '$uibModal','$filter', '$window', function ($scope, Persist, $http, LocalData, toastr, $uibModal, $filter, $window) { 
	$scope.per = Persist;
	$scope.per.rechargerecord = 'creditflow';
	//获取时间
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
		status: '',
		userName: '',
		currentPage: 1,
		pageSize: '10',
		total:0				
	}
  //表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $scope.getDay(-90) +' 00:00:00',
			lstatus: '',
			userName: '',
			currentPage: 1,
			pageSize: '10',
			total:0			
		}
		$scope.getTableList();
	}
	$scope.total = 0;
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/extension/queryExtensionList',
    		data: {				
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"status": $scope.searchdata.status,
				"userName": $scope.searchdata.userName,
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
    //搜索第一页开始
    $scope.searchtable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
    }
    
    //授信详情
    $scope.creditDetail = (params) => {
    	let creditdetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/creditdetail.html',
						controller: 'creditdetailCtrl',
						size:'lg',
            resolve: {
            	creditDetail: function () {
            		return $http({
			    		method: 'POST',
			    		url:'/iccs/extension/queryExtensionInfo',
			    		params: {"seqId":params.seqId}	    		
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){	            	
			            	return response.data.data;
			            }
					},function(){
						
					})
            	}
            }
        });

        creditdetail.result.then(function (data) {
			$scope.searchtable();           
        }, function () {
            $scope.searchtable();
        });
	}
	
	//操作授信
	$scope.auditCredit = (params) => {
		let auditcredit = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/auditcredit.html',
						controller: 'auditcreditCtrl',
						appendTo:	$('.order-browse'),
						size:'lg',
            resolve: {
            	creditDetail: function () {
            		return $http({
			    		method: 'POST',
			    		url:'/iccs/extension/queryExtensionInfo',
			    		params: {"seqId":params.seqId}	    		
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){	            	
			            	return response.data.data;
			            }
					},function(){
						
					})
            	}
            }
        });

        auditcredit.result.then(function (data) {
			$scope.searchtable();          
        }, function () {
            $scope.searchtable();
        });
	}

}]);
   