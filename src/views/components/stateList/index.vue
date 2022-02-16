<template>
    <div class="approval-status " >
        <div>
            <el-image class="img-state" :src="require('@/assets/image/approve_add.png')"></el-image>
            <span class="approve-text">草稿</span>
        </div>
        <div>
            <el-image class="img-state" :src="require('@/assets/image/approve_spz.png')"></el-image>
            <span class="approve-text">审批中</span>
        </div>
        <div>
            <el-image class="img-state" :src="require('@/assets/image/approve_bh.png')"></el-image>
            <span class="approve-text">驳回</span>
        </div>
        <div>
            <el-image class="img-state" :src="require('@/assets/image/approve_ysp.png')"></el-image>
            <span class="approve-text">已审批</span>
        </div>
        <div>
            <el-image class="img-state" :src="require('@/assets/image/approve_zz.png')"></el-image>
            <span class="approve-text">中止</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'stateList',
    return() {
        
    },
}
</script>
<style lang="scss" scoped>
    .approval-status{
        display: flex;
        color: #555555;
        font-size: 14px;
        align-items: center;

        div{
        display: flex;
        align-items: center;
        margin-left: 20px;
        .approve-text{
            margin-left: 5px;
        }
        }
        div:first-child{
        margin-left: 0;
        }
        .img-state{
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>