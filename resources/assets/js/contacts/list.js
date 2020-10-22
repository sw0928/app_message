import commonbase from '../commonBase';
export default commonbase.controller('ctctmanagerCtrl', ['$scope', '$rootScope', 'Persist', '$http', 'toastr', '$uibModal', 'confirmdialog', 'LocalData', '$window',
function ($scope, $rootScope, Persist, $http, toastr, $uibModal, confirmdialog, LocalData, $window) {
	$scope.per = Persist;
	$scope.per.asideswitch = 4;
	$scope.per.showLeft = 0;
	$scope.per.navmodel = 'contactmodule';
	$scope.tablelistdata = null;
	//搜索条件
	$scope.searchdata = {
		contactName:'',
		contactsGroupNo:null,
		currentPage:1,
		pageSize:'10',
		total:0
	}
	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			contactName:'',
			contactsGroupNo:null,
			currentPage:1,
			pageSize:'10'
		}
		$scope.getContactList();
	}
	
	//获得联系人列表
	$scope.getContactList = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/contacts/queryContactsList',
    		data: {
				"contactName": $scope.searchdata.contactName,
				"contactsGroupNo": $scope.searchdata.contactsGroupNo,
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
								$scope.searchdata.total =  response.data.data.totalCount;
							}            	
            }
        });
	}	
	$scope.getContactList();
	
	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getContactList();
	}
	//根据侧边栏选中的分组进行筛选
	$rootScope.$on('SelectedGroup', function (event) {
    $scope.searchdata.contactsGroupNo = $scope.per.SelectedGroup;
		$scope.getContactList();
    });
    
	//新增联系人
    $scope.addContacts = () => {
    	let addContacts = $uibModal.open({
            animation: true,
            backdrop:'static',
            templateUrl: '../../resources/views/contacts/addcontact.html',
            controller: 'addContactsCtrl',
            size:'lg',
            resolve: {
                GroupList: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/contactsGroup/queryContactsGroup'   
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

        addContacts.result.then(function (data) {
            $scope.getContactList();
        }, function () {
            
        });
    }
    
    //修改联系人
	$scope.modifyContacts = (contract) => {
    	let modifyContacts = $uibModal.open({
            animation: true,
            backdrop:'static',
            templateUrl: '../../resources/views/contacts/editcontact.html',
            controller: 'modifyContactsCtrl',
            appendTo:	$('.order-browse'),
            size:'lg',
            resolve: {
                contractInfo: function(){
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/contacts/queryContactsInfoById',
			    		params: { contactNo: contract.contactNo }          
			        }).then(function (response){
			            // 接口调用成功
			            if(response.data.statusCode === 200){
			            	return response.data.data.data;				            	
			            }else{
			            	toastr.warning('出了点小问题','槽糕');
			            }
			        }, function errorCallback(){
			            toastr.error('系统内部错误','错误');
			        });
                },
                GroupList: function () {
                	return $http({
			    		method: 'POST',
			    		url:'/iccs/contactsGroup/queryContactsGroup'   
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

        modifyContacts.result.then(function (data) {
            $scope.getContactList();
        }, function () {
            
        });
    }
	
	//删除联系人
	$scope.delectcontacts = (contract) => {
		confirmdialog.showdialog('是否确认删除该联系人？').then(function(){
			//确定
			$http({
	    		method: 'POST',
	    		url:'/iccs/contacts/removeContacts',
	    		params: {"contactNo":contract.contactNo}	    		
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){	            	
	            	let index = $scope.tablelistdata.data.indexOf(contract);
			        if (index > -1) {
			            $scope.tablelistdata.data.splice(index, 1);
			        }
			        toastr.success('操作成功');
	            }else{
	            	toastr.warning('出了点小问题','槽糕');
	            }
			},function(){
			
			})
		},function(){
			
		});
	}
	
	//导入联系人
	$scope.importContacts = () => {
    	let importContacts = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/contacts/importcontacts.html',
            controller: 'importContactsCtrl'
        });

        importContacts.result.then(function (data) {
            $scope.getContactList();
        }, function () {
            
        });
    }
	
}]).controller('addContactsCtrl', ['$scope', 'Persist', '$uibModalInstance', 'toastr', '$http', 'LocalData', 'GroupList', 'confirmdialog',
function ($scope, Persist, $uibModalInstance, toastr, $http, LocalData, GroupList, confirmdialog) { //新增联系人
	$scope.per = Persist;
	$scope.grouplist = GroupList;
    //初始化数据
    $scope.contract = {
    	age: '',
			contactName: '',
			contactsGroupNo: $scope.grouplist[0],
			email: '',
			groupName: '',
			groupNo: '',
			job: '',
			mobile: '',
			phone: '',
			qq: '',
			remark: '',
			sex: '',
			tel: ''
    }
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
   
    // 确定
    $scope.ensure = () => {
    	if($scope.contract.email !== ''){
    			if(!Persist.validateEmail($scope.contract.email)){
				toastr.warning('邮箱格式不正确,请重新输入!');
				return false;
				}
    	}
    	if($scope.contract.mobile !== ''){
    		if(!Persist.validatePhone($scope.contract.mobile)){
					toastr.warning('手机号格式不正确,请重新输入!');
					return false;
				}
    	}  
        $http({
    		method: 'POST',
    		url:'/iccs/contacts/createContacts',
    		data: {
			  	"age": $scope.contract.age?$scope.contract.age:'',
			  	"contactName": $scope.contract.contactName,
			  	"contactsGroupNo": $scope.contract.contactsGroupNo?$scope.contract.contactsGroupNo.groupNo:null,
			  	"email": $scope.contract.email,
			  	"job": $scope.contract.job,
			  	"mobile": $scope.contract.mobile,
			  	"phone": $scope.contract.phone,
			  	"qq": $scope.contract.qq,
			  	"remark": $scope.contract.remark,
			  	"sex": $scope.contract.sex
			}     
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog('联系人创建成功!').then(function(){
					$uibModalInstance.close(true);
				});            	
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        }, function errorCallback(){
            toastr.error('系统内部错误','错误');
        });      
    };

}]).controller('modifyContactsCtrl', ['$scope', 'Persist','$uibModalInstance', 'toastr', 'contractInfo', '$http', 'LocalData', 'confirmdialog', 'GroupList',
function ($scope, Persist, $uibModalInstance, toastr, contractInfo, $http, LocalData, confirmdialog, GroupList) { //修改联系人
	$scope.per = Persist;
	//可选分组
	$scope.grouplist = GroupList;
	//处理分组
	let dealGroup = () => {
    	let selected = null;
    	angular.forEach(GroupList,function(group){
    		if(group.groupNo == contractInfo.groupNo){
    			selected = group;
    		}
    	});
    	return selected;
	}

    //初始化数据
    $scope.contract = {
    	age: contractInfo.age?parseInt(contractInfo.age):'',
		contactName: contractInfo.contactName?contractInfo.contactName:'',
		contactNo: contractInfo.contactNo,
		email: contractInfo.email?contractInfo.email:'',
		contactsGroupNo:dealGroup(),
		job: contractInfo.job?contractInfo.job:'',
		mobile: contractInfo.tel?contractInfo.tel:'',
		phone: contractInfo.phone?contractInfo.phone:'',
		qq: contractInfo.qq?contractInfo.qq:'',
		remark: contractInfo.remark?contractInfo.remark:'',
		sex: contractInfo.sex?contractInfo.sex:'',
		tel: contractInfo.tel
    }

    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
	};
    // 确定
    $scope.ensure = () => {        
    	if($scope.contract.email !== ''){
    			if(!Persist.validateEmail($scope.contract.email)){
				toastr.warning('邮箱格式不正确,请重新输入!');
				return false;
				}
    	} 
    	if($scope.contract.mobile !== ''){
    		if(!Persist.validatePhone($scope.contract.mobile)){
					toastr.warning('手机号格式不正确,请重新输入!');
					return false;
				}
    	}  
        $http({
    		method: 'POST',
    		url:'/iccs/contacts/editContacts',
    		data: {
			  	"age": $scope.contract.age?$scope.contract.age:'',
			  	"contactName": $scope.contract.contactName,
			  	"contactsGroupNo": $scope.contract.contactsGroupNo?$scope.contract.contactsGroupNo.groupNo:null,
			  	"contactsNo":contractInfo.contactNo,
			  	"email": $scope.contract.email,
			  	"job": $scope.contract.job,
			  	"mobile": $scope.contract.mobile,
			  	"phone": $scope.contract.phone,
			  	"qq": $scope.contract.qq,
			  	"remark": $scope.contract.remark,
			  	"sex": $scope.contract.sex
			}     
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
    };

}]).controller('importContactsCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog','$window',
function ($scope, $http, $uibModalInstance, toastr, confirmdialog,$window) { //导入联系人
    $scope.multipartFile = null;
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    // 确定
    $scope.ensure = () => {		
		let form = new FormData();
		form.append('multipartFile', $scope.multipartFile);
        $http({
    		method: 'POST',
    		url:'/iccs/contacts/createBatchContacts',
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
            }
        });
    };

}]);
   