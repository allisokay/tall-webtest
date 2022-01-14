var vl_end = false
var sd_end = true
var wm_end = true
var laa_end = true

// const baseURL = 'http://172.81.235.55:8181/'


//const baseURL = 'http://127.0.0.1:8181/'
//const baseURL  ='https://tall-webtest.com/studytest-0.0.1-SNAPSHOT/'
// const baseURL  ='https://tall-webtest.com/studytest-0.0.1-SNAPSHOT/'
const baseURL  ='http://139.186.128.135:8089/studytest-0.0.1-SNAPSHOT/'
const staticURL = '@/assets/audio/'

//const baseURL = 'http://139.186.128.135:8089:8181/'


//以下为8.22所写
//题型4的训练阶段的总介绍
var train_introduce=new Array()
// var train_introduce=[require('./../assets/test_audio/1.mp3'),require('./../assets/test_audio/2.mp3'),require('./../assets/test_audio/3.mp3')]
//题型4的第一部分介绍
var train_introduce_part1=new Array()
// var train_introduce_part1 = [require('./../assets/test_audio/4.mp3'), require('./../assets/test_audio/5.mp3')]

//题型4的训练单词
var train_word_play=[['身影','车队'],['仓库','渗透','场景']]
//题型4的训练单词的描述
var train_word_play_des=[['身影','车队'],['仓库','渗透','场景']]
//题型4测试单词开始
var train_word_begin=new Array()
//题型4测试单词
var train_word=[['签字','镜子'],['旋转','报社'],['平安','棉花'],['睡眠','制约','发射'],['往事','葡萄','取代'],['报刊','会场','动机'],['牙齿','寒冷','含义','驾驶'],['破产','日记','安装','钢琴'],['处分','水稻','公认','蚂蚁'],['穷人','课堂','气温','忽略','股东'],['原先','海关','技能','日期','记载'],['聚集','金属','火山','指挥','较量'],['伦理','宴会','夸张','天堂','生产','公寓'],['打扮','暗示','文凭','挖掘','天然','困境'],['走私','导师','性别','流氓','生育','羡慕'],['废话','痕迹','大脑','烦恼','建议','牛奶','血管'],['区别','影响','骨头','大海','公元','空白','照样'],['衡量','延长','约束','绘画','清晨','特意','参考']]
//题型4测试单词的描述
var train_word_des=[['签字','镜子'],['旋转','报社'],['平安','棉花'],['睡眠','制约','发射'],['往事','葡萄','取代'],['报刊','会场','动机'],['牙齿','寒冷','含义','驾驶'],['破产','日记','安装','钢琴'],['处分','水稻','公认','蚂蚁'],['穷人','课堂','气温','忽略','股东'],['原先','海关','技能','日期','记载'],['聚集','金属','火山','指挥','较量'],['伦理','宴会','夸张','天堂','生产','公寓'],['打扮','暗示','文凭','挖掘','天然','困境'],['走私','导师','性别','流氓','生育','羡慕'],['废话','痕迹','大脑','烦恼','建议','牛奶','血管'],['区别','影响','骨头','大海','公元','空白','照样'],['衡量','延长','约束','绘画','清晨','特意','参考']]
//题型四的第一部分正式练习提示音
var train_word_end=new Array()
//题型4第一部分用于打乱顺序的
var train_word_set=new Array('柜台','处境','抢救','工地','模特','覆盖','饮料','西瓜','决心','描绘','时光','助理','古城','挑选','尖锐','外语','包袱','接收','繁华','功课','驾驶','答复','实质','融合','造型','肯定','谈话','创业','地主','赞同','护士','河流','歌声','讽刺','童年','缺点','现金','蝴蝶','轰炸','形状','开学','合格','名片','草地','严峻','红旗','屏幕','中年','关闭','粉碎','户口','阴影','困扰','圆满','倒霉','箱子','表扬','出差','发育','香烟','竞赛','反省','喜悦','资助','通知','意识','胡子','车间','保护','依旧','透明','诱惑','短暂','绝望','海湾','膨胀','面包','语文','定位','教材','划分','安慰','讲座','公主','判决','转换'
)
//题型4用户判断正确的单词个数
var user_right_w = 0
//题型4的第二部分介绍
var train_introduce_part2=new Array()



