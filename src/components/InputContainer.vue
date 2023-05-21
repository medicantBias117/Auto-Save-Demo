<template>
  <div>
    <label class="label mt-3">
      <span class="label-text"
        >{{ headerText }} {{ required ? "*" : "" }}
      </span>
    </label>
    <input
      :type="type"
      :class="
        'input input-bordered w-full max-w-xs ' +
        (errorText ? 'input-error' : '')
      "
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      @blur="$emit('blur')"
    />
    <label class="label">
      <span v-if="!errorText" class="label-text-alt">{{ helperText }}</span>
      <span v-else class="label-text-alt text-warning">{{ errorText }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: "InputContainer",
  props: [
    "modelValue",
    "name",
    "type",
    "placeholder",
    "headerText",
    "helperText",
    "errorText",
    "required",
  ],
  emits: ["blur", "update:modelValue"], // change added
};
</script>
