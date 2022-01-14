<template>
  <div class="container">
      <div class="header">
        <!--            <h1 class="el-row">欢迎来到在线学习能力测试系统</h1>-->
        <div class="el-row">
          <h1>填写工作记忆部分成绩</h1>
        </div>
      </div>

      <div class="content">

        <div class="el-row">
          <el-form>
            <el-form-item label="日期"
                        prop="date">
              <div class="block">
              <!--                                <span class="demonstration"> 日期：</span>-->
              <el-date-picker
                  v-model="content.date"
                  type="date"
                  placeholder="选择日期"
                  @change="getAllUser()">
              </el-date-picker>
              </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="el-row">
        <el-table
            :data="userList"
            class="table"
            @row-click="clickData"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
              prop="session"
              label="次数"
              align="center"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="工作记忆成绩"
            align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.score"  placeholder="请输入内容" class="group-inp"></el-input>
              <el-button @click="set_grade(scope.row.score)">确认</el-button>
            </template>
          </el-table-column>
          <el-table-column label="下载" align="center" min-width="100">
            　　　　<template slot-scope="scope">
            　　　　　　<el-button v-model="scope.row" type="info" @click="downLoadReport(scope.row.email)">下载</el-button>
            　　　　</template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>

</template>

<script>
import GLOBAL from "@/plugins/global_variable";

export default {
  name: "AdminReport",
  data() {
    return {
      content: {
        date: new Date()
      },
      date:null,
      userList:[],
      email:null,
      user:{
        id:null,
        email:null,
        date:null,
        score:null,
        session:null
      }
    }

  },
  methods: {
    clickData(row){
      //console.log(row)
      this.email = row.email
      this.user = row
      console.log(this.email)
      console.log("User:"+this.user)
      // axios.post("recordScore/saveRecordScore",{row}).then((response)=>{
      //   console.log("收到回执")
      // })
    },
    getAllUser(){
      this.datechange(this.content.date)
      console.log("发起请求")
      console.log(typeof this.date)
      axios.get("/recordScore/getUserbyDate",{params:{date:this.date}}).then((response)=>{
        var result = response.data
        //this.userList = JSON.stringify(result)
        this.userList = result
        console.log(this.userList)
        console.log(typeof this.userList)
      })
    },
    set_grade(score){
      console.log('上传成绩');
      console.log(score);
      this.user.score = score;
      console.log("更新后的成绩为"+this.user.score);
      axios.post("/recordScore/saveRecordScore",this.user).then((response)=>{
        console.log(response)
      })
    },


    downLoadReport(email) {
      console.log("开始下载"+email)
      axios({
        url: "/report/downloadReport" + email,
        responseType: 'blob'
      }).then((response) => {
        const content = response.data
        const blob = new Blob([content], {type: "application/pdf"})
        const fileName = email+'_report.pdf'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
          this.generate = !this.generate
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    datechange(olddate){
      this.date = olddate.getFullYear()+'/'+(olddate.getMonth()+1)+'/'+olddate.getDate()
      console.log(this.date)
    }
  },
  created() {
    console.log(this.content.date)
    this.date = this.content.date.getFullYear()+'/'+(this.content.date.getMonth()+1)+'/'+this.content.date.getDate()
    console.log(this.date)
    this.getAllUser(this.date)

    // this.getAudiosEmail()
    // console.log(this.emailList)
  },
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  /*background: #e2dfdf;*/
}

.header {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #e2dfdf;
  height: 100px;
}

.footer {
  height: 75px;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #e2dfdf;
}
.table{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin-left: 15%;
  margin-right: 15%;
}

.el-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
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

el-table-column >>> label{
  font-size: 40px;
}
</style>