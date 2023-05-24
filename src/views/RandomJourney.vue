<template>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2 z-50">✕</label>

            <SignUpForm :emails-that-are-not-uniques="emailsThatAreNotUniques"></SignUpForm>
        </div>
    </div>
    <div>
        <header>
            <h1 class="text-3xl pb-4">Auto-save Demo</h1>
            <p>
                Here you are on a random point in your journey. Doing something else. The prompt to open the modal to
                complete the form is dynamic.
                <br /><br />
                To go back to the previous journey,
                <RouterLink to="/"> click Here </RouterLink>
            </p>
        </header>
        <main
            class="flex flex-col justify-around gap-8 card shadow-md p-10 border-gray-100 max-w-3xl min-w-max md:flex-row"
        >
            <!-- The button to open modal -->

            <div class="table-container">
                <h2 class="text-xl">Your data table</h2>
                <div class="overflow-x-auto mt-4">
                    <table class="table table-zebra w-full">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr>
                            <!-- row 2 -->
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                class="flex flex-col justify-center place-items-center text-center gap-5 max-w-xs"
                v-if="!formStore.signupComplete"
            >
                <div v-if="formStore.currentStep == 2">
                    You're just a step away to complete your profile and save this data.
                </div>
                <div v-if="formStore.currentStep == 1">Sign up and save this information</div>

                <label for="my-modal" class="btn">
                    <span v-if="!dataPresent"> Complete your sign-up </span>
                    <span v-else> Sign up to save your data </span>
                </label>
            </div>
            <div class="" v-else>Sign Up Complete!</div>

            <!-- Put this part before </body> tag -->
        </main>
        <footer class="mt-5 text-center">
            <div>
                Made with 💕 by <a href="https://rkakodker.com">Rameez Kakodker</a>
            </div>
        </footer>
    </div>
</template>

<script setup>
import SignUpForm from '@/components/SignUpForm.vue'
import { ref } from 'vue'
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()
const dataPresent = ref(false)

dataPresent.value = Object.values(formStore.data).every((x) => x == '')

const closeModal = () => {
    document.getElementById('my-modal').checked = false
}

const emailsThatAreNotUniques = ['a@a.com', 'email@email.com', 'me@me.com']
</script>

<style lang="scss" scoped></style>
