'use strict';

angular. //用于根据地址栏来获取不同的数据json
    module('core.trip').
    factory('Trip', ['$resource',
        function($resource) {
            return $resource('data/:tripId.json', {}, {
                query: {
                    method: 'GET',
                    params: {tripId:'all'}, //这里指的是默认要找的是data/all.json这个文件的数据
                    isArray: true
                }
            });
        }
  ]);

angular. //用于获取图片地址
module('core.trip').
factory('GetImage', function(){
    return {
        getImageUrl:function(id){
            var letter = id.substring(0,2).toLowerCase();
            return './image/'+ letter +'/'+ id +'_01.jpg'
        }
    };
});



