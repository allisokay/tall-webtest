<template>
    <div class="container">
        <div class="header">
            <h1 align="center">问卷调查</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div>



                    <el-form :model="content" ref="numberValidateForm">
                        <div >

                            <div class="el-row" >
                                <el-form-item label="问题1 您的性别"
                                              prop="user_sex"
                                              :rules="[
      { required: true, message: '性别不能为空'},]">
                                    <el-select style="width: 350px"  v-model="content.user_sex" placeholder="请选择">
                                        <el-option
                                                v-for="item in options1"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>

                            <div  class="el-row">
                                <el-form-item label="问题2 你的最高学历"
                                              prop="user_edu"
                                              :rules="[
      { required: true, message: '学历不能为空'},
    ]"
                                >

                                    <el-select style="width: 350px" v-model="content.user_edu" placeholder="请选择">
                                        <el-option
                                                v-for="item in options2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div  class="row">
                                <el-form-item  v-show="profession" label=" 如果您是大学本科以上学历，您的专业属于"
                                               prop="user_major"
                                               :rules="[
      { required: true, message: '专业不能为空'},
    ]"
                                >

                                    <el-select  v-show="profession"  style="width: 350px" v-model="content.user_major" placeholder="请选择">
                                        <el-option  v-show="profession"
                                                    v-for="item in options3"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  v-show="major"
                                               label="学科为"
                                               prop="user_major_other"
                                               :rules="[
      { required: true, message: '不能为空'},
    ]"
                                >
                                    <el-input style="width: 350px" type="age" v-model="content.user_major_other"
                                              autocomplete="off" placeholder="请输入交叉学科名"></el-input>
                                </el-form-item>
                            </div>
                            <div class="el-row" >

                            </div>

                            <div class="el-row">
                                <el-form-item label="2）您的外语学习经历  您学习（参加课程学习）了      英语"
                                              prop="stage"
                                              :rules="[

    ]">
                                    <el-select  style="width: 350px"  v-model="content.english_year" placeholder="请选择">
                                        <el-option
                                                v-for="item in options4"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-show="grade" class="el-row" >
                                <el-form-item
                                        label="高考英语，成绩为      "
                                        prop="nemt_grade"
                                        :rules="[
       { required: true, message: '高考成绩不能为空'},
      { type: 'number', message: '成绩必须为数字值'}
    ]"
                                >
                                    <el-input style="width: 350px" type="age"  v-model.number="content.nemt_grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="el-row" v-show="grade" >
                                <el-form-item
                                        label="大学英语四级，成绩为     "
                                        prop="cet4_grade"
                                        :rules="[
    ]"
                                >
                                    <el-input oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.cet4_grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>

                            <div class="el-row" v-show="grade">
                                <el-form-item
                                        label=" 大学英语六级，成绩为     "
                                        prop="cet6_grade"
                                        :rules="[
    ]"
                                >
                                    <el-input oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age"  v-model.number="content.cet6_grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="el-row" v-show="grade" >
                                <el-form-item
                                        label="  雅思考试，成绩为        "
                                        prop="ielts_grade"
                                        :rules="[

    ]"
                                >
                                    <el-input style="width: 350px" oninput="value=value.replace(/[^\d]/g,'')" type="age"  v-model.number="content.ielts_grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="el-row" v-show="grade">
                                <el-form-item
                                        label=" 托福考试，成绩为       "
                                        prop="toefl_grade"
                                        :rules="[

    ]"
                                >
                                    <el-input  oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age"  v-model.number="content.toefl_grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </div>
                            <div class="el-row">
                                <!--                                <el-radio v-model="content.no_language" label="1" border>以未学习过其他外语    </el-radio>-->
                                <!--                                <el-checkbox v-model="content.no_grade"><h2>以上考试都未参加过</h2></el-checkbox>-->
                            </div>
                            <div class="el-row">
                                <h2>除英语之外，您学习（参加课程学习）过其它外语吗？（可多选）
                                </h2>
                            </div>
                            <div class="el-row">
                                <!--                                <el-radio v-model="content.no_language" label="1" border>以未学习过其他外语    </el-radio>-->
                                <el-checkbox v-model="content.no_language"><h2>未学习过其他外语</h2></el-checkbox>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="俄语，学习了      "
                                                   prop="stage"
                                                   :rules="[

    ]">
                                        <el-select span="12"  v-show="language" style="width: 350px" v-model="content.russian_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div >
                                    <el-form-item  v-show="russian"
                                                   label=" 俄语，考试名     "
                                                   prop="russian_test"
                                                   :rules="[

    ]"
                                    >
                                        <el-input span="5" style="width: 350px" type="age" v-model.number="content.russian_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item
                                            v-show="russian"
                                            label=" 分数     "
                                            prop="russian_grade"
                                            :rules="[
    ]"
                                    >
                                        <el-input oninput="value=value.replace(/[^\d]/g,'')" span="5" style="width: 350px" type="age" v-model.number="content.russian_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="日语，学习了      "
                                                   prop="stage"
                                                   :rules="[

    ]">
                                        <el-select  v-show="language"  style="width: 350px" v-model="content.japanese_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div  >
                                    <el-form-item v-show="japanese"
                                                  label=" 日语，考试名     "
                                                  prop="japanese_test"
                                                  :rules="[

    ]"
                                    >
                                        <el-input style="width: 350px" type="age" v-model.number="content.japanese_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item  v-show="japanese"
                                                   label=" 分数     "
                                                   prop="japanese_grade"
                                                   :rules="[ {  message:'成绩必须为数字值'} ]"
                                    >
                                        <el-input  oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.japanese_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="法语，学习了      "
                                                   prop="stage"
                                                   :rules="[

    ]">
                                        <el-select   v-show="language" style="width: 350px" v-model="content.french_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div  >
                                    <el-form-item  v-show="french"
                                                   label=" 法语，考试名     "
                                                   prop="french_test"
                                                   :rules="[

    ]"
                                    >
                                        <el-input style="width: 350px" type="age" v-model.number="content.french_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item  v-show="french"
                                                   label=" 分数     "
                                                   prop="french_grade"
                                                   :rules="[

    ]"
                                    >
                                        <el-input oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.french_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="德语，学习了      "
                                                   prop="stage"
                                                   :rules="[

    ]">
                                        <el-select   v-show="language" style="width: 350px" v-model="content.german_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div >
                                    <el-form-item  v-show="german"
                                                   label=" 德语，考试名     "
                                                   prop="german_test"
                                                   :rules="[

    ]"
                                    >
                                        <el-input style="width: 350px" type="age" v-model.number="content.german_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item  v-show="german"
                                                   label=" 分数     "
                                                   prop="german_grade"
                                                   :rules="[

    ]"
                                    >
                                        <el-input oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.german_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="西班牙语，学习了      "
                                                   prop="stage"
                                                   :rules="[
    ]">
                                        <el-select  v-show="language" style="width: 350px" v-model="content.spanish_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div >
                                    <el-form-item  v-show="spanish"
                                                   label=" 西班牙语，考试名     "
                                                   prop="spanish_test"
                                                   :rules="[

    ]"
                                    >
                                        <el-input style="width: 350px" type="age" v-model.number="content.spanish_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item  v-show="spanish"
                                                   label=" 分数     "
                                                   prop="spanish_grade"
                                                   :rules="[

    ]"
                                    >
                                        <el-input  oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.spanish_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="el-row">
                                <div>
                                    <el-form-item  v-show="language" label="其他语种，学习了      "
                                                   prop="stage"
                                                   :rules="[
    ]">
                                        <el-select  v-show="language" style="width: 350px" v-model="content.other_year" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options4"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div >
                                    <el-form-item  v-show="other"
                                                   label=" 其他语种，考试名     "
                                                   prop="other_test"
                                                   :rules="[

    ]"
                                    >
                                        <el-input style="width: 350px" type="age" v-model.number="content.other_test" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item  v-show="other"
                                                   label=" 分数     "
                                                   prop="other_grade"
                                                   :rules="[

    ]"
                                    >
                                        <el-input oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.other_grade" autocomplete="off"></el-input>
                                    </el-form-item>
                                </div>
                            </div>


                        </div>
                        <div class="yesbutton">
                            <el-button    type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
    import GLOBAL from "../plugins/global_variable";
    export default {
        name: "Questionnaire",
        data() {
            return {
                profession:false,
                major:false,
                language:true,
                grade: false,
                russian:false,
                japanese:false,
                french:false,
                german:false,
                spanish:false,
                other:false,
                user: {
                    id: '',
                    email: '',
                    invited_code: '',
                    test_fin_time: '',
                    register_time: '',
                },
                options1: [{
                    value: '0',
                    label: '男'
                }, {
                    value: '1',
                    label: '女'
                }],
                options2: [{
                    value: '4',
                    label: '研究生'
                }, {
                    value: '3',
                    label: '大学本科'
                }, {
                    value: '2',
                    label: '高职高专'
                }, {
                    value: '1',
                    label: '高中'
                }, {
                    value: '0',
                    label: '初中'
                },
                ],
                options3: [{
                    value: '0',
                    label: '人文门类 （文学、历史学、哲学、艺术学）'
                }, {
                    value: '1',
                    label: '社会科学门类（教育学、法学、经济学、管理学、军事学）'
                }, {
                    value: '2',
                    label: '理工门类（理学、工学）'
                }, {
                    value: '3',
                    label: '农医门类（医学、农学）'
                }, {
                    value: '4',
                    label: '以上学科的交叉'
                }
                ],
                //学习时间
                options4: [{
                    value: '0',
                    label: '0-3年以内'
                }, {
                    value: '1',
                    label: '3-6年以内'
                }, {
                    value: '2',
                    label: '6-10年以内'
                }, {
                    value: '3',
                    label: '10年以上'
                }
                ],

                content: {
                    user_major: '',
                    user_major_other:'',
                    user_edu: '',
                    user_sex: '',
                    user_age: '',
                    stage: '',
                    grade: '',

                    english_year:'',//英语学习年限

                    nemt_grade:'',//高考英语成绩
                    cet4_grade:'',//四级成绩
                    cet6_grade:'',//六级成绩
                    toefl_grade:'',//托福成绩
                    ielts_grade:'',//雅思成绩
                    //俄语学习时间
                    russian_year:'',
                    //日语学习时间
                    japanese_year:'',
                    //法语学习时间
                    french_year:'',
                    //德语学习时间
                    german_year:'',
                    //西班牙语学习时间
                    spanish_year:'',
                    //其他语言年限
                    other_year:'',
                    no_grade:'',
                    no_language:'',
                    //俄语考试名
                    russian_test:'',
                    //俄语成绩
                    russian_grade:'',
                    //日语考试名
                    japanese_test:'',
                    //日语成绩
                    japanese_grade:'',
                    //法语考试名
                    french_test:'',
                    //法语成绩
                    french_grade:'',
                    //德语考试名
                    german_test:'',
                    //德语成绩
                    german_grade:'',
                    //西班牙考试名
                    spanish_test:'',
                    //西班牙成绩
                    spanish_grade:'',
                    //其他考试名
                    other_test:'',
                    //其他考试成绩
                    other_grade:'',
                },
                content1: {
                    user_major: '',
                    user_edu: '',
                    user_grade: '',
                    user_sex: '',
                    user_age: '',
                    user_id: 1,
                }
            }
        },
        watch: {
            'content.user_edu': function() {
                if (this.content.user_edu == 3 || this.content.user_edu == 4 ) {
                    this.profession = true
                    this.$forceUpdate();
                }
                else{
                    this.profession = false
                    this.$forceUpdate();
                }
                if (this.content.user_edu == 3 || this.content.user_edu == 4||this.content.user_edu == 2) {
                    this.grade = true
                    this.$forceUpdate();
                }
                else{
                    this.grade = false
                    this.$forceUpdate();
                }



            },
            'content.russian_year':function(){
                if(this.content.russian_year!==null){
                    this.russian = true
                    this.$forceUpdate();
                }
                else{
                    this.russian = false
                    this.$forceUpdate();
                }
            },
            'content.japanese_year':function(){
                if(this.content.japanese_year!==null){
                    this.japanese = true
                    this.$forceUpdate();
                }
                else{
                    this.japanese = false
                    this.$forceUpdate();
                }
            },
            'content.french_year':function(){
                if(this.content.french_year!==null){
                    this.french = true
                    this.$forceUpdate();
                }
                else{
                    this.french = false
                    this.$forceUpdate();
                }
            },
            'content.german_year':function(){
                if(this.content.german_year!==null){
                    this.german = true
                    this.$forceUpdate();
                }
                else{
                    this.german = false
                    this.$forceUpdate();
                }
            },
            'content.spanish_year':function(){
                if(this.content.spanish_year!==null){
                    this.spanish = true
                    this.$forceUpdate();
                }
                else{
                    this.spanish = false
                    this.$forceUpdate();
                }
            },
            'content.other_year':function(){
                if(this.content.other_year!==null){
                    this.other = true
                    this.$forceUpdate();
                }
                else{
                    this.other = false
                    this.$forceUpdate();
                }
            },


            'content.user_major': function() {
                if (this.content.user_major == 4 ) {
                    this.major = true
                    this.$forceUpdate();
                }
                else{
                    this.major = false
                    this.$forceUpdate();
                }
            },
            'content.no_language': function() {
                if(this.content.no_language==true)
                {
                    this.language = false
                    this.russian = false
                    this.japanese = false
                    this.french =false
                    this.german =false
                    this.other= false
                    this.spanish=false
                    this.$forceUpdate();
                }
                else{
                    this.language = true
                    this.$forceUpdate();
                }
            }
        },
        methods: {


            submitForm(formName) {
                console.log("性别"+String(this.content.user_sex));
                // if(this.content.user_sex=="男")
                // {
                //     this.content.user_sex=0;
                // }
                // else{
                //     this.content.user_sex=1;
                // }


                // GLOBAL.part_sex=this.content.user_sex;


                var _this = this;
                //各个问卷调查格式都正确
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定问卷填写无误?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //这里应该赋值为全局变量，待写
                            _this.$message({
                                type: 'success',
                                message: '问卷填写成功!'
                            });
                            _this.$router.push('/EmailRegister');
                            //重新赋给新的对象来post
                            // this.content1.user_age = this.content.user_age;
                            // this.content1.user_edu = this.content.user_edu;
                            // this.content1.user_sex = this.content.user_sex;
                            // this.content1.user_major = this.content.user_major;
                            // this.content1.user_grade = this.content.stage + this.content.grade;
                            // this.content1.user_id = this.user.id;
                            //
                            // axios.post('questionnaire/save', this.content1).then(
                            //     function (resp) {
                            //         if (resp.data == 'success') {
                            //             _this.$message({
                            //                 type: 'success',
                            //                 message: '问卷填写成功!'
                            //             });
                            //             _this.$router.push('/Index');
                            //
                            //         } else {
                            //             console.log("save error");
                            //         }
                            //
                            //     });
                        }).catch(() => {
                            _this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                });
            },
        },
        created() {//生命周期函数
            document.body.style.backgroundColor="#DCDCDC";
        }
    }
</script>

<style scoped>
    .row{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom:20px
    }
    .el-row{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        margin-bottom:20px
    }
    .yesbutton{
        display: flex;
        justify-content: center;
        margin-bottom:80px
    }
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header{
        display: flex;
        flex-direction: column;
        height: 40vh;
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
        width:200px;
    }
    .center{
        flex: 1;
    }

</style>
