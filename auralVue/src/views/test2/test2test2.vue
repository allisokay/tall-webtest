<template>
    <div class="container">
        <div class="header">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="(now/15*100).toFixed(0)*1" status="success"></el-progress>
            <div>
<!--                <h1 class="el-row">测试二</h1>-->
            </div>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <div>
                        <el-button type="primary" v-show="isshow" @click="start" >播放</el-button>
                    </div>
                </div>
                <div class="imgrow">
                    <img :class="{'active':isActive1,'error':!isActive1}" :src="imgs[0]"  v-show="canClick" width="300"  height="300"  @click="makeChoice('A')" />
                    <img :class="{'active':isActive2,'error':!isActive2}" :src="imgs[1]"  v-show="canClick" width="300"  height="300"  @click="makeChoice('B')" />
                    <img :class="{'active':isActive3,'error':!isActive3}" :src="imgs[2]"  v-show="canClick" width="300"  height="300"  @click="makeChoice('C')" />
                </div>
                <div class="row"></div>
            </div>
            <div class="right"></div>
            <div class="footer"></div>
        </div>
    </div>
</template>

<script>
import GLOBAL from '../../plugins/global_variable'
export default {
    name: "test2test2",
    data() {
        return {
            fit: 'cover',//图片显示格式
            imgs: [], //存放所有图片的路径
            auis:[
                {
                    audioIndex: "1",
                    audioSrc: require("../../assets/static/test2/audio/64.mp3")
                },
                {
                    audioIndex: "2",
                    audioSrc: require("../../assets/static/test2/audio/65.mp3")
                },
                {
                    audioIndex: "3",
                    audioSrc: require("../../assets/static/test2/audio/66.mp3")
                },
                {
                    audioIndex: "4",
                    audioSrc: require("../../assets/static/test2/audio/67.mp3")
                },
                {
                    audioIndex: "5",
                    audioSrc: require("../../assets/static/test2/audio/68.mp3")
                },
                {
                    audioIndex: "6",
                    audioSrc: require("../../assets/static/test2/audio/69.mp3")
                },
                {
                    audioIndex: "7",
                    audioSrc: require("../../assets/static/test2/audio/70.mp3")
                },
                {
                    audioIndex: "8",
                    audioSrc: require("../../assets/static/test2/audio/71.mp3")
                },
                {
                    audioIndex: "9",
                    audioSrc: require("../../assets/static/test2/audio/72.mp3")
                },
                {
                    audioIndex: "10",
                    audioSrc: require("../../assets/static/test2/audio/73.mp3")
                },
                {
                    audioIndex: "11",
                    audioSrc: require("../../assets/static/test2/audio/74.mp3")
                },
                {
                    audioIndex: "12",
                    audioSrc: require("../../assets/static/test2/audio/75.mp3")
                },
                {
                    audioIndex: "13",
                    audioSrc: require("../../assets/static/test2/audio/76.mp3")
                },
                {
                    audioIndex: "14",
                    audioSrc: require("../../assets/static/test2/audio/77.mp3")
                },
                {
                    audioIndex: "15",
                    audioSrc: require("../../assets/static/test2/audio/78.mp3")
                },
            ], // 存放所有音频的路径
            canClick:false,
            isshow:false,
            isActive1:false,
            isActive2:false,
            isActive3:false,
            valueOpt:'',
            //最终分数
            score2:0,
            audio:[],
            startDate2:'',
            endDate2:'',//
            startDate:'',
            endDate:'',//每次测试
            react_time:0,
            time:[],//反应时间
            timer:null,
            audio2:'',
            now:0,
            image1:'',
            image2:'',
            image3:''
        }
    },
    mounted() {
        this.startDate2 = new Date();

        /*//获取图片
        for(let i=0;i<GLOBAL.img.length;i++)
        {
            this.imgs[i]=GLOBAL.baseURL+GLOBAL.img[i].src
            //console.log(this.imgs[i])
        }
        // 获取测试的材料音频
        for(let i=0;i<15;i++)
        {
            this.audio[i]=GLOBAL.test2_test2_audio2[i]
        }*/
        for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
            this.imgs[i] = GLOBAL.test2_imgs[i].imageSrc
        }

        // 测试开始前的提示音频
        this.audio2 = new Audio()
        this.audio2.src = require("../../assets/static/test2/audio/63.mp3")
        this.audio2.play();
        this.audio2.addEventListener('ended', ()=>this.isshow=true)
        this.$forceUpdate();
    },
    methods: {
        //每小题提交结果，保存结果到choice数组，然后更改isshow值
        start(){
            this.isshow=false
            this.playAudio()
        },
        //改变录音播放按钮
        //提示音频和录音的播放
        playAudio(){
            this.isActive1=false
            this.isActive2=false
            this.isActive3=false
            let audio = new Audio(this.auis.shift().audioSrc)
            audio.play()
            this.startDate = new Date();//开始时间，用于计算针对单个词的反应时间
            // 录音播放完毕即开启30s倒计时
            audio.addEventListener("ended", this.timerFun)
        },
        timerFun() {
            this.canClick=true
            let tick = 0
            this.timer = setInterval(()=>{
                tick++
                if (tick === 30) {
                    this.makeChoice(" ") //超时未选择计为' '
                }
            }, 1000)
        },
        makeChoice(choice){
            setTimeout(()=>{this.canClick=false}, 50)
            // 不论用户做出选择或到达30s限制时间都当即清除当前设置的定时器
            clearInterval(this.timer)
            this.now=this.now+1
            this.valueOpt=choice
            // 用户30s内做出了选择
            if (choice !== " ") {
                this.endDate = new Date()
                this.react_time=this.endDate.getTime()-this.startDate.getTime()
                GLOBAL.rt2.push(this.react_time)
                GLOBAL.user_ans2.push(this.valueOpt)
                //加边框
                if (choice==="A") {
                    this.isActive1=true
                } else if (choice==='B') {
                    this.isActive2=true
                } else if (choice==='C') {
                    this.isActive3=true
                }
            }
            this.audioEnd()
            setTimeout(this.playAudio, 500)
        },
        audioEnd() {
            if(this.auis.length===0) {
                setTimeout(() => {
                    this.score()
                    this.endDate2 = new Date()
                    GLOBAL.time_elapsed2 = this.endDate2.getTime() - this.startDate2.getTime()
                    this.$router.push('/test2final');

                }, 1000)
            }
        },
        //计算测试二得分
        score(){
            for( let i=0;i<15;i++) {
                if(GLOBAL.corr_ans2[i]===GLOBAL.user_ans2[i]) {
                    GLOBAL.score2++
                    this.score2++
                    GLOBAL.correct2.push(1)
                } else {
                    GLOBAL.correct2.push(0)
                }
            }
        }
    }
}
</script>

<style scoped>
.yesbutton{
    display: flex;
    justify-content: center;
    margin-bottom:80px
}
.container{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.header{
    display: flex;
    flex-direction: column;
    height: 20vh;
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
    justify-content: center;
    margin-bottom:80px
}
.imgrow
{
    display: flex;
    justify-content: space-around;
    margin-bottom:80px
}
.select {
    position: relative;
    width:81px;
    height:93px;
    margin: 0 auto;
    text-align: center;
    line-height: 93px;
    color: #4ABE84;
    background-color: #fff;
    box-shadow:0px 2px 7px 0px rgba(85,110,97,0.35);
    border-radius:7px;
    border:1px solid rgba(74,190,132,1);
}
.select:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    border: 17px solid #4ABE84;
    border-top-color: transparent;
    border-left-color: transparent;
}
.select:after {
    content: '';
    width: 5px;
    height: 12px;
    position: absolute;
    right: 6px;
    bottom: 6px;
    border: 2px solid #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
}
.active{
    border:thick solid #DC143C
}
.error{
    border: thin dotted #000000;
}
</style>