<template>
    <section class="section-body" style="height:400px;">
        <pie-chart
            :id="'pieChart'"
            :loading="loading"
            :optRenderer="'canvas'"
            width="1200px"
            :option="pieOption"
        ></pie-chart>
    </section>
</template>
<script>
export default {
    data() {
        return {
            pieOption: {},
            loading: false
        };
    },
    mounted() {
        this.setPieOption();
    },
    methods: {
        setPieOption() {
            this.pieOption = {
                title: {
                    text: "某站点用户访问来源",
                    subtext: "纯属虚构",
                    left: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)" //鼠标移上去显示内容，其他图表也类似
                },
                legend: {
                    orient: "vertical", //图例列表的布局朝向 'horizontal'/'vertical'
                    left: "left",
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎"
                    ]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie", //饼状图必写的
                        radius: ["50%", "60%"], //单独写55%，就是个实心圆，这样写就是空心圆
                        center: ["50%", "60%"],
                        data: [
                            { value: 335, name: "直接访问" },//数据，推荐使用此格式
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 1548, name: "搜索引擎" }
                        ],
                        emphasis: { //高亮的扇区和标签样式。
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };
        }
    }
};
</script>