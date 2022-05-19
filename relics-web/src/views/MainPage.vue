<template>
<!--  导航栏-->
  <Navigator :IsSearch="true"/>
<!--  轮播图-->
  <Carousel/>
<!--  文物类别-->
  <div class="ClassificationBox" style="background-color: #005760;opacity: 0.9">
    <br>
    <h1 style="color:#ffda00;">
      <a-row>
        <a-col :span="6" :offset="4"><a-divider style="height: 1px; background-color: #ffda00" /></a-col>
        <a-col :span="4"><b style="font-size: 32px;">文物种类</b></a-col>
        <a-col :span="6" ><a-divider style="height: 1px; background-color: #ffda00" /></a-col>
      </a-row>
    </h1>
    <br>
    <a-row   style="height: 22vw">
      <a-col :span="6"  class="gutter-row" >
        <div  class="gutter-box Classification1" @click="ToClassification('Numismatics')" >
          <router-link :to="{name:'ClfPage',params:{type:'Relics1'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6"  class="gutter-row" >
        <div class="gutter-box Classification2" @click="ToClassification('Container')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics2'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6" class="gutter-row " >
        <div class="gutter-box Classification3" @click="ToClassification('Paintings')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics3'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6"  class="gutter-row "  @click="ToClassification('Sculpture')">
        <div class="gutter-box Classification4">
          <router-link :to="{name:'ClfPage',params:{type:'Relics4'}}" style="color: white"></router-link>
        </div>
      </a-col>
    </a-row>
    <a-row   style="height: 22vw;margin-top: 2vw">
      <a-col :span="6"  class="gutter-row" >
        <div class="gutter-box Classification5"  @click="ToClassification('Costume')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics5'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6"  class="gutter-row " >
        <div class="gutter-box Classification6"  @click="ToClassification('Calligraphy')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics6'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6" class="gutter-row" >
        <div class="gutter-box Classification7"  @click="ToClassification('ArtWare')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics7'}}" style="color: white"></router-link>
        </div>
      </a-col>
      <a-col :span="6"  class="gutter-row " >
        <div class="gutter-box Classification8"  @click="ToClassification('Others')">
          <router-link :to="{name:'ClfPage',params:{type:'Relics8'}}" style="color: white"></router-link>
        </div>
      </a-col>
    </a-row>
    <br>
    <br>
  </div>
<!--  数据可视化展示-->
  <div class="DataViewBox" style="background-color: black;opacity: 0.9">
    <br>
    <h1 style="color:black;">
      <a-row>
        <a-col :span="6" :offset="4"><a-divider style="height: 1px; background-color: white" /></a-col>
        <a-col :span="5"><b style="font-size: 32px;color:white">数据可视化展示</b></a-col>
        <a-col :span="6" ><a-divider style="height: 1px; background-color: white" /></a-col>
      </a-row>
    </h1>
    <br>
    <a-row style="height: 40vw;background-color:black">
<!--      地球展示栏-->
      <a-col :span="16" style="text-align: center;" >
        <earth style="margin: auto"></earth>
      </a-col>
<!--      数据展示栏-->
      <a-col :span="8" style="margin-top: 5vw;">
        <a-row class="MuseumItem">
          <a-col :span="12"><b>Yale University Art Gallery,</b></a-col>
          <a-col :span="12"> 1884件藏品</a-col>
        </a-row>
        <a-divider style="background-color:white;height: 1px;"></a-divider>
        <a-row class="MuseumItem">
          <a-col :span="12"><b>The Art Institute of Chicago</b></a-col>
          <a-col :span="12"> 3884件藏品</a-col>
        </a-row>
        <a-divider style="background-color: white;height: 1px;"></a-divider>
        <a-row class="MuseumItem">
          <a-col :span="12"><b>Penn Museum</b></a-col>
          <a-col :span="12"> 4884件藏品</a-col>
        </a-row>
        <a-divider style="background-color: white;height: 1px;"></a-divider>
        <a-row class="MuseumItem">
          <a-col :span="12"><b>Saint Louis Art Museum</b></a-col>
          <a-col :span="12"> 8884件藏品</a-col>
        </a-row>
        <a-divider style="background-color: white;height: 1px;"></a-divider>
        <a-row class="MuseumItem">
          <a-col :span="12"><b>Allen Memorial Art Museum</b></a-col>
          <a-col :span="12"> 9884件藏品</a-col>
        </a-row>
        <a-divider style="background-color: white;height: 1px;"></a-divider>
      </a-col>
      <a-divider style="background-color: white;height: 1px;"></a-divider>
    </a-row>
    
  </div>
  
<!--  页脚-->
  <Footer/>
</template>

<script setup>
import Navigator from "../components/Navigator";
import Carousel from "../components/Carousel";
import Earth from "../components/Earth";
import Footer from "../components/Footer";
</script>

<script>
export default {
  methods: {
    ToClassification:function(Classification){
      this.$router.push({name:'ClfPage',params:{type:Classification}})
    }
  },
}
</script>

<style scoped>
.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-row{
  text-align: center;
}
.gutter-box {
  height: 95%;
  width: 65%;
  margin:auto;
  background: #00a0e9;
  text-align: center;
  line-height: 17vw;
  color:cornsilk;
  font-size: 2vw;
  font-weight: bolder;
}
.MuseumItem{
  height: 6%;
  color: white;
  
}
.Classification1{
  background-image: url('../assets/钱币.jpg');
  background-size: 100% 100%;
}
.Classification2{
  background-image: url('../assets/陶瓷-容器.jpg');
  background-size: 100% 100%;
}
.Classification3{
  background-image: url('../assets/绘画.jpg');
  background-size: 100% 100%;
}
.Classification4{

  background-image: url('../assets/雕塑.jpg');
  background-size: 100% 100%;
}
.Classification5{
  background-image: url('../assets/服饰.jpg');
  background-size: 100% 100%;
}
.Classification6{
  background-image: url('../assets/书法.jpg');
  background-size: 100% 100%;
}
.Classification7{ 
 
  background-image: url('../assets/工艺品.jpg');
  background-size: 100% 100%;
}
.Classification8{
  background-image: url('../assets/其他.jpg');
  background-size: 100% 100%;
}
</style>