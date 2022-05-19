<template>
  <div>
  <a-button @click="Judge" size="large">
     <UserOutlined />
    {{UserName}}
  </a-button>
  <a-drawer width="540" placement="right" :closable="true" :visible="visible" @close="onClose">
    <a-row >
      <a-col><a-typography-title :level="2">{{User.userName}}</a-typography-title></a-col> 
      <a-col :offset="15"><a-button @click="LoginOut">退出登录</a-button></a-col>
    </a-row>

    <a-divider/>

    <a-row style="text-align: left ">
      <a-col :span="12" style="font-size: 18px;">
        <b >姓名:</b>&nbsp;
        <a-typography-text code>{{User.userName}}</a-typography-text>
      </a-col>
      <a-col :span="12" style="font-size: 18px;">
        <b >电话:</b>&nbsp;
        <a-typography-text code>{{User.phone}}</a-typography-text>
      </a-col>
    </a-row>
    <br>
    <a-row >
      <a-col :span="24" style="font-size: 18px;">
        <b >个性签名:</b>&nbsp;
        <a-typography-text code>{{User.signature}}</a-typography-text>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :span="12" style="font-size: 18px;">
        <b >Email:</b>&nbsp;
        <a-typography-text code>{{User.email}}</a-typography-text>
      </a-col>
    </a-row>
    <a-divider/>
    <a-typography-title :level="3">点赞文物</a-typography-title>
    <a-row >
      <Scrollbar :RelicsList="LikeList"/>
      <span v-if="LikeList.length==0"><br>无点赞文物</span>
    </a-row>
    <a-divider/>
    <a-typography-title :level="3">收藏文物</a-typography-title>
    <a-row >
      <Scrollbar :RelicsList="CollectList" />

      <span v-if="CollectList.length==0"><br>无收藏文物</span>
    </a-row>
    <a-divider/>
    <a-typography-title :level="3">浏览记录</a-typography-title>
    <a-row >
      <Scrollbar :RelicsList="BrowseList"/>
      <span v-if="BrowseList.length==0"><br>无浏览文物</span>
    </a-row>
  </a-drawer>
  </div>
</template>
<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
import Scrollbar from "@/components/Scrollbar";
</script>

<script >
import { message } from 'ant-design-vue';
import request from '../utils/request';

export default {
  setup() {
    const pStyle = {
      fontSize: '16px',
      color: 'rgba(0,0,0,0.85)',
      lineHeight: '24px',
      display: 'block',
      marginBottom: '16px',
    };
    const pStyle2 = {
      marginBottom: '24px',
    };
    return {
      pStyle,
      pStyle2,
    };
  },
  data(){
    return{
      visible:false,
      User:{
        isLogin:false,
        loginId: "-1",
        userName: 'Unauthorized',
        password:'',
        repassword:'',
        phone:'',
        email: '',
        signature:'',
        browseIds: [],
        collectIds: [],
        likeIds: [],
      },
      CollectList:[],
      LikeList:[],
      BrowseList:[]
    }
  },
  mounted() {
    

  },
  computed:{
    UserName(){
      return this.$store.state.User.isLogin?this.$store.state.User.userName:"请登录";
    },
    // //收藏列表
    // (){
    //   console.log(this.$store.state.User['collectIds'])
    //   //未登录返回空列表
    //   if(!this.$store.state.User.isLogin){
    //     return []
    //   }else if(this.User['collectIds'].length!=0){
       
    //   }
    // },
    //点赞列表
    // LikeList(){
    //   //未登录返回空列表
    //   if(!this.$store.state.User.isLogin){
    //     return []
    //   }else{
        
    //   }
    // },
    // //浏览记录
    // BrowseList(){
    //   console.log(this.User['browseIds'])
    //   //未登录返回空列表
    //   if(!this.$store.state.User.isLogin){
    //     return []
    //   }else{
        
    //   }
    // }
  },
  methods:{
    onClose:function(){
      this.visible=false;
    },
    showDrawer:function (){
      this.visible=true;
    },
    Judge(){

      if(this.$store.state.User.isLogin){
        //更新信息
        this.GetInf()
        //登录后打开侧边栏
        this.showDrawer();


      }else{
        //否则跳转到登录页面
        this.$router.push('/LRPage')
      }
    },
    GetInf:function(){
      //获取用户信息
      request.get('/user/info?'+"userId="+this.$store.state.User.loginId).then(res=>{
        if(res['success']){
          this.$store.commit('GetUerInfo',res['data'])
          this.User=this.$store.state.User
          let collectIds=res['data']['collectIds']
          //请求接口获取收藏数据
          if(collectIds.length!=0)
          request.post('/basic/listByIds',collectIds).then(res=>{
            if(res['success']){
              this.CollectList=res['data']
            }else{
              message.error(res['msg'],1)
            }
          })
          //请求接口获取点赞数据
          let likeIds=res['data']['likeIds']
          if(likeIds.length!=0)
          request.post('/basic/listByIds',likeIds).then(res=>{
            if(res['success']){
              this.LikeList=res['data']
            }else{
              message.error(res['msg'],1)
            }
          })
          //请求接口获取浏览数据
          let browseIds=res['data']['browseIds']
          if(browseIds.length!=0)
          request.post('/basic/listByIds',browseIds).then(res=>{
            if(res['success']){
              this.BrowseList=res['data']
            }else{
              message.error(res['msg'],1)
            }
          })
        }else{
          message.error(res['msg'],1)
        }
      })
    },
    LoginOut(){
      //请求登出
      request.get('/user/logout').then(res=>{
        if(res['success']){
          this.$store.commit('LoginOut')
          this.onClose()
          message.info('登出成功！',1)
        }else{
          message.info('登出失败！',1)
        }
    
      })
      
    }
  }
};
</script>

