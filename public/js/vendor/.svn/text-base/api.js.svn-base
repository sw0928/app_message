//var url1 = "http://mouse.molesoft.cn";
var url1 = "http://localhost:30005/searchmouse-admin";
 //var url1 = "http://192.168.2.104:8080/searchmouse-admin";

var $api = {   
    //访问统计
    countVisit:"/iccs/link/countVisit",
    //时间统计
    countVisitByHour:"/iccs/link/countVisitByHour",
    //设备统计
    countVisitByEquipment:"/iccs/link/countVisitByEquipment",
    //城市统计
    countVisitByCity:"/iccs/link/countVisitByCity",
    //城市统计
    countMobileByCity:"/iccs/link/countMobileByCity",    
}

//获取时间
function getDay(day) {
    //Date()返回当日的日期和时间。
    var days = new Date();
    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
    var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
    //setTime()以毫秒设置 Date 对象。
    days.setTime(gettimes);
    var year = days.getFullYear();
    var month = days.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    var today = days.getDate();
    if(today<10){
        today="0"+today;
    }
    return year + "-" + month + "-" + today;
}

                               