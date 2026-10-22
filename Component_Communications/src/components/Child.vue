<script setup>
defineProps({ count: Number })          // receives data from the parent
const emit = defineEmits(['increase'])  // can announce an event to the parent
</script>

<template>
  <p>Child sees: {{ count }}</p>
  <button @click="emit('increase')">+1</button>
  <button @click = "emit('decrease')">-1</button>
</template>