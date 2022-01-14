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
    import GLOBAL from '../../plugins/global_variable'
    export default {
        name: "test2study1",
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
            // 随机选择材料
            this.chose_AorB();

            // 加载图片
            for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
                this.imgs[i] = GLOBAL.test2_imgs[i]
            }

            document.body.style.backgroundColor="#B7B7B7"
        },
        mounted() {
            this.order_play()
        },
        methods: {
            chose_AorB() {
                if (localStorage.getItem("test1Type") === "A") {
                    this.chose_A();
                } else if (localStorage.getItem("test1Type") === "B") {
                    this.chose_B();
                }
            },
            chose_A() {
                GLOBAL.test2_materialType = 'A'
                GLOBAL.test2_imgs   = GLOBAL.test2_images_A
                GLOBAL.test2_audio1 = GLOBAL.test2_audio_A1
                GLOBAL.test2_audio2 = GLOBAL.test2_audio_A2
                GLOBAL.test2_audio3 = GLOBAL.test2_audio_A3
                GLOBAL.test2_audio4 = GLOBAL.test2_audio_A4
                GLOBAL.test2_audio5 = GLOBAL.test2_audio_A5
                GLOBAL.test2_audio6 = GLOBAL.test2_audio_A6
                GLOBAL.test2_audio7 = GLOBAL.test2_audio_A7
                GLOBAL.test2_audio8 = GLOBAL.test2_audio_A8
                GLOBAL.stimulus = GLOBAL.stimulus1;
            },
            chose_B() {
                GLOBAL.test2_materialType = 'B'
                GLOBAL.test2_imgs   = GLOBAL.test2_images_B
                GLOBAL.test2_audio1 = GLOBAL.test2_audio_B1
                GLOBAL.test2_audio2 = GLOBAL.test2_audio_B2
                GLOBAL.test2_audio3 = GLOBAL.test2_audio_B3
                GLOBAL.test2_audio4 = GLOBAL.test2_audio_B4
                GLOBAL.test2_audio5 = GLOBAL.test2_audio_B5
                GLOBAL.test2_audio6 = GLOBAL.test2_audio_B6
                GLOBAL.test2_audio7 = GLOBAL.test2_audio_B7
                GLOBAL.test2_audio8 = GLOBAL.test2_audio_B8
                GLOBAL.stimulus = GLOBAL.stimulus2
            },
            order_play() {
                switch (GLOBAL.test2_audio1.length) {
                    case 0:
                        setTimeout(()=>{this.$router.push('/test2study2')}, 2000)
                        break
                    case 6:
                        this.image1=document.getElementById("image1")
                        this.img_show1(this.image1)
                        this.img1=true
                        break
                    case 4:
                        this.image2=document.getElementById("image2")
                        this.img_show1(this.image2)
                        this.img_show2(this.image1)
                        this.img2=true
                        break
                    case 2:
                        this.image3=document.getElementById("image3")
                        this.img_show1(this.image3)
                        this.img_show2(this.image2)
                        this.img3=true
                        break
                }
                let music=new Audio(GLOBAL.test2_audio1.shift())
                music.addEventListener('ended', ()=>{this.order_play()})
                music.play()
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