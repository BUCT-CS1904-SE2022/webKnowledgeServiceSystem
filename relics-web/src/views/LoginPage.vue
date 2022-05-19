<template>
  <div style="width: 100vw;height: 100vh;background-color: #00a0e9;line-height: 100%;margin: 0">
    <a-row style="height: 12vw">1</a-row>
    <a-row style="height: 25vw">
      <a-col :span="10" :offset="7" style="background-color: white">
        <div style="width: 60%;margin: 5vw auto;">
          <Login/>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import Login from "../components/Login"
</script>

<script>
export default {
  name: "LoginRegisterPage"
}
</script>

<style scoped>

</style>