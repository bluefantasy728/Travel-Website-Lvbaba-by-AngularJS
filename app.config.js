'use strict';
//设置路由，一开始就加载tripApp模块
angular.
    module('tripApp').
    config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider. //用1.5版本的component方式来加载不同的页面，不用单独templateUrl和controller加载了
            when('/index', {
                template: '<login></login>'
            }).
            when('/trips', {
                template: '<trip-list></trip-list>'
            }).
            when('/trips/:tripId', {
                template: '<trip-detail></trip-detail>'
            }).
            when('/shopcart', {
                  template: '<shop-cart></shop-cart>'
            }).
            otherwise('/index');
        }
  ]);