<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <div class="left"></div>
      <div class="center">
        <div class="el-row">
          <h2>请务必先仔细听清系统播放的提示音</h2>
        </div>
        <div class="row">
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
export default {
  name: "Train_part1",
  data() {
    return {
      // user不一定能用到
      user: {
        id: '',
        email: '',
        invited_code: '',
        test_fin_time: '',
        register_time: '',
      },

      show: true,
      audios: [],
      audio:'',



    };
  },
  methods: {
    study() {

      this.$router.push('/recordTrainpart2');

    },
    listen_again()
    {
      //目前点击重听的话，就不能点击开始
      this.show=true;
      //将之前的音频暂停
      this.audio.pause();


      // //重新深度拷贝
      this.audio = new Audio(require('@/assets/audio/test4/audio/part1/record/tip2.mp3'));
      this.audio.addEventListener("ended", this.order_play); //回调一下 播放好显示按键
      //播放音频
      this.audio.play();

    },


    order_play() {
        this.show=false;
    },

  },
  created() {//生命周期函数

    //深度拷贝
    //this.audios = JSON.parse(JSON.stringify(GLOBAL.train_introduce_part1))


    this.audio = new Audio(require('@/assets/audio/test4/audio/part1/record/tip2.mp3'));
    console.log( this.audio)
    this.audio.play();
    //播放音频
    this.audio.addEventListener("ended", this.order_play);
    //this.order_play();
    document.body.style.backgroundColor="#DCDCDC";


  },
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });

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
.row{
  display: flex;
  justify-content: space-around;
  margin-bottom:80px
}
.confirm{
  font-size:25px;
  font-weight:500;
}
</style>