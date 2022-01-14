import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Try from "../views/Try";
import Try2 from "../views/Try2";
import Notification from "../views/Notification";
import Questionnaire from "../views/Questionnaire";
// import Audition from "../views/Audition";
import Index from "../views/Index";
import Trainindex from "../views/test4/train/Trainindex";
import Trainpart1 from "../views/test4/train/Trainpart1";
import Wordplay from "../views/test4/train/Wordplay";
import Wordplayjudge from "../views/test4/train/Wordplayjudge";
import Wordtrainbegin from "../views/test4/train/Wordtrainbegin";
import Wordtrain from "../views/test4/train/Wordtrain";
import Wordtrainjudge from "../views/test4/train/Wordtrainjudge";
import Part1result from "../views/test4/train/Part1result";
import Letterlistenbegin from "../views/test4/train/Letterlistenbegin";
import Letterlisten from "../views/test4/train/Letterlisten";
import Trainpart2 from "../views/test4/train/Trainpart2";
import Lettertrain from "../views/test4/train/Lettertrain";
import Lettertrainlisten from "../views/test4/train/Lettertrainlisten";
import Lettertrainjudge from "../views/test4/train/Lettertrainjudge";
import Cannottest from "../views/test4/train/Cannottest";
import Sentencetrain from "../views/test4/train/Sentencetrain";
import Sentenceplay from "../views/test4/train/Sentenceplay";
import Sentenceplayjudge from "../views/test4/train/Sentenceplayjudge";
import Sentencetrainbegin from "../views/test4/train/Sentencetrainbegin";
import Sentencetrainlisten from "../views/test4/train/Sentencetrainlisten";
import Sentencetrainjudge from "../views/test4/train/Sentencetrainjudge";
import LStrain from "../views/test4/train/LStrain";
import LStrainlistenS from "../views/test4/train/LStrainlistenS";
import LStrainjudgeS from "../views/test4/train/LStrainjudgeS";
import LStrainlistenL from "../views/test4/train/LStrainlistenL";
import LStrainjudgeL from "../views/test4/train/LStrainjudgeL";
import Resultshow from "../views/test4/train/Resultshow";
import LStest from "../views/test4/test/LStest";
import LStestlistenS from "../views/test4/test/LStestlistenS";
import LStestjudgeS from "../views/test4/test/LStestjudgeS";
import LStestlistenL from "../views/test4/test/LStestlistenL";
import LStestjudgeL from "../views/test4/test/LStestjudgeL";
import Result from "../views/test4/test/Result";
import Endshow from "../views/test4/test/Endshow";
import Adminlogin from "../views/admin/Adminlogin";
import Adminindex from "../views/admin/Adminindex";
import EmailLogin from "../views/EmailLogin";
import EmailRegister from "../views/EmailRegister";
import Index2 from "../views/Index2";
import InformConsent from "../views/InformConsent";
import Will from "../views/Will";


