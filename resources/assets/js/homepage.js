import commonbase from './commonBase';

export default commonbase.controller('homepage', ['$scope', 'Persist', '$state', 'SysPermission', 'LocalData', function ($scope, Persist, $state, SysPermission, LocalData) {
	$scope.per = Persist;
    $scope.SysPermission = SysPermission;
    //默认跳转该页面(根据权限判断)
    let pageSkipping = () => {
        if($scope.SysPermission.showDataCenter()){ //数据中心
            $state.go("datacenter");
            return false;
        }
        if($scope.SysPermission.showSave()){ //提交订单
            $state.go("saveorder");
            return false;
        }
        if($scope.SysPermission.showUsers()){ //用户管理
            $state.go("usermanage");
            return false;
        }
//      if($scope.SysPermission.showContacts()){ //联系人管理
//          $state.go("contactmanager");
//          return false;
//      }
        if($scope.SysPermission.showTemplate()){ //模板申请
            $state.go("templateApply");
            return false;
        }
//      if($scope.SysPermission.showChainList()){ //短链申请
//          $state.go("templateChain");
//          return false;
//      }
        if($scope.SysPermission.showSignature()){ //签名申请
            $state.go("signatureapply");
            return false;
        }
        if($scope.SysPermission.showStatistics()){ //业绩统计
            $state.go("performancelist");
            return false;
        }
        if($scope.SysPermission.showSendNum()){ //发送量统计
            $state.go("sendnumder");
            return false;
        }
        if($scope.SysPermission.showBillList()){ //账单分析
            $state.go("bill");
            return false;
        }
        if($scope.SysPermission.showReportList()){ //分析报告
            $state.go("report");
            return false;
        }
        if($scope.SysPermission.showOrderTable()){ //订单列表
            $state.go("orderlist.ordertable");
            return false;
        }
        if($scope.SysPermission.showTimingTable()){ //定时列表
            $state.go("orderlist.timingtable");
            return false;
        }
        if($scope.SysPermission.showUplinkTable()){ //上行列表
            $state.go("orderlist.uplinktable");
            return false;
        }
        if($scope.SysPermission.showDownlinkTable()){ //下行列表
            $state.go("orderlist.downlinktable");
            return false;
        }
        if($scope.SysPermission.showVoicelinkTable()){ //语音列表
            $state.go("orderlist.voicetable");
            return false;
        }
        if($scope.SysPermission.showRechargequery()){ //充值查询
            $state.go("rechargerecord.querylist");
            return false;
        }
        if($scope.SysPermission.showRechargeprocess()){ //充值流程
            $state.go("rechargerecord.processlist");
            return false;
        }
        if($scope.SysPermission.showCreditprocess()){ //授信流程
            $state.go("rechargerecord.creditflow");
            return false;
        }
        if($scope.SysPermission.showRefundflow()){ //退款流程
            $state.go("rechargerecord.refundflow");
            return false;
        }
        if($scope.SysPermission.showTrades()){ //交易明细
            $state.go("expenserecord.trades");
            return false;
        }
        if($scope.SysPermission.showDifferential()){ //差价返还
            $state.go("expenserecord.differential");
            return false;
        }
    }
    pageSkipping();

    //处理订单浏览 href
    $scope.navOrderUrl = () => {
        if($scope.SysPermission.showOrderTable()){ //订单列表
            return "orderlist.ordertable";
        }
        if($scope.SysPermission.showTimingTable()){ //定时列表
            return "orderlist.timingtable";
        }
        if($scope.SysPermission.showUplinkTable()){ //上行列表
            return "orderlist.uplinktable";
        }
        if($scope.SysPermission.showDownlinkTable()){ //下行列表
            return "orderlist.downlinktable";
        }
        if($scope.SysPermission.showVoicelinkTable()){ //语音列表
            return "orderlist.voicetable";
        }
    }
    //处理提交订单 href
    $scope.navSaveUrl = () => {
        if($scope.SysPermission.showSaveOrder()){ //短信群发
            return "saveorder";
        }
        if($scope.SysPermission.showDynamic()){ //动态发送
            return "dynamic";
        }
        if($scope.SysPermission.showVoiceOrder()){ //语音发送
            return "voice";
        }       
    }
    //处理充值记录 href
    $scope.navRechargeUrl = () => {
        if($scope.SysPermission.showRechargequery()){ //充值查询
            return "rechargerecord.querylist";
        }
        if($scope.SysPermission.showRechargeprocess()){ //充值流程
            return "rechargerecord.processlist";
        }
        if($scope.SysPermission.showCreditprocess()){ //授信流程
            return "rechargerecord.creditflow";
        }
        if($scope.SysPermission.showRefundflow()){ //退款流程
            
            return "rechargerecord.refundflow";
        }
    }
    //处理消费记录 href
    $scope.navExpenseUrl = () => {
        if($scope.SysPermission.showTrades()){ //交易明细
            return "expenserecord.trades";
        }
        if($scope.SysPermission.showDifferential()){ //差价返还
            return "expenserecord.differential";
        }
    }
    //处理模板申请 href
    $scope.navTemplateUrl = () => {
    	
        if($scope.SysPermission.showTemplateList()){ 
            return "templateapply";
        }
        if($scope.SysPermission.showVoiceList()){ 
            return "templateVoice";
        }
        if($scope.SysPermission.showChainList()){ 
            return "templateChain";
        }             
    }
    //处理签名申请 href
    $scope.navSignatureUrl = () => {
        if($scope.SysPermission.showSignatureList()){ 
            return "signatureapply";
        }       
    }
    //处理业绩统计 href
    $scope.navStatisticsUrl = () => {
        if($scope.SysPermission.showStatistics()){ 
        	if($scope.SysPermission.showSend()){
        		return "sendnumder";
        	}else{
        		return "performancelist";
        	}
        if($scope.SysPermission.showBillList()){ 
            return "bill";
        }
        if($scope.SysPermission.showReportList()){ 
            return "report";
        }   
        }       
    }
    //处理人员列表 href
    $scope.navUsersUrl = () => {
        if($scope.SysPermission.showUsersList()){ 
            return "usermanage";
        }       
    }
    //处理联系人列表 href
    $scope.navContactsUrl = () => {
        if($scope.SysPermission.showContactsList()){ 
            return "contactmanager";
        }       
    }
    //退出登录
    $scope.logout = () => {
        window.location = "login.html"; 
        LocalData.set('Authorization',"");
        LocalData.set('current',"");
        LocalData.setObject('authorities',"");
        LocalData.setObject('userInfo',"");            
    }

}]).controller('mainController', ['$scope', 'Persist',function ($scope, Persist) {
	//侧边栏收缩
    $scope.asideIsOpen = true;
    $scope.toggleAside = () => {
		$scope.asideIsOpen = !$scope.asideIsOpen;
	}
    
}]);
   