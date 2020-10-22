import commonbase from '../commonBase';
import $ from 'jquery';

export default commonbase.controller('importuserCtrl', ['$scope', '$uibModalInstance', 'toastr', '$http',function ($scope, $uibModalInstance, toastr, $http) { //导入用户
	//获取选择的电话号码
	let selectedTel = (arrlist) => {
		let telList = '';
		angular.forEach(arrlist,(item)=>{
			if(item.selected){
				telList += item.mobilePhone + ',';
			}
		});
		return telList;
	}
	//全选
	$scope.allSelect = function (element,datalist) {
	    if ($(element.target).prop('checked')) {
	    	angular.forEach(datalist, (item) => {
	    		item.selected = $(element.target).prop('checked');
	    	});
	    } else {
	        var midStatus = true;
	        angular.forEach(datalist, (item) => {
	    		midStatus = midStatus && item.selected;
	    	});
	        if (midStatus) {
	        	angular.forEach(datalist, (item) => {
	        		item.selected = false;
	        	});
	        }
	    }
	};
	//单选
	$scope.listItemSelect = function () {
	    var midStatus = true;
	    angular.forEach($scope.tablelistdata.data, (item) => {
	    	midStatus = midStatus && item.selected;
	    });
	    $scope.allselected = midStatus;
	}
	//初始化数据
	$scope.searchdata = {
		loginName:null,
		phoneNumber:null,
		userName:null,
		currentPage:1,
		pageSize:'10',
	}
	//获取列表数据
    $scope.getTableList = () => {
    	$http({
    		method: 'POST',
    		url:'/iccs/message/importUser',
    		data: {
				"loginName": $scope.searchdata.loginName,				
				"phoneNumber": $scope.searchdata.phoneNumber,
				"userName": $scope.searchdata.userName,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize										
			}
        }).then(function (response){
            // 接口调用成功
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
	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			loginName:null,
			phoneNumber:null,
			userName:null,
			currentPage:1,
			pageSize:'10',
		}
		$scope.getTableList();
	}
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