import { createStore } from 'vuex'

export default createStore({
  state: {
    //用户信息
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
    //文物列表
    RelicsList:{
      "isFuzzy":true, //模糊搜索
      "keyword":"", //搜索关键词
      "total": 0, //文物总数
      "current": -1, //
      "size": 0,
      "records": []
    },
    //非模糊搜索时的搜索参数
    SearchParam:{
      "artist":[], //作者
      "customClass":[], //文物自定义属性
      "isFuzzy":false, //非模糊搜索
      "medium":[], //文物材质
      "museum":[], //所属博物馆
      "page":1, //当前页码
      "size":12, //每页记录数
      "sort":"",
      "sortKeyword":"",  //排序字段
      "sortWay":"",  //排序字段
      "status":[]  //在展情况
    },
    //文物详情
    Relic:{
      "id": -1,
      "name": "",
      "discoverTime": "",
      "imageUrl": "",
      "medium": "",
      "artist": "",
      "status": 1,
      "detail": "",
      "dimension": "",
      "classification": "",
      "customClass": "",
      "detailUrl": "",
      "location": "",
      "museum": "",
      "likeNum": 1,
      "createTime": "",
      "updateTime": ""
    }
  },
  mutations: {
    //登录更新用户状态
    Login:(state,user)=>{
      state.User.isLogin=true
      state.User.loginId=user.loginId
      state.User.userName=user.userName
    },
    //更新用户信息
    GetUerInfo:(state,user)=>{
      state.User.phone=user['phone']
      state.User.email=user['email']
      state.User.signature=user['signature']
      state.User.browseIds=user['browseIds']
      state.User.collectIds=user['collectIds']
      state.User.likeIds=user['likeIds']
     
    },
    //登录消除登陆状态
    LoginOut:(state)=>{
      state.User={
        isLogin:false,
        loginId: "-1",
        userName: 'Unauthorized',
        assword:'',
        repassword:'',
        phone:'',
        email: '',
        signature:''
      }
    },
    //获取文物列表
    GetRelicsList:(state,RelicsList)=>{
      state.RelicsList=RelicsList
    },
    //更新详情页文物
    GetRelic(state,Relic){
      state.Relic=Relic
    }
    
  },
  actions: {
  },
  modules: {
  }
})
