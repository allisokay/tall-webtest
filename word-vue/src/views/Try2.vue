<template>
    <div>
        <el-container>
            <el-header height="710px">欢迎来到在线学习能力测试系统
                <el-form  class="demo-form-inline" label-width="500px" >
                    <div>
                        <el-form-item  label="题型一 看图记音"  >
                            <el-button type="primary"  @click="enter_test1">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="题型二 辨音" >

                            <el-button type="primary" @click="enter_test2">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="题型三 语言分析">

                            <el-button type="primary" @click="enter_test3">开始</el-button>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="题型四 工作记忆">

                            <el-button type="primary" @click="enter_test4(1)">开始</el-button>
                        </el-form-item>
                    </div>
                    <div class="el-row">
                        <el-button :type="type" @click="go_on()" >{{result}}</el-button>
                    </div>

                </el-form>
            </el-header>


        </el-container>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import GLOBAL from "../plugins/global_variable";
    export default {
        data() {
            return {

                audios:'',
                result:'',
                type:'text',

            }
        },
        methods: {
            enter_test1() {
                alert("这里需要转到题型一的页面");
                this.type='primary'
                this.result=1
            },
            enter_test2() {
                alert("这里需要转到题型二的页面");
            },
            enter_test3() {
                alert("这里需要转到题型三的页面");
            },
            enter_test4(val) {

                this.$store.commit('increment', val);
                this.$router.push('/test2study1');
            },
            go_on(){

            },

            getaudio()
            {
                var _this=this;
                axios.get('test4audio/audios').then(function (resp) {
                    var src=(resp.data[0].src);
                    console.log(src);
                    var baseURL='http://127.0.0.1:8181/';
                    var try1= new Audio(baseURL+src);
                    try1.play();
                    // _this.audios=resp.data;

                })
            },
            analyzing_match(src_arr)
            {
                //一维数组
                var arr1=[];
                //二维数组
                var arr2=[];
                //用于返回的三维数组
                var arr3=[];
                 //用数组简单实现栈的pop和push
                var stack_arr=[];
                for(var i=0;i<src_arr.length;i++)
                {
                    if(src_arr[i]=='b1')
                    {
                        //压入数组
                        stack_arr.push('b1');
                        //跳过本次循环
                        continue;
                    }
                    else if(src_arr[i]=='b2')
                    {
                        //压入数组
                        stack_arr.push('b2');
                        //跳过本次循环
                        continue;
                    }

                    else if(src_arr[i]=='e1')
                    {
                        //压出一个元素
                        stack_arr.pop();
                        //如果栈数组为空，说明这个是单独的一维数组，并不是嵌套在二维数组里面的
                        if(stack_arr.length==0)
                        {
                            //将单独的一维数组压入需要的三维数组
                            arr3.push(arr1);
                            //arr1重新赋值为空数组
                            arr1=[];
                            //跳过本次循环
                            continue;
                        }
                        //如果栈数组不为空，说明这个不是是单独的一维数组，是嵌套在二维数组里面的
                        else {
                            //将一维数组压入二维数组
                            arr2.push(arr1);
                            arr1=[];
                            continue;
                        }
                    }
                    else if(src_arr[i]=='e2')
                    {
                        stack_arr.pop();
                        //我这里不用做判断了，因为我们默认数据库传来的数组的匹配样式是正确的
                        //此时的stack_arr必定为空


                        //将二维数组压入需要的三维数组
                        arr3.push(arr2);
                        //arr2重新置为空
                        arr2=[];
                        continue;
                    }
                    //如果是单个资源元素，不是标志元素，用arr1来接收
                    else {

                        arr1.push(src_arr[i]);
                    }


                }
                //返回需要的三维数组
                return arr3;
            },

        },

        created() {
            // var sum = function(x,y){ return x+y;};　　//求和函数
            // var square = function(x){ return x*x;};　　//数组中每个元素求它的平方
            //
            // var data = [61, 118, 101, 86];　　//
            // var mean = data.reduce(sum)/data.length;
            // var deviations = data.map(function(x){return x-mean;});
            // var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));
            // var try1=[[1],[2,3],[[1,2],[3,4,5],[22]],[3,4,5]];
            // var t1= 3/4;
            // var t2=4/4;
            // var try2=try1.slice(0,4)
            // console.log(try2);
            // let data1 = ['1','2','3'];
            // let array = ['3','4','5'];
            // data1 = data1.map((key,value)=>[key,array[value]]);
            // console.log(data1);
            // if(t1==1){
            //     console.log("t1=1");
            // }
            // if(t2==1){
            //     console.log("t2=1");
            // }
            // console.log(try1.length);
            // console.log("平均值："+mean);
            // console.log("偏差："+deviations);
            // console.log("标准差："+stddev);
            // console.log(mean+2.5*stddev)
            // console.log("原始数组："+data);
            // // console.log(try1.shift().length);
            // console.log(try1.length);
            // var try2=new Array();
            // try2.push(NaN);
            // console.log(try2);
            // console.log(try2[0]);
            // if(try2[0]==true){
            //     console.log("‘’等于true");
            // }
            // else{
            //     console.log("‘’不等于true");
            // }
            // if(false===false){
            //    console.log('正常');
            // }
            // else{
            //     console.log('牛逼');
            // // }
            // if(try2[0]==false){
            //     console.log("NaN等于false");
            // }
            // else{
            //     console.log("NaN不等于false");
            // }
            // if(try2[0]==true){
            //     console.log("NaN等于true");
            // }
            // else{
            //     console.log("NaN不等于true");
            // }
            // this.getaudio();
            // console.log('count:'+this.$store.state.count);
            // var try3=[20,30,40]
            // console.log(try3.toString())
            // console.log(this.$store.state.count);
           var test_arr=['b2','b1',3,'e1','b1',6,7,'e1','b1',8,'e1','e2','b1',1,2,'e1','b2','b1',3,4,5,'e1','b1',6,7,'e1','b1',8,'e1','e2'];
           var test1=this.analyzing_match(test_arr);
           // console.log(test1);

           axios.get('test4info/findScoreByEmail' + GLOBAL.email).then(function (resp) {
            console.log(resp.data)
        });
           axios.get('test4info/findAllScore').then(function (resp) {
                console.log(resp.data)
            });

            axios.get('word/wm/findScoreByEmail' + GLOBAL.email).then(function (resp) {
                console.log(resp.data)
            });
            axios.get('word/wm/findAllScore').then(function (resp) {
                console.log(resp.data)
            });
        },
    }
</script>