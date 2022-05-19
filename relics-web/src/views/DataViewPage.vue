<template>
    <div>
        <Navigator/>
        <div style="background-color:#333;">
            <a-row style="height:3vw;"></a-row>
            <a-row style="height:30vw;">
                <a-col :span="3" :offset="1">
                    <a-row style="height:25%">
                        <div class='label'  @click="refresh">
                            博物馆1
                        </div>
                    </a-row>
                    <a-row style="height:25%">
                        <div class='label' @click="refresh">
                            博物馆2
                        </div>
                    </a-row>
                    <a-row style="height:25%">
                        <div class='label'  @click="refresh">
                            博物馆3
                        </div>
                    </a-row>
                    <a-row style="height:25%">
                        <div class='label'  @click="refresh">
                            博物馆4
                        </div>
                    </a-row>
                </a-col>

                <a-col :span="10" :offset="1" style="border:2px solid white;border-radius: 2px;">
                        <World/>
                </a-col>
                
                <a-col :span="7" :offset="1">
                    <a-row style="height:45%;border:2px solid white;border-radius: 2px;margin-bottom:10%" >
                            <Bar/>
                    </a-row>
                    <a-row style="height:45%;border:2px solid white;border-radius: 2px;" >
                            <Circle/>
                    </a-row>
                </a-col>

            </a-row> 

            <a-row style="height:20vw;margin-top:3vw">
                <a-col :span="3" :offset="1">
                    <Triangle/>
                </a-col>
                <a-col :span="9" :offset="1">
                    <Plot/>
                </a-col>
                <a-col :span="9" :offset="1">
                    <Radar/>
                </a-col>
            </a-row>
        </div> 
    </div> 
    
</template>

<script>

export default {
  components: { Circle },
    name:'DataViewPage',
    methods: {
        refresh:function(){
            location.reload()
        }
    },
}
</script>

<script setup>
import World from "../components/World.vue";
import Navigator from "../components/Navigator.vue"
import Bar from "../components/Bar.vue"
import Circle from "../components/Circle.vue"
import Radar from "../components/Radar.vue"
import Plot from "../components/Plot.vue"
import Triangle from "../components/Triangle.vue"

</script>

<style>
.label{
    width:80%;
    height:40%;
    margin:auto;
    border:2px solid white;
    text-align:center;
    line-height:200%;
    font-size:20px;
    font-weight:bolder;
    color:white
}
</style>
