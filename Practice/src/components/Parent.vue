<script setup>
// import { ref } from 'vue'
// import Child from './Child.vue'

// const message = ref('')

// function greet(name) {
//   message.value = 'Hi from the parent!' + name
// }

import { ref } from 'vue'
import Child from './Child.vue'

const people = ref(['Asha', 'Ravi', 'Meera'])
const message = ref('')

function greet(name) {
  message.value = 'Hi ' + name
}

</script>


<template>
  <!-- <Child @sayHi="greet" />                <!-- 3. listen -->
  <!-- <p>{{ message }}</p> -->

   <Child :names="people" @sayHi="greet" />    <!-- 3. listen, and pass the list down -->
  <p>{{ message }}</p>
</template>
