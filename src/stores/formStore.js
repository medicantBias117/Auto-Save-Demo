import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
    state: () => {
        const data = ref({
            email: '',
            phoneNumber: '',
            location: '',
            monkeyName: '',
            password: '',
        })
        const currentStep = ref(1)
        const signupComplete = ref(false)
        return {
            data,
            currentStep,
            signupComplete,
        }
    },
    actions: {
        increment() {
            currentStep.value++
        },
        decrement() {
            currentStep.value--
        },
        $deleteEverything() {
            data.value = {
                email: '',
                phoneNumber: '',
                location: '',
                monkeyName: '',
                password: '',
            }
            currentStep.value = 1
            return
        },
    },
    persist: { enabled: true },
})
