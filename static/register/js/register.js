$(function(){
	$(":text").val(null);
	var user = $.cookie("user");
	var pwd = $.cookie("pwd");
	$("input").eq(1).val(user);
	$("input").eq(2).val(pwd);
	var flag1 = false; //表示邮箱/手机是否正确
	var flag2 = false; //表示用户名是否正确
	var flag3 = false; //表示密码是否正确
	var flag4 = false; //表示确认密码是否正确
	var flag5 = false; //表示手机号是否正确
	var flag6 = false; //表示验证码是否正确
	var flag7 = false; //表示是否同意服务条款
	var value;
	detect();
	$("input").eq(7).prop("checked",false);
	function detect(){
		value = $("input").eq(1).val();
		var val = $("input").eq(2).val();
		var reg1 = /^[a-zA-Z_]\w{5,14}$/;
		var reg2 = /^.{6,20}$/;
		if (reg1.test(value)){
			flag2 = true;
		}
		else{
			flag2 = false;
		}
		if (reg2.test(val)){
			flag3 = true;
		}
		else{
			flag3 = false;
		}		
	}
	$("input").eq(0).keyup(function(){
		isEmpty()
		value = $(this).val();
		var reg1 = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-9])|(18[0-9])|199)\d{8}$/;
		var reg2 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/ig;
		if (reg1.test(value) || reg2.test(value)){
			$(this).parent().find(".error-msg").hide();
			flag1 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("请输入正确的手机号或者邮箱");
		}		
	})	
	$("input").eq(1).keyup(function(){
		isEmpty()
		value = $(this).val();
		var reg = /^[a-zA-Z_]\w{5,14}$/;
		if (reg.test(value)){
			$(this).parent().find(".error-msg").hide();
			flag2 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("用户名只能由6到16位字符组成");
		}
		
	})
	$("input").eq(2).keyup(function(){
		isEmpty()
		value = $(this).val();
		var reg = /^.{6,20}$/;
		if (reg.test(value)){
			$(this).parent().find(".error-msg").hide();
			flag3 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("密码只能由6到20位字符组成");
		}
		
	})
	$("input").eq(3).keyup(function(){
		isEmpty()
		value = $(this).val();
		if (value == $("input").eq(2).val()){
			$(this).parent().find(".error-msg").hide();
			flag4 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("密码必须与第一次输入一致");
		}		
	})
	$("input").eq(4).keyup(function(){
		isEmpty()
		value = $(this).val();
		var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-9])|(18[0-9])|199)\d{8}$/;
		if (reg.test(value)){
			$(this).parent().find(".error-msg").hide();
			flag5 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("请输入正确的手机号");
		}
		
	})
	$("input").eq(5).keyup(function(){
		isEmpty()
		value = $(this).val();
		if (value){
			$(this).parent().find(".error-msg").hide();
			flag6 = true;
		}
		else{
			$(this).parent().find(".error-msg").show().find("p").html("请输入验证码");
		}		
	})
	$("input").eq(6).click(function(){
		if ($(this).prop("checked")){
			$(this).parent().find(".error-msg").hide();
			flag7 = true;
		}
		else{
			flag7 = false;
		}
	})
	
	$("input").eq(7).click(function(){
		if(!flag1){
			$("input").eq(0).parent().find(".error-msg").show().find("p").html("请输入正确的手机号或者邮箱");
		}
		else if(!flag2){
			$("input").eq(1).parent().find(".error-msg").show().find("p").html("请输入用户名");
		}
		else if(!flag3){
			$("input").eq(2).parent().find(".error-msg").show().find("p").html("请输入密码");
		}
		else if(!flag4){
			$("input").eq(3).parent().find(".error-msg").show().find("p").html("密码必须与第一次输入一致");
		}
		else if(!flag5){
			$("input").eq(4).parent().find(".error-msg").show().find("p").html("请输入正确的手机号");
		}
		else if(!flag6){
			$("input").eq(5).parent().find(".error-msg").show().find("p").html("请输入验证码");
		}
		else if(!flag7){
			$("input").eq(6).parent().find(".error-msg").show().find("p").html("请阅读并同意服务条款");
		}
		else{					
			var xhr = new XMLHttpRequest();
            xhr.open("post", "../PHP/register.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            var str = "username=" + $("input").eq(1).val() + "&pwd=" + $("input").eq(3).val();
            xhr.send(str);
            xhr.onreadystatechange = function () {
                if (xhr.readyState==4 && xhr.status==200){
                    console.log(xhr.responseText);
                    var obj = JSON.parse(xhr.responseText);
                    console.log(obj);
                    if(obj.status == 1){
                    	$.cookie("user", $("input").eq(1).val(), {expires:30, path:"/"});
						$.cookie("pwd", $("input").eq(2).val(), {expires:30, path:"/"});	
                    	alert("注册成功！");
						location.href = "../html/Login.html";
                    }
                    else{
                    	alert("注册失败,用户名已被使用");
                    }
                }
            }
		}
	})
	
	$(".msg").show();
	$("input").click(function(){
		$(this).parent().find(".msg").hide();
		
	})
	$("input").blur(function(){
		if(!$(this).val()){
			$(this).parent().find(".msg").show();
		}		
	})
	$(".msg").click(function(){
		$(this).hide();
		$(this).parent().find("input").focus();	
	})
	isEmpty();
	function isEmpty(){
		$("input").each(function(){
			if($(this).val()){
				$(this).parent().find(".msg").hide();
			}
			else{
				$(this).parent().find(".msg").show();
			}
		})
	}
	$(".main-tit p a").click(function(){
		location.href = "../html/Login.html";		
	})
	$(".header-logo").click(function(){
		location.href = "../index.html";
	})      
})