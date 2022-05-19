<template>
  <div id="myChart123" :style="{width: '55vw', height: '35vw'}"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl';
import {onMounted} from "vue";

export default {
  setup() {
    onMounted(() => { // 需要获取到element,所以是onMounted的Hook
      let myChart = echarts.init(document.getElementById("myChart123"));
      let ROOT_PATH = 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#000',
        globe: {
          baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          displacementScale: 0.04,
          shading: 'realistic',
          environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
              diffuseIntensity: 0.2
            }
          }
        }
      });
      window.onresize = function () { // 自适应大小
        myChart.resize();
      };
    });
  }
}

</script>

<style scoped>

</style>