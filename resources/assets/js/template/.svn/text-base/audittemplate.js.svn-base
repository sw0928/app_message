import commonbase from '../commonBase';
export default commonbase.controller('auditingCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'templateData', 'LocalData',function ($scope, $uibModalInstance, $uibModal,  templateData, LocalData) { //审核
	//获取该模板详情
	if(templateData){
		$scope.basedata = {
			miguMobile: templateData.miguMobile,
			remark: templateData.remark,
			templateSms: templateData.modWord,
			templateType: `${templateData.templateType}`,
			hanging:templateData.miguMobile == null?'0':'1',
			applicant:LocalData.get('current')
		}
	}
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {        
        let refuseapply = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/template/refusedialog.html',
            //appendTo:	$('.order-browse'),
            controller: 'refusedialog',
            resolve:{
            	templateData: function () {
            		return templateData;
            	}
            }
        });

        refuseapply.result.then(function (data) {            
            $uibModalInstance.close('true');
        }, function () {
           	
        });
    };
    
}]).controller('refusedialog', ['$scope', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'templateData', 'confirmdialog', function ($scope, $http, $uibModalInstance, toastr, LocalData, templateData, confirmdialog) { //拒绝模板  
	$scope.basedata = {
		auditMark:null,
		note:""
	}
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => {        
        $http({
			method: 'POST',
			url:'/iccs/template/repulseTemplateApply',
			data: {
				"auditMark":`${$scope.basedata.auditMark},${$scope.basedata.note}`,
				"templateId": templateData.templateId										
			}
	    }).then(function (response){
	        // 接口调用成功
	        if(response.data.statusCode === 200){
	        	confirmdialog.successdialog(response.data.message).then(function(){
					$uibModalInstance.close(true);
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