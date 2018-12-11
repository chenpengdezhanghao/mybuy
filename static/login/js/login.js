$(function(){
	$(":text").val(null);
	var user = $.cookie("user");
	var pwd = $.cookie("pwd");
	$("input").eq(0).val(user);
	$("input").eq(1).val(pwd);
	
	
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
	$(".login-btn a").click(function(){
		location.href = "../html/register.html";	
		
	})
	$(".header-logo").click(function(){
		location.href = "../index.html";
	})
	$("input").eq(2).click(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("post", "../PHP/login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var str = "username="+ $("input").eq(0).val() + "&pwd=" + $("input").eq(1).val();
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200) {
                console.log(xhr.responseText);
                var obj = JSON.parse(xhr.responseText);
                console.log(obj);
                if(obj.status == 1){
                	alert("登录成功！");
					location.href = "../index.html";
                }
                else{
                	alert(obj.msg);
                }
            }
        }
	})	
})