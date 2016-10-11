#使用AngularJS，Bootstrap，jQuery等搭建的旅游购物SAP应用
**项目功能描述：**一个可以用户登录，根据不同旅游地点进行选择浏览，并且可以根据选择旅游人数在购物车中自动计算总价格的单页面旅游购物网站。
**项目要点：**

- 选择使用`Bootstrap`搭建页面布局，`AngularJS`实现数据交互以及`jQuery`制作一些小特效；
- 使用`Component`的方法取代`AngularJS`老版本的`Directive`指令，简化了各个组件的开发代码，将大部分的变量和业务逻辑写在`Component`里，实现了`MVC`的设计思想；
- 在主模块`app`中注入`ngRoute`，在`config`方法中配置了用不同`Component`所对应页面之间的切换规则，实现各个页面之间的跳转而且保留了历史浏览记录；
- 运用`AngularJS`自带的表单验证功能，实现了登录窗口的制作；
- 使用`AngularJS`的`Factory`功能，调用了`$resource`服务，代替`$http`服务，封装并简化了从后台`ajax`获取数据的代码，另外还封装了一个可以根据不同旅游线路的`id`，从后台获取对应图片的服务，并在各个`Component`中依赖注入后进行调用；
- 导`入AngularJS`自带的`localStorageModule`模块以及`localStorageService`，实现了封装后的对`localstorage`中的简单读写操作，避免繁琐的数据的序列化和反序列化，完成了购物车自动计算总价以及记录用户操作数据的功能；
- 引入`ngAnimate`并结合`CSS3`实现了浏览旅游线路列表时的渐入渐出效果
