<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    required: true,
    type: String
  },
  alt: {
    default: 'avatar',
    type: String
  },
  size: {
    default: 'medium',
    type: String,
  },
  label: {
    required: false,
    type: String,
  }
})

const sizeValue = computed(() => {
    switch (props.size) {
        case 'small':
            return 24
        case 'medium':
            return 36
        case 'large':
            return 48
        default:
            return 36;
    }
})
</script>

<template>
  <img 
    class="pl-avatar"
    :src="src" 
    :alt="alt" 
    :width="sizeValue" 
    :height="sizeValue"
  />
</template>

<style scoped>
.pl-avatar {
    border-radius: 50%;
}
</style>