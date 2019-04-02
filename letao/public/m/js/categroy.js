$(function(){
    // 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	// 一级标题
	$.ajax({
		type:"get",
		url:"/category/queryTopCategory",
		dataType:"json",
		success:function(res){
			// console.log(res);
			var html = template("topCateTpl",res);
			$(".myleft").append(html);
			// console.log(html);

			// 如果一级分类有数据
			// if(res.rows.length){
				var id = res.rows[0].id;
				$(".myleft").find("li").eq(0).addClass("active")
				$.ajax({
					type:"get",
					url:"/category/querySecondCategory",
					data:{
						"id":id
					},
					success:function(res){
						// console.log(res);
						var html = template("secondCateTpl",res);
						$(".myright").html(html);
					}
				});
			// }
		}
	});

	// 二级标题
	$(".myleft").on("click","li",function(){
		// 得到点击li的自定义id
		var id = $(this).attr("data-id");
		// var id = $(this).data('id');

		$(this).addClass("active").siblings().removeClass("active");
		// console.log(id);
		$.ajax({
			type:"get",
			url:"/category/querySecondCategory",
			data:{
				"id":id
			},
			success:function(res){
				// console.log(res);
				var html = template("secondCateTpl",res);
				$(".myright").html(html);
			}
		});
	})
	
})