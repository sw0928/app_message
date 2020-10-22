import commonbase from '../commonBase';
import $ from 'jquery';

export default commonbase.controller('orderImportContactsCtrl', ['$scope', '$uibModalInstance', 'toastr', '$http', 'LocalData', function($scope, $uibModalInstance, toastr, $http, LocalData) { //导入联系人
	$scope.searchdata = {
		contactName: null,
		contactsGroupNo: null,
		currentPage: 1,
		pageSize: '10',
	}
	$http({
		method: 'POST',
		url: '/iccs/contactsGroup/queryContactsGroup'
	}).then(function(response) {
		// 接口调用成功
		if(response.data.statusCode === 200) {
			$scope.usersList = response.data.data;
		} else {
			toastr.warning(response.data.message, '槽糕');
		}
	}, function errorCallback() {
		toastr.error('系统内部错误', '错误');
	});
	//获取选择的电话号码
	let selectedTel = (arrlist) => {
		let telList = '';
		angular.forEach(arrlist, (item) => {
			if(item.selected) {
				telList += item.tel + ',';
			}
		});
		return telList;
	}
	//全选
	$scope.allSelect = function(element, datalist) {
		if($(element.target).prop('checked')) {
			angular.forEach(datalist, (item) => {
				item.selected = $(element.target).prop('checked');
			});
		} else {
			var midStatus = true;
			angular.forEach(datalist, (item) => {
				midStatus = midStatus && item.selected;
			});
			if(midStatus) {
				angular.forEach(datalist, (item) => {
					item.selected = false;
				});
			}
		}
	};

	//单选
	$scope.listItemSelect = function() {
		var midStatus = true;
		angular.forEach($scope.tablelistdata.data, (item) => {
			midStatus = midStatus && item.selected;
		});
		$scope.allselected = midStatus;
	}
	//获得联系人列表
	$scope.getContactList = () => {
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/contacts/queryContactsList',
			data: {
				"contactName": $scope.searchdata.contactName,
				"contactsGroupNo": $scope.searchdata.contactsGroupNo? $scope.searchdata.contactsGroupNo.groupNo:null,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				$scope.tablelistdata = response.data.data;
				if(response.data.data) {
					$scope.total = response.data.data.totalCount;
				}
			} else {
				toastr.warning('出了点小问题', '槽糕');
			}
		});
	}
	$scope.searchTable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getContactList();
	}
	$scope.getContactList();

	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.ensure = () => {

		$uibModalInstance.close(selectedTel($scope.tablelistdata.data));
	};

}]);