import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFormStore = defineStore(
  "formStore",
  () => {
    const data = ref({
      email: "",
      phoneNumber: "",
      location: "",
      monkeyName: "",
      password: "",
    });

    const currentStep = ref(1);

    const increment = computed(() => currentStep.value++);
    const decrement = computed(() => currentStep.value--);

    return { data, currentStep, increment, decrement };
  },
  { persist: true }
);
