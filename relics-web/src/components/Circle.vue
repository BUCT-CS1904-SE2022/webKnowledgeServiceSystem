<template>
    <div id="myChart" :style="{width:width,height:height}" ref="myEchart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'Circle',
    props: {
      width: {type: String,default: "100%" },
      height: {type: String,default: "100%"}
    },
    mounted(){ // 需要获取到element,所以是onMounted的Hook
        var myChart = echarts.init(this.$refs.myEchart);
        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            title: {    //地图显示标题
                text: '藏品朝代饼形图',
                left: 'center',
                top:'0',
                textStyle : {
                    color:'white',
                    "fontSize": 20
                }
            },
            series: [
                {
                name: '藏品',
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    show: true,
                    position: 'right'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '10',
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '汉' },
                    { value: 735, name: '唐' },
                    { value: 580, name: '明' },
                    { value: 484, name: '元' },
                    { value: 600, name: '清' }
                ]
                }
            ]
        };

        option && myChart.setOption(option);

    }
}
</script>
