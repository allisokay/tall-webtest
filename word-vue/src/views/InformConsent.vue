<template>
    <div class="container">
        <div class="header">
            <!--            <h1 class="el-row">欢迎来到在线学习能力测试系统</h1>-->

            <div class="el-row">
                <h1>中国外语学习者认知个体差异测试 知情同意书</h1>

            </div>


        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="el-row">
                    <h2>如果您同意参加测试，请点击每一项确认。</h2>
                </div>




                <div class="row">
                    <h3> 同意内容</h3>
                    <h3>点击确认</h3>
                </div>
                <div class="row">
                    <div class="column">

                        <h3>我确认我已经阅读并理解了关于这一研究项目的信息，我理解<br>研究需要我参与其中。</h3>

                        <h3>我理解参加研究是自愿的。</h3>

                        <h3>我理解我的数据将无法辨识我的身份，我的匿名数据将被用于<br>发表、演示、上线或分析。</h3>

                        <h3>我确认我已经阅读了关于GDPR的信息。</h3>
                    </div>
                    <div class="column">

                        <el-checkbox v-model="checked1"></el-checkbox>
                        <el-checkbox v-model="checked2"></el-checkbox>
                        <el-checkbox v-model="checked3"></el-checkbox>
                        <el-checkbox v-model="checked4"></el-checkbox>

                    </div>
                </div>
                <div >
                    <el-form class="row1" :model="content" ref="numberValidateForm">
                        <div >
                            <!--                        <div >-->
                            <!--                            本人签名：-->
                            <!--                        </div>-->



                            <el-form-item label="本人签名 "
                                          prop="user_name"
                                          :rules="[
      { required: true, message: '姓名不能为空'},
    ]"
                            >
                                <el-col span="20">
                                    <el-input  v-model="content.user_name" :placeholder="请输入您的姓名"></el-input>
                                </el-col>
                            </el-form-item>



                        </div>
                        <el-form-item label="日期"
                                      prop="date1"
                                      :rules="[
      { required: true, message: '日期不能为空'},
    ]"
                        >
                            <div class="block">
                                <!--                                <span class="demonstration"> 日期：</span>-->
                                <el-date-picker
                                        v-model="content.date1"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>

                            <!--                            <el-col span="20">-->
                            <!--                                <el-input  v-model="content.user_name" :placeholder="请输入您的姓名"></el-input>-->
                            <!--                            </el-col>-->
                        </el-form-item>
                        <!--                        <div class="block">-->
                        <!--                            <span class="demonstration"> 日期：</span>-->
                        <!--                            <el-date-picker-->
                        <!--                                    v-model="date1"-->
                        <!--                                    type="date"-->
                        <!--                                    placeholder="选择日期">-->
                        <!--                            </el-date-picker>-->
                        <!--                        </div>-->
                    </el-form>


                </div>
                <div class="row1">
                    <div class="el-row">
                        <el-button type="primary" :disabled="show" @click="downLoadLetter('numberValidateForm')">提交并下载保存</el-button>

                    </div>
                    <el-button type="primary" @click="go_back()">回看告知书</el-button>
                </div>

            </div>
            <div class="right">
            </div>
            <div class="footer"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "InformConsent",
        data(){

            return{
                tableData: [{
                    date: '我确认我已经阅读并理解了关于这一研究项目的信息，我理解研究需要我参与其中。',

                }, {
                    date: '我理解参加研究是自愿的。',

                }, {
                    date: '我理解我的数据将无法辨识我的身份，我的匿名数据将被用于发表、演示和上线或分析。',
                }, {
                    date: '我确认我已经阅读了关于GDPR的信息。',

                }
                ],

                checked1: false,
                checked2: false,
                checked3: false,
                checked4: false,


                content:{
                    user_name:'',
                    date1:''
                },
                show:true,

            };
        },
        computed: {
            listenChange () {
                const {checked1,checked2,checked3,checked4} = this
                return {checked1,checked2,checked3,checked4}
            }
        },

        watch: {
            listenChange (val) {
                console.log('listenChange :', val)
                if (this.checked1 ==true&& this.checked2==true&&this.checked3==true&&this.checked4==true) {
                    this.show=false;
                    this.$forceUpdate();
                }
                else{
                    this.show=true;
                    this.$forceUpdate();

                }
            }
        },
        methods:{
            save(){
                console.log(this.checked1);
                console.log(this.checked2);
                console.log(this.checked3);
                console.log(this.checked4);
                console.log(this.user_name);
                console.log(this.date1.toLocaleDateString());
                //这里封装下，依据后端的字段来发送请求。
                var content={};
                content.name=this.user_name;
                content.date=this.date1.toLocaleDateString();

            },
            //下载报告
            downLoadLetter(formName) {

                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        console.log(this.checked1);
                        console.log(this.checked2);
                        console.log(this.checked3);
                        console.log(this.checked4);
                        console.log(this.content.user_name);
                        console.log(this.content.date1.toLocaleDateString());
                        //这里封装下，依据后端的字段来发送请求。
                        var content = {};
                        content.name = this.content.user_name;
                        content.date = this.content.date1.getFullYear() + '-' + (this.content.date1.getMonth() + 1) + '-' + this.content.date1.getDate();
                        console.log(content);
                        axios({
                            url: "/user/downloadLetter" + '/' + content.name + '/' + content.date,
                            responseType: 'blob'
                        }).then((response) => {
                            const content = response.data
                            const blob = new Blob([content], {type: "application/pdf"})
                            const fileName = 'InformConsent.pdf'
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
                        });
                        this.$router.push('/EmailRegister');

                    }
                });
            },
            go_back()
            {
                this.$router.push('/Notification');
            },
        },
        created() {
            document.body.style.backgroundColor="#DCDCDC";
        },
    }
</script>

<style scoped>
    .bold{font-size:22px;
        font-weight: bold;
    }
    .normal{
        font-size:22px;
        font-weight: normal;
    }
    .confirm{
        font-size:25px;
        font-weight:500;
    }
    .header{
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin-bottom:80px
    }
    .footer {
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin-bottom:80px
    }

    .yesbutton{
        display: flex;
        justify-content: center;
        margin-bottom:10px
    }

    .row{
        display: flex;
        justify-content: space-between;
        margin-bottom:20px
    }
    .row1{
        display: flex;
        justify-content: space-around;
        margin-bottom:20px
    }
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
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
        margin-bottom:5px

    }
    .el-row1{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .el-row2{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom:110px
    }
    .left,.right{
        width:300px;
    }
    .leftbound{
        width:250px;
    }
    .center{
        flex: 1;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>