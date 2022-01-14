
// const baseURL = 'http://139.186.128.135:818/'
const baseURL  ='http://139.186.128.135:8089/studytest-0.0.1-SNAPSHOT/'
// const baseURL = 'http://localhost:8089/studytest-0.0.1-SNAPSHOT/' //与后端项目启动的地址及端口号保持一致(当前后端都部署在本机时，端口号不能冲突)，方能正确请求到所需资源
// const baseURL  ='https://fc8978.site/studytest-0.0.1-SNAPSHOT/'

const staticURL = '@/assets/audio/'

const save =[] //w 用来存储全局变量 test_info
const save_array =[] //w 用来存储全局变量 test_info_total
const save_score =[] //w 用来存储全局变量 aural_score

//以下为8.22所写
//题型4的训练阶段的总介绍
var train_introduce=[]
// var train_introduce=[require('./../assets/test_audio/Instruction_10.mp3'),require('./../assets/test_audio/Instruction_03.mp3'),require('./../assets/test_audio/SetA_L1_A.mp3')]
//题型4的第一部分介绍
var train_introduce_part1=[]
// var train_introduce_part1 = [require('./../assets/test_audio/Instruction_A12.mp3'), require('./../assets/test_audio/SetA_L1_B.mp3')]

//题型4的训练单词
var train_word_play=[]
//题型4的训练单词的描述
var train_word_play_des=[]
//题型4测试单词开始
var train_word_begin=[]
//题型4测试单词
var train_word=[]
//题型4测试单词的描述
var train_word_des=[]
//题型四的第一部分正式练习提示音
var train_word_end=[]
//题型4第一部分用于打乱顺序的
var train_word_set=[('身影','车队','仓库','渗透','场景','签字','镜子','旋转','报社','平安','棉花','睡眠','制约','发射','往事','葡萄','取代','报刊','会场','动机','牙齿','寒冷','含义','驾驶','破产','日记','安装','钢琴','处分','水稻','公认','蚂蚁','穷人','课堂','气温','忽略','股东','原先','海关','技能','日期','记载','聚集','金属','火山','指挥','较量','伦理','宴会','夸张','天堂','生产','公寓','打扮','暗示','文凭','挖掘','天然','困境','走私','导师','性别','流氓','生育','羡慕','废话','痕迹','大脑','烦恼','建议','牛奶','血管','区别','影响','骨头','大海','公元','空白','照样','衡量','延长','约束','衡量','清晨','特意','参考')]
//题型4用户判断正确的单词个数
var user_right_w = 0
//题型4的第二部分介绍
var train_introduce_part2=[]



//题型4的字母记忆介绍
var train_letter_introduce=new Array()
// var train_letter_introduce = [require('./../assets/test_audio/Instruction_A13.mp3'), require('./../assets/test_audio/SetA_L1_C.mp3'),
//     require('./../assets/test_audio/Instruction_22.mp3'), require('./../assets/test_audio/SetA_L1_A_twice.mp3')]

//字母记忆的音频源，这里为了验证用户是否具备一定的英语能力，有一些逻辑处理，因此音频文件按照老师的意思这里改为[1,2,1,2,1]的形式
var letter_src=new Array()
// var letter_src = [[require('./../assets/test_audio/F.mp3'), require('./../assets/test_audio/T.mp3')
//     , require('./../assets/test_audio/N.mp3')],
//     [require('./../assets/test_audio/Y.mp3'), require('./../assets/test_audio/Q.mp3'),
//         require('./../assets/test_audio/X.mp3'), require('./../assets/test_audio/K.mp3')],
//     [require('./../assets/test_audio/F.mp3'), require('./../assets/test_audio/T.mp3')
//         , require('./../assets/test_audio/N.mp3')],
//     [require('./../assets/test_audio/Y.mp3'), require('./../assets/test_audio/Q.mp3'),
//         require('./../assets/test_audio/X.mp3'), require('./../assets/test_audio/K.mp3')],
//     [require('./../assets/test_audio/F.mp3'), require('./../assets/test_audio/T.mp3')
//         , require('./../assets/test_audio/N.mp3')]
// ]
//定义一个用户判断字母正确率的数组，用于在Lettertrainjudge中进行判断。不可复用
var user_L_judge = new Array()
//字母记忆的音频描述
var letter_des=new Array()
// var letter_des = [['F', 'T', 'N'],
//     ['Y', 'Q', 'X', 'K'],
//     ['F', 'T', 'N'],
//     ['Y', 'Q', 'X', 'K'],
//     ['F', 'T', 'N'],
// ]

//题型四句子理解的介绍1
var train_sentence_introduce=new Array()
// var train_sentence_introduce = [require('./../assets/test_audio/SetA_L1_B_twice.mp3'), require('./../assets/test_audio/SetA_L1_C_twice.mp3'),
//     require('./../assets/test_audio/Instruction_23.mp3')]

//题型四句子理解前面两个玩的音频
var train_sentence_play =new Array()
// var train_sentence_play = [require('./../assets/test_audio/Instruction_40.mp3'), require('./../assets/test_audio/Instruction_A41.mp3')
// ]
//题型四句子理解前面两个玩的音频的描述
var sentence_play_des =new Array()
// var sentence_play_des = ['true', 'false']

