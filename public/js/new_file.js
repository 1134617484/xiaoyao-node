/*封装函数， 
 * 使serialize方法获取的对象转为json数组
 * $("#form").serializeObject()调用;
 * JSON.stringify($("#form").serializeObject());
 * */
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	function content_submit(){
		/*标题*/
		var textall=$('.box_text').val();
		/*文章*/
		var text_form=$('.text_form').val();
		/*类型*/
		var Category=$('.Category').val();
		console.log(textall+'  '+text_form+'  '+Category);
		var data={"article":text_form,"titles":textall,"Category":Category};
		console.log(data);
	$.ajax({
	 url:'/users/add',
     type:'post',
    data:data,
    cache:true,
    async:true,
    success : function(studentInfoId) {
        alert("成功");
    },
    clearForm: false,  
    resetForm: false, 
    error : function(data) {
        alert("上传失败，请仔细检查");
    }
});
	}
	
	
$('#boxes').click(function(){
		$.ajax({
	 url:'/users/search',
     type:'post',
    data:'',
    cache:true,
    async:true,
    success : function(studentInfoId) {
        alert("成功");
        alert(studentInfoId);
    },
    clearForm: false,  
    resetForm: false, 
    error : function(data) {
        alert("上传失败，请仔细检查");
    }
});
})

