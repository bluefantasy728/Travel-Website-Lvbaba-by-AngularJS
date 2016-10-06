'use strict';

// Register `shopCart` component, along with its associated controller and template
angular.
    module('shopCart').
        component('shopCart', {
            templateUrl: 'component/shopCart/shopCart.template.html',
            controller: ['$timeout','Trip','localStorageService','GetImage',
                function ShopCartController($timeout,Trip,localStorageService,GetImage) {

                    var self = this;

                    self.getImageUrl = function(id){
                        return GetImage.getImageUrl(id);
                    };

                    self.cartData = localStorageService.get('tripApp');

                    self.getSum = function(){

                        var localData = localStorageService.get("tripApp"); //获取一下Localstorage的值
                        if(localData === null){ //如果为空，就直接将总和取值为0
                            return 0
                        }

                        var sum = 0;
                        for(var i=0; i<self.cartData.length; i++){
                            sum += self.cartData[i].price * self.cartData[i].tripQty;
                        }
                        return sum;
                    };

                    self.clearCart = function(){
                        localStorageService.remove('tripApp');
                        self.cartData = [];
                    };

                }
            ]
  });
