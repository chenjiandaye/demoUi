<template>
    <section class="section-body" style="height:400px;">
        <line-chart
            :id="'timeLine'"
            :loading="timeLoading"
            :optRenderer="'canvas'"
            width="1200px"
            :linearGradient="true"
            :lineColorArr="lineColorArr"
            :option="timeLineOption"
        ></line-chart>
    </section>
</template>
<script>
export default {
    data() {
        return {
            timeLineOption: {},
            timeLoading: false,
            lineColorArr: [
                {
                    offset: 0,
                    color: "#01FEF6"
                },
                {
                    offset: 0.5,
                    color: "red"
                },
                {
                    offset: 1,
                    color: "transparent"
                }
            ]
        };
    },
    mounted() {
        this.setLineOption();
    },
    methods: {
        setLineOption() {
            this.timeLineOption = {
                title: { //标题配置
                    text: "堆叠区域图", 
                    textStyle: {        //文字样式，在此只列举两种，其他可以echart官网配置项查看
                        color: "#333",
                        fontSize: 18
                    }
                },
                xAxis: { //X轴配置
                    type: "category", //坐标轴类型 category为类目轴
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] //类目数据，只在type:category有效
                },
                yAxis: {//Y轴配置
                    type: "value" //坐标轴类型 value为数值轴，适用于连续数据
                },
                series: [ //系列列表。每个系列通过 type 决定自己的图表类型,此为内容数组
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320], //数据值
                        type: "line",
                        smooth: true, //折现改曲线
                        name: "邮件营销1" //系列名称，用于tooltip的显示
                    },
                    {
                        data: [320, 432, 501, 634, 290, 330, 120],
                        type: "line",
                        name: "邮件营销2"
                    }
                ],
                legend: { //图例组件。和series的name对应就可以了
                    data: ["邮件营销1", "邮件营销2"]
                }
            };
        }
    }
};
</script>