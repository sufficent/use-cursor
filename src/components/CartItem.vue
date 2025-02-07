<template>
  <div class="cart-item">
    <div class="item-info">
      <span class="name">{{ item.name }}</span>
      <span class="price">¥{{ item.price }}</span>
    </div>

    <div class="item-actions">
      <button :disabled="item.quantity <= 1" @click="updateQuantity(-1)">
        -
      </button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="updateQuantity(1)">+</button>

      <span class="subtotal">小计: ¥{{ subtotal }}</span>

      <button class="delete-btn" @click="deleteItem">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CartItem } from "@/types/cart";
// 定义 props 和 emits
interface Props {
  item: CartItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update-quantity": [itemId: number, newQuantity: number];
  "delete-item": [itemId: number];
}>();

// 计算小计
const subtotal = computed(() => {
  return props.item.price * props.item.quantity;
});

// 更新数量
const updateQuantity = (change: number) => {
  const newQuantity = props.item.quantity + change;
  if (newQuantity > 0) {
    emit("update-quantity", props.item.id, newQuantity);
  }
};

// 删除商品
const deleteItem = () => {
  emit("delete-item", props.item.id);
};
</script>

<style scoped>
.cart-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.item-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name {
  font-weight: bold;
}

.quantity {
  margin: 0 10px;
}

.delete-btn {
  margin-left: auto;
  color: red;
}

button {
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
