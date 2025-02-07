<template>
  <div class="shopping-cart">
    <h2>购物车</h2>
    <div class="total">总价: ¥{{ total }}</div>

    <CartItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @update-quantity="updateItemQuantity"
      @delete-item="deleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CartItem from "@/components/CartItem.vue";
import type { CartItem as ICartItem } from "@/types/cart";

// 商品列表数据
const items = ref<ICartItem[]>([
  { id: 1, name: "苹果", price: 5, quantity: 1 },
  { id: 2, name: "香蕉", price: 3, quantity: 2 },
  { id: 3, name: "橙子", price: 4, quantity: 1 },
]);

// 计算总价
const total = computed(() => {
  return items.value.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});

// 更新商品数量
const updateItemQuantity = (itemId: number, newQuantity: number) => {
  const item = items.value.find((item) => item.id === itemId);
  if (item) {
    item.quantity = newQuantity;
  }
};

// 删除商品
const deleteItem = (itemId: number) => {
  items.value = items.value.filter((item) => item.id !== itemId);
};
</script>

<style scoped>
.shopping-cart {
  padding: 20px;
}
.total {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
}
</style>
