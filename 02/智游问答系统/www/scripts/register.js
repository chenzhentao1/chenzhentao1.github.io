// 返回
$("#back").click(function() {
    history.go(-1);
});
// 跳转到首页
$("#home").click(function() {
    location.href = "/";
    // location.href = "index.html";
});
// 表单提交事件
$("form").submit(function(e) {
    // 阻止默认事件
    e.preventDefault();
    if ($("[name=password]").val() != $("[name=passwordTo]").val()) {
        // 判断密码和再次输入密码不相等
        $(".modal-body").text("两次密码输入不一致，请重填写")
        $("#myModal").modal("show");
        return;
    }
    console.log($(this).serialize());
    // 发送请求  注册
    $.post({
        url: "/register",
        data: $(this).serialize(),
        success: function(data) {
            // data.info代表响应数据，注册成功或失败
            $(".modal-body").text(data.info);
            // $("#myModal").modal("show")展示模态框
            $("#myModal").modal("show").on("hide.bs.modal", function() {
                // hide.bs.modal监听到模态框关闭/隐藏事件
                if (data.code == 0) {
                    // data.code判断注册成功
                    // 跳转登录页面
                    location.href = "login.html";
                }
            });
        }
    });
});