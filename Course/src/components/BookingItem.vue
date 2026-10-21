<template>
        <CardSections>
        <div class = "flex justify-between items-center"> 
            <div>{{ title }}</div>
            <div>{{ status }}</div>
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
    import RoundedCard from '@/components/RoundedCard.vue'
import CardSections from './CardSections.vue';
import RoundedButton from './RoundedButton.vue';

defineProps({

    title : String
})

defineEmits(['report'])
</script>