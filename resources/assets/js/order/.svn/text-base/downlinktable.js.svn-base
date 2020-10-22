import commonbase from '../commonBase';
export default commonbase.controller('downlinktable', ['$scope', '$http', 'Persist', 'LocalData', 'toastr', '$filter', function ($scope, $http, Persist, LocalData, toastr, $filter,) {
	$scope.per = Persist;
	 $scope.per.ordercord = 'downlinktable';
	//初始化数据
    $scope.tablelistdata = null;
    $scope.per.OrederCount = 0;
    $scope.startTime = null;
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		loginName: '',
		phone: '',
		receiptStatus:'',
		smsConten:'',
		currentPage: 1,
		pageSize: '10'
	}
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
	var end = laydate.render({
			  elem: '#downenddate'
			  ,type: 'datetime'
			  ,value: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59' //必须遵循format参数设定的格式
			  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合
				//,min: -0 //7天前
	  		//,max: $scope.getDay(0)+' 23:59:59' //7天后
	});
	var start = laydate.render({
	  elem: '#downstartdate'
	  ,type: 'datetime'
	  ,value: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00' //必须遵循format参数设定的格式
	  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合
	  //,max: $scope.getDay(0)+' 23:59:59'
	  ,done: function(value, date, endDate){
//	  	if($scope.searchdata.phone != ''){
//	  		 var myDate=new Date(value);
//						myDate.setDate(myDate.getDate()+29);	
//						var endTime = myDate.getFullYear()+'-' + (myDate.getMonth()+1) +'-' +myDate.getDate() + ' 23:59:59';
//				    laydate.render({
//						  elem: '#downenddate'
//						  ,type: 'datetime'
//						  ,value:  endTime//必须遵循format参数设定的格式
//						  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合			
//						});
//				    end.config.min = {
//				    	year:date.year,
//			        month:date.month-1, 
//			        date: date.date
//				    };
//				    end.config.max = {
//				    	year:myDate.getFullYear(),
//			        month:myDate.getMonth(), 
//			        date: myDate.getDate(),
//			        hours:23,
//			        minutes:59,
//			        seconds:59,
//				    }
//	  	}else{
//	  		var myDate=new Date(value);
//						myDate.setDate(myDate.getDate()+6);	
//						var endTime = myDate.getFullYear()+'-' + (myDate.getMonth()+1) +'-' +myDate.getDate() + ' 23:59:59';
//				    laydate.render({
//						  elem: '#downenddate'
//						  ,type: 'datetime'
//						  ,value:  endTime//必须遵循format参数设定的格式
//						  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合			
//						});
//				    end.config.min = {
//				    	year:date.year,
//			        month:date.month-1, 
//			        date: date.date
//				    };
//				    end.config.max = {
//				    	year:myDate.getFullYear(),
//			        month:myDate.getMonth(), 
//			        date: myDate.getDate(),
//			        hours:23,
//			        minutes:59,
//			        seconds:59,
//				    }
//	  	}
	    
	  }
	});
	//重置表单
	$scope.resetFrom = () => {
		$('#downenddate').val($scope.getDay(0) +' 23:59:59');
		$('#downstartdate').val($scope.getDay(0) +' 00:00:00')
		$scope.searchdata = {			
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
			loginName: '',
			phone: '',
			receiptStatus:'',
			smsConten:'',
			currentPage: 1,
			pageSize: '10',
			total:0
		}
		$scope.searchTable();
	}
		Persist.orderObj = {
				"endDate": $('#downenddate').val()?$('#downenddate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
				"startDate": $('#downstartdate').val()?$('#downstartdate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.phone,
				"receiptStatus": $scope.searchdata.receiptStatus,
				"smsContent": $scope.searchdata.smsConten,
				"expTitle":"下行列表",
				"exp":"true",
				"offset": 0,				
				"pageSize": 0
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.orderObj = {
				"endDate": $('#downenddate').val()?$('#downenddate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
				"startDate": $('#downstartdate').val()?$('#downstartdate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.phone,
				"receiptStatus": $scope.searchdata.receiptStatus,
				"smsContent": $scope.searchdata.smsConten,
				"expTitle":"下行列表",
				"exp":"true",
				"offset": 0,				
				"pageSize": 0
    } 
		
},true)
//$scope.$watch("searchdata.phone", function(n, o){
//  if(n == o){
//      return;
//  }else{
//  	$scope.getTimeChange($scope.searchdata.phone)
//  }
//		
//},true)
//时间变化函数
$scope.getTimeChange = (val) => {
	if( val != ''){
	  		 var myDate=new Date($('#downstartdate').val());
						myDate.setDate(myDate.getDate()+29);	
						var endTime = myDate.getFullYear()+'-' + (myDate.getMonth()+1) +'-' +myDate.getDate() + ' 23:59:59';
				    laydate.render({
						  elem: '#downenddate'
						  ,type: 'datetime'
						  ,value:  endTime//必须遵循format参数设定的格式
						  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合			
						});
				    end.config.max = {
				    	year:myDate.getFullYear(),
			        month:myDate.getMonth(), 
			        date: myDate.getDate(),
			        hours:23,
			        minutes:59,
			        seconds:59,
				    };
	  	}else{
	  		var myDate=new Date($('#downstartdate').val());
						myDate.setDate(myDate.getDate()+6);	
						var endTime = myDate.getFullYear()+'-' + (myDate.getMonth()+1) +'-' +myDate.getDate() + ' 23:59:59';
				    laydate.render({
						  elem: '#downenddate'
						  ,type: 'datetime'
						  ,value:  endTime//必须遵循format参数设定的格式
						  ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合			
						});
				    end.config.max = {
				    	year:myDate.getFullYear(),
			        month:myDate.getMonth(), 
			        date: myDate.getDate(),
			        hours:23,
			        minutes:59,
			        seconds:59,
				    };
	  	}
}
	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/order/queryDownriverList',
    		data: {
				"endDate": $('#downenddate').val()?$('#downenddate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
				"startDate": $('#downstartdate').val()?$('#downstartdate').val():$filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
				"loginName": $scope.searchdata.loginName,
				"phone": $scope.searchdata.phone,
				"receiptStatus": $scope.searchdata.receiptStatus,
				"smsContent": $scope.searchdata.smsConten,
				"offset": $scope.searchdata.currentPage,				
				"pageSize": $scope.searchdata.pageSize			
			}   
        }).then(function (response){
	        	if(response.headers("Authorization") != null){
	            	LocalData.set('Authorization',response.headers("Authorization"));
	            }  
        		$scope.showloading= 1;
            // 接口调用成功
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
    	if($scope.searchdata.phone != ''){
	  		if(new Date($('#downenddate').val()).getTime() - new Date($('#downstartdate').val()).getTime() > 2592000000){
	  			toastr.warning('输入手机号时，时间间隔不能超过30天！','槽糕');
	  		}else{
	  			$scope.getTableList();   
	  		}
				
	  	}else{
	  		if(new Date($('#downenddate').val()).getTime() - new Date($('#downstartdate').val()).getTime() > 604800000){
	  			toastr.warning('只有时间查询时，时间间隔不能超过7天，输入手机号，不能超过30天！','槽糕');
	  		}else{
	  			$scope.getTableList();   
	  		}			
	  	}
    	    	        	
    }
}]);
   