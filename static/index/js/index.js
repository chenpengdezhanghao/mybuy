$(function(){
	$(".own,.text").mouseenter(function(){
		$(this).find(".text").addClass("curre");
		$(this).find(".mycount").show();		
	})
	$(".own,.text").mouseleave(function(){
		$(this).find(".text").removeClass("curre");
		$(this).find(".mycount").hide();
	})
	$(".floor-l-ad").mouseenter(function(){
		$(this).find(".aimg").show().stop(true).animate({"left":242});
	})
	$(".floor-l-ad").mouseleave(function(){
		$(this).find(".aimg").stop(true).offset({"left":-242}).hide();
	})
	$(".detail-wrap li .add").mouseenter(function(){
		$(this).find("img").stop(true).animate({"left":42});
	})
	$(".detail-wrap li .add").mouseleave(function(){
		$(this).find("img").stop(true).animate({"left":30});
	})
	var mainTop = $(".main-wrap").offset().top;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();	
		if (scrollTop >= mainTop){
			$(".ztop").fadeIn(600);
		}
		else {
			$(".ztop").fadeOut(600);
		}
		if(scrollTop >= $(".feature").offset().top && scrollTop <= $(".feet-nav").offset().top){
			$(".float-nav").show();
		}
		else{
			$(".float-nav").hide();
		}
	})
	var isMoving;
	$(".float-nav ul li").click(function(){
		$(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active");					
		var index = $(this).index();
		var top = $(".floor").eq(index).offset().top - 100;		
		isMoving = true;
		$("html,body").stop(true).animate({"scrollTop": top}, function(){
			isMoving = false;
		});		
	})
	
	$(window).scroll(function(){
		if (!isMoving) {
			var scrollTop = $(document).scrollTop();
			var index = 0;			
			$(".floor").each(function(){
				var top = $(this).offset().top - 100;		
				var winH = $(window).height();			
				if (scrollTop + winH/2 > top) {
					index = $(this).index() - 1;
				}
			})
			$(".float-nav li").eq(index).find("a").addClass("active").parent().siblings().find("a").removeClass("active");				
		}		
	})
	$(".msg .title li").mouseenter(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".cont").eq($(this).index()).show().siblings().hide();		
	})
	$(".madlist-wrap").mouseenter(function(){
		$(this).find(".left-btn").stop(true).show();
		$(this).find(".right-btn").stop(true).show();		
	})
	$(".madlist-wrap").mouseleave(function(){
		$(this).find(".left-btn").stop(true).hide();
		$(this).find(".right-btn").stop(true).hide();		
	})
	$(".left-btn").click(function(){
		$(".madlist").animate({"left":0});		
	})
	$(".right-btn").click(function(){
		$(".madlist").animate({"left":-972});
	})
	$(".groom").mouseenter(function(){
		$(this).find(".left-btn").stop(true).show();
		$(this).find(".right-btn").stop(true).show();		
	})
	$(".groom").mouseleave(function(){
		$(this).find(".left-btn").stop(true).hide();
		$(this).find(".right-btn").stop(true).hide();		
	})
	$(".groom .left-btn").click(function(){
		$(".groom ul").animate({"left":0});		
	})
	$(".groom .right-btn").click(function(){
		$(".groom ul").animate({"left":-1210});
	})
	$("#return_top").click(function(){
		$("html,body").stop(true).animate({"scrollTop":0});	
	})
	var arr1 = [];
	$.get("JSON/items.json", function(data){
		arr1 = data;
		for (var i=0; i<arr1.length; i++) {
				var obj = arr1[i];
				$(".madlist li").eq(i).find(".changeimg").html("<img src=" + arr1[i].headImg +">");
				$(".madlist li").eq(i).find(".item").html("<a href='#'>" + arr1[i].name + "</a>");
				$(".madlist li").eq(i).find(".buy-l").find("span").html(arr1[i].price);
			}
			$(".madlist").on("click", "li", function(){
			var index = $(this).index(); 
			var obj = arr1[index];
			window.open("html/detail.html?id=" + obj.id);
		})
	})	
	
	// 大轮播图   banner
	var arr = [];
	var bgArr = [];
	$.get("JSON/banner.json", function(data){
		arr = data;
		for (var i=0; i<arr.length; i++) {
			var obj = arr[i];
			var li1 = $("<li></li>").appendTo(".bgimg");
			$("<a href='#'><img src="+ obj.headImg +"></a>").appendTo(li1);
			var li2 = $("<li></li>").appendTo("#mark");
			li2.addClass("marks");
			bgArr.push(arr[i].bgcolor);
		}
		change();
	})

	function change(){
		var _ul1 = $(".bgimg");
		var _ul2 = $("#mark");
		var _li1 = $(".bgimg li");
		var _li2 = $("#mark li");
		var size = $(".bgimg li").size();
		$(".banner-wrap").css({"background":"rgb(" + bgArr[0] + ")"});
		_li1.eq(0).fadeIn().siblings().fadeOut();
		_li2.eq(0).addClass("hover");
		var i = 0;
		var timer = setInterval(function(){
			i++;
			move();
		}, 2000);
		function move(){
			if (i == size) {
				i = 0;
			}
			if (i<0){
				i = size - 1;
			}
			_li1.eq(i).stop().fadeIn().siblings().stop().fadeOut();
			_li2.eq(i).removeClass("hover").addClass("hover").siblings().removeClass("hover");
			$(".banner-wrap").css({"background":"rgb(" + bgArr[i] + ")"});
		}
		_li2.hover(function(){
			var index = $(this).index();
			i = index;
			move();
		})
		$(".banner").mouseenter(function(){
			clearInterval(timer);
			$("#prer").stop(true).addClass("left-btn").show();
			$("#next").stop(true).addClass("right-btn").show();
		})
		$(".banner").mouseleave(function(){
			$("#prer").stop(true).hide();
			$("#next").stop(true).hide();
			timer = setInterval(function(){
				i++;
				move();
			}, 2000);
		})
		$("#prer").click(function(){
			i--;
			move();
		})
		$("#next").click(function(){
			i++;
			if (i == size) {
				i = 0;
			}
			move();
		})
	}


	$(".floor-r .tit li").mouseenter(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$(this).parent().parent().find(".floor-r-pg1").eq($(this).index()).show().siblings(".floor-r-pg1").hide();
		
	})	
	$(".feature a,.groom a,.floor-r-pg1 a").click(function(){
		window.open("html/detail.html");		
	})
	refresh();
	function refresh(){
		var arr = $.cookie("cart");
		arr = JSON.parse(arr);
		if (arr && arr.length>0) {
			$(".free").hide();
			$("#small_cart").show();
			var totalNum = 0;
			var totalPrice = 0;			
			$(".item-list").empty(true);
			for (var i=0; i < arr.length; i++){
				totalNum += arr[i].num;			
			  	totalPrice += arr[i].num*arr[i].price;	  	
			  	$('<li class="clearfix"><div class="pic"><a href="#"><img src=' + arr[i].headImg + '></a></div><div class="name-title"><a href= "#">' + arr[i].name + 
			  	'</a></div><div class="price-wrap"><span class="item-price">￥<i>' +arr[i].price + 
			  	'</i></span><b>× <span>' + arr[i].num + 
			  	'</span></b><div class="del-btn"><a href="javascript:;">删除</a></div></div></li>').appendTo(".item-list");
			}
			$(".tool-cart span").html(totalNum);
		    $(".cart span b").html(totalNum);
		    $(".cart-look i").html(totalNum);
		    $(".font font").eq(0).html(totalNum);
		    $(".font font ").eq(1).html(totalPrice);		    
		}
		else{
			$(".free").show();
			$("#small_cart").hide();
			$(".cart span b").html(0);
		    $(".cart-look i").html(0);
		    $(".tool-cart span").html(0);
		}
	}
	$(".item-list").on("click",".del-btn",function(){
		var index = $(this).index(".del-btn .item-list");
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index,1);
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();		
	})
	$(".cart-btn,.min-cart").mouseenter(function(){
		$(".min-cart").stop(true).show();	
		$(".cart-btn").addClass("hover-current");
	})
	$(".cart-btn,.min-cart").mouseleave(function(){
		$(".min-cart").stop(true).hide();
		$(".cart-btn").removeClass("hover-current");
	})
	$(".reg").click(function(){
		location.href = "html/register.html";
		
	})
	$(".log").click(function(){
		location.href = "html/Login.html";		
	})
	$(".cart-btn a").click(function(){
		location.href = "html/cart.html";		
	})
	$(".kinds").mouseenter(function(){
		$(this).find(".sub-kinds").show();
		
	})
	$(".kinds").mouseleave(function(){
		$(this).find(".sub-kinds").hide();
		
	})
})