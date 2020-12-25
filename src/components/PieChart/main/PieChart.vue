<template>
    <div class="module-container" :style="chartStyle">
        <div :id="id" :style="chartStyle" :ref="id"></div>
    </div>
</template>
<script>
import echarts from "echarts";

export default {
    name: "pieChart",
    props: {
        id: {
            type: String,
            default() {
                return "pie";
            }
        },
        height: {
            type: String,
            default() {
                return "100%";
            }
        },
        width: {
            type: String,
            default() {
                return "100%";
            }
        },
        option: {
            type: Object,
            required: true // 数据
        },
        loading: {
            type: Boolean,
            default() {
                return false;
            }
        },
        optRenderer: {
            // 渲染模式：canvas，svg
            type: String,
            default() {
                return "canvas";
            }
        }
    },
    data() {
        return {
            pie: null,
            empty: false
        };
    },
    computed: {
        pieOption() {
            return this.option.series;
        },
        opts() {
            return {
                renderer: this.optRenderer
            };
        },
        chartStyle() {
            return {
                height: this.height,
                width: this.width
            };
        }
    },
    watch: {
        pieOption() {
            this.option.series.length === 0
                ? (this.empty = true)
                : this.option.series[0].data.length === 0
                ? (this.empty = true)
                : (this.empty = false);
            if (this.empty) {
                this.pie.clear();
                this.option.yAxis.data = [];
                this.option.xAxis.data = [];
                this.pie.setOption(this.option);
            } else {
                this.drawPie();
            }
        }
    },
    mounted() {
        if (this.pie === null) {
            this.pie = echarts.init(this.$refs[this.id], null, this.opts);
        }
    },
    beforeDestroy() {
        if (
            this.pie !== null &&
            this.pie !== "" &&
            !(typeof this.pie === "undefined")
        ) {
            this.pie.clear();
        }
    },
    methods: {
        /**
         * 折线图
         */
        drawPie: function() {
            if (
                this.pie === null &&
                this.pie !== "" &&
                !(typeof this.pie === "undefined")
            ) {
                this.pie = echarts.init(this.$refs[this.id], null, this.opts);
            }
            this.pie.setOption(this.option);
            window.addEventListener("resize", this.pie.resize); // 图表自适应
        }
    }
};
</script>