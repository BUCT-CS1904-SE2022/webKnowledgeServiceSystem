<template>
<!--  导航栏-->
  <Navigator :IsSearch="false"/>
  <br>
<!--搜索框-->
  <div style="margin: 0 auto;width: 85vw">
    <a-row>
      <!-- 图片 -->
      <a-col :span="3"><img src="../assets/logo.png" alt="" style="width:100%"></a-col>

      <a-col :span="20"  :offset='1'>
        <!-- 搜索 -->
        <a-row>
        <a-col style="text-align:left;font-size:3vw;font-weight:bolder;"><b>文物搜索</b></a-col>
        </a-row>

        <!-- 搜索框 -->
        <a-row style="height: 30%">
          
          <a-input-search
              v-model:value="SearchContent"
              placeholder="请输入搜素条件"
              enter-button="搜索"
              size="large"
              @search="Search"
          />
        </a-row>

        <!-- 搜索排序 -->
        <a-row >
          
          <a-col :span="12">
            <a-select
                ref="select"
                placeholder="排序字段"
                style="width: 100%"
                @change="ChangeSortKeyword"
            >
              <a-select-option value="like_num">点赞数</a-select-option>
              <a-select-option value="discover_time">出土时间</a-select-option>
              
            </a-select>
          </a-col>

          <a-col :span="12">
            <a-select
                ref="select"
                placeholder="排序方式"
                style="width: 100%"
                @change="ChangeSortWay"
            >
              <a-select-option value="asc">升序</a-select-option>
              <a-select-option value="desc">降序</a-select-option>
            </a-select>

          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>

  <br>
  <br>
<!--搜索条件-->
  <div style="margin: 0 auto;width: 85vw">
    <!--  搜索条件选择-->
    <!-- v-model:activeKey="activeKey" -->
    <a-tabs  @change="ChangeTab" style="text-align: left;"  type="card" centered size="large" >
      <a-tab-pane key="customClass" tab="文物类别"  >
        <a-tag class="tab-item"  @click="log(name)" color="blue" v-for="name in customClass" >{{name}}</a-tag>
      </a-tab-pane>
      
      <a-tab-pane key="medium" tab="文物材质"  >
        <a-tag class="tab-item"   color="blue" @click="log(name)" v-for="name in medium">{{name}}</a-tag>
      </a-tab-pane>

      <a-tab-pane key="artist" tab="文物作者">
        <a-tag  class="tab-item"   color="blue" @click="log(name)" v-for="name in artist">{{name}}</a-tag>
       
      </a-tab-pane>
      
      <a-tab-pane key="museum" tab="所属博物馆">
        <a-tag  class="tab-item"   color="blue" @click="log(name)" v-for="name in museum">{{name}}</a-tag>
      </a-tab-pane>

      <a-tab-pane key="status" tab="文物在展情况">
        <a-tag  class="tab-item"   color="blue" @click="log(1)">在展</a-tag>
        <a-tag  class="tab-item"   color="blue" @click="log(0)">未展出</a-tag>
      </a-tab-pane>
      <template #leftExtra>
        <a-button  class="button" @click="IsVisible=true">
          <AppstoreOutlined selected style="font-size: 1vw;"/>
        </a-button>
        <a-button class="button" @click="IsVisible=false">
          <UnorderedListOutlined style="font-size: 1vw;"/>
        </a-button>
      </template>
    </a-tabs>

    <!--  搜索条件展示-->
    <a-divider/>
    <a-row>
      <a-col>
      <a-row class="tab-item" ><a-col :offset="0" style="font-size:1.2vw"><b>筛选条件：</b></a-col></a-row>
  
      <a-row >
        <a-col :span="24"  style="text-align: left">
          <a-tag class="tab-item"  @close="Delete(name)"  closable color="#2db7f5" v-for="name in SelectList" style="margin-top:10px">{{name}}</a-tag>   
        </a-col>
      </a-row>
      </a-col>
    </a-row>
    <a-divider/>
    <br>
    
  </div>

  <div style="margin: 0 auto;width: 85vw">
    <!-- 列表展示-->
    <RelicsList v-if="IsVisible" />
    <!-- 表格展示-->
    <RelicTable v-if="!IsVisible"/>
    <!-- 分页 -->
  <a-pagination :hideOnSinglePage="true"  ref='pagination' :current="$store.state.RelicsList.current"  :total="$store.state.RelicsList.total" :defaultPageSize="12" @change='Change' />
  </div>
  
  <br>
  <br>
<!--  页脚-->
  <Footer/>
</template>

<script setup>
import {UnorderedListOutlined,AppstoreOutlined} from "@ant-design/icons-vue";
import Navigator from "../components/Navigator";
import RelicTable from "../components/RelicTable";
import RelicsList from "@/components/RelicsList";
import Footer from "../components/Footer";
</script>

<script>
import request from '../utils/request';
import { message } from 'ant-design-vue';
import qs from 'qs'

