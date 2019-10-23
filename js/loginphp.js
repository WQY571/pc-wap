$(function () {
	//登录弹窗
	var submitswitch=false;
	$('.login_btn,.register_btn').click(function() {
		if(submitswitch) {
			window.wxc.xcConfirm('您已登陆!')
		} else {
			$('.zg_cover').show();
			$('.container').show();
		}
	})
	//点击查询
	$("#submit").click(function () {
		if(!submitswitch){
			window.wxc.xcConfirm("请先登录！");
			$('.zg_cover').show();
			$('.container').show();
		}else {
			var professional = $('#professional').val();
			console.log(professional);
			var sear_data = {wenti:professional,limits:5}
			// 获取数据
			$.ajax({
				url: "http://zg99.offcn.com/index/chaxun/getlist/?actid=2648&callback=?",
				type:'GET',
				dataType: 'jsonp',
				timeout:1000,
				data:sear_data,
				success: function(datas){
					console.log(datas)
					if(datas.status==1){
						var str = '<tbody><tr><th class="th4">搜索结果</th></tr>';
						$.each(datas.lists, function (i, item) {
							str +='<tr><td>'
							str +='<div><h6>'+item.wenti+'</h6><p>'+item.daan+'</p></div>';
							str +='</td></tr>';
						});
						str +='<tr><td><p class="more_ng"><a href="http://www.offcn.com/offcnewm/xiaoneng.html?kf_10353_1557213393564" target="_blank">更多问题点击快速咨询</a></p></td></tr>';
						str +='</tbody>';
						$('.home_con1').addClass("on");
						$('.my_table').html(str);
						$(".table_wrap").show();
						$('.my_table').show();
						$('.result_tip').hide();
					}else {
						$('.home_con1').addClass("on");
						$(".table_wrap").show();
						$('.my_table').hide();
						$('.result_tip').show();
					}
				},
				error:function(res){
					window.wxc.xcConfirm("网络错误，请稍后再试！")
				}
			});


			return false;
		}



	});

	$("#zhuce").click(function(){
		// var formid = $("#zcformid").val();
		var username = $("#username").val();
		var Myphone = $("#phone").val();
		var pro = $("#pro").val();
		var yzm = $("#yzm").val();
		//window.wxc.xcConfirm(username);window.wxc.xcConfirm(Myphone);window.wxc.xcConfirm(yzm);
		if(username==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请填写用户名');
			return false;
		}
		if(Myphone==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请填写手机号');
			return false;
		}
		if(pro==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请选择省份！');
			return false;
		}
		var reg=/^0?1[3456789]\d{9}$/; //手机号正则
		if(!reg.test(Myphone)){   //验证手机号是否正确
			window.wxc.xcConfirm('请填写正确的手机号！');
			return false;
		}
		if(yzm == '') { //验证码是否为空
			window.wxc.xcConfirm('请填写验证码');
			return false;
		}

		//验证手机号是否重复注册
		$.ajax({
			url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=2648&callback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {phone: Myphone},
			success: function(data) {
				if (data.status=="1") {
					window.wxc.xcConfirm("已注册，请直接登录");
					$('.bd_nav').find('span').removeClass('active').eq(0).addClass('active');
					$('.container').find('.agileits').hide().eq(0).show();
				}else {
					$.ajax({
						url: 'http://zg99.offcn.com/index/chaxun/register?actid=2648&callback=?',
						type: 'GET',
						dataType: 'jsonp',
						data: {name: username, phone: Myphone,province:pro, yzm: yzm},
						success: function(data) {
							if (data.status=="1") {
								window.wxc.xcConfirm("注册成功");
								$('.zg_cover').hide();
								$('.container').hide();
								submitswitch=true;
								// window.location.href="search.html?phone="+phone+"&name="+username+"#jump";
							}else if(data.status==3){
								window.wxc.xcConfirm("验证码不对");
							}else if(data.status==4) {
								window.wxc.xcConfirm("不能重复注册,请登录");
							}else{
								window.wxc.xcConfirm("注册失败");
							}
						}
					})
				}
			}
		})

	})
//获取验证码
	$('#getyzm').click(function(){
		var Myphone=$('#phone').val();
		if(Myphone==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请填写手机号');
			return false;
		}
		var reg=/^0?1[3456789]\d{9}$/; //手机号正则
		if(!reg.test(Myphone)){   //验证手机号是否正确
			window.wxc.xcConfirm('请填写正确的手机号！');
			return false;
		}
		$('#getyzm').hide();
		$('#daojishi').show();
		$.ajax({
			url: 'http://zg99.offcn.com/index/chaxun/sendmsg?actid=2648&callback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: {phone: Myphone},
			success: function(data) {
				if (data.status=="1") {
					window.wxc.xcConfirm('正在发送验证码');
					//倒计时
					runcount(120);
				} else if(data.status==2){
					window.wxc.xcConfirm('您已注册,去登陆吧');
					$('#getyzm').show(0);
					$('#daojishi').hide(0);
					$('.container').find('.agileits').hide().eq(0).show();
					$('.bd_nav').find('span').removeClass('active').eq(0).addClass('active');
					return false;

				}
			}
		});

	});
//登录
	$("#denglu").click(function(){
		// var formid = $("#dlformid").val();
		var username = $("#loginName").val();
		var Myphone = $("#loginPhone").val();
		if(username==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请填写用户名');
			return false;
		}
		if(Myphone==''){   //验证手机号是否为空
			window.wxc.xcConfirm('请填写手机号');
			return false;
		}
		var reg=/^0?1[3456789]\d{9}$/; //手机号正则
		if(!reg.test(Myphone)){   //验证手机号是否正确
			window.wxc.xcConfirm('请填写正确的手机号！');
			return false;
		}
		$.ajax({
			url: 'http://zg99.offcn.com/index/chaxun/longin?actid=2648&callback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: { phone: Myphone},
			success: function(data) {
				if (data.status=="1") {
					window.wxc.xcConfirm("登录成功");
					$('.zg_cover').hide();
					$('.container').hide();
					submitswitch=true;
				}else {
					if(data.msg=="用户未注册"){
						window.wxc.xcConfirm("请先注册，再登录");
						$('.container').find('.agileits').hide().eq(1).show();
						$('.bd_nav').find('span').removeClass('active').eq(1).addClass('active');
					}else {
						window.wxc.xcConfirm(data.msg);
					}


				}
			}
		})

	})


//倒计时函数
	function runcount(t){
		if(t>0){
			document.getElementById('daojishi').innerHTML=t+'S后重新获取';
			t--;
			setTimeout(function(){
				runcount(t)
			},1000)
		}else{
			$('#getyzm').show();
			$('#daojishi').hide();
		}
	}
})


