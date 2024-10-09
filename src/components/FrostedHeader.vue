<template>
    <div id="frosted_header">
        <h1 id="h1_id">&nbsp; 智慧校园</h1>
    </div>
</template>

<script>
export default {
    name: 'FrostedHeader',
};
</script>

<style scoped>
#frosted_header {
    /* display: grid;
    grid-template-areas: "button1 button2 button3 button4 none";
    grid-template-columns: 1fr 1fr 1fr 1fr 3fr;
    grid-template-rows: 1fr; */


    top: 0;
    /* 贴合顶部 */
    height: 70px;
    width: 100%;
    background-color: #f7f7f7;
    color: black;
    /* 字体颜色 */
    /* border-bottom: 4px solid rgba(0, 0, 0, 0.517); */
    margin: 10px;
    /* 设置所有方向的外边距为 10px */
}
</style>