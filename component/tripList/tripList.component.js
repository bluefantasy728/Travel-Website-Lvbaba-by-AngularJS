'use strict';

// Register `tripList` component, along with its associated controller and template
angular.
    module('tripList').
    component('tripList', {
        templateUrl: 'component/tripList/tripList.template.html',
        controller: ['$timeout','Trip','GetImage','localStorageService',
            function TripListController($timeout,Trip,GetImage,localStorageService) {
                var self = this;

                self.ifHasCartStyle = {color:'#777'};
                var localData = localStorageService.get("tripApp"); //页面初始化时先读一下localstorage，看其中是否有tripApp的键的数据
                if(localData != null){
                    self.ifHasCartStyle = {color:'#337ab7'};
                }

                this.trips = Trip.query();

                this.getImageUrl = function(id){
                    return GetImage.getImageUrl(id);
                };

                this.filterTrip = function(str){
                    self.trips = Trip.query({tripId:str});
                };

                self.getLocalStorage = function(){ //获取localstorage中的数据，并且计算总价
                    self.cartData = localStorageService.get('tripApp');
                    
                    if(self.cartData === null){
                        return;
                    }

                    self.getSum = function(){
                        var sum = 0;
                        for(var i=0; i<self.cartData.length; i++){
                            sum += self.cartData[i].price * self.cartData[i].tripQty;
                        }
                        return sum;
                    };
                };

                //控制购物车弹窗的显示隐藏
                self.ifPopShow = false;
                self.popShow = function(b){
                    var localData = localStorageService.get("tripApp"); //移入时先获取一次Localstorage
                    if(localData === null){
                        return;
                    }

                    $timeout(function(){ //稍微隔一点时间弹出购物车弹层
                        b && self.getLocalStorage();
                        self.ifPopShow = b;
                    },200);
                };

            }
        ]
    });
