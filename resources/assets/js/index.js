//------------基础-----------------------
import baserouter from './commonRouter';
import persist from './persist';
import commoninterface from './interface';
import homepage from './homepage';

//数据中心
import datacenterList from './datacenter/datacenterList';

//侧边栏
import aside from './commonaside';
import modifypwd from './modifypassword';

//联系人管理
import contacts from './contacts/list';

//订单模块
import orderlist from './order/orderlist';
import ordertable from './order/ordertable';
import timingtable from './order/timingtable';
import uplinktable from './order/uplinktable';
import downlinktable from './order/downlinktable';
import voicetable from './order/voicetable';


//提交订单
import saveorder from './order/submitorder';
import importuser from './order/importuser';
import importtemplate from './order/importtemplate';
import importcontacts from './order/importcontacts';

//用户管理
import usermanage from './usermanage/userlist';
import edituser from './usermanage/edituser';
import achievement from './usermanage/achievement';

//充值记录
import recharge from './rechargerecord/recharge';
import querylist from './rechargerecord/querylist';
import processlist from './rechargerecord/processlist';
import editprocess from './rechargerecord/editprocess';
import creditflow from './rechargerecord/creditflow';
import editcredit from './rechargerecord/editcredit';
import refundflow from './rechargerecord/refundflow';

//消费记录
import expense from './expense/expenserecord';
import trades from './expense/trades';
import differential from './expense/differential';

//模板申请
import templateapply from './template/templateapply';
import addtemplate from './template/addtemplate';
import audittemplate from './template/audittemplate';

//签名申请
import signature from './signature/signatureapply';

//业绩统计
import performancelist from './statistics/performance';
import analysis from './statistics/custanalysis';

