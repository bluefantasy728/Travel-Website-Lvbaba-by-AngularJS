'use strict';

// Register `tripList` component, along with its associated controller and template
angular.
    module('tripDetail').
    component('tripDetail', {
        templateUrl: 'component/tripDetail/tripDetail.template.html',
        controller: ['$routeParams','$timeout','Trip','localStorageService',
            function TripDetailController($routeParams,$timeout,Trip,localStorageService) {
                var self = this;
                var data;

                self.errInfo = false; //提示数量的错误信息开关
                self.mainImgUrl = ''; //为了设置主图的路径
                self.tripQty = 0; //设置购买数量的初始值
                self.price = 0; //设置初始价格，和上面都是为了在页面还没有加载，也就是还没有完成ajax读取数据之前不会显示NaN
                self.ifHasCartStyle = {color:'#777'};
                var localData = localStorageService.get("tripApp"); //页面初始化时先读一下localstorage，看其中是否有tripApp的键的数据
                if(localData != null){ //如果有数据，就让图标变成蓝色
                    self.ifHasCartStyle = {color:'#337ab7'};
                }

                data = Trip.get({tripId: $routeParams.tripId}, function () { //利用Trip这个服务封装的ajax对数据的请求，同时利用$routeParams.tripId就是页面的url对应需要请求数据的文件名
                    self.tripInfo = data;
                    var tripID = self.tripInfo.tripID;
                    self.price = self.tripInfo.price;

                    self.getImageUrl = function (num) { //设置选项卡的三张图片的地址
                        var letter = tripID.substring(0, 2);
                        return './image/' + letter + '/' + tripID + '_0' + num + '.jpg';
                    };

                    self.mainImgUrl = self.getImageUrl(1); //主图的路径初始化
                    self.imgArr = [self.getImageUrl(1),self.getImageUrl(2),self.getImageUrl(3)];

                });

                self.changeImg = function(ev){ //设置选项卡点击函数
                    var $mainImg = $('#mainImg');
                    var that = ev.target;
                    $mainImg.fadeOut(200,function(){
                        $mainImg.attr('src', that.src); //选项卡，点中哪张图，就把这张图的src赋给mainImgUrl，这样主图的路径就跟着变了
                        $mainImg.fadeIn();
                    });

                    $(ev.target).addClass('activeThumb'); //这里用了jQ，实在想不出更简单的办法做选项卡
                    $(ev.target).siblings().removeClass('activeThumb');

                };

                //这个是点击加入购物车后执行的一系列和localstorage相关的操作
                function findObjInArray(id, arr) { //为了找取回的数据中是否已经有原来的线路
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i]['tripID'] === id) {
                            return i;
                        }
                    }
                    return -1;
                }

                function changeImgUrl(str){ //为了强行将图片地址设置为第一张的
                    var arr = str.split('');
                    arr[arr.length-5] = 1;
                    return arr.join('');
                }

                function setNewObj(id,arr){
                    var obj = {};
                    obj.tripID = id; //这个是页面上绑定的tripQty值
                    obj.name = self.tripInfo.name;
                    obj.img = changeImgUrl(self.mainImgUrl);//为了强行将图片地址设置为第一张的
                    obj.startTime = self.tripInfo.startTime;
                    obj.price = self.tripInfo.price;
                    obj.tripQty = self.tripQty;
                    arr.push(obj);
                }

                var onOff = true; //这个变量是购物车动画的开关
                self.setLocalStorage = function (ev){

                    if(self.tripQty <= 0 || parseInt(self.tripQty) !== self.tripQty){  //点击加入购物车时做一个判断，要大于0，并且是整数，否则直接跳出函数
                        self.errInfo = true;
                        return;
                    }

                    if (onOff){
                        //点击加入购物车后的形成动画，蓝点从按钮出发，跑到右上角的购物车，然后消失，接着购物车变蓝色
                        onOff = false;
                        var $cart = $('<div class="cartObj pa"></div>'); //获取一个新的div用于蓝色圆圈
                        var $cartTag = $('#cart-tag'); //这个是右上角的购物车标志对象
                        var pos = {
                            x:$cartTag.offset().left,
                            y:$cartTag.offset().top
                        };
                        $cart.appendTo(ev.target);
                        $cart.stop().animate({
                            left:pos.x - ev.pageX + 80,
                            top:pos.y - ev.pageY + 25
                        },{
                            duration:800,
                            complete:function(){
                                $cart.remove();
                                $cartTag.css('color','#337ab7'); //无论如何都让购物车标志变蓝色
                                onOff = true;
                            }
                        });
                    }

                    self.errInfo = false; //程序能走到这里，说明数量没有问题，先使错误信息消失
                    var tripID = self.tripInfo.tripID;
                    var currentData = [];

                    //如果localstoarge没有找到tripApp键
                    if (localStorageService.get("tripApp") === null) {
                        setNewObj(tripID,currentData);

                    } else{
                        currentData = localStorageService.get("tripApp");

                        if(findObjInArray(tripID,currentData) !== -1){ //如果找到已有的键
                            var index = findObjInArray(tripID,currentData);
                            currentData[index]['tripQty'] = self.tripQty; //直接修改currentData里对应的键值
                        }else{ // 如果数据中没有找到对应的key，说明之前没有选过这个线路，需要添加进去
                            setNewObj(tripID,currentData);
                        }
                        localStorageService.remove('tripApp'); //把localstorage中的对应的tripApp整个先删除

                    }
                    localStorageService.set('tripApp', currentData); //将新的currentData存进localstorage
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
