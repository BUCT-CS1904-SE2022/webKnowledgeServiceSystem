<template>
  <a-list
      item-layout="horizontal"
      :data-source=" CommentList"
      style="text-align: left"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <span  @click="Like($event.target,item.commentId)" :ref="item.commentId"><LikeOutlined key="like" /></span>
        </template>
        
          <a-list-item-meta
              :description="item.content"
          >
            <template #title>
              {{ item.publishUserName}}
            </template>
            <template #avatar >
              <a-avatar :size="48">
                <template #icon><UserOutlined/></template>
              </a-avatar>
            </template>
          </a-list-item-meta>
     
      </a-list-item>
    </template>
  </a-list>
  <br>
  <!-- v-model:value="value2" -->
  <a-textarea  v-model:value="Comment" :rows="6"  show-count :maxlength="100" placeholder="请发表评论" />
  <br>
  <a-button type="primary" @click="AddComment">发表评论</a-button>

</template>

<script >
import {LikeOutlined,StarOutlined,UserOutlined} from '@ant-design/icons-vue';
import request from '../utils/request';
import { message } from 'ant-design-vue'

export default {
  name:'Comment',
  data(){
    return {
      //评论列表
      CommentList:[],
      //评论
      Comment:"",
      //是否要点赞
      IsLike:true
    }
  },
  mounted() {
    //当有文物详情页时加载评论
    if(this.$store.state.Relic['id']!=-1){
     
      request.get('/comment/page?'+'culturalRelicId='+this.$store.state.Relic['id']+"&page=1&size=10").then(res=>{
        if(res['success']){
          this.CommentList=res['data']
          console.log(this.CommentList)
        }
        console.log(res)
      })
    }
    
  },
  components:{
    LikeOutlined,
    StarOutlined,
    UserOutlined
  },
  methods:{
    ChangeColor:function (icon){
      if(icon.style.color==="dodgerblue") {
        icon.style.color="grey";
      }else{
        icon.style.color='dodgerblue';
      }
      icon.style.opacity=0.85
    },
    //发表评论
    AddComment:function(){
      //判断是否登录
      if(!this.$store.state.User.isLogin){
        message.warn('请先登录!',1)
      }else
      //判断评论是否为空
      if(this.Comment==null||this.Comment==''){
        message.warn('请输入评论!',1)
      }else{
        let params={
          "content": this.Comment,
          "culturalRelicId": this.$store.state.Relic['id'],
        }

        request.post('/comment/publish',params).then(res=>{
          if(res['success']){
            console.log(res)
            message.success('评论发表成功',1)
            //评论成功更新评论列表
            request.get('/comment/page?'+'culturalRelicId='+this.$store.state.Relic['id']).then(res=>{
              if(res['success']){
                this.CommentList=res['data']
              }
            })
          }else{
            message.error(res['msg'],1)
          }
        })
      }
    },
    //点赞
    Like:function(target,id){
      //检查是否登录
      if(!this.$store.state.User.isLogin){
        message.warning('请先登录！',1)
      }else{
        //请求点赞接口
        request.post('/comment/handleLike',{
          "isAdd":this.IsLike,
          "targetId": id
        }).then(res=>{  
          if(res['success']){
            let msg=this.IsLike?'点赞成功！':'取消点赞成功！';
            message.info(msg,1)
          }else{
            message.warning(res['msg'],1)
          }
          this.IsLike=!this.IsLike
          if(!this.IsLike){
            target.style.color='dodgerblue'
          }else{
            target.style.color='grey'
          }
        })
      }
    },
  }
};
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
