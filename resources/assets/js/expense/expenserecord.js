import commonbase from '../commonBase';
export default commonbase.controller('expenserecordCtrl', ['$scope', '$http', 'Persist', '$state', '$uibModal', 'SysPermission', function ($scope,$http, Persist, $state, $uibModal, SysPermission) {
	$scope.per = Persist;
	$scope.per.asideswitch = 6;
	$scope.per.showLeft = 1;
    $scope.per.navmodel = 'expensemodule';
    $scope.SysPermission = SysPermission;
    //默认跳转该页面(根据权限判断)
    $scope.pageSkipping = () => {
        if($scope.SysPermission.showTrades()){ //交易明细
            $state.go("expenserecord.trades");
            return false;
        }
        if($scope.SysPermission.showDifferential()){ //差价返还
            $state.go("expenserecord.differential");
            return false;
        }
    }
        //
    $scope.importsOrder = (swUrl) => {
    	$http({
	    		method: 'POST',
	    		url:swUrl,
	    		data: Persist.expenserecordObj,
					//responseType: 'arraybuffer'  
	        }).then(function (response){
	            // 接口调用成功
	            if(response.status === 200){
	            	setTimeout(function(){
            		Persist.download(response.data.data.expTaskId);
            	},1000)
            	        
	            }else{
	            	toastr.warning(response.data.message,'槽糕');
	            }
	        });
    }
    //导出
		$scope.importUserBalance = () => {	
			if(window.location.hash.indexOf('trades') > 0){
				$scope.importsOrder('/iccs/recharge/queryDealDetailList')
			}
			if(window.location.hash.indexOf('differential') > 0){
				$scope.importsOrder('/iccs/recharge/queryPriceSpreadList')
			}			
		}
    //$scope.pageSkipping();   

}]);
   