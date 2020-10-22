import commonbase from '../commonBase';
export default commonbase.controller('performanceCtrl', ['$scope', 'confirmdialog', '$interval', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', 'SysPermission', '$filter', function($scope, confirmdialog, $interval, Persist, $http, toastr, $uibModal, LocalData,SysPermission, $filter) {
	$scope.per = Persist;
	$scope.per.asideswitch = 2;
	$scope.per.showLeft = 1;
	$scope.per.navmodel = 'statisticsmodule';
	$scope.SysPermission = SysPermission;
	//$scope.Authorization = LocalData.get('Authorization');
	//初始化数据
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		loginName: '',
		sendType: '',
		orderType: '',
		currentPage: 1,
		pageSize: '10',
		total: 0
	}

	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			loginName: '',
			sendType: '',
			orderType: '',
			currentPage: 1,
			pageSize: '10'
		}
		$scope.getTableList();
	}
	//导出
	$scope.importUserBalance = () => {
		$http({
			method: 'POST',
			url: '/iccs/statement/queryPerformanceList',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"sendType": $scope.searchdata.sendType,
				"orderType": $scope.searchdata.orderType,
				"expTitle": "业绩统计",
				"exp": "true",
				"offset": 0,
				"pageSize": 0
			},
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
	//获取列表数据
	$scope.getTableList = () => {
		$scope.showloading = 0;
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/statement/queryPerformanceList',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"sendType": $scope.searchdata.sendType,
				"orderType": $scope.searchdata.orderType,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
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
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList();

	$scope.searchtable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}

	$scope.custAnalysis = () => {
		let custAnalysis = $uibModal.open({
			animation: true,
			templateUrl: '../../resources/views/statistics/custanalysis.html',
			controller: 'custAnalysisCtrl',
			size: 'xl',
			resolve: {

			}
		});

		custAnalysis.result.then(function(data) {

		}, function() {

		});
	}

}]).controller('sendnumderCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', '$filter', function($scope, Persist, $http, toastr, $uibModal, LocalData, $filter) {
	$scope.per = Persist;
	$scope.per.asideswitch = 2;
	$scope.per.showLeft = 1;
	$scope.per.navmodel = 'statisticsmodule';
	//初始化数据
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		loginName: LocalData.get('current'),
		sendType: '',
		orderType: '',
		currentPage: 1,
		pageSize: '10',
		total: 0
	}

	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			startDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			loginName: LocalData.get('current'),
			sendType: '',
			orderType: '',
			currentPage: 1,
			pageSize: '10'
		}
		$scope.getTableList();
	}
	//导出
	$scope.importUserBalance = () => {
		$http({
			method: 'POST',
			url: '/iccs/export/performanceListExcelOut',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"sendType": $scope.searchdata.sendType,
				"orderType": $scope.searchdata.orderType,
				"offset": 0,
				"pageSize": 0
			},
			responseType: 'arraybuffer'
		}).then(function(response) {
			// 接口调用成功
			if(response.status === 200) {
				//          	var blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
				//              var objectUrl = URL.createObjectURL(blob);
				//              var a = document.createElement('a');
				//              document.body.appendChild(a);
				//              a.setAttribute('style', 'display:none');
				//              a.setAttribute('href', objectUrl);
				//              var filename="业绩统计.xls";
				//              a.setAttribute('download', filename);
				//              a.click();
				//              URL.revokeObjectURL(objectUrl);
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		});
	}
	//获取列表数据
	$scope.getTableList = () => {
		$scope.showloading = 0;
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/statement/queryPerformanceList',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"sendType": $scope.searchdata.sendType,
				"orderType": $scope.searchdata.orderType,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				//console.log(response)
				$scope.tablelistdata = response.data.data;
				if(response.data.data) {
					$scope.searchdata.total = response.data.data.totalCount;
				}
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList();

	$scope.searchtable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}

