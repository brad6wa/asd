$(function () {
    banner();
    initTabSwipe();
    $('[data-toggle="tooltip"]').tooltip();
    getScrollTop();
});
//轮播图模块
var banner = function () {
    /*需求：*/
    /*1. 准备数据  ajax 后台获取数据  json格式（字符串） */
    /*2. 获取数据  异步获取 ajax */
    /*3. 获取成功  根据数据转换成html结构 (模板渲染 artTemplate ) 根据当前设备去转 */
    /*4. 渲染页面  把html代码追加到页面 html() */
    var bannerHtml = function () {
        var isMobile = $(window).width() < 768;
        $('.carousel-indicators').html(template('pointTpl', window.data));
        $('.carousel-inner').html(template('imageTpl', {list: window.data, isMobile: isMobile}));

    };
    var reader = function () {
        if (window.data) {
            bannerHtml();
        } else {
            $.ajax({
                type: 'get',
                url: './js/data.json',
                data: {},
                datatype: 'json',
                success: function (data) {
                    window.data = data;
                    bannerHtml();
                }
            });
        }
    };
    reader();
    //按需加载图片 根据尺寸 加载缓存
    $(window).on('resize', function () {
        reader();
    });
    //移动端 手势滑动
    var startX = 0,
        distanceX = 0,
        isMove = false;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        distanceX = e.originalEvent.touches[0].clientX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX < 0) {
                $('.carousel').carousel('next');
            } else {
                $('.carousel').carousel('prev');
            }
        }
    startX = 0,
    distanceX = 0,
    isMove = false;
    });
};
/*需求. 在移动设备  页签放不下  ---》滑动的标签页 */
/*1. 获取所有的子页签  求出宽度的和 */
/*2. 把页签容器设置成你的宽度 出现滚动条*/
/*3. 准备一个容器装 页签容器 溢出隐藏*/
/*4. 大容器套一个长的子容器 初始化成区域滚动*/
var initTabSwipe=function(){
    var $tab=$('.wjs_product .nav-tabs');
    var $tabChild=$tab.children();
    var width=0;

    $tabChild.each(function(i,item){
       width+=$(item).outerWidth(true);
    });
    console.log(width);
    $tab.width(width);
    console.log($tab.width());
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false,
        click:true
    });
};
//吸顶 滚动时候图片跳
var getScrollTop=function(){
    var $topBar=$('.wjs_topBar').outerHeight(true);
    $(window).scroll(function(){
        var $top=$(this).scrollTop();
        if($top>=$topBar){
            $('.wjs_topBar').css('margin-bottom',$('nav.navbar').outerHeight(true));
        }else {
            $('.wjs_topBar').css('margin-bottom',0);
        }
    });
};