//题型4的字母记忆介绍
var train_letter_introduce=new Array()
// var train_letter_introduce = [require('./../assets/test_audio/6.mp3'), require('./../assets/test_audio/7.mp3'),
//     require('./../assets/test_audio/8.mp3'), require('./../assets/test_audio/9.mp3')]

//字母记忆的音频源，这里为了验证用户是否具备一定的英语能力，有一些逻辑处理，因此音频文件按照老师的意思这里改为[1,2,1,2,1]的形式
var letter_src=[['F','Q','X'],['D','I','N','Y'],['F','Q','X'],['D','I','N','Y'],['F','Q','X']]
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
var letter_des=[['F','Q','X'],['D','I','N','Y'],['F','Q','X'],['D','I','N','Y'],['F','Q','X']]
// var letter_des = [['F', 'T', 'N'],
//     ['Y', 'Q', 'X', 'K'],
//     ['F', 'T', 'N'],
//     ['Y', 'Q', 'X', 'K'],
//     ['F', 'T', 'N'],
// ]

//题型四句子理解的介绍1
var train_sentence_introduce=new Array()
// var train_sentence_introduce = [require('./../assets/test_audio/10.mp3'), require('./../assets/test_audio/11.mp3'),
//     require('./../assets/test_audio/12.mp3')]

//题型四句子理解前面两个玩的A/B套材料
var train_sentence_play = []
var train_sentence_play_1 = [
    '同学们参加了科学会堂建设，得到了学校的表扬。',
    '天气暖和起来，草地上到处是野餐的学生和真理。',
]
var train_sentence_play_2 = [
    '在远处的水面上，白色的浮球标出了蟹笼的位置。',
    '面对竞争压力，员工最终决定做一个重要的法院。',
]
//题型四句子理解前面两个玩的音频的描述
var sentence_play_des =[]
var sentence_play_des_1 = ['true', 'false']
var sentence_play_des_2 = ['true', 'false']


//题型四句子理解的介绍2
var train_sentence_begin =new Array()
// var train_sentence_begin = [require('./../assets/test_audio/15.mp3'), require('./../assets/test_audio/16.mp3')]


//句子理解的15个练习句子A/B套材料
var sentence_src = []
var sentence_src_1=[
    '停留了几天，梦媛终于找到了那个帮过她的叔叔。',
    '这个公司的业务是投资股票，因此收到很多夏天。',
    '只有等火车经过交叉路口以后，他才能跨过铁路。',
    '每年在春节快到的时候，大家的心情都非常愉快。',
    '鸽子在院子里啄食，然后飞到树林里吐出了区别。',
    '等这个项目顺利完成后，我需要去巴黎度假放松。',
    '王小明被警察拦住了，因为他穿过了蓝色的讲座。',
    '在本地一家超市货架上，有各种标价出售的科长。',
    '圣诞期间去度假，要多花钱才能预订到酒店房间。',
    '他是个爱吃甜食的人，所以无法接受医生的建议。',
    '他最喜欢穿这件鲜艳的毛衣外套，在餐厅里游泳。',
    '学校宣布，学生放学后做完作业马上就可以法官。',
    '毕业三十年后，这届学员的相聚是最宝贵的记忆。',
    '大片树林覆盖了空地，让水土得到了很好的保持。',
    '当发现被欺骗后，志敏就不再捐款给附近的历史。',
]
var sentence_src_2 = [
    '他在黑暗中摸索了半天，才在角落里找到了误会。',
    '将潜在客户进行分类，这是拓展市场必须的工作。',
    '在参观了那座著名的建筑之后，他准备开始设计。',
    '尽管这不是她喜欢的音乐，她还是在口琴上打扮。',
    '公司在困难时依然运作高效，满足了客户的需求。',
    '鲨鱼出现在距离海滩不远的地方，因为那里仪器。',
    '无论过程多么艰苦，她都绝不会放弃努力到最后。',
    '欢乐的曲调仿佛在告诉人们，生活可以非常开学。',
    '我开始为朋友感到骄傲，直到发现自己没有大桥。',
    '想写好论文，你需要做的就是一直坚持练习写作。',
    '他在西湖过了个周末，这是一生中最难忘的电脑。',
    '这个算法是为新业务开发的，投入了大量的人力。',
    '他一边在心里想着问题，一边默默穿过整个脸色。',
    '老师要求写随机句子，这比想象的有更大的困难。',
    '如果把蜂蜜和爆米花混在一起，会有特别的味道。',
]
// var sentence_src = [require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/No1.mp3'),
//     require('./../assets/test_audio/Yes2.mp3'), require('./../assets/test_audio/No2.mp3')]

