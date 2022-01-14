<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">辨音测试</h1>
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                        <img
                                id="image1"
                                style="width: 200px; height: 200px"
                                :src="imgs[0]"
                                fit="cover" v-show="img1" />
                        <img
                                id="image2"
                                style="width: 200px; height: 200px"
                                :src="imgs[1]"
                                fit="cover" v-show="img2" />
                        <img
                                id="image3"
                                style="width: 200px; height: 200px"
                                :src="imgs[2]"
                                fit="cover" v-show="img3" />
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
        name: "test2study4",
        data(){
            return {
                imgs: [], //存放所有图片的路径
                img1:false,
                img2:false,
                img3:false,
                image1:'',
                image2:'',
                image3:'',
            }
        },
        created() {
            // 加载图片
            for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
                this.imgs[i] = GLOBAL.test2_imgs[i]
            }

            document.body.style.backgroundColor="#B7B7B7";
        },
        mounted() {
            this.order_play()
        },
        methods:{
            order_play(){
                switch (GLOBAL.test2_audio4.length) {
                    case 0:
                        setTimeout(()=>{this.$router.push('/test2study5')}, 2000)
                        break
                    case 5:
                        this.image1=document.getElementById("image1")
                        this.img_show1(this.image1)
                        this.img1=true
                        break
                    case 3:
                        this.image2=document.getElementById("image2")
                        this.img_show1(this.image2)
                        this.img_show2(this.image1)
                        this.img2=true
                        break
                    case 1:
                        this.image3=document.getElementById("image3")
                        this.img_show1(this.image3)
                        this.img_show2(this.image2)
                        this.img3=true
                        break
                }
                let music=new Audio(GLOBAL.test2_audio4.shift())
                music.addEventListener('ended', ()=>{this.order_play()})
                if (GLOBAL.test2_audio4.length===4 || GLOBAL.test2_audio4.length===2) {
                    setTimeout(()=>{
                        this.img_show2(document.getElementById("image1"));
                        this.img_show2(document.getElementById("image2"));
                        this.img_show2(document.getElementById("image3"))
                    }, 2000);
                    music.play();
                } else {
                    music.play();
                }
            },
            img_show1(val){
                val.style.border='thick solid #DC143C'
            },
            img_show2(val){
                val.style.border='thin solid #000000'
            }
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
        height: 40vh;
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
    }
    img
    {
        border: thin dotted #000000;
    }
</style>