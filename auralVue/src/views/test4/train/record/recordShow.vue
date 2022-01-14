<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!--        左侧菜单栏组件组件-->


      <!--        //输入框组件-->
      <el-input placeholder="请按如下格式输入：Year/Month/Day，如:2021/3/4"


                v-model="value"/>


      <!--        //按钮组件-->
      <div>
        <!--        <el-button type="primary" @click="getRecords">搜索</el-button>-->
        <!--        <br/>-->

        <el-button type="primary" @click="downloadRecord">下载当天录音文件</el-button>

      </div>


    </el-container>


  </div>
</template>

<script>
import JSZip from 'jszip'
import Recorder from "js-audio-recorder";
import GLOBAL from "@/plugins/global_variable";
import saveAs from 'file-saver';

var FileSaver = require('file-saver');
var zip = new JSZip();
export default {
  name: "recordShow",
  data() {


    return {
      //录音信息值
      item: [],
      //搜索框的值
      value: '',
      //audioSrc:[],
      //音频文件数组
      blob: [],
      //字典 这里暂时用手动输入
      record_dict: [],
      //获取到的文件长度
      resultLength: 0,
      //记录长度  方法重调用 变量会重载
      result_len : 0,



    };
  },
  methods: {

    async getRecordsMp3(email, recordType,id) {
      var _this = this;

      //console.log("延时调用了")
      // + email + '/' + recordType + '/' + _this.value+ '/'
      await axios.get('test4record/send_record/'  + id, {responseType: 'blob'}).then(function (resp) {
        //获取相应的数据信息进行封装 （包含测试内容

        //todo 这个会直接导致覆盖问题出现  看看能不能换成id来下载
        _this.blob[id] = new Blob([resp.data], {
          type: 'audio/mp3'
        })
       // console.log("执行递归",_this.blob[recordType])
        _this.result_len = _this.result_len + 1
console.log("记录长度",_this.result_len,"真实长度",_this.resultLength)
        if(_this.result_len == _this.resultLength){


          _this.zip_resource()
          _this.result_len = 0
          _this.item = []
        }



      });


      // if(_this.blob[recordType].size<3000){
      //   _this.getRecordsMp3(email, recordType)
      //   console.log("执行递归")
      // }
    },
    async getRecords() {
      var _this = this;
      console.log('value', _this.value)

      //根据数据长度分批次获取音频文件（一次性传输问题有待解决
      await axios.get('test4record/send_records/' + _this.value+'/aural',).then(function (resp) {
        console.log(resp.data, "文件内容")

        if(resp.data.length ==0){
          _this.$message.error('无当天资源');
          return
        }

        _this.$message.success('资源检索中请耐心等待');
        _this.resultLength = resp.data.length
        for (var i = 0; i < resp.data.length; i++) {
          _this.item.push({
            'id':resp.data[i]["id"],
            'user': resp.data[i]["email"],
            'recordType': resp.data[i]["recordType"],
            'session': resp.data[i]["session"]
          })
           _this.getRecordsMp3(resp.data[i]["email"], resp.data[i]["recordType"],resp.data[i]["id"])
        }
        console.log('blob', _this.blob)
        // console.log('item',_this.item)


      });


    },
    async downloadRecord() {


      var _this = this;



      //检查输入内容是否合格
      if (_this.value.match('^\\d{4}(\\-|\\/|\\.)\\d{1,2}\\1\\d{1,2}$') != null) {

        //获取录音文件   一定要等待这一步完成后才可以

        await _this.getRecords()


      } else {
        _this.$message.error('格式输入有误！');

      }


    },
    generare_record_dict() {
      //生成答案字典

      var index = 0   //获取数组索引增值
      let pos = 0    //索引位移量
      let k = 1     //组别标记

      //训练音频组答案
      for (let j = 2; j <= 5;) {
        for (let i = 0; i < j; i++ , index++) {
          this.record_dict['A_L' + k + '_' + parseInt(i + 1)] = GLOBAL.pronuncationsA[i + pos]
          this.record_dict['B_L' + k + '_' + parseInt(i + 1)] = GLOBAL.pronuncationsB[i + pos]
        }
        pos = index  //赋予位移量
        if (j == 3) {
          j = 5;
          k = 3
        } else {
          k++
          j++
        }

      }

      //测试音频组答案
      k = 1 //组别标记重置
      for (let j = 2; j <= 7; j++) {
        for (let p = 0; p < 3; p++) {
          for (let i = 0; i < j; i++ , index++) {
            this.record_dict['A_T' + k + '_' + parseInt(i + 1)] = GLOBAL.pronuncationsA[i + pos]
            this.record_dict['B_T' + k + '_' + parseInt(i + 1)] = GLOBAL.pronuncationsB[i + pos]
          }
          pos = index
          k++
        }
      }
    },
    zip_resource() {
      console.log("打包方法被调用了")
      var _this = this;
      console.log("item长度",_this.item.length)
      console.log("item",_this.item)
      console.log("blob",_this.blob)

        let reg = new RegExp('/', 'g')//g代表全部
        let date = JSON.stringify(_this.value).replace(reg, '-');

        //保存成zip文件
        for (let i = 0; i < _this.item.length; i++) {
          let data
          console.log(_this.blob[_this.item[i].id])
          //todo _this.item[i].id
          _this.blob[_this.item[i].id] = new Blob([_this.blob[_this.item[i].id]], {
            type: 'audio/mp3'
          })


          let file_name = 'aural-'+_this.item[i].user + '-' + _this.item[i].recordType + '-' + _this.record_dict[_this.item[i].recordType] + '-' + _this.item[i].session + '-' + date + '.mp3'


          zip.file(file_name, _this.blob[_this.item[i].id]);


          // FileSaver.saveAs(_this.blob[_this.item[i].recordType],_this.item[i].user+'-'+_this.item[i].recordType+'-'+_this.record_dict[_this.item[i].recordType]+'-'+_this.value+'.mp3',{type:"audio/mp3"})
        }


        zip.generateAsync({type: "blob"})
            .then(function (content) {
              // console.log(content,"content")
              // if(content.size<500000){
              //   _this.$message.error('资源预加载完成，请重新点击下载');
              //
              //
              // }else {
              //
              // }
              saveAs(content, _this.value);
            });

    },


  },
  created() {
    //生成答案字典
    this.generare_record_dict()

    console.log(this.record_dict)


  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>