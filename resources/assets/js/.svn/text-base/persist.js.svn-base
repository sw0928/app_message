import commonbase from './commonBase';
export default commonbase.factory('Persist', ['LocalData','$interval','$http','confirmdialog','toastr', function(LocalData,$interval,$http,confirmdialog,toastr) {
	let persistData = {
		currentuser: LocalData.get('current'),
		showloading: 0,
		asideswitch: 1,
		navmodel: '',
		rechargeObj: null,
		orderObj: null,
		expenserecordObj: null,
		rechargerecord: {
			status: ''
		},
		showLeft: 1,
		OrederCount: 0,
		ExpenseCount: 0,
		RechargeCount: 0,
		ContractGroups: null,
		SelectedGroup: null, //当前选中的联系人分组
		validatePhone: function(mobilePhone) { // 验证手机号
			let mobileRegx = /^(((1[3-9][0-9]{1}))+\d{8})$/;
			return mobileRegx.test(mobilePhone);
		},
		validateEmail: function(email) { // 验证手机号
			let emailRegx = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
			return emailRegx.test(email);
		},
		dealTimeStr: function(timestr) {
			return timestr.Substring(0, 18);
		},
		download: function(expTaskId) {
			if(expTaskId == null){
        toastr.warning('您无权限导出该记录!','槽糕');
        return
      }
			$http({
				method: 'POST',
				url: '/icos/exp/queryExpTrans',
				params: {
					"taskNumber": expTaskId,
				},
			}).then(function(response) {
				// 接口调用成功
				if(response.data.statusCode === 200){
	        let timer = $interval(function() {
						$http({
							method: 'POST',
							url: '/icos/exp/queryExpTrans',
							params: {
								"taskNumber": expTaskId,
							},
						}).then(function(res) {
							// 接口调用成功							
							$('#modal-body').html('当前导出进度为'+res.data.data.currentNumber + "/" + res.data.data.totalNumber);
							if(res.data.data.isFinish == 1) {
								$interval.cancel(timer);
								$('#modal-body').html('任务号:'+ expTaskId + "导出完毕!");
//								$('.modal-dialog .modal-footer .cancel').addClass('dn');
								$('.modal-dialog .modal-footer .ensure').addClass('db');
							} else {
								return
							}
		
						});
					}, 1000);
	        confirmdialog.derivedialog('当前导出进度为'+ response.data.data.currentNumber + "/" + response.data.data.totalNumber).then(function() {
						$interval.cancel(timer);
						var tempwindow = window.open('_blank');
						tempwindow.location = '/iccs/exp/expTransDownload?taskNumber=' + expTaskId + "&Authorization=" + LocalData.get('Authorization');
					//window.location.href = ;					
							}, function () {
            		$interval.cancel(timer);
        		});  
	        }else{
					toastr.warning(response.data.message,'糟糕');	
				}							
			});
			
		},
		monthList: [{
				value: 1,
				text: '一月'
			},
			{
				value: 2,
				text: '二月'
			},
			{
				value: 3,
				text: '三月'
			},
			{
				value: 4,
				text: '四月'
			},
			{
				value: 5,
				text: '五月'
			},
			{
				value: 6,
				text: '六月'
			},
			{
				value: 7,
				text: '七月'
			},
			{
				value: 8,
				text: '八月'
			},
			{
				value: 9,
				text: '九月'
			},
			{
				value: 10,
				text: '十月'
			},
			{
				value: 11,
				text: '十一月'
			},
			{
				value: 12,
				text: '十二月'
			}
		]
	}
	return persistData;

}]).directive('ngTestUpload', [function() {
	return {
		restrict: 'ACE',
		link: function(scope, element, attr) {
			element.on('change', function() {
				scope.file = this.files[0];
			})
		},
		scope: {
			file: '=ngTestUpload'
		}
	}
}]);