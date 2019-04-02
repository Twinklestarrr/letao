$(function() {

    // 滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 请求一级分类数据
    $.ajax({
        type: 'get',
        url: "/category/queryTopCategory",
        success: function(res) {
            var html = template("topCategroyTpl", res);
            $("#topCategoryList").html(html)

            // 一级分类数据加载回来后请求第一个分类的二级分类信息
            $("#topCategoryList").find("li").eq(0).addClass("active");
            var firstTopid = res.rows[0].id;
            getSecondCagegory(firstTopid);
        }
    })

    // 点击一级分类的数据请求二级分类
    $("#topCategoryList").on("click", "li", function() {

        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).data("id");
        // var id = $(this).attr("data-id");
        getSecondCagegory(id)
    })

    // 封装请求二级分类的方法
    function getSecondCagegory(id) {
        $.ajax({
            type: 'get',
            url: "/category/querySecondCategory",
            data: {
                "id": id
            },
            success: function(res) {
                // console.log(res)
                var html = template("secondCategroyTpl", res);
                $("#secondCategoryList").html(html)
            }
        })
    }

})