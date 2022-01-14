<template>

    <div class="container">
        <div class="header">
            <br/>
        </div>
        <div class="content">
            <div class="left"></div>
            <div class="center">
                <div class="column">
                    <div class="el-row">
                        <div class="normal">在字母记忆练习中，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">您需要按顺序记住屏幕上出现的</div>
                        <div class="bold">英文字母</div>
                    </div>

                    <div class="el-row">
                        <div class="normal"> 每显示一组字母后，屏幕上就会列出十二个备选字母，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal"> 您需要按字母出现的顺序，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">用鼠标点击字母所在的方格来完成选择。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">如果忘记了某个字母，点击“空格”按钮代替它的位置。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">您已经选择的字母会按顺序出现在屏幕下方。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">在确认字母和顺序都正确后，可以点击“确认”，继续下一个练习。</div>
                    </div>

                    <div class="el-row">
                        <div class="normal"> 如果发现选错了，可点击“清除”，然后重新选择。</div>
                    </div>

                    <div class="el-row">
                        <div class="bold"> 请注意：</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">一定要按字母出现的顺序来进行选择，</div>
                    </div>

                    <div class="el-row">
                        <div class="normal">如果忘记了其中一个字母，点击“空格”代替它的位置。</div>
                    </div>

                </div>
                <div class="row">
                    <el-button class="confirm" type="primary" @click="study">开始</el-button>
                </div>

            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>

</template>
<script>
export default {
    name: "Lettertrain",
    data() {
        return {

        };
    },
    created() {
        document.body.style.backgroundColor="#DCDCDC";
    },
    mounted() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    methods: {
        study() {
            this.$router.push('/Lettertrainjudge');
        }
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
    height: 30vh;
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
    margin-bottom:20px
}
.left,.right{
    width:400px;
}
.center{
    flex: 1;
}
.row{
    display: flex;
    justify-content: space-around;
    margin-bottom:80px
}
.column{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom:10px
}
.bold{font-size:20px;
    font-weight: bold;
}
.normal{
    font-size:22px;
    font-weight: normal;
}
.confirm{
    font-size:25px;
    font-weight:500;
}
</style>