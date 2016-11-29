var Yin_Yang = (function () {
	var doc = document;

	//修改卦象
	var changeGua = function (yao_class, number_gua) {
		//获取到爻元素
		var $yao_list = doc.querySelectorAll('.' + yao_class + ' .yao');
		var yao_list_length = $yao_list.length;

		var yao_list = number_gua.split('');
		var length = yao_list.length;
		//统一元素和数据的数量是否一致
		if(length === yao_list_length && length === 6){
			for(var i = 0; i < 6; i = i + 1){
				$yao_list[5 - i].className = 'yao ' + (parseInt(yao_list[i]) % 2 === 1 ? 'yang' : 'yin');
			}
		}
	}

	//推演算法
	var deduce = function () {
		var numbers = [];
		for(var i = 0; i < 6; i = i + 1){
			var temp_number = 0;
			for(var k = 0; k < 3; k = k + 1){
				temp_number = temp_number + random23();
			}
			numbers[i] = temp_number;
		}
		return numbers;
	}

	//一次硬币算法
	var random23 = function () {
		return Math.round(Math.random()) === 0 ? 2 : 3;
	}

	//推演变卦
	var deduce_changed = function (numbers) {
		var numbers_lenght = numbers.length;
		var result_list = [];
		for(var i = 0; i < numbers_lenght; i = i + 1){
			var temp = numbers[i];
			result_list[i] = temp === 6 ? 7 : (temp === 9 ? 8 : temp);
		}
		return result_list;
	}

	//测试随机算法的准确性(随机运算取分布)
	var testRandom23 = function (count) {
		var count_2 = 0;
		var count_3 = 0;
		console.profile('testRandom23');
		for(var i = 0; i < count; i = i + 1){
			if(random23() === 2){
				count_2 = count_2 + 1;
			}else{
				count_3 = count_3 + 1;
			}
		}
		console.profileEnd('testRandom23');
		console.log('count_2的出现次数为：' + count_2 + ' 频率：' + (count_2 / count));
		console.log('count_3的出现次数为：' + count_3 + ' 频率：' + (count_3 / count));
	}

	//生成页面
	var buildHtml = function () {
		var yao_list = deduce();
		var bianyao_list = deduce_changed(yao_list);
		changeGua('zhigua', yao_list.join(''));
		changeGua('biangua', bianyao_list.join(''));
	}

	return {
		changeGua: changeGua,
		testRandom23: testRandom23,
 		deduce_changed: deduce_changed,
		buildHtml: buildHtml
	}
})();

Yin_Yang.buildHtml();
