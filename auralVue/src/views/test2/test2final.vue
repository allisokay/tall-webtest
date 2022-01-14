<template>
    <div class="container">
        <div class="header">
            <h1>辨音测试结束</h1>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="row">
                    <h1> 辨音测试结束，一共30题，你答对了{{score}}题</h1>
                </div>
                <el-row  v-loading="!canEnd"
                         element-loading-text="数据上传中..."
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)">
                </el-row>
                <div class="row">
                    <el-button type="primary" @click="gotoindex" v-show="canEnd" >返回主页</el-button>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
    import GLOBAL from '../../plugins/global_variable'
    export default {
        name: "test2final",
        data(){
            return {
                score:0,
                canEnd:false,
            }
        },
        mounted() {
            this.scorefinal()
            this.datemake1()
        },
        methods:{
            scorefinal(){
                this.score = GLOBAL.score1
            },
            datemake1() {
                for(let i=0;i<30;i++) {
                    let content={}
                    content["test2_id"]='';
                    content["exp_name"]='aural_sd';
                    content["trail_type"]='audio';//测试类型
                    content["exp_type"]  = GLOBAL.test2_materialType; // 材料类型，增加字段，后端改之
                    let d = new Date();
                    content["exp_date"] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()//测试时间
                    content["exp_session"]=GLOBAL.session;
                    content["part_email"]=GLOBAL.email;
                    content["test_session"]= (i < 15 ? 'test1' : 'test2');
                    content["time_elapsed"]=GLOBAL.time_elapsed1
                    content["trial_index"]=GLOBAL.test2_trial_index[i]
                    content["stimulus"]=GLOBAL.stimulus[i]
                    content["rt"]=GLOBAL.rt1[i]
                    content["part_response"]=GLOBAL.user_ans1[i]
                    content["correct_response"]=GLOBAL.corr_ans[i]
                    content["correct"]=GLOBAL.correct1[i]
                    if (i === 0) {
                        content["total_score"] = this.score
                    }
                    GLOBAL.test2_dataBag.push(content);
                    /*axios.post("score/save",content).then((resp)=>{
                        console.log(resp.data)
                    })*/
                }
                axios.post("/score/saveAll", GLOBAL.test2_dataBag).then((resp)=>{
                    if (resp.data === "success") {
                        this.canEnd = true;
                        console.log("test2_saveAll() is ok!");
                    } else {
                        console.log("test2_savaAll() isn't ok!");
                    }
                });
            },
            gotoindex() {
                if (this.canEnd === true) {
                    GLOBAL.sd_end=true;
                    GLOBAL.laa_end=false;
                    this.$router.push('/Index')
                    this.$forceUpdate();
                }
            }
        }
    }
</script>

<style scoped>
    .header, .footer {
        height: 100px;
        line-height: 100px;
        background-color: #D8D8D8;
        text-align: center;
        margin-bottom:100px
    }
    .row{
        display: flex;
        justify-content: center;
        margin-bottom:150px
    }
</style>