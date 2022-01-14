<template>
    <div class="container">
        <div class="header">
            <!--            <h1 class="el-row">欢迎来到在线学习能力测试系统</h1>-->
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <div class="column">
                        <div class="el-column">
                            <h3>A. 单词学习</h3>
                            <h3> Vocabulary Learning</h3>
                        </div>
                        <div  class="el-column">
                            <h3>B. 发音辨别</h3>
                            <h3> Sound Discrimination</h3>
                        </div>
                        <div class="el-column">
                            <h3>C. 语言分析</h3>
                            <h3> Language Analytic Ability</h3>
                        </div>
                        <div class="el-column">
                            <h3>D. 工作记忆</h3>
                            <h3> Working Memory</h3>
                        </div>

                    </div>
                    <div class="column">
                        <div>
                            <el-button type="primary" @click="enter_A" :disabled="vl_end">开始</el-button>
                        </div>
                        <div>
                            <el-button type="primary" @click="enter_B" :disabled="sd_end">开始</el-button>
                        </div>
                        <div>
                            <el-button type="primary" @click="enter_D" :disabled="laa_end">开始</el-button>
                        </div>
                        <div>
                            <el-button type="primary" @click="enter_C" :disabled="wm_end">开始</el-button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="right">
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>
<script>
import GLOBAL from '../plugins/global_variable'
export default {
    name: "index",
    data() {
        return {
            vl_end:'',
            sd_end:'',
            laa_end:'',
            wm_end:'',
        };
    },
    methods: {
        find_type() {
            axios.get("user/findTypeByEmail", {params:{
                    "email":GLOBAL.email}
            }).then((resp)=>{
                console.log('上一次测试的材料类型' + resp.data);
                GLOBAL.testType = resp.data;
            })
        },
        enter_A() {
            this.$router.push('/test1');
        },
        enter_B() {
            this.$router.push('/test2study1');
        },
        enter_C() {
            this.$router.push('/Trainindex');
        },
        enter_D() {
            this.$router.push('/test3');
        },
    },
    created() {
        //按钮点击顺序逻辑
        this.vl_end=GLOBAL.vl_end;
        this.sd_end=GLOBAL.sd_end;
        this.wm_end=GLOBAL.wm_end;
        this.laa_end=GLOBAL.laa_end;
        this.find_type();
    },
    mounted() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
        document.body.style.backgroundColor="#DCDCDC";
    }
}
</script>

<style scoped>

.container{
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.header{
    display: flex;
    flex-direction: column;
    height: 20vh;
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
    margin-bottom:100px
}
.left{
    width:400px;
}
.right{
    width:400px;
}
.center{
    flex: 1;
}
.row{
    display: flex;
    justify-content: space-between;
    margin-bottom:30px
}
.column{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.el-column{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom:30px
}
</style>