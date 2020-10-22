import angular from 'angular';
import laydate from 'layui-laydate';

window.laydate = laydate;

export default angular.module('defLaydate', []).directive('defLaydate', ['$timeout', function($timeout) {
    return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            maxDate:'@?',
            minDate:'@?'
        },
        link: function(scope, element, attr, ngModel) {
            let _date = null, _config = {};
             // 渲染模板完成后执行
            $timeout(function(){ 
                // 初始化参数 
                _config = {
                    elem: '#' + attr.id,
                    change: function(value, date) {
                        scope.ngModel = value;    
                    },
                    done: function(value, date){
                        scope.ngModel = value;
                    },
                    clear:function(){
                       ngModel.$setViewValue(null);
                    }
                };
                //自定义日期格式
                if(attr.format){
                    _config.format = attr.format;
                }
                //控件选择类型
                if(attr.datetype){
                    _config.type = attr.datetype;
                }
                //最小/大范围内的日期时间值
                if(attr.hasOwnProperty('minDate') && scope.minDate){
                    _config.min = attr.minDate;
                   
                }
                if(attr.hasOwnProperty('maxDate') && scope.maxDate){
                    _config.max = attr.maxDate;
                }

                // 初始化
                _date = laydate.render(_config);

                //监听最大最小值变化，重新初始化
                // scope.$watch(scope.maxDate,function(){
                //     _config.max = attr.maxDate;
                //     _date = laydate.render(_config);
                // },true);

                // scope.$watch(scope.minDate,function(){
                //     _config.min = attr.minDate; 
                //     _date = laydate.render(_config);
                // },true);

                /* // 监听日期最大值
                if(attr.hasOwnProperty('maxDate') && attr.maxDate){
                    attr.$observe('maxDate', function (val) {
                        _config.max = val;
                    })
                }
                // 监听日期最小值
                if(attr.hasOwnProperty('minDate') && attr.minDate){
                   attr.$observe('minDate', function (val) {
                        _config.min = val;
                    })
                } */
                // 模型值同步到视图上
            ngModel.$render = function() {
              element.val(ngModel.$viewValue || '');
            };
 
            // 监听元素上的事件
            element.on('blur keyup change', function() {
              scope.$apply(setViewValue);
            });
 
            setViewValue();
 
            // 更新模型上的视图值
            function setViewValue() {
              var val = element.val();
              ngModel.$setViewValue(val);
            }
            },0);  
        }
    };
}]);