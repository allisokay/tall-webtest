<template>

  <div class="home" style="margin:1vw;">

    <Button type="success" @click="getPermission()" style="margin:1vw;">获取麦克风权限</Button>

    <br/>

    <Button type="info" @click="startRecorder()" style="margin:1vw;">开始录音</Button>

    <Button type="info" @click="resumeRecorder()" style="margin:1vw;">继续录音</Button>

    <Button type="info" @click="pauseRecorder()" style="margin:1vw;">暂停录音</Button>

    <Button type="info" @click="stopRecorder()" style="margin:1vw;">结束录音</Button>

    <br/>

    <Button type="success" @click="playRecorder()" style="margin:1vw;">录音播放</Button>

    <Button type="success" @click="pausePlayRecorder()" style="margin:1vw;">暂停录音播放</Button>

    <Button type="success" @click="resumePlayRecorder()" style="margin:1vw;">恢复录音播放</Button>

    <Button type="success" @click="stopPlayRecorder()" style="margin:1vw;">停止录音播放</Button>

    <br/>

    <Button type="info" @click="getRecorder()" style="margin:1vw;">获取录音信息</Button>

    <Button type="info" @click="downPCM()" style="margin:1vw;">下载PCM</Button>

    <Button type="info" @click="downWAV()" style="margin:1vw;">下载WAV</Button>

    <Button type="info" @click="getMp3Data()" style="margin:1vw;">下载MP3</Button>

    <br/>

    <Button type="error" @click="destroyRecorder()" style="margin:1vw;">销毁录音</Button>
    <br/>
    <Button type="info" @click="saveRecord()" style="margin:1vw;">保存录音</Button>
    <br/>
    <Button type="info" @click="playRecord()" style="margin:1vw;">获取录音</Button>
    <br/>

    <audio :src='audioSrc' controls="controls" >
      您的浏览器不支持 audio 标签。
    </audio>
    <br/>
    <Button type="info" @click="downloadRecord()" style="margin:1vw;">本地下载录音</Button>
  </div>

</template>


<script>

import Recorder from "js-audio-recorder";
import GLOBAL from "@/plugins/global_variable";
import saveAs from 'file-saver';
var FileSaver = require('file-saver');

const lamejs = require('lamejs')

let recorder = new Recorder({

  sampleBits: 16, // 采样位数，支持 8 或 16，默认是16

  sampleRate: 48000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000

  numChannels: 1, // 声道，支持 1 或 2， 默认是1

// compiling: false,(0.x版本中生效,1.x增加中) // 是否边录边转换，默认是false

})


// 绑定事件-打印的是当前录音数据

recorder.onprogress = function(params) {

console.log('--------------START---------------')

console.log('录音时长(秒)', params.duration);

console.log('录音大小(字节)', params.fileSize);

console.log('录音音量百分比(%)', params.vol);

console.log('当前录音的总数据([DataView, DataView...])', params.data);


console.log('--------------END---------------')

}

