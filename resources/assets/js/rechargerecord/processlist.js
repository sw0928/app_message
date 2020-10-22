import commonbase from '../commonBase';

//操作充值流程   已审核->可充值
export default commonbase.controller('processlistCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', '$filter', '$window',
function ($scope, Persist, $http, toastr, $uibModal, LocalData, $filter, $window) { 
	$scope.per = Persist;
	$scope.per.rechargerecord = 'process';
	//初始化数据
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
  $scope.total = 0;
 	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $scope.getDay(-90) +' 00:00:00',
		loginName: null,
		status: "",
		currentPage: 1,
		pageSize: '10'				
	}
 	
 	//表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $scope.getDay(-90) +' 00:00:00',
			loginName: null,
			status: "",
			currentPage: 1,
			pageSize: '10',
			total:0			
		}
		$scope.getTableList();
	}
    //获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
			headers: { Authorization:LocalData.get('Authorization') },
    		method: 'POST',
    		url:'/iccs/addMoney/queryAddMoneyFlowList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate":$scope.searchdata.startDate,
				"loginName": $scope.searchdata.loginName,
				"status": $scope.searchdata.status,
				"offset": $scope.searchdata.currentPage,
				"flowType":1,
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
    
    $scope.searchTableList = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
	}
	//操作
	$scope.unaudited = (param) => {
    	let auditprocess = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/auditprocess.html',
            controller: 'auditprocessCtrl',
            appendTo:	$('.order-browse'),
            size:'lg',
            resolve: {
                FlowDetail: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/addMoney/queryAddMoneyFlow',
			    		params: {
							"seqId": param.seqId	
						}           
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){
			            	return response.data.data;
			            }else{
			            	toastr.warning(response.data.message,'槽糕');
			            }
			        }, function errorCallback(){
			            toastr.error('系统内部错误','错误');
			        });
                }
            }
        });	

        auditprocess.result.then(function (data) {
            $scope.searchTableList();
        }, function () {
            $scope.searchTableList();
        });
    }
    //已充值
    $scope.audited = (param) => {
    	let processdetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/recharge/processdetail.html',
            controller: 'processdetailCtrl',
            size:'lg',
            resolve: {
                FlowDetail: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/addMoney/queryAddMoneyFlow',
			    		params: {
							"seqId": param.seqId	
						}           
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){
			            	return response.data.data;
			            }else{
			            	toastr.warning(response.data.message,'槽糕');
			            }
			        }, function errorCallback(){
			            toastr.error('系统内部错误','错误');
			        });
                }
            }
        });	

        processdetail.result.then(function (data) {
            $scope.searchTableList();
        }, function () {
            $scope.searchTableList();
        });
    }

}]);
   