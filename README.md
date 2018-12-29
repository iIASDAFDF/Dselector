# Dselector
一个简单易用的下拉表单，可选择多个选项
这是1.0版本 目前只有一种选择框形式
一个页面可以使用多个选择框！您只需要新建实例对象即可


使用方法：
定义一个容器
  <div class="selector"></div>
  <button class="button" onclick="getData()">点我在控制台输出选择的数据</button>

引入此插件
  <script src="Dselector.js" type="text/javascript"></script>

实例化对象
  var SE=new Dselect({//Dselect对象实例化
      el:'.selector',//绑定容器
      data:[22,33,44,55,66,77],//输入数据，数据格式为数组或对象数组
      width:'300px',//定义宽度
  })
  
  
    var SE2=new Dselect({
      el:'.selector2',
      data:[{aa:66},{aa:77},{aa:99},{aa:29},{aa:30},{aa:41}],
      key:'aa',//如果您输入的数据类型是一个对象数组，您需要定义‘key’,'key'的值将作为option的显示文本
      width:'300px',
      color:"chocolate"//您可以定义您的选择框皮肤颜色
  })
  
  
  输出选择的结果
    function getData(){//您只需要拿取Dselect实例对象的Selected，即可得到您选择的数据
      console.log(SE.Selected)
    }
