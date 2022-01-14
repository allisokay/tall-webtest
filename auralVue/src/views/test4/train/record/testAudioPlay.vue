<template>
  <div class="container">
    <div class="header">
      <el-progress :text-inside="true" :stroke-width="24"
                   :percentage="(this.pos/(this.record_content.length)*100).toFixed(0)*1"
                   status="success"></el-progress>
      <div class="el-row">
        <h2 style="color: orangered">这部分测试不能记笔记</h2> <br>
      </div>
      <div class="el-row">
        <h2 style="color: orangered">每个假词的录音时限为1.5秒,请点击录音后立即发音,可以再次点击“录音”重录。</h2>
      </div>

    </div>

    <div class="content">
      <div class="left"></div>
      <div class="center">
        <div class="el-row">
          <h2 v-model="this.pos">测试</h2>
          <h2 v-model="this.num"></h2>
        </div>
        <div class="row">
          <el-button class="confirm" type="primary" :disabled="playshow" @click="audio_play">播放</el-button>
        </div>

        <div class="row-text">
          <span  v-if="!show" v-for="(item,index) in btn_content" :key="index" v-model="btn_content[index]">假词{{ index + 1 }}({{notActive[index]}})</span>
        </div>

        <div class="row">

          <el-button  v-if="!show" class="confirm"  v-for="(item,index) in btn_content" :key="index" :type="isActive[index]"
                      :disabled="unclickable[index]"     v-model="btn_content[index]" @click="click_letter(index,$event)">{{ item }}假词{{ index + 1 }}
          </el-button>

        </div>
        <div class="row">
        <el-button class="confirm" type="primary" :disabled="show" @click="send(30)" style="margin-left: 100%">提交</el-button>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="footer"></div>
  </div>


</template>

<script>
import GLOBAL from "@/plugins/global_variable";
import Recorder from "js-audio-recorder";
import saveAs from 'file-saver';
//设置录音参数
//用于保存文件
var FileSaver = require('file-saver');
//用于把音频转成mp3
const lamejs = require('lamejs')
//用于录音和保存
const recorder = new Recorder({

  sampleBits: 16, // 采样位数，支持 8 或 16，默认是16

  sampleRate: 48000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000

  numChannels: 1, // 声道，支持 1 或 2， 默认是1

// compiling: false,(0.x版本中生效,1.x增加中) // 是否边录边转换，默认是false

})

// 绑定事件-打印的是当前录音数据

