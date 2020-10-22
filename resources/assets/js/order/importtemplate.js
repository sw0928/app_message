import commonbase from '../commonBase';
import $ from 'jquery';

export default commonbase.controller('importtemplateCtrl', ['$scope', '$uibModalInstance', 'toastr', '$uibModal', '$http', 'confirmdialog', function ($scope, $uibModalInstance, toastr, $uibModal, $http, confirmdialog) { //导入模板
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close(true);        
	};
    //导入内容模板
	$scope.importNumAndCont = (modelType,files,target) => {
		var form = new FormData();
		var file = files[0];
		form.append('multipartFile', file);
        form.append('modelType', modelType);
        target.value = null;
		$http({
    		method: 'POST',
			url:'/iccs/message/importModel',
			data: form,
			headers: {'Content-Type': undefined},
			transformRequest: angular.identity
        }).then(function (response){
			// 接口调用成功
            if(response.data.statusCode === 200){			
            	confirmdialog.successdialog(response.data.message).then(function(){
					$uibModalInstance.close(true);
				});
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error('系统内部错误','错误');
		});
	}
	
    //查看详细说明
    $scope.showDetail = () => {
    	let showInfo = $uibModal.open({
            animation: true,
            templateUrl: 'templateDes.html',
            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance){
            	$scope.cancel = () => {
			        $uibModalInstance.dismiss({$value: 'cancel'});
			    };
            }]
        });

        showInfo.result.then(function (data) {
            
        }, function () {
            
        });
	}
	$scope.searchdata = {
		tmplateContent:null,
		currentPage:1,
		pageSize:'10'
	}
		//重置表单
	$scope.resetFrom = () => {
		$scope.searchdata = {
			tmplateContent:null,
			pageSize:'10'
		}
		$scope.searchtable();
	}
    //获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/message/importSMSModel',
    		data: {
				"tmplateContent": $scope.searchdata.tmplateContent,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize										
			}
        }).then(function (response){
            // 接口调用成功
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
				$scope.tablelistdata = response.data.data;
				if(response.data.data){
					$scope.total = response.data.data.totalCount;
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
	
	//导入
	$scope.importoperate = (template) => {
		//console.log(template)
		let importoperate = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/order/importmodel.html',
            controller: 'importCtrl',
            resolve: {
                TemplateInfo:function () {
					return template;
				}
            }
        });

        importoperate.result.then(function (data) {
					$uibModalInstance.close(data);
        }, function () {
            
        });
	}
}]).controller('importVCtrl', ['$scope', '$uibModalInstance', 'toastr', '$uibModal', '$http','$filter', 'confirmdialog', function ($scope, $uibModalInstance, toastr, $uibModal, $http,$filter, confirmdialog) { //导入模板
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close(true);        
	};
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
		status:1,
		currentPage:1,
		pageSize:'10'
	}
	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") +' 00:00:00',
			status:1,
			currentPage:1,
			pageSize:'10'
		}
		//$scope.searchtable();
	}
    //获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;
    	$http({
    		method: 'POST',
    		url:'/iccs/voice/queryVoiceList',
    		data: {
				"endDate": $scope.searchdata.endDate,
				"startDate": $scope.searchdata.startDate,
				'status':1,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize										
			}
        }).then(function (response){
            // 接口调用成功
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
								$scope.tablelistdata = response.data.data;
					if(response.data.data){
						$scope.total = response.data.data.totalCount;
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
	
	//导入
	$scope.importvoice = (voice) => {
		//console.log(template)
		$uibModalInstance.close({"mediaName":voice.voiceName});
	}
}]).controller('importCtrl', ['$scope', '$uibModalInstance', 'toastr', 'TemplateInfo', function ($scope, $uibModalInstance, toastr, TemplateInfo) { //导入
	$scope.templateinfo = TemplateInfo.modWord;
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    // 确定
    $scope.ensure = () => {
        $uibModalInstance.close({"modWord":$scope.templateinfo,"templateId":TemplateInfo.templateId});        
    };
   

}]);