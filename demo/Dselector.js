function Dselect(param){//构造器
    this.param=param
    this.Data=param.data//存储数据
    this.Selected=[]//存储已选择数据
    this.SelectedDom=[]//存储已经选择的DOM组
    this.color=param.color||"rgb(53,135,255)"
    this.module=param.module||'typeOne'
    this.width=param.width||'300px'
    this.group=param.group||''
    this.key=param.key||''
    this.allStyle={
        boxStyle:`
            position:relative;
            min-height:40px;
            border:1px solid #ccc
        `,
        SelectStyle:`
            max-height:300px;
            overflow-x: hidden;
            overflow-y:auto;
            position: absolute;
            z-index: 1;top:100%;
            left:-1px;
            background:#fff;
            display:none
        `,
        InsurBoxStyle:`
            display:block;
            box-sizing:border-box;
            outline:none;
            text-align:left;
            position: relative;
            padding-bottom:5px;
            padding-top:5px;
            overflow: hidden;
            min-height:30px;
            top:0px;left:0px;
            z-index: 10;
        `,
        InsurBoxStyleM:`
            padding-left:10px;
            min-height:40px;
            padding-top:8px;
            padding-bottom:5px;
            padding-right:25px;
            box-sizing:border-box;
            outline:none;
        `,
        TapBtnStyle:`
            height:100%;
            width:25px;
            display:flex;
            background:#ccc;
            top:0;
            right:0;
            align-items:center;
            justify-content:center;
            position:absolute;
            cursor:pointer;
            cursor-events:none
        `,
        IconStyle:`
            width:0px;
            height:0px;
            border:6px solid #ccc;
            border-top:10px solid #666;
            position:relative;
            font-weight:bold;
            transition:.5s;
            transform-origin:50% 30%;
            top:4px  
        `,
        selectItemStyle:`
            width:99%;
            margin-top:3px;
            margin-left:1px;
            color:#333;
            box-sizing: border-box;
            padding: 5px 10px;
            background: rgb(240,240,240);
        `,
        InsurListStyle:`
           padding:5px 6px;
           padding-right:30px;
           margin-left:10px;
           margin-top:3px;
           margin-bottom:5px;
           position: relative;
           z-index: 99;
           display:block;
           float:left;
           color:#fff;
           cursor: pointer;
           pointer-events: all;
           border-radius:3px 
        `,
        CloseIconStyle:`
           display: flex;
           position: absolute;
           font-size:20px;
           top:0px;
           right:0px;
           height:100%;
           width:20px;
           z-index:9;
           text-align:center;
           align-items:center;
           color:#fff;
           font-family:"微软雅黑";
           font-style:normal
        `//样式表
    }
    if(param.module=='typeTwo'){
        this.group=1
    }
    this.SelectorInit()
}

Dselect.prototype.SelectorInit=function(){//初始化
    this.createDom()
    this.setStyle()
    this.methods()
}

