var arr = [
			["XC12610QS", "By Vilain POWERMADE 丹麥 水洗式髮油 65ml", 650, "img/XC12610QS.jpg"],
		    ["XC13610S", "BYRD CLASSIC POMADE 5oz 油性髮油", 390, "img/XC13610S.jpg"],
		    ["XC12690S", "LAYRITE Cement Clay 黑色水泥 4oz", 620, "img/XC12690S.jpg"],
		    ["XC12640S", "LOCKHART'S GOON GREASE 油性髮油 4oz", 520, "img/XC12640S.jpg"],
		    ["XC11710s", "REUZEL Heavy Hold Pomade 油性髮油 4oz", 400, "img/XC11710s.jpg"],
		    ["XC11640S", "REUZEL Strong Hold Pomade 水洗式髮油 4oz", 400, "img/XC11640S.jpg"],
		    ["XC10770s", "Slick Devil Pomade 水洗式髮油 強黏 4oz", 460, "img/XC10770s.jpg"],
		    ["XC13740S", "Suavecito Pomade 水洗式髮油 4oz", 480, "img/XC13740S.jpg"],
		    ["XC13730S", "UPPERCUT MATT CLAY 水洗式髮蠟 70g", 5000, "img/XC13730S.jpg"]
		];
	showProduct(arr);
function showProduct(list){
	var str ="";
	for (var i = 0; i < list.length; i++) {
		str += "<li>"+
				"<img src = '" + list[i][3] + "'>" +
				"<p>" + list[i][1] + "</p>" +
				"<p> 定价:" + list[i][2] + "</p>" +
				"</li>"
	}
	document.getElementsByTagName("ul")[0].innerHTML = str;
}
//找到ul下所有的发油图片
var imgs = document.querySelectorAll("ul img");
var cart = document.querySelector("body>div");
console.log(cart);
console.log(imgs);
for (var i = 0; i < imgs.length; i++) {
	imgs[i].ondragstart = function(){
		console.log(this);
		this.id = "drag";
	}
}
cart.ondragover = function(e){
	e.preventDefault();
}
//购物车里面的记录
var count = 0 ;

cart.ondrop = function(){
	console.log("触发");
//	得到拖拽的图片
	var dragImg = document.getElementById("drag");
	dragImg.id = "";
	console.log(dragImg);
	var str = "<tr>"+
				"<td>" + (++count) + "</td>" +
				"<td><img src ='" + dragImg.src +"'/></td>" +
				"<td>" + dragImg.nextElementSibling.innerText + "</td>" +
				"<td>" + dragImg.nextElementSibling.nextElementSibling.innerText + "</td>" +
				"</tr>"
	document.querySelector("table>tbody").innerHTML = str;
}
