<template>
  <div>
  <!--头部-->
    <nav-header>
       <span slot="headTitle">影像详情</span>
       <a slot="tools" @click.stop="showTools"></a>
    </nav-header>
    <div class="tools_div" v-show="showTool">
        <ul>
            <li @click="choice(0)"><i class="fa fa-adjust"></i></li>
            <li @click="choice(1)"><i class="fa fa-delicious"></i></li>
            <li @click="choice(2)"><i class="fa fa-search"></i></li>
            <li @click="choice(3)"><i class="fa fa-arrow-circle-left"></i></li>
            <li @click="choice(4)"><i class="fa fa-arrow-circle-right"></i></li>
            <li @click="choice(5)"><i class="fa fa-rotate-left "></i></li>
            <li @click="choice(6)"><i class="fa fa-rotate-right "></i></li>
            <li @click="choice(7)"><i class="fa fa-text-height"></i></li>
            <li @click="choice(8)"><i class="fa fa-eye"></i></li>
            <li @click="choice(9)"><i class="fa fa-circle-thin "></i></li>
            <li @click="choice(10)"><i class="fa fa-arrows-h"></i></li>
            <li @click="choice(11)"><i class="fa fa-mail-reply "></i></li>
        </ul>
    </div>
   <div class="content" @click='hideTools'>
       <div class="content_title" v-show="showTitle">
           <p class="totle_img"><span class="m_title">{{medicalTitle}}</span>Image: <span>{{imgIndex}}</span>/<span>{{imgTotle}}</span></p>
           <p class="toolPic">
             <ul>
                <li v-show='liIndex==0'><i class="fa fa-adjust"></i></li>
                <li v-show='liIndex==1'><i class="fa fa-delicious"></i></li>
                <li v-show='liIndex==2'><i class="fa fa-search"></i></li>
                <li v-show='liIndex==3'><i class="fa fa-arrow-circle-down"></i></li>
                <li v-show='liIndex==4'><i class="fa fa-arrow-circle-left"></i></li>
                <li v-show='liIndex==5'><i class="fa fa-arrow-circle-right"></i></li>
                <li v-show='liIndex==6'><i class="fa fa-undo"></i></li>
                <li v-show='liIndex==7'><i class="fa fa-text-height"></i></li>
                <li v-show='liIndex==8'><i class="fa fa-eye"></i></li>
                <li v-show='liIndex==9'><i class="fa fa-circle-thin "></i></li>
                <li v-show='liIndex==10'><i class="fa fa-arrows-h"></i></li>
                <li v-show='liIndex==12'><i class="fa fa-mail-reply "></i></li>
             </ul>
           </p>
       </div>
        <img id="Img" :src="imgUrl"
           v-finger:multipoint-start="multipointStart.bind(this,liIndex)"
           v-finger:pinch="pinch.bind(this,liIndex)"
           v-finger:press-move="pressMove.bind(this,liIndex)"
           v-finger:touch-start="touchStart.bind(this,liIndex)"
           v-finger:touch-move="touchMove.bind(this,liIndex)"
            v-finger:touch-end="touchEnd.bind(this,liIndex)"
           v-bind:style="{transform:translate,filter:filter}"
           /> 

       <!--<ul>
           <li>
              <img src="../../static/image/medical_img.jpg" class="r_right r_arrow"/>
           </li>
       </ul>-->

   </div>
   <footer class="foot" @click="hideTools">
       <a class="icon_left" @click.stop="prev(imgIndex)"></a>
       <!--<progress max="100" value="0"></progress>
       <span></span>-->
       <input class="progress" type="range" v-model="progress" min="0" max="100" disabled>
       <a  class="icon_right" @click.stop="next(imgIndex)"></a>
   </footer>
  </div>
</template>

