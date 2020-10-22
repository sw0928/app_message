import commonbase from './commonBase';
import localdata from './components/localdata';
import $ from 'jquery';

import angular from 'angular';
import ngResource from 'angular-resource';
export default angular.module('commonInterface', ['ngResource']).service('commonInterface', ['$resource', function($resource) {
    let baseUrl = '/iccs';
     return $resource(baseUrl, null, {
        getUserList: {
            method: 'post',
            isArray: false,
            timeout: 3000,
            url: `${baseUrl}/user/queryUserList`
        },
 	});
    
}]);

/*export default commonbase.factory('commonInterface', ['LocalData',function(LocalData) {
    return {
    	getUser: (params,callbackSuccess,callbackError,callbackComplete) => {
    		$.ajax({			  
				type: params.type,
				url: '/login',
				timeout:'2000',
				async:params.async?params.async:true,
				data: {
				  	username:$scope.userName,
				  	password:$scope.passWord
				},
				dataType: 'json',
				success: (data, textStatus) => {
					if(callbackSuccess){
						callbackSuccess(data, textStatus);
					}
				},
				error:() => {
					if(callbackError){
						callbackError(data);
					}
				},
				complete:(XMLHttpRequest, textStatus) => {
					if(callbackComplete){
						callbackComplete(XMLHttpRequest, textStatus);
					}
				}				  
			});
    	},
	    getUserList: (params,callbackSuccess,callbackError,callbackComplete) => {  //获取用户列表
    		$.ajax({
    			headers: {
			        Authorization:LocalData.get('Authorization')
			  	},
			  	type: 'POST',
       		 	contentType: "application/json; charset=utf-8",
				url: '/iccs/user/queryUserList',
				timeout:'2000',
				async:params.async?params.async:true,
				data:params.data,
				dataType: 'json',
				success: (data, textStatus) => {
					if(callbackSuccess){
						callbackSuccess(data, textStatus);
					}
				},
				error:(data) => {
					if(callbackError){
						callbackError(data);
					}
				},
				complete:(XMLHttpRequest, textStatus) => {
					if(callbackComplete){
						callbackComplete(XMLHttpRequest, textStatus);
					}
				}				  
			});
	    }
    }
}]);*/
