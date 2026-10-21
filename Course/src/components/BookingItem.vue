<template>
        <CardSections>
        <div class = "flex justify-between items-center"> 
            <div>Vue Course </div>
                <RoundedButton @click="console.log('Report Clicked')" variant = "danger">
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


</script>