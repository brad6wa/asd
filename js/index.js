$(function () {
    banner();
    initTabSwipe();
    $('[data-toggle="tooltip"]').tooltip();
    getScrollTop();
});
//�ֲ�ͼģ��
var banner = function () {
    /*����*/
    /*1. ׼������  ajax ��̨��ȡ����  json��ʽ���ַ����� */
    /*2. ��ȡ����  �첽��ȡ ajax */
    /*3. ��ȡ�ɹ�  ��������ת����html�ṹ (ģ����Ⱦ artTemplate ) ���ݵ�ǰ�豸ȥת */
    /*4. ��Ⱦҳ��  ��html����׷�ӵ�ҳ�� html() */
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
    //�������ͼƬ ���ݳߴ� ���ػ���
    $(window).on('resize', function () {
        reader();
    });
    //�ƶ��� ���ƻ���
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
/*����. ���ƶ��豸  ҳǩ�Ų���  ---�������ı�ǩҳ */
/*1. ��ȡ���е���ҳǩ  �����ȵĺ� */
/*2. ��ҳǩ�������ó���Ŀ�� ���ֹ�����*/
/*3. ׼��һ������װ ҳǩ���� �������*/
/*4. ��������һ������������ ��ʼ�����������*/
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
//���� ����ʱ��ͼƬ��
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
