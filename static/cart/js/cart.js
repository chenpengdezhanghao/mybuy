$(function(){
	$(".mycount-wrap, .mycount").mouseenter(function(){
		$(".mycount").show();
		$(".mycount-wrap").addClass(".activebg");
	})
	$(".mycount-wrap, .mycount").mouseleave(function(){
		$(".mycount").hide();
		$(".mycount-wrap").removeClass(".activebg");		
	})
	refresh();
	function refresh(){
		var arr = $.cookie("cart");
		if(arr){
			arr = JSON.parse(arr);
			if(arr.length>0){
				$(".ordercontent-content").remove();
				$(".cart-empty").hide();
				$(".full-cart").show();
				var sum = 0;
				var number = 0;
				for (var i=0; i<arr.length; i++){
					var obj = arr[i];
					$('<div class="ordercontent-content"><div class="content-type clearfix"><div class="content-cont1 ct"><div class="clearfix"><input type="checkbox" class="fl checkitem"/><a href="#"><img src=" ' +arr[i].zoom[0] +
						' "/></a><div class="content1-cent fl"><a href="#">'+arr[i].name +
						'</a></div></div></div><div class="content-cont2 ct">￥<span>' +arr[i].price + 
						'</span></div><div class="content-cont3 ct"><div class="dec"></div><div class="input_goods"><input type="text" value="'+ arr[i].num +
						'" /></div><div class="add"></div></div><div class="content-cont4 ct">￥<span>' + (arr[i].price*arr[i].num).toFixed(2) +
						'</span></div><div class="content-cont5 ct"><a href="#">收藏</a><div class="del-bot"><a href="#">删除</a></div></div></div></div>').appendTo(".ordercontent");
					$(".checkitem").eq(i).prop("checked",obj.checked);
					if(arr[i].checked){
						sum += arr[i].price*arr[i].num;
						number ++; 
					}					
				}				
				$(".total-mid em").html(sum.toFixed(2));
				$(".totalprice-top em").html(sum.toFixed(2));
				$(".oar-money span").html(sum.toFixed(2));
				$(".ora-tol-money span").html(sum.toFixed(2));
				$(".order-nav ul li em").html(arr.length);
				$(".to-num em").html(number);				
			}
			else{
				$(".cart-empty").show();
				$(".full-cart").hide();
			}
		}
		else{
			$(".cart-empty").show();
			$(".full-cart").hide();
		}
	}	
	$(".showcart").on("click", ".add", function(){
		var index = $(this).index(".showcart .add");
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num++;
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
	})
	$(".showcart").on("click", ".dec", function(){
		var index = $(this).index(".showcart .dec");
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num--;
		if (arr[index].num < 1) {
			arr[index].num = 1;
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
	})
	$(".showcart").on("click", ".del-bot", function(){
		var index = $(this).index(".showcart .del-bot");
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index, 1); 
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});					
		isAllSelect();
		refresh();
	})
	$(".showcart").on("click", ".checkitem", function(){
		var index = $(this).index(".showcart .checkitem");
		console.log(index);
		var arr = JSON.parse($.cookie("cart"));
		arr[index].checked = !arr[index].checked;
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		isAllSelect();
		refresh();
	})
	isAllSelect();
	function isAllSelect(){
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}		
		var arr = JSON.parse($.cookie("cart"));		
		var sum = 0;
		for (var i=0; i<arr.length; i++) {
			sum += arr[i].checked;
		}
		if (arr.length!=0 && sum==arr.length) {
			$(".all").prop("checked", true);
		}
		else {
			$(".all").prop("checked", false);
		}
	}
	$("#all").click(function(){
		if($("#allcheck").prop("checked")){
			$("#allcheck").prop("checked",false);
		}
		else{
			$("#allcheck").prop("checked",true);
		}
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0; i<arr.length; i++) {
			if ($(this).prop("checked")){
				arr[i].checked = true;
			}
			else {
				arr[i].checked = false;
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
	})
	$("#allcheck").click(function(){
		if($("#all").prop("checked")){
			$("#all").prop("checked",false);
		}
		else{
			$("#all").prop("checked",true);
		}
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0; i<arr.length; i++) {
			if ($(this).prop("checked")){
				arr[i].checked = true;
			}
			else {
				arr[i].checked = false;
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
	})
	$(".pos").on("click",function(){
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0; i<arr.length; i++) {
			if (arr[i].checked){
				arr.splice(i,1);
				i--;
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});					
		refresh();
	})
	$(".logo").click(function(){
		location.href = "../index.html";
	})
	$(".ind").click(function(){
		location.href = "../index.html" ;		
	})
	$(".reg").click(function(){
	location.href = "../html/register.html" ;		
	})
	$(".log").click(function(){
		location.href = "../html/Login.html" ;		
	})
	$(".trip-div a").click(function(){
		location.href = "../index.html" ;		
	})	
})