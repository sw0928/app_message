import commonbase from '../commonBase';

export default commonbase.controller('custAnalysisCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', '$filter', 'LocalData', 'SysPermission', 'Persist', function($scope, $http, $uibModalInstance, toastr, $filter, LocalData, SysPermission, Persist) { //拉黑
	//初始化数据
	$scope.accountType = LocalData.getObject('userInfo').accountType;
	$scope.SysPermission = SysPermission;
	$scope.userObj = [{
			userName: '销售总监',
			id: 4
		},
		{
			userName: '销售经理',
			id: 5
		},
		{
			userName: '客户经理',
			id: 6
		},
		{
			userName: '代理商',
			id: 7
		},
		{
			userName: '客户',
			id: 8
		},
		{
			userName: '直营客户',
			id: 100
		}
	];
	if($scope.accountType > 6) {
		$scope.userObj.pop()
	}
	$scope.userTypeObj = [];
	for(let i = 0; i < $scope.userObj.length; i++) {
		if($scope.accountType <= $scope.userObj[i].id) {
			$scope.userTypeObj.push($scope.userObj[i])
		}
	}
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 23:59:59',
		startDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 00:00:00',
		userName: '',
		userType: '',
		currentPage: 1,
		pageSize: '10',
		total: 0
	}

	//表单重置
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 00:00:00',
			userName: "",
			userType: "",
			currentPage: 1,
			pageSize: '10',
			total: 0
		}
		$scope.getTableList();
	}
	//导出
	$scope.importUserBalanceT = () => {
		$http({
			method: 'POST',
			url: '/iccs/statement/queryCustomerAnalysis',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"userName": $scope.searchdata.userName,
				"userType": $scope.searchdata.userType,
				"expTitle": "客户分析",
				"exp": "true",
				"offset": 0,
				"pageSize": 0
			},
			//responseType: 'arraybuffer'  
		}).then(function(response) {
			// 接口调用成功
			if(response.status === 200) {
				//console.log(response.data.data.expTaskId)
				setTimeout(function() {
					Persist.download(response.data.data.expTaskId);
				}, 1000)
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});
	}
	//获取列表数据
	$scope.getTableList = () => {
		$scope.showloading = 0;
		$http({
			method: 'POST',
			url: '/iccs/statement/queryCustomerAnalysis',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"userName": $scope.searchdata.userName,
				"userType": $scope.searchdata.userType,
				"offset": $scope.searchdata.currentPage,
				"pageSize": parseInt($scope.searchdata.pageSize)
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				$scope.tablelistdata = response.data.data;
				if(response.data.data) {
					$scope.searchdata.total = response.data.data.totalCount;
				}
			} else {
				//toastr.warning(response.data.message,'槽糕');
			}
		});
	}
	$scope.getTableList();

	$scope.searchtable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}
	//成功率
	$scope.rate = (num) => {

		return(num * 1 * 100).toFixed(1) + '%'
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.ensure = () => {
		$uibModalInstance.close(true);
	};

}]).controller('billComeCtrl', ['$scope', '$http', '$uibModalInstance', 'confirmdialog', 'toastr', '$filter', 'LocalData', 'billHisId', 'Persist', function($scope, $http, $uibModalInstance, confirmdialog, toastr, $filter, LocalData, billHisId, Persist) { //拉黑
	//初始化数据
	$scope.billHisId = billHisId;
	$scope.usersList = [];
	$scope.billTou = [];
	$scope.billCon = [];
	$scope.userArr = [];
	$scope.sw_obg = [];
	$scope.billTransList = [];
	$scope.generateShow = true;
	$scope.timeShow = false;
	$scope.searchdata = {
		endDate: '',
		startDate: '',
		loginName: '',
		userId: '',
		userType: '',
	};
	setTimeout(function() {
		var start = laydate.render({
			elem: '#start',
			//type: 'datetime',
			value: '' //必须遵循format参数设定的格式
				,
			done: function(value, date) {
				$scope.searchdata.startDate = value
				$scope.queryUserName()
			}
		});
		var end = laydate.render({
			elem: '#end',
			//type: 'datetime',
			value: '' //必须遵循format参数设定的格式
				,
			done: function(value, date, endDate) {
				$scope.searchdata.endDate = value
				$scope.queryUserName()
			}
		});
	}, 100)
	//查询用户
	$scope.queryUserName = () => {
		$http({
			method: 'POST',
			url: '/iccs/bill/queryUser',
			data: {
				startDate: $scope.searchdata.startDate,
				endDate: $scope.searchdata.endDate,
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				$scope.usersList = response.data.data;
			} else {
				toastr.warning('出了点小问题', '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};
	//表单重置
	$scope.resetForm = () => {
		$scope.timeShow = false;
		$('#start').val('');
		$('#end').val('');
		$scope.userArr = [];
		$scope.billTou = [];
		$scope.billCon = [];
		$scope.searchdata = {
			startDate: '',
			endDate: '',
			loginName: '',
			userId: "",
			userType: "",
		}
	}
	if($scope.billHisId == '-9999') {
		$scope.generateShow = false;
	} else {
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/bill/querySavedInfo',
			data: {
				'billHisId': $scope.billHisId
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			if(response.data.statusCode === 200) {
				$scope.billTou = response.data.data;
				$scope.billCon = response.data.data.billTransList;
				$scope.searchdata.startDate = response.data.data.startDate;
				$scope.searchdata.endDate = response.data.data.endDate;
				$scope.queryUserName()
				for(var i = 0; i < response.data.data.billTransList.length; i++) {
					$scope.userArr.push(response.data.data.billTransList[i].userId);
				}
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};
	//再次生成更新时间
	$scope.changeTime = () => {
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/bill/querySavedInfo',
			data: {
				'billHisId': $scope.billHisId,
				'startDate': $scope.searchdata.startDate,
				'endDate': $scope.searchdata.endDate
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			if(response.data.statusCode === 200) {
				$scope.timeShow = true;
				$scope.userArr = [];
				$scope.generateShow = false;
				$scope.billTou = response.data.data;
				$scope.billCon = response.data.data.billTransList;
				$scope.searchdata.startDate = response.data.data.startDate;
				$scope.searchdata.endDate = response.data.data.endDate;
				$scope.queryUserName()
				for(var i = 0; i < response.data.data.billTransList.length; i++) {
					$scope.userArr.push(response.data.data.billTransList[i].userId);
				}
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	//获取列表数据
	$scope.getTableList = () => {
		if($scope.searchdata.startDate == '') {
			toastr.warning('请选择开始时间！', '槽糕');
			return false;
		}
		if($scope.searchdata.endDate == '') {
			toastr.warning('请选择结束时间！', '槽糕');
			return false;
		}
		if($scope.searchdata.loginName == '') {
			toastr.warning('请选择用户！', '槽糕');
			return false;
		}
		$scope.showloading = 0;
		let userId = $scope.searchdata.loginName.split('-')[0];
		let userType = $scope.searchdata.loginName.split('-')[1]
		$http({
			method: 'POST',
			url: '/iccs/bill/query',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"userId": userId,
				"userType": userType,
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				$scope.timeShow = true;
				if($scope.billTou == '') {
					$scope.billTou = response.data.data;
				}

				for(var i = 0; i < $scope.userArr.length; i++) {
					if($scope.userArr[i] == userId) {
						toastr.warning('该用户已经出账了！', '槽糕');
						return false;
					}
				}
				for(var i = 0; i < response.data.data.billTransList.length; i++) {
					var obj = {};
					obj.loginName = response.data.data.billTransList[i].loginName;
					obj.totalNum = response.data.data.billTransList[i].totalNum;
					obj.typeName = response.data.data.billTransList[i].typeName;
					obj.unitPrice = response.data.data.billTransList[i].unitPrice;
					obj.userId = response.data.data.billTransList[i].userId;
					$scope.billCon.push(obj);
				}
				if(response.data.data.billTransList.length > 0) {
					$scope.userArr.push(userId);
				}

			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});
	}
	//$scope.getTableList();

	$scope.searchtable = () => {
		//$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}
	//价格
	$scope.totalPrice = (num) => {
		return(num).toFixed(2)
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.generate = () => {
		$scope.billTransList = [];
		$scope.sw_obg = [];
		let generateArr = {
			"startDate": "",
			"endDate": "",
			"userName": "",
			"domain": "",
			"contract": null,
			"mobile": "",
			"accountName": "",
			"accountBank": "",
			"accountNum": "",
			"address": "",
			"expenseDate": "",
			"payDate": "",
			"billTransList": []
		}
		$scope.showloading = 0;
		generateArr.startDate = $scope.billTou.startDate;
		generateArr.accountBank = $scope.billTou.accountBank;
		generateArr.accountName = $scope.billTou.accountName;
		generateArr.accountNum = $scope.billTou.accountNum;
		generateArr.address = $scope.billTou.address;
		generateArr.company = $scope.billTou.company;
		generateArr.contract = $scope.billTou.contract;
		generateArr.domain = $scope.billTou.domain;
		generateArr.endDate = $scope.billTou.endDate;
		generateArr.expenseDate = $scope.billTou.expenseDate;
		generateArr.mobile = $scope.billTou.mobile;
		generateArr.payDate = $scope.billTou.payDate;
		generateArr.userName = $scope.billTou.userName;
		let generateObj = $('.generate');
		//console.log(generateObj)
		for(let i = 0; i < generateObj.length; i++) {
			let tdObj = $(generateObj[i]).find('td');
			let obj = [];
			for(let j = 0; j < tdObj.length; j++) {
				let value = $(tdObj[j]).find('input').val();
				obj[j] = value;
			}
			$scope.sw_obg.push(obj);
		}
		//console.log($scope.sw_obg)
		for(let i = 0; i < $scope.sw_obg.length; i++) {
			let obj1 = {};
			obj1.loginName = $scope.sw_obg[i][0];
			obj1.typeName = $scope.sw_obg[i][1];
			obj1.totalNum = $scope.sw_obg[i][2];
			obj1.unitPrice = $scope.sw_obg[i][3];
			obj1.userId = $scope.sw_obg[i][5];
			$scope.billTransList.push(obj1);
		};
		//console.log()
		generateArr.billTransList = $scope.billTransList;
		if(generateArr.billTransList.length == 0) {
			$scope.showloading = 1;
			toastr.warning('当前无出账内容！', '槽糕');
			return false;
		}
		$http({
			method: 'POST',
			url: '/iccs/bill/save',
			data: generateArr
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});

	};
	//<td class='del-col'><a href='javascript:void(0);' class='delBtn'>删除</a></td>
	/*下面兩段开始添加删除行**/
	$scope.addBtn = () => {
		$("<tr class='generate add_table'><td><input/></td><td><input/></td><td><input/></td><td><input/></td><td><input/></td><td style=" + "'display:none;'" + "><input /></td></tr>").insertBefore(".append-row");
		// $scope.trEdit();
		//$scope.delTr();
		$(".edtitable tr:odd").css("background-color", "#EEEEEE");
	};
	//删除
	$scope.clearBtn = () => {
		$(".add_table").last().remove();
	};
	//我们需要找到所有的单元格
	$scope.trEdit = (e) => {
		//找到当前鼠标点击的td,this对应的就是响应了click的那个td
		let tdObj = $(e.target);
		//console.log(tdObj.val())		
		//是文本框插入之后就被选中
		tdObj.trigger("focus").trigger("select");
		tdObj.click(function() {
			return false;
		});
		//处理文本框上回车和esc按键的操作
		tdObj.keyup(function(event) {
			//获取当前按下键盘的键值
			let keycode = event.which;
			//处理回车的情况
			if(keycode == 13) {
				//获取当当前文本框中的内容				
				let inputtext = tdObj.val();
				//将td的内容修改成文本框中的内容
				tdObj.html(inputtext);
				tdObj.blur();
			}

		});
	};
	$scope.blurNum = (e) => {
		//找到当前鼠标点击的td,this对应的就是响应了click的那个td
		let jqInput = $(e.target);
		let amount = jqInput.parent().parent().find('.amount').val();
		let price = jqInput.parent().parent().find('.price').val();
		let figure = (amount * price).toFixed(2);
		jqInput.parent().parent().find('.figure').val(figure)
	};

}]).controller('reportComeCtrl', ['$scope', '$http', '$uibModalInstance', 'confirmdialog', 'toastr', '$filter', 'LocalData', 'Persist', function($scope, $http, $uibModalInstance, confirmdialog, toastr, $filter, LocalData, Persist) { //拉黑
	//初始化数据
	$scope.usersList = [];
	$scope.tablelistdata = [];
	$scope.searchdata = {
		endDate: '',
		startDate: '',
		loginName: '',
		userId: '',
		userType: '',
	};
	setTimeout(function() {
		var start = laydate.render({
			elem: '#start',
			//type: 'datetime',
			value: '' //必须遵循format参数设定的格式
				,
			done: function(value, date) {
				$scope.searchdata.startDate = value

			}
		});
		var end = laydate.render({
			elem: '#end',
			//type: 'datetime',
			value: '' //必须遵循format参数设定的格式
				,
			done: function(value, date, endDate) {
				$scope.searchdata.endDate = value
			}
		});
	}, 100)
	//查询用户
	$scope.queryUserName = () => {
		$http({
			method: 'POST',
			url: '/iccs/addMoney/queryUserName',
			params: {
				userName: ''
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				$scope.usersList = response.data.data;
			} else {
				toastr.warning('出了点小问题', '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	};
	$scope.queryUserName()
	//表单重置
	$scope.resetForm = () => {
		$('#start').val('');
		$('#end').val('');
		$scope.tablelistdata = [];
		$scope.searchdata = {
			startDate: '',
			endDate: '',
			loginName: '',
			userId: "",
			userType: "",
		}
	}
	//获取列表数据
	$scope.getTableList = () => {
		if($scope.tablelistdata.length > 0) {
			toastr.warning('只能选择一个用户！', '槽糕');
			return false;
		}
		if($scope.searchdata.startDate == '') {
			toastr.warning('请选择开始时间！', '槽糕');
			return false;
		}
		if($scope.searchdata.endDate == '') {
			toastr.warning('请选择结束时间！', '槽糕');
			return false;
		}
		if($scope.searchdata.loginName == '') {
			toastr.warning('请选择用户！', '槽糕');
			return false;
		}
		$scope.showloading = 0;
		$http({
			method: 'POST',
			url: '/iccs/analyse/queryAnalyse',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				if(response.data.data != null){
					$scope.tablelistdata.push(response.data.data);
				}			
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});
	}
	//$scope.getTableList();

	$scope.searchtable = () => {
		//$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}
	//价格

	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定
	$scope.generate = () => {
		$scope.showloading = 0;
		$http({
			method: 'POST',
			url: '/iccs/analyse/saveAnalyse',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});

	};
}])