<script>
import navHeader from "@/components/Common/header"
var medicalData= JSON.parse(window.localStorage.getItem("medicalData"));
var sessionId=window.localStorage.getItem("sessionId");
var initScale=1;
var startX,startY,X,Y;
var Img=document.getElementById('Img');
//console.log(Img)
export default {
  data () {
    return {
       showTool:false,
       showTitle:true,
       medicalImg:[],
       studyUid:"",
       medicalTitle:"",//图片的对应项目名称
       imgTotle:1,
       imgIndex:1,//上下按钮切换
       imgUrl:"",
       progress:0,
       liIndex:-1,
       translate:'translate(0,0) scale(1,1) rotate(0) rotateY(0)',//单指图片移动
       Tx:0,//单指图片X移动
       Ty:0,//单指图片Y移动
      // scale:'scale(1,1)',//捏合图片放大缩小
       scaleX:1,//捏合图片X方向放大缩小
       scaleY:1,//捏合图片Y方向放大缩小
       rotate:0,//图片旋转角度
       rotateX:0,//图片翻转
       rotateY:0,//图片翻转
       filter:'',//调亮度和对比度
       initScale:1,//捏合放大缩小原始值
       zoom:1, //对比度和饱和度初始值值
       zoomC:1 //饱和度

    }
  },
  mounted(){
     this.medicalImg=medicalData[this.$route.params.firstindex].seriesList[this.$route.params.secondindex].instanceList;
     this.imgTotle=this.medicalImg.length;
     this.medicalTitle=medicalData[this.$route.params.firstindex].seriesList[this.$route.params.secondindex].modality;
     this.studyUid=this.$route.params.studyUid;
     this.imgUrl=this.getUrl(this.imgIndex); 
     this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';  
     
  },
  methods:{
    
    showTools(){
      this.showTool=!this.showTool;

    },
    hideTools(){
      if(this.showTool){
         this.showTool=!this.showTool;
      } 
    },
    choice(i){
      this.liIndex=i;
      //i对应的工具里的li的index值
      // i=3 向下转180度角度 i=4 图片向左转90度 i=5图片向右转90度 i=6图片翻转
      if(i!=0||i!=1){
        // this.filter='';
       //  this.initScale=1;
       //  this.zoom=1;
      }
      if(i==0||i==1||i==2||i==9||i==10){
          //  this.initScale=1;
         //   this.zoom=1;
          //  this.Tx=this.Ty=0;
          //  this.scaleX=this.scaleY=1;
          //  this.rotate=this.rotateX=this.rotateY=0;
           // this.filter='';
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
      }else if(i==11){
            this.initScale=1;
            this.zoom=1;
            this.Tx=this.Ty=0;
            this.scaleX=this.scaleY=1;
            this.rotate=this.rotateX=this.rotateY=0;
            this.filter='';
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
      }else
      if(i==3){
           this.rotate-=90;
           this.rotateX=this.rotateY=0;
           this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
           //this.translate='rotate('+this.rotate+'deg)';  
          // console.log(this.translate)
      }else if(i==4){
          this.rotate+=90;
          this.rotateX=this.rotateY=0;
          this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
         // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
     
          //this.translate='rotate('+this.rotate+'deg)';  
  
      }else if(i==5){
          this.rotateX-=180;
          this.rotate=this.rotateY=0;
          this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
          //this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
     
         // this.translate='rotate('+this.rotate+'deg)';  
     }else if(i==6){
          this.rotateY+=180;
          this.rotate=this.rotateX=0;
          this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
         // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
       
         // this.translate='rotateY('+this.rotateY+'deg)';  
     }else if(i==7){
         this.showTitle=false;
         
     }else if(i==8){
         this.showTitle=true;
         
     }

    this.showTool=!this.showTool;
     
    },
    prev(index){
        //console.log(index)
      
      index--;
      if(index<=1){
          index=1;
          this.progress=0;
      }else{
       this.progress=index/this.imgTotle*100;
      }
      this.imgIndex=index;
      this.imgUrl=this.getUrl(index);
       //图片的transform属性全部为初始状态
      this.liIndex=-1;
      //this.Tx=this.Ty=0;
      //this.initScale=1;
     // this.scaleX=this.scaleY=1;
      //this.rotate=this.rotateX=this.rotateY=0;
     // this.filter='';
      this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
        
     // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
       
    },
    next(index){
      
      index++;
      if(index>=this.imgTotle){
          index=this.imgTotle;
      }
      this.progress=index/this.imgTotle*100;
      this.imgIndex=index;
      this.imgUrl=this.getUrl(this.imgIndex);
      //图片的transform属性全部为初始状态
      this.liIndex=-1;
    //  this.Tx=this.Ty=0;
     // this.initScale=1;
     // this.scaleX=this.scaleY=1;
     // this.rotate=this.rotateX=this.rotateY=0;
    //  this.filter='';
      this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
      //this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
       
    },
    getUrl(i){
      return this.api+"/reception/picture/createFlow?sessionId="+sessionId+"&studyUid="+this.studyUid+"&seriesUid="+this.medicalImg[(i-1)].seriesInstanceUid+"&instanceUid="+this.medicalImg[(i-1)].sopInstanceUid;
     },
    touchStart: function (index,evt) {
        evt.preventDefault();
        if(index==0||index==1){
          //console.log(evt);
          startX=evt.changedTouches[0].pageX;
          startY=evt.changedTouches[0].pageY;
        }
    },
    touchMove: function (index,evt) {
        evt.preventDefault();
     },
    touchEnd:  function (index,evt) { 
         X=evt.changedTouches[0].pageX-startX;
         Y=evt.changedTouches[0].pageY-startY;
         if( Math.abs(X) > Math.abs(Y) && X > 0 ) {
              // alert("向右");
               this.zoom+=0.2;
         }else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
                // alert("向左");
                this.zoom-=0.2;
         }else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                 this.zoom+=0.2;
               // alert("向下");
         }else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                //alert("向上");
                 this.zoom-=.2;
         }
         /*if(index==0||index==1){
           // this.Tx=this.Ty=0;
           // this.scaleX=this.scaleY=1;
          //  this.rotate=this.rotateX=this.rotateY=0;
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
            if(index==0){
            this.filter='brightness('+ this.zoom+')';
            }else if(index==1){
               // alert(this.zoom)
            this.filter='contrast('+this.zoom+')';
          }
         }  */
    },
    multipointStart: function (index,evt) {
         //alert(evt);
        /* if(index==0||index==1){
             alert('initScale'+this.initScale)
             this.initScale = this.zoom;
         }else{
            this.initScale = this.scaleX;
         }*/
         if(index!=0||index!=1){
             this.initScale = this.scaleX;
         }
        
    },
    pinch: function(num,evt) {
        alert(JSON.stringify(evt)) 
        //alert(evt.changedTouches[0].pageX);
        //alert(evt.pinchStartLen)
        //console.log(evt.pinchStartLen);
        //alert(evt);
       // alert(num)
       // alert(evt.scale);
        //alert(evt.zoom);
       // this.scaleX = this.scaleY = initScale * evt.zoom;
       // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
       
        //num==0代表调亮度 num==1代表调对比度 num==9代表画圆 num==10代表划线
         if(num==0||num==1){
          return;
        }
        if(num==9){
          
        }
       /* if(num==0){
            this.Tx=this.Ty=0;
            this.scaleX=this.scaleY=1;
            this.rotate=this.rotateX=this.rotateY=0;
            this.zoom=this.initScale * evt.zoom;
            this.filter='brightness('+ this.zoom+')';
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
           // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
            return;
        }else if(num==1){
            this.Tx=this.Ty=0;
            this.scaleX=this.scaleY=1;
            this.rotate=this.rotateX=this.rotateY=0;
            
           // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
           // evt.target.style.WebkitFilter='contrast('+initScale * evt.scale+')';
           //this.zoom+=initScale * evt.zoom;
            this.zoom=this.initScale * evt.zoom;
            this.filter='contrast('+this.zoom+')';
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
            return;
        }else if(num==9){
            //画圆
            this.Tx=this.Ty=0;
            this.scaleX=this.scaleY=1;
            this.rotate=this.rotateX=this.rotateY=0;
            this.zoom=this.initScale * evt.zoom;
        }
        else{

            this.scaleX= this.scaleY= this.initScale * (evt.zoom);
            this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
           // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
           // this.translate='scale('+this.scaleX+','+this.scaleY+')';
        }*/
        this.scaleX= this.scaleY= this.initScale * (evt.zoom);
        this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
     },
    pressMove: function(num, evt) {
       // console.log(evt)
       /* if(num==9){
            var c=document.getElementById("myCanvas");
            var ctx=c.getContext("2d");
            var mW = c.width = 300;
            var mH = c.height = 300;
            var lineWidth = 5;
            var r = mW / 2; //中间位置
            var cR = r - 4 * lineWidth; //圆半径
            ctx.beginPath();
            ctx.arc(r,r,cR,0,2*Math.PI);
            ctx.stroke();
            return;
        }*/
       // console.log(evt)
        if(num==0||num==1||num==9||num==10){
          return;
        }
        this.Tx+=evt.deltaX;
        this.Ty+=evt.deltaY;
        this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateX('+this.rotateX+'deg)'+'rotateY('+this.rotateY+'deg)';
       
       // this.translate='translate('+this.Tx+'px,'+this.Ty+'px) scale('+this.scaleX+','+this.scaleY+') rotate('+this.rotate+'deg) rotateY('+this.rotateY+'deg)';
     
       // this.translate='translate('+this.Tx+'px,'+this.Ty+'px)';
      }
  },
  components:{
    navHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot{position:fixed;left:0;width:100%;color:#fff;}
.tools_div{
    height:4.1rem;
    width:3.1rem;
    position:absolute;
    top:50%;
    left:50%;
    margin-left:-1.5rem;
    margin-top:-1.75rem;
    background: #252420;
    border:1px solid #808080;
    border-radius: 8px;
    z-index:1000;
}
.tools_div ul{
    width:100%;
    height:100%;
}
.tools_div ul li{
    float:left;
    width:.8rem;
    height:.8rem;
    margin:.1rem;
    border:2px solid #000;
    background:linear-gradient(#535353,#11100);
}

.tools_div ul li i{
    display:block;
    margin:.13rem;
    color:#fff;
    font-size:.5rem;
}

.content{position:fixed;top:1rem;bottom:0rem;width:100%;overflow:auto;background-color: #000;padding-top:1.5rem;}
/*.content ul{width:100%;}
.content ul li{
    width:100%;
}
.content ul li img{
    width:100%;
}*
.content .div_img{width:100%;margin-top:1.5rem;position:relative;height:auto;}*/
.content  img{
    width:100%;
    margin:0 auto;
    /*position:absolute;
    margin-top:1.5rem;*/
}

.content_title{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:2rem;
    color: #ededed;
    background: transparent;
    border-top:1px solid rgba(75, 75, 75, 0.65);
    z-index:1000;
}
.content_title p.totle_img{
    text-align: right;
    font-size:.28rem;
    height:1rem;
    line-height:1rem;
    padding:0 .2rem;
}
.content_title p.toolPic{
    height:1rem;
    line-height:1rem;
    padding:0 .2rem;
}
.toolPic ul{
    float:right;
    height:.8rem;
    width:.8rem;
    position:relative;
}
.toolPic ul li{
    position:absolute;
    top:0;
    left:0;
    height:.8rem;
    width:.8rem;
    border:2px solid #000;
    border-radius:5px;
    background:linear-gradient(#00E8E0,#163569);
}
.toolPic ul li i{
    display:block;
    margin:.1rem;
    color:#fff;
    font-size:.5rem;
}
.m_title{float:left;margin-left:.2rem;}
.foot{bottom:0; height:1rem;line-height:1rem;
    background: transparent;z-index:1000;}
.foot a{
    position:absolute;
    top:.2rem;
    height:.55rem;
    width:.55rem;
    background-color: #5e5e5e;
    background-image:url(../../static/image/return_40.png);
    background-repeat:no-repeat;
    border:4px solid #fff;
    border-radius: 50%;
}
.foot a.icon_left{
     left:.4rem;
     background-image:url(../../static/image/return_40.png);
     background-size: 70%;
     background-position:70%;
 }
.foot a.icon_right{
    right:.4rem;
    background-image:url(../../static/image/into_30.png);
    background-size: 75%;
    background-position:2%;
}

.progress{
    -webkit-appearance: none;
    width:4.8rem;
    height:.3rem;
    margin:.35rem 1.3rem;
    background:transparent;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
    height: .3rem;
    border-radius: .15rem; /*将轨道设为圆角的*/
    border:1px solid #fff;
   /* box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; /*轨道内置阴影效果*/
}
input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: .32rem;
    width: .3rem;
    margin-top: -.04rem; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff;
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}

</style>
