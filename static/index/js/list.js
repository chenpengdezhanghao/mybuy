$(function () {
    $(".kinds ").mouseenter(function () {
        $(this).find('.sub-kinds').show()
    });
    $(".kinds").mouseleave(function () {
        $(this).find('.sub-kinds').hide()
    });
});