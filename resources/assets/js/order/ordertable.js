import commonbase from '../commonBase';
export default commonbase.controller('orderlist', ['$scope', '$uibModal', '$http', 'Persist', 'SysPermission', '$state', function($scope, $uibModal, $http, Persist, SysPermission, $state) {
	$scope.per = Persist;
	$scope.per.asideswitch = 2;
	$scope.per.showLeft = 1;
	$scope.per.navmodel = 'ordermodule';
	$scope.SysPermission = SysPermission;
	//默认跳转该页面(根据权限判断)
	let pageSkipping = () => {
		if($scope.SysPermission.showOrderTable()) { //订单列表
			$state.go("orderlist.ordertable");
			return false;
		}
		if($scope.SysPermission.showTimingTable()) { //定时列表
			$state.go("orderlist.timingtable");
			return false;
		}
		if($scope.SysPermission.showUplinkTable()) { //上行列表
			$state.go("orderlist.uplinktable");
			return false;
		}
		if($scope.SysPermission.showDownlinkTable()) { //下行列表
			$state.go("orderlist.downlinktable");
			return false;
		}
		if($scope.SysPermission.showVocielinkTable()) { //语音列表
			$state.go("orderlist.voicetable");
			return false;
		}
	}
	//
	$scope.importsOrder = (swUrl) => {
		$http({
			method: 'POST',
			url: swUrl,
			data: Persist.orderObj,
			//responseType: 'arraybuffer'  
		}).then(function(response) {
			// 接口调用成功
			if(response.status === 200) {
				setTimeout(function() {
					Persist.download(response.data.data.expTaskId);
				}, 1000)

			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});
	}
	//导出
	$scope.importUserBalance = () => {
		if(window.location.hash.indexOf('ordertable') > 0) {
			$scope.importsOrder('/iccs/order/queryOrderList')
		}
		if(window.location.hash.indexOf('timingtable') > 0) {
			$scope.importsOrder('/iccs/order/queryTimingOrderList')
		}
		if(window.location.hash.indexOf('downlinktable') > 0) {
			$scope.importsOrder('/iccs/order/queryDownriverList')
		}
		if(window.location.hash.indexOf('uplinktable') > 0) {
			$scope.importsOrder('/iccs/order/queryUpriverList')
		}
		if(window.location.hash.indexOf('voicetable') > 0) {
			$scope.importsOrder('/iccs/order/queryVoiceList')
		}
	}
//	$scope.importVoice = () => {
//		let importVoice = $uibModal.open({
//			animation: true,
//			templateUrl: '../../resources/views/order/importvoice.html',
//			controller: 'importVoiceCtrl',
//			appendTo: $('.card'),
//			resolve: {
//
//			}
//		});
//
//		importVoice.result.then(function(data) {
//			//console.log('222')
//		}, function() {
//
//		});
//	}
	//查看用户信息
	$scope.userDetil = () => {
		let userDetil = $uibModal.open({
			animation: true,
			templateUrl: '../../resources/views/dialog/userDetil.html',
			controller: 'userDetilCtrl',
			appendTo: $('.card'),
			resolve: {

			}
		});

		userDetil.result.then(function(data) {
			//$scope.userInfo.httpDeliver = data
		}, function() {

		});
	}
	//pageSkipping();
}])