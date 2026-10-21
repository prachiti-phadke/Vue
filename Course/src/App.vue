<template>
  <div class="p-2 space-y-8">
    <h1 class="text-4xl font-medium">Courses Up !</h1>
    <h2 class="text-2xl font-medium">All Courses</h2>

    <div v-if = "loading">
      Courses are loading...
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2">
      <Courseitem
        v-for="course in courses"
        :key="course.id"
        :title="course.title"
        :price="course.price"
        :description="course.description"
        @purchase="handlePurchase"
        @click="console.log('button clicked')"
      />
    </div>
    <h3 class="text-2xl font-medium">Your Courses</h3>

    <div class="grid grid-cols-1 gap-4">
      <BookingItem v-for = "i in 2" :key="i">
      
      </BookingItem>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Courseitem from '@/components/Courseitem.vue'
import BookingItem from '@/components/BookingItem.vue'

const courses = ref([])
const loading = ref(false)

const fetchCourses = async () => {
  loading.value = true

  try{
      const response = await fetch('http://localhost:3001/courses');
      courses.value = await response.json();
  }finally{
      loading.value = false
  }

}

onMounted(() => {
  fetchCourses();
})


</script>