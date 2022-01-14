<template>
    <div>
        <nav-header></nav-header>

        <learn-one v-if="studyFlag"
                   :clickTimes="clickTimes"
                   @learnFinished="goToTestOne"></learn-one>

        <test-one v-if="!studyFlag"></test-one>
<!--        <test-one></test-one>-->
        <nav-footer></nav-footer>


    </div>

</template>

<script>
    import navHeader from '../../components/Header'
    import navFooter from '../../components/Footer'
    import learnOne from '../../components/testOneWord/learnOne'
    import testOne from '../../components/testOneWord/testOne'

    export default {
        name: "test1Word",
        components:{
            navHeader,
            navFooter,
            learnOne,
            testOne
        },
        data(){
            return {
                studyFlag:true,

                clickTimes:[0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0],//点击次数，用于分析
                timeElapsedStart:Date.now()
            }
        },
        created() {
            // 加载本地图片
        },
        methods:{
            goToTestOne(){
                this.studyFlag = false
            },
        }
    }
</script>

<style scoped>

</style>