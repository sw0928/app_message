import angular from 'angular';
//本地存储
import localdata from './components/localdata';
import toastr from 'angular-toastr';
import confirmdialog from './components/confirmdialog';
import uibootstrap from 'ui-bootstrap4';
import $ from 'jquery';
let baseAPP = angular.module('baseApp', ['LocalData','toastr','confirmdialog']);
baseAPP.controller('loginCtrl', ['$scope', 'LocalData','confirmdialog','toastr','$interval', '$window', function ($scope, LocalData,confirmdialog,toastr,$interval, $window) {	
		$scope.userName = null;
		$scope.passWord = null;
		$scope.errorinfo = null;
		$scope.code = null;
		$scope.codeTwo = null;
		$scope.loginName = null;
		$scope.receiveNumber = null;
		$scope.verCode = null;
		$scope.returnShow = true;
		$scope.returnText = 60;
		$scope.returnTextM = '60s';
		$scope.img = null;
		$scope.showCode = false;
		$scope.token = null;
		$scope.showReg = true;
		$scope.codeShow = null;
		//本地存储数据
    let dealLocalData = (parameter) => {
			LocalData.set('Authorization',parameter.Authorization);
			LocalData.set('current',$scope.userName);
			LocalData.setObject('authorities',parameter.authorities);
			LocalData.setObject('userInfo',parameter.userInfo);
    }
    //验证码
    $scope.yzm = () => {
    	$.ajax({			  
			type: 'POST',
			url: '/getVerifyCode',
			data: {
					uname:$scope.userName				
			},
			dataType: 'json',
			success: function(data){
				$scope.showCode = true;
				$scope.img ='data:image/jpg;base64,'+ data.code;
				$scope.token = data.token;
				$scope.$apply();
			}  
		
		});
    }
        //验证码
    $scope.checkNeed = () => {
    	$.ajax({			  
			type: 'POST',
			url: '/iccs/authenticator/checkNeedAuthenticate',
			data: {
					loginName:$scope.userName				
			},
			dataType: 'json',
			success: function(data){
				if(data.data == 0){
					$scope.codeShow = 0;
					$scope.yzm();
					$scope.$apply();			
				}else if(data.data == 2){
					$scope.codeShow = 2;
					$scope.$apply();			
				}else{
					$scope.codeShow = 1;
					$scope.yzm();
					$scope.$apply();			
				}				
			}  
		
		});
    }
    setTimeout(function() {
			$scope.checkNeed()
		}, 100)
    
   // 切换
    $scope.cut = () => {
			$scope.yzm()
    }
     //忘记密码
    $scope.change_pass = () => {
			$scope.showReg = false;
			$scope.userName = null;
			$scope.passWord = null;
			$scope.errorinfo = null;
			$scope.code = null;
			$scope.codeTwo = null;
			$scope.loginName = null;
			$scope.receiveNumber = null;
			$scope.verCode = null;
			$interval.cancel($scope.timer);	
    }
    //快速登录
    $scope.loginB = () => {
			$scope.showReg = true;
			$scope.userName = null;
			$scope.passWord = null;
			$scope.errorinfo = null;
			$scope.code = null;
			$scope.codeTwo = null;
			$scope.loginName = null;
			$scope.receiveNumber = null;
			$scope.verCode = null;
			$interval.cancel($scope.timer);	
			$scope.returnShow = true;
			$scope.returnText = 60;
			$scope.returnTextM = '60s';
    }
		//登陆
    $scope.loginSystem = () => {
    	if($scope.codeShow == 0){
    		$.ajax({			  
					type: 'POST',
					url: '/login',
					data: {
							username:$scope.userName,
							password:$scope.passWord,
							code:$scope.code,
							token:$scope.token,
					},
					dataType: 'json',
					success: function(data){
						if(data.statusCode == 200){
							dealLocalData(data.data);
							//console.log(data)
							$window.location.href = 'index.html';
						}else{
							$scope.errorinfo = data.message;
							$scope.code = null;
							$scope.$apply();
							$scope.yzm()
						}
					},			  
					error:function(e){  
		        $scope.errorinfo = '用户名或密码错误！'; 
		        $scope.code = null;
		        $scope.$apply();
		        $scope.yzm()
		      }  
				});
    	}else if($scope.codeShow == 2){
    		$.ajax({			  
					type: 'POST',
					url: '/login',
					data: {
							username:$scope.userName,
							password:$scope.passWord,
							code:$scope.codeTwo,
					},
					dataType: 'json',
					success: function(data){
						if(data.statusCode == 200){
							dealLocalData(data.data);
							//console.log(data)
							$window.location.href = 'index.html';
						}else{
							$scope.errorinfo = data.message;
							$scope.code = null;
							$scope.$apply();
							$scope.yzm()
						}
					},			  
					error:function(e){  
		        $scope.errorinfo = '用户名或密码错误！'; 
		        $scope.code = null;
		        $scope.$apply();
		        $scope.yzm()
		      }  
				});
    	}else{
    		$.ajax({			  
					type: 'POST',
					url: '/login',
					data: {
							username:$scope.userName,
							password:$scope.passWord,
							code:$scope.code,
							token:$scope.token,
					},
					dataType: 'json',
					success: function(data){
						if(data.statusCode == 200){
							confirmdialog.successdialog('用户首次登陆，请前往安全令牌验证！').then(function() {
			    			dealLocalData(data.data);
								$window.location.href = 'dynamic_verify.html';										
							});
						}else{
							$scope.errorinfo = data.message;
							$scope.code = null;
							$scope.$apply();
							$scope.yzm()
						}
					},			  
					error:function(e){  
		        $scope.errorinfo = '用户名或密码错误！'; 
		        $scope.code = null;
		        $scope.$apply();
		        $scope.yzm()
		      }  
				});
    		
    	}
		
	}
    //发送短信验证码
    $scope.sendPhone = () => {    	
    	let mobileRegx = /^(((1[3-9][0-9]{1}))+\d{8})$/;
    	if(!mobileRegx.test($scope.receiveNumber)){
    			$scope.errorinfo = '手机号格式不正确,请重新输入!'
    			return false;
				}
    	if($scope.loginName == null){
    			$scope.errorinfo = '请输入登录名!'
    			return false;
				}
			$.ajax({			  
				type: 'POST',
				url: '/iccs/message/sendVerifiableCode',
				data: JSON.stringify({
						loginName:$scope.loginName,
						orderType:2,
						receiveNumber:$scope.receiveNumber,
				}),
				dataType: 'json',
				headers: {
							'Content-Type': 'application/json;charset=utf-8'
				},
				success: function(data){
					if(data.statusCode == 200){
						$scope.errorinfo = data.message;
						$scope.returnShow = false;
						$scope.timer = $interval(function() {
							if($scope.returnText == 1){
								$scope.returnText = 60;
								$scope.returnShow = true;
								$scope.errorinfo = '';
								$interval.cancel(timer);								
							}else{
								$scope.returnText = $scope.returnText -1
								$scope.returnTextM = $scope.returnText -1 + 's';		
							}
																			
						}, 1000);
						$scope.$apply();	
					}else{
						$scope.errorinfo = data.message;
						$scope.$apply();					
					}
				},			  
				error:function(e){  
	      }  
			});
			
	}
   //重置密码
    $scope.register = () => {
    	let mobileRegx = /^(((1[3-9][0-9]{1}))+\d{8})$/;
    	if(!mobileRegx.test($scope.receiveNumber)){
    			$scope.errorinfo = '手机号格式不正确,请重新输入!'
    			return false;
				}
    	if($scope.loginName == null){
    			$scope.errorinfo = '请输入登录名!'
    			return false;
				}
			$.ajax({			  
				type: 'POST',
				url: '/iccs/user/resetPassWord',
				data: JSON.stringify({
						loginName:$scope.loginName,
						phone:$scope.receiveNumber,
						verCode:$scope.verCode,					
				}),
				dataType: 'json',
				headers: {
							'Content-Type': 'application/json;charset=utf-8'
				},
				success: function(data){
					if(data.statusCode == 200){
						confirmdialog.successdialog(data.message).then(function() {
								$scope.showReg = true;										
						});			
					}else{
						$scope.errorinfo = data.message;
						$scope.verCode = null;
						$scope.$apply();					
					}
				},			  
				error:function(e){  
	      
	      }  
			});
	}
}]);