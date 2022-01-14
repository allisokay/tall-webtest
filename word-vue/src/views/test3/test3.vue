<template>

    <div>
        <learn-three v-if="studyFlag"
                     :clickTimes="clickTimes"
                     @learnFinished="goToTestThree"></learn-three>

        <test-three v-if="!studyFlag"></test-three>
<!--        <test-three></test-three>-->
    </div>

</template>

<script>

    import learnThree from "../../components/testThreeWord/learnThree";
    import testThree from "../../components/testThreeWord/testThree";

    export default {
        name: "test3",
        components:{
            learnThree,
            testThree
        },
        data(){
            return {
                studyFlag:true,
                audios:null,
                clickTimes:[
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0],//点击次数，用于分析

            }

        },
        methods:{
            goToTestThree(){
                this.studyFlag = false
            },
        }
    }
</script>

<style scoped>

</style>