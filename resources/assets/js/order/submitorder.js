import commonbase from '../commonBase';
import $ from 'jquery';

export default commonbase.controller('saveorder', ['$scope', 'Persist', '$http', 'LocalData', '$timeout', '$interval', 'toastr', '$uibModal', 'confirmdialog', '$filter',
	function($scope, Persist, $http, LocalData, $timeout, $interval, toastr, $uibModal, confirmdialog, $filter) {
		$scope.per = Persist;
		$scope.per.asideswitch = 1;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'saveordermodule';
		$scope.fileId = '';
		$http.numberFile = null;
		$scope.numAndContFile = null;		
		$scope.returnTxt='';
		$scope.returnShow = false;
		$scope.typeObj = [
			{userName:'营销',id:4},
			{userName:'行业',id:2},			
		];
		$scope.templateTypeBitwise = LocalData.getObject('userInfo').templateTypeBitwise;
		$scope.templateObj = [];
		if($scope.templateTypeBitwise == 2){
			$scope.templateObj.push($scope.typeObj[1])
		}else if($scope.templateTypeBitwise == 4){
			$scope.templateObj.push($scope.typeObj[0])
		}else{
			$scope.templateObj = $scope.typeObj
		}
		//未完待续
		$http({
			method: 'POST',
			url: '/iccs/message/getOrderCommitResult',
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null){
        LocalData.set('Authorization',response.headers("Authorization"));
      }  
			if(response.data.statusCode === 0) {
				$scope.returnTxt = response.data.message;
				$scope.returnShow = true
				//confirmdialog.successwait(response.data.message).then(function() {
					//创建成功后表单重置							
					$scope.basedata = {
						orderType: '',
						receiveNumber: "",
						errPhone: "",
						sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
						sendType: '',
						smsContent: ""
					}
					$scope.clearNumber()
					$scope.clearContent()
				//});
				$scope.timerA()
			} else {
				$scope.returnShow = false;
				$scope.returnTxt = '';
			}

		});	
		$scope.timerA = () => {
			let timer = $interval(function() {
				$http({
					method: 'POST',
					url: '/iccs/message/getOrderCommitResult',

				}).then(function(response) {
					// 接口调用成功							
					if(response.data.statusCode === 0) {
							$scope.returnTxt = response.data.message;
					} else {
						//$('.modal-dialog .modal-footer').addClass('db');
						$scope.returnShow = false;
						$scope.returnTxt = '';
						$interval.cancel(timer);
					}					
					//$('#modal-body').html(response.data.message)
				});
			}, 1000);
		}
		//导入号码、导入号码与内容模板
		$scope.importNumAndCont = (modelType, files, target) => {
			$scope.showloading = 0;
			if(files && files.length > 0){
				let form = new FormData();
				let file = files[0];
				form.append('multipartFile', file);
				form.append('modelType', modelType);
				target.value = null;
				$http({
					method: 'POST',
					url: '/iccs/message/importModel',
					data: form,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(response) {
					// 接口调用成功				
					$scope.showloading = 1;
					console.log(response.data.data)
					if(response.data.statusCode === 200) {					
						$scope.fileId = response.data.data.fileId ? response.data.data.fileId : "";
						confirmdialog.successdialog(response.data.message).then(function() {
							dealImportData(modelType, response.data.data);
						});
					} else {							
							toastr.warning(response.data.message, '槽糕');			
					}
				}, function errorCallback() {
					toastr.error('系统内部错误', '错误');
				});
			}
			
		}

		//导入时，文本框不能输入
		$scope.isImportNum = false;
		$scope.isImportCont = false;
		let dealImportData = (modelType, params) => {
			$scope.count = params.phoneCount;
			$scope.basedata.receiveNumber = params.phone;
			$scope.errorCnt = params.errCount;
			$scope.basedata.errPhone = params.errPhone;
			//$scope.basedata.smsContent = params.templateContents ? params.templateContents : "";
			if(modelType == 1) {
				$scope.isImportNum = true;
			}
			if(modelType == 2) {
				$scope.isImportNum = true;
				$scope.isImportCont = true;
			}
			$scope.updateRecvCnt();
		}

		//导入联系人
		$scope.importContracts = () => {
			let importContacts = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importcontracts.html',
				controller: 'orderImportContactsCtrl',
				size: 'lg'
			});

			importContacts.result.then(function(data) {
				$scope.basedata.receiveNumber = $scope.basedata.receiveNumber + data;
				$scope.updateRecvCnt();
			}, function() {

			});
		}

		//导入客户
		$scope.importUser = () => {
			let importuser = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importuser.html',
				controller: 'importuserCtrl',
				size: 'lg'
			});

			importuser.result.then(function(data) {
				$scope.basedata.receiveNumber = data;
				$scope.updateRecvCnt();
			}, function() {

			});
		}
		let dealhtml = (strhtml) => {
			let dd, dds;
			if(strhtml) {
				dd = strhtml.replace(/<\/?.+?>/g, "");
				dds = dd.replace(/ /g, ""); //dds为得到后的内容
			}
			return dds;
		}
		//导入模板
		$scope.importTemplate = () => {
			let importtemplate = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importtemplate.html',
				controller: 'importtemplateCtrl',
				//appendTo:	$('.main-cont'),
				size: 'xl'
			});

			importtemplate.result.then(function(data) {
				//console.log(data)
				$scope.basedata.smsContent = dealhtml(data.modWord);
				$scope.updateContentLength()
			}, function() {

			});
		}
		//初始化数据
		$scope.basedata = {
			orderType: '2',
			receiveNumber: "",
			errPhone: "",
			sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
			sendType: '0',
			smsContent: ""
		}
		//清空号码
		$scope.clearNumber = () => {
			$scope.basedata.receiveNumber = "";
			$scope.basedata.errPhone = "";
			$scope.errorCnt = 0;
			$scope.count = 0;
			$scope.isImportNum = false;
			$scope.fileId = '';
		}
		//清空内容
		$scope.clearContent = () => {
			$scope.basedata.smsContent = "";
			$scope.contentCnt = 0;
			$scope.contentSmsCnt = 0;
			$scope.isImportCont = false;
		}
		//提交订单
		$scope.saveOrder = () => {
			if($scope.basedata.receiveNumber == '' && $scope.fileId == ''){
				toastr.warning('请输入发送号码！', '槽糕');
				return false;
			}
			$scope.showloading = 0;
			$http({
				method: 'POST',
				url: '/iccs/message/orderCommit',
				data: {
					"orderType": $scope.basedata.orderType,
					"receiveNumber": $scope.basedata.receiveNumber,
					"sendDate": $scope.basedata.sendType == 1 ? $scope.basedata.sendDate : "",
					"sendType": $scope.basedata.sendType,
					"smsContent": $scope.basedata.smsContent,
					"fileId": $scope.fileId
				}
			}).then(function(response) {
				// 接口调用成功
				$scope.showloading = 1;				
				if(response.data.statusCode === 200) {
					confirmdialog.successdialog(response.data.message).then(function() {
								//创建成功后表单重置							
									$scope.basedata = {
										orderType: '',
										receiveNumber: "",
										errPhone: "",
										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
										sendType: '',
										smsContent: ""
									}
									$scope.clearNumber()
									$scope.clearContent()
									
							});	
					$http({
						method: 'POST',
						url: '/iccs/message/getOrderCommitResult',
					}).then(function(response) {
						// 接口调用成功	
						if(response.data.statusCode === 200) {
							//$scope.returnTxt = response.data.message;
							$scope.returnShow = false
							$scope.returnTxt = '';
							//confirmdialog.successdialog(response.data.message).then(function() {
								//创建成功后表单重置							
//									$scope.basedata = {
//										orderType: '',
//										receiveNumber: "",
//										errPhone: "",
//										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//										sendType: '',
//										smsContent: ""
//									}
//									$scope.clearNumber()
//									$scope.clearContent()
									
							//});								
						}else{
							$scope.returnTxt = response.data.message
							$scope.returnShow = true
							//confirmdialog.successwait(response.data.message).then(function() {
								//创建成功后表单重置							
//									$scope.basedata = {
//										orderType: '',
//										receiveNumber: "",
//										errPhone: "",
//										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//										sendType: '',
//										smsContent: ""
//									}
//									$scope.clearNumber()
//									$scope.clearContent()
								//});
							$scope.timerA()
						}
									
					});
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		//判断短信接收者
		$scope.count = 0;
		$scope.errorCnt = 0;
		$scope.updateRecvCnt = () => {
			if($scope.basedata.receiveNumber) {
				let succPhone = "";
				let phone = $scope.basedata.receiveNumber.trim();
				$scope.count = 0;
				//$scope.errorCnt = 0;
				let flag = /^(((1[3-9][0-9]{1}))+\d{8})$/; //验证手机号
				let flag2 = /^00/;
				let mobiles = phone.split(/[ \r\n\t,;；，]/);
				var newmobiles = new Set(mobiles);
				angular.forEach(newmobiles, (mobile) => {
					let phone = mobile.replace(/\s*/g, "");
					if((flag.test(phone) || flag2.test(phone))) {
						succPhone += phone + ",";
						$scope.count++;
					} else {
						if(phone != "") {
							$scope.basedata.errPhone += phone + ",";
											$scope.errorCnt++;
						}
					}
				});
				$scope.basedata.receiveNumber = succPhone;
			}
		}

		let Div = (exp1, exp2) => {
			var rslt = exp1 / exp2; //除  
			if(rslt >= 0) {
				rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数.
			} else {
				rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。  
			}
			return rslt;
		}
		//判断短信字数并分条数
		$scope.contentCnt = 0;
		$scope.contentSmsCnt = 0;
		$scope.updateContentLength = () => {
			let len = $scope.basedata.smsContent.length;
			let smsCnt = 0;
			if(len > 0) {
				smsCnt = 1;
				if(len > 70) {
					smsCnt = Div(len, 67);
				}
			}
			$scope.contentCnt = len;
			$scope.contentSmsCnt = smsCnt;
			// var iphoneText = $("#iphone_text");
			// if (iphoneText) {
			// 	var iphoneCnt = $("#iphone_cnt");
			// 	iphoneCnt.html(len + "(" + smsCnt + ")");
			// 	iphoneText.html($("#txtContent").val());
			// }
		}

	}
]).controller('voice', ['$scope', 'Persist', '$http', 'LocalData', '$timeout', '$interval', 'toastr', '$uibModal', 'confirmdialog', '$filter',
	function($scope, Persist, $http, LocalData, $timeout, $interval, toastr, $uibModal, confirmdialog, $filter) {
		$scope.per = Persist;
		$scope.per.asideswitch = 1;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'saveordermodule';
		$scope.fileId = '';
		$http.numberFile = null;
		$scope.numAndContFile = null;		
		$scope.returnTxt='';
		$scope.returnShow = false;
		$scope.voiceShow = false;
		$scope.typeObj = [
			{userName:'营销',id:4},
			{userName:'行业',id:2},			
		];
		$scope.templateTypeBitwise = LocalData.getObject('userInfo').templateTypeBitwise;
		$scope.templateObj = [];
		if($scope.templateTypeBitwise == 2){
			$scope.templateObj.push($scope.typeObj[1])
		}else if($scope.templateTypeBitwise == 4){
			$scope.templateObj.push($scope.typeObj[0])
		}else{
			$scope.templateObj = $scope.typeObj
		}
		//未完待续
		$http({
			method: 'POST',
			url: '/iccs/message/getOrderCommitResult',
		}).then(function(response) {
			// 接口调用成功
			if(response.headers("Authorization") != null){
        LocalData.set('Authorization',response.headers("Authorization"));
      }  
			if(response.data.statusCode === 0) {
				$scope.returnTxt = response.data.message;
				$scope.returnShow = true
				//confirmdialog.successwait(response.data.message).then(function() {
					//创建成功后表单重置							
					$scope.basedata = {
						orderType: '',
						receiveNumber: "",
						errPhone: "",
						sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
						sendType: '',
						smsContent: ""
					}
					$scope.clearNumber()
					$scope.clearContent()
				//});
				$scope.timerA()
			} else {
				$scope.returnShow = false;
				$scope.returnTxt = '';
			}

		});	
		$scope.timerA = () => {
			let timer = $interval(function() {
				$http({
					method: 'POST',
					url: '/iccs/message/getOrderCommitResult',

				}).then(function(response) {
					// 接口调用成功							
					if(response.data.statusCode === 0) {
							$scope.returnTxt = response.data.message;
					} else {
						//$('.modal-dialog .modal-footer').addClass('db');
						$scope.returnShow = false;
						$scope.returnTxt = '';
						$interval.cancel(timer);
					}					
					//$('#modal-body').html(response.data.message)
				});
			}, 1000);
		}
		//导入号码、导入号码与内容模板
		$scope.importNumAndCont = (modelType, files, target) => {
			$scope.showloading = 0;
			if(files && files.length > 0){
				let form = new FormData();
				let file = files[0];
				form.append('multipartFile', file);
				form.append('modelType', modelType);
				target.value = null;
				$http({
					method: 'POST',
					url: '/iccs/message/importModel',
					data: form,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(response) {
					// 接口调用成功				
					$scope.showloading = 1;
					if(response.data.statusCode === 200) {					
						$scope.fileId = response.data.data.fileId ? response.data.data.fileId : "";
						confirmdialog.successdialog(response.data.message).then(function() {
							dealImportData(modelType, response.data.data);
						});
					} else {							
							toastr.warning(response.data.message, '槽糕');			
					}
				}, function errorCallback() {
					toastr.error('系统内部错误', '错误');
				});
			}
			
		}

		//导入时，文本框不能输入
		$scope.isImportNum = false;
		$scope.isImportCont = false;
		let dealImportData = (modelType, params) => {
			$scope.count = params.phoneCount;
			$scope.basedata.receiveNumber = params.phone;
			$scope.errorCnt = params.errCount;
			$scope.basedata.errPhone = params.errPhone;
			//$scope.basedata.smsContent = params.templateContents ? params.templateContents : "";
			if(modelType == 1) {
				$scope.isImportNum = true;
			}
			if(modelType == 2) {
				$scope.isImportNum = true;
				$scope.isImportCont = true;
			}
			$scope.updateRecvCnt();
		}

		//导入联系人
		$scope.importContracts = () => {
			let importContacts = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importcontracts.html',
				controller: 'orderImportContactsCtrl',
				size: 'lg'
			});

			importContacts.result.then(function(data) {
				$scope.basedata.receiveNumber = $scope.basedata.receiveNumber + data;
				$scope.updateRecvCnt();
			}, function() {

			});
		}

		//导入客户
		$scope.importUser = () => {
			let importuser = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importuser.html',
				controller: 'importuserCtrl',
				size: 'lg'
			});

			importuser.result.then(function(data) {
				$scope.basedata.receiveNumber = data;
				$scope.updateRecvCnt();
			}, function() {

			});
		}
		let dealhtml = (strhtml) => {
			let dd, dds;
			if(strhtml) {
				dd = strhtml.replace(/<\/?.+?>/g, "");
				dds = dd.replace(/ /g, ""); //dds为得到后的内容
			}
			return dds;
		}
		//导入语音
		$scope.importVoice = () => {
			let importVoice = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/voicetemplate.html',
				controller: 'importVCtrl',
				//appendTo:	$('.main-cont'),
				size: 'xl'
			});

			importVoice.result.then(function(data) {
				console.log(data)
				$scope.basedata.mediaName = data.mediaName;
				$scope.basedata.smsContent = data.mediaName;
				$scope.voiceShow = true;
				//$scope.updateContentLength()
			}, function() {

			});
		}
		//初始化数据
		$scope.basedata = {
			orderType: '2',
			receiveNumber: "",
			errPhone: "",
			sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
			sendType: '0',
			smsContent: "",
			playTimes:'',
			playMode:0,
			mediaName:''
		}
		//清空号码
		$scope.clearNumber = () => {
			$scope.basedata.receiveNumber = "";
			$scope.basedata.errPhone = "";
			//$scope.errorCnt = 0;
			$scope.count = 0;
			//$scope.isImportNum = false;
			$scope.fileId = '';
		}
		//清空内容
		$scope.clearContent = () => {
			$scope.basedata.smsContent = "";
			$scope.basedata.mediaName = "";
			$scope.contentCnt = 0;
			$scope.contentSmsCnt = 0;
			$scope.voiceShow = false;
		}
		//提交订单
		$scope.saveOrder = () => {
			if($scope.basedata.receiveNumber == '' && $scope.fileId == ''){
				toastr.warning('请输入发送号码！', '槽糕');
				return false;
			}
			$scope.showloading = 0;
			$http({
				method: 'POST',
				url: '/iccs/message/voiceOrderCommit',
				data: {
					"orderType": $scope.basedata.orderType,
					"receiveNumber": $scope.basedata.receiveNumber,
					"sendDate": $scope.basedata.sendType == 1 ? $scope.basedata.sendDate : "",
					"sendType": $scope.basedata.sendType,
					"smsContent": $scope.basedata.mediaName == '' ? $scope.basedata.smsContent: '',
					"playTimes": $scope.basedata.playTimes,
					"playMode": $scope.basedata.mediaName == '' ? 0 : 1,
					"mediaName": $scope.basedata.mediaName,
					"fileId": $scope.fileId
				}
			}).then(function(response) {
				// 接口调用成功
				$scope.showloading = 1;				
				if(response.data.statusCode === 200) {
					confirmdialog.successdialog(response.data.message).then(function() {
								//创建成功后表单重置							
									$scope.basedata = {
										orderType: '',
										receiveNumber: "",
										errPhone: "",
										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
										sendType: '',
										smsContent: ""
									}
									$scope.clearNumber()
									$scope.clearContent()
									
							});	
					$http({
						method: 'POST',
						url: '/iccs/message/getOrderCommitResult',
					}).then(function(response) {
						// 接口调用成功	
						if(response.data.statusCode === 200) {
							//$scope.returnTxt = response.data.message;
							$scope.returnShow = false
							$scope.returnTxt = '';
							//confirmdialog.successdialog(response.data.message).then(function() {
								//创建成功后表单重置							
//									$scope.basedata = {
//										orderType: '',
//										receiveNumber: "",
//										errPhone: "",
//										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//										sendType: '',
//										smsContent: ""
//									}
//									$scope.clearNumber()
//									$scope.clearContent()
									
							//});								
						}else{
							$scope.returnTxt = response.data.message
							$scope.returnShow = true
							//confirmdialog.successwait(response.data.message).then(function() {
								//创建成功后表单重置							
//									$scope.basedata = {
//										orderType: '',
//										receiveNumber: "",
//										errPhone: "",
//										sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//										sendType: '',
//										smsContent: ""
//									}
//									$scope.clearNumber()
//									$scope.clearContent()
								//});
							$scope.timerA()
						}
									
					});
				} else {
					toastr.warning(response.data.message, '槽糕');
				}
			});
		}
		//判断短信接收者
		$scope.count = 0;
		$scope.errorCnt = 0;
		$scope.updateRecvCnt = () => {
			if($scope.basedata.receiveNumber) {
				let succPhone = "";
				let phone = $scope.basedata.receiveNumber.trim();
				$scope.count = 0;
				//$scope.errorCnt = 0;
				let flag = /^(((1[3-9][0-9]{1}))+\d{8})$/; //验证手机号
				let flag2 = /^00/;
				let mobiles = phone.split(/[ \r\n\t,;；，]/);
				var newmobiles = new Set(mobiles);
				angular.forEach(newmobiles, (mobile) => {
					let phone = mobile.replace(/\s*/g, "");
					if((flag.test(phone) || flag2.test(phone))) {
						succPhone += phone + ",";
						$scope.count++;
					} else {
						if(phone != "") {
							$scope.basedata.errPhone += phone + ",";
											$scope.errorCnt++;
						}
					}
				});
				$scope.basedata.receiveNumber = succPhone;
			}
		}

		let Div = (exp1, exp2) => {
			var rslt = exp1 / exp2; //除  
			if(rslt >= 0) {
				rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数.
			} else {
				rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。  
			}
			return rslt;
		}
		//判断短信字数并分条数
		$scope.contentCnt = 0;
		$scope.contentSmsCnt = 0;
		$scope.updateContentLength = () => {
			let len = $scope.basedata.smsContent.length;
			let smsCnt = 0;
			if(len > 0) {
				smsCnt = 1;
				if(len > 70) {
					smsCnt = Div(len, 67);
				}
			}
			$scope.contentCnt = len;
			$scope.contentSmsCnt = smsCnt;
			// var iphoneText = $("#iphone_text");
			// if (iphoneText) {
			// 	var iphoneCnt = $("#iphone_cnt");
			// 	iphoneCnt.html(len + "(" + smsCnt + ")");
			// 	iphoneText.html($("#txtContent").val());
			// }
		}

	}
]).controller('dynamic', ['$scope', 'Persist', 'LocalData', '$http', '$timeout', '$interval', 'toastr', '$uibModal', 'confirmdialog', '$filter',
	function($scope, Persist, LocalData, $http, $timeout, $interval, toastr, $uibModal, confirmdialog, $filter) {
		$scope.per = Persist;
		$scope.per.asideswitch = 1;
		$scope.per.showLeft = 1;
		$scope.per.navmodel = 'saveordermodule';
		$scope.fileId = '';
		$scope.templateId = '';
		$http.numberFile = null;
		$scope.numAndContFile = null;		
		$scope.returnTxtTwo='';
		$scope.returnShowB = false;
		$scope.showloading = 1;
		$scope.importShow = false;
		$scope.filesName = null;
		$scope.typeObj = [
			{userName:'营销',id:4},
			{userName:'行业',id:2},			
		];
		$scope.templateTypeBitwise = LocalData.getObject('userInfo').templateTypeBitwise;
		$scope.templateObj = [];
		if($scope.templateTypeBitwise == 2){
			$scope.templateObj.push($scope.typeObj[1])
		}else if($scope.templateTypeBitwise == 4){
			$scope.templateObj.push($scope.typeObj[0])
		}else{
			$scope.templateObj = $scope.typeObj
		}
		//未完待续
		$http({
			method: 'POST',
			url: '/iccs/message/getOrderCommitResult',
		}).then(function(response) {
			// 接口调用成功				
			if(response.headers("Authorization") != null){
            	LocalData.set('Authorization',response.headers("Authorization"));
            }  
			if(response.data.statusCode === 0) {
				$scope.returnTxtTwo = response.data.message;
				$scope.returnShowB = true
				//confirmdialog.successwait(response.data.message).then(function() {
					//创建成功后表单重置							
					$scope.basedata = {
						orderType: '',
						sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
						sendType: '',
						smsContent: ""
					}
					
					//$scope.clearNumber()
					$scope.clearContent()
				//});
				$scope.timerA()
			} else {
				$scope.returnShowB = false;
				$scope.returnTxtTwo = '';				
			}

		});	
		$scope.timerA = () => {
			let timer = $interval(function() {
				$http({
					method: 'POST',
					url: '/iccs/message/getOrderCommitResult',

				}).then(function(response) {
					// 接口调用成功							
					if(response.data.statusCode === 0) {
							$scope.returnTxtTwo = response.data.message;
					} else {
						//$('.modal-dialog .modal-footer').addClass('db');
						$scope.returnShowB = false;
						$scope.returnTxtTwo = '';
						$scope.fileId = '';
						$scope.filesName = null;
						$interval.cancel(timer);
					}					
					//$('#modal-body').html(response.data.message)
				});
			}, 1000);
		}
		//导入号码、导入号码与内容模板
		$scope.importNumAndCont = (modelType, files, target) => {
			$scope.showloading = 0;	
			//console.log(files[0].name)
			if(files && files.length > 0){
				let form = new FormData();
				let file = files[0];
				form.append('multipartFile', file);
				form.append('modelType', modelType);
				target.value = null;
				$http({
					method: 'POST',
					url: '/iccs/message/importModel',
					data: form,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(response) {
					// 接口调用成功				
					$scope.showloading = 1;
					if(response.data.statusCode === 200) {					
						$scope.fileId = response.data.data.fileId ? response.data.data.fileId : "";
						confirmdialog.successdialog(response.data.message).then(function() {
							//dealImportData(modelType, response.data.data);
							$scope.filesName = '文件上传成功，文件名为：' + file.name.toString()
						});
					} else {							
							toastr.warning(response.data.message, '槽糕');			
					}
				}, function errorCallback() {
					toastr.error('系统内部错误', '错误');
				});
			}
			
		}

		//导入时，文本框不能输入
		$scope.isImportNum = false;
		$scope.isImportCont = false;
		let dealImportData = (modelType, params) => {
			$scope.count = params.phoneCount;
			$scope.basedata.receiveNumber = params.phone;
			//$scope.errorCnt = params.errCount;
			$scope.basedata.errPhone = params.errPhone;
			$scope.basedata.smsContent = params.templateContents ? params.templateContents : "";
			if(modelType == 1) {
				$scope.isImportNum = true;
			}
			if(modelType == 2) {
				$scope.isImportNum = true;
				$scope.isImportCont = true;
			}
			$scope.updateRecvCnt();
		}

		//导入联系人
//		$scope.importContracts = () => {
//			let importContacts = $uibModal.open({
//				animation: true,
//				templateUrl: '../../resources/views/order/importcontracts.html',
//				controller: 'orderImportContactsCtrl',
//				size: 'lg'
//			});
//
//			importContacts.result.then(function(data) {
//				$scope.basedata.receiveNumber = $scope.basedata.receiveNumber + data;
//				$scope.updateRecvCnt();
//			}, function() {
//
//			});
//		}

		//导入客户
//		$scope.importUser = () => {
//			let importuser = $uibModal.open({
//				animation: true,
//				templateUrl: '../../resources/views/order/importuser.html',
//				controller: 'importuserCtrl',
//				size: 'lg'
//			});
//
//			importuser.result.then(function(data) {
//				$scope.basedata.receiveNumber = data;
//				$scope.updateRecvCnt();
//			}, function() {
//
//			});
//		}
		let dealhtml = (strhtml) => {
			let dd, dds;
			if(strhtml) {
				dd = strhtml.replace(/<\/?.+?>/g, "");
				dds = dd.replace(/ /g, ""); //dds为得到后的内容
			}
			return dds;
		}
		//导入模板
		$scope.importTemplate = () => {
			let importtemplate = $uibModal.open({
				animation: true,
				templateUrl: '../../resources/views/order/importtemplate.html',
				controller: 'importtemplateCtrl',
				//appendTo:	$('.order-browse'),
				size: 'xl'
			});

			importtemplate.result.then(function(data) {
				$scope.templateId = data.templateId;
				$scope.basedata.smsContent = dealhtml(data.modWord);			
				$scope.updateContentLength()				
			}, function() {

			});
		}
		//观察name 当一个model值发生改变的时候 都会触发第二个函数
//  $scope.$watch('basedata.smsContent',function (newValue, oldValue) {       
//      if($scope.basedata.smsContent.length >0){
//          $scope.importShow = true
//      }else{
//      	$scope.importShow = false
//      }
//  });
		//初始化数据
		$scope.basedata = {
			orderType: '2',
			sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
			sendType: '0',
			smsContent: ""
		}
		//清空内容
		$scope.clearContent = () => {
			$scope.basedata.smsContent = "";
			$scope.contentCnt = 0;
			$scope.contentSmsCnt = 0;
			$scope.isImportCont = false;
			$scope.fileId = '';
			$scope.templateId = '';
			$scope.filesName = null
		}
		//提交订单
		$scope.saveOrder = () => {
			if($scope.basedata.orderType == ''){
				toastr.warning('请选择订单类型！', '槽糕');
				return false;
			}
//			if($scope.basedata.sendType == ''){
//				toastr.warning('请选择发送方式！', '槽糕');
//				return false;
//			}
			if($scope.basedata.smsContent == ''){
				toastr.warning('请输入发送短信内容！', '槽糕');
				return false;
			}
			if($scope.fileId == ''){
				toastr.warning('请导入文件', '槽糕');
				return false;
			}
			let dynamicDetail = $uibModal.open({
            animation: true,
            templateUrl: '../../resources/views/dynamicDetail.html',
            controller: 'dynamicDetailCtrl',
            appendTo:	$('.order-browse'),
            size:'sm',
            resolve: {
                orderInfo:function () {
								return {
									fileId:$scope.fileId,
									templateId:$scope.templateId,
									smsContent:$scope.basedata.smsContent
								};
				}
            }
        });

        dynamicDetail.result.then(function (data) {           
					$http({
						method: 'POST',
						url: '/iccs/message/orderCommit',
						data: {
							"orderType": $scope.basedata.orderType,
							"sendDate": $scope.basedata.sendType == 1 ? $scope.basedata.sendDate : "",
							"sendType": 2,
							"smsContent": $scope.basedata.smsContent,
							"fileId": $scope.fileId,
							"templateId": $scope.templateId != ''?$scope.templateId:''
						}
					}).then(function(response) {
						// 接口调用成功
						$scope.showloading = 1;				
						if(response.data.statusCode === 200) {
							confirmdialog.successdialog(response.data.message).then(function() {
										//创建成功后表单重置							
											$scope.basedata = {
												orderType: '',												
												sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
												sendType: '',
												smsContent: ""
											}		
											$scope.fileId = '';
											$scope.templateId = '';
											$scope.clearContent()
											
									});	
							$http({
								method: 'POST',
								url: '/iccs/message/getOrderCommitResult',
							}).then(function(response) {
								// 接口调用成功	
								if(response.data.statusCode === 200) {
									//$scope.returnTxt = response.data.message;
									$scope.returnShowB = false
									$scope.returnTxtTwo = '';
									//confirmdialog.successdialog(response.data.message).then(function() {
										//创建成功后表单重置							
//											$scope.basedata = {
//												orderType: '',												
//												sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//												sendType: '',
//												smsContent: ""
//											}										
//											$scope.clearContent()
											
									//});								
								}else{
									$scope.returnTxtTwo = response.data.message
									$scope.returnShowB = true
									//confirmdialog.successwait(response.data.message).then(function() {
										//创建成功后表单重置							
//											$scope.basedata = {
//												orderType: '',
//												sendDate: $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss"),
//												sendType: '',
//												smsContent: ""
//											}
//											$scope.clearContent()
										//});
									$scope.timerA()
								}
											
							});
						} else {
							toastr.warning(response.data.message, '槽糕');
						}
					});
        }, function () {
            //console.log('22')
        });
		}
		//判断短信接收者
		$scope.count = 0;
		//$scope.errorCnt = 0;
		$scope.updateRecvCnt = () => {
			if($scope.basedata.receiveNumber) {
				let succPhone = "";
				let phone = $scope.basedata.receiveNumber.trim();
				$scope.count = 0;
				//			$scope.errorCnt = 0;
				let flag = /^(((1[3-9][0-9]{1}))+\d{8})$/; //验证手机号
				let flag2 = /^00/;
				let mobiles = phone.split(/[ \r\n\t,;；，]/);
				var newmobiles = new Set(mobiles);
				angular.forEach(newmobiles, (mobile) => {
					let phone = mobile.replace(/\s*/g, "");
					if((flag.test(phone) || flag2.test(phone))) {
						succPhone += phone + ",";
						$scope.count++;
					} else {
						if(phone != "") {
							$scope.basedata.errPhone += phone + ",";
							//						$scope.errorCnt++;
						}
					}
				});
				$scope.basedata.receiveNumber = succPhone;
			}
		}

		let Div = (exp1, exp2) => {
			var rslt = exp1 / exp2; //除  
			if(rslt >= 0) {
				rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数.
			} else {
				rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。  
			}
			return rslt;
		}
		//判断短信字数并分条数
		$scope.contentCnt = 0;
		$scope.contentSmsCnt = 0;
		$scope.updateContentLength = () => {
			let len = $scope.basedata.smsContent.length;
			let smsCnt = 0;
			if(len > 0) {
				smsCnt = 1;
				if(len > 70) {
					smsCnt = Div(len, 67);
				}
			}
			$scope.contentCnt = len;
			$scope.contentSmsCnt = smsCnt;
			// var iphoneText = $("#iphone_text");
			// if (iphoneText) {
			// 	var iphoneCnt = $("#iphone_cnt");
			// 	iphoneCnt.html(len + "(" + smsCnt + ")");
			// 	iphoneText.html($("#txtContent").val());
			// }
		}

	}
]).controller('dynamicDetailCtrl', ['$scope', '$uibModalInstance', 'toastr', 'orderInfo', '$http', function ($scope, $uibModalInstance, toastr, orderInfo, $http) { //订单详情
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
	
//	$scope.searchdata = {
//		orderId: orderInfo.orderId?orderInfo.orderId:'',
//		phone: '',
//		currentPage: 1,
//		pageSize: '10'	
//	}
		//重置表单
//	$scope.resetFrom = () => {
//		$scope.searchdata = {
//			orderId: orderInfo.orderId?orderInfo.orderId:'',
//			phone: '',		
//			currentPage: 1,
//			pageSize: '10',
//			
//		}
//		$scope.getTableList();
//	}
//	//获取列表数据
    $scope.getTableList = () => {
    	$scope.showloading= 0;		
			$http({
				method: 'POST',
				url:'/iccs/message/importModelPreview',
				data: orderInfo           
			}).then(function (response){
				// 接口调用成功				
				$scope.showloading= 1;
				if(response.data.statusCode === 200){				
					$scope.tablelistdata = response.data.data;
					//console.log($scope.tablelistdata)
					           	
				}else{
					toastr.warning(response.data.message,'槽糕');
				}
			});  	
   }    
    $scope.getTableList();    
//  $scope.searchTable = () => {
//  	$scope.searchdata.currentPage = 1;
//  	$scope.getTableList();
//  }


}]);