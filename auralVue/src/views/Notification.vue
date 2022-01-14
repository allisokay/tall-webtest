<template>
    <div>
        <el-card class="box-card" style="background-color:#E9EEF3;">
            <div slot="header" class="clearfix">
                <span style="margin-left: 50% ;font-size: xx-large"><h3 align="center">告知书</h3></span>
                <img src="../assets/image/Notification/1.png" style="margin-left: 28%"/><img src="../assets/image/Notification/2.png" style="text-align: center"/>

            </div>
            <div class="text item">
              <p style="text-indent:2em;text-align: center">博士研究项目：成人学习者在线预测加工能力的发展</p>
              <p style="text-indent:2em;">
                项目由英国约克大学教育系博士研究生盘峻岚执行。本在线测试（中国成人学习者的认知个体差异）是博士项目“成人学习者在线预测加工能力的发展”（2019年起）的一部分。中文知情同意书供测试参加者使用，与教育系伦理审查通过的英文版内容一致。
              </p>
                <h2>尊敬的测试参加人：</h2>
                <p>您好！</p>
                <p style="text-indent:2em;">我叫盘峻岚，是英国约克大学教育系的博士研究生，正进行一项关于“成人学习者在线预测加工能力的发展”的研究项目。很荣幸地邀请您参加这个项目中的认知个体差异在线测试。在您同意参加测试前，请仔细阅读以下信息，如果您有任何疑问或需要了解更多信息，请联系我。</p>
                <h2><strong>本研究的目的是什么?</strong></h2>
                <p style="text-indent:2em;">本研究旨在设计中国外语学习者的认知个体差异测试，并证实其内在效度。</p>
                <h2><strong>本研究对您意味着什么？</strong></h2>
                <p style="text-indent:2em;">由于我们将使用不同的方式测试学习者的差异，您需要分两次参加测试：（1）在2021年11月完成视听版或文字版的测试，（2）在前一次测试后至少四周后完成另一版本的测试。
                  每一次测试至少需要一个小时，不中断地一次性完成。完成两次测试后您将收到30元人民币作为酬谢。本研究完成了第二阶段测试后，我们将为您提供一份有关您学习外语的认知能力的报告。
               </p>
                <h2><strong>自愿参加原则</strong></h2>
                <p style="text-indent:2em;">本研究系自愿参加。如果您愿意参加，我们将提供相关信息和知情同意书。测试中您会有适度的紧张感。如果您在测试过程中不想继续参加了，您可以选择退出，不需要解释理由。</p>
                <h2><strong>匿名与保密</strong></h2>
                <p style="text-indent:2em;">
                    您提供的数据（比如测试的分数）将编码保存。任何可以辨识您身份的信息都将与数据分开保存。您可以在数据收集的过程中放弃参加本研究。在数据收集完毕后的两周内，您也可以发邮件至jp1763@york.ac.uk,要求撤销您的数据。</p>
                <h2><strong>数据保存与使用</strong></h2>
                <p style="text-indent:2em;">
                    数据将加密保存，仅供本项目的研究者使用。在关于本研究的演讲、上线、研究报告、项目总结中的数据都将匿名。匿名数据将无法识别您的身份。另外，匿名数据可能会用于后续的分析，并有可能通过开放数据库分享给其他研究人员进行分析。如果您不同意我们用这种方式使用您的数据，请您不要参加本测试。我们将按照《通用数据保护条例》(GDPR)第6(1)(e)条规定进行个人数据保护：处理数据是从事以公益为目的的工作的需要。 特殊目录数据的处理根据第9(2)(j)条：处理数据是公益性的存档，或科学和历史研究目的，或统计目的的需要。
                关于《通用数据保护条例》(GDPR)的信息，请登陆查询：<el-link type="primary" href="https://www.york.ac.uk/education/research/gdpr_information/" target="_blank">https://www.york.ac.uk/education/research/gdpr_information/</el-link></p>
                <h2><strong>问题或顾虑</strong></h2>
                <p style="text-indent:2em;">
                    如果您有任何关于测试信息和数据处理的问题或顾虑，敬请联系盘峻岚：jp1763@york.ac.uk,或者联系伦理委员会主席：education-research-admin@york.ac.uk。如果您对他们提供的信息还有不满意之处，敬请联系约克大学数据保护官员：dataprotection@york.ac.uk。
                  我真诚地希望您能同意参加本测试。如果您愿意参加，请完成所附的知情同意书，点击“确认”发回。</p>
              <p style="text-indent:2em;">
                非常感谢您对本研究的帮助！
                <p style="text-indent:2em;">
                  此致 敬礼
                </p>
                <p style="text-indent:2em;">
                  盘峻岚
                </p>


                请点击“继续”确认您已经理解了上述信息，并同意参加本次测试。
              </p>

            </div>
        </el-card>
        <el-button style="margin-left:48%;font-size:large" type="text" @click="agree()">同意并继续</el-button>
    </div>
</template>
<script>
    import GLOBAL from '../plugins/global_variable'
    export default {
        name: "Notification",
        methods: {
            agree() {
                this.$router.push('/InformConsent');



            },


        },

        created() {//生命周期函数

            document.body.style.backgroundColor="#CCCCCC";





        },
        mounted() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

        }
    }
</script >

<style scoped>
    .text {
        font-size: 18px;

    }

    .item {
        margin-bottom: 18px;

    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;


    }
</style>