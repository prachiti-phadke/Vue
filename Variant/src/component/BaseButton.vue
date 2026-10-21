<template>
    <button :class="`btn btn--${variant}`">
        <slot></slot>
    </button>   
</template>

<script setup>
    defineProps({
        variant:{
            type : String,
            default : 'primary',
            validator : (v) => ['primary', 'secondary', 'success', 'danger'].includes(v)
        }
    })
</script>

<style scoped>
.btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; }
.btn--primary   { background: #2b6cb0; color: white; }
.btn--secondary { background: #e2e8f0; color: #1a202c; border: 1px solid #cbd5e0; }
.btn--danger    { background: #e53e3e; color: white; }
.btn--success   { background: #38a169; color: white; }
</style>