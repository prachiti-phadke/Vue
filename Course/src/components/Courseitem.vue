<template>
  <div class="p-4 bg-white border border-gray-200 rounded-md">
    <h3 class="p-4 font-medium border-b border-gray-200">{{ title }}</h3>

    <p class="p-4 font-medium border-b border-gray-200">${{ price.toFixed(2) }}</p>

    <p class="p-4 font-medium">{{ description }}</p>

    <div>
      <button
        @click="$emit('purchase')"
        class="border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
      >
        Purchase
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  price: Number,
  description: String,
})

defineEmits(['purchase'])
</script>