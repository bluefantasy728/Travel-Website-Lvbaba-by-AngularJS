'use strict';

// Register `login` component, along with its associated controller and template
angular.
     module('login').
     component('login', {
        templateUrl: 'component/login/login.template.html',
        controller:function LoginController($scope){
            var self = this;
            self.signInfo = {};
            self.mySubmit = function(ev){
                if($scope.loginForm.$invalid){ //注意这里需要引入$scope了，loginForm是表单form的name。当它是$invalid时，阻止默认事件，这样页面就不会跳转
                    ev.preventDefault();
                    
                }
            };
        }
    });
