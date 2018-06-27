<template>
  <div>
    <!--头部-->
    <nav-header :index='firstindex' :sessionId="sessionId">
       <span slot="headTitle">报告详情</span>
    </nav-header>
    <div class="content">
       <ul v-finger:pinch="pinch.bind(this)" :style="{transform:translate}">
           <li>
               <img src="../../static/image/000077.png" alt=""/>
           </li>
           <li>
               <img src="../../static/image/000077.png" alt=""/>
           </li>
           <li>
               <img src="../../static/image/000077.png" alt=""/>
           </li>
       </ul>
   </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import navHeader from "@/components/Common/header"
import navFooter from "@/components/Common/footer"
//var medicalData= JSON.parse(window.localStorage.getItem("medicalData"));
//var sessionId=window.localStorage.getItem("sessionId");
//var firstindex=window.localStorage.getItem("firstindex");
export default {
  data () {
    return {
       uid:"",
       medicalData:[],
       sessionId:"",
       firstindex:0,
       translate:"scale(1,1)",
       scaleX:1,//手指捏合放大缩小
       scaleY:1
    }
  },
  created(){
     //this.getMedical();
     //this.sessionId=sessionId;
     this.sessionId=window.localStorage.getItem("sessionId");
     //this.uid=medicalData.studyInstanceUid;
     //this.firstindex= firstindex;
     this.translate="scale(1,1)";
     //console.log(this.medicalData)
  },
  methods:{
    pinch: function(evt) { 
        this.scaleX = this.scaleY = initScale * evt.scale;
        this.translate="scale("+this.scaleX+","+this.scaleY+")";
     },
  },
  components:{
    navHeader,
    navFooter
  },
 filters: {
        url: function(v,api,sessionId,studyInstanceUid,seriesUid,InstanceUid) {
            return v+api+"/reception/picture/createFlow?sessionId="+sessionId+"&studyUid="+studyInstanceUid+"&seriesUid="+seriesUid+"&instanceUid="+InstanceUid;
        }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.content{position:fixed;top:1rem;bottom:.8rem;width:100%;overflow:auto;background-color: #e5e5e5;}
.content ul{width:100%;position:absolute}
.content ul li{
    width:100%;
    margin-bottom:.1rem;
}
.content ul li img{
    width:100%;
}
</style>