recorder.onprogress = function (params) {
  //
  // console.log('--------------START---------------')
  //
  // console.log('录音时长(秒)', params.duration);
  //
  // console.log('录音大小(字节)', params.fileSize);
  //
  // console.log('录音音量百分比(%)', params.vol);
  //
  // console.log('当前录音的总数据([DataView, DataView...])', params.data);
  //
  //
  // console.log('--------------END---------------')

}
export default {
  name: "testAudioPlay",

  data() {
    return {

      //记录当前索引
      pos: 0,
      //记录当前索引的录音数量
      num: 0,
      //记录当前索引的录音url
      src: '',
      //记录当前索引的音频播放器
      audio: '',
      //记录当前页面停留时间 超过30s自动提交跳转
      limit_time: 30,
      //用于文件保存
      blobs: [],
      //存放音频数组
      record_content: [],
      //按键信息
      btn_content: [],
      //是否可以点击
      show: true,
      //提示音 （已经舍弃）
      //tip_audio: new Audio(require("@/assets/audio/test4/audio/part1/record/B/endtip.mp3")),
      //内部执行函数
      interval:null,
      //给按钮是否激活颜色
      isActive:["","","","","","",""],
      //是否可以点击
      unclickable:[false,false,false,false,false,false,false],
      //记录播放次数
      playtimes:0,
      //给按钮是否激活颜色
      notActive:["未录音","未录音","未录音","未录音","未录音","未录音","未录音"],
      //setTime 控制
      st:null,
      //播放按钮只能点击一次
      playshow:false,
    };
  },
  methods: {
    //由于setInterval系统本身的问题 所以需要手动重置
    resetItv(){


      console.log("清itv")
      clearInterval(this.interval);
      this.interval = setInterval(this.countdown,1000);
    },
    //每次减少1 30s后直接跳转
    countdown() {
      this.limit_time--;
      console.log(this.limit_time)
    },
    //播放按钮点击后播放音频
    audio_play() {

      this.playshow = true
      if (this.playtimes == 0){
        //这里的60是用于刷新一开始的计数 60s大于最大播放音频时间  不会产生问题
        this.limit_time = 60
        this.playtimes = 1
      }

      this.resetItv()
      this.audio.pause();
      this.audio = new Audio(require("@/assets/audio/test4/audio/part1/record/" + GLOBAL.record_group + "/" + this.src + ".mp3")); //替换音频的时候src要改
      this.audio.addEventListener("ended", this.order_play); //回调一下 播放好显示按键
      //先把自动播放关一下
      this.audio.play();
    },
    order_play() {
      //this.tip_audio.play()
      //如果按钮没有显示出来说明是第一次听或第一次还没听完  听完一次show会为false
      if(this.show == true){
        this.resetItv()

      }
      this.limit_time = 60
      this.resetItv()
      this.show = false;

    },
    send(time) {
      //保存录音数据  全部获取后再发送
      //清除内部循环
      //clearInterval(this.interval)
      this.resetItv()

      console.log("pos", this.pos)
      //如果已经到设定组长度3  就跳转
      if (this.pos == 16) {
        clearInterval(this.interval)
        //跳转到 测试
        console.log("测试结束", this.pos)
        this.recordsave()
        this.$router.push('/Part1result')
      } else {
        //对属性初始化
        this.playshow = false
        this.playtimes = 0,
            this.isActive=["","","","","","",""],
            this.notActive=["未录音","未录音","未录音","未录音","未录音","未录音","未录音"],
        this.limit_time = time
        this.show = true;
        this.btn_content = []
        //测试使用

        this.recordsave()
        //值赋予
        console.log("测试继续", this.pos)
        this.pos += 1
        this.num = this.record_content[this.pos]["num"]
        this.src = this.record_content[this.pos]["src"]

        for (var i = 0; i < this.num; i++) {
          this.btn_content[i] = '开始录音'
          this.blobs.length = this.num
          this.blobs[i] = null
        }
        //继续再这个页面 测试

        console.log(this.pos)


      }
    },
    click_letter(i,e) {
      let _this = this

      //  对其他的按钮进行禁用
      _this.unclickable=[true,true,true,true,true,true,true]
      // 启用当前按钮
      _this.unclickable[i]=false
      _this.notActive[i] = '已录音'
      _this.isActive[i] = 'primary'


      console.log(this.btn_content)

      if (_this.btn_content[i] == '开始录音') {

        _this.$set(_this.btn_content, i, '正在录音')

        // 开始录音
        recorder.start().then(() => {
        }, (error) => {
          // 生成出错信息
          console.log(`${error.name} : ${error.message}`);
        });

        //控制2s时间
       _this.st = setTimeout(() => {

          _this.blobs[i] = _this.convertToMp3(recorder.getWAV());

          _this.$set(_this.btn_content, i, '开始录音')
          _this.unclickable=[false,false,false,false,false,false,false]
          console.log("st停止了")
        }, 1500);   //1.5s

      } else if (_this.btn_content[i] == '正在录音') {
        clearTimeout(_this.st);
        _this.blobs[i] = _this.convertToMp3(recorder.getWAV());
        //这个状态下要恢复可点击
        _this.unclickable=[false,false,false,false,false,false,false]
        _this.$set(_this.btn_content, i, '开始录音')
      }


    },
    //将获取wav换成mp3
    convertToMp3(wavDataView) {

// 获取wav头信息

      const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置

      const {channels, sampleRate} = wav;

      const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);

// 获取左右通道数据

      const result = recorder.getChannelData()

      const buffer = [];


      const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);

      const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);

      const remaining = leftData.length + (rightData ? rightData.length : 0);


      const maxSamples = 1152;

      for (let i = 0; i < remaining; i += maxSamples) {

        const left = leftData.subarray(i, i + maxSamples);

        let right = null;

        let mp3buf = null;


        if (channels === 2) {

          right = rightData.subarray(i, i + maxSamples);

          mp3buf = mp3enc.encodeBuffer(left, right);

        } else {

          mp3buf = mp3enc.encodeBuffer(left);

        }


        if (mp3buf.length > 0) {

          buffer.push(mp3buf);

        }

      }


      const enc = mp3enc.flush();


      if (enc.length > 0) {

        buffer.push(enc);

      }


      return new Blob(buffer, {type: 'audio/mp3'});

    },
    recordsave() {
      //数据存储
      var _this = this;
      var date_constructor = new Date()
      var date = date_constructor.getFullYear() + "/" + (date_constructor.getMonth() + 1) + "/" + date_constructor.getDate()

      //暂时先用for循环提交 分别是 2 ， 3 ，5 词  //这里从1开始循环是为了和url下标对应起来 同时长度循环次数也要+1
      for (var i = 1; i < _this.blobs.length + 1; i++) {
        var formdata = new FormData();
        console.log("长度", _this.blobs.length)
        var url = _this.src + "_" + i
        console.log("类型", url)
        console.log("日期", date)
        //装载文件数据 后台接受
        formdata.append('email', GLOBAL.email)
        formdata.append('recordType', url)
        formdata.append('date', date)
        formdata.append('session', GLOBAL.record_session)
        formdata.append('type', 'aural')
        formdata.append('file', _this.blobs[i - 1])

        axios.post('test4record/save_record', formdata,
            {
              headers: {'Content-Type': 'multipart/form-data'}
            }).then(function (resp) {
          if (resp.data == "success") {
            console.log("record提交成功")
            //

            //
          } else {
            console.log("record提交失败")
          }
        });
      }
    }


  },
  created() {

    //根据组选音频信息 当全局变量被传值时  根据全局变量的特性 可以直接调用 不需要再取值
    if (GLOBAL.record_group == 'A') {
      this.record_content = GLOBAL.record_audiosA
      console.log(this.record_content)
    } else if (GLOBAL.record_group == 'B') {
      this.record_content = GLOBAL.record_audiosB
      console.log(this.record_content)
    } else {
      console.log('录音组出错')
    }

    //随机打乱
    this.record_content.sort(function () {
      return Math.random() - 0.5;
    });

    //赋值
    this.pos = 0
    this.num = this.record_content[this.pos]["num"]
    this.src = this.record_content[this.pos]["src"]

    //动态绑定案件内容
    for (var i = 0; i < this.num; i++) {
      this.btn_content[i] = '开始录音'
      this.blobs[i] = null;
    }

    //设置初始音频
    this.audio = new Audio(require('@/assets/audio/Lenovo.mp3'));
    // console.log(this.num)
    // this.audio = new Audio(require("@/assets/audio/test4/audio/part1/record/" + GLOBAL.record_group + "/" + this.src + ".mp3"));
    // this.audio.addEventListener("ended", this.order_play); //回调一下 播放好显示按键
    // this.audio.play();
  },
  mounted() {
    //不再是一开始就进行
    this.interval =  setInterval(this.countdown,1000);
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  watch: {
    'limit_time': function (newVal, oldVal) {
      if (newVal <= 0) {

        this.send(30)
      }
    }

  },



}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  height: 30vh;
}

.footer {
  height: 75px;
}

.content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.el-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px
}

.left, .right {
  width: 400px;
}

.center {
  flex: 1;
}

.row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 80px
}

.confirm {
  font-size: 25px;
  font-weight: 500;
}
.row-text {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.active{
  font-size:14px;
  font-weight:500;
  width: 133.79px;
  height: 39.78px;
  color:#FFFFFF;
  text-align:center;

  background:#409EFF;
  border:none;
  cursor:pointer;
  margin-left: 5px;
  margin-right: 5px;

}

.el-row{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom:80px
}
</style>