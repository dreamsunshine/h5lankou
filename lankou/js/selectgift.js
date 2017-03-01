 function Zoompic()
    {
       this.initialize.apply(this,arguments);
    }
    Zoompic.prototype=
    {
        initialize:function(id)
        {
           var _this=this;
           var w=document.body.clientWidth;
           var h=document.body.clientHeight*0.4;
           this.box=typeof id=="string"?document.getElementById(id):id;
           this.oPre=this.box.getElementsByTagName('div')[0];
           this.oNext=this.box.getElementsByTagName('div')[1];
           this.oUl=this.box.getElementsByTagName('ul')[0];
           this.aLi=this.oUl.getElementsByTagName('li');
           this.timer=null;
           this.iCenter=3;
           this.aStor=[];
           flag=0;
           
            this.options = [
                {width:Math.round(0.2*w), height:Math.round(1.5*h), top:0, left:Math.round(-0.05*w), zIndex:1},
                {width:Math.round(0.29*w), height:Math.round(1.5*h), top:0, left:Math.round(0.06*w), zIndex:2},
                {width:Math.round(0.32*w), height:Math.round(1.5*h), top:0, left:Math.round(0.21*w), zIndex:3},
                {width:Math.round(0.40*w), height:Math.round(1.5*h), top:0, left:Math.round(0.40*w), zIndex:4},
                {width:Math.round(0.35*w), height:Math.round(1.5*h), top:0, left:Math.round(0.67*w), zIndex:3},
                {width:Math.round(0.20*w), height:Math.round(1.5*h), top:0, left:Math.round(0.81*w), zIndex:2},
                {width:Math.round(0.20*w), height:Math.round(1.5*h), top:0, left:Math.round(0.60*w), zIndex:1}
            ];
           for(var i=0;i<this.aLi.length;i++) this.aStor[i]=this.aLi[i];
           this.up();
            this._oNext=function()
            {
                return _this.doNext.apply(_this);
            }
            this._oPre=function()
            {
                return _this.doPre.apply(_this);
            }
           this.addBing(this.oNext,"click",this._oPre);
           this.addBing(this.oPre,"click",this._oNext);
           var ex,sx,s;
           this.addBing(this.oUl,"touchstart",function(e){
             e.preventDefault();
             var touch=e.touches[0];
             sx=touch.pageX;
           });
           
           this.addBing(this.oUl,"touchmove",function(e){
             e.preventDefault();
             var touch=e.touches[0];
             ex=touch.pageX;
             s=ex-sx;
            
           });
           this.addBing(this.oUl,"touchend",function(e){
           	
             e.preventDefault();
             if(s>20){
               _this._oNext()
             }else if(s<-20){
                _this._oPre()
             }
             s=ex=sx=null;
           });
           
           // setInterval(this._oNext,5000);
        },
        
        doNext:function()
        {
          this.aStor.unshift(this.aStor.pop());
          this.up();
        },
        doPre:function()
        {
          this.aStor.push(this.aStor.shift());
          this.up();
        },
        up:function()
        {
          _this=this;
          flag+=1;
          
          
          if(flag>=2){
          	
            	var src0=this.aStor[0].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src1=this.aStor[1].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src2=this.aStor[2].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src3=this.aStor[3].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src4=this.aStor[4].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src5=this.aStor[5].getElementsByTagName('div')[4].getAttribute('data-newsrc'),
            		src6=this.aStor[6].getElementsByTagName('div')[4].getAttribute('data-newsrc');
            
            this.aStor[0].getElementsByTagName('div')[4].style.backgroundImage='url(img/giftbox.png)';
            this.aStor[1].getElementsByTagName('div')[4].style.backgroundImage=src1;
            this.aStor[2].getElementsByTagName('div')[4].style.backgroundImage=src2;
            this.aStor[3].getElementsByTagName('div')[4].style.backgroundImage=src3;
            this.aStor[4].getElementsByTagName('div')[4].style.backgroundImage=src4;
            this.aStor[5].getElementsByTagName('div')[4].style.backgroundImage='url(img/giftbox.png)';
            this.aStor[6].getElementsByTagName('div')[4].style.backgroundImage='url(img/giftbox.png)';
            
            
            }
           for(var i=0;i<this.aStor.length;i++) this.oUl.appendChild(this.aStor[i]);
            
            for(var i=0;i<this.aStor.length;i++)
            {
               this.aStor[i].index=i;
               
               if(i<7)
               {
                   
                   this.starMove(this.aStor[i],this.options[i])
               }
                
            }
            
            
        },
        starMove:function(obj,json,fnEnd)
        {
            _this=this;
            clearInterval(obj.timer);
            obj.timer=setInterval(function()
            {
                var oStop=true;
                for( var attr in json)
                {
                    
                    {
                        icurr=parseInt(_this.css(obj,attr));
                    }
                   var ispeed=(json[attr]-icurr)/2;
                    ispeed=ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
                    if(icurr!=json[attr])
                    {
                        oStop=false;
                        _this.css(obj,attr,icurr+ispeed);
                    }
                }
                if(oStop)
                {
                    clearInterval(obj.timer);
                    fnEnd && fnEnd.apply(_this,arguments);
                }
            },30);
        },
        css:function(obj,attr,value)
        {
         if(arguments.length===2)
         {
             return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
         }else if(arguments.length===3)
         {
           switch (attr)
           {
               case "width":
               case "height":
               case "left":
               case "right":
               case "top":
               case "bottom":
                   obj.style[attr]=value+"px";
                   break;
               
               default :
                   obj.style[attr]=value;
                   break;
           }
         }
        },
        addBing:function(obj,type,fnEnd)
        {
            return obj.addEventListener?obj.addEventListener(type,fnEnd,false):obj.attachEvent("on"+type,fnEnd);
        }
    }
    window.onload=function()
    {
       new Zoompic("box");
       console.timeEnd('starts')
//     $('.loadingbg').css({'background-size':'100% 100%'});
//     setTimeout(function(){
//     	$('.swiper-container').show();
//     	$('.loading').hide();
//     },1000);
    }