export default {
  name: "ClassificationPage",
  data(){
    return{
      //搜索条件
      SearchParam:{
        "page":"1",
        "size":"12",
        "keyword":""
      },
      //搜索框内容
      SearchContent:this.$store.state.RelicsList.keyword,
      //是否模糊搜索
      IsFuzzy:false,
      //是否可见
      IsVisible:true,
      //目前选择的属性列
      SelectItem:"customClass",
      artist:['Chinese','Odilon Redon','Charles Émile Jacque','Han-Chinese'], //作者
      customClass:['Container','Sculpture','ArtWare','Costume','Numismatics','Paintings','Calligraphy','Others'], //文物自定义属性
      medium:['Bronze','Copper','Jade','Ink rubbing','Porcelain'], //文物材质
      museum:['Yale University Art Gallery','The Art Institute of Chicago','Penn Museum','Allen Memorial Art Museum','Saint Louis Art Museum'], //所属博物馆
      status:[0,1]  //在展情况
    }
  },
  
  computed:{
    SelectList(){
      let SelectList=[]
      let list=this.$store.state.SearchParam
      for(let item in list){
        if(item=='sort'||item=='isFuzzy'||item=='page'||item=='size'||item=='sortKeyword'||item=='sortWay')continue
        for(let i=0;i<list[item].length;i++){
          if(list[item][i]==null)continue
          if(item=='status'){
            let msg=list[item][i]==1?'在展':'未展出';
            SelectList.push(msg)
          }else{
            SelectList.push(list[item][i])
          }
        }
      }
      return SelectList
    },
    
  },
  methods: {
    //切换表格显示或列表显示
    ChangeVisible: function () {
      //如果当前颜色为黑色将其变为蓝色并显示搜索框
      this.IsVisible=!this.IsVisible
    },
    //改变标签页时切换对应的选择条件
    ChangeTab:function(key){
      this.SelectItem=key
    },
    //添加字段
    log:function(name){
      //检查是否已包含该字段，否则将字段加入属性列表中
      let list=this.$store.state.SearchParam[this.SelectItem];
      let flag=0
      for(let i=0; i<list.length;i++){
        if(list[i]==name){
          flag=1
          break
        }  
      }
      if(flag==0){
        this.$store.state.SearchParam[this.SelectItem].push(name)
      }
    },
    //删除已选字段
    Delete:function(key){
      if(key=='在展')key=1
      if(key=='未展出')key=0
      
      let list=this.$store.state.SearchParam
      for(let item in list){
        if(item=='sort'||item=='isFuzzy'||item=='page'||item=='size'||item=='sortKeyword'||item=='sortWay')continue
        for(let i=0;i<list[item].length;i++){
          if(list[item][i]==key){
            delete list[item][i]
          }
        }
      }
    },
    //切换页面
    Change:function(page){
      let num=this.SelectList.length
      //如果此时为模糊搜索
      if(num==0){
        this.FuzzySearch(this.$store.state.RelicsList.keyword,page)
      }
      //否则分类搜素
      else{
        this.ClassifySearch(page)
      }
      
    },
    //改变排序字段
    ChangeSortKeyword:function(value){
      this.$store.state.SearchParam['sortKeyword']=value
    },
    //改变升降序
    ChangeSortWay:function(value){
      this.$store.state.SearchParam['sortWay']=value
    },
    //搜索按钮点击事件
    Search:function(keyword){
      let num=this.SelectList.length
      //没有关键字也没有关键词 要求用户输入内容
      if((keyword==null||keyword=='') && num==0){
        message.warn('请输入搜素内容',1)
      }
      //有关键字时模糊搜索
      else if(keyword){
        this.FuzzySearch(keyword,1)
      }
      //否则不模糊搜索
      else{
        this.ClassifySearch(1)
      }
    },
    //模糊搜索
    FuzzySearch:function(SearchValue,page){
      let  SearchParam={
            "isFuzzy":"true",
            "page":page,
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
        })
      }
    },
    //分类搜素
    ClassifySearch:function(page){
      let shparam=this.$store.state.SearchParam
      let params={
        "artist":"", //作者
        "customClass":"", //文物自定义属性
        "medium":"", //文物材质
        "museum":"", //所属博物馆   
      }

      for(let word in params){
        for(let i=0;i<shparam[word].length;i++){
          if(shparam[word][i]==null) continue
          params[word]+=shparam[word][i]
          if(i!=shparam[word].length-1){
            params[word]+=','
          }
        }
      }
      params["isFuzzy"]=false
      params["page"]=page
      params["size"]=12
      params["status"]=1
      params["keyword"]=""

      let sortKeyword=shparam['sortKeyword']
      if(sortKeyword=='')sortKeyword='like_num'
      let sortWay=shparam['sortWay']
      if(sortWay=='')sortWay='desc'
      params['sort']=sortKeyword+':'+sortWay

      let strParams=qs.stringify(params)
      // console.log(params)
      request.get('/basic/page?'+strParams).then(res=>{
        //封装返回数据
        params['records']= res['data']['records']
        params['total']=res['data']['total']
        params['current']=res['data']['current']
        this.$store.commit('GetRelicsList',params)
      })
    }
  },
  mounted() {
    if(this.$route.params.type!=null){
      this.log(this.$route.params.type)
      this.Search("")
    }

  },

}
</script>


<style scoped>
.tab-item{
  padding:0.3vw 1vw;
  text-align:center;
  font-size:16px
}
.tabs-extra-demo-button {
  margin-right: 16px;
  
}

.ant-row-rtl .tabs-extra-demo-button {
  margin-right: 0;
  margin-left: 16px;
}
</style>