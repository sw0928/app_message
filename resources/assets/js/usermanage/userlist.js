import commonbase from '../commonBase';

export default commonbase.controller('usermanage', ['$scope', '$http', 'Persist', 'toastr', '$uibModal', 'confirmdialog', 'LocalData', '$window', 'SysPermission',
function ($scope, $http, Persist, toastr, $uibModal, confirmdialog ,LocalData, $window, SysPermission) {
	$scope.per = Persist;
	$scope.accountType = LocalData.getObject('userInfo').accountType;
	$scope.SysPermission = SysPermission;
	$scope.per.navmodel = 'usermodule';
	$scope.userObj = [
	{userName:'财务',id:2},
	{userName:'运营',id:3},
	{userName:'销售总监',id:4},
	{userName:'销售经理',id:5},
	{userName:'客户经理',id:6},
	{userName:'代理商',id:7},
	{userName:'客户',id:8},
	{userName:'直营客户',id:100}	
	];
	if($scope.accountType > 6){
		$scope.userObj.pop()
	}
	if($scope.accountType == 1){
		$scope.userObj.push({userName:'通道管理员',id:110})
	}
	$scope.userTypeObj = [];
	for (let i = 0; i < $scope.userObj.length; i++) { 
    if($scope.accountType <= $scope.userObj[i].id){
    	$scope.userTypeObj.push($scope.userObj[i])
    }
 }
	//侧边栏显示
	$scope.per.asideswitch = 3;
	$scope.per.showLeft = 0;
	//筛选条件
	$scope.searchdata = {
		loginName:"",
		currentPage: 1,
		pageSize: '10',
		sendType: '0',
		userStatus: `-1`,
		accountPlant: ``,
		userType: '0',
		total:0
	}
	//表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			loginName:"",
			currentPage: 1,
			pageSize: '10',
			sendType: '0',
			userStatus: `-1`,
			accountPlant: ``,
			userType: '0'
		}
		$scope.searchTable();
	}
	//列表数据
	$scope.userlistdata = null;
	//获取用户列表
	$scope.getUserlist = () => {
		$scope.showloading= 0;
		$http({
    		method: 'POST',
    		url:'/iccs/user/queryUserList',
    		data: {
				loginName: $scope.searchdata.loginName,
				offset: $scope.searchdata.currentPage,
				pageSize: $scope.searchdata.pageSize,
				sendType: parseInt($scope.searchdata.sendType),
				accountStatus: parseInt($scope.searchdata.userStatus),
				accountPlant: $scope.searchdata.accountPlant,
				accountType: parseInt($scope.searchdata.userType) 
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }           
            $scope.showloading= 1;
            if(response.data.statusCode === 200){
            	$scope.userlistdata = response.data.data;
            	$scope.searchdata.total = response.data.data.totalCount;
            }else{
            	toastr.warning(response.data.message,'槽糕');
            }
        })
	}	

	//初始获取数据
	$scope.getUserlist();
	$scope.usable = (num) => {
		let usable =  Math.floor(num * 1000) / 1000;
	 	return	usable
	}
	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getUserlist();
	}
	//导出用户余额
	$scope.importUserBalance = () => {
		$http({
    		method: 'POST',
    		url:'/iccs/user/queryUserList',
    		data: {
				"loginName": $scope.searchdata.loginName,
				"offset": 0,
				"pageSize": 0,
				"expTitle":"人员列表",
				"exp":"true",
				"sendType": parseInt($scope.searchdata.sendType),
				"accountStatus": parseInt($scope.searchdata.userStatus),
				"accountType": parseInt($scope.searchdata.userType) 
			},
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

    //添加用户
    $scope.addUser = () => {
    	let adduser = $uibModal.open({
            animation: true,
            backdrop:'static',
            templateUrl: '../../resources/views/usermanage/adduser.html',
            controller: 'adduserCtrl',
            //appendTo:	$('.card'),
            size:'lg',
            resolve:{
                userInfo:function () {
               		return null;
                },
                AccountTypelist: function (){
                	return $http({						
						method: 'POST',
						url:'/iccs/user/queryUserType'        
				    }).then(function (response){
				        // 接口调用成功
				        if(response.data.statusCode === 200){
				        	return response.data.data;
				        }else{
				        	toastr.warning(response.data.message,'糟糕');	
				        }
				    });
				}
            }
        });

        adduser.result.then(function (data) {            
            if(data){
				$scope.searchTable();
            }
        }, function () {
           	
        });
    }
	
	//修改用户
    $scope.modifyUser = (param) => {
    	let modifyuser = $uibModal.open({
            animation: true,
            backdrop:'static',
            templateUrl: '../../resources/views/usermanage/adduser.html',
            controller: 'adduserCtrl',
            //appendTo:	$('.main-cont'),
            size:'lg',
            resolve:{
                userInfo:function () {
               		return $http({
						method: 'POST',
						url:'/iccs/user/queryUserInfo',
						params:{
							loginName:param.loginName
						}
					}).then(function (response){
						// 接口调用成功
						if(response.data.statusCode === 200){
							return response.data.data;
						}
					});
                },
                AccountTypelist: function (){
                	return $http({
						method: 'POST',
						url:'/iccs/user/queryUserType'        
				    }).then(function (response){
				        // 接口调用成功
				        if(response.data.statusCode === 200){
				        	return response.data.data;
				        }else{
				        	toastr.warning(response.data.message,'糟糕');		
				        }
				    });
				}
            }
        });

        modifyuser.result.then(function (data) {            
            if(data){
				$scope.searchTable();
            }
        }, function () {
           	
        });
    }
    
    //定价
    $scope.fixedPrice = (param) => {
    	let fixedPrice = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/fixedprice.html',
            controller: 'fixedPrice',
            //appendTo:	$('.card'),
            resolve:{
                UserDetail:function () {
					return $http({
						method: 'POST',
						url:'/iccs/user/queryUserInfo',
						params:{
							loginName:param.loginName
						}
					}).then(function (response){
						// 接口调用成功
						if(response.data.statusCode === 200){
							return response.data.data;
						}
					});
                }
            }
        });

        fixedPrice.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    //转账
    $scope.transferAccounts = (param) => {
    	let transferAccounts = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/transferaccount.html',
            controller: 'transferaccount',
            //appendTo:	$('.card'),
            resolve:{
				UserDetail:function () {
					return $http({
						method: 'POST',
						url:'/iccs/user/queryUserInfo',
						params:{
							loginName:param.loginName
						}
					}).then(function (response){
						// 接口调用成功
						if(response.data.statusCode === 200){
							return response.data.data;
						}
					});
			 	}
            }
        });

        transferAccounts.result.then(function (data) {            
            $scope.getUserlist();
        }, function () {
           	
        });
    }
    
    //余额告警
    $scope.sumwarning = (paramData) => {
    	let balance = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/balance.html',
            controller: 'balancewarning',
           // appendTo:	$('.card'),
            resolve:{
                UserDetail: function () {
                	return $http({
						method: 'POST',
						url:'/iccs/user/queryUserInfo',
						params:{
							loginName:paramData.loginName
						}
					}).then(function (response){
						// 接口调用成功
						if(response.data.statusCode === 200){
							return response.data.data;
						}
					});
                }
            }
        });

        balance.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    
    //重置密码
    $scope.resetpassword = (param) => {
    	confirmdialog.showdialog(`您确认为用户${param.loginName}执行重置密码操作么？`).then(function(){
			//确定
			$http({
	    		method: 'POST',
	    		url:'/iccs/user/resetPassword',
	    		params:{
					loginName: param.loginName
				}     
	        }).then(function (response){
	            // 接口调用成功
	            if(response.data.statusCode === 200){
	            	confirmdialog.successdialog(response.data.data).then(function(){
	            		
	            	});
	            }else{
	            	toastr.warning(response.data.message,'糟糕');	
	            }
	        });
			
		},function(){
			//取消
			
		})
    }
    
    //子客户
    $scope.subclientSearch = (param) => {
    	let subclient = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/subclient.html',
            controller: 'subclientCtrl',
          	//appendTo:	$('.card'),
            size:'xl',
            resolve:{
				userInfo:function () {
					return param;
				}
            }
        });

        subclient.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    
    //每天业绩
    $scope.dayachievement = (param) => {
    	let dayachievement = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/dayachievement.html',
            controller: 'dayachievement',
           	//appendTo:	$('.card'),
            size:'xl',
            resolve:{
                userInfo:function () {
					return param;
				}
            }
        });

        dayachievement.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    
    //每人业绩
    $scope.personachievement = (param) => {
    	let personachievement = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/personachievement.html',
            controller: 'personachievement',
            //appendTo:	$('.card'),
            size:'xl',
            resolve:{
                userInfo:function () {
					return param;
				}
            }
        });

        personachievement.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    
    //客户规格
    $scope.clientspec = () => {
    	let clientspec = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/clientspec.html',
            controller: 'clientspec',
            //appendTo:	$('.card'),
            size:'xl',
        });

        clientspec.result.then(function (data) {            
            
        }, function () {
           	
        });
    }
    
}]).controller('fixedPrice', ['$scope', '$http','$uibModal', '$uibModalInstance', 'toastr', 'confirmdialog', 'UserDetail', function ($scope, $http, $uibModal, $uibModalInstance, toastr, confirmdialog, UserDetail) { //定价
	//初始化数据
	$scope.tabledata = [];
	$scope.basedata = {
		loginName: UserDetail.loginName,
		userName: UserDetail.userName,
		pricing: null,
		sendType: null,
		aisleType: null	
	}
    //定价列表
    $scope.gettablelist = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/capital/pricingList',
    		params: {
				"userId": UserDetail.userId
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){ 
            	$scope.tabledata = response.data.data;
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
    }
    $scope.gettablelist();
    
    //移除定价
    $scope.deletePrice = (param) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/capital/removePricing',
    		params: {
				"pricingId": param.priceId
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){ 
				confirmdialog.successdialog(response.data.message).then(function(){
					let index = $scope.tabledata.indexOf(param);
					if (index > -1) {
						$scope.tabledata.splice(index, 1);
					}
				});
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
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
    		url:'/iccs/capital/savePricing',
    		data: {
				  aisleType: $scope.basedata.aisleType,
			    pricing: $scope.basedata.pricing,
			    sendType: $scope.basedata.sendType,
			    userId: UserDetail.userId,
			    priceId:null
			}           
        }).then(function (response){
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
					$scope.gettablelist();
				});
            }else{
				toastr.warning(response.data.message,'槽糕');
			}
        });
    };
    //定价修改
    $scope.fixedPrice_amend = (param) => {
    	let fixedPrice = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/usermanage/fixedprice_amend.html',
            controller: 'fixedPrice_amend',            
            resolve:{
                UserDetail:function () {
                	param.userId = UserDetail.userId
                	return param;									
                }
            }
        });

        fixedPrice.result.then(function (data) {            
            $scope.gettablelist();
        }, function () {
           	$scope.gettablelist();
        });
    }
    
}]).controller('fixedPrice_amend', ['$scope', '$http', '$uibModalInstance', 'toastr', 'confirmdialog', 'UserDetail', function ($scope, $http, $uibModalInstance, toastr, confirmdialog, UserDetail) { //定价
	//初始化数据
		$scope.switch = (type) => {
        if(type == '短信移动成功计费'){
          return '1';
        }
        if(type == '短信联通成功计费'){
          return '2';
        }
        if(type == '短信电信成功计费'){
          return '3';
        }
        if(type == '短信移动提交计费'){
          return '4';
        }
        if(type == '短信联通提交计费'){
          return '5';
        }
        if(type == '短信电信提交计费'){
          return '6';
        }
        if(type == '语音成功计费'){
          return '13';
        }
        if(type == '国际短信成功计费'){
          return '14';
        }
  };
	$scope.basedata = {		
		pricing: UserDetail.unitPrice,
		sendType: UserDetail.templateType,
		unitTime: UserDetail.unitTime,
		aisleType: $scope.switch(UserDetail.sendType)	
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
    		url:'/iccs/capital/savePricing',
    		data: {
					aisleType: $scope.basedata.aisleType,
			    pricing: $scope.basedata.pricing,
			    sendType: $scope.basedata.sendType,
			    userId: UserDetail.userId,
			    unitTime: $scope.basedata.unitTime,
			    priceId:UserDetail.priceId
			}           
        }).then(function (response){
            if(response.data.statusCode === 200){
            	confirmdialog.successdialog(response.data.message).then(function(){
            		$uibModalInstance.close(true);
						});
            }else{
								toastr.warning(response.data.message,'槽糕');
						}
        });
    };
    
}]).controller('balancewarning', ['$scope', '$http', '$uibModalInstance', 'toastr', 'UserDetail', 'confirmdialog','Persist', function ($scope, $http, $uibModalInstance, toastr ,UserDetail, confirmdialog,Persist) { //余额告警
	//初始化数据
	$scope.tabledata = null;
	$scope.basedata = {
		loginName: UserDetail.loginName,
		warningBalance: null,
		warningPhone: null
	}
    //余额警告列表
    $scope.gettablelist = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/capital/balanceWarningList',
    		params: {
				"userId": UserDetail.userId
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){ 
            	$scope.tabledata = response.data.data;
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
    }
    $scope.gettablelist();
    
    //删除余额
    $scope.deleteBalance = (param) => {
    	$http({
    		method: 'POST',
    		url:'/iccs/capital/removeBalanceWarning',
    		params: {
				"userId": UserDetail.userId,
				"warningPhone": param.alarmMsisdn
			}           
        }).then(function (response){
            // 接口调用成功
            if(response.data.statusCode === 200){
				confirmdialog.successdialog(response.data.message).then(function(){
					let index = $scope.tabledata.indexOf(param);
					if (index > -1) {
						$scope.tabledata.splice(index, 1);
					}
				});
            }else{
            	toastr.warning(response.data.message,'糟糕');	
            }
        });
    }
    
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定
    $scope.ensure = () => { 
    	if($scope.basedata.warningPhone !== null){
    		if(!Persist.validatePhone($scope.basedata.warningPhone)){
					toastr.warning('手机号格式不正确,请重新输入!');
					return false;
				}
    	}  
        $http({
    		method: 'POST',
    		url:'/iccs/capital/addBalanceWarning',
    		data: {
				"userId": UserDetail.userId,
				"warningBalance": $scope.basedata.warningBalance,
				"warningPhone": $scope.basedata.warningPhone
			}           
        }).then(function (response){
            if(response.data.statusCode === 200){
				confirmdialog.successdialog(response.data.message).then(function(){
					$scope.gettablelist();
				});
            }else{
				toastr.warning(response.data.message,'槽糕');
			}
        });
    };
    
}]).controller('transferaccount', ['$scope', '$uibModalInstance', '$http', 'toastr', 'UserDetail', 'confirmdialog', 'SysPermission', function ($scope, $uibModalInstance, $http, toastr , UserDetail, confirmdialog, SysPermission) { //转账
	$scope.userInfo = UserDetail;
	$scope.userInfo.rechargeType = '0';
	$scope.SysPermission = SysPermission;
	//console.log($scope.userInfo)
    // 取消
    $scope.cancel = () => {
        $uibModalInstance.dismiss({
            $value: 'cancel'
        });
    };
    
    // 确定 === 充值
    $scope.ensure = () => {   	
    	if($scope.userInfo.rechargeType == 1){
    		if($scope.userInfo.balance < $scope.userInfo.rechargeBalnce){
				toastr.warning('金额超过当前当户余额了！', '槽糕');
				return false;
			};
			if($scope.userInfo.credit < $scope.userInfo.creditLines){
				toastr.warning('信用额度超过当前当户额度了！', '槽糕');
				return false;
			}
    	}
			$http({
	    		method: 'POST',
	    		url:'/iccs/capital/recharge',
	    		data: {
					"beRechargeUser": UserDetail.userId,
					"creditLines": $scope.userInfo.creditLines,
					"rechargeBalnce": $scope.userInfo.rechargeBalnce,
					"rechargeType": $scope.userInfo.rechargeType
				}           
	        }).then(function (response){
	            if(response.data.statusCode === 200){
	            	confirmdialog.successdialog(response.data.message).then(function(){
						$uibModalInstance.close('true');
					});
	            }else{
					toastr.warning(response.data.message,'糟糕');	
				}
	        });
		
    };
    
}]);
   