<template>
    <header class="head">
       <a class="back" v-show="isShow" @click="goback"></a>
       <slot name="headTitle"></slot>
       <div class="tools">
           <slot name="tools"></slot>
        <!-- <a v-show="!ishide" @click="showTool()"></a>-->
       </div>
    </header>
</template>
<script>
export default {
   data () {
    return {
      isShow:true
    }
  },
  props:['index','sessionId'],
  mounted(){
    //console.log(this.sessionId)
    this.isShow=true;
    if(this.$route.path=='/'||this.$route.path=='/medicalLine'){
          this.isShow=false;
    }
   // console.log(this.index)
  },
   methods:{
    //返回
    goback() {
       this.$router.go(-1);
       
      /* if(this.$route.path=="/medicalReport"||this.$route.path=="/medicalRecord"||this.$route.path=="/medicalImg"){
         //console.log(1)
         //alert(this.sessionId);
        this.$router.push({
             name:"medicalIndex",
             params:{
               index:this.index,
               sessionId:this.sessionId
             }
         })
       }
       else if(this.$route.path.indexOf('/medicalIndex')>-1){
           this.$router.push({
             name:"medicalLine",
             params:{
              // index:this.index
             }
         })
       }else{
          this.$router.go(-1);
       }*/
    }
  },
  watch:{
      '$route':function(newValue,oldValue){
        this.isShow=true;
        if(newValue.path=='/'||newValue.path=='/medicalLine'){
          this.isShow=false;
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  color:#fff;
  height:1rem;
  line-height:1rem;
  text-align:center; 
  font-size:.34rem;
  background:linear-gradient(#535353,#11100d)
   /*linear-gradient(#535353,#11100);*/
  }

.back{height: 1rem;width: 1rem;position: absolute;top: 0;left: 0;
    background: url("../../../static/image/return_40.png") no-repeat center;
    background-size: 0.4rem 0.4rem;}
.tools{height: 1rem;width: 1rem;position:absolute;top:0;right:0;}
.tools a{display:block;height:100%;width: 100%;
    background: url("../../../static/image/setIcon.png") no-repeat center;
    background-size: 0.4rem 0.4rem;}
</style>