//句子理解的备份，用于30秒强制退出
var sentence_src_backup=[
    '他在黑暗中摸索着寻找电灯开关，但当他终于找到时，已经三年了。','将有时间的分层有价值，客户被视为市场的一个关键需要。','公司可以在困难时期也保持优势并满足客户的需求。','帕特丽夏喜欢声音的指甲强烈地压在黑板上。','在探索了那座废弃的建筑后，他开始相信鬼魂。','由世界级的竞争，在今天的员工中，可能是一个非常重要的改进。','老师要求我写一些随机的句子，这比我想象的要难。','这个我们告诉钢筋，快乐可以在巧克力的布丁找到。','上学时我为睡觉感到骄傲，但现在我和外号没有任何不同。','想写好作文，你要做的其实很简单，就是拿起笔开始写。','由于这个公司负责股票乐器的质量，将有水平运作的饮料市场。','雨下得很大，一个主要的想法温柔地看着她的孩子。',
    '穿过各个街区，他在思想的地牢里倒石头。','我不尊重任何不能区分百事可乐和可口可乐的人。','把枫糖浆和奶油爆米花混合在一起，味道特别好。'
]


var sentence_des_backup=['false','false','true','false','true',
    'false','true','false','false','true','false','false','false','true','true']
//句子理解的音频描述,这里先给四个
var sentence_des = []
var sentence_des_1 = [
    'true','false','true','true','false',
    'true','false','false','true','true',
    'false','false','true','true','false',
]
var sentence_des_2 = [
    'false','true','true','false','true',
    'false','true','false','false','true',
    'false','true','false','true','true',
]


// var sentence_des = ['true', 'false', 'true', 'false']
//用户做出句子判断的已正确数，我这里准备复用多次
var user_right_S = 0
//用户已听的句子个数，我这里准备复用多次
var user_total_S = 0

//混合模式的提示音
var train_mix_introduce=new Array()
// var train_mix_introduce = [require('./../assets/test_audio/17.mp3'), require('./../assets/test_audio/18.mp3'),
//
// ]
//混合模式的音频源(句子和字母交错的形式)，这里根据ppt上所说，给出3组，每组两个句子和两个字母
var train_LS_src = []
var train_LS_src_1 =[
    ['如果去网站上搜索，可以买一些便宜实用的阳光。','C',
    '每天上学之前，我都要先给小狗准备好吃的食物。','Y'],

    ['一旦把学习当成了负担，就无法体会读书的乐趣。','T',
    '当看不到后面的陆地时，船已驶离港口一百公斤。','A',
    '早餐鸡蛋和牛奶很营养，有利于孩子的身体健康。','F'],
]
var train_LS_src_2 = [
    ['要不是他自己说漏了嘴，人们会以为他值得信任。','C',
    '他只走了一小段路，就看到不远处有茂密的研究。','Y'],

    ['我以为会太热了，但是没想到这里有阴凉的犯罪。','T',
    '记得提醒我们带上墨镜，它是日光浴必须的装备。','A',
    '仔细一看，我才发现墙上时钟整整晚了一个小时。','F'],
]
//混合模式的句子和字母描述
var train_LS_des = []
var train_LS_des_1 = [['false', 'C', 'true', 'Y'], ['true', 'T', 'false', 'A','true','F']]
var train_LS_des_2 = [['true', 'C', 'false', 'Y'], ['false', 'T', 'true', 'A','true','F']]

//中间临时音频源数组，作用是提取出train_LS_src中的一维数组，便于区分不同的训练组,可复用
var temp_LS_src = new Array()
// 记录每组字母和句子的正确答案
var temp_LS_des = new Array()
var temp_answer = []
//在一个训练组里面，用户对于句子的判断结果，里面存放true或false，判断得到结果后就被重置为空数组，可复用
var user_S_judge = new Array()


