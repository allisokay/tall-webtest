<template>
  <div id="app">
    <div v-if="openOrClose">
      <router-view></router-view>
    </div>
    <div style='padding-left: 40vw;padding-top: 40vh;font-weight: bold;font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif' v-else>对不起，您因刷新暂时无法测试，请联系管理员</div>
  </div>

</template>

<script>


export default {
  name: 'app',
  data(){
    return{
      openOrClose:true
    }
  },
  created() {

  },
  mounted() {
    console.log(  sessionStorage.getItem("pageShow"))
    if(sessionStorage.getItem("pageShow") == "close"){
      this.openOrClose=false
    }
    if (window.performance.navigation.type == 1||window.performance.navigation.type == 2) { // 1为页面刷新执行，2是后退加载，否则是页面被加载
      this.closePage()
    }else{
      // alert("首次被加载")
    }
  },
  methods: {
    closePage: function () {
      sessionStorage.setItem('pageShow', 'close' )
      window.opener = null;
      window.location.href="about:blank";
      window.close();

    },


  }
}
</script>
<style>
</style>