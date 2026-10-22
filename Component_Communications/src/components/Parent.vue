<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)

function handleIncrease() {
  count.value++
}

function handleDecrease() {
  count.value--
}
</script>

<template>
  <p>Parent has: {{ count }}</p>
  <Child :count="count" @increase="handleIncrease" @decrease="handleDecrease" />
</template>