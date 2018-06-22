$("#ask").click(function() {
    // 提问页面
    location.href = "ask.html";
});
$(".text").html($.cookie("user") ? $.cookie("user") : "登录");
// data-toggle="dropdown
if ($.cookie("user")) {
    $("#login").attr("data-toggle", "dropdown")
} else {
    $("#login").removeAttr("data-toggle");
}
$("#login").click(function() {
    if (!$.cookie("user")) location.href = "login.html";
});