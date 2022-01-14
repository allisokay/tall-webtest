<template>
    <div>
        <el-container>
            <el-header height="733px"><strong>邀请码管理页面</strong>
                <el-form :model="validateForm" :rules="rules" ref="validateForm" label-width="200px"
                         class="demo-ruleForm">
                    <el-col :span="8" style="margin: 0px 28% ">
                        <el-form-item label="数据量" prop="age">
                            <el-input type="age" v-model.number="validateForm.age" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" style="margin: 0px 28% ">
                        <el-form-item label="邀请码描述" prop="name">
                            <el-input type="name" v-model="validateForm.name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" style="margin: 0px 28% ">
                        <el-form-item label="第一次测试是" prop="first">
                        <el-select v-model="validateForm.first" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" style="margin: 0px 34% ">
                        <el-button type="primary" @click="generateCode('validateForm')" :disabled="!generate">生成
                        </el-button>
                        <el-button type="primary" @click="downloadCode('validateForm')" :disabled="generate">下载邀请码
                        </el-button>
                    </el-col>
                    <el-button type="primary" @click="back_to_main">回到主页</el-button>

                </el-form>
                <!--        <el-button @click="generateCode">生成邀请码</el-button>-->
                <!--        <el-button @click="downloadCode" :disabled="generate">下载邀请码</el-button>-->
            </el-header>


        </el-container>
    </div>
</template>

<script>
    export default {
        name: "try",
        data() {
            return {
                inviteCodeInfo: {
                    des: "",
                    num: 0,
                    first:"",
                },
                generate: true,
                validateForm: {
                    age: '',
                    name: "",
                    first: "",
                },
                rules: {
                    age: [
                        {required: true, message: '数据量不能为空'},
                        {type: 'number', message: '数据量必须为数字值'},
                        {pattern: /^([1-9][0-9]{0,3})$/, message: '范围在1-10000', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    first:[
                        {required: true, message: '请选择', trigger: 'blur'},
                    ]
                },
                admin: {
                    id: '',
                    account: '',
                    pwd: '',
                },
                options: [{
                        value: 'A',
                        label: '视听版'
                    },
                    {
                        value: 'W',
                        label: '文字版'
                    },
                ],
            }

        },
        methods: {
            generateCode(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.validateForm.age);
                        console.log(this.validateForm.name);
                        this.inviteCodeInfo.num = this.validateForm.age
                        this.inviteCodeInfo.des = this.validateForm.name
                        this.inviteCodeInfo.first = this.validateForm.first
                        axios.post("/admin/generateCode", this.inviteCodeInfo).then((response) => {
                            console.log(response);
                            if (response.data == "success") {
                                this.generate = false
                                this.$message.success("生成成功，请及时下载")
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            back_to_main() {
                this.$router.push({
                    path: "/Adminindex"
                })
            },

            downloadCode(formName) {
                axios({
                    url: "/admin/downloadCode",
                    responseType: 'blob'
                }).then((response) => {
                    // console.log(response);
                    const content = response.data
                    const blob = new Blob([content])
                    const fileName = 'invite_code_for_'+this.inviteCodeInfo.des+'.xlsx'
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
                        this.$refs[formName].resetFields();
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },

        },
        created() {
        },
    }
</script>

<style scoped>
    .el-header, .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 80px;
        align-self: center;
        width: 700px;
    }


    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*分栏间隔*/
    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>