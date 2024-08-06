<template>
    <view 
        class="notice-box">
        {{ message }}
    </view>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                visible: true
            }
        }
    }
</script>

<style scoped>
.notice-box {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    padding: 24rpx;
    border-radius: 8rpx;
    background-color: #fff;
    box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

}
</style>
