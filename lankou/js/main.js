$(document).ready(function() {
	var h = window.screen.availHeight;
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		resistanceRatio: 0,
		onlyExternal: true,
		

	});

//	$('#slideway').on('touchstart click', function(e) {
//		e.preventDefault();
//		$(this).hide();
//	})
	$('#rule_detail').on('touchstart click', function(e) {
		e.preventDefault();
		$('#rule').modal({
			backdrop: false,
			show: true
		})
	});

	$('#closerule').on('touchstart click', function() {
		$('#rule').modal('hide');
	})

	$('#start').on('touchstart click', function(e) {
		e.preventDefault();
		$('#head .gift1').animate({
			transform: 'translate(0,50%)'
		});
		swiper.slideNext();

	})
	$('.gf').on('touchstart click', function(e) {
		e.preventDefault();
		
		var name = $(this).attr('data-name'),
			gfw = $(this).width(),
			gfh=$(this).innerHeight(),
			oldsrc = $(this).attr('data-osrc'),
			bgurl=$(this).css('background-image');
			
		if(bgurl.indexOf('giftbox.png')<0&&gs<3){
			$('#detail .dtp').css('width', gfw);
			$('#detail .dtp').css('height', gfw);
			$('#detail .dtp>img').attr('src', oldsrc);
			$('#detail .dtin').html(name);
			$('#detail .detail').next().html(name);
			$('#detail .detail').next().next().html(name);
			$('#detail').modal({
				backdrop: false,
				show: true
			})	
		}else{
			return false;
		}
		
	});
	var lis = []
	rmlis = [],
		gs = 0,
		curindex = 50,
		boxflag = true,
		libaoflag=false;
		sum = 0;
	var boxli = $('#box li');

	for (var i = 0; i < boxli.length; i++) {
		lis[i] = boxli[i];
	}
	
	var lastClick;
