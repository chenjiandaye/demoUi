<template>
    <div class="module-container" :style="chartStyle">
        <div :id="id" :style="chartStyle" :ref="id"></div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    name: "barChart",
    data() {
        return {
            bar: null,
            empty: false
        };
    },
    props: {
        id: {
            type: String,
            default() {
                return "bar";
            }
        },
        width: {
            type: String,
            default() {
                return "100%";
            }
        },
        height: {
            type: String,
            default() {
                return "100%";
            }
        },
        data: {
            type: Array
        },
        option: {
            type: Object,
            required: true // 数据
        },
        optRenderer: {
            // 渲染模式：canvas，svg
            type: String,
            default() {
                return "canvas";
            }
        }
    },
    computed: {
        chartStyle() {
            return {
                height: this.height,
                width: this.width
            };
        },
        opts() {
            return {
                renderer: this.optRenderer
            };
        },
        barOption() {
            return this.option.series;
        }
    },
    mounted() {
        if (this.bar === null) {
            this.bar = echarts.init(this.$refs[this.id], null, this.opts);
        }
    },
    methods: {
        drawBar() {
            this.bar = echarts.init(this.$refs[this.id], null, this.opts);
            this.bar.setOption(this.option);
            window.addEventListener("resize", this.bar.resize); // 图表自适应
        }
    },
    watch: {
        barOption() {
            this.option.series.length === 0
                ? (this.empty = true)
                : this.option.series[0].data.length === 0
                ? (this.empty = true)
                : (this.empty = false);
            if (this.empty) {
                this.bar.clear();
                this.option.yAxis.data = [];
                this.option.xAxis.data = [];
                this.bar.setOption(this.option);
            } else {
                this.drawBar();
            }
        }
    }
};
</script>