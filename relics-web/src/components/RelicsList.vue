<template>
  <a-row style="width: 85vw;">
    <a-col :span="6" v-for="col in RelicsList">
      <div class="RelicCard" v-for="relic in col"><RelicsCard :RelicsInf="relic"/></div> 
    </a-col> 
  </a-row>
</template>
<script setup>
import RelicsCard from "@/components/RelicsCard";

</script>

<script >


export default {
  name: "RelicsList",
  computed:{
    RelicsList(){
      let rlist=[[],[],[],[]]
      let pos=0
      let records=this.$store.state.RelicsList.records
      for(let i=0;i<records.length;i++){
        rlist[pos%4].push(records[i])
        pos++
      }
      return rlist
    }
  },
  mounted() {
    // console.log(this.RelicsList)
  },
}
</script>

<style scoped>
.RelicCard{
  width:90%;
  margin: auto auto 1vw;
}
</style>