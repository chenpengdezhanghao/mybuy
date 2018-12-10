$(function(){
	$(".own,.own .text").mouseenter(function(){
		$(this).find(".text").addClass("curre");
		$(this).find(".mycount").show();
		
	})
	$(".own,.own .text").mouseleave(function(){
		$(this).find(".text").removeClass("curre");
		$(this).find(".mycount").hide();
	})
	$("#return_top").click(function(){
		$("html,body").stop(true).animate({"scrollTop":0});	
	})
	$(".allkinds h2,.list").mouseenter(function(){
		$(".list").stop(true).slideDown(600);		
	})
	$(".allkinds h2,.list").mouseleave(function(){
		$(".list").stop(true).slideUp(600);	
	})
	$(".page a").click(function(){
		$(this).addClass("cur-a").siblings("a").removeClass("cur-a");		
	})
	$(".page a").eq(0).click(function(){
		$(".count ul").stop(true).animate({"left":0});
		
	})
	$(".page a").eq(1).click(function(){
		$(".count ul").stop(true).animate({"left":-600});
		
	})
	$(".cart-btn,.min-cart").mouseenter(function(){
		$(".min-cart").stop(true).show();	
		$(".cart-btn").addClass("hover-current");
	})
	$(".cart-btn,.min-cart").mouseleave(function(){
		$(".min-cart").stop(true).hide();
		$(".cart-btn").removeClass("hover-current");
	})		
	var _ul1 = $("#list1");
	var _ul2 = $(".expt");
	var _li1 = $("#list1 li");
	var _li2 = $(".expt li");
	var size = $("#list1 li").size();
	_li2.eq(0).show().siblings().hide();
	_li1.eq(0).addClass("bghover");
	var i = 0;
	var timer = setInterval(function(){
		i++;
		move(); 
	}, 3000);
	function move(){
		if (i == size) {
			i = 0;
		}
		if (i<0){
			i = size - 1;
		}
		_li2.eq(i).show().siblings().hide();
		_li1.eq(i).removeClass("bghover").addClass("bghover").siblings().removeClass("bghover");			
	}
	_li1.hover(function(){
			var index = $(this).index();
			i = index;
			move();
	})	
	var param = location.search.substring(1);
	var pid = getParams(param, "id");
	function getParams(str, name){
		var arr = str.split("&");
		for (var i=0; i<arr.length; i++) {
			var str1 = arr[i]; 
			var arr1 = str1.split("=");
			if (arr1[0] == name) {
				return arr1[1];
			}
		}
		return "";
	}
	$.get("../JSON/items.json", function(data){
		var arr = data;
		for (var i=0; i < arr.length; i++) {
			var obj = arr[i]; 
			if (obj.id == pid) {
				$(".position .name").html(obj.name);
				$(".tit p").html(obj.name);
				var zoom = obj.zoom;
				var aObj = obj;
				$(".price span").html(obj.price);
				for (var j = 0; j < obj.small.length; j++) {
					var li = $("<li></li>").appendTo(".items ul");
					$("<img src="+ obj.small[j] +">").appendTo(li);					
				}
				$(".items ul li").eq(0).addClass("cur");
				$(".zoom-in img").attr("src",obj.zoom[0]);
				$(".zoom-out img").attr("src",obj.zoom[0]);
				$(".items ul").on("mouseenter","li", function(){
					$(this).addClass("cur").siblings("li").removeClass("cur");				
					$(".zoom-in img").attr("src",zoom[$(this).index()]);
					$(".zoom-out img").attr("src",zoom[$(this).index()]);
				})
				var arr2 = [];
				$(".buy-btn").click(function(){
				    arr2 = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
					var isExist = false;
					for (var i=0; i<arr2.length; i++) {
						if (arr2[i].id == aObj.id) {
							var count = arr2[i].num;
							arr2[i].num = parseInt($(".num").val()) + count;
							arr2[i].checked = true;
							isExist = true;
							break;
						}
					}
					if (isExist ==  false) {
						aObj.num = parseInt($(".num").val());							
						aObj.checked = true;
						arr2.push(aObj);
					}										
					$.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
					refresh();
				})
			}
		}
	})
	refresh();
	function refresh(){
		var arr = $.cookie("cart");
		arr = JSON.parse(arr);
		$(".tool-cart span").html(0);
	    $(".cart span b").html(0);
	    $(".cart-look i").html(0);
	    $(".font font").eq(0).html(0);
	    $(".font font ").eq(1).html(0);	
		if (arr && arr.length>0) {
			$(".free").hide();
			$("#small_cart").show();
			var totalNum = 0;
			var totalPrice = 0;			
			$(".item-list").empty(true);
			for (var i=0; i < arr.length; i++){
				totalNum += arr[i].num;			
			  	totalPrice += (arr[i].price*arr[i].num).toFixed(2) - 0;	
			  	$('<li class="clearfix"><div class="pic"><a href="#"><img src=' + arr[i].zoom[0] + '></a></div><div class="name-title"><a href= "#">' + arr[i].name + 
			  	'</a></div><div class="price-wrap"><span class="item-price">￥<i>' +arr[i].price + 
			  	'</i></span><b>× <span>' + arr[i].num + 
			  	'</span></b><div class="del-btn"><a href="javascript:;">删除</a></div></div></li>').appendTo(".item-list");
			}
			var money = totalPrice;
			$(".tool-cart span").html(totalNum);
		    $(".cart span b").html(totalNum);
		    $(".cart-look i").html(totalNum);
		    $(".font font").eq(0).html(totalNum);
		    $(".font font ").eq(1).html(money);		    
		}
		else{
			console.log(arr.length);
			$(".free").show();
			$("#small_cart").hide();
			$(".cart span b").html(0);
		    $(".cart-look i").html(0);
		    $(".tool-cart span").html(0);
		}
	}
	$(".cart-btn").mouseenter(function(){		    	  	
    	$(".min-cart").show();
    	refresh();
    })
	$(".item-list").on("click",".del-btn",function(){
		var index = $(this).index(".del-btn .item-list");
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index,1);
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();		
	})
	
//	放大镜
	var scale = $(".zoom-in img").width()/$(".zoom-out img").width();
	$(".zoom-out").mousemove(function(e){
		$(".zoom-in").show();
		$(".zoom-up").show();
		var x = e.pageX - $(".zoom-up").width()/2 - $(".zoom-out").offset().left;
		var y = e.pageY - $(".zoom-up").width()/2 - $(".zoom-out").offset().top;
		if (x < 0){
			x = 0;
		}
		else if (x > $(".zoom-out").width()-$(".zoom-up").width()){
			x = $(".zoom-out").width()-$(".zoom-up").width();
		}
		if (y < 0){
			y = 0
		}
		else if (y > $(".zoom-out").height()-$(".zoom-up").height()) {
			y = $(".zoom-out").height()-$(".zoom-up").height();
		}
		$(".zoom-up").css({"left":x,"top":y});
		$(".zoom-in img").css({"left":-x*scale,"top":-y*scale});
	})
	$(".zoom-out").mouseleave(function(){
		$(".zoom-in").hide();
		$(".zoom-up").hide();
	})
//	购物过程
	$(".num").val(1);
	var num = 1;
	$(".add").click(function(){
		num++;
		$(".num").val(num);		
	})
	$(".cut").click(function(){
		num--;		
		if(num <= 1){
			num = 1;
		}
		$(".num").val(num);
	})
	$(".buy-btn").click(function(){
		$("#alert").show();		
	})
	$(".go-btn").click(function(){
		$("#alert").hide();		
	})
	$(".btn-left").click(function(){
		location.href = "../html/cart.html";		
	})
	$(".reg").click(function(){
		location.href = "../html/register.html" ;
		
	})
	$(".log").click(function(){
		location.href = "../html/Login.html" ;
		
	})
	$(".logo").click(function(){
		location.href = "../index.html";
	})
	$(".ind").click(function(){
		location.href = "../index.html" ;
		
	})
	$(".cart-btn a").click(function(){
		location.href = "../html/cart.html" ;
		
	})
})