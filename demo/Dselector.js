function Dselect(param){//构造器
    this.param=param
    this.Data=param.data//存储数据
    this.Selected=[]//存储已选择数据
    this.SelectedDom=[]//存储已经选择的DOM组
    this.color=param.color||"rgb(53,135,255)"
    this.module=param.module||'typeOne'
    this.width=param.width||'300px'
    this.group=param.group||''
    if(param.module=='typeTwo'){
        this.group=1
    }
    this.SelectorInit()
}

Dselect.prototype.SelectorInit=function(){
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
        console.log(8888)
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

Dselect.prototype.setStyle=function(){//设置样式
    var that=this
    this.Box.setAttribute('style','position:relative;min-height:40px;border:1px solid #ccc')
    this.Select.setAttribute('style','max-height:300px;overflow-x: hidden;overflow-y:auto;position: absolute;z-index: 1;top:100%;left:-1px;background:#fff;display:none')
    this.InsurBox.setAttribute('style','display:block;box-sizing:border-box;outline:none;text-align:left;position: relative;padding-bottom:5px;padding-top:5px;overflow: hidden;min-height:30px;top:0px;left:0px;z-index: 10;')
    if(this.module=='typeTwo'){
        this.TapBtn.setAttribute('style','height:100%;width:25px;display:flex;background:#ccc;top:0;right:0;align-items:center;justify-content:center;position:absolute;cursor:pointer;cursor-events:none')//new
        this.Icon.setAttribute('style','width:0px;height:0px;border:6px solid #ccc;border-top:10px solid #666;position:relative;top:4px')
        this.InsurBox.setAttribute('contenteditable',true) 
        this.InsurBox.setAttribute('style','padding-left:10px;min-height:40px;padding-top:8px;padding-bottom:5px;padding-right:25px;box-sizing:border-box;')  
    }

    this.Box.style.width=this.width
    this.Select.style.width=this.width
    this.Select.style.border="1px solid "+this.color

    this.options.forEach(function(item){
        item.setAttribute('style','width:99%;margin-top:3px;margin-left:1px;color:#333;box-sizing: border-box;padding: 5px 10px;background: rgb(240,240,240);')
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
        //this.style.display='none'
        if(e.target.className=='option'){
            //console.log(e.target.info)
            //that.Select.style.display='none'
            if(that.Selected.indexOf(e.target.info)==-1){
                if(!that.group){//控制下拉表单所能选择的个数
                    that.Selected.push(e.target.info)
                }else{
                    if(that.group==1){
                        that.Selected=[e.target.info]
                    }else{
                        if(that.Selected.length==that.group){
                            return true
                        }else{
                            that.Selected.push(e.target.info)
                        }
                    }
                }
                that.SelectedChange()//增加选择的元素
                that.Select.style.display='none'
                that.Box.style.border="1px solid #ccc"
            }
        }
    }
    this.InsurBox.onclick=function(e){
        if(that.Select.style.display=='none'){
            that.Select.style.display='block'
            that.Box.style.border="1px solid "+that.color
        }else{
            that.Select.style.display='none'
            that.Box.style.border="1px solid #ccc"
        }
    }
    this.InsurBox.onfocus=function(e){//typeTwo
        this.onkeyup=function(){
            that.Selected[0]=this.innerHTML
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
            InsurList.setAttribute('style','padding:5px 6px;padding-right:30px;margin-left:10px;margin-top:3px;margin-bottom:5px;position: relative;z-index: 99;display:block;float:left;color:#fff;cursor: pointer;pointer-events: all;border-radius:3px')
            InsurList.style.background=that.color
            CloseIcon.innerHTML='X'
            CloseIcon.setAttribute('style','display: flex;position: absolute;font-size:14px;right:10px;top:0px;height:100%;align-items:center;color:#fff;font-family:"微软雅黑";font-style:normal')
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
                if(e.target.nodeName=='I'){
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
    //this.emit()
}



Dselect.prototype.emit=function(){//输出数据
    //console.log(this.Selected)
    return this.Selected
}