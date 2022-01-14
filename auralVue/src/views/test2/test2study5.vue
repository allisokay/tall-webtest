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
                                :src="imgs[2]"
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
                                :src="imgs[0]"
                                fit="cover" v-show="img3" />
                    </div>

                </div>
                <div class="row">
                    <div >
                        <img
                                id="image4"
                                style="width: 200px; height: 200px"
                                :src="imgs[1]"
                                fit="cover" v-show="img4" />
                    </div>
                    <div >
                        <img
                                id="image5"
                                style="width: 200px; height: 200px"
                                :src="imgs[0]"
                                fit="cover" v-show="img5" />
                    </div>
                    <div >
                        <img
                                id="image6"
                                style="width: 200px; height: 200px"
                                :src="imgs[2]"
                                fit="cover" v-show="img6" />
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
        name: "test2study5",
        data() {
            return {
                /*2，1，0，1，0，2--->21，22，23，24，25，26*/
                imgs: [], //存放所有图片的路径
                correctAudiosList:[],
                img1: false,
                img2: false,
                img3: false,
                img4: false,
                img5: false,
                img6: false,
                image1: '',
                image2: '',
                image3: '',
                image4: '',
                image5: '',
                image6: '',
            }
        },
        created() {
            // 加载图片
            for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
                this.imgs[i] = GLOBAL.test2_imgs[i]
            }

            document.body.style.backgroundColor = "#B7B7B7";
        },
        mounted() {
            // 播放本部分提示音
            let music = new Audio(GLOBAL.test2_audio5.shift())
            music.addEventListener("ended", ()=>{this.order_play()})
            music.play()
        },
        methods: {
            order_play() {
                switch (GLOBAL.test2_audio5.length) {
                    case 5:
                        this.image1 = document.getElementById("image1")
                        this.img_show1(this.image1)
                        setTimeout(()=>{this.img1 = true}, 1000)
                        break
                    case 4:
                        this.image2 = document.getElementById("image2")
                        this.img_show1(this.image2)
                        this.img_show2(this.image1)
                        setTimeout(()=>{this.img2 = true}, 1000)
                        break
                    case 3:
                        this.image3 = document.getElementById("image3")
                        this.img_show1(this.image3)
                        this.img_show2(this.image2)
                        setTimeout(()=>{this.img3 = true}, 1000)
                        break
                    case 2:
                        this.image4 = document.getElementById("image4")
                        this.img_show1(this.image4)
                        this.img_show2(this.image3)
                        setTimeout(()=>{this.img4 = true}, 1000)
                        break
                    case 1:
                        this.image5 = document.getElementById("image5")
                        this.img_show1(this.image5)
                        this.img_show2(this.image4)
                        setTimeout(()=>{this.img5 = true}, 1000)
                        break
                    case 0:
                        this.image6 = document.getElementById("image6")
                        this.img_show1(this.image6)
                        this.img_show2(this.image5)
                        setTimeout(()=>{
                            this.img6 = true
                            this.ture_Page()
                        }, 1000)
                        break
                }
                let music = new Audio(GLOBAL.test2_audio5.shift())
                music.addEventListener('ended', ()=>{this.order_play()})
                if (GLOBAL.test2_audio5.length===5) {
                    // 播放第一个词组音频
                    music.play()
                } else {
                    setTimeout(()=>{
                        this.img_show2(document.getElementById("image1"));
                        this.img_show2(document.getElementById("image2"));
                        this.img_show2(document.getElementById("image3"));
                        this.img_show2(document.getElementById("image4"));
                        this.img_show2(document.getElementById("image5"));
                        this.img_show2(document.getElementById("image6"));
                    }, 2000);
                    setTimeout(()=>{music.play()}, 3000);
                }
            },
            img_show1(val) {
                val.style.border = 'thick solid #DC143C'
            },
            img_show2(val) {
                val.style.border = 'thin solid #000000'
            },
            ture_Page() {
                setTimeout(()=>{this.$router.push('/test2study6')}, 2000)
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
    }
    img
    {
        border: thin dotted #000000;
    }
</style>