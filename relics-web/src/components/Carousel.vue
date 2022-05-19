<template>
  <el-carousel :interval="3000" arrow="hover" height=40vw>
    <el-carousel-item >
      <img src="../assets/博物馆的力量.jpg" alt="" style="width:100%" >
    </el-carousel-item>

    <el-carousel-item >
      <img src="../assets/京师生春诗意图轴.png" alt="" style="width:100%" >
    </el-carousel-item>

    <el-carousel-item >
      <img src="../assets/千里江山图.png" alt="" style="width:100%" >
    </el-carousel-item>

    <el-carousel-item >
      <img src="../assets/夏畦时泽页.png" alt="" style="width:100%" >
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data(){
    return{
      ImgUrl:[
        "../assets/博物馆的力量.jpg",
        "../assets/京师生春诗意图轴.png",
        "../assets/千里江山图.png",
        "../assets/夏畦时泽页.png"
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  /*line-height: 80vw;*/
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>