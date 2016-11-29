var rules = (function() {
    var doc = document;

    var names = ['一世卦', '二世卦', '三世卦', '四世卦', '五世卦', '游魂卦', '外戒卦', '内戒卦', '归魂卦', '绝命卦', '血脉卦', '肌肉卦', '骸骨卦', '棺椁卦', '墓库卦', '还原卦'];
    var bases = [{
        array: [1, 1, 1, 1, 1, 1],
        name: '乾为天'
    }, {
        array: [0, 1, 0, 0, 1, 0],
        name: '坎为水'
    }, {
        array: [0, 0, 1, 0, 0, 1],
        name: '艮为山'
    }, {
        array: [1, 0, 0, 1, 0, 0],
        name: '震为雷'
    }, {
        array: [0, 1, 1, 0, 1, 1],
        name: '巽为风'
    }, {
        array: [1, 0, 1, 1, 0, 1],
        name: '离为火'
    }, {
        array: [0, 0, 0, 0, 0, 0],
        name: '坤为地'
    }, {
        array: [1, 1, 0, 1, 1, 0],
        name: '兑为泽'
    }];

    //京房十六卦推演规则
    var type_16 = function(base, status) {
        var execute_chain = [0, 1, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 3, 2, 1];
        base[execute_chain[status]] = base[execute_chain[status]] ^ 1;
        return base;
    }

    //京房十六卦推演算法
    var changeByType16 = function(base, status) {
        for (var i = 0; i <= status; i = i + 1) {
            base = type_16(base, i);
        }
        return base;
    }

    //推演八宫卦
    var deduce8 = function() {
        var execs = [0, 1, 2, 3, 4, 5, 9];
        var $tbody = doc.getElementsByTagName('tbody')[0];
        for (var i = 0; i < 8; i = i + 1) {
            var $tr = doc.createElement('tr');
            var $first_td = doc.createElement('td');
            $first_td.innerText = bases[i].name;
            var $secord_td = doc.createElement('td');
            var $div = createGuaXiang(bases[i].array);
            $secord_td.appendChild($div);
            $tr.appendChild($first_td);
            $tr.appendChild($secord_td);
            for (var j = 0; j < 7; j = j + 1) {
                var $td = doc.createElement('td');
                var $div = createGuaXiang(changeByType16(bases[i].array, execs[j]));
                $td.appendChild($div);
                $tr.appendChild($td);
            }
            $tbody.appendChild($tr);
        }
    }

    //创建卦象元素
    var createGuaXiang = function (array) {
      var $div = doc.createElement('div');
      $div.className = 'dao';
      for(var i = array.length; i >= 0 ; i = i - 1){
        var $yao = doc.createElement('div');
        if(array[i] === 1){
          $yao.className = 'yao yang';
        }else if(array[i] === 0){
          $yao.className = 'yao yin';
        }
        $div.appendChild($yao);
      }
      return $div;
    }

    return {
        changeByType16: changeByType16,
        deduce8: deduce8
    }
})();

window.onload = function() {
    rules.deduce8();
    // rules.changeByType16([1,1,1,1,1,1], 2);
};
