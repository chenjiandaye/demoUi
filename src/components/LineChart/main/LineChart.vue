<template>
    <div class="module-container" :style="chartStyle">
        <div :id="id" :style="chartStyle" :ref="id"></div>
    </div>
</template>
<script>
import echarts from "echarts";

export default {
    name: "lineChart",
    props: {
        id: {
            // 折线图图表id
            type: String,
            default() {
                return "line";
            }
        },
        linearGradient: {
            // 颜色渐变
            type: Boolean,
            default() {
                return false;
            }
        },
        lineColorArr: {
            // 颜色渐变颜色
            type: Array,
            default() {
                return [];
            }
        },
        height: {
            // 折线图高
            type: String,
            default() {
                return "100%";
            }
        },
        width: {
            // 折线图宽
            type: String,
            default() {
                return "100%";
            }
        },
        option: {
            // 折线图配置
            type: Object,
            required: true // 数据
        },
        loading: {
            // 图形加载
            type: Boolean,
            default() {
                return false;
            }
        },
        enabledClick: {
            // 折线图是否配置点击事件
            type: Boolean,
            default: false
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
            line: null,
            empty: false
        };
    },
    computed: {
        lineOption() {
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
        lineOption() {
            this.option.series.length === 0
                ? (this.empty = true)
                : this.option.series[0].data.length === 0
                ? (this.empty = true)
                : (this.empty = false);
            if (this.empty) {
                this.line.clear();
                this.option.yAxis.data = [];
                this.option.xAxis.data = [];
                this.line.setOption(this.option);
            } else {
                this.drawLine();
            }
        }
    },
    mounted() {
        if (this.line === null) {
            this.line = echarts.init(this.$refs[this.id], null, this.opts);
        }
    },
    beforeDestroy() {
        if (
            this.line !== null &&
            this.line !== "" &&
            !(typeof this.line === "undefined")
        ) {
            this.line.clear();
        }
    },
    methods: {
        /**
         * 折线图
         */
        drawLine: function() {
            if (
                this.line === null &&
                this.line !== "" &&
                !(typeof this.line === "undefined")
            ) {
                this.line = echarts.init(this.$refs[this.id], null, this.opts);
            }

            if (this.linearGradient && this.lineColorArr.length >= 2) {
                this.option.series.forEach(item => {
                    item["itemStyle"] = {
                        normal: {
                            areaStyle: {
                                type: "default",
                                //渐变色实现
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    this.lineColorArr
                                )
                            }
                        }
                    };
                });
            }
            this.line.setOption(this.option);
            window.addEventListener("resize", this.line.resize); // 图表自适应
        }
    }
};
</script>