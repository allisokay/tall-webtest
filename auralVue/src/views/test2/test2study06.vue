<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">辨音测试</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <img
                            id="image1"
                            style="width: 200px; height: 200px"
                            :src="imgs[1]"
                            fit="cover" v-show="img1" />
                    <img
                            id="image2"
                            style="width: 200px; height: 200px"
                            :src="imgs[0]"
                            fit="cover" v-show="img2" />
                    <img
                            id="image3"
                            style="width: 200px; height: 200px"
                            :src="imgs[0]"
                            fit="cover" v-show="img3" />
                </div>

                <div class="row">
                    <img
                            id="image4"
                            style="width: 200px; height: 200px"
                            :src="imgs[2]"
                            fit="cover" v-show="img4" />
                    <img
                            id="image5"
                            style="width: 200px; height: 200px"
                            :src="imgs[1]"
                            fit="cover" v-show="img5" />
                    <img
                            id="image6"
                            style="width: 200px; height: 200px"
                            :src="imgs[2]"
                            fit="cover" v-show="img6" />
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>

<script>
    import GLOBAL from "../../plugins/global_variable";
    export default {
        name: "test2study06",
        data(){
            return{
                imgs:[],//图片索引和地址
                img1:false,
                img2:false,
                img3:false,
                img4:false,
                img5:false,
                img6:false,
                image1:'',
                image2:'',
                image3:'',
                image4:'',
                image5:'',
                image6:'',
            }
        },
        created() {
          document.body.style.backgroundColor="#B7B7B7";
        },
        mounted() {

            for(let i=0;i<GLOBAL.img.length;i++)
            {
                this.imgs[i]=GLOBAL.baseURL+GLOBAL.img[i].src
                console.log(this.imgs[i])
            }
            this.order_play()
        },
        methods:{
            order_play(){
                if(GLOBAL.test2_study1_audio6.length===0){
                    this.$router.push('/test2test1');
                }
                else{
                    if(GLOBAL.test2_study1_audio6.length===6)
                    {
                        this.image1=document.getElementById("image1")
                        this.img_show1(this.image1)
                        this.img1=true
                    }
                    if(GLOBAL.test2_study1_audio6.length===5)
                    {
                        this.image2=document.getElementById("image2")
                        this.img_show1(this.image2)
                        this.img_show2(this.image1)
                        this.img2=true
                    }
                    if(GLOBAL.test2_study1_audio6.length===4)
                    {
                        this.image3=document.getElementById("image3")
                        this.img_show1(this.image3)
                        this.img_show2(this.image2)
                        this.img3=true
                    }
                    if(GLOBAL.test2_study1_audio6.length===3)
                    {
                        this.image4=document.getElementById("image4")
                        this.img_show1(this.image4)
                        this.img_show2(this.image3)
                        this.img4=true
                    }
                    if(GLOBAL.test2_study1_audio6.length===2)
                    {
                        this.image5=document.getElementById("image5")
                        this.img_show1(this.image5)
                        this.img_show2(this.image4)
                        this.img5=true
                    }
                    if(GLOBAL.test2_study1_audio6.length===1)
                    {
                        this.image6=document.getElementById("image6")
                        this.img_show1(this.image6)
                        this.img_show2(this.image5)
                        this.img6=true
                    }
                    this.$forceUpdate();
                    let music=new Audio(GLOBAL.test2_study1_audio6.shift())
                    music.addEventListener('ended',this.order_play)
                    music.play()
                }
            },
            img_show1(val){
                val.style.border='thick solid #DC143C'
            },
            img_show2(val){
                val.style.border='thin solid #000000'
            },
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header{
        display: flex;
        flex-direction: column;
        height: 30vh;
    }
    .footer{
        height: 75px;
    }
    .content{
        display: flex;
        flex-direction: row;
        flex: 1;
    }
    .el-row{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .left,.right{
        width:200px;
    }
    .center{
        flex: 1;
    }
    .row{
        display: flex;
        justify-content: space-around;
        margin-bottom:80px
    }
    img
    {
        border: thin dotted #000000;
    }
</style>