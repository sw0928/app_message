import commonbase from '../commonBase';

export default commonbase.controller('datacenter', ['$scope', '$filter', 'SysPermission', '$interval', 'Persist', '$http', 'toastr', '$uibModal', '$state', 'echarts', 'LocalData',
	function($scope, $filter, SysPermission, $interval, Persist, $http, toastr, $uibModal, $state, echarts, LocalData) {

		$scope.per = Persist;
		$scope.per.asideswitch = 1;
		$scope.per.navmodel = 'datacenter';
		//显示与隐藏数据
		$scope.showPricing = true;
		$scope.showCreditdata = false;
		$scope.balance = null;
		$scope.credit = null;
		// 计算总量
		let calculateAmount = (listarr) => {
			let count = 0;
			angular.forEach(listarr, (item) => {
				count += item;
			});
			return count;
		}
		//处理数字显示
		$scope.dealNumFormat = (param) => {
			param = param.toString();
			if(param) {
				return param.replace(/\B(?=(?:\d{3})+\b)/g, ',');
			}
		}
		//本地存储取数据
		//LocalData.get('Authorization');

		//-------账户余额  信用额度   定价
		$scope.userdata = {
			userAccount: null,
			userPrice: null
		}
		$scope.queryUserPriceAndAccount = () => {
			$http({
				method: 'POST',
				url: '/iccs/capital/queryUserPrice'
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					$scope.userdata.userPrice = response.data.data;
				}
			});
			$http({
				method: 'POST',
				url: '/iccs/user/queryUserAccountInfo'
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					$scope.userdata.userAccount = response.data.data;
					$scope.balance = Math.round($scope.userdata.userAccount.balance / 10000);
					$scope.credit = Math.round($scope.userdata.userAccount.credit / 10000)
				}
			});
		}
		// 初始
		$scope.queryUserPriceAndAccount();
		//-------首页信息
		$scope.queryRemindList = () => {
			$http({
				method: 'POST',
				url: '/iccs/remind/queryRemindList',
					data: {					
						"offset": 0,
						"pageSize": 10,						
					}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					//console.log(response.data.data)
					$scope.remindList = response.data.data;
				}else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		// 初始
		$scope.queryRemindList();
		//查看信息
    $scope.remindDetil = (dataitem) => {
    	//console.log(dataitem)
    	let remindDetil = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/dialog/remindDetil.html',
            controller: 'remindDetilCtrl',
            appendTo:	$('.main-cont'),
            resolve: {
              remindInfo:function () {
              	return $http({
								method: 'POST',
								url: '/iccs/remind/queryInfo',
								data: {
									"id": dataitem.id,									
								}
							}).then(function(response) {
								// 接口调用成功
								
								if(response.data.statusCode === 200) {
									 return response.data.data;									
								} else {
									toastr.warning(response.data.message, '槽糕');
								}
							});
				}
            }
        });

        remindDetil.result.then(function (data) {
            //$scope.userInfo.httpDeliver = data
        }, function () {
            
        });
    }
		//---------发送量
		$scope.sendLine = {
			ordertype: "",
			sendtype: "",
			amount: 0
		}
		//获得发送量
		$scope.getSendAmount = () => {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('send-amount'));
			//console.log(myChart)
			// 指定图表的配置项和数据	   
			myChart.clear();
			myChart.setOption({
				legend: {
					data: ['总量', '状态成功量', '状态失败量']
				},
				tooltip: {
					trigger: 'axis'
				},
				grid: {
	        left: '0%',
	        right: '4%',
	        bottom: '1%',
	        containLabel: true
    		},
				xAxis: {
					type: 'category',
        	boundaryGap: false,
					data: []
				},
				yAxis: {
					type: 'value'
				},
				series: []
			});
			$http({
				method: 'POST',
				url: '/iccs/statistics/statisticsSendScale',
				data: {
					"orderType": $scope.sendLine.ordertype,
					"sendType": $scope.sendLine.sendtype
				}
			}).then(function(response) {
				// 接口调用成功
				if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
				if(response.data.statusCode === 200) {
					$scope.sendLine.amount = calculateAmount(response.data.data.barData.MTTOTAL);
					myChart.setOption({
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: response.data.data.barData.date
						},
						series: [{
								name: '总量',
								type: 'line',
								data: response.data.data.barData.MTTOTAL
							},
							{
								name: '状态成功量',
								type: 'line',
								data: response.data.data.barData.MTSUCCESS
							},
							{
								name: '状态失败量',
								type: 'line',
								data: response.data.data.barData.MTFAILED
							}
						]
					});
					$("#send-amount").resize(function(){
								myChart.resize();
						});
				}
			});
		};
		$scope.customer = {
			amount: 0
		}
		//新增客户
		$scope.getNewAddCust = () => {
			var myChart1 = echarts.init(document.getElementById('new-customer'));
			myChart1.clear();
			myChart1.setOption({
				title: {
	        left: 'center',
	        text: '新增客户折线图',
	        textStyle:{
	        	color:'#29ABE4',
	        	fontWeight:400
	        },	        
    		},
				tooltip: {
					trigger: 'axis'
				},
				grid: {
	        left: '0%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
    		},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [],
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: {
					type: 'value',
					min:0,
					max:10
				},
				series: []
			});
			$http({
				method: 'POST',
				url: '/iccs/statistics/statisticsNewClient',
				data: {

				}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					$scope.customer.amount = calculateAmount(response.data.data.barData.CUT);
					myChart1.setOption({
						//name:'新增客户数',
						//type:'bar',
						//barWidth: '20%',
						xAxis: {
							type: 'category',
							data: response.data.data.barData.dates,
							axisTick: {
								alignWithLabel: true
							}
						},
						series: [{
							name: '新增客户数',
							type: 'line',
							data: response.data.data.barData.CUT
						}]
						//data:response.data.data.barData.CUT
					});
//					window.addEventListener("resize", function () {
//						myChart1.resize();
//					});
					$("#new-customer").resize(function(){
								myChart1.resize();
						});
				}
			});

		};
		$scope.ispSendcount = {};
		//ISP发送情况
		$scope.getISPdata = () => {
			let myChart2 = echarts.init(document.getElementById('ISP-circle'));
			myChart2.setOption({
				color: ['#8ec31e', '#3a83ff', '#84b2ff'],
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: {
					name: '访问来源',
					type: 'pie',
					radius: ['50%', '90%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '20'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: []
				}
			});
			$http({
				method: 'POST',
				url: '/iccs/statistics/statisticsSendStatus',
				data: {

				}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					$scope.ispSendcount = response.data.data.pieDate[0];
					myChart2.setOption({
						series: {
							data: [{
									value: response.data.data.pieDate[0].YDCOUNT,
									name: '中国移动'
								},
								{
									value: response.data.data.pieDate[0].LTCOUNT,
									name: '中国联通'
								},
								{
									value: response.data.data.pieDate[0].DXCOUNT,
									name: '中国电信'
								}
							]
						}
					})
				}
			});
		}
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 00:00:00',
			loginName: '',
			mobileNumber: '',
			msgContent: '',
			currentPage: 1,
			pageSize: '3',
			queryType: 0,
			sendType: '',
			total: 0
		}
		//获取订单列表
		$scope.getOrderTableList = () => {
			$http({
				method: 'POST',
				url: '/iccs/order/queryOrderList',
				data: {
					"startDate": $scope.searchdata.startDate,
					"endDate": $scope.searchdata.endDate,
					"loginName": $scope.searchdata.loginName,
					"mobileNumber": $scope.searchdata.mobileNumber,
					"msgContent": $scope.searchdata.msgContent,
					"offset": $scope.searchdata.currentPage,
					"pageSize": $scope.searchdata.pageSize,
					"queryType": parseInt($scope.searchdata.queryType),
					"sendType": $scope.searchdata.sendType
				}
			}).then(function(response) {
				// 接口调用成功
				$scope.showloading = 1;
				if(response.data.statusCode === 200) {
					$scope.tablelistdata = response.data.data;
					if(response.data.data) {
						
					}
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		$scope.getOrderTableList()
	}
]);