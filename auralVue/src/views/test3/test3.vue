<template>

    <div>
        <learn-three v-if="studyFlag&&audios&&imgs"
                     :imgs="imgs"
                     :audios="audios"
                     :clickTimes="clickTimes"
                     @learnFinished="goToTestThree"></learn-three>

        <test-three v-if="!studyFlag&&audios&&imgs"
                    :audios="audios"></test-three>
<!--        <test-three></test-three>-->
    </div>

</template>

<script>

    import learnThree from "../../components/testThree/learnThree";
    import testThree from "../../components/testThree/testThree";
    import global_variable from "@/plugins/global_variable";

    export default {
        name: "test3",
        components:{
            learnThree,
            testThree
        },
        data(){
            return {
                studyFlag:true,
                imgs:[],
                audios:[],
              imgsA:[
                {imgIndex: 1, imgSrc: require("../../assets/image/Test3/learn/A/L1_a dog.jpg"), imgDes: "grotuvas"},
                {imgIndex: 2, imgSrc: require("../../assets/image/Test3/learn/A/L2_a dog is running.jpg"), imgDes: "grotuvas bega"},
                {imgIndex: 3, imgSrc: require("../../assets/image/Test3/learn/A/L3_three dogs are running.jpg"), imgDes: "grotuvai bega"},
                {imgIndex: 4, imgSrc: require("../../assets/image/Test3/learn/A/L4_a horse.jpg"), imgDes: "plaktukas"},
                {imgIndex: 5, imgSrc: require("../../assets/image/Test3/learn/A/L5_a horse is sleeping.jpg"), imgDes: "plaktukas miega"},

                {imgIndex: 6, imgSrc: require("../../assets/image/Test3/learn/A/L6_two horses are sleeping.jpg"), imgDes: "plaktukai miega"},
                {imgIndex: 7, imgSrc: require("../../assets/image/Test3/learn/A/L7_a dog is eating.jpg"), imgDes: "grotuvas verda"},
                {imgIndex: 8, imgSrc: require("../../assets/image/Test3/learn/A/L8_a dog is not eating.jpg"), imgDes: "grotuvas verdane"},
                {imgIndex: 9, imgSrc: require("../../assets/image/Test3/learn/A/L9_three horses are eating.jpg"), imgDes: "plaktukai verda"},
                {imgIndex: 10, imgSrc: require("../../assets/image/Test3/learn/A/L10_three horses are not eating.jpg"), imgDes: "plaktukai verdane"},

                {imgIndex: 11, imgSrc: require("../../assets/image/Test3/learn/A/L11_a dog is not sleeping.jpg"), imgDes: "grotuvas miegane"},
                {imgIndex: 12, imgSrc: require("../../assets/image/Test3/learn/A/L12_two dogs are not sleeping.jpg"), imgDes: "grotuvai miegane"},
                {imgIndex: 13, imgSrc: require("../../assets/image/Test3/learn/A/L13_a horse is not running.jpg"), imgDes: "plaktukas begane"},
                {imgIndex: 14, imgSrc: require("../../assets/image/Test3/learn/A/L14_two horses are not running.jpg"), imgDes: "plaktukai begane"},
                {imgIndex: 15, imgSrc: require("../../assets/image/Test3/learn/A/L15_a blue dog is sleeping.jpg"), imgDes: "grotuvas melyn miega"},

                {imgIndex: 16, imgSrc: require("../../assets/image/Test3/learn/A/L16_three yellow horses are running.jpg"), imgDes: "plaktukai gelton bega"},
                {imgIndex: 17, imgSrc: require("../../assets/image/Test3/learn/A/L17_two yellow dogs are eating.jpg"), imgDes: "grotuvai gelton verda"},
                {imgIndex: 18, imgSrc: require("../../assets/image/Test3/learn/A/L18_a blue horse is not eating.jpg"), imgDes: "plaktukas melyn verdane"},
                {imgIndex: 19, imgSrc: require("../../assets/image/Test3/learn/A/L19_two blue dogs are not sleeping.jpg"), imgDes: "grotuvai melyn miegane"},
                {imgIndex: 20, imgSrc: require("../../assets/image/Test3/learn/A/L20_a yellow horse is not running.jpg"), imgDes: "plaktukas gelton begane"}

              ],
              imgsB:[
                {imgIndex: 1, imgSrc: require("../../assets/image/Test3/learn/B/L1_a woman.jpg"), imgDes: "kirpeja"},
                {imgIndex: 2, imgSrc: require("../../assets/image/Test3/learn/B/L2_a woman painted.jpg"), imgDes: "kirpeja rase"},
                {imgIndex: 3, imgSrc: require("../../assets/image/Test3/learn/B/L3_a man painted.jpg"), imgDes: "kirpejas rase"},
                {imgIndex: 4, imgSrc: require("../../assets/image/Test3/learn/B/L4_a grandpa.jpg"), imgDes: "virejas"},
                {imgIndex: 5, imgSrc: require("../../assets/image/Test3/learn/B/L5_a grandpa planted.jpg"), imgDes: "virejas taise"},

                {imgIndex: 6, imgSrc: require("../../assets/image/Test3/learn/B/L6_a grandma planted.jpg"), imgDes: "vireja taise"},
                {imgIndex: 7, imgSrc: require("../../assets/image/Test3/learn/B/L7_a woman watered.jpg"), imgDes: "kirpeja valge"},
                {imgIndex: 8, imgSrc: require("../../assets/image/Test3/learn/B/L8_a woman will water.jpg"), imgDes: "kirpeja valgelo"},
                {imgIndex: 9, imgSrc: require("../../assets/image/Test3/learn/B/L9_a grandpa watered.jpg"), imgDes: "virejas valge"},
                {imgIndex: 10, imgSrc: require("../../assets/image/Test3/learn/B/L10_a grandpa will water.jpg"), imgDes: "virejas valgelo"},

                {imgIndex: 11, imgSrc: require("../../assets/image/Test3/learn/B/L11_a woman will plant.jpg"), imgDes: "kirpeja taiselo"},
                {imgIndex: 12, imgSrc: require("../../assets/image/Test3/learn/B/L12_a man will plant.jpg"), imgDes: "kirpejas taiselo"},
                {imgIndex: 13, imgSrc: require("../../assets/image/Test3/learn/B/L13_a grandma will paint.jpg"), imgDes: "vireja raselo"},
                {imgIndex: 14, imgSrc: require("../../assets/image/Test3/learn/B/L14_a grandpa will paint.jpg"), imgDes: "virejas raselo"},
                {imgIndex: 15, imgSrc: require("../../assets/image/Test3/learn/B/L15_a woman planted inside.jpg"), imgDes: "kirpeja viduje taise"},

                {imgIndex: 16, imgSrc: require("../../assets/image/Test3/learn/B/L16_a grandpa will paint insdie.jpg"), imgDes: "virejas viduje raselo"},
                {imgIndex: 17, imgSrc: require("../../assets/image/Test3/learn/B/L17_a man will water outside.jpg"), imgDes: "kirpejas lauke valgelo"},
                {imgIndex: 18, imgSrc: require("../../assets/image/Test3/learn/B/L18_a grandma watered outsdie.jpg"), imgDes: "vireja lauke valge"},
                {imgIndex: 19, imgSrc: require("../../assets/image/Test3/learn/B/L19_a man will plant inside.jpg"), imgDes: "kirpejas viduje taiselo"},
                {imgIndex: 20, imgSrc: require("../../assets/image/Test3/learn/B/L20_a woman painted outside.jpg"), imgDes: "kirpeja lauke rase"},
                  ],

                testType:null,
                clickTimes:[0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0],//点击次数，用于分析
                timeElapsedStart:Date.now()
            }
        },
        created() {
          this.AorB();
          //console.log(this.imgs)


          let AudioSrcList = []
          // 学习音频 20个
          for (let i = 0; i < 20; i++) {
            let audioitem = new Audio()
            let src = require("../../assets/audio/Test3/"+this.testType+"/learning/" + (i + 1) + ".mp3")
            AudioSrcList.push(src)
          }
          // AudioSrcList.push("http://139.186.128.135:8181/test3/audio/page1-1.mp4")
          // AudioSrcList.push("http://139.186.128.135:8181/test3/audio/page1-2.mp4")
          // AudioSrcList.push("http://139.186.128.135:8181/test3/audio/page2-1.mp4")
          // AudioSrcList.push("http://139.186.128.135:8181/test3/audio/page2-2.mp4")
          // AudioSrcList.push("http://139.186.128.135:8181/test3/audio/page-last.mp4")

          //提示音音频 7个
          let src1 = require("../../assets/audio/Test3/Tip/page1-1.mp3")
          let src2 = require("../../assets/audio/Test3/Tip/page1-2.mp3")
          let src3 = require("../../assets/audio/Test3/Tip/page2-1.mp3")
          let src4 = require("../../assets/audio/Test3/Tip/page2-2.mp3")
          let src5 = require("../../assets/audio/Test3/Tip/page3.mp3")
          let src6 = require("../../assets/audio/Test3/Tip/page4.mp3")
          let src7 = require("../../assets/audio/Test3/Tip/page_last.mp3")

          AudioSrcList.push(src1)
          AudioSrcList.push(src2)
          AudioSrcList.push(src3)
          AudioSrcList.push(src4)
          AudioSrcList.push(src5)
          AudioSrcList.push(src6)
          AudioSrcList.push(src7)

          //let BaseSrc = "../../assets/audio/Test3/"+this.testType+"/test/"
          //测试答案音频一共为30x4 = 120个
          for(let i = 1;i < 31; i++){
            let SrcA = require("../../assets/audio/Test3/"+this.testType+"/test/"+this.testType+"_T"+i+"_A.mp3")
            let SrcB = require("../../assets/audio/Test3/"+this.testType+"/test/"+this.testType+"_T"+i+"_B.mp3")
            let SrcC = require("../../assets/audio/Test3/"+this.testType+"/test/"+this.testType+"_T"+i+"_C.mp3")
            let SrcD = require("../../assets/audio/Test3/"+this.testType+"/test/"+this.testType+"_T"+i+"_D.mp3")
            AudioSrcList.push(SrcA)
            AudioSrcList.push(SrcB)
            AudioSrcList.push(SrcC)
            AudioSrcList.push(SrcD)
          }
          console.log(AudioSrcList.length)

          //装学习图片的音频
          // for (let i = 0; i < 20; i++) {
          //   let item = {
          //     audioIndex: null,
          //     audioSrc: null,
          //   }
          //   item.audioIndex = i + 1
          //   item.audioSrc = AudioSrcList[i]
          //   this.audios.push(item)
          // }
          let count = 1; //控制每四个音频为一道题
          let h = 1;  //每个答案的des记录，一道题des是一样的
          //装载答案的音频
          for(let i = 0;i < AudioSrcList.length;i++){
              let item = {
              audioIndex: null,
              audioSrc: null,
              audioDes: null
            }
            item.audioIndex = i + 1
            item.audioSrc = AudioSrcList[i]



            if(i==20){
              item.audioDes = "1-1"
            }
            if(i==21){
              item.audioDes = "1-2"
            }
            if(i==22){
              item.audioDes = "2-1"
            }
            if(i==23){
              item.audioDes = "2-2"
            }
            if(i==24){
              item.audioDes = "3-1"
            }
            if(i==25){
              item.audioDes = "4-1"
            }
            if(i==26){
              item.audioDes = "last"
            }
            if(i>26&&h<=30){
              item.audioDes = h;
              count++;
            }
            console.log(item)
            this.audios.push(item)
            if(count == 5){
              h++;
              count = count%4
            }


          }


          // axios.get("/testThree/testThreeImgs").then((response)=>{
          //   //this.imgs = response.data
          //   let result = response.data
          //   localStorage.setItem('imgs',JSON.stringify(result))
          //   this.imgs = JSON.parse(localStorage.getItem('imgs'))
          //   console.log("imgs"+this.imgs)
          // })

          //请求音频数据
          // axios.get("/testThree/testThreeAudios").then((response)=>{
          //   let result = response.data
          //   localStorage.setItem('audios',JSON.stringify(result))
          //   this.audios = JSON.parse(localStorage.getItem('audios'))
          //   console.log("audios"+this.audios)
          // })
        },
        methods:{
            goToTestThree(){
                this.studyFlag = false
            },
            AorB(){
              //var type = localStorage.getItem('test3Type')
            var type = localStorage.getItem('test1Type')
            //console.log('上一次试卷为'+type)
            if(type != null){
                this.testType = type
              if(this.testType == 'A'){
                this.imgs = this.imgsA
              }
              else {
                this.imgs = this.imgsB
              }
              console.log('当前为试卷'+this.testType)
            }
            else {
              let type2 = null
              axios.get("/testThree/findExpType",{params:{'email':global_variable.email}}).then((response)=>{
                type2 = JSON.parse(response.data)
                console.log(type2)
              })
              console.log("数据库中上一次的试卷类型为："+type2)

              if(type2!=null){
                if (type2 == 'A') {
                  this.testType = 'B'
                  this.imgs = this.imgsB
                } else {
                  this.testType = 'A'
                  this.imgs = this.imgsA
                }
                console.log('当前为试卷' + this.testType)
              }

              else{
                var seed = Math.round(Math.random() * 10 + 1)
                console.log('seed:' + seed)
                if (seed > 5) {
                  this.imgs = this.imgsB
                  // global_variable.testType = 'B'
                  this.testType = 'B'
                  console.log('当前为试卷' + this.testType)
                }
                else {
                  this.imgs = this.imgsA
                  // global_variable.testType = 'A'
                  this.testType = 'A'
                  console.log('当前为试卷' + this.testType)
                }

              }
            }
            localStorage.setItem('test3Type', this.testType) //存储当前试卷类型
          }
        }
    }
</script>

<style scoped>

</style>