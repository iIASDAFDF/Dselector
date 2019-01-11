# Dselector
一个简单易用的下拉表单，可选择多个选项

     这是1.3版本 目前只有两种选择框形式
     一个页面可以使用多个选择框！您只需要新建实例对象即可
演示地址：https://iiasdafdf.github.io/Dselector/


1.使用方法：
1.1定义一个容器

    <div class="selector"></div>
    <button class="button" onclick="getData()">点我在控制台输出选择的数据</button>

1.2引入此插件

    <script src="Dselector.js" type="text/javascript"></script>

1.3实例化对象

    定义第一个选择框
    var SE=new Dselect({//Dselect对象实例化
        el:'.selector',//绑定容器
        data:[22,33,44,55,66,77],//初始化数据，数据格式为数组或对象数组
        width:'300px',//定义宽度
    })
  
    定义第二个选择框
    var SE2=new Dselect({
      el:'.selector2',
      data:[{aa:66},{aa:77},{aa:99},{aa:29},{aa:30},{aa:41}],
      key:'aa',//如果您输入的数据类型是一个对象数组，您需要定义‘key’,'key'的值将作为option的显示文本
      width:'300px',
      group:1,//限制可选最大个数
      color:"chocolate"//您可以定义您的选择框皮肤颜色
    })

    定义第三个选择框
    var SE3=new Dselect({
      el:'.selector3',
      data:[{aa:66},{aa:77},{aa:99},{aa:29},{aa:30},{aa:41}],
      key:'aa',//如果您输入的数据类型是一个对象数组，您需要定义‘key’,'key'的值将作为option的显示文本
      width:'300px',
      module:'typeTwo',//开启第二种模式 可以输入和下拉，此模式只能单选
      match:'greedy'//在typeTwo模式下可以开启匹配功能，'upmake'为摄取模式，符合js字符串匹配规则,'greedy'为贪婪模式,可以不按照字符顺序进行匹配
    })
  
  
  1.4输出选择的结果
  
    function getData(){//您只需要拿取Dselect实例对象的Selected，即可得到您选择的数据
      console.log(SE.Selected)
    }
    
    
new!!!增加onchange事件！当选择内容改变时 onchange事件会触发！
  
     使用方法！SE.onchange=function(){console.log(this.Selected)}
