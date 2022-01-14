<template>
    <div class="container">
        <div class="header">
            <h1 class="el-row">下载数据页面</h1>
            <h1 class="el-row">
                <el-form>
                    <el-form-item label="日期"
                                  prop="date">
                        <div class="block">
                            <!--                                <span class="demonstration"> 日期：</span>-->
                            <el-date-picker
                                    v-model="content.date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-form>
            </h1>
            <h1 class="el-row">
                <el-button type="primary" @click="downloadData()">下载</el-button>
            </h1>

        </div>
    </div>

</template>

<script>
    export default {
        name: "AdminDownload",
        data() {
            return {
                content: {
                    date: new Date()
                }

            }

        },
        methods: {
            downloadData() {
                let year = this.content.date.getFullYear()
                let month = this.content.date.getMonth() + 1
                let day = this.content.date.getDate()

                this.downloadByTestName(year,month,day,"aural_vl")
                this.downloadByTestName(year,month,day,"written_vl")
                this.downloadByTestName(year,month,day,"aural_sd")
                this.downloadByTestName(year,month,day,"written_sd")
                this.downloadByTestName(year,month,day,"aural_wm")
                this.downloadByTestName(year,month,day,"written_wm")
                this.downloadByTestName(year,month,day,"aural_laa")
                this.downloadByTestName(year,month,day,"written_laa")
                this.downloadByTestName(year,month,day,"user")
            },
            downloadByTestName(year,month,day,testName) {
                let fileName = year+"-"+month+"-"+day+"-"+testName+".csv"
                axios({
                    url: "/download/downloadData/"+testName + '/' + year + '/' + month + '/' + day,
                    responseType: 'blob'
                }).then((response) => {
                    const content = response.data
                    const blob = new Blob([content], {type: "txt/csv"})
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
                });

            }
        },
        created() {
        },
    }
</script>

<style scoped>
    .container {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        background: #e2dfdf;
    }

    .header {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        background: #e2dfdf;
        height: 1000px;
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