import angular from 'angular';

export default angular.module('httpInterceptor',[]).factory('httpInterceptor',['$q', '$window', function($q, $window) {
	return {		
		request: function(config) { // 可选，拦截成功的请求
			// 进行预处理	
			config.headers = config.headers || {};
			if ($window.localStorage['Authorization']) {
				config.headers['Authorization'] = $window.localStorage['Authorization'];
			}
			return config || $q.when(config);
		},		
		requestError: function(rejection) { // 可选，拦截失败的请求
			// 对失败的请求进行处理			
			/*if (canRecover(rejection)) {
				return responseOrNewPromise
			}*/
			return $q.reject(rejection);
		},		
		response: function(response) { // 可选，拦截成功的响应
			// 进行预处理
			if(response.data && response.data.statusCode == 401){
				$window.location.href = 'login.html';
			}else if(response.data && response.data.statusCode == 403){
				$window.location.href = 'login.html';
			}
			return response || $q.when(reponse);
		},		
		responseError: function(rejection) { // 可选，拦截失败的响应
			// 对失败的响应进行处理
			$window.location.href = 'login.html';
			return $q.reject(rejection);
		}
	};
}]).config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);