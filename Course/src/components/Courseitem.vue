<template>
  <CardSections>

    <template #header>{{ title }}</template>

    <template #default>{{ price }}</template>

    <!-- {{ price }}  this will act the same as those template--> 

    <template #footer> 
      <p class="p-4 font-medium">{{ description }}</p>
      <div class="flex justify-end">
      <button
        @click="$emit('purchase')"
        class=" border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
      >
        Purchase
      </button>
      </div>
    </template>

    
  </CardSections>
</template>

<script setup>

import CardSections from '@/components/CardSections.vue'

defineProps({
  title: String,
  price: Number,
  description: String,
})

defineEmits(['purchase'])
</script>