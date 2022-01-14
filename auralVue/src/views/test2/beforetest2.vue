<template>
    <div>
        <div class="header" >
            <h1>题型二 辨音测试</h1>
        </div>
        <div class="row">
            <h1 >本测试需要播放音频，请确认扬声器已经打开。</h1>
        </div>
        <div class="yesbutton">
            <el-button  type="success" plain  @click="starttest2">开始测试</el-button>
        </div>
    </div>
</template>

<script>
    import GLOBAL from '../../plugins/global_variable'
    export default {
        name: "beforetest2",
        data(){
            return{
                imgs:[]
            }
        },
        methods:{
            starttest2(){
                console.log(this.imgs);
                this.$router.push('/test2study1')
            },
        },
        created() {
            document.body.style.backgroundColor="#B7B7B7";
            // 获取所需的三张图片
            axios.get("test2_img/find_img").then((response)=>{
                GLOBAL.img=response.data
                console.log('data')
                console.log(response.data)
            });
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .header, .footer {
        height: 100px;
        line-height: 100px;
        background-color: #D8D8D8;
        text-align: center;
        margin-bottom:100px
    }
    .row{
        display: flex;
        justify-content: center;
        margin-bottom:150px
    }
    .yesbutton{
        display: flex;
        justify-content: center;
        margin-bottom:80px
    }
</style>