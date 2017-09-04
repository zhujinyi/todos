(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!



	var tast_list=[];                                    //定义数组

	init();                                              //初始化
	// ActiveWatch()


	$(window).keydown(function (ev) {
		// ev.preventDefault();
		if(ev.keyCode == 13){                                  //回车键
			var obj={};
			obj.content=$(".header").find("input").val();        //读取数据
			if (!obj.content) return;
			// console.log(obj)

			add_task(obj);                                //存储数据

			createHtml();


			$(".header").find("input").val(null);         //清空读过的数据


		}else{
			return;
		}
	})


	function  init() {
		tast_list=store.get("gg") || [];                   //读取存储的数据
		createHtml(); //生成thml

	}


//把对像push数组里面
	function add_task(obj) {
		tast_list.push(obj);
		// console.log(tast_list)

		store.set("gg",tast_list);                              //把数据存到浏览器
	}


//生成Html

	function createHtml() {

		var $todo_list=$(".todo-list");
		// console.log($todo_list)
		$todo_list.html(null);                                    //清除ul的 html
		var complated_items=[];

		for(var i=0; i<tast_list.length; i++) {

			if(tast_list[i].complated){
				// $(".clear-completed").show();
				complated_items[i]=tast_list[i];


			}else{
				// $(".clear-completed").hide();

				var $item=bindHtml(tast_list[i],i);                       //由存储数据生成html
				$todo_list.prepend($item);                              //插入读取的数据



			}
			// ActiveWatch(i)
			// ActiveWatch()

		}
		for(var j=0;j<complated_items.length;j++){
			if(complated_items[j]){

				$item=bindHtml(complated_items[j],j);
				$item.addClass("complated");
				$todo_list.append($item);


			}
		}


		ActiveWatch()
		completedWatch()
		bindDelete();                                               //删除功能
		add_complated();                                            //添加complate
		//
		item_left();
		// ActiveWatch()
		Clear_completed()


	}
// //绑定Html
	function bindHtml(data,index) {
		var str='<li data-index="'+index+'">' +
			'<div class="view">' +
			'<input class="toggle complate" type="checkbox" '+(data.complated ? "checked" : "")+'>' +
			'<label>'+data.content+'</label>' +
			'<button class="destroy"></button>' +
			'</div>' +
			'<input class="edit" value="Rule the web' +
			'</li>'
		return $(str);

	}


	/*----------------------------------------main  开始----------------------------------------*/
//点击删除事件
	function bindDelete() {
		$(".destroy").click(function () {                                //获取删除按钮
			var index=$(this).parent().parent().data("index");            //获取删除目录
			remove_task_list(index);                                      //删除
		})
	}
//删除功能
	function  remove_task_list(index){
		var off = confirm("你确定要删除么");                                //弹窗是否删除
		if(!off) return;                                                   //
		tast_list.splice(index,1);                                          //删除某个
		refresh_task_list();                                                //删除刷新

	}
//刷新
	function refresh_task_list() {
		store.set("gg",tast_list);                                        //重新读取数据
		createHtml();                                                      //生成删除后的Html
	}
	function up_data(newobj,index){
		//task_list[index] = newobj;

		tast_list[index] = $.extend({},tast_list[index],newobj);
		store.set("gg",tast_list);
		//add_detail_html(task_list[index],index);
	}

	function add_complated() {
		var toggle = $(".todo-list .complate");
		toggle.click(function () {
			var index = $(this).parent().parent().data("index");
			if(tast_list[index].complated){
				up_data({complated:false},index)
			}
			else{
				up_data({complated:true},index)
			}
			createHtml();

		});
	}




//全选
	allChecked();

	function allChecked() {
		var off=true
		$(".toggle-all").bind("click",function () {
			if(off){
				for(var i=0;i<tast_list.length;i++){
					up_data({complated:true},i)
					createHtml();

				}
				off=false;

			}else {
				for(var i=0;i<tast_list.length;i++){
					up_data({complated:false},i)
					createHtml();

				}
				off=true;
			}


		})

	}
	/*----------------------------------------main 结束----------------------------------------*/




	/*----------------------------------------footer 开始----------------------------------------*/

// 任务
	function item_left() {
		var key=0;
		for(var i=0;i<tast_list.length;i++){
			if(!tast_list[i].complated){
				key++;
			}
			$(".todo-count").find("strong").text(key);
		}
	}

//显示全部
// 	ActiveWatch()
	allWatch()
	function allWatch() {
		$(".selected").click(function () {
			// $(".todo-list").find("li").show()
			createHtml();
		})
	}
//未完成

	// ActiveWatch()
	function ActiveWatch() {
		var $aLi=$(".todo-list").find("li")


		$(".filters").find("li").eq(1).click(function () {

			for(var i=0;i<$aLi.length;i++) {
			if ($aLi[i].className == "complated") {
				$(".complated").hide();
			} else {
				$aLi.show();
			}

		}

		})


	}

//已完成
// 	completedWatch()
	function completedWatch() {

		var $aLi=$(".todo-list").find("li")
		$(".filters").find("li").eq(2).click(function () {
			for(var i=0;i<$aLi.length;i++) {
				if ($aLi[i].className == "complated") {
					$(".complated").show();
				} else {
					$aLi.hide();
				}
				// createHtml()
			}

			})

	}

//清除完成
// 	Clear_completed()
	function Clear_completed() {
		var $aLi=$(".todo-list").find("li")

		for(var i=0;i<$aLi.length;i++){
			if($aLi[i].className =="complated"){
				$(".clear-completed").show();
			}else{
				$(".clear-completed").hide();
			}
		}


		$(".clear-completed").click(function () {

			for(var i =0;i<tast_list.length;i++){

				if(tast_list[i].complated){

					tast_list.splice(i,1);

				}
				refresh_task_list();
			}

		})

	}


	/*----------------------------------------footer 结束----------------------------------------*/
})(window);
