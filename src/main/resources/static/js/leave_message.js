$(document).ready(function () {
    $("#next_page").on("click",function () {
        var currentPageNum = $("#current_page")[0].innerText;
        var requestPageNum = parseInt(currentPageNum) + 1;

        $.get("/leavemessage/nextpage", {'requestPageNum': requestPageNum}, function (data, status) {
            //替换所有的html代码
            $("div.community").html(data)
        });

    });

    $("#previous_page").on("click",function () {

        var currentPageNum = $("#current_page")[0].innerText;
        var requestPageNum = parseInt(currentPageNum) - 1;

        $.get("/leavemessage", {'requestPageNum': requestPageNum}, function (data, status) {
            //替换所有的html代码
            $("div.community").html(data)
        });
    });
});
