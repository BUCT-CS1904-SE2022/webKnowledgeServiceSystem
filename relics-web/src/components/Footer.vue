<template>
  <div class="Footer" style="background-color: black;opacity: 0.9">
    
    <a-row   style="color:white">
      <a-col :span="3" :offset="6">关于我们</a-col>
      <a-col :span="3">海外博物馆详情</a-col>
      <a-col :span="3">隐私政策</a-col>
      <a-col :span="3">联系我们</a-col>
    </a-row>
    <br>
    <br>
    <a-row style="color:white;" >
      <a-col :span="12" :offset="6"><img src="../assets/buct_logo.png" alt="" style="width: 15vw"></a-col>
    </a-row>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>