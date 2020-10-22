import angular from 'angular';
import kindeditor from 'kindeditor';

export default angular.module('kindeditor', []).directive('kindeditor', [function () {
    return {
        restrict: 'EA',
        scope: {
            returnVal:'=ngModel',
            isDisabled:'@?'
        },
        link: function (scope, element) {
            //当绑定的数据不为空时赋值
            if(scope.returnVal){
                element.val(scope.returnVal);
            }

            let editor = KindEditor.create(element, {
                items:['forecolor', '|', 'removeformat'],
                colorTable:[['#FF0000']],
                themesPath : '../../public/css/',
                filterMode : true,
                syncType:'auto',
                width : '100%',
                height: '80px',
                afterChange:function(){// 编辑器内容发生变化后，将编辑器的内容设置到原来的textarea控件里                    
                    this.sync();
                    scope.returnVal = element.val();
                },
                afterBlur: function(){// 编辑器失焦后，将编辑器的内容设置到原来的textarea控件里                    
                    this.sync();                    
                    scope.returnVal = element.val();
                }
            });
           
            if(scope.isDisabled == 'true'){
                editor.readonly(true);
            }else{
                editor.readonly(false);
            } 
        }
    }
}]);