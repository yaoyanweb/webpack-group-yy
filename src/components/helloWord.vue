
<template>
    <div>
        <div class="text">
            开箱即用的Vue脚手架
            {{test}}
        </div>
    </div>
</template>

<style lang="less" scoped> 
.text {
    color: aqua;
    font-size: 40px;
    text-align: center;
    margin-top: 100px;
}
</style> 
<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
import { createNewPlan } from '../api'
export default {
    mounted(){
        console.log(this.$store.state)
        createNewPlan().then(()=>{
            console.log(33);
        })
    },
    computed: mapState([
        // 映射 this.count 为 store.state.count
        'test'
    ])
};
</script>
<style lang="less" scoped>
    
</style>
