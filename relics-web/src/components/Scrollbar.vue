<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <a-card @click="ToRelicPage(item)" v-for="item in RelicsList" :key="item" class="scrollbar-demo-item" hoverable id="card">
        <template #cover>
            <img
                alt="example"
                :src="item.imageUrl"
                id="RelicImg"
            >
        </template>
      </a-card>
    </div>
  </el-scrollbar>
</template>

<script setup>

</script>

<script>
export default {
  name: "Scrollbar",
  props:{
    RelicsList:{

    }
  },
  methods: {
    //前往文物详情页
    ToRelicPage:function(RelicsInf){
      
      //更新文物详情
      this.$store.commit('GetRelic',RelicsInf)
      //前往文物页面
      this.$router.push({path:'/RDPage'});
    }
  },
  
}
</script>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  width: 10vw;
  /* height: 10vw; */
  margin: 10px;
}
</style>



