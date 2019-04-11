$(document).ready(function (){
	
});
function contenr(){
	$.ajax({
			url:"/search",
			type:"post",
			data:{},
			async:true,
			dataType:'json',
			success:function(data){
				alert("1");
				console.log(data);
			},error:function(){
			}
		});
}
