<template>
  <div>
    <button
      @click="$emit('click')"
      :class="['rounded-full px-3 py-1', variants[variant] ?? variants.default]"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const variants = {
  default: 'border border-blue-200 bg-blue-100 hover:bg-blue-300 text-blue-600 hover:text-white',
  danger: 'bg-red-200 text-red-900 :enabled:hover:bg-red-100',
}

defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})

defineEmits(['click'])
</script>