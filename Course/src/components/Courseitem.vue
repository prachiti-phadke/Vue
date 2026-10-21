<template>
  <CardSections>

    <template #header>{{ title }}</template>

    <template #default>{{ price }}</template>

    <!-- {{ price }}  this will act the same as those template--> 

    <template #footer> 
      <p class="p-4 font-medium">{{ description }}</p>
      <div class="flex justify-end">
      <RoundedButton @click="$emit('click')">
        Purchase
      </RoundedButton>
      
      </div>
    </template>

    
  </CardSections>
</template>

<script setup>

import CardSections from '@/components/CardSections.vue'
import RoundedButton from '@/components/RoundedButton.vue'

defineProps({
  title: String,
  price: Number,
  description: String,
})

defineEmits(['click'])
</script>