//题型四句子理解的介绍2
var train_sentence_begin =new Array()
// var train_sentence_begin = [require('./../assets/test_audio/SetA_L2_A.mp3'), require('./../assets/test_audio/Instruction_A42.mp3')]


//句子理解的音频源,这里先给四个
var sentence_src=new Array()
// var sentence_src = [require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/No1.mp3'),
//     require('./../assets/test_audio/Yes2.mp3'), require('./../assets/test_audio/No2.mp3')]

//句子理解的备份，用于30秒强制退出
var sentence_src_backup=new Array()


var sentence_des_backup=new Array()
//句子理解的音频描述,这里先给四个
var sentence_des =new Array()


// var sentence_des = ['true', 'false', 'true', 'false']
//用户做出句子判断的已正确数，我这里准备复用多次
var user_right_S = 0
//用户已听的句子个数，我这里准备复用多次
var user_total_S = 0

//混合模式的提示音
var train_mix_introduce=new Array()
// var train_mix_introduce = [require('./../assets/test_audio/SetA_L2_B.mp3'), require('./../assets/test_audio/Instruction_A43.mp3'),
//
// ]
//混合模式的音频源(句子和字母交错的形式)，这里根据ppt上所说，给出3组，每组两个句子和两个字母
var train_LS_src =new Array()
// var train_LS_src = [[require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/H.mp3'),
//     require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/J.mp3')],
//     [require('./../assets/test_audio/Yes2.mp3'), require('./../assets/test_audio/F.mp3'),
//         require('./../assets/test_audio/No2.mp3'), require('./../assets/test_audio/N.mp3')],
//     [require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/K.mp3'),
//         require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/L.mp3')]
// ]
//混合模式的句子和字母描述
var train_des =new Array()
// var train_des = [['true', 'H', 'false', 'J'], ['true', 'F', 'false', 'N'], ['true', 'K', 'false', 'L']]

//中间临时音频源数组，作用是提取出train_LS_src中的一维数组，便于区分不同的训练组,可复用
var temp_LS_src = new Array()
// 中间临时音频答案数组
var temp_LS_des = new Array()
//在一个训练组里面，用户对于句子的判断结果，里面存放true或false，判断得到结果后就被重置为空数组，可复用
var user_S_judge = new Array()

// 记录混合模式中用户的句子判断和字母记忆结果
var temp_answer = []

//在句子理解中用于记录句子理解中的反应时间，react_time来计时，在点击确认之后就push到train_react_S中，然后重置react_time为0
//用于混合模式中的句子理解部分的限时操作
//react_time可复用
var react_time = 0
var train_react_S = []
//用于在混合模式中来判断反应时间是否超过时限，可复用
var time_limit = 0
//得到的反应时间的均值+2.5倍方差
var mean_std = 20

//用于记录混合模式中的每组训练过程的句子正确个数，被push进去值，不复用
var train_correct_S =[]
//用于记录混合模式中的每组训练过程的字母正确个数，被push进去值，不复用
var train_correct_L = []


//以下是正式测试需要用到的变量
//可复用的变量：
// //用户做出句子判断的已正确数，我这里准备复用多次
// var user_right_S=0
// //用户已听的句子个数，我这里准备复用多次
// var user_total_S=0
// //中间临时音频源数组，作用是提取出train_LS_src中的一维数组，便于区分不同的训练组,可复用
// var temp_LS_src = new Array()
// //在一个训练组里面，用户对于句子的判断结果，里面存放true或false，判断得到结果后就被重置为空数组，可复用
// var user_S_judge = new Array()
// //react_time可复用
// var react_time =0
// //用于在混合模式中来判断反应时间是否超过时限，可复用
// var time_limit=0


//正式测试的提示音
var test_introduce=[]
// var test_introduce = [require('./../assets/test_audio/SetA_L4_A.mp3')]
//正式测试的音频源（句子+字母）
var test_LS_src =[]
// var test_LS_src = [[require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/H.mp3'),
//     require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/J.mp3')],
//     [require('./../assets/test_audio/Yes2.mp3'), require('./../assets/test_audio/F.mp3'),
//         require('./../assets/test_audio/No2.mp3'), require('./../assets/test_audio/N.mp3')],
//     [require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/K.mp3'),
//         require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/L.mp3')]
// ]

var test_des =[]
// var test_des = [['true', 'H', 'false', 'J'], ['true', 'F', 'false', 'N'], ['true', 'K', 'false', 'L']]

//正式测试的反应时间记录数组
var test_react_S = []

//用于记录混合模式中的每组训练过程的句子正确个数，被push进去值，不复用
var test_correct_S = []
//用于记录混合模式中的每组训练过程的字母正确个数，被push进去值，不复用
var test_correct_L = []

//用于显示在右上角的句子正确率
var test_S_accuracy = ''

//用于第一部分的进度条展示
var part1_test_length=18
//测试的组数，用于进度条
var test_length=15



