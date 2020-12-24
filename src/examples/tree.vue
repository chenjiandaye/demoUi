<template>
    <div>
        <s-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expand-all="true"
            :showOrderReversal="true"
            :expand-on-click-node="false"
        >
                <template v-slot:up>
                    <el-button type="text" size="mini">上</el-button>
                </template>
                <template v-slot:down>
                    <el-button type="text" size="mini">下</el-button>
                </template>
        </s-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1"
                                },
                                {
                                    id: 10,
                                    label: "三级 1-1-2"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: "一级 2",
                    children: [
                        {
                            id: 5,
                            label: "二级 2-1"
                        },
                        {
                            id: 6,
                            label: "二级 2-2"
                        }
                    ]
                },
                {
                    id: 3,
                    label: "一级 3",
                    children: [
                        {
                            id: 7,
                            label: "二级 3-1"
                        },
                        {
                            id: 8,
                            label: "二级 3-2"
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    }
};
</script>