$("#back").click(function() {
    history.go(-1);
});
$("#register").click(function() {
    location.href = "register.html"
});
$('form').submit(function(e) {
    e.preventDefault();
    $.post({
        url: "/login",
        data: $(this).serialize(),
        success: function(data) {
            // data.info代表响应数据，注册成功或失败
            $(".modal-body").text(data.info);
            // $("#myModal").modal("show")展示模态框
            $("#myModal").modal("show").on("hide.bs.modal", function() {
                // hide.bs.modal监听到模态框关闭/隐藏事件
                if (data.code == 0) {
                    // data.code判断登录成功
                    // 跳转主页页面
                    location.href = "index.html";
                }
            });
        }
    })
})