export default {

  name: 'recoderTest',

  data() {
    return {
      // user不一定能用到
      audioSrc:'',
      blob:null

    };
  },

  methods: {

    /**

     * 录音的具体操作功能

     * */

// 开始录音

    startRecorder () {

      recorder.start().then(() => {


      }, (error) => {

// 出错了

        console.log(`${error.name} : ${error.message}`);

      });

    },

// 继续录音

    resumeRecorder () {

      recorder.resume()

    },

// 暂停录音

    pauseRecorder () {

      recorder.pause();

    },

// 结束录音

    stopRecorder () {

      recorder.stop()

    },

// 录音播放

    playRecorder () {

      recorder.play()

    },

// 暂停录音播放

    pausePlayRecorder () {

      recorder.pausePlay()

    },

// 恢复录音播放

    resumePlayRecorder () {

      recorder.resumePlay()

    },

// 停止录音播放

    stopPlayRecorder () {

      recorder.stopPlay();

    },

// 销毁录音

    destroyRecorder () {

      recorder.destroy().then(function() {

        recorder = null;

      });

    },

    /**

     * 获取录音文件

     * */

    getRecorder(){

      let toltime = recorder.duration;//录音总时长

      let fileSize = recorder.fileSize;//录音总大小


//录音结束，获取取录音数据

      let PCMBlob = recorder.getPCMBlob();//获取 PCM 数据

      let wav = recorder.getWAVBlob();//获取 WAV 数据


      let channel = recorder.getChannelData();//获取左声道和右声道音频数据




      debugger


    },

    /**

     * 下载录音文件

     * */

//下载pcm

    downPCM(){

//这里传参进去的时文件名

      recorder.downloadPCM('新文件');

    },

//下载wav

    downWAV(){

//这里传参进去的时文件名

      recorder.downloadWAV('新文件');

    },

    /**

     * 获取麦克风权限

     * */

    getPermission(){

      Recorder.getPermission().then(() => {

        this.$Message.success('获取权限成功')

      }, (error) => {

        console.log(`${error.name} : ${error.message}`);

      });

    },

    /**

     * 文件格式转换 wav-map3

     * */

    getMp3Data(){

      const mp3Blob = this.convertToMp3(recorder.getWAV());

      recorder.download(mp3Blob, 'recorder', 'mp3');

    },

    convertToMp3(wavDataView) {

// 获取wav头信息

      const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置

      const { channels, sampleRate } = wav;

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


      return new Blob(buffer, { type: 'audio/mp3' });

    },

    //保存录音
    saveRecord(){
      //数据存储

      var _this =this;
      const mp3Blob = this.convertToMp3(recorder.getWAV());
      _this.audioSrc = window.URL.createObjectURL(mp3Blob);
      console.log('saveRecordaudioSrc', _this.audioSrc)
          let content={}
      content['id'] = 1
      content['mp3'] = mp3Blob



      var formdata = new FormData();
      formdata.append('file',mp3Blob)
      axios.post('test4record/save_record',formdata,
          {
            headers:{'Content-Type':'multipart/form-data'}
          }).then(function (resp) {
        if (resp.data == "success") {
          console.log("record提交成功")
          //

          //
        }else {
          console.log("record提交失败")
        }
      });
    },
    //播放录音
    playRecord(){
      var rec_arr=new Array();
      var _this =this;

      axios.get('test4record/send_record',{responseType: 'blob'}).then(function (resp) {


        //console.log(rec_arr[1]['mp3'])
        _this.blob = new Blob([resp.data], {
          type: 'audio/mp3'
        })
        //将url绑定到audio的src即可以实现音频播放。


        _this.audioSrc = window.URL.createObjectURL(_this.blob);
        console.log('audioSrc', _this.audioSrc)

        //var audio_src = require(_this.audioSrc);
        var audio = new Audio(_this.audioSrc);
        audio.play();

      });
    },
    downloadRecord(){

      FileSaver.saveAs(this.blob,'wang.mp3',{type:"audio/mp3"})
    }


  },
  mounted() {

    // var rec_arr=new Array();
    // var _this =this;
    //
    // axios.get('test4record/send_record',).then(function (resp) {
    //
    //   for(var i =0;i<resp.data.length;i++)
    //   {
    //     rec_arr[i]=resp.data[i];
    //     console.log(rec_arr[i])
    //
    //   }
    //   //console.log(rec_arr[1]['mp3'])
    //   const blob = new Blob([resp.data[1]['mp3']], {
    //     type: 'audio/mp3'
    //   })
    //   //将url绑定到audio的src即可以实现音频播放。
    //
    //
    //   _this.audioSrc = window.URL.createObjectURL(blob);
    //   console.log('audioSrc', _this.audioSrc)
    //   //recorder.playAudio(blob)
    //   // var audio_src = require(_this.audioSrc);
    //   // var audio = new Audio(  _this.audioSrc);
    //   // audio.play();
    //
    // });

    console.log(GLOBAL.recordtrain_audios[0]["num"])
    console.log(GLOBAL.recordtrain_audios["src"])
    console.log(GLOBAL.recordtrain_audios["nums"])
  }


}

</script>


<style lang='less' scoped>


</style>