Vue.use(VueRouter)

  const routes = [
//测试一和测试三
    {
      path:"/Ending",
      name: "新增加的结束页面",
      component: () => import("../views/Ending")
    },
    {
      path:"/BeforeLogin",
      name:"最开始欢迎页面",
      component: () => import("../views/BeforeLogin")
    },
    {
      path:"/",
      redirect:"/BeforeLogin" // Index
    },
    {
      path: '/test1',
      name: 'test1',
      component: () => import('../views/test1/test1')
    },
    {
      path: '/test3',
      name: 'test3',
      component: () => import('../views/test3/test3')
    },
      //👆

      //测试二
    {
      path: '/beforetest2',
      name: 'beforetest2',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/beforetest2.vue')
    },
    {
      path: '/test2final',
      name: 'test2final',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2final.vue')
    },
    {
      path: '/test2study1',
      name: 'test2study1',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study1.vue')
    },
    {
      path: '/test2study2',
      name: 'test2study2',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study2.vue')
    },
    {
      path: '/test2study3',
      name: 'test2study3',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study3.vue')
    },
    {
      path: '/test2study4',
      name: 'test2study4',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study4.vue')
    },
    {
      path: '/test2study05',
      name: 'test2study05',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study05.vue')
    },
    {
      path: '/test2study06',
      name: 'test2study06',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study06.vue')
    },
    {
      path: '/test2study5',
      name: 'test2study5',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study5.vue')
    },
    {
      path: '/test2study6',
      name: 'test2study6',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study6.vue')
    },
    {
      path: '/test2study7',
      name: 'test2study7',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study7.vue')
    },
    {
      path: '/test2study08',
      name: 'test2study08',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study08.vue')
    },
    {
      path: '/test2test1',
      name: 'test2test1',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2test1.vue')
    },
    {
      path: '/test2test2',
      name: 'test2test2',
      component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2test2.vue')
    },
      //👆

    // {
    //   path: "/Audition",
    //   name:"试音",
    //   component:Audition,
    //
    // },

    {
      path:"/",
      redirect:"/login"
    },

    {
      path: "/Login",
      name:"登录",
      component:Login,

    },
    {
      path: "/EmailLogin",
      name:"邮箱登录",
      component:EmailLogin

    },
    {
      path: "/EmailRegister",
      name:"邮箱注册",
      component:EmailRegister,

    },
    {
      path: "/Try",
      name:"尝试",
      component: Try,
    },
    {
      path: "/Try2",
      name:"尝试2",
      component: Try2,
    },
    {
      path:"/Notification",
      name:"告知书",
      component: Notification,
    },
    {
      path:"/InformConsent",
      name:"告知书表",
      component: InformConsent,
    },

    {
      path:"/Questionnaire",
      name:"问卷调查",
      component: Questionnaire,

    },
    {
      path:"/Index",
      name:"主页",
      component: Index
    },
    {
      path:"/Will",
      name:"愿意采访",
      component: Will
    },
    {
      path:"/Index2",
      name:"主页2",
      component: Index2
    },
    {
      path:"/Trainindex",
      name:"训练阶段主页",
      component: Trainindex,
    },
    {
      path:"/Trainpart1",
      name:"训练阶段第一部分",
      component: Trainpart1,
    },
    {
      path:"/Wordplay",
      name:"训练阶段第一部分玩的",
      component: Wordplay
    },
    {
      path:"/Wordplayjudge",
      name:"训练阶段第一部分玩的评价",
      component: Wordplayjudge
    },
    {
      path:"/Wordtrainbegin",
      name:"训练阶段第一部分开始",
      component: Wordtrainbegin,
    },
    {
      path:"/Wordtrain",
      name:"听单词",
      component: Wordtrain
    },
    {
      path:"/Wordtrainjudge",
      name:"评判单词",
      component: Wordtrainjudge
    },
    {
      path:"/Part1result",
      name:"第一部分的结果展示",
      component: Part1result,
    },
    {
      path:"/Letterlisten",
      name:"熟悉字母音频",
      component: Letterlisten,
    },
    {
      path:"/Letterlistenbegin",
      name:"开始熟悉字母音频",
      component: Letterlistenbegin,
    },
    {
      path:"/Trainpart2",
      name:"训练阶段第二部分",
      component: Trainpart2,
    },

    {
      path:"/Lettertrain",
      name:"字母记忆练习",
      component: Lettertrain
    },
    {
      path:"/Lettertrainlisten",
      name:"听字母",
      component: Lettertrainlisten,

    },
    {
      path:"/Lettertrainjudge",
      name:"/Lettertrainjudge",
      component: Lettertrainjudge,

    },
    {
      path:"/cannottest",
      name:"不能再进行测试",
      component: Cannottest,

    },
    {
      path:"/Sentencetrain",
      name:"句子理解练习",
      component: Sentencetrain
    },
    {
      path:"/Sentenceplay",
      name:"句子理解玩玩",
      component: Sentenceplay
    },
    {
      path:"/Sentenceplayjudge",
      name:"句子理解玩玩的判断",
      component: Sentenceplayjudge
    },
    {
      path:"/Sentencetrainbegin",
      name:"听句子理解真的要开始了",
      component: Sentencetrainbegin
    },


    {
      path:"/Sentencetrainlisten",
      name:"听句子",
      component: Sentencetrainlisten
    },
    {
      path:"/Sentencetrainjudge",
      name:"/Sentencetrainjudge",
      component: Sentencetrainjudge
    },
    {
      path:"/LStrain",
      name:"字母记忆+句子理解练习",
      component: LStrain,
    },
    {
      path:"/LStrainlistenS",
      name:"字母记忆+句子理解练习中听句子",
      component: LStrainlistenS,
    },
    {
      path:"/LStrainjudgeS",
      name:"/LStrainjudgeS",
      component: LStrainjudgeS,

    },
    {
      path:"/LStrainlistenL",
      name:"字母记忆+句子理解练习中听字母",
      component: LStrainlistenL,
    },
    {
      path:"/LStrainjudgeL",
      name:"/LStrainjudgeL",
      component: LStrainjudgeL,

    },
    {
      path:"/Resultshow",
      name:"结果展示界面",
      component: Resultshow,

    },

    {
      path:"/LStest",
      name:"正式测试主页面",
      component: LStest,


    },
    {
      path:"/LStestlistenS",
      name:"正式测试听句子",
      component: LStestlistenS,


    },
    {
      path:"/LStestjudgeS",
      name:"正式测试判断句子",
      component:LStestjudgeS,


    },
    {
      path:"/LStestlistenL",
      name:"正式测试听字母",
      component: LStestlistenL,


    },
    {
      path:"/LStestjudgeL",
      name:"正式测试判断字母",
      component: LStestjudgeL,


    },
    {
      path:"/Result",
      name:"正式测试结果展示",
      component: Result,


    },
    {
      path:"/Endshow",
      name:"结束页面展示",
      component: Endshow,


    },

    {
      path: "/Adminlogin",
      name:"管理员登录界面",
      component: Adminlogin,
    },
    {
      path: "/Adminindex",
      name:"管理员主界面",
      component: Adminindex,
    },
    {
      path: '/AdminCode',
      name: '管理员邀请码页面',
      component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminCode')
    },
    {
      path:"/end",
      name:"laa最后结束",
      component: ()=>import("../components/testThree/end")
    },
    {
      path:"/AdminDownloadData",
      name:"下载数据页面",
      component: ()=>import("../views/admin/AdminDownload")
    },
    {
      path: "/AdminDownloadReport",
      name:"下载成绩页面",
      component: ()=>import("../views/admin/AdminReport")
    },
    //录音
    {
      path:"/r",
      name:"录音",
      component: ()=>import("../views/test4/recoderTest/recoderTest")
    },

    //录音提示音1
    {
      path:"/recordTrainpart1",
      name:"录音提示音1",
      component: ()=>import("../views/test4/train/record/recordTrainpart1")
    },
    //录音提示音2
    {
      path:"/recordTrainpart2",
      name:"录音提示音2",
      component: ()=>import("../views/test4/train/record/recordTrainpart2")
    },
    //录音提示音3
    {
      path:"/recordTrainpart3",
      name:"录音提示音3",
      component: ()=>import("../views/test4/train/record/recordTrainpart3")
    },
    //录音训练页面
    {
      path:"/trainAudioPlay",
      name:"录音训练页面",
      component: ()=>import("../views/test4/train/record/trainAudioPlay")
    },
    //录音测试页面
    {
      path:"/testAudioPlay",
      name:"录音测试页面",
      component: ()=>import("../views/test4/train/record/testAudioPlay")
    },
    //录音展示页面
    {
      path:"/recordShow",
      name:"录音展示页面",
      component: ()=>import("../views/test4/train/record/recordShow")
    },


  ]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
