<!-- 树组件 -->
<template>
    <div>
        <el-tree
            :data="data"
            :emptyText="emptyText"
            :nodeKey="nodeKey"
            :props="props"
            :render-after-expand="renderAfterExpand"
            :load="load"
            :render-content="renderContent"
            :highlight-current="highlightCurrent"
            :default-expand-all="defaultExpandAll"
            :expand-on-click-node="expandOnClickNode"
            :auto-expand-parent="autoExpandParent"
            :default-expanded-keys="defaultExpandedKeys"
            :show-checkbox="showCheckbox"
            :check-strictly="checkStrictly"
            :default-checked-keys="defaultCheckedKeys"
            :checkStrictly="showCheckbox"
            :current-node-key="currentNodeKey"
            :filter-node-method="filterNodeMethod"
            :accordion="accordion"
            :indent="indent"
            :icon-class="iconClass"
            :lazy="lazy"
            :draggable="draggable"
            :allow-drag="allowDrag"
            :allow-drop="allowDrop"
            @node-click="nodeClick"
            @node-contextmenu="nodeContextmenu"
            @check-change="checkChange"
            @check="check"
            @current-change="currentChange"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            @node-drag-start="nodeDragStart"
            @node-drag-enter="nodeDragEnter"
            @node-drag-leave="nodeDragLeave"
            @node-drop="nodeDrop"
            ref="tree"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }" v-if="showOrderReversal">
                <span>{{ node.label }}</span>
                <span class="s-rightHandleBtn">
                    <span @click="menuMoveF(node, data, 'up')">
                        <slot name="up">↑</slot>
                    </span>
                    <span @click="menuMoveF(node, data, 'down')">
                        <slot name="down">↓</slot>
                    </span>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
import CircularJSON from "circular-json";
export default {
    name: "sTree",
    props: {
        data: {
            type: Array
        },
        emptyText: {
            type: String
        },
        renderAfterExpand: {
            type: Boolean,
            default: true
        },
        nodeKey: String,
        checkStrictly: Boolean,
        defaultExpandAll: Boolean,
        expandOnClickNode: {
            type: Boolean,
            default: true
        },
        checkOnClickNode: Boolean,
        checkDescendants: {
            type: Boolean,
            default: false
        },
        autoExpandParent: {
            type: Boolean,
            default: true
        },
        defaultCheckedKeys: Array,
        defaultExpandedKeys: Array,
        currentNodeKey: [String, Number],
        renderContent: Function,
        showCheckbox: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        },
        allowDrag: Function,
        allowDrop: Function,
        props: {
            default() {
                return {
                    children: "children",
                    label: "label",
                    disabled: "disabled"
                };
            }
        },
        lazy: {
            type: Boolean,
            default: false
        },
        highlightCurrent: Boolean,
        load: Function,
        filterNodeMethod: Function,
        accordion: Boolean,
        indent: {
            type: Number,
            default: 18
        },
        iconClass: String,
        showOrderReversal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        filter() {
            return this.$refs.tree.filter;
        },
        updateKeyChildren() {
            return this.$refs.tree.updateKeyChildren;
        },
        getCheckedNodes() {
            return this.$refs.tree.getCheckedNodes;
        },
        setCheckedNodes() {
            return this.$refs.tree.setCheckedNodes;
        },
        getCheckedKeys() {
            return this.$refs.tree.getCheckedKeys;
        },
        setCheckedKeys() {
            return this.$refs.tree.setCheckedKeys;
        },
        setChecked() {
            return this.$refs.tree.setChecked;
        },
        getHalfCheckedNodes() {
            return this.$refs.tree.getHalfCheckedNodes;
        },
        getHalfCheckedKeys() {
            return this.$refs.tree.getHalfCheckedKeys;
        },
        getCurrentKey() {
            return this.$refs.tree.getCurrentKey;
        },
        getCurrentNode() {
            return this.$refs.tree.getCurrentNode;
        },
        setCurrentKey() {
            return this.$refs.tree.setCurrentKey;
        },
        setCurrentNode() {
            return this.$refs.tree.setCurrentNode;
        },
        getNode() {
            return this.$refs.tree.getNode;
        },
        remove() {
            return this.$refs.tree.remove;
        },
        append() {
            return this.$refs.tree.append;
        },
        insertBefore() {
            return this.$refs.tree.insertBefore;
        },
        insertAfter() {
            return this.$refs.tree.insertAfter;
        }
    },
    methods: {
        menuMoveF(node, data, type) {
            // 将变动之前的node备份
            let copyNode = { ...node };
            copyNode.previousSibling = { ...node.previousSibling };
            copyNode.nextSibling = { ...node.nextSibling };
            window.sessionStorage.setItem(
                "menuNode",
                CircularJSON.stringify(copyNode)
            );
            let nodeData = {};
            if (type === "up") {
                // 上移
                if (node.previousSibling) {
                    // 删除原先的node
                    this.remove(node.data);
                    // 拿到copy的node
                    nodeData = CircularJSON.parse(
                        window.sessionStorage.getItem("menuNode")
                    );
                    // 复制该node到指定位置(参数：1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node)
                    this.insertBefore(
                        nodeData.data,
                        nodeData.previousSibling.data
                    );
                    window.sessionStorage.removeItem("menuNode");
                } else {
                    this.$message.warning("该菜单已经是当前层最上级");
                }
            } else {
                // 下移
                if (node.nextSibling) {
                    this.remove(node.data);
                    nodeData = CircularJSON.parse(
                        window.sessionStorage.getItem("menuNode")
                    );
                    // 参数：1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node
                    this.insertAfter(nodeData.data, nodeData.nextSibling.data);
                    window.sessionStorage.removeItem("menuNode");
                } else {
                    this.$message.warning("该菜单已经是当前层最下级");
                }
            }
        },
        nodeClick(data, node, el) {
            this.$emit("node-click", data, node, el);
        },
        nodeContextmenu(event, data, node, el) {
            this.$emit("node-contextmenu", event, data, node, el);
        },
        checkChange(data, check1, check2) {
            this.$emit("check-change", data, check1, check2);
        },
        check(data, checkObj) {
            this.$emit("check", data, checkObj);
        },
        currentChange(data, node) {
            this.$emit("current-change", data, node);
        },
        nodeExpand(data, node, el) {
            this.$emit("node-expand", data, node, el);
        },
        nodeCollapse(data, node, el) {
            this.$emit("node-collapse", data, node, el);
        },
        nodeDragStart(node, el) {
            this.$emit("node-drag-start", node, el);
        },
        nodeDragEnter(node, el) {
            this.$emit("node-drag-enter", node, el);
        },
        nodeDragLeave(node, el) {
            this.$emit("node-drag-leave", node, el);
        },
        nodeDragOver(node, el) {
            this.$emit("node-drag-over", node, el);
        },
        nodeDragEnd(node, el, wz, event) {
            this.$emit("node-drag-end", node, el, wz, event);
        },
        nodeDrop(node, el, wz, event) {
            this.$emit("node-drop", node, el, wz, event);
        }
    }
};
</script>