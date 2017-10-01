<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>省市区三级联动</title>
</head>
<body>
	<select name="province" id="province"></select>
	<select name="city" id="city"></select>
	<select name="area" id="area"></select>
	<div id="result"></div>
	<button id="btn">获取</button>
	<script src="data.js"></script>
	<script>
	initSelect('province', 'city', 'area', 'btn', 'result');
	function initSelect(pro, city, area, btn, result){
		var province = document.getElementById(pro);
		var city = document.getElementById(city);
		var area = document.getElementById(area);
		var btn = document.getElementById(btn);
		var result = document.getElementById(result);
		var value = [];
		console.log(data);
		init();
		function initProvince(){
			for(var str in data){
				addOption(province, str);
			}
		}
		// 初始化
		function init(){
			initProvince();
			cmbSelect(province);
		  province.onchange = changeProvince;
			changeProvince();
			changeCity();
			changeArea();
		}
		// 设置默认
		function cmbSelect(cmb){
				cmb.selectedIndex = 0;
		}
		// 当改变省发生的函数
		function changeProvince(){
			console.log(province.value)
			value[0] = province.value;
			city.options.length = 0; //初始化城市
			if(province.selectedIndex === -1){
				return;
			}else{
				var nowProvince = data[province.value];
				for(var i in nowProvince){
					addOption(city, i)
				}
				cmbSelect(city);
                city.onchange = changeCity;
                changeCity();
			}
		}
    // 改变城市发生的函数
		function changeCity(){
			area.options.length = 0;
			value[1] = city.value;
			if(city.selectedIndex === -1){
				return;
			}else{
				var nowCity = data[province.value][city.value];
				for(var i in nowCity){
					addOption(area, nowCity[i]);
				}
			}
			cmbSelect(area)
			area.onchange = changeArea;
			changeArea();
		}
    // 改变地区发生的函数
		function changeArea(){
		    value[2] = area.value;
		}
    // 添加option
		function addOption(cmb, str, obj){
			var option = document.createElement('OPTION');
			cmb.options.add(option);
			option.innerText = str;
			option.value = str;
		}
		
		btn.onclick = function(){
			console.log(value);
			if(value.length > 0){
				result.innerText = value;
			} else{
				alert('还没有选！');
			}
			
		}
	}
	</script>
</body>
</html>