Dselect.prototype.createDom=function(){//创建基本dom元素
    this.options=[]//下拉选项dom数组
    this.Box=document.querySelector(this.param.el)
    this.Select=document.createElement('div')
    this.InsurBox=document.createElement('div')
    this.Select.className="select"
    if(this.module=='typeTwo'){//如果是模式二
        this.TapBtn=document.createElement('div')//new
        this.Icon=document.createElement('i')//new  
        this.TapBtn.appendChild(this.Icon)//new
        this.Box.appendChild(this.TapBtn)//new  
    }
    this.Data.forEach(function(item){
        var selectItem=document.createElement('div')
        selectItem.className='option'
        selectItem.info=item
        if(this.param.key){
            var newKey=this.param.key
            selectItem.innerHTML=item[newKey]
        }else{selectItem.innerHTML=item}
        this.options.push(selectItem)
        this.Select.appendChild(selectItem)
    }.bind(this))
    this.Box.appendChild(this.InsurBox)
    this.Box.appendChild(this.Select)
}
Dselect.prototype.buildItem=function(){//只构建下拉选项
    this.Data.forEach(function(item){
        var selectItem=document.createElement('div')
        selectItem.className='option'
        selectItem.info=item
        if(this.param.key){
            var newKey=this.param.key
            selectItem.innerHTML=item[newKey]
        }else{selectItem.innerHTML=item}
        this.options.push(selectItem)
        this.Select.appendChild(selectItem)
    }.bind(this))
}
Dselect.prototype.buildItemStyle=function(){//只构建下拉选项样式
    var that=this
    this.options.forEach(function(item){
        item.setAttribute('style',that.allStyle.selectItemStyle)
        item.onmouseenter=function(){
            this.style.background=that.color
            this.style.color="white"
        }
        item.onmouseleave=function(){
            this.style.background="rgb(240,240,240)"
            this.style.color="#333"
        }
    }.bind(this)) 
}
Dselect.prototype.setStyle=function(){//设置样式
    var that=this
    this.Box.setAttribute('style',that.allStyle.boxStyle)
    this.Select.setAttribute('style',that.allStyle.SelectStyle)
    this.InsurBox.setAttribute('style',that.allStyle.InsurBoxStyle)
    if(this.module=='typeTwo'){
        this.TapBtn.setAttribute('style',that.allStyle.TapBtnStyle)//new
        this.Icon.setAttribute('style',that.allStyle.IconStyle)
        this.InsurBox.setAttribute('contenteditable',true) 
        this.InsurBox.setAttribute('style',that.allStyle.InsurBoxStyleM)  
    }

    this.Box.style.width=this.width
    this.Select.style.width=this.width
    this.Select.style.border="1px solid "+this.color

    this.options.forEach(function(item){
        item.setAttribute('style',that.allStyle.selectItemStyle)
        item.onmouseenter=function(){
            this.style.background=that.color
            this.style.color="white"
        }
        item.onmouseleave=function(){
            this.style.background="rgb(240,240,240)"
            this.style.color="#333"
        }
    }.bind(this))
}
Dselect.prototype.methods=function(){//定义点击事件
    var that=this
    this.Select.onclick=function(e){//点击选项
        if(e.target.className=='option'){
            if(that.group==1){
                that.Selected=[e.target.info]
                that.SelectedChange()
            }
            else{
                if(that.Selected.indexOf(e.target.info)==-1){
                    if(that.Selected.length==that.group){
                        return true
                    }else{
                        that.Selected.push(e.target.info)
                    }
                    if(that.Icon){
                        that.Icon.style.transform="rotateZ(0deg)"
                    }
                    that.SelectedChange()//增加选择的元素
                    that.Select.style.display='none'
                    that.Box.style.border="1px solid #ccc"
                }
            }
        }
    }
    this.InsurBox.onclick=function(e){
        that.Box.style.outline='none'
        if(that.Select.style.display=='none'){
            that.Select.style.display='block'
            that.Box.style.border="1px solid "+that.color
            if(that.Icon){
                that.Icon.style.transform="rotateZ(180deg)"
            }
        }else{
            that.Select.style.display='none'
            that.Box.style.border="1px solid #ccc"
            if(that.Icon){
                that.Icon.style.transform="rotateZ(0deg)"
            }
        }
    }
    this.InsurBox.onfocus=function(e){//typeTwo
        this.onkeyup=function(){
            var zhi=this.innerText//输入的值
            that.Selected[0]=zhi
            that.onchange()
            if(that.param.match){//匹配模式 开！
                that.Select.innerHTML=''//清空下拉框
                that.options=[]//清空选项组
                if(zhi==''){
                    that.buildItem()
                    that.buildItemStyle()
                }else{
                    that.Data.forEach(function(item){
                        var str=that.key?item[that.key].toString():item.toString()
                        if(that.param.match=="greedy"){//贪婪匹配
                            var selectItem=document.createElement('div')
                            selectItem.className='option'
                            selectItem.info=item
                            for(var i=0;i<str.length;i++){
                                var list=document.createElement('span')
                                list.innerHTML=str[i]
                                for(var j=0;j<zhi.length;j++){
                                    if(str[i].indexOf(zhi[j])!=-1){
                                        list.style.color="red"
                                        selectItem.isMatch=true//匹配成功
                                    }
                                }
                                selectItem.appendChild(list)
                            }
                            if(selectItem.isMatch){
                                that.Select.appendChild(selectItem)//将匹配成功的置入select盒子
                                that.options.push(selectItem)//选项组里也添加一下
                            }
                            
                        }else{//摄取匹配
                            if(str.indexOf(zhi)!=-1){
                                var index=str.indexOf(zhi)
                                var selectItem=document.createElement('div')
                                selectItem.className='option'
                                selectItem.info=item
                                var b=document.createElement('span')
                                var c=document.createElement('span')
                                var d=document.createElement('span')
                                b.innerHTML=str.substring(0,index)
                                c.innerHTML=str.substring(index,index+zhi.length)
                                d.innerHTML=str.substring(index+zhi.length,str.length)
                                c.style.color="red"
                                selectItem.appendChild(b)
                                selectItem.appendChild(c)
                                selectItem.appendChild(d)
                                that.Select.appendChild(selectItem)
                                that.options.push(selectItem)
                            }
                        }                       
                    })
                    if(that.options.length==0){
                        that.buildItem()
                    }
                    that.buildItemStyle()
                }
            }
        }
    }
    if(this.module=='typeTwo'){
        this.TapBtn.onclick=function(e){
            if(that.Select.style.display=='none'){
                that.Select.style.display='block'
                that.Box.style.border="1px solid "+that.color
            }else{
                that.Select.style.display='none'
                that.Box.style.border="1px solid #ccc"
            }
        }

    }
}
Dselect.prototype.SelectedChange=function(){//改变选择的选项
    var that=this
    this.InsurBox.innerHTML=''//先清空
    if(!this.module||this.module=='typeOne'){
        this.Selected.forEach(function(item){
            var InsurList=document.createElement('div')
            var CloseIcon=document.createElement('i')
            InsurList.setAttribute('style',that.allStyle.InsurListStyle)
            InsurList.style.background=that.color
            CloseIcon.innerHTML='×'
            CloseIcon.setAttribute('style',that.allStyle.CloseIconStyle)
            CloseIcon.info=item
            if(that.param.key){
                var newKey=that.param.key
                InsurList.innerHTML=item[newKey]
            }else{InsurList.innerHTML=item}

            InsurList.appendChild(CloseIcon)
            that.SelectedDom.push(InsurList)
            that.InsurBox.appendChild(InsurList)
        })

        this.SelectedDom.forEach(function(item){//删除选项
            item.onclick=function(e){
                e.stopPropagation()
                if(e.target.nodeName=='I'||e.target.nodeName=='FONT'){
                    var index=that.Selected.indexOf(e.target.info)
                    that.Selected.splice(index,1)
                    that.SelectedChange()
                }
            }
        })
    }
    else if(this.module=='typeTwo'){
        if(this.param.key){
            var newKey=this.param.key
            this.InsurBox.innerHTML=this.Selected[0][newKey]
        }else{
            this.InsurBox.innerHTML=this.Selected[0]
        }
        
    }
    else{

    }
    if(this.onchange){
        this.onchange()
    }
}

Dselect.prototype.emit=function(){//输出数据
    //console.log(this.Selected)
    return this.Selected
}
Dselect.prototype.onchange=''