//在句子理解中用于记录句子理解中的反应时间，react_time来计时，在点击确认之后就push到train_react_S中，然后重置react_time为0
//用于混合模式中的句子理解部分的限时操作
//react_time可复用
var react_time = 0
// var train_react_S = new Array()
var train_react_S = new Array()
//用于在混合模式中来判断反应时间是否超过时限，可复用
var time_limit = 0
//得到的反应时间的均值+2.5倍方差
var mean_std = 20

//用于记录混合模式中的每组训练过程的句子正确个数，被push进去值，不复用
var train_correct_S = new Array()
//用于记录混合模式中的每组训练过程的字母正确个数，被push进去值，不复用
var train_correct_L = new Array()


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
var test_introduce=new Array()
// var test_introduce = [require('./../assets/test_audio/25.mp3')]
//正式测试的音频源（句子+字母）
// var test_LS_src =new Array()
// var test_LS_src = [[require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/H.mp3'),
//     require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/J.mp3')],
//     [require('./../assets/test_audio/Yes2.mp3'), require('./../assets/test_audio/F.mp3'),
//         require('./../assets/test_audio/No2.mp3'), require('./../assets/test_audio/N.mp3')],
//     [require('./../assets/test_audio/Yes1.mp3'), require('./../assets/test_audio/K.mp3'),
//         require('./../assets/test_audio/No1.mp3'), require('./../assets/test_audio/L.mp3')]
// ]

