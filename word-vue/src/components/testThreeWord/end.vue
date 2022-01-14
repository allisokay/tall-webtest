<template>
    <div class="container">
        <div >
            <h1 class="el-row">您已完成了本次测试，请下载你的成绩报告！</h1>
        </div>
    </div>
</template>

<script>
    import GLOBAL from "../../plugins/global_variable";

    export default {
        name: "end",
        methods:{
            //下载报告
            downLoadReport() {
                axios({
                    url: "/report/downloadReport" + GLOBAL.email,
                    responseType: 'blob'
                }).then((response) => {
                    const content = response.data
                    const blob = new Blob([content], {type: "application/pdf"})
                    const fileName = 'report.pdf'
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                        this.generate = !this.generate
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },
        },
        created() {
            document.body.style.backgroundColor = "#DCDCDC";
            this.downLoadReport()
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
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .header {
        display: flex;
        flex-direction: column;
        height: 40vh;
    }

    .footer {
        height: 75px;
    }

    .content {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .el-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 80px
    }

    .left, .right {
        width: 400px;
    }

    .center {
        flex: 1;
    }

    .row {
        display: flex;
        justify-content: space-around;
        margin-bottom: 80px
    }
</style>