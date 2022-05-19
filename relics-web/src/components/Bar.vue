<template>
    <div id="myChart" :style="{width:width,height:height}" ref="myEchart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'Bar',
    props: {
      width: {type: String,default: "99%" },
      height: {type: String,default: "100%"}
    },
    mounted(){ // 需要获取到element,所以是onMounted的Hook
        var myChart = echarts.init(this.$refs.myEchart);
        var option;
        option = {
            title: {    //地图显示标题
                text: '书画作者作品数量柱形图',
                left: 'center',
                top:'15px',
                textStyle : {
                    color:'white',
                    "fontSize": 20
                }
            },
            yAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            xAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
                }
            ]
        };

        option && myChart.setOption(option);

    }
}
</script>
