//var settings='http://112.74.205.166:8080/ad/';
var settings='http://192.168.1.107:8088/ad/';
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(170))+\d{8})$/;
$('#freeselect li').on('touchstart click', function(e) {
		e.preventDefault();
			var g1=$('#giftbox .gfcopy').eq(0).attr('data-oldclass').substring(1);
			var g2=$('#giftbox .gfcopy').eq(1).attr('data-oldclass').substring(1);
			var g3=$('#giftbox .gfcopy').eq(2).attr('data-oldclass').substring(1);
			var d=g1+','+g2+','+g3;
			var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		resistanceRatio: 0,
		onlyExternal: true,
		

	});
			$.ajax({
				type:"post",
				url:settings+"web/prize.lc",
				async:true,
				data:{selected:d},
				dataType: 'JSON',//here
		       

				success:function(msg){
					
					if(msg>0){
						swiper.slideTo(4, 1000, false);
					}else{
						swiper.slideTo(3, 1000, false);
						$('.nofree_center .freebox').show();
					}
				},
				error:function(err){
					console.log(err);
				}
			});		

	})
var clickable=true,submitsucc=false;
$('#nofreesubmit').on('touchstart click', function(e) {
			e.preventDefault();
			if(submitsucc){
				
				$('#freesubmittip p').html('您已提交成功，不用再次提交！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				return false;
			}
			if(!clickable){
				return false;
			}
			clickable=false;
			
			var phone=$('#inputphone').val();
			var sheng=$('#inputsheng').val();
			var city=$('#inputcity').val();
			var lancome=$('#lancome').val();
			
			if($.trim(phone).length<1||!myreg.test(phone)){
				$('#freesubmittip p').html('请填写正确的手机号!');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				clickable=true;
				return false;
			}else if($.trim(sheng).length<1){
				$('#inputsheng').focus();
				clickable=true;
				return false;
			}else if($.trim(city).length<1){
				$('#inputcity').focus();
				clickable=true;
				return false;
			}else if($.trim(lancome).length<1){
				clickable=true;
				$('#lancome').focus();
				return false;
			}
			$.ajax({
				type:"post",
				url:settings+"web/info.lc?telphone="+phone+"&city="+sheng+"-"+city+"&bar="+lancome,
				async:true,
//				data:{telphone:phone,city:sheng+'-'+city,bar:lancome},
				dataType: 'JSON',//here
				success:function(msg){
					$('#freesubmittip p').html('短信已成功发送，请及时查阅！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
					$('#book').modal('hide');
				},3000);
					submitsucc=true;
				},
				error:function(err){
					console.log(err);
				}
			});
			setTimeout(function(){
				clickable=true;
			},3000)

	})
var freesubmitsucc=false;
$('#freesubmit').on('touchstart click', function(e) {
	e.preventDefault();
	if(freesubmitsucc){
		$('#freesubmittip p').html('您已提交成功，不用再次提交！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				return false;
	}
			var name=$('#name').val();
			var phone=$('#phone').val();
			var address=$('#address').val();
			
			if($.trim(name).length<1){
				$('#freesubmittip p').html('填写你的名字才能收货哦');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				$('#name').focus();
				return false;
			}else if($.trim(phone).length<1||!myreg.test(phone)){
				$('#freesubmittip p').html('请填写正确的手机号！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
//				$('#phone').focus();
				return false;
			}else if($.trim(address).length<10){
				$('#freesubmittip p').html('您的地址可能不够详细哦！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				return false;
			}

			$.ajax({
				type:"post",
				url:settings+"web/info.lc?name="+name+"&telphone="+phone+"&address="+address,
				async:true,
//				data:{telphone:phone,city:sheng+'-'+city,bar:lancome},
				dataType: 'JSON',//here
				success:function(msg){
					$('#freesubmittip p').html('已提交成功，等着收奖吧！');
				$('#freesubmittip').modal({
					backdrop:false,
					show:true
				})
				setTimeout(function(){
					$('#freesubmittip').modal('hide');
				},3000);
				freesubmitsucc=true;
					
				},
				error:function(err){
					console.log(err);
				}
			});		

	})