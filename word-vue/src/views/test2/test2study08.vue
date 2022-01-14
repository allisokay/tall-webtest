<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">辨音测试</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <el-image
                            style="width: 200px; height: 200px"
                            :src="imgs[2]"
                            fit="cover" v-if="isShow[0]"></el-image>

                    <el-image
                            style="width: 200px; height: 200px"
                            :src="imgs[1]"
                            fit="cover" v-if="isShow[1]"></el-image>

                    <el-image
                            style="width: 200px; height: 200px"
                            :src="imgs[2]"
                            fit="cover" v-if="isShow[2]"></el-image>

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
        name: "test2study08",
        data(){
            return{
                //图片是否显示

                isShow:[false,false,false],
                imgs:[],//图片索引和地址
                audios1:[],//音频索引和地址
                audio:[],//音频地址列表
                index:0,
                img1:false,
                img2:false,
                img3:false,
                status:1,
                date:0,
                image1:'',
                image2:'',
                image3:'',
            }
        },
        mounted() {

            for(var i=0;i<GLOBAL.img.length;i++)
            {
                this.imgs[i]=GLOBAL.baseURL+GLOBAL.img[i].src
                console.log(this.imgs[i])
            }
            this.order_play()
            //this.startmusic()
        },
        methods: {
            order_play(){
                if(GLOBAL.test2_study2_audio4.length===0){
                    this.$router.push('/test2test2')
                }
                else{
                    let music=new Audio(GLOBAL.test2_study2_audio4.shift())
                    this.IsShow(this.index++)
                    console.log(this.index)
                    this.$forceUpdate();
                    music.addEventListener('ended',this.order_play)
                    music.play()
                }
            },
            img_show1(val){
                val.style.border='thick solid #DC143C'
                //val.border="red"
                // let imgshow=document.getElementById(val)
                // imgshow.style.display=imgshow.style.display=="none"?"":"none";
                // //定时器,定时调用函数
                // setTimeout("this.img_show()",800);
                // imgshow.style.display=tru
            },
            img_show2(val){
                val.style.border='thin solid #FF0000'
                this.$forceUpdate();
            },
            IsShow(val){
                this.isShow[val] = !this.isShow[val]
                console.log(this.isShow[val])
            },
        },
        created() {

            document.body.style.backgroundColor="#B7B7B7";
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
        border: thin dotted #FF0000;
    }
</style>