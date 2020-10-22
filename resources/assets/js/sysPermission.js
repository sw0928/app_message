import angular from 'angular';

export default angular.module('SysPermission',['LocalData']).factory('SysPermission', ['LocalData', function(LocalData) {
    let Userinfo = LocalData.getObject('userInfo');
    //console.log(LocalData.getObject('authorities'));
    //accountType 账户类型（角色）1管理员   2财务  3运营   4销售总监   5销售经理  6客户经理   7代理商   8客户
    let permission = {
        accountType: Userinfo.accountType,
        MenuList: LocalData.getObject('authorities'),
        dealPermission: (paramId) => {
            var returnStr = false;
            angular.forEach(LocalData.getObject('authorities'),(data) => {
                if(data.roleId == paramId){               
                    returnStr = true;
                }
            });
            return returnStr;
        }, 
        showDataCenter: function () { //数据中心
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            //return this.dealPermission(110) && this.accountType != 8;
            return this.dealPermission(110);
        },
        showSave: function () { //提交订单
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return (this.dealPermission(111) || this.dealPermission(11110) || this.dealPermission(11111) || this.dealPermission(11112));
        },
        showSaveOrder: function () { // 短信群发
            return this.dealPermission(11110);
        },
        showDynamic: function () { // 动态发送
            return this.dealPermission(11111);
        },
        showVoiceOrder: function () { // 语音发送
            return this.dealPermission(11112);
        },
        showOrder: function () { //订单浏览
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return (this.dealPermission(112) || this.dealPermission(11210) || this.dealPermission(11211) || this.dealPermission(11213) || this.dealPermission(11214));
        },
        showOrderTable: function () { // 订单列表
            return this.dealPermission(11210);
        },
        showTimingTable: function () { // 定时列表
            return this.dealPermission(11211);
        },
        showUplinkTable: function () { //上行列表
            return this.dealPermission(11213);
        },
        showDownlinkTable: function () { //下行列表
            return this.dealPermission(11212);
        },
        showVoicelinkTable: function () { //语音列表
            return this.dealPermission(11214);
        },
        showUsers: function () { //用户管理
        	let regex = /^[1|4|5|6|7]$/;
            //regex.test(this.accountType)
            //return this.dealPermission(110) && this.accountType != 8;
            return this.dealPermission(113);
        },
        showUsersList: function () { //用户列表管理
            return this.dealPermission(11310);
        },
        showContacts: function () { //联系人管理
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return this.dealPermission(114);
        },
        showContactsList: function () { //联系人管理列表       	
            return this.dealPermission(11410);
        },
        showNavRecharge: function () { //充值记录
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return (this.dealPermission(115) || this.dealPermission(11510) || this.dealPermission(11511) || this.dealPermission(11512) || this.dealPermission(11513));
        },
        showRechargequery: function () { //充值查询
            return this.dealPermission(11510);
        },
        showRechargeprocess: function () { //充值流程
            return this.dealPermission(11511);
        },
        showCreditprocess: function () { //授信流程
            return this.dealPermission(11512);
        },
        showRefundflow: function () { //退款流程
            return this.dealPermission(11513);
        },
        showConsume: function () { //消费记录
        	let regex = /^[1|4|5|6]$/;
            //regex.test(this.accountType)
            return (this.dealPermission(116) || this.dealPermission(11610) || this.dealPermission(11611));
        },
        showTrades: function () { //交易明细
            return this.dealPermission(11610);
        },
        showDifferential: function () { // 差价返还
            return this.dealPermission(11611);
        },
        showTemplate: function () { //模板申请
        	let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return this.dealPermission(117);
        },
        showTemplateList: function () { // 模板申请列表
            return this.dealPermission(11710);
        },
        showVoiceList: function () { // 语音审核列表
            return this.dealPermission(11711);
        },
        showChainList: function () { // 短链审核列表
            return this.dealPermission(11712);
        },
        showSignature: function () { //签名申请
        	//let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return this.dealPermission(118);
        },
        showSignatureList: function () { // 签名申请列表
            return this.dealPermission(11810);
        },
        showStatistics: function () { //业绩统计
        	//let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return this.dealPermission(119);
        },
        showSendNum: function () { //发送量统计
        	//let regex = /^[1|4|5|6|7|8]$/;
            //regex.test(this.accountType)
            return this.dealPermission(11910);
        },
        showStatisticsList: function () { // 业绩统计列表
            return this.dealPermission(11910);
        },
        showBillList: function () { // 客户账单
            return this.dealPermission(11911);
        },
        showReportList: function () { // 分析报告
            return this.dealPermission(11912);
        },
        canPricing :function () { //定价
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canTransfer :function () { //转账
            let regex = /^[1|2|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canModify :function () { //修改
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canAlarm :function () { //余额告警
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canResetPwd :function () { //重置密码
            let regex = /^[1|4]$/;
        	return regex.test(this.accountType);
        },
        canSubClients :function () { //子客户
            let regex = /^[1|4|5|6]$/;
        	return regex.test(this.accountType);
        },
        canDayPerf :function () { //每天业绩
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canPersonPerf :function () { //每人业绩
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        canCustSpec :function () { //客户规格
            let regex = /^[1|4|6]$/;
        	return regex.test(this.accountType);
        },
        showRecharge :function () { //充值流程
            let regex = /^[2]$/;
        	return regex.test(this.accountType);
        },
        showCredit :function () { //授信流程
            let regex = /^[1|4|5|6]$/;
        	return regex.test(this.accountType);
        },       
        showCreditZj :function () { //授信流程
            let regex = /^[1|4]$/;
        	return regex.test(this.accountType);
        },
        showRechargeA :function () { //新增充值流程
            let regex = /^[1|4|5|6|7]$/;
        	return regex.test(this.accountType);
        },
        showPerformance :function () { //业绩统计
//          let regex = /^[8|9]$/;
//      	return regex.test(this.accountType);
					if(this.accountType == 8 || this.accountType == 100 ){								
            	return false;
          }else{                      	
            	return true;
            }
        },
        showExport :function () { //通道管理员屏蔽导出
//          let regex = /^[8|9]$/;
//      	return regex.test(this.accountType);
					if(this.accountType == 110){								
            	return false;
          }else{                      	
            	return true;
            }
        },
        showCustAnalysis :function () { //客户分析导出权限，只有admin
//          let regex = /^[8|9]$/;
//      	return regex.test(this.accountType);
					if(this.accountType == 1){								
            	return true;
          }else{                      	
            	return false;
            }
        },
        showSend :function () { //发送量统计
//          let regex = /^[8|9]$/;
//      	return regex.test(this.accountType);
					if(this.accountType == 8 || this.accountType == 100 ){	
            	return true;
          }else{           	
            	return false;
            }
        },
        showKehu :function () { //新增客户模块
            //let regex = /^[2|8]$/;
            if(this.accountType == 2 || this.accountType == 8 || this.accountType == 100 ){
            	return false;
            }else{
            	return true;
            }
        		
        },
        showOrderThree :function () { //新增客户模块
            //let regex = /^[2|8]$/;
            if(this.accountType == 8 || this.accountType == 100 ){
            	return true;
            }else{
            	return false;
            }
        		
        },
        templateAudit :function () { //模板 --- 审核按钮 管理员可以审核模板
            let regex = /^1$/;
        	return regex.test(this.accountType);
        }
    };
  
    return permission;
    
}]);
