<template>
<!--  导航栏-->
  <Navigator :IsSearch="false" :IsBack="true"/>
<!--  图片展示-->
  <div style="width: 100vw;height: 35vw;background-color: rgb(68, 68, 68)">
    <a-row style="text-align: center;height: 80%" >
      <a-col :span="12" :offset="6">
        <a-image
            style=";margin-top: 2vw;height: 30vw"
            :src="RelicsInf.imageUrl"
        />
      </a-col>
    </a-row>
    <a-row style="text-align: center;height: 20%;color: white;">
      <a-col :span="1" :offset="21">
        <a-row style="height: 50%"></a-row>
        <div ref="like" @click="Like" style="font-size:16px" ><LikeOutlined key="like" />{{'    '+RelicsInf.likeNum}}</div >
      </a-col>
      <a-col :span="2" >
        <a-row style="height: 50%"></a-row>
        <div ref="store" @click="Collect"  style="font-size:16px"><StarOutlined key="store"/>{{'    收藏'}}</div>
      </a-col>
    </a-row>
  </div>
<!--  文物名称-->
  <div style="width: 100vw;background-color: rgb(248, 248, 248)">
    <br>
    <a-typography-title :level="1">{{RelicsInf.name}}</a-typography-title>
    <br>
  </div>
<!--  详情-->
  <div style="width: 70vw;margin:auto;">
    <br>
    <a-row >
      <a-col :span="10">
        <a-row >
       <a-typography-title :level="5">发现时间</a-typography-title>
        </a-row>
        <a-row > <a-typography-paragraph><pre>{{RelicsInf.discoverTime}}</pre></a-typography-paragraph></a-row>
    
        <a-row >
          <a-typography-title :level="5">所在博物馆</a-typography-title>
        </a-row>
        <a-row> <a-typography-paragraph><pre>{{RelicsInf.museum}}</pre></a-typography-paragraph></a-row>

        <a-row >
          <a-typography-title :level="5">尺寸</a-typography-title>
        </a-row>
        <a-row > <a-typography-paragraph><pre>{{RelicsInf.dimension}}</pre></a-typography-paragraph></a-row>

        <a-row >
          <a-typography-title :level="5">文物材质</a-typography-title>
        </a-row>
        <a-row > <a-typography-paragraph><pre>{{RelicsInf.medium}}</pre></a-typography-paragraph></a-row>

        <a-row >
          <a-typography-title :level="5">文物类别</a-typography-title>
        </a-row>
        <a-row > <a-typography-paragraph><pre>{{RelicsInf.customClass}}</pre></a-typography-paragraph></a-row>

      </a-col>
<!--      <a-col :span="1"></a-col>-->
      <a-col :span="13" :offset="1">
        <a-row >
          <a-typography-title :level="5">文物作者</a-typography-title>
        </a-row>

        <a-row > <a-typography-paragraph><pre>{{RelicsInf.artist}}</pre></a-typography-paragraph></a-row>

        <a-row >
          <a-typography-title :level="5">在展情况</a-typography-title>
        </a-row>
        <a-row > <a-typography-paragraph><pre>{{RelicsInf.status?'在展':'未展出'}}</pre></a-typography-paragraph></a-row>

        <a-row ><a-typography-title :level="5">文物详情</a-typography-title></a-row>
        <a-row style="height: 60%">
          <a-typography-paragraph>
            <blockquote style="text-align: left">
              The information presented on this website may be revised and updated at any time as ongoing research progresses or as otherwise warranted. Pending any such revisions and updates, information on this site may be incomplete or inaccurate or may contain typographical errors. Neither the Smithsonian nor its regents, officers, employees, or agents make any representations about the accuracy, reliability, completeness, or timeliness of the information on the site. Use this site and the information provided on it subject to your own judgment.
            </blockquote>

          </a-typography-paragraph>
        </a-row>
      </a-col>
    </a-row>
  </div>

  <a-divider/>

<!--  评论-->
  <div style="width: 70vw;margin:auto;height:auto ">
    <a-typography-title :level="1">评论</a-typography-title>
    <Comment></Comment>
  </div>
<!--  页脚-->
  <br>
  <br>
  <Footer/>
</template>

<script setup>
import Navigator from "@/components/Navigator";
import Footer from "../components/Footer";
import {LikeOutlined,StarOutlined } from '@ant-design/icons-vue';
import Comment from "../components/Comment"
</script>

<script>
import request from '../utils/request';
import { message } from 'ant-design-vue'

export default {
  name: "RelicsDetailPage",

  mounted() {
    //获取详情文物
    this.RelicsInf=this.$store.state.Relic
    //如果没有指定详情文物则跳转到首页
    if(this.RelicsInf.id==-1){
      this.$router.push('/')
    }else{
      //如果用户处于登录状态更新浏览记录
      if(this.$store.state.User.isLogin){
        request.post('/browse/save/'+this.RelicsInf.id,this.RelicsInf.id).then(res=>{
          console.log(res)
        })
      }
    }
   

  },
  data(){
    return {
      //文物信息
      RelicsInf:{

      },
      //是否点赞
      IsLike:true,
      //是否收藏
      IsCollect:true,
      data:[
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ]
    }
  },
  methods:{
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
            this.$refs.like.style.color='white'
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
            this.$refs.store.style.color='white'
          }
          
        })
      }
    },
  }
}
</script>

<style scoped>

</style>