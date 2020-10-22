import commonbase from '../commonBase';

export default commonbase.controller('adduserCtrl', ['$scope', '$http', 'LocalData', '$uibModal', '$uibModalInstance', 'toastr', 'confirmdialog', 'userInfo', 'AccountTypelist', 'Persist',
	function($scope, $http, LocalData, $uibModal, $uibModalInstance, toastr, confirmdialog, userInfo, AccountTypelist, Persist) { //编辑用户
		let userAccountType = LocalData.getObject('userInfo').accountType;
		if(userAccountType =='6'|| userAccountType == '7'){
			$scope.show_userAccountType = false;
		}else{
			$scope.show_userAccountType = true;
		}
		//可发类型
		$scope.baseSendtype = [{
				id: 4,
				name: '营销'
			},
			{
				id: 2,
				name: '行业'
			},
			{
				id: 6,
				name: '行业与营销'
			}
		];
		$scope.license = null;
		$scope.file_type = null;
		$scope.show_pic = 1;
		$scope.show_accountPlant = false;
		$scope.fileName = '';
		$scope.current = LocalData.get('current')
		//可创建账户类型
		$scope.accountTypelist = AccountTypelist[0];
		//处理可发类型
		let dealSendType = () => {
			let returnSel = null;
			angular.forEach($scope.baseSendtype, (item) => {
				if(userInfo.templateTypeBitwise) {
					if(item.id == userInfo.templateTypeBitwise) {
						returnSel = item;
					}
				} else {
					returnSel = {
						id: 2,
						name: '行业'
					};
				}

			})
			return returnSel;
		}

		//查询角色菜单
		let queryMenulist = (account, userId) => {
			$http({
				method: 'POST',
				url: '/iccs/user/queryUserDefultMenu',
				params: {
					userId: userId ? userId : "",
					accountType: account
				}
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200) {
					$scope.menulist = response.data.data;
					//处理菜单的选中状态
					dealSelectedMenu();
				} else {
					toastr.warning(response.data.message, '糟糕');
				}
			});
		}
		//上传图片
		$scope.importImg = (files, target) => {
			if(files && files.length > 0) {
				let file = files[0];
				$scope.license = file; //获取图片的路径，该路径不是图片在本地的路径		
				$scope.file_type = file.type;
				$scope.userdata.fileName = file.name;
				$scope.$apply();
				var form = new FormData();
				form.append('multipartFile', $scope.license);
				$http({
					method: 'POST',
					url: '/iccs/user/upload',
					data: form,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(response) {
					// 接口调用成功
					if(response.data.statusCode === 200) {
						$scope.fileName = response.data.data;
					} else {
						toastr.warning(response.data.message, '槽糕');
					}
				});
				if($scope.file_type == 'application/pdf') {
					$scope.show_pic = 2;
				} else {
					$scope.show_pic = 1;
				}
			}
		}
		//浏览
		$scope.browse = () => {
			if($scope.license != null) {
				let browse = $uibModal.open({
					animation: true,
					backdrop: 'static',
					templateUrl: '../../resources/views/usermanage/show_img.html',
					controller: 'showImgCtrl',
					size: 'xl',
					resolve: {
						license: function() {
							return $scope.license;
						}
					}
				});

				browse.result.then(function(data) {
					//$scope.getTableList();
				}, function() {
					//$scope.getTableList();
				});
			}

		}
		$scope.browsePdf = () => {
			var reader = new FileReader(); //文件读取器
			reader.readAsDataURL($scope.license); //获取文件URL,结果存至reader.result
			reader.onload = function() { //文件正常读取结束(此时reader.result才有值)
				//$("#previewFile").attr("href", reader.result); //把URL结果直接给<a>的href属性
				var win = window.open();
				win.document.write('<body style="margin:0px;"><iframe src="' + reader.result + '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></body>');
			};
		}
		//下载
		$scope.downloadPdf = () => {
			//$scope.sw_bb = '/iccs/user/download?fileName=' + $scope.userdata.fileName + "&Authorization=" + LocalData.get('Authorization');
			var tempwindow = window.open();
			tempwindow.location = '/iccs/user/download?fileName=' + $scope.userdata.fileName + "&Authorization=" + LocalData.get('Authorization');
		}
		//清除
		$scope.eliminate = () => {
			//console.log($('#file'))
			$('#file').val('');
			$scope.show_pic = 1;
			$scope.userdata.fileName = '未选择任何文件';
			$scope.fileName = '';
			$scope.license = '';
			$scope.$apply();
		}
		//账户类型发生变化时
		$scope.changeAccountType = () => {
			if(userInfo) {
				queryMenulist($scope.userdata.accountType, userInfo.userId);
			} else {
				queryMenulist($scope.userdata.accountType, "");
			}
		}
		//账户种类http发生变化时
		$scope.changeAccountPlant = () => {
			console.log($scope.userdata.accountPlant)
			if($scope.userdata.accountPlant == 0) {
				$scope.show_accountPlant = false
			} else {
				$scope.show_accountPlant = true;
				$scope.userdata.loginName = null;
				$scope.userdata.password = '';
				$scope.userdata.yesPassword = '';
			}
		}
		//提交时处理菜单
		let dealMenulist = () => {
			let selectedarr = [];
			angular.forEach($scope.menulist, (menu) => {
				if(menu.selected) {
					selectedarr.push(menu.menuId);
				}
			});
			return selectedarr;
		}
		//处理选中的菜单
		let dealSelectedMenu = () => {
			angular.forEach($scope.menulist, (menu) => {
				if(menu.isEnabled == 1) {
					menu.selected = true;
				}
			});
		}
		//初始化数据
		if(!userInfo) {
			$scope.show_accountPlant = false
			$scope.userdata = {
				userId: null,
				accountStatus: `0`,
				accountPlant: `0`,
				accountType: null,
				city: null,
				company: null,
				contact: null,
				email: null,
				loginName: null,
				mobilePhone: null,
				password: '',
				province: null,
				userName: null,
				fileName: '未选择任何文件',
				yesPassword: '',
				createrName: 1,
				sendtype: {
					id: 2,
					name: '行业'
				}
			}
		} else {
			$scope.show_accountPlant = true
			$scope.userdata = {
				userId: userInfo.userId,
				accountStatus: `${userInfo.accountStatus}`,
				accountPlant: `${userInfo.accountPlant}`,
				accountType: `${userInfo.accountType}`,
				city: userInfo.city,
				company: userInfo.company,
				contact: userInfo.department,
				email: userInfo.email,
				loginName: userInfo.loginName,
				mobilePhone: userInfo.mobilePhone,
				password: userInfo.password,
				province: userInfo.province,
				sendtype: dealSendType(),
				userName: userInfo.userName,
				fileName: userInfo.fileName,
				yesPassword: userInfo.yesPassword,
				createrName: 0
			}
			$scope.fileName = userInfo.fileName;
			$scope.show_pic = 3;
			//$('#file').val('数据中心.pdf');
			//createrName: userInfo.createrName == $scope.current?1:0
			//初始化查询菜单
			queryMenulist($scope.userdata.accountType, userInfo.userId);
		}
		// 取消
		$scope.cancel = () => {
			$uibModalInstance.dismiss({
				$value: 'cancel'
			});
		};
		// 确定
		$scope.ensure = () => {
			// if(dealMenulist().length == 0){
			// 	toastr.warning('请配置用户权限');
			// 	return false;
			// }
			//console.log($scope.userdata.mobilePhone)
			if($scope.userdata.mobilePhone !== null) {
				if(!Persist.validatePhone($scope.userdata.mobilePhone)) {
					toastr.warning('手机号格式不正确,请重新输入!');
					return false;
				}
			}
			if($scope.userdata.accountType == null || $scope.userdata.accountType == 0) {
				toastr.warning('账户类型不能为空!');
				return false;
			}
			if($scope.userdata.email !== null) {
				if(!Persist.validateEmail($scope.userdata.email)) {
					toastr.warning('邮箱格式不正确,请重新输入!');
					return false;
				}
			}
			if($scope.userdata.loginName !== null) {
				if(/[\u4E00-\u9FA5]/g.test($scope.userdata.loginName)) {
					toastr.warning('登录名不能输入汉字!');
					return false;
				}
//				if(!/^[0-9]*$/.test($scope.userdata.loginName)) {
//					toastr.warning('登录名必须是数字!');
//					return false;
//				}
				if($scope.userdata.loginName.length > 12) {
					toastr.warning('登录名长度不能超过12个字符!');
					return false;
				}
			}
			if(!userInfo) {
				//------新增
				if($scope.userdata.yesPassword !== $scope.userdata.password) {
					toastr.warning('密码不一致，请重新输入!');
					return false;
				}
				$http({
					method: 'POST',
					url: '/iccs/user/createUser',
					data: {
						"accountStatus": $scope.userdata.accountStatus,
						"accountPlant": $scope.userdata.accountPlant,
						"accountType": $scope.userdata.accountType,
						"city": $scope.userdata.city,
						"company": $scope.userdata.company,
						"department": $scope.userdata.contact,
						"email": $scope.userdata.email,
						"loginName": $scope.userdata.loginName,
						"mobilePhone": $scope.userdata.mobilePhone,
						"password": $scope.userdata.password,
						"province": $scope.userdata.province,
						"templateTypeBitwise": $scope.userdata.sendtype ? $scope.userdata.sendtype.id : null,
						"userName": $scope.userdata.userName,
						"yesPassword": $scope.userdata.yesPassword,
						"fileName": $scope.fileName,
						"menus": dealMenulist()
					}
				}).then(function(response) {
					// 接口调用成功
					if(response.data.statusCode === 200) {
						confirmdialog.successdialog(response.data.message).then(function() {
							$uibModalInstance.close(true);
						});
					} else {
						toastr.warning(response.data.message, '槽糕');
					}
				});
			} else {
				//------修改
				$http({
					method: 'POST',
					url: '/iccs/user/saveUser',
					data: {
						"accountStatus": $scope.userdata.accountStatus,
						"accountType": $scope.userdata.accountType,
						"accountPlant": $scope.userdata.accountPlant,
						"city": $scope.userdata.city,
						"company": $scope.userdata.company,
						"department": $scope.userdata.contact,
						"email": $scope.userdata.email,
						"loginName": $scope.userdata.loginName,
						"mobilePhone": $scope.userdata.mobilePhone,
						"password": $scope.userdata.password,
						"province": $scope.userdata.province,
						"templateTypeBitwise": $scope.userdata.sendtype ? $scope.userdata.sendtype.id : null,
						"userName": $scope.userdata.userName,
						"yesPassword": $scope.userdata.yesPassword,
						"fileName": $scope.fileName,
						"menuIds": dealMenulist()
					}
				}).then(function(response) {
					// 接口调用成功
					if(response.data.statusCode === 200) {
						confirmdialog.successdialog(response.data.message).then(function() {
							$uibModalInstance.close(true);
						});
					} else {
						toastr.warning(response.data.message, '糟糕');
					}
				});
			}

		};

	}
]).controller('showImgCtrl', ['$scope', '$uibModalInstance', '$http', 'toastr', 'license', 'confirmdialog', 'SysPermission', function($scope, $uibModalInstance, $http, toastr, license, confirmdialog, SysPermission) { //转账	
	//console.log(license)	
	//
	$scope.getObjectURL = (file) => {
		var url = null;
		if(window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};
	$scope.src_img = $scope.getObjectURL(license); //获取图片的路径，该路径不是图片在本地的路径		
	// 取消
	$scope.cancel = () => {
		$uibModalInstance.dismiss({
			$value: 'cancel'
		});
	};
	// 确定 === 充值
	$scope.ensure = () => {
		$uibModalInstance.close('true');
	};

}]);