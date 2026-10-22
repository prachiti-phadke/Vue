<template>
  <div class="p-2 space-y-8">
    <h1 class="text-4xl font-medium">Courses Up !</h1>
    <h2 class="text-2xl font-medium">All Courses</h2>

    

    <!-- for loading purpose, we will use skeleton loader to show the user that the data is being fetched. Once the data is fetched, we will show the actual data. -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2" v-if  = "loading">
      <SkeletonCourseItem v-for = "i in 3" :key="i">
      </SkeletonCourseItem>
    </div>

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
    <h2 class="text-2xl font-medium">Your Courses</h2>

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


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Courseitem from '@/components/Courseitem.vue'
import BookingItem from '@/components/BookingItem.vue'
import SkeletonBookingItem from '@/components/SkeletonBookingItem.vue'

const courses = ref([])
const loading = ref(false)
const bookings = ref([])

const fetchCourses = async () => {
  loading.value = true

  try{
      const response = await fetch('http://localhost:3001/courses');
      courses.value = await response.json();
  }finally{
      loading.value = false
  }

}



const registerCourse = async (course) => {
  if (bookings.value.some((b) => b.id === course.id)) {
    alert('Course already purchased!')
    return
  }

  const newCourse = {
    id: course.id,
    title: course.title,
    price: course.price,
    description: course.description,
    status: 'pending',
  }

  bookings.value.push(newCourse)

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newCourse,
        status: 'confirmed',
      }),
    })

    if (response.ok) {
      const index = bookings.value.findIndex((b) => b.id === newCourse.id)
      bookings.value[index] = await response.json()
    } else {
      bookings.value = bookings.value.filter((b) => b.id != newCourse.id)
      return
    }
  } catch (e) {
    console.error(e)
    bookings.value = bookings.value.filter((b) => b.id != newCourse.id)
  }
}



const fetchBookings = async() => {
  loading.value = true

  try{
    const response = await fetch('http://localhost:3001/bookings');
    bookings.value = await response.json();
  }finally{
    loading.value = false
  }
  

}

const reportCourse = async (courseId) => {
  const index = bookings.value.findIndex((b) => b.id === courseId)
  const toBeDeletedCourse = bookings.value[index]
  bookings.value.splice(index, 1)

  try{
    const response = await fetch(`http://localhost:3001/bookings/${courseId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw Error('Couldn\'t delete course')
    }
  }catch(e){
    console.log(e)
    bookings.value.splice(index, 0, toBeDeletedCourse)
  }
}

onMounted(() => {
  fetchCourses()
  fetchBookings()
})


</script>