var test_LS_src=[]
var test_LS_src_1 = [
    ['我们需要的是切实的行动，不是不着边际的想象。','F','隔离结束以后，师生们陆续都回到了久违的校园。','W','看到流星划过天空，他许了一个关于健康的距离。','V'],
    ['法官抵制任何利诱，坚持以事实为依据做出判决。','C','因为机场工人罢工了，所以我的航班少发了校长。','H','对歌唱者而言，听众的掌声与喝彩是最好的回报。','J'],
    ['如果全球气候持续变暖，消失的会有巨大的妻子。','S','生病的老太太脾气变得古怪又暴躁，就像是信息。','T','由于保护措施得力，古墓里几乎找不到任何教授。','J'],
    ['这些病毒就是冠状病毒，是导致全球疫情的原因。','F','介绍总体设计方案的时候，不需要屏幕投影热爱。','C','这件事关系到每个人的利益，大家都想知道真相。','S','穿过前面的村庄，在一片寂静的树林里住着手续。','W'],
    ['因为担心自己的体重，这些人都在努力控制县城。','A','失败未必是坏事，有时它会成为通向成功的基础。','Y','夕阳照在院子里，给晾着的裤子抹上了一层学问。','I','行业规范就是设定标准，让大家有一个系统参考。','V'],
    ['许多国家依靠增长的内需，发展了很不错的经济。','W','如果心态足够平和，大家都能过一种安宁的生活。','H','接到他的报警，三位警察立即赶来仔细询问古老。','J','受到公共卫生事件的影响，生活品质出现了下降。','A'],
    ['这家餐厅是浪漫的法式风味，特别适合情侣消费。','A','忽然就下雨了，温柔的妈妈仔细地看着她的不能。','T','大学毕业后，晓静如愿以偿地进入这家报社基因。','R','老师把学生送到医院后，又回来给我们接着上课。','H','去现场观看奥运会比赛，这是我心弛神往的事情。','V'],
    ['只有继续努力向前，才不会出现令人失望的国外。','C','虽然这些关心微不足道，但却在困难的时候一生。','T','学生们表达了愿望，多数人想让学校建一个官员。','F','动工前，他们对道路的长度和宽度做了精确计算。','V','只有树上所有的果实变甜了，你才可以动手地球。','J'],
    ['超市所有货物摆放得整齐有序，方便顾客的挑选。','I','多亏老师耐心的讲解，才让这些学生理解了概念。','Y','妈妈叫醒了他，再把煎好的鸡蛋放在厨房的昨天。','J','我们曾经拥有的共同记忆，却被时间偷走了做出。','F','学生们使用了新学的词语，尽管表达还不够准确。','S'],
    ['我们一起度过了童年，这是永不枯竭的话题来源。','R','一场大洪水退去以后，只见河滩上到处都是宣布。','T','不能靠耍小聪明来完成学业，你更需要的是无论。','J','眼看山下的村庄要被洪水淹没了，我们只能离开。','I','对于投保人而言，保险公司必须履行告知的义务。','V','蒸汽机发明后，机器生产逐渐替代了笨重的劳动。','H'],
    ['原告的证据被判定无效，律师认为它出现了不顾。','A','在天气晴朗的夜晚，躺在草地上就可以看到星星。','J','按照我们的计划，明天的报告会将提前准备同胞。','W','我们很难拥有优势，尤其现在是经费不足的时期。','H','元彬搭着梯子爬到阁楼顶上，发现了隐藏的季节。','F','校长坚持给学生减负，认为这和教学质量不矛盾。','V'],
    ['吴老师匆忙结束了会议，赶去洗衣房接回了原始。','H','有时候小王会望着墙上的镜子发呆，茫然地山区。','A','市民们非常热心，捐助了许多图书给村里的感染。','W','尽管农民拼命阻挡，麦田里依然是看热闹的人群。','F','信心来自日积月累的学习，来自坚持不懈的努力。','C','外文系的图书室里虽说资料不多，但都可以篮球。','V'],
    ['他们经常去那家超市购物，是因为它的廉价商品。','C','谁也不知道未来会发生什么，是否还有重大男子。','F','作家要善于运用语言，需要贴切地表达内心情感。','H','他依靠强烈的求胜欲，克服困难最终赢得了比赛。','R','我们准备推出新计划，实现超市灵活经营的武术。','T','传说中如果听到急促的鼓声，士兵会战斗到京剧。','W'],
    ['毕竟有五年时间没有见面了，他们已经变得陌生。','Y','这本童话书被改编成了电影，在十多个国家夜里。','I','位于密林深处的木屋突然着火了，虽然没有咖啡。','A','学生们每天做完作业后，都要预习第二天的功课。','F','这位留学生中文口语很棒，居然能说饶舌的鸡蛋。','R','新秀选拔会上，很多人唯恐不能引起别人的注意。','S','大自然赐予了人类宝贵的资源，我们要懂得珍惜。','H'],
    ['那些人忙于工作，往往都无暇顾及自己是否快乐。','R','这件事且让我们先布局，条件成熟后再付诸实施。','I','在远处的树林和岩石后面，是大片被遮盖的驾驶。','C','这是一个极其惊人的现象，没有人会为胜利海湾。','Y','城堡里没有一点人气，消失得无影无踪的是留学。','J','大学做了调整，集中资金建设高水平的研究环境。','V','自从发现他厨艺高超后，朋友们经常来请他纠纷。','A']
]
var test_LS_src_2=[
    ['解决问题不能全靠概念，我们需要参考一些例子。','V','接过服务员递过来的菜单，我匆忙点了一份会计。','F','虽然才刚到十月份，但他已经开始准备圣诞礼物。','W'],
    ['为了时尚效果，需要在这件外套上增加一个失败。','J','她喜欢在周末做短途旅行，因为这样能放松心情。','C','随着时代的变化，市场对新产品的需求明显增加。','H'],
    ['即使演讲者热情洋溢，但内容却足以让听众报纸。','J','首相被警报吵醒了，赶紧起身走进了后面的爱情。','S','木屋一直锁着，孩子们对那里面的东西充满好奇。','T'],
    ['我们会努力创新，并利用有效的战略去实现目标。','C','他只会对部下发号施令，所以大家都有不满情绪。','W','公司最近推出了优惠政策，鼓励员工的日常双方。','S','为了找出真相，侦探走进了城堡里的那个空房间。','F'],
    ['所有进度都要建档，要作为行政工作的资料保存。','V','质量具有非比寻常的重要性，需要员工认真汽车。','I','子弹打碎窗户射了进来，差点击中了墙上的镜子。','Y','我想咨询一下，新制订的政策是否允许实施和尚。','A'],
    ['到太阳落山的时候，他完成了所有计划内的任务。','H','整个撤退的过程中，士兵们始终对胜利满怀希望。','W','在这里也不常遇到熟人，所以不需要照顾好监狱。','A','他能给小熊熟练地喂食，这让饲养员都感到惊讶。','J'],
    ['今天晚上有活动，庆祝公司完成既定目标的校园。','V','这就是冤冤相报的恶性循环，他们发誓不再继续。','H','海面上竟漂浮着大量的冰块，这让她觉得很神奇。','T','去一个不在计划中的地方也许不错，对你有严厉。','A','他们向客户保证，一定会尽全力实现承诺的祖国。','R'],
    ['他一进房间，大家都感到了令人头皮发麻的恐惧。','J','等到一阵风过，草地上到处是从树上落下的苹果。','C','感谢您的捐赠，任何数量的金额对他们都有意义。','F','这显然不是个好方案，对他来说没有任何的家长。','T','游戏中可能要违背诚实原则，通过欺骗取得胜利。','V'],
    ['小狗突然闻到了排骨的香味，冲进了路边的餐馆。','Y','他们虽然是多年的竞争对手，却拥有共同的导致。','I','她真幼稚，总以为把手表藏起来就能够停住时间。','F','虽然你有些失态，但在这件事情上你有理由生气。','S','健宇走进房间时，就听到衣柜里传出很小的属于。','J'],
    ['世界上已没有可以阻挡他行动的东西，除了每年。','H','重要的是满足消费者的愿望，鼓励他们参与姑娘。','I','团队是公司良好运营的保障，也是对管理的挑战。','T','如果没有那次事故，可能就没有人能按计划正式。','J','她很有歌唱的天赋，经常能出人意料地表现飞机。','V','他真的不想再尝试了，害怕面对可能出现的如今。','R'],
    ['她把留了多年的长发剪了，只是希望自己能窗口。','V','警察盘问她周末去了哪里，她回答去了浙江老家。','F','管理对公司来说尤其重要，经常会发生员工脖子。','H','树上结了很多毛茸茸的果实，看上去有一种上级。','W','如果不喜欢做某件事，我一定会想办法尽力避免。','J','没有关注前两场比赛，他也不在意这一场的结果。','A'],
    ['他望着餐盘里的水果，意识到自己喜欢谷物开车。','V','经理的表现很奇怪，他认为你应该得到一个不然。','C','有些村民不惜一切代价开垦荒地，全部种上初中。','A','公司的主打产品是专业研发的，具有绝对的沙漠。','H','推开房间门，一眼就能看见粉色的玩具车和桌子。','W','国会里正在激烈地辩论，外面是成群结队的故乡。','F'],
    ['最重要的是理解标准，而不是纠结是否喜欢再次。','T','他加入了老男孩乐队，这对我来说没有什么游客。','C','海浪拍打着岸边的岩石，这是个非常美丽的画面。','R','要想找到一个好的停车位，你必须早点到达标题。','H','他的愚蠢简直能把人气炸了，除了他本身的街头。','W','冰箱里储存的东西都吃完了，他也没钱去买面包。','F'],
    ['这是一种很独特的口味，来自馅料里混合的鲜花。','H','他突然感到饥肠辘辘，因为看到了麦当劳的广告。','S','公司的发展战略很有前瞻性，投资了高科技项目。','R','他情绪不高，向班主任老师报告了课本中的大厅。','A','一旦遭到敌人的攻击，即使侥幸获胜也没有家人。','I','我本来是可以晋升的，但考核时没有算我的业绩。','Y','只有绕道山后的小路，才可以摆脱跟踪爬到皮肤。','F'],
    ['整个商业气候已经发生了变化，必须让客户温度。','A','把绿茶和牛油果混合起来，可以得到预期的商人。','V','因为性格里的执著和狂热，她相信自己可以成功。','J','她觉得孩子的画真好，比得上挂在画廊里的作品。','I','那一瞬间我特别高兴，看到课程表里填满了报复。','R','每到清晨时分，小区居民都喜欢来这里跑步锻炼。','C','公共场所必须戴口罩，这是防止病毒传播的措施。','Y'],
]

