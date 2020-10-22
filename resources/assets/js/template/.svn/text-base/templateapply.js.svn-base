import commonbase from '../commonBase';
export default commonbase.controller('templateApplyCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'confirmdialog', 'LocalData', '$filter', '$window', 'SysPermission',
	function($scope, Persist, $http, toastr, $uibModal, confirmdialog, LocalData, $filter, $window, SysPermission) {
		$scope.per = Persist;
		$scope.SysPermission = SysPermission;
		$scope.per.asideswitch = 7;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'templatemodule';
		//console.log($scope.per)
		//初始化数据
		$scope.searchdata = {
			loginName: null,
			review: null,
			templateSms: null,
			currentPage: 1,
			pageSize: '10'
		}
		$scope.total = 0;
		//重置
		$scope.resetFrom = () => {
			$scope.searchdata = {
				loginName: null,
				review: null,
				templateSms: null,
				currentPage: 1,
				pageSize: '10'
			}
			$scope.getTableList();
		}
		//获取列表数据
		$scope.getTableList = () => {
			$scope.showloading = 0;
			$http({
				method: 'POST',
				url: '/iccs/template/templateApplyList',
				data: {
					"loginName": $scope.searchdata.loginName,
					"review": $scope.searchdata.review,
					"templateSms": $scope.searchdata.templateSms,
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
					$scope.total = response.data.data.totalCount;
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		$scope.getTableList();

		$scope.searchtable = () => {
			$scope.searchdata.currentPage = 1;
			$scope.getTableList();
		}

		//申请模板
		$scope.addtemplateApply = () => {
			let addtemplate = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/template/addtemplate.html',
				controller: 'addtemplate',
				size: 'lg'
			});

			addtemplate.result.then(function(data) {
				$scope.getTableList();
			}, function() {

			});
		}

		//审核
		$scope.auditing = (paramData) => {
			let auditing = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/template/auditing.html',
				controller: 'auditingCtrl',
				appendTo: $('.order-browse'),
				size: 'lg',
				resolve: {
					templateData: function() {
						return $http({
							method: 'POST',
							url: '/iccs/template/templateApplyInfo',
							params: {
								"templateId": paramData.templateId
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

			auditing.result.then(function(data) {
				$scope.getTableList();
			}, function() {

			});
		}

		//查看
		$scope.showDetail = (paramData) => {
			let showDetail = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/template/templatedetail.html',
				controller: 'detailCtrl',
				appendTo: $('.order-browse'),
				size: 'lg',
				resolve: {
					templateData: function() {
						return $http({
							method: 'POST',
							url: '/iccs/template/templateApplyInfo',
							params: {
								"templateId": paramData.templateId
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

			showDetail.result.then(function(data) {
				$scope.getTableList();
			}, function() {

			});
		}

		//删除
		$scope.deleteTemplate = (paramData) => {
			confirmdialog.showdialog('您确认要删除该模版么？').then(function() {
				//确定
				$http({
					method: 'POST',
					url: '/iccs/template/removeTemplateApply',
					params: {
						"templateId": paramData.templateId
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

	}
]).controller('templateVoiceCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'confirmdialog', 'LocalData', '$filter', '$window', 'SysPermission',
	function($scope, Persist, $http, toastr, $uibModal, confirmdialog, LocalData, $filter, $window, SysPermission) {
		$scope.per = Persist;
		$scope.SysPermission = SysPermission;
		$scope.per.asideswitch = 7;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'templatemodule';
		//console.log($scope.per)
		//初始化数据
		$scope.searchdata = {
			endDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 23:59:59',
			startDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 00:00:00',
			status: '',
			currentPage: 1,
			pageSize: '10',
			total: 0
		}
		$scope.total = 0;
		//重置
		$scope.resetFrom = () => {
			$scope.searchdata = {
				endDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 23:59:59',
				startDate: $filter("date")(new Date(), "yyyy-MM-dd") + ' 00:00:00',
				status: '',
				currentPage: 1,
				pageSize: '10',
			}
			$scope.getTableList();
		}
		//获取列表数据
		$scope.getTableList = () => {
			$scope.showloading = 0;
			$http({
				method: 'POST',
				url: '/iccs/voice/queryVoiceList',
				data: {
					"startDate": $scope.searchdata.startDate,
					"endDate": $scope.searchdata.endDate,
					"status": $scope.searchdata.status,
					"offset": $scope.searchdata.currentPage,
					"pageSize": $scope.searchdata.pageSize,
				}
			}).then(function(response) {
				// 接口调用成功
				if(response.headers("Authorization") != null) {
					LocalData.set('Authorization', response.headers("Authorization"));
				}
				$scope.showloading = 1;
				if(response.data.statusCode === 200) {
					$scope.tablelistdata = response.data.data;
					$scope.total = response.data.data.totalCount;
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		$scope.getTableList();
		$scope.searchtable = () => {
			$scope.searchdata.currentPage = 1;
			$scope.getTableList();
		}
		//导入语音
		$scope.importVoice = () => {
			let importVoice = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importvoice.html',
				controller: 'importVoiceCtrl',
				appendTo: $('.card'),
				resolve: {

				}
			});

			importVoice.result.then(function(data) {
				//console.log('222')
				$scope.getTableList();
			}, function() {

			});
		};
		//查看
		$scope.showDetail = (orderInfo) => {
			//console.log(orderInfo)
			let orderDetail = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/dialog/voiceDetil.html',
				controller: 'voiceDetilCtrl',
				//appendTo: $('.order-browse'),
				//size:'lg',
				resolve: {
					orderInfo: function() {
						return orderInfo;
					}
				}
			});

			orderDetail.result.then(function(data) {
				$scope.getTableList();
			}, function() {

			});
		};
		//删除
		$scope.deleteTemplate = (paramData) => {
			confirmdialog.showdialog('您确认要删除该语音模板么？').then(function() {
				//确定
				$http({
					method: 'POST',
					url: '/iccs/voice/deleteVoice',
					data: {
						"voiceName": paramData.voiceName
					}
				}).then(function(response) {
					// 接口调用成功
					if(response.data.statusCode === 200) {
						$scope.getTableList();
					} else {
						toastr.warning(response.data.message, '槽糕');
					}
				}, function() {

				})
			}, function() {
				//取消

			})
		}

	}
]).controller('templateChainCtrl', ['$scope', 'Persist', '$http', 'toastr', '$uibModal', 'confirmdialog', 'LocalData', '$filter', '$window', 'SysPermission',
	function($scope, Persist, $http, toastr, $uibModal, confirmdialog, LocalData, $filter, $window, SysPermission) {
		$scope.per = Persist;
		$scope.SysPermission = SysPermission;
		$scope.per.asideswitch = 7;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'templatemodule';
		//console.log($scope.per)
		//初始化数据
		$scope.searchdata = {
			review: null,
			templateId: null,
			content: null,
			currentPage: 1,
			pageSize: '10'
		}
		$scope.total = 0;
		//重置
		$scope.resetFrom = () => {
			$scope.searchdata = {
				review: null,
				templateId: null,
				content: null,
				currentPage: 1,
				pageSize: '10'
			}
			$scope.getTableList();
		}
		//获取列表数据
		$scope.getTableList = () => {
			$scope.showloading = 0;
			$http({
				method: 'POST',
				url: '/iccs/link/queryLinks',
				data: {
					"templateId": $scope.searchdata.templateId,
					"review": $scope.searchdata.review,
					"content": $scope.searchdata.content,
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
					$scope.total = response.data.data.totalCount;
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		$scope.getTableList();

		$scope.searchtable = () => {
			$scope.searchdata.currentPage = 1;
			$scope.getTableList();
		}

		//申请短链
		$scope.addtemplateChain = () => {
			let addtemplateChain = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/template/addShortChain.html',
				controller: 'addShortChain',
				size: 'lg'
			});

			addtemplateChain.result.then(function(data) {
				$scope.getTableList();
			}, function() {

			});
		}
		//查看报告
		$scope.showDetail = (paramData) => {
			console.log(paramData)
			if(paramData.reportCreate < 1){
				toastr.warning('当前模板无报告!', '槽糕');
				return
			}else{
				localStorage.setItem('tracId', paramData.traceId);
			  localStorage.setItem('template', paramData.templateSms);		
				window.open("./analyze.html", "black");
			}
		}

		//删除
//		$scope.deleteTemplate = (paramData) => {
//			confirmdialog.showdialog('您确认要删除该模版么？').then(function() {
//				//确定
//				$http({
//					method: 'POST',
//					url: '/iccs/template/removeTemplateApply',
//					params: {
//						"templateId": paramData.templateId
//					}
//				}).then(function(response) {
//					// 接口调用成功
//					if(response.data.statusCode === 200) {
//						//$scope.getTableList();
//						confirmdialog.successdialog(response.data.message).then(function() {
//							$scope.getTableList();
//						});
//					} else {
//						toastr.warning(response.data.message, '槽糕');
//					}
//				}, function() {
//
//				})
//			}, function() {
//				//取消
//
//			})
//		}

	}
]).controller('detailCtrl', ['$scope', '$http', '$uibModalInstance', 'toastr', 'LocalData', 'templateData', 'confirmdialog', 'Persist', function($scope, $http, $uibModalInstance, toastr, LocalData, templateData, confirmdialog, Persist) { //查看模板
	$scope.per = Persist;
	//获取该模板详情 
	$scope.basedata = {
		miguMobile: templateData.miguMobile ? templateData.miguMobile : '',
		remark: templateData.remark,
		templateSms: templateData.modWord,
		templateType: `${templateData.templateType}`,
		hanging: templateData.miguMobile == null ? '0' : '1',
		applicant: LocalData.get('current'),
		review: templateData.review,
		loginName: templateData.loginName
	}
	let dealhtml = (strhtml) => {
		let dd, dds;
		if(strhtml) {
			dd = strhtml.replace(/<\/?.+?>/g, "");
			dds = dd.replace(/ /g, ""); //dds为得到后的内容
		}
		return dds;
	}
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};

	// 确定
	$scope.ensure = () => {
		$uibModalInstance.close('true');
	};

	//删除模板
	$scope.removeTemplate = () => {
		confirmdialog.showdialog('您确认要删除该模版么？').then(function() {
			$http({
				method: 'POST',
				url: '/iccs/template/removeTemplateApply',
				params: {
					"templateId": templateData.templateId
				}
			}).then(function(response) {
				if(response.data.statusCode === 200) {
					confirmdialog.successdialog(response.data.message).then(function() {
						$uibModalInstance.close('remove');
					});
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}, function() {

		})
	}

	//重新申请
	$scope.applyAgain = () => {
		$http({
			method: 'POST',
			url: '/iccs/template/againTemplateApply',
			data: {
				"miguMobile": $scope.basedata.miguMobile,
				"modWord": $scope.basedata.templateSms,
				"remark": $scope.basedata.remark,
				"templateId": templateData.templateId,
				"templateSms": dealhtml($scope.basedata.templateSms),
				"templateType": parseInt($scope.basedata.templateType)
			}
		}).then(function(response) {
			// 接口调用成功
			if(response.data.statusCode === 200) {
				confirmdialog.successdialog(response.data.message).then(function() {
					$uibModalInstance.close(true);
				});
			} else {
				confirmdialog.errordialog(response.data.message).then(function() {
					$uibModalInstance.close('true');
				}, function() {

				});
			}
		});
	}

}]);