//	$scope.custAnalysis = () => {
//		let custAnalysis = $uibModal.open({
//			animation: true,
//			templateUrl: '../../resources/views/statistics/custanalysis.html',
//			controller: 'custAnalysisCtrl',
//			size: 'xl',
//			resolve: {
//
//			}
//		});
//
//		custAnalysis.result.then(function(data) {
//
//		}, function() {
//
//		});
//	}

}]).controller('billCtrl', ['$scope', 'confirmdialog', '$interval', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', '$filter', function($scope, confirmdialog, $interval, Persist, $http, toastr, $uibModal, LocalData, $filter) {
	$scope.per = Persist;
	$scope.per.asideswitch = 2;
	$scope.per.showLeft = 1;
	$scope.per.navmodel = 'statisticsmodule';
	//$scope.Authorization = LocalData.get('Authorization');
	$scope.getDay = (day) => {
		//Date()返回当日的日期和时间。
		var days = new Date();
		//getTime()返回 1970 年 1 月 1 日至今的毫秒数。
		var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
		//setTime()以毫秒设置 Date 对象。
		days.setTime(gettimes);
		var year = days.getFullYear();
		var month = days.getMonth() + 1;
		if(month < 10) {
			month = "0" + month;
		}
		var today = days.getDate();
		if(today < 10) {
			today = "0" + today;
		}
		return year + "-" + month + "-" + today;
	}
	//初始化数据
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		startDate: $scope.getDay(-90),
		loginName: '',
		currentPage: 1,
		pageSize: '10',
		total: 0
	}

	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			startDate: $scope.getDay(-90),
			loginName: '',
			currentPage: 1,
			pageSize: '10'
		}
		$scope.getTableList();
	}
	//获取列表数据
	$scope.getTableList = () => {
		$scope.showloading = 0;
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/bill/querySaveHis',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			//console.log(response.data.data)
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				$scope.tablelistdata = response.data.data;
				$scope.searchdata.total = response.data.data.totalCount;
				//           	if(response.data){
				//          		
				//          	}            	
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList();

	$scope.searchtable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}
	//出账 
	$scope.custAnalysis = (billHisId) => {
		//console.log(billHisId)
		let custAnalysis = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '../../resources/views/statistics/bill_come.html',
			controller: 'billComeCtrl',
			size: 'xl',
			resolve: {
				billHisId: function() {
					return billHisId;
				}
			}
		});

		custAnalysis.result.then(function(data) {
			$scope.getTableList();
		}, function() {
			$scope.getTableList();
		});
	};
	//查看
	$scope.showDetail = (orderInfo) => {
		let orderDetail = $uibModal.open({
			animation: true,
			templateUrl: '../../resources/views/dialog/billDetil.html',
			controller: 'billDetilCtrl',
			//appendTo: $('.order-browse'),
			size: 'xl',
			resolve: {
				orderInfo: function() {
					return orderInfo;
				}
			}
		});

		orderDetail.result.then(function(data) {

		}, function() {

		});
	};
	//删除
	$scope.deleteTemplate = (paramData) => {
		confirmdialog.showdialog('您确认要作废该账单么？').then(function() {
			//确定
			$http({
				method: 'POST',
				url: '/iccs/bill/delete',
				params: {
					"id": paramData.id
				}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					confirmdialog.successdialog(response.data.message).then(function() {
							$scope.getTableList();
						});
					
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			}, function() {

			})
		}, function() {
			//取消

		})
	}

}]).controller('reportCtrl', ['$scope', 'confirmdialog', '$interval', 'Persist', '$http', 'toastr', '$uibModal', 'LocalData', '$filter', function($scope, confirmdialog, $interval, Persist, $http, toastr, $uibModal, LocalData, $filter) {
	$scope.per = Persist;
	$scope.per.asideswitch = 2;
	$scope.per.showLeft = 1;
	$scope.per.navmodel = 'statisticsmodule';
	//$scope.Authorization = LocalData.get('Authorization');
	$scope.getDay = (day) => {
		//Date()返回当日的日期和时间。
		var days = new Date();
		//getTime()返回 1970 年 1 月 1 日至今的毫秒数。
		var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
		//setTime()以毫秒设置 Date 对象。
		days.setTime(gettimes);
		var year = days.getFullYear();
		var month = days.getMonth() + 1;
		if(month < 10) {
			month = "0" + month;
		}
		var today = days.getDate();
		if(today < 10) {
			today = "0" + today;
		}
		return year + "-" + month + "-" + today;
	}
	//初始化数据
	$scope.searchdata = {
		endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
		startDate: $scope.getDay(-90),
		loginName: '',
		currentPage: 1,
		pageSize: '10',
		total: 0
	}

	//重置表单
	$scope.resetForm = () => {
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd"),
			startDate: $scope.getDay(-90),
			loginName: '',
			currentPage: 1,
			pageSize: '10'
		}
		$scope.getTableList();
	}
	//获取列表数据
	$scope.getTableList = () => {
		$scope.showloading = 0;
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/analyse/queryAnalyseHis',
			data: {
				"startDate": $scope.searchdata.startDate,
				"endDate": $scope.searchdata.endDate,
				"loginName": $scope.searchdata.loginName,
				"offset": $scope.searchdata.currentPage,
				"pageSize": $scope.searchdata.pageSize
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			//console.log(response.data.data)
			$scope.showloading = 1;
			if(response.data.statusCode === 200) {
				$scope.tablelistdata = response.data.data;
				$scope.searchdata.total = response.data.data.totalCount;
				// 	console.log(response.data)
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList();

	$scope.searchtable = () => {
		$scope.searchdata.currentPage = 1;
		$scope.getTableList();
	}
	//生成
	$scope.custAnalysis = () => {
		//console.log(billHisId)
		let custAnalysis = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: '../../resources/views/statistics/report_come.html',
			controller: 'reportComeCtrl',
			size: 'xl',
			//			resolve: {
			//				billHisId: function() {
			//					return billHisId;
			//				}
			//			}
		});

		custAnalysis.result.then(function(data) {
			$scope.getTableList();
		}, function() {
			$scope.getTableList();
		});
	};
	//查看
	$scope.showDetail = (orderInfo) => {
		let orderDetail = $uibModal.open({
			animation: true,
			templateUrl: '../../resources/views/dialog/reportDetil.html',
			controller: 'reportDetilCtrl',
			//appendTo: $('.order-browse'),
			size: 'xl',
			resolve: {
				orderInfo: function() {
					return orderInfo;
				}
			}
		});

		orderDetail.result.then(function(data) {

		}, function() {

		});
	};
	//删除
	$scope.deleteTemplate = (paramData) => {
		confirmdialog.showdialog('您确认要作废该报告么？').then(function() {
			//确定
			$http({
				method: 'POST',
				url: '/iccs/analyse/deleteAnalyse',
				params: {
					"sn": paramData.sn
				}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					//$scope.getTableList();
					confirmdialog.successdialog(response.data.message).then(function() {
							$scope.getTableList();
						});
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			}, function() {

			})
		}, function() {
			//取消

		})
	}

}]).controller('billDetilCtrl', ['$scope', 'LocalData', '$uibModalInstance', 'toastr', 'orderInfo', '$window', '$http', function($scope, LocalData, $uibModalInstance, toastr, orderInfo, $window, $http) { //订单详情
	$scope.tabletype = 1;
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	//获取列表数据
	$scope.getTableList = () => {
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/bill/querySavedInfo',
			data: {
				'billHisId': orderInfo.id
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			if(response.data.statusCode === 200) {
				$scope.tablelistdata = response.data.data;
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList()
	//价格
	$scope.totalPrice = (num) => {
		return(num).toFixed(2)
	}
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
				tdObj.val(inputtext);
				tdObj.blur();
			}

		});
	};
	$scope.blurNum = (e) => {
		//找到当前鼠标点击的td,this对应的就是响应了click的那个td
		let jqInput = $(e.target);
		let amount = jqInput.parent().parent().find('.amount').val();
		jqInput.parent().parent().find('.amount').val(amount)
	};
	// 确定
	$scope.ensure = () => {		
		$('.company').html($('.amount').val());
		var newstr = document.getElementById("printBill").outerHTML;
		//var oldstr = document.body.outerHTML; 
		//console.log(newstr);
		document.body.innerHTML = "<div style='padding:50px 30px;'>" + newstr + "</div>";
		window.print();
		//document.body.innerHTML = oldstr; 
		$window.location.reload();
		return false;
		//  $uibModalInstance.close(true);        
	};

}]).controller('reportDetilCtrl', ['$scope', 'LocalData', '$uibModalInstance', 'echarts', 'toastr', 'orderInfo', '$window', '$http', function($scope, LocalData, $uibModalInstance, echarts, toastr, orderInfo, $window, $http) { //订单详情
	$scope.tabletype = 1;
	$scope.tablelistdata = [];
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	//获取列表数据
	$scope.getTableList = () => {
		$http({
			headers: {
				Authorization: LocalData.get('Authorization')
			},
			method: 'POST',
			url: '/iccs/analyse/queryAnalyseInfo',
			params: {
				'sn': orderInfo.sn
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null) {
				LocalData.set('Authorization', response.headers("Authorization"));
			}
			if(response.data.statusCode === 200) {
				$scope.tablelistdata.push(response.data.data);
				$scope.sent_fail = response.data.data.failTrans;
			} else {
				toastr.warning(response.data.message, '槽糕');
			}
		}, function errorCallback() {
			toastr.error('系统内部错误', '错误');
		});
	}
	$scope.getTableList();
	setTimeout(function() {
		let heigW = $('.edtitable').innerWidth() * 0.9;
		$('#send_tong').width(heigW + 'px');
		$('#send_fail').width(heigW + 'px');
		let send_failArr = [],
			send_failObj = [];
		for(let i = 0; i < $scope.sent_fail.length; i++) {
			let obj = {
				value: null,
				name: '',
			};
			let arr = [];
			obj.value = $scope.sent_fail[i].totalNum;
			obj.name = $scope.sent_fail[i].errorCode +'('+ $scope.sent_fail[i].totalNum +')';
			send_failObj.push(obj);
			send_failArr.push($scope.sent_fail[i].errorCode +'('+ $scope.sent_fail[i].totalNum +')');
		};
		//console.log(send_failArr,send_failObj)
		//發送情況统计
		let myChart1 = echarts.init(document.getElementById('send_tong'));
		//console.log(myChart)
		// 指定图表的配置项和数据	   
		myChart1.clear();
		myChart1.setOption({
			backgroundColor: {
				type: 'linear',
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: '#fff' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#a1caf5' // 100% 处的颜色
				}],
				global: false // 缺省为 false
			},
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				top: '16%',
				left: '2%',
				width: '98%',
				height: '80%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: ['提交总量', '发送成功量', '回执总量', '回执成功总量', '回执失败总量', '回执未知总量'],

			},
			yAxis: {
				type: 'value',
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
					}
				},
				splitLine: {
					show: false,
				}
			},
			series: [{
				data: [$scope.tablelistdata[0].mtAmount, $scope.tablelistdata[0].mtSend, $scope.tablelistdata[0].receiptCnt,
					$scope.tablelistdata[0].mtReceiptSuccess, $scope.tablelistdata[0].mtReceiptFail, $scope.tablelistdata[0].mtReceiptUnknow
				],
				barWidth: 70,
				type: 'bar',
				itemStyle: {
					color: '#3784D2',
				},
				label: {
					normal: {
						show: true,
						color: '#000',
						position: 'top',
					}
				}
			}]
		});
		if($scope.sent_fail.length != 0) {

			let myChart2 = echarts.init(document.getElementById('send_fail'));
			myChart2.clear();
			myChart2.setOption({
				backgroundColor: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 0,
						color: '#fff' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#a1caf5' // 100% 处的颜色
					}],
					global: false // 缺省为 false
				},
				legend: {
					x: 'center',
					y: 'bottom',
					data: send_failArr
				},
				tooltip: {
					trigger: 'item',
				},
				series: [{
					name: '运营商占比',
					type: 'pie',
					radius: '80%',
					center: ['50%', '50%'],
					data: send_failObj,
					label: {
						normal: {
							color: '#333',
							formatter: '{c}',
							position: 'outside'
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}],
				//color: ['#9966ff', '#669900', '#3366ff']
			});
		} else {
			//$('#send_fail').height('0px');
		}

	}, 200)

	// 确定
	$scope.ensure = () => {
		//var oldstr = document.body.outerHTML; 
		let myChart = echarts.init(document.getElementById('send_tong'));
		// 把echarts图片转成64编码的图片
		var img = new Image();
		var imgSrc = myChart.getDataURL();
		// 渲染到图表上面，遮住图表
		img.src = imgSrc;
		// 图片加载完成之后
		img.onload = function() {
			if($scope.sent_fail.length != 0) {
				let myChartB = echarts.init(document.getElementById('send_fail'));
				// 把echarts图片转成64编码的图片
				var imgB = new Image();
				var imgSrcB = myChartB.getDataURL();
				// 渲染到图表上面，遮住图表
				imgB.src = imgSrcB;
				// 图片加载完成之后
				imgB.onload = function() {
					// 执行打印
						var newstr = document.getElementById("printBill").outerHTML;
						var fail = document.getElementById("fail").outerHTML;
						newstr = newstr + '<img src="' + imgSrc + '"/>';
						newstr = newstr + "<div style='padding:50px 0px 0px 0px'>" + fail + "</div>";
						newstr = newstr + '<img src="' + imgSrcB + '"/>';
						document.body.innerHTML = "<div style='padding:50px 30px;text-align: center;'>" + newstr + "</div>";
						window.print();
						$window.location.reload();
						return false;					 
				}

			} else {
						var newstr = document.getElementById("printBill").outerHTML;
						newstr = newstr + '<img src="' + imgSrc + '"/>';
						document.body.innerHTML = "<div style='padding:50px 30px;text-align: center;'>" + newstr + "</div>";
						window.print();
						$window.location.reload();
						return false;
			}
		}
	};

}]);