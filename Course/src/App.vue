<template>
  <div class="p-2 space-y-8">
    <h1 class="text-4xl font-medium">Courses Up !</h1>
    <h2 class="text-2xl font-medium">All Courses</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Courseitem
        v-for="i in 3"
        :key="i"
        title="Vue Course"
        :price="9.99"
        description="0-Hero in Vuejs"
        @purchase="handlePurchase"
      />
    </div>
    <h3 class="text-2xl font-medium">Your Courses</h3>

    <div class="grid grid-cols-4">
      <BookingItem v-for = "i in 2" :key="i">
      
      </BookingItem>
    </div>
  </div>
</template>

<script setup>
import Courseitem from '@/components/Courseitem.vue'
import BookingItem from '@/components/BookingItem.vue'

function handlePurchase() {
  console.log('Button Clicked')
}
</script>