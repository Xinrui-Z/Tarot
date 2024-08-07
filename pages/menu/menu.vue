<template>
  <view class="container">
    <button @click="fetchCardForms">获取牌阵信息</button>
    <view class="table">
      <view class="row">
        <view class="cell">ID</view>
        <view class="cell">名称</view>
        <view class="cell">描述</view>
      </view>
      <view v-for="cardForm in cardForms" :key="cardForm.id" class="row">
        <view class="cell">{{ cardForm.id }}</view>
        <view class="cell">{{ cardForm.name }}</view>
        <view class="cell">{{ cardForm.description }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cardForms: []
    };
  },
  methods: {
    async fetchCardForms() {
      try {
        const response = await this.http('/tarot/listCardForm', {}, 'GET');
        if (response.code === 200) {
          this.cardForms = response.data;
        } else {
          uni.showToast({
            title: `获取失败: ${response.message}`,
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '网络错误，请稍后再试',
          icon: 'none'
        });
        console.error('Error fetching card forms:', error);
      }
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.table {
  margin-top: 20px;
}
.row {
  display: flex;
}
.cell {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
}
.cell:first-child {
  font-weight: bold;
}
</style>