var test_LS_des=[]
var test_LS_des_1 = [
    ['true','F', 'true','W', 'false','V'],
    ['true','C', 'false','H', 'true','J'],
    ['false','S', 'false','T', 'false','J'],
    ['true','F', 'false','C', 'true','S', 'false','W'],
    ['false','A', 'true','Y', 'false','I', 'true','V'],
    ['true','W', 'true','H', 'false','J', 'true','A'],
    ['true','A', 'false','T', 'false','R', 'true','H', 'true','V'],
    ['false','C', 'false','T', 'false','F', 'true','V', 'false','J'],
    ['true','I', 'true','Y', 'false','J', 'false','F', 'true','S'],
    ['true','R', 'false','T', 'false','J', 'true','I', 'true','V', 'true','H'],
    ['false','A', 'true','J', 'false','W', 'true','H', 'false','F', 'true','V'],
    ['false','H', 'false','A', 'false','W', 'true','F', 'true','C', 'false','V',],
    ['true','C', 'false','F', 'true','H', 'true','R', 'false','T', 'false','W'],
    ['true','Y', 'false','I', 'false','A', 'true','F', 'false','R', 'true','S', 'true','H'],
    ['true','R', 'true','I', 'false','C', 'false','Y', 'false','J', 'true','V', 'false','A'],
]
var test_LS_des_2=[
    ['true','V', 'false','F', 'true','W'],
    ['false','J', 'true','C', 'true','H'],
    ['false','J', 'false','S', 'true','T'],
    ['true','C', 'true','W', 'false','S', 'true','F'],
    ['true','V', 'false','I', 'true','Y', 'false','A'],
    ['true','H', 'true','W', 'false','A', 'true','J'],
    ['false','V', 'true','H', 'true','T', 'false','A', 'false','R'],
    ['true','J', 'true','C', 'true','F', 'false','T', 'true','V'],
    ['true','Y', 'false','I', 'true','F', 'true','S', 'false','J'],
    ['false','H', 'false','I', 'true','T', 'false','J', 'false','V', 'false','R'],
    ['false','V', 'true','F', 'false','H', 'false','W', 'true','J', 'true','A'],
    ['false','V', 'false','C', 'false','A', 'false','H', 'true','W', 'false','F',],
    ['false','T', 'false','C', 'true','R', 'false','H', 'false','W', 'true','F'],
    ['true','H', 'true','S', 'true','R', 'false','A', 'true','I', 'false','Y', 'true','F'],
    ['false','A', 'false','V', 'true','J', 'true','I', 'false','R', 'true','C', 'true','Y'],
]

