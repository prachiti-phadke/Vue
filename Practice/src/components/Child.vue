<script setup>
// defineEmits(['sayHi'])                    // 1. declare


// this is for multiple buttons but one event
defineProps({ names: Array })        // the list comes down from the parent
defineEmits(['sayHi'])               // 1. declare


</script>

<template>
    <!-- 1. this sends nothing  -->
  <!-- <button @click="$emit('sayHi')">Click me</button>   2. fire -->

  <!-- 2. This sends data to the parent along with message -->
  <!-- <button @click="$emit('sayHi', 'Asha')">Click me</button> -->


  <!-- // Many buttons , one event -->
    <ul>
    <li v-for="n in names" :key="n">
      {{ n }}
      <button @click="$emit('sayHi', n)">Greet</button>   <!-- 2. fire, with this item's data -->
    </li>
  </ul>

</template>
