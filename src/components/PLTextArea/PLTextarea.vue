<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    disabled: {
        type: Boolean,
    },
    modelValue: {
        type: String,
    },
    label: {
        type: String,
    },
    error: {
        type: String,
    },
    name: {
        type: String,
    }
})
</script>

<template>
    <label :for="props.name" class="pl-textarea__wrapper">
        {{ label }}
        <textarea
            :disabled="disabled"
            :class="{ 'pl-textarea__root': true, 'pl-textarea__root_error': Boolean(props.error) }"
            :name="props.name" 
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
        ></textarea>
    </label>
    <div class="pl-textarea__error-message">
        <span v-show="Boolean(error)">{{ error }}</span>
    </div>
</template>

<style scoped>
.pl-textarea__wrapper {
    display: flex;
    flex-direction: column;
    color: var(--pl-color-text-1);
    padding-left: 4px;
}

.pl-textarea__root {
    padding: var(--pl-global-inputs-padding);
    color: inherit;
    border-radius: var(--pl-global-border-radius);
    margin-left: -4px;
}

.pl-textarea__root:focus {
    box-shadow: 0 0 4pt var(--pl-color-divider-focus);
    border-color: transparent;
    outline: 0;
}

.pl-textarea__root_error {
    border-color: var(--pl-color-text-error);
}

.pl-textarea__error-message {
    color: var(--pl-color-text-error);
    min-height: 24px;
    font-size: 14px;
    padding-left: 4px;
}
</style>
