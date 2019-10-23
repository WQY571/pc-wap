
$(function() {
    $(".zg_right p").click(function () {
        $("html,body").animate({"scrollTop":0},800)
    });
    // 登录注册 弹出框 选项卡
    $('.bd_nav').find('span').click(function(){
        $('.bd_nav').find('span').removeClass('active').eq($(this).index()).addClass('active');
        $('.container').find('.agileits').hide().eq($(this).index()).show()
    })
    // 登录注册 弹出框 关闭按钮
    $('.bd_close').click(function(){
        $('.zg_cover').hide();
        $('.container').hide();
    })
});






