
$(function(){
    // 从本地localStorage取出数据转换成数组，如果以前没有存储过，则为null，给一个空数组作为默认值
    var kw = localStorage.getItem("kw") ? JSON.parse(localStorage.getItem("kw")) : [];
    var html = template("searchTpl",{list:kw});
    $(".mui-table-view").html(html);

    // 搜索添加点击事件,把localSrorage存储
    $("#searchbtn").click(function(){
        // mui.alert("123");
        var keywords = $("#keyWords").val();
        if(keywords.trim() == ""){
            mui.alert("搜索内容不能为空");
            return;
        }else if(!kw.indexOf(keywords)==-1){
            location.href = "searchResult.html?kw="+ keywords;
        }
        kw.push(keywords);
        localStorage.setItem("kw",JSON.stringify(kw));
        location.href = "searchResult.html?kw=" + keywords;
    })
    // 清空历史记录
    $(".mui-icon-trash").click(function(){
        localStorage.removeItem("kw");
        // 清空html
        $(".mui-table-view").html("");

    })
})