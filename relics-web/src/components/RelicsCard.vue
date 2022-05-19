<template>
  <a-card hoverable id="card"  :size="SizeList[height]" >
    <template #cover>
      <img
          alt="example"
          :src="RelicsInf.imageUrl"
          id="RelicImg"
          @click="ToRelicPage(RelicsInf)"
      />
    </template>
 
    <template #actions>
      <span @click="Like" ref="like"><LikeOutlined />{{' '+this.RelicsInf.likeNum}}</span>
      
      <span @click="Collect" ref="store"><StarOutlined />收藏</span>
    </template>
    <a-card-meta :title="RelicsInf.name" @click="ToRelicPage(RelicsInf)">
    </a-card-meta>
    <br>
    <div style="color:grey">
    {{RelicsInf.classification}}<br>
    {{RelicsInf.museum}}<br>
    {{RelicsInf.discoverTime}}
    </div>
  </a-card>
</template>
<script setup>
import {LikeOutlined,StarOutlined } from '@ant-design/icons-vue';
</script>

<script>
import request from '../utils/request';
import { message } from 'ant-design-vue';

export default {
  name: "RelicsCard",
  props:{
    RelicsInf:{

    }
  },
  data(){
    return{
      height:Math.floor(Math.random()*3),
      SizeList:['small','default','large'],
      IsLike:true,
      IsCollect:true
    }
  },
  computed:{
    
  },
  mounted(){
   
  },
  methods: {
    //点赞
    Like:function(){
      //检查是否登录
      if(!this.$store.state.User.isLogin){
        message.warning('请先登录！',1)
      }else{
        //请求点赞接口
        request.post('/basic/handleLike',{
          "isAdd":this.IsLike,
          "targetId": this.RelicsInf.id
        }).then(res=>{  
          if(res['success']){
            this.RelicsInf.likeNum=res['data'].likeNum
            let msg=this.IsLike?'点赞成功！':'取消点赞成功！';
            message.info(msg,1)
          }else{
            message.warning(res['msg'],1)
          }
          this.IsLike=!this.IsLike
          if(!this.IsLike){
            this.$refs.like.style.color='dodgerblue'
          }else{
            this.$refs.like.style.color='grey'
          }
        })
      }
    },
    //收藏
    Collect:function(){
      //检查是否登录
      if(!this.$store.state.User.isLogin){
        message.warning('请先登录！',1)
      }else{
        //请求收藏接口
        request.post('/basic/handleCollect',{
          "isAdd": this.IsCollect,
          "targetId": this.RelicsInf.id
        }).then(res=>{    
          if(res['success']){
            let msg=this.IsCollect?'收藏成功！':'取消收藏！';
            message.info(msg,1)
          }else{
            message.warning(res['msg'],1)
          }
          this.IsCollect=!this.IsCollect
          if(!this.IsCollect){
            this.$refs.store.style.color='dodgerblue'
          }else{
            this.$refs.store.style.color='grey'
          }
          
        })
      }
    },
    //前往文物详情页
    ToRelicPage:function(RelicsInf){
    
      //更新文物详情
      this.$store.commit('GetRelic',RelicsInf)
      //前往文物页面
      this.$router.push({name:'RDPage'});
    }
  },
}
</script>

<style scoped>

</style>