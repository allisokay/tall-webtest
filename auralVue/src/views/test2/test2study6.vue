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
                    <div >
                        <img
                            id="image1"
                            style="width: 200px; height: 200px"
                            :src="imgs[0]"
                            fit="cover" v-show="img1" />
                    </div>
                    <div >
                        <img
                            id="image2"
                            style="width: 200px; height: 200px"
                            :src="imgs[1]"
                            fit="cover" v-show="img2" />

                    </div>
                    <div >
                        <img
                            id="image3"
                            style="width: 200px; height: 200px"
                            :src="imgs[2]"
                            fit="cover" v-show="img3" />
                    </div>

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
        name: "test2study6",
        data(){
            return{
                imgs:[],
                img1:false,
                img2:false,
                img3:false,
                image1:'',
                image2:'',
                image3:'',
            }
        },
        mounted() {
            document.body.style.backgroundColor="#B7B7B7";
             // 加载图片
            for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
                this.imgs[i] = GLOBAL.test2_imgs[i]
            }

            this.order_play()
        },
        methods: {
            order_play() {
                switch (GLOBAL.test2_audio6.length) {
                    case 2:
                        this.image1=document.getElementById("image1")
                        setTimeout(()=>{this.img_show1(this.image1)}, 2000)
                        break
                    case 1:
                        this.image2=document.getElementById("image2")
                        this.img_show2(this.image1)
                        setTimeout(()=>{this.img_show1(this.image2)}, 2000)
                        break
                    case 0:
                        this.image3=document.getElementById("image3")
                        this.img_show2(this.image2)
                        setTimeout(()=>{
                            this.img_show1(this.image3)
                            this.turn_Page()
                        }, 2000)
                        break
                }
                let music=new Audio(GLOBAL.test2_audio6.shift())
                music.addEventListener('ended', ()=>{this.order_play()})
                if (GLOBAL.test2_audio6.length===3) {
                    music.play()
                } else if (GLOBAL.test2_audio6.length===2) {
                    music.play()
                    this.img1=true
                    this.img2=true
                    this.img3=true
                } else {
                    setTimeout(()=>{
                        this.img_show2(document.getElementById("image1"));
                        this.img_show2(document.getElementById("image2"));
                        this.img_show2(document.getElementById("image3"))
                    }, 3000);
                    setTimeout(()=>{music.play()}, 4000)
                }
            },
            img_show1(val){
                val.style.border='thick solid #DC143C'
            },
            img_show2(val){
                val.style.border='thin solid #000000'
            },
            turn_Page() {
                setTimeout(()=>{this.$router.push('/test2study7')}, 2000)
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