/// removed ---- ignore this but use for future reference

import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore(
    'formStore',
    () => {
        const data = ref({
            email: '',
            phoneNumber: '',
            location: '',
            monkeyName: '',
            password: '',
        })

        const currentStep = ref(1)

        const increment = computed(() => currentStep.value++)
        const decrement = computed(() => currentStep.value--)
        const signupComplete = ref(false)

        const $deleteEverything = computed(() => {
            data.value = {
                email: '',
                phoneNumber: '',
                location: '',
                monkeyName: '',
                password: '',
            }
            currentStep.value = 1
            return
        })

        return {
            data,
            currentStep,
            increment,
            decrement,
            $deleteEverything,
            signupComplete,
        }
    },
    { persist: true,  storage: sessionStorage, paths: ['data', 'currentStep', 'signupComplete' ]  }
)
