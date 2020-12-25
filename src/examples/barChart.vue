<template>
    <section class="section-body" style="height:400px;">
        <bar-chart id="chartContainer" :option="barLineOption"></bar-chart>
    </section>
</template>

<script>
export default {
    data() {
        return {
            barLineOption: {}
        };
    },
    mounted() {
        this.setLineOption();
    },
    methods: {
        setLineOption() {
            this.barLineOption = {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "bar",
                        stack: '广告', //堆叠柱状图设置，类似于分类，名称一样在一根bar上
                        label: { //bar上数值显示
                            show: true,
                            position: 'inside' //位置，支持top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
                        },
                        showBackground: true, //修改bar的颜色
                        backgroundStyle: {
                            color: "rgba(220, 220, 220, 0.8)"
                        }
                    },
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "bar",
                        stack: '广告'
                    }
                ]
            };
        }
    }
};
</script>