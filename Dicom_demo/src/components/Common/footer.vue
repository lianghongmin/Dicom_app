<template>
     <footer class="foot">
       <ul class="clearfix">
           <li><router-link :to="{name:'medicalReport'}">查看报告单</router-link></li>
           <li><router-link :to="{name:'medicalRecord'}">查看病案</router-link></li>
       </ul>
     </footer> 
</template>
<script>
export default {
   data () {
    return {
      
    }
  },
  props:['Uid'],

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foot{position:fixed;left:0;width:100%;color:#fff;}
.foot{bottom:0; height:.8rem;line-height:.8rem;background: linear-gradient(#11100d,#535353);}

.foot ul{width:100%;height:100%;}

.foot ul li{float:left;width:50%;text-align: center}
.foot ul li a{color:#fff;font-size:.3rem;}
.foot ul li:first-of-type{background: #ff5b0a;}

.foot ul li:last-of-type{background: #242aff;}
</style>
