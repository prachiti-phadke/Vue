<template>

    <!-- for loading purpose, we will use skeleton loader to show the user that the data is being fetched. Once the data is fetched, we will show the actual data. -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2" v-if  = "loading">
      <SkeletonCourseItem v-for = "i in 3" :key="i">
      </SkeletonCourseItem>
    </div>

    <!-- The registered course is passed as an event to the parent component, which will handle the registration logic. The parent component will then update the list of registered courses accordingly. -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2">
      <Courseitem
        v-for="course in courses"
        :key="course.id"
        :title="course.title"
        :price="course.price"
        :description="course.description"
        @click="registerCourse(course)" 
      />
    </div>


</template>

<script setup>

import { ref, onMounted } from 'vue'
import Courseitem from '@/components/Courseitem.vue'
import SkeletonCourseItem from '@/components/SkeletonCourseItem.vue'

import useBookings from '@/composables/useBookings.js'


// Using the custom composable to manage bookings
const {registerCourse } = useBookings()

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
  fetchCourses()
})

// defineEmits(['register'])


</script>