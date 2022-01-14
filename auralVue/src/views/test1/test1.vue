<template>
  <div>
    <nav-header></nav-header>

    <learn-one v-if="studyFlag&&audios&&imgs"
               :imgs="imgs"
               :audios="audios"
               :clickTimes="clickTimes"
               @learnFinished="goToTestOne"></learn-one>

    <test-one v-if="(!studyFlag)&&audios&&imgs"
              :imgs="imgs"
              :clickTimes="clickTimes"
              :audios="audios" ></test-one>
    <nav-footer></nav-footer>


  </div>

</template>

<script>
import navHeader from '../../components/Header'
import navFooter from '../../components/Footer'
import learnOne from '../../components/testOne/learnOne'
import testOne from '../../components/testOne/testOne'
import GLOBAL from "@/plugins/global_variable";

export default {

  name: "test1",
  components:{
    navHeader,
    navFooter,
    learnOne,
    testOne
  },
  data(){
    return {
      studyFlag: true,
      audios: [],
      clickTimes: [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],//点击次数，用于分析
      testType:'',
      imgs:[],
      imgsA: [
        {imgIndex: 1, imgSrc: require("../../assets/image/Test1/A/1.jpeg"), stimulus: "alk"},
        {imgIndex: 2, imgSrc: require("../../assets/image/Test1/A/2.jpg"), stimulus: "bėk"},
        {imgIndex: 3, imgSrc: require("../../assets/image/Test1/A/3.jpeg"), stimulus: "dek"},
        {imgIndex: 4, imgSrc: require("../../assets/image/Test1/A/4.jpeg"), stimulus: "imk"},
        {imgIndex: 5, imgSrc: require("../../assets/image/Test1/A/5.jpg"), stimulus: "lėk"},

        {imgIndex: 6, imgSrc: require("../../assets/image/Test1/A/6.jpg"), stimulus: "lok"},
        {imgIndex: 7, imgSrc: require("../../assets/image/Test1/A/7.jpeg"), stimulus: "sek"},
        {imgIndex: 8, imgSrc: require("../../assets/image/Test1/A/8.jpg"), stimulus: "šuo"},
        {imgIndex: 9, imgSrc: require("../../assets/image/Test1/A/9.jpg"), stimulus: "vyk"},
        {imgIndex: 10, imgSrc: require("../../assets/image/Test1/A/10.jpeg"), stimulus: "lai"},

        {imgIndex: 11, imgSrc: require("../../assets/image/Test1/A/11.jpeg"), stimulus: "burė"},
        {imgIndex: 12, imgSrc: require("../../assets/image/Test1/A/12.jpeg"), stimulus: "gėlė"},
        {imgIndex: 13, imgSrc: require("../../assets/image/Test1/A/13.jpg"), stimulus: "kasa"},
        {imgIndex: 14, imgSrc: require("../../assets/image/Test1/A/14.jpg"), stimulus: "lapė"},
        {imgIndex: 15, imgSrc: require("../../assets/image/Test1/A/15.jpeg"), stimulus: "musė"},

        {imgIndex: 16, imgSrc: require("../../assets/image/Test1/A/16.jpeg"), stimulus: "ožys"},
        {imgIndex: 17, imgSrc: require("../../assets/image/Test1/A/17.jpg"), stimulus: "pala"},
        {imgIndex: 18, imgSrc: require("../../assets/image/Test1/A/18.jpg"), stimulus: "sagė"},
        {imgIndex: 19, imgSrc: require("../../assets/image/Test1/A/19.jpg"), stimulus: "lova"},
        {imgIndex: 20, imgSrc: require("../../assets/image/Test1/A/20.jpg"), stimulus: "žolė"}
      ],


      imgsB:[
        {imgIndex: 1, imgSrc: require("../../assets/image/Test1/B/1.jpeg"), stimulus: "auk"},
        {imgIndex: 2, imgSrc: require("../../assets/image/Test1/B/2.jpg"), stimulus: "dėk"},
        {imgIndex: 3, imgSrc: require("../../assets/image/Test1/B/3.jpg"), stimulus: "eik"},
        {imgIndex: 4, imgSrc: require("../../assets/image/Test1/B/4.jpg"), stimulus: "jau"},
        {imgIndex: 5, imgSrc: require("../../assets/image/Test1/B/5.jpg"), stimulus: "lis"},

        {imgIndex: 6, imgSrc: require("../../assets/image/Test1/B/6.jpg"), stimulus: "mik"},
        {imgIndex: 7, imgSrc: require("../../assets/image/Test1/B/7.jpeg"), stimulus: "nei"},
        {imgIndex: 8, imgSrc: require("../../assets/image/Test1/B/8.jpg"), stimulus: "peš"},
        {imgIndex: 9, imgSrc: require("../../assets/image/Test1/B/9.jpeg"), stimulus: "pyk"},
        {imgIndex: 10, imgSrc: require("../../assets/image/Test1/B/10.jpg"), stimulus: "veš"},

        {imgIndex: 11, imgSrc: require("../../assets/image/Test1/B/11.jpeg"), stimulus: "ačiū"},
        {imgIndex: 12, imgSrc: require("../../assets/image/Test1/B/12.jpeg"), stimulus: "ežys"},
        {imgIndex: 13, imgSrc: require("../../assets/image/Test1/B/13.jpeg"), stimulus: "gyva"},
        {imgIndex: 14, imgSrc: require("../../assets/image/Test1/B/14.jpg"), stimulus: "kėdė"},
        {imgIndex: 15, imgSrc: require("../../assets/image/Test1/B/15.jpg"), stimulus: "lėlė"},

        {imgIndex: 16, imgSrc: require("../../assets/image/Test1/B/16.jpg"), stimulus: "saga"},
        {imgIndex: 17, imgSrc: require("../../assets/image/Test1/B/17.jpeg"), stimulus: "oras"},
        {imgIndex: 18, imgSrc: require("../../assets/image/Test1/B/18.jpg"), stimulus: "ritė"},
        {imgIndex: 19, imgSrc: require("../../assets/image/Test1/B/19.jpg"), stimulus: "šaka"},
        {imgIndex: 20, imgSrc: require("../../assets/image/Test1/B/20.jpg"), stimulus: "žemė"}
      ]
    }
  },
  created() {
    this.AorB()
    console.log(this.imgs)

    //请求音频数据

    let AudioSrcList = []
    for (let i = 0; i < 20; i++) {
      let audioitem = new Audio()
      let src = require("../../assets/audio/Test1/"+this.testType+'/' + (i + 1) + ".mp3")
      AudioSrcList.push(src)
    }
    let Tipsrc1_1 = require("../../assets/audio/Test1/test1-1.mp3")
    let Tipsrc2_1 = require("../../assets/audio/Test1/test2-1.mp3")
    let Tipsrc3_1 = require("../../assets/audio/Test1/test3-1.mp3")
    let Tipsrc3_2 = require("../../assets/audio/Test1/test3-2.mp3")
    AudioSrcList.push(Tipsrc1_1)
    AudioSrcList.push(Tipsrc2_1)
    AudioSrcList.push(Tipsrc3_1)
    AudioSrcList.push(Tipsrc3_2)

    for (let i = 0; i < AudioSrcList.length; i++) {
      let item = {
        audioIndex: null,
        audioSrc: null
      }
      item.audioIndex = i + 1
      item.audioSrc = AudioSrcList[i]
      this.audios.push(item)
    }

    console.log(this.audios)



  },
  methods: {
    goToTestOne() {
      this.studyFlag = false
    },
    AorB(){
      //this.testType = localStorage.getItem("test1Type")
      //console.log(this.testType)
      var type = GLOBAL.testType
      console.log('上次测试的材料类型：'  + type);
      if(type.length != 0){
        GLOBAL.Session = 'second';
        console.log('Session: ' + GLOBAL.Session);
        //第二次做试卷
        if(type == 'A'){
          this.testType = 'B'
          this.imgs = this.imgsB
        }
        else {
          this.testType = 'A'
          this.imgs = this.imgsA
        }
        console.log('当前为试卷'+this.testType)
      }
      else {
        GLOBAL.Session = 'first';
        console.log('Session: ' + GLOBAL.Session);
        var seed = Math.round(Math.random() * 10 + 1)
        console.log('seed:' + seed)
        if (seed > 5) {
          this.imgs = this.imgsB
          this.testType = 'B'
          console.log('当前为试卷' + this.testType)
        }
        else {
          this.imgs = this.imgsA
          this.testType = 'A'
          console.log('当前为试卷' + this.testType)
        }
      }
      localStorage.setItem('test1Type', this.testType) //存储当前试卷类型

    }
  }
}
</script>

<style scoped>

</style>