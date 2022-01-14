<template xmlns:width="http://www.w3.org/1999/xhtml">
  <div class="container">
    <div class="header">

    </div>
    <div class="content">
      <div class="left"></div>
      <div class="center" id="record-top">
        <!--这里需要是固定的组件-->

        <el-row>
          <el-col :span="11"></el-col>
          <el-col :span="13">
            <div class="row-play" >
              <el-button class="confirm" type="primary" :disabled="true"  >播放</el-button>

              <!-- 淡入方式1：el-fade-in-linear -->
              <transition name="el-fade-in-linear">
                <img class="animate.active" src="../../../../assets/audio/test4/audio/part1/record/arrow/arrow_horizen_left.png"
                     v-show="isShow1" width="100px" />
              </transition>

            </div>
          </el-col>


        </el-row>



<!--这里需要进行路由器导入-->
        <el-row style="margin-bottom: 0px">

          <el-col :span="8">
            <div class="row">

              <div class="rowline" >
                <transition name="el-fade-in-linear">
                <h4 class="confirm" style="padding-left: 20px;font-size: 20px" v-show="isbtn1show">假词1</h4>
                </transition>
                <el-button  class="confirm"  :disabled="true" v-show="isbtn1show">开始录音假词1</el-button>

              </div>


              <div class="rowline" >
                <transition name="el-fade-in-linear">
                <h4 class="confirm" style="padding-left: 20px;font-size: 20px"  v-show="isbtn2show">假词2</h4>
                </transition>
                <el-button class="confirm" :disabled="true"  v-show="isbtn2show">开始录音假词2</el-button>

              </div>


            </div>

            <div class="row">
              <transition name="el-fade-in-linear">
              <img  v-show="isShow2" src="../../../../assets/audio/test4/audio/part1/record/arrow/arrow_right.png" width="100px">
              </transition>
              <div style="width: 400px"></div>
              <transition name="el-fade-in-linear">
              <img v-show="isShow3" src="../../../../assets/audio/test4/audio/part1/record/arrow/arrow_left.png" width="100px">
              </transition>
            </div>
          </el-col>

        </el-row>






        <div class="row" style="padding-left:1000px">
          <transition name="el-fade-in-linear">
          <img v-show="isShow4" src="../../../../assets/audio/test4/audio/part1/record/arrow/arrow_horizen.png" width="100px" >
          </transition>
          <el-button class="confirm" type="primary" :disabled="true">提交</el-button>
        </div>
        <div class="row" id="record-bottom">
          <el-button class="confirm" type="primary" @click="listen_again">重听</el-button>
          <el-button class="confirm" type="primary" @click="study" :disabled="show">开始</el-button>

        </div>

      </div>
      <div class="right"></div>
    </div>
    <div class="footer"></div>
  </div>

</template>


<script>
//import GLOBAL from './../../../plugins/global_variable'
import GLOBAL from "@/plugins/global_variable";

export default {
  name: "Train_part1",
  data() {
    return {


      show: true,
      audios: [],
      audio:'',
      recordedtype:'',
      //时间工具用于再特定时间内显示箭头内容
      time:0,
      //箭头的淡入淡出
      isShow1:false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
      //按钮的淡入淡出
      isbtn1show:false,
      isbtn2show:false,



    }
  },
  methods: {

    fadeIn() {
      this.isShow1 = !this.isShow1;
      console.log(this.isShow1)
    },
    countup(){
      this.time ++
    },
    study() {

      this.$router.push({name:'录音训练页面',params:{record_group:GLOBAL.record_group,record_session:GLOBAL.record_session}});

    },
    listen_again()
    {
      //目前点击重听的话，就不能点击开始
      this.show=true;
      //将之前的音频暂停
      this.audio.pause();
      this.isbtn1show = false,
          this.isbtn2show = false,
      this.isShow1=false,
      this.isShow2=false,
          this.isShow3=false,
        this.isShow4=false,

          this.time = 0

      // //重新深度拷贝
      this.audio = new Audio(require('@/assets/audio/test4/audio/part1/record/tip3.mp3'));
      this.audio.addEventListener("ended", this.order_play); //回调一下 播放好显示按键
      //播放音频
      this.audio.play();

    },


    order_play() {
      this.show=false;
    },
    get_record_info(){
      var _this =this;
      GLOBAL.record_group =localStorage.getItem('test1Type')
      GLOBAL.record_session = GLOBAL.Session
      // axios.get('test4record/send_recordInfo/'+GLOBAL.email).then(function (resp) {
      //   //获取相应的数据信息
      //   _this.recordedtype = resp.data
      //
      //   if (_this.recordedtype.search('A') == 0){
      //     GLOBAL.record_group = 'B'
      //     GLOBAL.record_session = 'second'
      //
      //   } else  if (_this.recordedtype.search('B') == 0){
      //     GLOBAL.record_group = 'A'
      //     GLOBAL.record_session = 'second'
      //   } else {
      //
      //     //随机定一个测试组
      //     // var record = ['A','B']
      //     // record.sort(function(){
      //     //   return Math.random()-0.5;
      //     // });
      //     //直接取第一位
      //
      //     //GLOBAL.record_group = record[0]
      //
      //
      //   }
      //
      // });
    }

  },
  created() {//生命周期函数


    this.get_record_info()
    console.log(GLOBAL.record_group)


    this.audio = new Audio(require('@/assets/audio/test4/audio/part1/record/tip3.mp3'));
   // console.log( this.audio)
    this.audio.play();
    //播放音频
    this.audio.addEventListener("ended", this.order_play);

    document.body.style.backgroundColor="#DCDCDC";


  },
  mounted() {


    setInterval(this.countup,1000);

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });

  },
  watch:{
    'time':function (newVal,oldVal){
      if (newVal==1){

        this.isShow1 = !this.isShow1;
      }
      if (newVal==13){
        this.isbtn1show = !this.isbtn1show;
        this.isShow2 = !this.isShow2;

      }
      if (newVal==13){
        this.isbtn2show = !this.isbtn2show;
        this.isShow3 = !this.isShow3;

      }
      if (newVal==25){

        this.isShow4 = !this.isShow4;
      }
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
  margin-bottom:80px
}
.left,.right{
  width:400px;
}
.center{
  flex: 1;
}

.confirm{
  font-size:18px;
  font-weight:500;
}
.row {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.rowline{
  display:inline-block;
  vertical-alinge:middle;
  line-height:10px;

}
.row-play{
  height: 100px;
  display: flex;

  align-items: center;

}

</style>