export default {

    baseURL,

    staticURL,
    save,
    save_array,
    save_score,

    time_limit,



    train_introduce,
    train_introduce_part1,
    train_word_play,
    train_word_play_des,
    train_word_begin,
    train_word,
    train_word_des,
    train_word_end,
    train_word_set,
    part1_test_length,
    user_right_w,
    train_introduce_part2,

    train_letter_introduce,

    letter_src,
    user_L_judge,
    letter_des,

    train_sentence_introduce,
    train_sentence_play,
    sentence_play_des,
    train_sentence_begin,


    user_right_S,
    user_total_S,
    sentence_src,
    sentence_src_backup,
    sentence_des,
    sentence_des_backup,

    react_time,
    train_react_S,
    mean_std,


    train_mix_introduce,
    train_LS_src,
    // train_L_des,
    // train_S_des,
    train_des,

    temp_LS_src,
    temp_LS_des,
    temp_answer,
    user_S_judge,

    train_correct_S,
    train_correct_L,


    test_introduce,
    test_LS_src,
    test_des,
    // test_L_des,
    // test_S_des,
    test_react_S,
    test_correct_S,
    test_correct_L,
    test_length,
    test_S_accuracy,

    testType:'',
    Session: '', // 第几次做试卷

    //题型二
    // A套图片材料
    test2_images_A:[
        require("../assets/static/test2/newImage/A/1.jpg"),
        require("../assets/static/test2/newImage/A/2.jpg"),
        require("../assets/static/test2/newImage/A/3.jpg"),
    ],
    // TEST2的A套音频材料，共8份
    test2_audio_A1:[
        require("../assets/static/test2/newAudio/Instruction_10.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A11.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_A.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A12.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_B.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A13.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_C.mp3"),
    ],
    test2_audio_A2:[
        require("../assets/static/test2/newAudio/Instruction_2.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_A_twice.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_B_twice.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_C_twice.mp3"),
    ],
    test2_audio_A3:[
        require("../assets/static/test2/newAudio/Instruction_3.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_C.mp3"),
    ],
    test2_audio_A4:[
        require("../assets/static/test2/newAudio/Instruction_40.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A41.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L2_A.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A42.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L2_B.mp3"),
        require("../assets/static/test2/newAudio/A/Instruction_A43.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L2_C.mp3"),
    ],
    test2_audio_A5:[
        require("../assets/static/test2/newAudio/Instruction_5.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L3_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L3_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L3_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L4_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L4_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L4_C.mp3"),
    ],
    test2_audio_A6:[
        require("../assets/static/test2/newAudio/Instruction_6.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L1_C.mp3"),
    ],
    test2_audio_A7:[
        require("../assets/static/test2/newAudio/Instruction_7.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L5_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L6_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L5_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L5_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L6_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_L6_B.mp3"),
    ],
    test2_audio_A8:[
        require("../assets/static/test2/newAudio/A/SetA_T2_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T2_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T2_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T1_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T1_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T1_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T3_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T3_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T3_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T5_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T5_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T5_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T4_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T4_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T4_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T6_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T6_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T6_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T7_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T7_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T7_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T10_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T10_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T10_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T8_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T8_C.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T8_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T9_B.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T9_A.mp3"),
        require("../assets/static/test2/newAudio/A/SetA_T9_C.mp3"),
    ],
    // TEST2的B套图片材料
    test2_images_B:[
        require("../assets/static/test2/newImage/B/4.jpg"),
        require("../assets/static/test2/newImage/B/5.jpg"),
        require("../assets/static/test2/newImage/B/6.jpg"),
    ],
    // TEST2的B套音频材料，共8份
    test2_audio_B1:[
        require("../assets/static/test2/newAudio/Instruction_10.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B11.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_A.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B12.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_B.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B13.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_C.mp3"),
    ],
    test2_audio_B2:[
        require("../assets/static/test2/newAudio/Instruction_2.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_A_twice.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_B_twice.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_C_twice.mp3"),
    ],
    test2_audio_B3:[
        require("../assets/static/test2/newAudio/Instruction_3.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_C.mp3"),
    ],
    test2_audio_B4:[
        require("../assets/static/test2/newAudio/Instruction_40.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B41.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L2_A.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B42.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L2_B.mp3"),
        require("../assets/static/test2/newAudio/B/Instruction_B43.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L2_C.mp3"),
    ],
    test2_audio_B5:[
        require("../assets/static/test2/newAudio/Instruction_5.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L3_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L3_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L3_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L4_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L4_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L4_C.mp3"),
    ],
    test2_audio_B6:[
        require("../assets/static/test2/newAudio/Instruction_6.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L1_C.mp3"),
    ],
    test2_audio_B7:[
        require("../assets/static/test2/newAudio/Instruction_7.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L5_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L6_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L5_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L5_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L6_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_L6_B.mp3"),
    ],
    test2_audio_B8:[
        require("../assets/static/test2/newAudio/B/SetB_T2_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T2_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T2_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T1_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T1_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T1_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T3_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T3_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T3_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T5_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T5_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T5_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T4_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T4_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T4_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T6_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T6_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T6_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T7_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T7_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T7_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T10_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T10_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T10_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T8_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T8_C.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T8_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T9_B.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T9_A.mp3"),
        require("../assets/static/test2/newAudio/B/SetB_T9_C.mp3"),
    ],


    score1:0,
    score2:0,
    user_ans1:[],
    user_ans2:[],
    test2_imgs:[],
    user_id:1,
    corr_ans:['A','B','C','C','A','B','A','C','B','A','B','C','C','A','B',
               'A','C','B','C','A','B','C','B','A','B','C','A','B','A','C'],

    test2_trial_index: [2, 2, 2, 1, 1, 1, 3, 3, 3, 5, 5, 5, 4, 4, 4,
                        6, 6, 6, 7, 7, 7, 10, 10, 10, 8, 8, 8, 9, 9, 9],

    corr_ans2:['A','C','A','C','A','B','B','C','C','B','A','C','B','B','A'],
    react_time1:[],
    react_time2:[],
    correct1:[],
    correct2: [],
    stimulus:[],
    stimulus1:['vieta nebūna tuščia', 'vata nebūna tuščia', 'vyta nebūna tuščia', 'vyta po saule', 'vieta po saule', 'vata po saule',
                'mažas vieta', 'mažas vyta', 'mažas vata', 'velnio vieta', 'velnio vata', 'velnio vyta',
                'tavo vyta', 'tavo vieta', 'tavo vata', 'labai slidi vieta', 'labai slidi vyta', 'labai slidi vata',
                'kairėj vyta buvo', 'kairėj vieta buvo', 'kairėj vata buvo', 'šita vyta patraukli', 'šita vata patraukli', 'šita vieta patraukli',
                'tikra vata trapi', 'tikra vyta trapi', 'tikra vieta trapi', 'bloga vata parinkta', 'bloga vieta parinkta', 'bloga vyta parinkta'],

    stimulus2:['sauja pakilo pirmyn', 'sėja pakilo pirmyn', 'sija pakilo pirmyn', 'sija su vėju', 'sauja su vėju', 'sėja su vėju',
               'vėsi sauja', 'vėsi sija', 'vėsi sėja', 'vario sauja', 'vario sėja', 'vario sija',
               'dievo sija', 'dievo sauja', 'dievo sėja', 'kokia tyra sauja', 'kokia tyra sija', 'kokia tyra sėja',
               'laisvai sija teka', 'laisvai sauja teka', 'laisvai sėja teka', 'ryte sija dainuoja', 'ryte sėja dainuoja', 'ryte sauja dainuoja',
               'vaikų sėja švari', 'vaikų sija švari', 'vaikų sauja švari', 'moters sėja tobula', 'moters sauja tobula', 'moters sija tobula'],
    time_elapsed1:'',
    time_elapsed2:'',
    rt1:[],
    rt2:[],
    test2_materialType:'',
    test2_dataBag:[],
    test2_audio1:[],
    test2_audio2:[],
    test2_audio3:[],
    test2_audio4:[],
    test2_audio5:[],
    test2_audio6:[],
    test2_audio7:[],
    test2_audio8:[],


    // 题型四-->句子判断练习及测试阶段+混合模式练习阶段A套材料
    test4_audio_A1_src:[
        require("../assets/static/test4/newAudio/A/A_L1.mp3"),
        require("../assets/static/test4/newAudio/A/A_L2.mp3"),
    ],
    test4_audio_A1_des:[
        "true",
        "false",
    ],
    test4_audio_A2_src:[
        require("../assets/static/test4/newAudio/A/A_L3.mp3"),
        require("../assets/static/test4/newAudio/A/A_L4.mp3"),
        require("../assets/static/test4/newAudio/A/A_L5.mp3"),
        require("../assets/static/test4/newAudio/A/A_L6.mp3"),
        require("../assets/static/test4/newAudio/A/A_L7.mp3"),
        require("../assets/static/test4/newAudio/A/A_L8.mp3"),
        require("../assets/static/test4/newAudio/A/A_L9.mp3"),
        require("../assets/static/test4/newAudio/A/A_L10.mp3"),
        require("../assets/static/test4/newAudio/A/A_L11.mp3"),
        require("../assets/static/test4/newAudio/A/A_L12.mp3"),
        require("../assets/static/test4/newAudio/A/A_L13.mp3"),
        require("../assets/static/test4/newAudio/A/A_L14.mp3"),
        require("../assets/static/test4/newAudio/A/A_L15.mp3"),
        require("../assets/static/test4/newAudio/A/A_L16.mp3"),
        require("../assets/static/test4/newAudio/A/A_L17.mp3"),
    ],
    test4_audio_A2_des:[
        "true", "false", "true", "true", "false",
        "true", "false", "false", "true", "true",
        "false", "false", "true", "true", "false",
    ],
    test4_audio_A3_src:[
        [require("../assets/static/test4/newAudio/A/A_L18.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A_L19.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),],

        [require("../assets/static/test4/newAudio/A/A_L20.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A_L21.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A_L22.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
    ],
    test4_audio_A3_des:[
        ["false", "C", "true", "Y"],
        ["true", "T", "false", "A", "true", "F"],
    ],
    test4_audio_A4_src:[
        [require("../assets/static/test4/newAudio/A/A1.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A2.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/A/A3.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/A/A4.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A5.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A6.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),],
        [require("../assets/static/test4/newAudio/A/A7.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/A/A8.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A9.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),],
        [require("../assets/static/test4/newAudio/A/A10.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A11.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A12.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/A/A13.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),],
        [require("../assets/static/test4/newAudio/A/A14.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A15.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/A/A16.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/A/A17.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/A/A18.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/A/A19.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A20.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/A/A21.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),],
        [require("../assets/static/test4/newAudio/A/A22.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A23.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A24.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/A/A25.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A26.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/A/A27.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A28.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A29.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A30.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/A/A31.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),],
        [require("../assets/static/test4/newAudio/A/A32.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/A/A33.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/A/A34.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/A/A35.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A36.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),],
        [require("../assets/static/test4/newAudio/A/A37.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/A/A38.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A39.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/A/A40.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/A/A41.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/A/A42.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),],
        [require("../assets/static/test4/newAudio/A/A43.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A44.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/A/A45.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/A/A46.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A47.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A48.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/A/A49.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A50.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A51.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/A/A52.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A53.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A54.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/A/A55.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A56.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A57.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/A/A58.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/A/A59.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/A/A60.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),],
        [require("../assets/static/test4/newAudio/A/A61.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/A/A62.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/A/A63.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/A/A64.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/A/A65.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/A/A66.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/A/A67.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),],
        [require("../assets/static/test4/newAudio/A/A68.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/A/A69.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/A/A70.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/A/A71.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/A/A72.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/A/A73.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/A/A74.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),],
    ],
    test4_audio_A4_des:[
        ["true", "F", "true", "W", "false", "V"],
        ["true", "C", "false", "H", "true", "J"],
        ["false", "S", "false", "T", "false", "J"],
        ["true", "F", "false", "C", "true", "S", "false", "W"],
        ["false", "A", "true", "Y", "false", "I", "true", "V"],
        ["true", "W", "true", "H", "false", "J", "true", "A"],
        ["true", "A", "false", "T", "false", "R", "true", "H", "true", "V"],
        ["false", "C", "false", "T", "false", "F", "true", "V", "false", "J"],
        ["true", "I", "true", "Y", "false", "J", "false", "F", "true", "S"],
        ["true", "R", "false", "T", "false", "J", "true", "I", "true", "V", "true", "H"],
        ["false", "A", "true", "J", "false", "W", "true", "H", "false", "F", "true", "V"],
        ["false", "H", "false", "A", "false", "W", "true", "F", "true", "C", "false", "V"],
        ["true", "C", "false", "F", "true", "H", "true", "R", "false", "T", "false", "W"],
        ["true", "Y", "false", "I", "false", "A", "true", "F", "false", "R", "true", "S", "true", "H"],
        ["true", "R", "true", "I", "false", "C", "false", "Y", "false", "J", "true", "V", "false", "A"],
    ],

    // 句子判断练习及测试阶段+混合模式练习阶段B套材料
    test4_audio_B1_src:[
        require("../assets/static/test4/newAudio/B/B_L1.mp3"),
        require("../assets/static/test4/newAudio/B/B_L2.mp3"),
    ],
    test4_audio_B1_des:[
        "true",
        "false",
    ],
    test4_audio_B2_src:[
        require("../assets/static/test4/newAudio/B/B_L3.mp3"),
        require("../assets/static/test4/newAudio/B/B_L4.mp3"),
        require("../assets/static/test4/newAudio/B/B_L5.mp3"),
        require("../assets/static/test4/newAudio/B/B_L6.mp3"),
        require("../assets/static/test4/newAudio/B/B_L7.mp3"),
        require("../assets/static/test4/newAudio/B/B_L8.mp3"),
        require("../assets/static/test4/newAudio/B/B_L9.mp3"),
        require("../assets/static/test4/newAudio/B/B_L10.mp3"),
        require("../assets/static/test4/newAudio/B/B_L11.mp3"),
        require("../assets/static/test4/newAudio/B/B_L12.mp3"),
        require("../assets/static/test4/newAudio/B/B_L13.mp3"),
        require("../assets/static/test4/newAudio/B/B_L14.mp3"),
        require("../assets/static/test4/newAudio/B/B_L15.mp3"),
        require("../assets/static/test4/newAudio/B/B_L16.mp3"),
        require("../assets/static/test4/newAudio/B/B_L17.mp3"),
    ],
    test4_audio_B2_des:[
        "false", "true", "true", "false", "true",
        "false", "true", "false", "false", "true",
        "false", "true", "false", "true", "true",
    ],
    test4_audio_B3_src:[
        [require("../assets/static/test4/newAudio/B/B_L18.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B_L19.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),],

        [require("../assets/static/test4/newAudio/B/B_L20.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/B/B_L21.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B_L22.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
    ],
    test4_audio_B3_des:[
        ["true", "C", "false", "Y"],
        ["false", "T", "true", "A", "true", "F"]
    ],
    test4_audio_B4_src:[
        [require("../assets/static/test4/newAudio/B/B1.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B2.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/B/B3.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),],
        [require("../assets/static/test4/newAudio/B/B4.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B5.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B6.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),],
        [require("../assets/static/test4/newAudio/B/B7.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B8.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/B/B9.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),],
        [require("../assets/static/test4/newAudio/B/B10.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B11.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/B/B12.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/B/B13.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
        [require("../assets/static/test4/newAudio/B/B14.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B15.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/B/B16.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/B/B17.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),],
        [require("../assets/static/test4/newAudio/B/B18.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B19.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/B/B20.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B21.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),],
        [require("../assets/static/test4/newAudio/B/B22.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B23.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B24.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/B/B25.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B26.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),],
        [require("../assets/static/test4/newAudio/B/B27.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B28.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B29.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/B/B30.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/B/B31.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),],
        [require("../assets/static/test4/newAudio/B/B32.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/B/B33.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/B/B34.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/B/B35.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/B/B36.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),],
        [require("../assets/static/test4/newAudio/B/B37.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B38.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/B/B39.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/B/B40.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B41.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B42.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),],
        [require("../assets/static/test4/newAudio/B/B43.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B44.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),
            require("../assets/static/test4/newAudio/B/B45.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B46.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/B/B47.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B48.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),],
        [require("../assets/static/test4/newAudio/B/B49.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B50.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B51.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B52.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B53.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/B/B54.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
        [require("../assets/static/test4/newAudio/B/B55.mp3"),
            require("../assets/static/test4/newAudio/T.mp3"),
            require("../assets/static/test4/newAudio/B/B56.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B57.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/B/B58.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B59.mp3"),
            require("../assets/static/test4/newAudio/W.mp3"),
            require("../assets/static/test4/newAudio/B/B60.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
        [require("../assets/static/test4/newAudio/B/B61.mp3"),
            require("../assets/static/test4/newAudio/H.mp3"),
            require("../assets/static/test4/newAudio/B/B62.mp3"),
            require("../assets/static/test4/newAudio/S.mp3"),
            require("../assets/static/test4/newAudio/B/B63.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/B/B64.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B65.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/B/B66.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),
            require("../assets/static/test4/newAudio/B/B67.mp3"),
            require("../assets/static/test4/newAudio/F.mp3"),],
        [require("../assets/static/test4/newAudio/B/B68.mp3"),
            require("../assets/static/test4/newAudio/A.mp3"),
            require("../assets/static/test4/newAudio/B/B69.mp3"),
            require("../assets/static/test4/newAudio/V.mp3"),
            require("../assets/static/test4/newAudio/B/B70.mp3"),
            require("../assets/static/test4/newAudio/J.mp3"),
            require("../assets/static/test4/newAudio/B/B71.mp3"),
            require("../assets/static/test4/newAudio/I.mp3"),
            require("../assets/static/test4/newAudio/B/B72.mp3"),
            require("../assets/static/test4/newAudio/R.mp3"),
            require("../assets/static/test4/newAudio/B/B73.mp3"),
            require("../assets/static/test4/newAudio/C.mp3"),
            require("../assets/static/test4/newAudio/B/B74.mp3"),
            require("../assets/static/test4/newAudio/Y.mp3"),],
    ],
    test4_audio_B4_des:[
        ["true", "V", "false", "F", "true", "W"],
        ["false", "J", "true", "C", "true", "H"],
        ["false", "J", "false", "S", "true", "T"],
        ["true", "C", "true", "W", "false", "S", "true", "F"],
        ["true", "V", "false", "I", "true", "Y", "false", "A"],
        ["true", "H", "true", "W", "false", "A", "true", "J"],
        ["false", "V", "true", "H", "true", "T", "false", "A", "false", "R"],
        ["true", "J", "true", "C", "true", "F", "false", "T", "true", "V"],
        ["true", "Y", "false", "I", "true", "F", "true", "S", "false", "J"],
        ["false", "H", "false", "I", "true", "T", "false", "J", "false", "V", "false", "R"],
        ["false", "V", "true", "F", "false", "H", "false", "W", "true", "J", "true", "A"],
        ["false", "V", "false", "C", "false", "A", "false", "H", "true", "W", "false", "F"],
        ["false", "T", "false", "C", "true", "R", "false", "H", "false", "W", "true", "F"],
        ["true", "H", "true", "S", "true", "R", "false", "A", "false", "I", "true", "Y", "false", "F"],
        ["false", "A", "false", "V", "true", "J", "true", "I", "false", "R", "true", "C", "true", "Y"],
    ],
    test4_part2_Trial_index: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

    test4_materialType:'',
    test4_part2_dataBag:[],
    test4_audio1_src:[],
    test4_audio1_des:[],
    test4_audio2_src:[],
    test4_audio2_des:[],
    test4_audio3_src:[],
    test4_audio3_des:[],
    test4_audio4_src:[],
    test4_audio4_des:[],





//user表里面存的字段,有些默认部分就省略了，如用户都默认同意
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
        Eng_YOL:'',
        nemt_grade:'',//高考英语成绩
        cet4_grade:'',//四级成绩
        cet6_grade:'',//六级成绩
        ielts_grade:'',//雅思成绩
        toefl_grade:'',//托福成绩
        //未学习过其他外语
        no_otherlan:'',
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
    email:'ceshi@qq.com',
    invited_code:'',
    session:'first',
    react_array:[],
    react:0,
    trial_index:1,
    number:1,
    sentence_array:[],
    sentence_rate_array:[],


    //题型4 录音所用全局变量
    //记录测试的录音组
    record_group:'',
    //测试部分的音频变量   （很冗余 应当用表达式生成 或者再create的时候for循环生成 这里先用作测试demo
    recordtrain_audiosA: [{"src":"A_L1","num":2},{"src":"A_L2","num":3},{"src":"A_L3","num":5},
    ],
    recordtrain_audiosB: [{"src":"B_L1","num":2},{"src":"B_L2","num":3},{"src":"B_L3","num":5},
    ],
    //记录训练部分的当前长度
    recordtrainLength:0,
    //记录测试部分的当前长度
    recordtestLength:3,
    //A组音频信息
    record_audiosA: [
        {"src":"A_T1","num":2},{"src":"A_T2","num":2},{"src":"A_T3","num":2},
        {"src":"A_T4","num":3},{"src":"A_T5","num":3},{"src":"A_T6","num":3},
        {"src":"A_T7","num":4},{"src":"A_T8","num":4},{"src":"A_T9","num":4},
        {"src":"A_T10","num":5},{"src":"A_T11","num":5},{"src":"A_T12","num":5},
        {"src":"A_T13","num":6},{"src":"A_T14","num":6},{"src":"A_T15","num":6},
        {"src":"A_T16","num":7},{"src":"A_T17","num":7}
    ],
    //B组音频信息
    record_audiosB: [
        {"src":"B_T1","num":2},{"src":"B_T2","num":2},{"src":"B_T3","num":2},
        {"src":"B_T4","num":3},{"src":"B_T5","num":3},{"src":"B_T6","num":3},
        {"src":"B_T7","num":4},{"src":"B_T8","num":4},{"src":"B_T9","num":4},
        {"src":"B_T10","num":5},{"src":"B_T11","num":5},{"src":"B_T12","num":5},
        {"src":"B_T13","num":6},{"src":"B_T14","num":6},{"src":"B_T15","num":6},
        {"src":"B_T16","num":7},{"src":"B_T17","num":7}],

    //A组测试内容;
     pronuncationsA:[
         'cei ra',
         'pia fe',
         'dua cei',
         'rei pia',
         'fai bou',
         'fe rei',
         'pia fai',
         'cei mia',
         'be dua',
         'mia fe',
         'fe ra',
         'dua bou',
         'mia pe',
         'bou cei',
         'rei pia',
         'dua cei',
         'pia fai',
        'fe rei',
         'cei mia',
         'bou cei',
         'mia fe',
         'dua bou',
        'pia fe',
         'cei ra',
         'be dua',
         'dua cei',
        'fe ra',
        'mia pe',
        'fai bou',
         'cei ra',
         'dua bou',
         'pia fai',
         'mia pe',
         'fai bou',
         'pia fe',
         'cei mia',
         'fe rei',
         'fe ra',
         'be dua',
         'mia fe',
         'bou cei',
         'rei pia',
         'mia fe',
         'dua cei',
         'pia fe',
         'cei ra',
         'pia fai',
         'dua bou',
         'fe rei',
         'mia pe',
         'bou cei',
         'rei pia',
         'mia pe',
         'be dua',
         'pia fe',
         'fai bou',
         'fe ra',
         'cei mia',
         'rei pia',
         'dua bou',
         'cei ra',
         'pia fai',
         'cei mia',
         'bou cei',
         'be dua',
         'fe rei',
         'fai bou',
         'mia fe',
         'dua cei',
         'fe ra',
         'dua bou',
         'fe ra',
         'mia pe',
         'cei ra',
         'mia fe',
         'fai bou',
         'pia fe',
         'cei mia',
         'fe rei',
         'be dua',
         'pia fai',
         'bou cei',
         'rei pia',
        'dua cei',





         // 'fao tuai',
    //     'rei cei',
    //     'tuai rei',
    //     'fao rei',
    //     'tuai ra',
    //     'tuai fao',
    //     'cei rei',
    //     'rei tuai',
    //     'rei fao',
    //     'ra tuai',
    //     'fao pia',
    //     'be dua',
    //     'cei tü',
    //     'mia fai',
    //     'be fao',
    //     'fe ra',
    //     'tü bou',
    //     'be rei',
    //     'mia fe',
    //     'be tü',
    //     'pia tuai',
    //     'dua bou',
    //     'ra pe',
    //     'cei piu',
    //     'be mia',
    //     'tuai piu',
    //     'pia be',
    //     ' bou fai',
    //     'ra pia',
    //     'mia pe',
    //     'bou ra',
    //     'pia cei',
    //     'fai be',
    //     'piu fao',
    //     'pe bou',
    //     ' rei fai',
    //     'tuai fe',
    //     'dua pia',
    //     'ra be',
    //     'fe piu',
    //     'bou cei',
    //     ' tü pe',
    //     'pia rei',
    //     'bou tuai',
    //     'fao mia',
    //     'cei be',
    //     'dua tü',
    //     'tuai be',
    //     'tü pia',
    //     'pe rei',
    //     'piu bou',
    //     'dua fao',
    //     'fe dua',
    //     'bou pia',
    //     'tü fao',
    //     'pe cei',
    //     'fai piu',
    //     'mia rei',
    //     'rei piu',
    //     'pe tuai',
    //     'cei fao',
    //     'bou fe',
    //     'fai tü',
    //     'dua ra',
    //     'dua pe',
    //     'piu mia',
    //     'fao bou',
    //     'ra tü',
    //     ' rei fe',
    //     'fai cei',
    //     'rei bou',
    //     'fai dua',
    //     'fao pe',
    //     'pia fai',
    //     'fe cei',
    //     'piu tü',
    //     'mia ra',
    //     'fe tü',
    //     'mia bou',
    //     'cei ra',
    //     'pe fai',
    //     'piu dua',
    //     'tü mia',
    //     'dua cei',
    //     'dua rei',
    //     'mia cei',
    //     'piu ra',
    //     'cei tuai',
    //     'pia fe',
    //     'tü rei',
    //     'be piu'
         ],
    //B组测试内容;
    pronuncationsB:[
        'ra cei',
        'fe pia',
       'cei dua',
       'pia rei',
        'bou fai',
        'mia cei',
        'fai pia',
       'rei fe',
        'dua be',
        'fe mia',
        'ra fe',
        'bou dua',
        'pe mia',
        'cei bou',
        'pia rei',
        'cei dua',
        'rei fe',
        'fai pia',
       'mia cei',
        'bou dua',
        'cei bou',
        'fe mia',
        'fe pia',
       'ra cei',
        'dua be',
        'fe pia',
        'ra fe',
        'pe mia',
        'bou fai',
        'mia cei',
       'dua be',
        'cei bou',
       'ra fe',
        'bou fai',
        'fe mia',
        'bou dua',
       'pia rei',
       'fai pia',
        'ra cei',
        'rei fe',
        'cei dua',
        'pe mia',
        'fe mia',
        'rei fe',
       'pe mia',
       'cei bou',
        'ra cei',
        'ra fe',
        'bou fai',
        'fe pia',
        'cei dua',
        'pia rei',
        'pia rei',
       'bo,u dua',
        'fe pia',
        'mia cei',
        'fai pia',
        'dua be',
        'ra cei',
        'fe mia',
        'bou dua',
        'ra fe',
        'cei bou',
        'rei fe',
        'fai pia',
        'mia cei',
        'dua be',
        'cei dua',
        'pe mia',
        'bou fai',
        'bou dua',
        'ra fe',
        'pe mia',
        'ra cei',
        'fe mia',
        'bou fai',
        'fe pia',
        'rei fe',
        'dua be',
        'mia cei',
       'fai pia',
        'cei bou',
        'pia rei',
        'cei dua',























        // 'tuai fao',
        // 'cei rei',
        // 'rei tuai',
        // 'rei fao',
        // 'ra tuai',
        // 'fao tuai',
        // 'rei cei',
        // 'tuai rei',
        // 'fao rei',
        // 'tuai ra',
        // 'tuai pe',
        // 'bou piu',
        // 'pe tü',
        // ' fai bou',
        // 'bou pe',
        // 'tü piu',
        // 'fao dua',
        // 'be pia',
        // 'ra bou',
        // 'pe mia',
        // 'bou fao',
        // ' tü fe',
        // 'cei bou',
        // 'mia piu',
        // 'be fai',
        // 'fao piu',
        // 'cei fe',
        // 'tuai bou',
        // 'rei mia',
        // ' piu fe',
        // 'be ra',
        // 'pia fao',
        // 'cei fai',
        // 'bou dua',
        // 'ra piu',
        // 'tü be',
        // 'tuai pia',
        // 'pia ra',
        // 'dua piu',
        // 'be cei',
        // 'fao tü',
        // 'fe rei',
        // 'cei pia',
        // 'be tuai',
        // 'piu fai',
        // 'ra fe',
        // 'bou tü',
        // ' fao cei',
        // 'piu be',
        // ' rei pia',
        // 'dua fe',
        // ' ra mia',
        // 'piu rei',
        // 'fao be',
        // 'dua tü',
        // 'bou cei',
        // 'pe dua',
        // 'fai mia',
        // 'piu cei',
        // 'fai pe',
        // 'cei dua',
        // 'pia tü',
        // 'rei be',
        // ' ra dua',
        // 'fe mia',
        // 'piu tuai',
        // 'dua be',
        // 'fe pia',
        // 'cei pe',
        // 'tü fai',
        // 'fai pia',
        // 'mia be',
        // 'tü ra',
        // 'fe bou',
        // ' dua fai',
        // 'rei pe',
        // 'tuai cei',
        // 'pia dua',
        // 'rei tü',
        // ' bou mia',
        // 'pe fao',
        // ' mia tü',
        // 'fai rei',
        // 'ra cei',
        // 'cei mia',
        // 'pe ra',
        // 'mia fao',
        // 'fe tuai',
        // 'rei dua',
        // 'pia bou',
        // 'tü cei'
        ],
    //第几次试题
    record_session:'',

//关于所有题型只能做一次
    vl_end :false,
    sd_end :true,
    wm_end :true,
    laa_end:true,


}