<template>
    <div class="container">
        <div class="header">
            <el-progress :text-inside="true" :stroke-width="24" :percentage="(now/30*100).toFixed(0)*1" status="success"></el-progress>
            <h2 style="color: red; text-align: center">这部分测试不能做笔记</h2>
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
                    <img :class="{'active':isActive1,'error':!isActive1}" :src="imgs[0]"  v-show="canClick" width="300"  height="300"   @click="makeChoice('A')" />
                    <img :class="{'active':isActive2,'error':!isActive2}" :src="imgs[1]"  v-show="canClick" width="300"  height="300"   @click="makeChoice('B')" />
                    <img :class="{'active':isActive3,'error':!isActive3}" :src="imgs[2]"  v-show="canClick" width="300"  height="300"   @click="makeChoice('C')" />
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
        name: "test2test1",
        data() {
            return {
                fit: 'cover',//图片显示格式
                imgs: [], //存放所有图片的路径
                canClick:false,
                isshow:false,
                isActive1:false,
                isActive2:false,
                isActive3:false,
                //下拉框值
                valueOpt:'',
                //当前题目地址
                //最终分数
                score1:0,
                audio:[],
                startDate1:'',
                endDate1:'',//
                startDate:'',
                endDate:'',//每次测试
                react_time:0,
                time:[],//反应时间
                timer:null, // 30s计时器
                audio2:'',//测试开始前提示音
                now:0,
                image1:'',
                image2:'',
                image3:''
            }
        },
        mounted() {
            this.startDate1 = new Date();

            // 加载图片
            for (let i = 0; i < GLOBAL.test2_imgs.length; i++) {
                this.imgs[i] = GLOBAL.test2_imgs[i]
            }
            this.shuffleAudios()

            // 测试提示音频
            this.audio2 = new Audio(require("../../assets/static/test2/newAudio/Instruction_8.mp3"))
            this.audio2.play();
            this.audio2.addEventListener('ended', ()=>this.isshow=true)
        },
        methods: {
            // 打乱音频数组顺序；正确答案数组，正确文本数组需与之保存同步
            shuffleAudios() {
                //打乱前15段
                let frontAudio = GLOBAL.test2_audio8.slice(0, 15)
                let frontCorr_ans = GLOBAL.corr_ans.slice(0, 15)
                let frontStimulus = GLOBAL.stimulus.slice(0, 15)
                let frontTrial_index = GLOBAL.test2_trial_index.slice(0, 15)
                let array = Array.from({length: 15}, (item, index) => index)
                let array1 = Array.from({length: 15}, (item, index) => index)
                let array2 = Array.from({length: 15}, (item, index) => index)
                let array3 = Array.from({length: 15}, (item, index) => index)

                //打乱音频数组，正确答案数组，正确文本数组下标，使用乱序下标进行交换
                for (let i = 14; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                    [array2[i], array2[j]] = [array2[j], array2[i]];
                    [array3[i], array3[j]] = [array3[j], array3[i]];
                }
                for (let i = 0; i <= 14; i++) {
                    array[i] = frontAudio[array[i]]
                    array1[i] = frontCorr_ans[array1[i]]
                    array2[i] = frontStimulus[array2[i]]
                    array3[i] = frontTrial_index[array3[i]]
                }
                frontAudio = array
                frontCorr_ans = array1
                frontStimulus = array2
                frontTrial_index = array3
                // 打乱后15段
                let backAudio = GLOBAL.test2_audio8.slice(15, 30)
                let backCorr_ans = GLOBAL.corr_ans.slice(15, 30)
                let backStimulus = GLOBAL.stimulus.slice(15, 30)
                let backTrial_index = GLOBAL.test2_trial_index.slice(15, 30)
                let array4 = Array.from({length: 15}, (item, index) => index)
                let array5 = Array.from({length: 15}, (item, index) => index)
                let array6 = Array.from({length: 15}, (item, index) => index)
                let array7 = Array.from({length: 15}, (item, index) => index)

                //打乱音频数组，正确答案数组，正确文本数组下标，使用乱序下标进行交换
                for (let i = 14; i >= 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [array4[i], array4[j]] = [array4[j], array4[i]];
                    [array5[i], array5[j]] = [array5[j], array5[i]];
                    [array6[i], array6[j]] = [array6[j], array6[i]];
                    [array7[i], array7[j]] = [array7[j], array7[i]];
                }
                for (let i = 0; i <= 14; i++) {
                    array4[i] = backAudio[array4[i]]
                    array5[i] = backCorr_ans[array5[i]]
                    array6[i] = backStimulus[array6[i]]
                    array7[i] = backTrial_index[array7[i]]
                }
                backAudio = array4
                backCorr_ans = array5
                backStimulus = array6
                backTrial_index = array7

                GLOBAL.test2_audio8 = frontAudio.concat(backAudio)
                GLOBAL.corr_ans = frontCorr_ans.concat(backCorr_ans)
                GLOBAL.stimulus = frontStimulus.concat(backStimulus)
                GLOBAL.test2_trial_index = frontTrial_index.concat(backTrial_index)
            },
            //每小题提交结果，保存结果到choice数组，然后更改isshow值
            start() {
                this.isshow=false
                this.playAudio()
            },
            //改变录音播放按钮
            //提示音频和录音的播放
            playAudio() {
                this.isActive1=false
                this.isActive2=false
                this.isActive3=false
                let audio = new Audio(GLOBAL.test2_audio8.shift())
                audio.play()
                this.startDate = new Date();//开始时间，用于计算针对单个词的反应时间
                // 录音播放完毕即开启30s倒计时
                audio.addEventListener("ended", ()=>{this.timerFun()})
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
            makeChoice(choice) {
                setTimeout(()=>{this.canClick=false}, 50)
                clearInterval(this.timer)
                this.now=this.now+1
                this.valueOpt=choice
                // 用户30s内做出了选择
                if (choice !== " ") {
                    this.endDate = new Date()
                    this.react_time=this.endDate.getTime()-this.startDate.getTime()
                    GLOBAL.rt1.push(this.react_time)
                    GLOBAL.user_ans1.push(this.valueOpt)
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
                if(GLOBAL.test2_audio8.length===0) {
                    setTimeout(() => {
                        this.score()
                        this.endDate1 = new Date()
                        GLOBAL.time_elapsed1 = this.endDate1.getTime() - this.startDate1.getTime()
                        this.$router.push('/test2final');
                    }, 1000)
                }
            },
            //计算测试一得分
            score() {
                for( let i=0;i<30;i++) {
                    if(GLOBAL.corr_ans[i]===GLOBAL.user_ans1[i]) {
                        GLOBAL.score1++
                        this.score1++
                        GLOBAL.correct1.push(1)
                    } else {
                        GLOBAL.correct1.push(0)
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