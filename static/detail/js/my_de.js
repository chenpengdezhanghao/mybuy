$(function () {
     // 假如商品个数不为0，显示
    $('.bt-wrapper .num').each(function () {
        var num = parseInt($(this).html())
        if (num) {  // 显示
            $(this).prev().show()
            $(this).show()
        } else {    // 隐藏
            $(this).prev().hide()
            $(this).hide()
        }
    })

    // 加操作
    $('.bt-wrapper .glyphicon-plus').click(function () {
        // $(this)  >> 对应的加按钮
        var goodsid = $(this).attr('goodsid')
        // console.log($(this))

        // 保存起来
        var $that = $(this)

        // 发起ajax请求
        // jQuery.get( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )
        $.get('/axf/addcart/', {'goodsid':goodsid}, function (response) {
            console.log(response)
            if (response.status == -1){     // 未登录，直接跳转到登录
                // DOM  BOM
                window.open('/axf/login/', target='_self')
            } else if(response.status == 1){    // 添加成功
                // 有问题!!!!
                // $('.bt-wrapper .num').show().html(response.number)
                // $('.bt-wrapper .glyphicon-minus').show()

                // 兄弟节点
                // 问题: 操作不了
                // 分析: prev()上一个兄弟节点【没问题】， 问题只能是 $(this)
                // console.log($(this))
                // $(this) 指向有问题， 因为是由ajax触发的，所以这里指向ajax
                // $(this).prev().show().html(response.number)
                // $(this).prev().prev().show()

                $that.prev().show().html(response.number)
                $that.prev().prev().show()
            }
        })
    })

    $('.bt-wrapper .glyphicon-minus').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)

        $.get('/axf/subcart/', {'goodsid':goodsid}, function (response) {
            console.log(response)
            if (response.status == 1){  // 操作成功
                if (response.number > 0){   // 改变数据
                    $that.next().html(response.number)
                } else {    // 隐藏处理
                    $that.next().hide()
                    $that.hide()
                }
            }
        })
    })
})