function lockClick() {
    var nowClick = new Date();
    if (lastClick == null) {
        lastClick = nowClick;
        return false;
    } else {
        if (Math.round((nowClick.getTime() - lastClick.getTime())) > 1000) {
            lastClick = nowClick;
            return true;
        }
        else {
            lastClick = nowClick;
            return false
        }
    }
}
	var ballclickable=true;	
	$('.ball').on('touchstart click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#detail').modal({
			backdrop:false,
			show:false
		});
		
		if(!ballclickable){return false;}
		ballclickable=false;
		if (gs < 4) {
			gs += 1;
			$(this).animate({
				opacity: '0'
			}, 'fast').hide().next().show('fast', function() {
				$('img:nth-of-type(1)', this).animate({
					top: '-30%',
					opacity: '0'
				}, 1000);
				$('img:nth-of-type(2)', this).animate({
					top: '-20%',
					right: '-100%',
					opacity: '0'
				}, 1000);
				$('img:nth-of-type(3)', this).animate({
					right: '-120%',
					opacity: '0'
				}, 1000);
				$('img:nth-of-type(4)', this).animate({
					left: '-160%',
					opacity: '0'
				}, 1000);
				$('img:nth-of-type(5)', this).animate({
					top: '100%',
					left: '-180%',
					opacity: '0'
				}, 1000);
				$('img:nth-of-type(6)', this).animate({
					top: '-10%',
					left: '-70%',
					opacity: '0'
				}, 1000);
				$(this).next().next().removeClass('highlight').animate();
				var cursrc = $(this).next().next().attr('data-osrc');
				var l = $(this).next().next().offset().left;
				var t = $(this).next().next().offset().top;
				var h = $(this).next().next().innerHeight();
				var w = $(this).next().next().width();
				$(this).next().hide();
				$(this).next().next().hide();
				var pclass = $(this).parent().parent().attr('class');
				var gfcopy = '<div class="gfcopy">' + '<img' + ' ' + 'src=""' + ' ' + 'class="img-responsive"></div>';
				$('.giftbox').append(gfcopy);
				switch (gs) {
					case 1:
						$('.gfcopy').eq(0).attr('data-oldclass', pclass);
						$('.gfcopy').eq(0).children('img').attr('src', cursrc);
						$('.gfcopy').eq(0).css({
							'width': w + 'px',
							'height': h + 'px',
							'left': l + 'px',
							'top': t + 'px',
							'z-index': curindex--
						}).show().animate({
							top: '85%',
							left: '45%'
						}, 2000);
						break;
					case 2:
						$('.gfcopy').eq(1).attr('data-oldclass', pclass);
						$('.gfcopy').eq(1).children('img').attr('src', cursrc);
						$('.gfcopy').eq(1).css({
							'width': w + 'px',
							'height': h + 'px',
							'left': l + 'px',
							'top': t + 'px',
							'z-index': curindex--
						}).show().animate({
							top: '85%',
							left: '30%'
						}, 2000);
						break;
					case 3:
						$('.gfcopy').eq(2).attr('data-oldclass', pclass);
						$('.gfcopy').eq(2).children('img').attr('src', cursrc);
						$('.gfcopy').eq(2).css({
							'width': w + 'px',
							'height': h + 'px',
							'left': l + 'px',
							'top': t + 'px',
							'z-index': curindex--
						}).show().animate({
							top: '85%',
							left: '55%'
						}, 2000);
						break;
					default:
						break;
				}
				var price = parseInt($(this).next().next().attr('data-price'));
				sum += price;
				if(gs == 3){
					$('#intro').hide();
				}
				if (sum < 1080 && gs == 3) {
					
					$('#selend').modal({
						backdrop: false,
						show: true
					})
				} else if (sum >= 1080 && boxflag) {
					$('#caidan').modal({
						backdrop: false,
						show: true
					})
					boxflag = false;
				} else if (sum >= 1080 && (!boxflag) && gs == 3) {
					$('#giftbox .freebox').show().addClass('skydown');
					$('#selend').modal({
						backdrop: false,
						show: true
					})
				}

			})
		}
		
		setTimeout(function(){ballclickable=true},1000);
	
	})
	$('#free').on('touchstart click', function(e) {
		e.preventDefault();
		var selectgift=$('#giftbox .gfcopy');
		for (var i=0;i<selectgift.length;i++) {
			var gfcopy = '<div class="gfcopy">' + '<img' + ' ' + 'src=""' + ' ' + 'class="img-responsive"></div>';
				$('.nofree_center').append(gfcopy);
				switch (i) {
					case 0:
						var w=$('#giftbox .gfcopy').eq(0).width(),
							h=$('#giftbox .gfcopy').eq(0).height(),
							z=$('#giftbox .gfcopy').eq(0).css('z-index'),
							pclass=$('#giftbox .gfcopy').eq(0).attr('data-oldclass'),
							cursrc=$('#giftbox .gfcopy').eq(0).children('img').attr('src');
						$('.nofree_center .gfcopy').eq(0).attr('data-oldclass', pclass);
						$('.nofree_center .gfcopy').eq(0).children('img').attr('src', cursrc);
						$('.nofree_center .gfcopy').eq(0).css({
							'width': '20%',
							'height': '120px',
							'left': '23%',
							'top': '30%',
							'z-index': z
						}).show();
						break;
					case 1:
						var w=$('#giftbox .gfcopy').eq(1).width(),
							h=$('#giftbox .gfcopy').eq(1).height(),
							z=$('#giftbox .gfcopy').eq(1).css('z-index'),
							pclass=$('#giftbox .gfcopy').eq(1).attr('data-oldclass'),
							cursrc=$('#giftbox .gfcopy').eq(1).children('img').attr('src');
						$('.nofree_center .gfcopy').eq(1).attr('data-oldclass', pclass);
						$('.nofree_center .gfcopy').eq(1).children('img').attr('src', cursrc);
						$('.nofree_center .gfcopy').eq(1).css({
							'width': '20%',
							'height': '120px',
							'left': '42%',
							'top': '30%',
							'z-index': z
						}).show();
						break;
					case 2:
						var w=$('#giftbox .gfcopy').eq(2).width(),
							h=$('#giftbox .gfcopy').eq(2).height(),
							z=$('#giftbox .gfcopy').eq(2).css('z-index'),
							pclass=$('#giftbox .gfcopy').eq(2).attr('data-oldclass'),
							cursrc=$('#giftbox .gfcopy').eq(2).children('img').attr('src');
						$('.nofree_center .gfcopy').eq(2).attr('data-oldclass', pclass);
						$('.nofree_center .gfcopy').eq(2).children('img').attr('src', cursrc);
						$('.nofree_center .gfcopy').eq(2).css({
							'width': '20%',
							'height': '120px',
							'left': '61%',
							'top': '30%',
							'z-index': z
						}).show();
						break;
					default:
						break;
				}
		}
		
		setTimeout(function(){
			swiper.slideNext();
			$('#freeselect li').each(function() {
				$(this).addClass('skydown');
			})	
		},1000);
		setTimeout(function(){
			$('.cover').hide();
		},2000)
		
	})


	var ey, sy, s;
	var s1 = document.getElementById('slide1');
	$('#slide1').on('touchstart', function(e) {
		e.preventDefault();
		var touch = e.originalEvent.targetTouches[0];
		sy = touch.pageY;

	})
	$('#slide1').on('touchmove', function(e) {
		e.preventDefault();
		var touch = e.originalEvent.targetTouches[0];
		ey = touch.pageY;

		s = ey - sy;
		if (s < -20) {
			$('#head .brand').animate({
				marginTop: '0',
				opacity: '0'
			}, 1000);
			$('.lancome').animate({
				opacity: '0'
			}, 1000);
			$('.s_main li').animate({
				marginTop: -h
			}, 2000);
			setTimeout(function() {
				swiper.slideTo(1, 1000, false);
			}, 500)
//			$('#slideway').modal({
//				backdrop: false,
//				show: true
//			});
		}
	})

	function pricechange(cname, s) {
		$('.' + cname).find('.ball').css('opacity', 1).show().addClass('highlight');
		$('.' + cname).find('.ballpo').hide();
		$('.' + cname).find('.ballpo').find('img').attr({
			style: ''
		});
		$('.' + cname).find('.line').show();
		$('.' + cname).find('.gf').show().addClass('highlight');
		var price = parseInt($('.' + cname).find('.gf').attr('data-price'));
		s -= price;
		return s;
	}

	$('#giftbox').on('touchstart click', '.gfcopy', function(e) {
		e.preventDefault();
		var reclass = $(this).attr('data-oldclass');
		gs-=1;
		if (gs == 2) {
			$('#selend').modal('hide');
			$('.introway').show();
		}
		if (sum < 1080) {
			
			$(this).remove();
			sum = pricechange(reclass, sum);
			
		} else {
			
			$(this).remove();
			
			sum = pricechange(reclass, sum);
			if (sum < 1080) {
				$('#giftbox .freebox').removeClass('skydown').hide();

			}
		}

	})
	$('#again').on('touchstart click', function(e) {
		e.preventDefault();
		$('.introway').show();
		libaoflag=false;
		$('#giftbox .freebox').removeClass('skydown').hide();
		$('#selend').modal('hide');
		var gfcopys = $('#giftbox .gfcopy');
		for (var i = 0; i < gfcopys.length; i++) {
			var removeclass = $('#giftbox .gfcopy').eq(0).attr('data-oldclass');
			$('#giftbox .gfcopy').eq(0).remove();
			gs-=1;
			$('.' + removeclass).find('.ball').css('opacity', 1).show().addClass('highlight');
			$('.' + removeclass).find('.ballpo').hide();
			$('.' + removeclass).find('.ballpo').find('img').attr({
				style: ''
			});
			$('.' + removeclass).find('.line').show();
			$('.' + removeclass).find('.gf').show().addClass('highlight');
			var price = parseInt($('.' + removeclass).find('.gf').attr('data-price'));
			sum -= price;

		}
	});
