<template>
    <div id="myChart" :style="{width:width,height:height}" ref="myEchart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name:'Triangle',
    props: {
      width: {type: String,default: "99%" },
      height: {type: String,default: "100%"}
    },
    mounted(){ // 需要获取到element,所以是onMounted的Hook
        var myChart = echarts.init(this.$refs.myEchart);
        var option;
        option = {
        title: {    //地图显示标题
                text: '藏品完整度',
                left: 'center',
                top:'15px',
                textStyle : {
                    color:'white',
                    "fontSize": 20
                }
            },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
            }
        },
        // legend: {
        //     data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        // },
        series: [
            {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                width: 1,
                type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                fontSize: 20
                }
            },
            data: [
                { value: 60, name: 'Visit' },
                { value: 40, name: 'Inquiry' },
                { value: 20, name: 'Order' },
                { value: 80, name: 'Click' },
                { value: 100, name: 'Show' }
            ]
            }
        ]
        };

        option && myChart.setOption(option);

    }
}
</script>
