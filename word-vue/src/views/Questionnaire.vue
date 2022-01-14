<template>
  <div class="container">
    <div class="header">
      <h1 align="center" style="font-size: xx-large">问卷调查</h1>
    </div>
    <div class="content">
      <div class="left"></div>
      <div class="center">
        <div>



          <el-form :model="content" ref="numberValidateForm">
            <div >

              <div class="el-row" >

                <el-form-item size="large" label=" 您的性别"
                              prop="part_sex"
                              :rules="[{ required: true, message: '性别不能为空'},]">
                  <el-select style="width: 350px"  v-model="content.part_sex" placeholder="请选择" >
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
                <el-form-item label=" 您现在是"
                              prop="part_edu"
                              :rules="[{ required: true, message: '学历不能为空'},]"
                >

                  <el-select style="width: 350px" v-model="content.part_edu" placeholder="请选择">
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
                               prop="edu_discipline"
                               :rules="[{ required: profession, message: '专业不能为空'}, ]">

                  <el-select  v-show="profession"  style="width: 350px" v-model="content.edu_discipline" placeholder="请选择">
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
                               prop="crossdispl_info"
                               :rules="[{ required: major, message: '学科不能为空'},]">

                  <el-input style="width: 350px" type="age" v-model="content.crossdispl_info"
                            autocomplete="off" placeholder="请输入交叉学科名"></el-input>
                </el-form-item>
              </div>


              <div class="el-row" >

              </div>

              <div class="el-row">
                <el-form-item label=" 您学习（参加课程学习）了多长时间英语？"
                              prop="Eng_YOL"
                              :rules="[{ required: true, message: '此问题不能为空'}]">

                  <el-select  style="width: 350px"  v-model="content.Eng_YOL" placeholder="请选择">
                    <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="el-row">
                <el-form-item label=" 您是否有海外学习/生活的经历？"
                              prop="foreign_study"
                              :rules="[{ required: false, message: '此问题不能为空'}]">
                  <el-radio-group v-model="foreigh_study">
                    <el-radio :label=true >是</el-radio>
                    <el-radio :label=false>否</el-radio>

                  </el-radio-group>
                </el-form-item>
              </div>

              <div class="el-row">
                <div>
                  <el-form-item v-show="country" label="您在哪个（或哪些）国家学习/生活过？      "
                                 prop="foreigh_country"
                                 :rules="[]">
                    <el-input style="width: 350px" v-model="content.foreigh_country" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item v-show="study_time" label="您在这个（这些）国家学习/生活了多长时间？      "
                                 prop="study_time"
                                 :rules="[]">
                    <el-input style="width: 350px" v-model="content.study_time" autocomplete="off"></el-input>
                  </el-form-item>
                </div>

              </div>

              <div v-show="grade" class="el-row" >
                <el-form-item
                    label=" 您的高考英语分数      "
                    prop="nemt_grade"
                    :rules="[{ required: grade, message: '高考英语成绩不能为空'},// { type: 'number', message: '成绩必须为数字值'}
                                         ]">
                  <el-input style="width: 350px" type="age"  v-model="content.nemt_grade" autocomplete="off" @keyup.native="proving"/>
                </el-form-item>
              </div>
              <div v-show="grade" class="el-row" >
                <el-form-item
                    label=" 您的高考数学分数      "
                    prop="math_grade"
                    :rules="[{ required: grade, message: '高考数学成绩不能为空'},// { type: 'number', message: '成绩必须为数字值'}
                                         ]">
                  <el-input style="width: 350px" type="age"  v-model="content.math_grade" autocomplete="off" @keyup.native="proving"/>
                </el-form-item>
              </div>
              <div class="el-row" v-show="grade">
                <el-form-item
                    label=" 您的高考语文分数      "
                    prop="chinese_grade"
                    :rules="[{ required: grade, message: '高考语文成绩不能为空'},]">
                  <el-input style="width: 350px" type="age"  v-model="content.chinese_grade" autocomplete="off" @keyup.native="proving"/>
                </el-form-item>
              </div>

              <div class="el-row" v-show="grade" >
                <el-form-item
                    label=" 如果您参加了大学英语四级考试，您的分数     "
                    prop="cet4_grade"
                    :rules="[]"
                >
                  <el-input  style="width: 350px" type="age" v-model="content.cet4_grade" autocomplete="off" @keyup.native="proving"/>
                </el-form-item>
              </div>

              <div class="el-row" v-show="grade">
                <el-form-item
                    label=" 如果您参加了大学英语六级考试，您的分数     "
                    prop="cet6_grade"
                    :rules="[
    ]"
                >
                  <el-input  style="width: 350px" type="age"  v-model="content.cet6_grade" autocomplete="off" @keyup.native="proving"></el-input>
                </el-form-item>
              </div>
              <div class="el-row" v-show="grade" >
                <el-form-item
                    label=" 如果您参加了雅思考试，您的分数        "
                    prop="ielts_grade"
                    :rules="[

    ]"
                >
                  <el-input style="width: 350px" type="age"  v-model="content.ielts_grade" autocomplete="off" @keyup.native="proving"></el-input>
                </el-form-item>
              </div>
              <div class="el-row" v-show="grade">
                <el-form-item
                    label=" 如果您参加了托福考试，您的分数       "
                    prop="toefl_grade"
                    :rules="[

    ]"
                >
                  <el-input  style="width: 350px" type="age"  v-model="content.toefl_grade" autocomplete="off" @keyup.native="proving"></el-input>
                </el-form-item>
              </div>

              <div class="el-row">
                <!--                                <el-radio v-model="content.no_language" label="1" border>以未学习过其他外语    </el-radio>-->
                <!--                                <el-checkbox v-model="content.no_grade"><h2>以上考试都未参加过</h2></el-checkbox>-->
              </div>
              <div class="el-row">
                <!--                                <h2>除英语之外，您学习（参加课程学习）过其它外语吗？（可多选）-->
                <!--                                </h2>-->
              </div>
              <div class="el-row">
                <!--                                <el-radio v-model="content.no_language" label="1" border>以未学习过其他外语    </el-radio>-->
                <!--                                <el-checkbox v-model="content.no_otherlan"><h2>未学习过其他外语</h2></el-checkbox>-->
                <el-form-item   label="  除英语之外，您学习（参加课程学习）过其它外语吗？（可多选) "
                                prop="no_otherlan"
                                :rules="[{ required: true, message: '此选项为必选项'},]">
                  <el-select span="12"   style="width: 350px" v-model="content.no_otherlan" placeholder="请选择">
                    <el-option
                        v-for="item in options5"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="el-row">
                <div>
                  <el-form-item  v-show="language" label="俄语，学习了      "
                                 prop="russian_year"
                                 :rules="[]">
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
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Ru"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Ru" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Ru"
                                 label=" 俄语，考试名     "
                                 prop="russian_test"
                                 :rules="[]">
                    <el-input span="5" style="width: 350px" type="age" v-model.number="content.russian_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item
                      v-show="test_Ru"
                      label=" 分数     "
                      prop="russian_grade"
                      :rules="[]">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" span="5" style="width: 350px" type="age" v-model.number="content.russian_grade" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="el-row">
                <div>
                  <el-form-item  v-show="language" label="日语，学习了      "
                                 prop="japanese_year"
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
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Ja"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Ja" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div  >
                  <el-form-item v-show="test_Ja"
                                label=" 日语，考试名     "
                                prop="japanese_test"
                                :rules="[

    ]"
                  >
                    <el-input style="width: 350px" type="age" v-model.number="content.japanese_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Ja"
                                 label=" 分数     "
                                 prop="japanese_grade"
                                 :rules="[ ]"
                  >
                    <el-input  oninput="value=value.replace(/[^\d]/g,'')" style="width: 350px" type="age" v-model.number="content.japanese_grade" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="el-row">
                <div>
                  <el-form-item  v-show="language" label="法语，学习了      "
                                 prop="french_year"
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
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Fr"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Fr" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div  >
                  <el-form-item  v-show="test_Fr"
                                 label=" 法语，考试名     "
                                 prop="french_test"
                                 :rules="[

    ]"
                  >
                    <el-input style="width: 350px" type="age" v-model.number="content.french_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Fr"
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
                                 prop="german_year"
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
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Ge"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Ge" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div >
                  <el-form-item  v-show="test_Ge"
                                 label=" 德语，考试名     "
                                 prop="german_test"
                                 :rules="[

    ]"
                  >
                    <el-input style="width: 350px" type="age" v-model.number="content.german_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Ge"
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
                                 prop="spanish_year"
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
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Sp"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Sp" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div >
                  <el-form-item  v-show="test_Sp"
                                 label=" 西班牙语，考试名     "
                                 prop="spanish_test"
                                 :rules="[

    ]"
                  >
                    <el-input style="width: 350px" type="age" v-model.number="content.spanish_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Sp"
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
                                 prop="other_year"
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
                <div>
                  <el-form-item  v-show="language" label="语种名是      "
                                 prop="other_name"
                                 :rules="[]">
                    <el-input style="width: 350px" v-model="content.other_name" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item v-show="language" label=" 是否参加过水平考试    "
                                prop="is_test_Other"
                                :rules="[]">
                    <el-select span="12"  v-show="language" style="width: 350px" v-model="content.is_test_Other" placeholder="请选择">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div >
                  <el-form-item  v-show="test_Other"
                                 label=" 其他语种，考试名     "
                                 prop="other_test"
                                 :rules="[

    ]"
                  >
                    <el-input style="width: 350px" type="age" v-model.number="content.other_test" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item  v-show="test_Other"
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
      foreigh_study:false,
      country:false,
      study_time: false,
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
      test_Ru:false,//控制是否参加俄语考试
      test_Ja:false,//控制是否参加日语考试
      test_Fr:false,//控制是否参加法语考试
      test_Ge:false,//控制是否参加德语考试
      test_Sp:false,//控制是否参加西班牙语考试
      test_Other:false,//控制是否参加其他语种考试
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
        value: '5',
        label: '研究生'
      }, {
        value: '4',
        label: '大学本科'
      }, {
        value: '3',
        label: '高职高专'
      }, {
        value: '2',
        label: '高中'
      }, {
        value: '1',
        label: '初中'
      },{
        value: '0',
        label: '以上都不是'
      }
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
      //是否学习过其他外语
      options5: [{
        value: 0,
        label: '学习过其他外语'
      }, {
        value: 1,
        label: '未学习过其他外语'}

      ],
      options6: [{
        value: 1,
        label: '参加过水平考试'
      }, {
        value: 0,
        label: '未参加过水平考试'}
      ],

      content: {

        email:'',
        invited_code:'',
        part_consent:1,
        part_sex:'',
        part_edu:'',
        //专业学科
        edu_discipline:'',
        //交叉学科
        crossdispl_info:'',
        //英语学习年限
        foreigh_country:'',
        study_time:'',
        Eng_YOL:'',
        nemt_grade:'',//高考英语成绩
        math_grade:'',//高考数学成绩
        chinese_grade:'',//高考语文成绩
        cet4_grade:'',//四级成绩
        cet6_grade:'',//六级成绩
        ielts_grade:'',//雅思成绩
        toefl_grade:'',//托福成绩
        //未学习过其他外语
        no_otherlan:'',
        is_test_Ru:'',//控制是否参加俄语考试
        is_test_Ja:'',//控制是否参加日语考试
        is_test_Fr:'',//控制是否参加法语考试
        is_test_Ge:'',//控制是否参加德语考试
        is_test_Sp:'',//控制是否参加西班牙语考试
        is_test_Other:'',//控制是否参加其他语种考试
        //俄语学习时间
        russian_year:'',
        //俄语考试名
        russian_test:'',
        //俄语成绩
        russian_grade:'',
        //日语学习时间
        japanese_year:'',
        //日语考试名
        japanese_test:'',
        //日语成绩
        japanese_grade:'',
        //法语学习时间
        french_year:'',
        //法语考试名
        french_test:'',
        //法语成绩
        french_grade:'',
        //德语学习时间
        german_year:'',
        //德语考试名
        german_test:'',
        //德语成绩
        german_grade:'',
        //西班牙语学习时间
        spanish_year:'',
        //西班牙考试名
        spanish_test:'',
        //西班牙成绩
        spanish_grade:'',
        //其他语言名
        other_name:'',
        //其他语言年限
        other_year:'',
        //其他考试名
        other_test:'',
        //其他考试成绩
        other_grade:'',
        willingness_interview:'',
        aural_done:'',
        aural_donetime:'',
        word_done:'',
        word_donetime:'',
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
    'content.part_edu': function() {
      console.log(this.part_edu)
      if (this.content.part_edu == 4 || this.content.part_edu == 5 ) {
        this.profession = true
        this.$forceUpdate();
      }
      else{
        this.profession = false
        this.$forceUpdate();
      }
      if (this.content.part_edu == 4 || this.content.part_edu == 5||this.content.part_edu == 3) {
        this.grade = true
        this.$forceUpdate();
      }
      else{
        this.grade = false
        this.$forceUpdate();
      }



    },
    'content.edu_discipline_other': function() {
      if (this.content.part_edu == 4 || this.content.part_edu == 5 ) {
        this.profession = true
        this.$forceUpdate();
      }
      else{
        this.profession = false
        this.$forceUpdate();
      }
      if (this.content.part_edu == 4 || this.content.part_edu == 5||this.content.part_edu == 3) {
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


    'content.edu_discipline': function() {
      if (this.content.edu_discipline == 4 ) {
        this.major = true
        this.$forceUpdate();
      }
      else{
        this.major = false
        this.$forceUpdate();
      }
    },
    'foreigh_study':function () {
      console.log(this.study_time)
      if(this.foreigh_study==true){
        this.country = true
        this.study_time = true
        this.$forceUpdate();
      }
      else {
        this.country = false
        this.study_time = false
        this.$forceUpdate();
      }
      console.log(this.study_time)
    },

    'content.no_otherlan': function() {
      if(this.content.no_otherlan==true)
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
    },
    'content.is_test_Ru':function (){
      console.log(this.content.is_test_Ru)
      if(this.content.is_test_Ru == 1) //参加过
      {
        this.test_Ru = true
        this.$forceUpdate();
      }
      else{
        this.test_Ru = false
        this.$forceUpdate();
      }
    },
    'content.is_test_Ja':function (){
      console.log(this.content.is_test_Ja)
      if(this.content.is_test_Ja == 1) //参加过
      {
        this.test_Ja = true
        this.$forceUpdate();
      }
      else{
        this.test_Ja = false
        this.$forceUpdate();
      }
    },
    'content.is_test_Fr':function (){
      console.log(this.content.is_test_Fr)
      if(this.content.is_test_Fr == 1) //参加过
      {
        this.test_Fr = true
        this.$forceUpdate();
      }
      else{
        this.test_Fr = false
        this.$forceUpdate();
      }
    },
    'content.is_test_Ge':function (){
      console.log(this.content.is_test_Ge)
      if(this.content.is_test_Ge == 1) //参加过
      {
        this.test_Ge = true
        this.$forceUpdate();
      }
      else{
        this.test_Ge = false
        this.$forceUpdate();
      }
    },
    'content.is_test_Sp':function (){
      console.log(this.content.is_test_Sp)
      if(this.content.is_test_Sp == 1) //参加过
      {
        this.test_Sp = true
        this.$forceUpdate();
      }
      else{
        this.test_Sp = false
        this.$forceUpdate();
      }
    },
    'content.is_test_Other':function (){
      console.log(this.content.is_test_Other)
      if(this.content.is_test_Other == 1) //参加过
      {
        this.test_Other = true
        this.$forceUpdate();
      }
      else{
        this.test_Other = false
        this.$forceUpdate();
      }
    },
  },
  methods: {

    proving() {
      this.content.nemt_grade = this.content.nemt_grade.match(/\d+(\.\d{0,1})?/) ? this.content.nemt_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.math_grade = this.content.math_grade.match(/\d+(\.\d{0,1})?/) ? this.content.math_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.chinese_grade = this.content.chinese_grade.match(/\d+(\.\d{0,1})?/) ? this.content.chinese_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.cet4_grade = this.content.cet4_grade.match(/\d+(\.\d{0,1})?/) ? this.content.cet4_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.cet6_grade = this.content.cet6_grade.match(/\d+(\.\d{0,1})?/) ? this.content.cet6_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.ielts_grade = this.content.ielts_grade.match(/\d+(\.\d{0,1})?/) ? this.content.ielts_grade.match(/\d+(\.\d{0,1})?/)[0] : '';
      this.content.toefl_grade = this.content.toefl_grade.match(/\d+(\.\d{0,1})?/) ? this.content.toefl_grade.match(/\d+(\.\d{0,1})?/)[0] : '';

    },

    submitForm(formName) {
      console.log(this.content)
      console.log("学习的其他语种名是:"+this.content.other_name)


      var _this = this;
      //各个问卷调查格式都正确
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if(this.content.russian_year==''&&this.content.japanese_grade==''&&
              this.content.french_grade==''&&this.content.german_grade==''&&
              this.content.spanish_grade==''&&this.content.other_grade=='')
          {
            this.content.no_otherlan=1;
          }
          else{
            this.content.no_otherlan=0;
          }
          console.log(this.content);
          this.$confirm('确定问卷填写无误?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //赋值给全局变量
            GLOBAL.content=this.content;
            GLOBAL.content.email=GLOBAL.email;
            GLOBAL.content.invited_code=GLOBAL.invited_code
            GLOBAL.content.aural_done=false;
            GLOBAL.content.word_done=false;
            var _this = this;
            axios.post('user/save', GLOBAL.content).then(
                function (resp) {
                  if (resp.data != null) {
                    _this.$message({
                      message: '问卷填写成功，成功进入系统！',
                      type: 'success',

                    });

                    GLOBAL.session='first';
                    //这里需要存的全局变量邮箱应该是由后端发来的邮箱
                    GLOBAL.email=resp.data.email;
                    // _this.$router.push('/Audition');
                    _this.$router.push('/Index');


                  }

                });




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
.normal{
  font-size:22px;
  font-weight: normal;
}
/*.el-form-item>>>{*/
/*  font-size:22px;*/
/*}*/

.el-form-item >>> label{
  font-size: 22px;
}

.el-select >>>{
  font-size: 22px;
}








</style>
