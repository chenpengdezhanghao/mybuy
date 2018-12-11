$(function () {
    $('.register').width(innerWidth)


    // 邮箱验证
    $('#email input').blur(function () {
        if ($(this).val() == '') return

        var reg =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (reg.test( $(this).val() )){ // 符合要求
            // 发起ajax请求　　>>> 　邮箱是否可用　？？？
            // jQuery.post( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )
            $.get('/axf/checkemail/', {'email': $(this).val()}, function (response) {
                console.log(response)
                $('#email .text').html(response.msg)
                if (response.status){   // 可用
                    $('#email').removeClass('has-error').addClass('has-success')
                    $('#email span').removeClass('glyphicon-remove').addClass('glyphicon-ok')
                    $('#email .text').removeClass('red').addClass('green')
                } else {    // 不可用
                    $('#email').removeClass('has-success').addClass('has-error')
                    $('#email span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
                    $('#email .text').removeClass('green').addClass('red')
                }
            })

        } else {    // 不符合要求
            $('#email').removeClass('has-success').addClass('has-error')
            $('#email span').removeClass('glyphicon-ok').addClass('glyphicon-remove')
        }
    })
})