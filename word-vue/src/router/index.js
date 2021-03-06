import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Try from "../views/Try";
import Try2 from "../views/Try2";
import try4 from "../views/try4";
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
import Trainpart2 from "../views/test4/train/Trainpart2";
import Lettertrain from "../views/test4/train/Lettertrain";
import Lettertrainlisten from "../views/test4/train/Lettertrainlisten";
import Lettertrainjudge from "../views/test4/train/Lettertrainjudge";
import Cannottest from "../views/test4/train/Cannottest";
import Sentencetrain from "../views/test4/train/Sentencetrain";
import Sentenceplay from "../views/test4/train/Sentenceplay";
import Sentenceplayjudge from "../views/test4/train/Sentenceplayjudge";
import Sentencetrainbegin from "../views/test4/train/Sentencetrainbegin";

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
import EmailRegister from "../views/EmailRegister";
import EmailLogin from "../views/EmailLogin";
import Index2 from "../views/Index2";
import InformConsent from "../views/InformConsent";
import Will from "../views/Will";
import BeforeLogin from "../views/BeforeLogin";


Vue.use(VueRouter)

const routes = [
//?????????????????????
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
  //????

  //?????????
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
  // {
  //   path: '/test2study11',
  //   name: 'test2study11',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study11.vue')
  // },
  // {
  //   path: '/test2study12',
  //   name: 'test2study12',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study12.vue')
  // },
  // {
  //   path: '/test2study13',
  //   name: 'test2study13',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study13.vue')
  // },
  // {
  //   path: '/test2study14',
  //   name: 'test2study14',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/test2/test2study14.vue')
  // },
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
  //????

  // {
  //   path: "/Audition",
  //   name:"??????",
  //   component:Audition,
  //
  // },
  {
    path:"/BeforeLogin",
    name:"?????????????????????",
    component:BeforeLogin
  },

  {
    path:"/",
    redirect:"/BeforeLogin"
  },

  {
    path: "/Login",
    name:"??????",
    component:Login,

  },
  {
    path: "/EmailLogin",
    name:"????????????",
    component:EmailLogin

  },
  {
    path: "/EmailRegister",
    name:"????????????",
    component:EmailRegister,

  },
  {
    path:"/Will",
    name:"????????????",
    component: Will
  },
  {
    path:"/Index2",
    name:"??????2",
    component: Index2
  },
  {
    path: "/Try",
    name:"??????",
    component: Try,
  },
  {
    path: "/Try2",
    name:"??????2",
    component: Try2,
  },
  {
    path: "/Try4",
    name:"??????4",
    component: try4,
  },
  {
    path:"/Notification",
    name:"?????????",
    component: Notification,
  },
  {
    path:"/InformConsent",
    name:"???????????????",
    component: InformConsent,
  },
  {
    path:"/Questionnaire",
    name:"????????????",
    component: Questionnaire,

  },
  {
    path:"/Index",
    name:"??????",
    component: Index
  },
  {
    path:"/Trainindex",
    name:"??????????????????",
    component: Trainindex,
  },
  {
    path:"/Trainpart1",
    name:"????????????????????????",
    component: Trainpart1,
  },
  {
    path:"/Wordplay",
    name:"??????????????????????????????",
    component: Wordplay
  },
  {
    path:"/Wordplayjudge",
    name:"????????????????????????????????????",
    component: Wordplayjudge
  },
  {
    path:"/Wordtrainbegin",
    name:"??????????????????????????????",
    component: Wordtrainbegin,
  },
  {
    path:"/Wordtrain",
    name:"?????????",
    component: Wordtrain
  },
  {
    path:"/Wordtrainjudge",
    name:"????????????",
    component: Wordtrainjudge
  },
  {
    path:"/Part1result",
    name:"???????????????????????????",
    component: Part1result,
  },

  {
    path:"/Trainpart2",
    name:"????????????????????????",
    component: Trainpart2,
  },

  {
    path:"/Lettertrain",
    name:"??????????????????",
    component: Lettertrain
  },
  {
    path:"/Lettertrainlisten",
    name:"?????????",
    component: Lettertrainlisten,

  },
  {
    path:"/Lettertrainjudge",
    name:"/Lettertrainjudge",
    component: Lettertrainjudge,

  },
  {
    path:"/cannottest",
    name:"?????????????????????",
    component: Cannottest,

  },
  {
    path:"/Sentencetrain",
    name:"??????????????????",
    component: Sentencetrain
  },
  {
    path:"/Sentenceplay",
    name:"??????????????????",
    component: Sentenceplay
  },
  {
    path:"/Sentenceplayjudge",
    name:"???????????????????????????",
    component: Sentenceplayjudge
  },
  {
    path:"/Sentencetrainbegin",
    name:"?????????????????????????????????",
    component: Sentencetrainbegin
  },



  {
    path:"/Sentencetrainjudge",
    name:"/Sentencetrainjudge",
    component: Sentencetrainjudge
  },
  {
    path:"/LStrain",
    name:"????????????+??????????????????",
    component: LStrain,
  },
  {
    path:"/LStrainlistenS",
    name:"????????????+??????????????????????????????",
    component: LStrainlistenS,
  },
  {
    path:"/LStrainjudgeS",
    name:"/LStrainjudgeS",
    component: LStrainjudgeS,

  },
  {
    path:"/LStrainlistenL",
    name:"????????????+??????????????????????????????",
    component: LStrainlistenL,
  },
  {
    path:"/LStrainjudgeL",
    name:"/LStrainjudgeL",
    component: LStrainjudgeL,

  },
  {
    path:"/Resultshow",
    name:"??????????????????",
    component: Resultshow,

  },

  {
    path:"/LStest",
    name:"?????????????????????",
    component: LStest,


  },
  {
    path:"/LStestlistenS",
    name:"?????????????????????",
    component: LStestlistenS,


  },
  {
    path:"/LStestjudgeS",
    name:"????????????????????????",
    component:LStestjudgeS,


  },
  {
    path:"/LStestlistenL",
    name:"?????????????????????",
    component: LStestlistenL,


  },
  {
    path:"/LStestjudgeL",
    name:"????????????????????????",
    component: LStestjudgeL,


  },
  {
    path:"/Result",
    name:"????????????????????????",
    component: Result,


  },
  {
    path:"/Endshow",
    name:"??????????????????",
    component: Endshow,


  },








  {
    path: "/admin/Adminlogin",
    name:"?????????????????????",
    component: Adminlogin,
  },
  {
    path: "/admin/Adminindex",
    name:"??????????????????",
    component: Adminindex,
  },
  {
    path: '/admin/AdminCode',
    name: '????????????????????????',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminCode')
  },
  {
    path:"/end",
    name:"laa????????????",
    component: ()=>import("../components/testThreeWord/end")
  },
//??????


  //???????????????1
  {
    path:"/recordTrainpart1",
    name:"???????????????1",
    component: ()=>import("../views/test4/train/record/recordTrainpart1")
  },
  //???????????????2
  {
    path:"/recordTrainpart2",
    name:"???????????????2",
    component: ()=>import("../views/test4/train/record/recordTrainpart2")
  },
  //???????????????3
  {
    path:"/recordTrainpart3",
    name:"???????????????3",
    component: ()=>import("../views/test4/train/record/recordTrainpart3")
  },
  //??????????????????
  {
    path:"/trainAudioPlay",
    name:"??????????????????",
    component: ()=>import("../views/test4/train/record/trainAudioPlay")
  },
  //??????????????????
  {
    path:"/testAudioPlay",
    name:"??????????????????",
    component: ()=>import("../views/test4/train/record/testAudioPlay")
  },
  //??????????????????
  {
    path:"/recordShow",
    name:"??????????????????",
    component: ()=>import("../views/test4/train/record/recordShow")
  },



]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
