import commonbase from '../commonBase';

export default commonbase.controller('signatureapplyCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'confirmdialog', 'LocalData',
function ($scope, Persist, $http, toastr, $uibModal, confirmdialog, LocalData) {
	$scope.per = Persist;
	$scope.per.asideswitch = 8;
	$scope.per.navmodel = 'signaturemodule';
	$scope.per.showLeft = 1;
	//console.log($scope.per)
	//初始化数据
	$scope.tablelistdata = null;
	$scope.searchdata = {
		loginName: null,
		signName: null,
		review:null,
		currentPage: 1,
		pageSize: '10',
		total:0
	}
	
	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			loginName: null,
			signName: null,
			review:null,
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
    		method: 'POST',
    		url:'/iccs/signature/signatureList',
    		data: {
				"loginName": $scope.searchdata.loginName,
				"review":$scope.searchdata.review,
				"signName": $scope.searchdata.signName,				
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
            	$scope.searchdata.total = response.data.data.totalCount;
            }else{
            	toastr.warning('出了点小问题','槽糕');
            }
        });
    }
    $scope.getTableList();
    
    $scope.searchTable = () => {
    	$scope.searchdata.currentPage = 1;
    	 $scope.getTableList();
    }
	
	//申请签名
    $scope.addsignApply = () => {
    	let addsignapply = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/signature/addsignature.html',
            controller: 'addsignApply',
            size:'lg',
            resolve:{
            	CustTradeList:function () {
	            	return $http({
			    		method: 'GET',
			    		url:'/iccs/signature/getTrade'
			        }).then(function (response){
			            if(response.data.statusCode === 200){
			            	return response.data.data;  	
			            }
			        });
	            }
            }
        });

        addsignapply.result.then(function (data) {            
			$scope.getTableList();
        }, function () {
           	
        });
    }
    //删除签名
    $scope.deletesign = (param) => {
    	confirmdialog.showdialog('您确认要删除该签名么？').then(function(){
			//确定
			$http({
	    		method: 'POST',
	    		url:'/iccs/signature/removeSignature',
	    		params: {"signId":param.signId}	    		
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){	            	
					$scope.getTableList();
	            }else{
	            	toastr.warning(response.data.message,'槽糕');
	            }
			})
	    });
    }

}]).controller('addsignApply', ['$scope', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'confirmdialog', 'CustTradeList',
function ($scope, $http, $uibModalInstance, toastr, LocalData, confirmdialog, CustTradeList) { //申请签名
    $scope.industryCategory = CustTradeList;    
    $scope.signature = {
    	blocCustomerName:'',
    	blocTrade:null,
    	extensionNumber:'',
    	remark:'',
    	signName:'',
    	userName:null,
    	userId:null
    };
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
		$http({
				method: 'POST',
				url: '/iccs/user/queryUserName',
				params: {
					loginName: ''
				}
			}).then(function(response) {
				// 接口调用成功
				//console.log(response)
				if(response.data.statusCode === 200) {
					$scope.options = response.data.data
					$scope.signature.userId = response.data.data[0].userId
				} else {
					toastr.warning('出了点小问题', '槽糕');
				}
			}, function errorCallback() {
				toastr.error('系统内部错误', '错误');
			});
    // 确定
    $scope.ensure = () => {        
        $http({
    		method: 'POST',
    		url:'/iccs/signature/signatureApply',
    		data: JSON.stringify({
				"blocCustomerName": $scope.signature.blocCustomerName,
				"blocTrade":$scope.signature.blocTrade?$scope.signature.blocTrade.trade_id:null,
				"extensionNumber": $scope.signature.extensionNumber,				
				"remark": $scope.signature.remark,
				"signName": $scope.signature.signName,
				"userId":$scope.signature.userId
			})           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
					$uibModalInstance.close('true');
				},function(){
					
				});      	
            }else{
				confirmdialog.errordialog(response.data.message).then(function(){
					$uibModalInstance.close('true');
				},function(){
				
				});
            }
        });
    };
    
}]);
   