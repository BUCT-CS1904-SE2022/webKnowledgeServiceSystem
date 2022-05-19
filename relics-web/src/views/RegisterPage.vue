<template>
  <div style="width: 100vw;height: 100vh;background-color: #00a0e9;line-height: 100%;margin: 0">
    <a-row style="height: 12vw"></a-row>
    <a-row style="height: 25vw">
      <a-col :span="10" :offset="7" style="background-color: white">
        <div style="width: 80%;margin: 3vw 7vw auto auto;">
          <Register />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Register from "@/components/Register";
</script>

<script>
export default {
  name: "RegisterPage"
}
</script>

<style scoped>

</style>