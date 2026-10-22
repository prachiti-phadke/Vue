<template>

    <div v-if = "loading">
      <SkeletonBookingItem>
      </SkeletonBookingItem>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-4">
      <BookingItem v-for = "booking in bookings" 
      :key="booking.id" 
      :title = "booking.title"
      :status = "booking.status"
      @report = "reportCourse(booking.id)"
      >
      </BookingItem>
    </div>

</template>

<script setup>
import { onMounted } from 'vue'
import useBookings from '@/composables/useBookings.js'
import SkeletonBookingItem from '@/components/SkeletonBookingItem.vue'
import BookingItem from '@/components/BookingItem.vue'

// Using the custom composable to manage bookings
const { loading, bookings, fetchBookings, registerCourse, reportCourse } = useBookings()

onMounted(() => {
  fetchBookings()
})

</script>