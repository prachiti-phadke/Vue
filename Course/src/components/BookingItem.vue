<template>
        <CardSections>
        <div class = "flex justify-between items-center"> 
            <div>{{ title }}</div>
            <div>
                <!-- this is dynamic component - runs automatically whenever pending changes -->
                <!-- class binding - if pending is true, then add animate-spin class to the icon -->
                <component :is = "icon" :class="{'animate-spin' : pending}"></component>
            
            </div>
                <RoundedButton @click="$emit('report')" variant = "danger">
                    Report
                </RoundedButton>
            
        </div>
        </CardSections>
        

        <!-- <CardSections>
            <div>{{ title }}</div>        
        </CardSections> -->
</template>

<script setup>
import CardSections from './CardSections.vue';
import RoundedButton from './RoundedButton.vue';

import {computed} from 'vue'

import { LoaderCircle, Check } from '@lucide/vue';

// Define the props that the component will accept
const props = defineProps({

    title : String,
    status : String
})

defineEmits(['report'])
//to understand whats that status is doing, we can use computed property to check if the status is pending or not
const pending = computed(() => props.status === 'pending')

const icon = computed(() => (pending.value ? LoaderCircle : Check))

</script>