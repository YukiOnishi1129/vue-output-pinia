<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  onKeydown: {
    type: Function,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="text"
    class="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown="onKeydown"
  >
</template>

<style scoped>
.input {
  color: white;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
  border-radius: 5px;
}

.input::placeholder {
  color: #c0c0c0;
}
</style>
