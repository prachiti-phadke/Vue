<script setup>
import BaseButton from './component/BaseButton.vue'
</script>

<template>
  <div class="wrapper">
    <BaseButton @click="console.log('Button Clicked')" variant="primary"> Button</BaseButton>
    <BaseButton @click="console.log('Secondary Button Clicked')" variant="secondary"> Button</BaseButton>
    <BaseButton @click="console.log('Success Button Clicked')" variant="success"> Button</BaseButton>
    <BaseButton @click="console.log('Danger Button Clicked')" variant="danger"> Button</BaseButton>
  </div>

</template>


<style scoped>
.wrapper {
  display: flex;
  gap: 1rem;
}
</style>
