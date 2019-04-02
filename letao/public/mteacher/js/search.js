$(function() {

    // 从本地localStorage取出数据转换成数组，如果以前没有存储过，则为null，给一个空数组作为默认值
    var kw = localStorage.getItem("kw") ? JSON.parse(localStorage.getItem("kw")) : [];
    var html = template("historyTpl", { list: kw })
    $("#historyList").html(html)

    // 点击实现跳转并将数据存储到localStrage中
    $("#searchBtn").click(function() {
        var keyWords = $("#keyWords").val();

        if (keyWords.trim() == "") {
            mui.alert("关键字搜索不能为空");
            return;
        }
        // 在跳转之前，把关键字要在本地存储一份  localStorage
        // JSON.parse()   字符串->数组
        // JSON.stringify()  数组->字符串
        kw.push(keyWords);
        localStorage.setItem('kw', JSON.stringify(kw));

        location.href = "searchResult.html?kw=" + keyWords;
    })

    //清空历史记录
    $("#clearBtn").click(function() {
        // 清除localStroage
        localStorage.removeItem("kw");
        // 清除页面dom元素
        $("#historyList").html("");
    })

})