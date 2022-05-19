<template>
  <div class="Navigator">
  <a-row   style="height: 7vw">
<!--    左部分-->
    <a-col :span="8" style="height: 100%;text-align: left;vertical-align: bottom">
<!-- 返回图标默认隐藏-->
      <a-row style="height: 20%;">
        <a-button @click="this.$router.push('/ClassificationPage')" v-if="IsBack" size="small" style="margin-top:1vw;margin-left:1vw;">
          <ArrowLeftOutlined />
          返回
        </a-button>
      </a-row>
<!-- 网站logo-->
      <a-row style="height: 80%">
      <img src="../assets/weblogo.png" alt=""  style="height: 80%;display:block;" @click="this.$router.push('/')">
      </a-row>
    </a-col>
<!--右部分-->
    <a-col :span="16" style="height: 100%">
<!-- 用户图标-->
      <a-row style="height: 45%;">
        <a-col :span="20"></a-col>
        <a-col :span="4">
          <div style="margin-top: 1vw;margin-right: 3vw">
            <UserDrawer />
          </div>
        </a-col>
      </a-row>
<!--导航栏-->
      <a-row style="height: 50%;margin-top: 2.5%;font-size: 16px;" aligin="middle" justify="center">
        <a-col :span="12"></a-col>

        <a-col :span="2" :offset="1" >
          <b v-if="this.IsSearch"><SearchOutlined style="font-size: 20px;" @click="Change($event.target)" class="Search"/></b>
        </a-col>
        <a-divider v-if="this.IsSearch" type="vertical" style="height: 20px; background-color: black;width: 1px;"/>

        <a-col :span="3">
          <a class="ClickItem"><b><StockOutlined />历史时间轴</b></a>
        </a-col>
        <a-divider type="vertical" style="height: 20px; background-color: black;"/>

        <a-col :span="3">
          <a class="ClickItem" @click="this.$router.push('/DataViewPage')"><b><PieChartOutlined/>可视化分析</b></a>
        </a-col>

      </a-row>
    </a-col>
  </a-row>
  <a-divider style="padding: 0;margin-top:1vw;margin-bottom: 0;"/>
<!--  默认隐藏的搜素框-->
  <a-row id="SearchBar" v-if="isVisible" style="margin-bottom: 1vw;margin-top: 1vw;">
    <a-col :span="16" :offset="4">
      <!-- v-model:value="value" -->
      <a-input-search
          placeholder="输入搜索条件"
          enter-button="搜素"
          size="large"
          @search="Search"
      />
    </a-col>
  </a-row>
  </div>
</template>

<script setup>
import { ArrowLeftOutlined,UserOutlined, DownOutlined,LikeOutlined,StarOutlined,PieChartOutlined,StockOutlined,SearchOutlined} from "@ant-design/icons-vue";
import UserDrawer from "@/components/UserDrawer";
</script>

<script>
import request from '../utils/request';
import { message } from 'ant-design-vue';

export default {
  name: "Navigator",
  data(){
    return{
      isVisible:false
    }
  },
  props: {
    IsSearch:{
      type: Boolean,//可以注明设置类型，
      default:false,//默认值,
    },
    IsBack:{
      type: Boolean,//可以注明设置类型，
      default:false,//默认值,
    },
  },
  methods: {
    Change: function (icon) {
      //如果当前颜色为黑色将其变为蓝色并显示搜索框
      if(icon.style.color==='black'||icon.style.color===""){
        icon.style.color='dodgerblue';
        this.isVisible=true;
      }else{//为蓝色收起搜索框
        icon.style.color='black';
        this.isVisible=false;
      }
    },
    Search:function(SearchValue){
      let  SearchParam={
            "isFuzzy":"true",
            "page":"1",
            "size":12,
            "keyword":SearchValue
          }

      if(SearchValue==''||SearchValue==null){
        message.info('请输入搜素条件！',1)
      }else{
        //字符串化参数
        let param="?"
        for(let key in SearchParam){
          param+=key+"="+SearchParam[key]+'&'
        }
        //发送请求
        request.get('/basic/page'+param).then(res=>{
          //封装返回数据
          SearchParam['records']= res['data']['records']
          SearchParam['total']=res['data']['total']
          SearchParam['current']=res['data']['current']
          this.$store.commit('GetRelicsList',SearchParam)
          this.$router.push({path:'/ClassificationPage'})
        })
      }
      
    }

  }
}
</script>

<style scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
.ClickItem{
  color: black;
}
.ClickItem :hover{
  color: dodgerblue;
}
/* .Navigator{
  background-color: black;
  opacity: 0.8;
} */
</style>
