<template>
  <div>
    <!--头部-->
    <nav-header :index='firstindex' :sessionId="sessionId">
       <span slot="headTitle">病案详情</span>
    </nav-header>
    <div class="content" v-infinite-scroll="getDatas" infinite-scroll-disabled="busy" infinite-scroll-distance="{num}">
       <ul v-finger:pinch="pinch.bind(this)" :style="{transform:translate}">
           <li v-for="item in list">
               <img v-lazy="item.url" alt=""/>
           </li>
           <!-- 加载更多，没有数据组件 -->
		<loading v-show="isShowLoadingTips"></loading>
		<none v-show="isShowLoadedTips"></none>
       </ul>
       
   </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import navHeader from "@/components/Common/header"
import navFooter from "@/components/Common/footer"
import Loading from "@/components/Common/loading"
import None  from "@/components/Common/none"
import { InfiniteScroll } from 'mint-ui';
import Vue from 'vue';
Vue.use(InfiniteScroll);
//import InfiniteLoading from 'vue-infinite-loading';
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
       scaleY:1,
       list:[],
       busy:false,
       num:2,
       isShowLoadingTips: false,
	   isShowLoadedTips: false
    }
  },
  created(){
     //this.sessionId=sessionId;
     this.sessionId=window.localStorage.getItem("sessionId");
     //this.uid=medicalData.studyInstanceUid;
    // this.firstindex= firstindex;
     this.translate="scale(1,1)";
  },
  methods:{
    pinch: function(evt) { 
        this.scaleX = this.scaleY = initScale * evt.scale;
        this.translate="scale("+this.scaleX+","+this.scaleY+")";
     },
     getDatas(){
         this.busy=true;
         this.isShowLoadingTips=true;
         this.axios.get('/api/medicalData').then((response)=>{
             console.log(response)
			this.isShowLoadingTips=false;
			let result = response.data.data.data.slice(this.num-2,this.num);
			if(result.length !== 0){
				this.list = this.list.concat(result);
				this.busy = false;
				this.num+=2;
			}else{
				this.isShowLoadedTips=true;
			}
		})
         //for (let i = 1; i <= 10; i++) {
         // this.list.push({"url":"../../static/image/000077.png"});
        // }
     }
  },
  components:{
    navHeader,
    navFooter,
    Loading,
	None
   // infiniteLoading
  },
 filters: {
        url: function(v,api,sessionId,studyInstanceUid,seriesUid,InstanceUid) {
           // return v+api+"/reception/picture/createFlow?sessionId="+sessionId+"&studyUid="+studyInstanceUid+"&seriesUid="+seriesUid+"&instanceUid="+InstanceUid;
        }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{position:fixed;top:1rem;bottom:.8rem;width:100%;overflow:auto;background-color: #e5e5e5;}
.content ul{width:100%;position:absolute;z-index:10}
.content ul li{
    width:100%;
    margin-bottom:.1rem;
}
.content ul li img{
    width:100%;
}
</style>