// 每个测试组字母的个数，用于限制用户输入的字母数量
var temp_Letter_len= 0;


//正式测试的反应时间记录数组
var test_react_S = new Array();

//用于记录混合模式中的每组训练过程的句子正确个数，被push进去值，不复用
var test_correct_S = new Array()
//用于记录混合模式中的每组训练过程的字母正确个数，被push进去值，不复用
var test_correct_L = new Array()

//用于显示在右上角的句子正确率
var test_S_accuracy = ''

//用于第一部分的进度条展示
var part1_test_length=18
//测试的组数，用于进度条
var test_length=15



export default {

    baseURL,

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
    letter_des,

    train_sentence_introduce,
    train_sentence_play_1,
    train_sentence_play_2,
    train_sentence_play,
    sentence_play_des,
    sentence_play_des_1,
    sentence_play_des_2,
    train_sentence_begin,


    user_right_S,
    user_total_S,
    sentence_src,
    sentence_src_1,
    sentence_src_2,
    sentence_src_backup,
    sentence_des,
    sentence_des_1,
    sentence_des_2,
    sentence_des_backup,

    react_time,
    train_react_S,
    mean_std,


    train_mix_introduce,
    train_LS_src,
    train_LS_src_1,
    train_LS_src_2,
    // train_L_des,
    // train_S_des,
    train_LS_des,
    train_LS_des_1,
    train_LS_des_2,

    user_S_judge,
    user_L_judge,

    train_correct_S,
    train_correct_L,

// test4句子判断+字母记忆测试
    test_introduce,
    temp_LS_src,
    temp_LS_des,
    temp_answer,
    test_LS_src,
    test_LS_src_1,
    test_LS_src_2,
    test_LS_des,
    test_LS_des_1,
    test_LS_des_2,
    temp_Letter_len,

    // test_L_des,
    // test_S_des,
    test_react_S,
    test_correct_S,
    test_correct_L,
    test_length,
    test_S_accuracy,

    testType:'',
    Session: '',

    // 工作记忆第二部分
    test4_part2_dataBag:[],
    test4_materialType:'',
    test4_part2_Trial_index: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],


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
    react_array:new Array(),
    react:0,
    trial_index:1,
    number:1,
    sentence_array:new Array(),
    sentence_rate_array:new Array(),




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
    vl_end:false,
    sd_end:true,
    wm_end:true,
    laa_end:true,


}