//	$('#free').on('touchstart click', function(e) {
//		e.preventDefault();
//		$('#freeselect li').addClass('skydown');
//	})
	$('#libao').on('touchstart click', function(e) {
		e.preventDefault();
		libaoflag=true;
		$('#caidan').modal('hide');
		$('#giftbox .freebox').show().addClass('skydown');
		if (gs == 3) {
			$('#selend').modal({
				backdrop: false,
				show: true
			})
		}
	})

//	$('#freeselect li').on('touchstart click', function() {
//
//		if ($(this).attr('data-access')) {
//			swiper.slideTo(4, 1000, false);
//		} else {
//			swiper.slideTo(3, 1000, false);
//			$('.nofree_center .freebox').show();
//		}
//	})
	$('#bookgift').on('touchstart click', function(e) {
		e.preventDefault();
		$('#book').modal({
			backdrop: false,
			show: true
		})
	})
	$('#share').on('touchstart click', function(e) {
		e.preventDefault();
		$('#share_tip').modal({
			backdrop: false,
			show: true
		})
	})
	$('#share_tip').on('touchstart click', function(e) {
		e.preventDefault();
		$('#share_tip').modal('hide');
	})
	$('#cancelbook').on('touchstart click', function(e) {
		e.preventDefault();
		$('#book').modal('hide');
	})
	$('body').on('touchstart click','.modal-backdrop',function(){
		$(this).remove();
		$('#detail').modal('hide');
	})
})