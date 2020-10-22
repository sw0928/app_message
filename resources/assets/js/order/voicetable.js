import commonbase from '../commonBase';
export default commonbase.controller('voicetable', ['$scope', 'Persist', '$http', 'LocalData', '$filter', 'toastr', '$uibModal', 'confirmdialog','SysPermission', function ($scope, Persist, $http,LocalData, $filter, toastr, $uibModal,confirmdialog, SysPermission) {
	$scope.per = Persist;	
	$scope.per.ordercord = 'voicetable';
	$scope.tablelistdata = null;
	$scope.SysPermission = SysPermission;
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		msgContent: '',
		reciverMsisn: '',
		userName: '',
		currentPage: 1,
		pageSize: '10',
		total:0
	}
	Persist.orderObj = {
    	"startDate": $scope.searchdata.startDate,
			"endDate": $scope.searchdata.endDate,
			"msgContent": $scope.searchdata.msgContent,		
			"reciverMsisn": $scope.searchdata.reciverMsisn,		
			"userName": $scope.searchdata.userName,	
			"offset": 0,
			"pageSize": 0,
			"expTitle":"语音列表",
			"exp":"true",			
    }
	$scope.$watch("searchdata", function(n, o){
    if(n == o){
        return;
    }
    Persist.orderObj = {
    	"startDate": $scope.searchdata.startDate,
			"endDate": $scope.searchdata.endDate,
			"msgContent": $scope.searchdata.msgContent,		
			"reciverMsisn": $scope.searchdata.reciverMsisn,		
			"userName": $scope.searchdata.userName,		
			"offset": 0,
			"pageSize": 0,
			"expTitle":"语音列表",
			"exp":"true",	
    }
},true)
	//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
			msgContent: '',
		  reciverMsisn: '',
		  userName: '',
			currentPage: 1,
			pageSize: '10',
		}
		$scope.searchTable();
	}
	
		
	//获取订单列表
	let getOrderTableList = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/voice/queryVoiceBill',
    		data: {				
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				'msgContent': $scope.searchdata.msgContent,
		    'reciverMsisn': $scope.searchdata.reciverMsisn,
		    'userName': $scope.searchdata.userName,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize,	
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.tablelistdata = response.data;
            	if(response.data.data){
            		$scope.per.OrederCount = $scope.searchdata.total = response.data.data.totalCount;
            	}            	
            }else{
            	$scope.showloading= 1;
            	toastr.warning(response.data.message,'槽糕');
            }
        });
	}
	
    //获取列表数据
    $scope.getTableList = () => {
			getOrderTableList();    	
    }
    $scope.getTableList();
    
    $scope.searchTable = () => {
    	$scope.searchdata.currentPage = 1;
    	$scope.getTableList();
	};   

}]).controller('importVoiceCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog','$window',
function ($scope, $http, $uibModalInstance, toastr, confirmdialog,$window) { //导入语音
    $scope.multipartFile = null;
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    // 确定
    $scope.ensure = () => {		
    	//console.log($scope.multipartFile)
				var form = new FormData();
				form.append('multipartFile', $scope.multipartFile);
        $http({
    		method: 'POST',
    		url:'/iccs/voice/uploadVoice',
				data: form,
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
        	}).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
								$uibModalInstance.close(true);
							//$window.location.reload();
							}); 
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        });
    };

}]).controller('voiceDetilCtrl', ['$scope', '$uibModalInstance', 'confirmdialog','LocalData',  'toastr', 'orderInfo', '$http', function ($scope, $uibModalInstance, confirmdialog, LocalData, toastr, orderInfo, $http) { //订单详情
   $scope.tabletype = 1;
   $scope.basedata = orderInfo;
   $scope.audioShow = false;
   //console.log($scope.basedata)
	// 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
          
    };
//   var tempwindow = window.open('_blank');
//   tempwindow.location = url;
//   $http({
//  		method: 'POST',
//  		url:'/iccs/voice/download',
//  		data: {				
//				"voiceName": $scope.basedata.voiceName,
//				}           
//     }).then(function (response){
//     		 // 接口调用成功
//     		 	$scope.showloading= 1;
//          if(response.headers("Authorization") != null){
//          	LocalData.set('Authorization',response.headers("Authorization"));
//          } 
////          if(response.data.statusCode === 200){
////          	console.log(response) 
////          }else{
////          	toastr.warning(response.data.message,'槽糕');
////          }
//        let page = window.open();
//          let html="<body style='background:black'><div style='width:25%;margin:200px auto;'><audio controls width='100%' autoplay src='"+ response.data + "'></audio> </div></body>"
//          page.document.write(html);    
//      });
    // 试听
    $scope.audition = () => {
    	$scope.audioShow = true;    	
  	  //let page = window.open();
  	  let url = '/iccs/voice/download?fileName=' + $scope.basedata.voiceName + "&Authorization=" + LocalData.get('Authorization');
//      let html="<body style='background:black'><div style='width:25%;margin:200px auto;'><audio controls width='100%' autoplay src='"+ url + "'></audio> </div></body>"
//      page.document.write(html);
			$scope.andioUrl = url;
   };
    // 通过
    $scope.ensure = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/voice/checkVoice',
    		data: {				
				"voiceName": $scope.basedata.voiceName,
				"status": 1
				}           
        }).then(function (response){
            // 接口调用成功
            if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	//console.log(response)              	
            	confirmdialog.successdialog(response.data.message).then(function() {
								$uibModalInstance.close(true);
							});
            }else{
            	$scope.showloading= 1;
            	toastr.warning(response.data.message,'槽糕');
            }
        });
               
	};
		// 拒绝
    $scope.refuse = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/voice/checkVoice',
    		data: {				
				"voiceName": $scope.basedata.voiceName,
				"status": 2
				}           
        }).then(function (response){
            // 接口调用成功
            if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	//console.log(response)    
            	confirmdialog.successdialog(response.data.message).then(function() {
								$uibModalInstance.close(true);
							}); 
            }else{
            	$scope.showloading= 1;
            	toastr.warning(response.data.message,'槽糕');
            }
        });
              
	};

}]);
   