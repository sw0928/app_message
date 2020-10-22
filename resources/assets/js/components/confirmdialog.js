//自定义对话框
import angular from 'angular';
import uibootstrap from 'ui-bootstrap4';

export default angular.module('confirmdialog', ['ui.bootstrap']).factory('confirmdialog', ['$uibModal', function($uibModal) {
    return {
        showdialog: function(dialogmessage = '是否确定执行该操作') {
            return new Promise((resolve, reject) => {
                let dlg = $uibModal.open({
										animation: true,
										appendTo:	$('.order-browse'),
                    controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                        $scope.cancel = () => {                     		
                            $uibModalInstance.dismiss({
                                $value: 'cancel'
                            });
                        };
                        $scope.ensure = () => {
                            $uibModalInstance.close(true);
                        }
                    }],
                    template: `<div class="dialog-bgf">
	                    <div class="modal-header">
	                    <div class="dialog-icon warning-dialog-icon">
	                		<span>!</span>
	                	</div>
	                    </div>
	                    <div class="modal-body text-center dialog-text" id="modal-body">
	                    	${dialogmessage}
	                    </div>
	                    <div class="modal-footer justify-content-center">
	                        <button class="btn ensure btn-sm mr-3" type="button" ng-click="ensure()">确定</button>
	                        <button class="btn cancel btn-sm" type="button" ng-click="cancel()">取消</button>
	                    </div>
                    </div>`
                });

                dlg.result.then((param) => {
                    // confirmed
                    if(param){
                        resolve();
                    }                    
                }, () => {
                    // rejected
                    reject();
                });
            });
        },
        successdialog: function(dialogmessage = '操作执行成功') {
           return new Promise((resolve, reject) => {
                let dlg = $uibModal.open({
										animation: true,
										backdrop:'static',
										//appendTo:	$('.order-browse'),
                    controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                        $scope.ensure = () => {
                            $uibModalInstance.close(true);
                        }
                    }],
                    template: `<div class="dialog-bgf">
	                    <div class="modal-header sweet-alert">
	                    	<div class="sa-icon sa-success animate" style="display: block;">
						      	<span class="sa-line sa-tip animateSuccessTip"></span>
						      	<span class="sa-line sa-long animateSuccessLong"></span>
						
						      	<div class="sa-placeholder"></div>
						      	<div class="sa-fix"></div>
						    </div>
	                    </div>
	                    <div class="modal-body text-center dialog-text" id="modal-body">
	                        ${dialogmessage}
	                    </div>
	                    <div class="modal-footer justify-content-center">
	                        <button class="btn ensure btn-sm" type="button" ng-click="ensure()">确定</button>
	                    </div>
                    </div>`
                });

                dlg.result.then((param) => {
                    // confirmed
                    if(param){
                        resolve();
                    }
                    
                }, () => {
                    // rejected
                    reject();
                });
            });
        },
        derivedialog: function(dialogmessage = '操作执行成功') {
           return new Promise((resolve, reject) => {
                let dlg = $uibModal.open({
										animation: true,
										backdrop:'static',
										windowClass:'modal-class',
										size:'ls',
										//appendTo:	$('.order-browse'),
                    controller: ['$scope', '$uibModalInstance','$interval', function ($scope, $uibModalInstance,$interval) {
                    		 $scope.cancel = () => {
                 		 		 //$interval.cancel();
		                        $uibModalInstance.dismiss({
		                            $value: 'cancel'
		                        });
		                    };
                        $scope.ensure = () => {
                            $uibModalInstance.close(true);
                        }
                    }],
                    template: `<div class="dialog-bgf">
	                    <div class="modal-header sweet-alert text-center">
						      				<span style="font-size:20px;color:#79a028;">导出任务进度:</span>									      
	                    </div>
	                    <div class="modal-body text-center dialog-text" id="modal-body">
	                        ${dialogmessage}
	                    </div>
	                    <div class="modal-footer justify-content-center">
	                    		<button class="btn cancel btn-sm" type="button" ng-click="cancel()">关闭</button>
	                        <button class="btn ensure btn-sm dn" type="button" ng-click="ensure()">下载</button>
	                    </div>
                    </div>`
                });

                dlg.result.then((param) => {
                    // confirmed
                    if(param){
                        resolve();
                    }
                    
                }, () => {
                    // rejected
                    reject();
                });
            });
        },
        successwait: function(dialogmessage = '操作执行成功') {
           return new Promise((resolve, reject) => {
                let dlg = $uibModal.open({
										animation: true,
										backdrop:'static',
										appendTo:	$('.order-browse'),
                    controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                        $scope.ensure = () => {
                            $uibModalInstance.close(true);
                        }
                    }],
                    template: `<div class="dialog-bgf">
	                    <div class="modal-header sweet-alert">
	                    	<div class="sa-icon sa-success animate" style="display: block;">
						      	<span class="sa-line sa-tip animateSuccessTip"></span>
						      	<span class="sa-line sa-long animateSuccessLong"></span>
						
						      	<div class="sa-placeholder"></div>
						      	<div class="sa-fix"></div>
						    </div>
	                    </div>
	                    <div class="modal-body text-center dialog-text" id="modal-body">
	                        ${dialogmessage}
	                    </div>
	                    <div class="modal-footer dn justify-content-center">
	                        <button class="btn ensure btn-sm" type="button" ng-click="ensure()">确定</button>
	                    </div>
                    </div>`
                });

                dlg.result.then((param) => {
                    // confirmed
                    if(param){
                        resolve();
                    }
                    
                }, () => {
                    // rejected
                    reject();
                });
            });
        },
        errordialog: function(dialogmessage = '是否确定执行该操作') {
            return new Promise((resolve, reject) => {
	            let dlg = $uibModal.open({
									animation: true,
									appendTo:	$('.order-browse'),
	                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	                    $scope.cancel = () => {
	                        $uibModalInstance.dismiss({
	                            $value: 'cancel'
	                        });
	                    };
	                    $scope.ensure = () => {
	                        $uibModalInstance.close(true);
	                    }
	                }],
	                template: `<div class="dialog-bgf">
		                <div class="modal-header">
		                	<div class="dialog-icon error-dialog-icon">
		                		<span class="sp-left"></span>
		                		<span class="sp-right"></span>
		                	</div>
		                </div>
		                <div class="modal-body text-center dialog-text" id="modal-body">
		                    ${dialogmessage}
		                </div>
		                <div class="modal-footer justify-content-center">
		                    <button class="btn ensure btn-sm mr-3" type="button" ng-click="ensure()">确定</button>
		                    <button class="btn cancel btn-sm" type="button" ng-click="cancel()">取消</button>
		                </div>
	                </div>`
	            });
	
	            dlg.result.then((param) => {
	                // confirmed
	                if(param){
	                    resolve();
	                }
	                
	            }, () => {
	                // rejected
	                reject();
	            });
	        });
        }
        
    };
}]);