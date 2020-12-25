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
            type: Object
        }
    },
    computed: {
        chartStyle() {
            return {
                height: this.height,
                width: this.width
            };
        },
        barOption() {
            return this.option.series;
        }
    },
    mounted() {
        if (this.bar === null) {
            this.bar = echarts.init(this.$refs[this.id]);
        }
    },
    methods: {
        drawLine() {
            this.bar = echarts.init(this.$refs[this.id]);
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
                this.drawLine();
            }
        }
    }
};
</script>