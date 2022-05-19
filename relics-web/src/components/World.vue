<template>
    <div :style="{height:height,width:width}"  >
        <div :style="{height:height,width:width}"  id='myChart' ref="myEchart"></div>
    </div>
</template>
<script>
  import * as echarts from "echarts" //引入组件
  import '../../node_modules/echarts/map/js/world.js'    //引入组件

  export default {
    name: "echarts",
    props: {
      width: {type: String,default: "99%" },
      height: {type: String,default: "99%"}
    },
    data() {
      return {
        chart: null,
        data:[
          {"name": "俄罗斯","value": 1707.5},
          {"name": "加拿大","value": 997.1},
          {"name": "中国","value": 960.1},
          {"name": "美国","value": 936.4},
          //--------省略数据
        ]
      };
    },
    mounted() {
        this.initChart();
        var myChart = echarts.init(document.getElementById('myChart'));
        window.onresize = function() {
            myChart.resize();
        };
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            window.onresize = echarts.init(this.$refs.myEchart).resize;
           
            // 把配置和数据放这里
            this.chart.setOption({
            backgroundColor: "#333",
            title: {    //地图显示标题
                text: '文物分布地图',
                left: 'center',
                top:'20px',
                textStyle : {
                    color:'white',
                    "fontSize": 28
                }
            },
            tooltip: {  //提示框组件
                trigger: 'item',
                formatter: '{b}<br/>{c} 万平方公里'
            },
            series: [{
                name:"国家面积",
                type: 'map',
                mapType: 'world',
                roam: true,
                mapLocation: {y: 100},
                data: this.data,   //绑定数据
                nameMap:{
                'Russia':'俄罗斯',
                'Canada':'加拿大',
                'China':'中国',
                'United States':'美国',
                },
                symbolSize: 12,
                label: {
                normal: {show: false},
                emphasis: {show: true}
                },
                itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
                }
            }],
            });
      }
    }
  }
</script>