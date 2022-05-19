import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'



import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css';
import './assets/CSS/GobalCSS.css'
import '../node_modules/echarts/map/js/world.js' // 引入世界地图

createApp(App).use(store).use(router).use(Antd).use(ElementPlus).mount('#app')
