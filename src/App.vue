<template>
  <div class="flex flex-col">
    <header>
      <h1 class="text-3xl pb-4">Designing Auto-save Functionality</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio beatae
        dolore fugiat possimus tempore, temporibus earum sapiente labore quae at
        facilis perferendis praesentium dolores quia magnam exercitationem, vero
        molestiae vitae.
      </p>
    </header>
    <main>
      <div class="main-form mt-10 flex flex-col justify-center">
        <div
          class="card p-10 shadow-md border-gray-100 border-spacing-1 border"
        >
          <ul class="steps">
            <li
              :class="
                'step' + (currentStep == 1 ? ' step-primary' : ' step-primary')
              "
              v-bind:data-content="currentStep == 2 ? '✓' : '1'"
            >
              Contact Details
            </li>
            <li :class="'step' + (currentStep == 1 ? '' : ' step-primary')">
              Additional Details
            </li>
          </ul>
          <div
            v-if="currentStep == 1"
            class="form step-one mt-8 justify-center flex"
          >
            <div class="form-control w-full max-w-xs">
              <InputContainer
                v-model="formData.email"
                name="email"
                type="text"
                placeholder="Your email"
                headerText="Please enter your email"
                helperText=""
                :errorText="errorDisplay.email"
                @blur="updateValue('email')"
                required="true"
              ></InputContainer>

              <InputContainer
                v-model="formData.phoneNumber"
                name="phonenumber"
                type="number"
                placeholder="Your phone number"
                headerText="Please enter your phone number"
                helperText="10 digits"
                :errorText="errorDisplay.phoneNumber"
                @blur="updateValue('phonenumber')"
                required="true"
              ></InputContainer>

              <button class="btn mt-8" @click="nextPage" :disabled="isError">
                {{ isError ? "Please check the errors" : "Continue" }}
              </button>
            </div>
          </div>
          <div
            v-if="currentStep > 1"
            class="form step-one mt-8 justify-center flex"
          >
            <div class="form-control w-full max-w-xs">
              <InputContainer
                v-model="formData.location"
                name="location"
                type="text"
                placeholder="Your location"
                headerText="Please enter your location"
                helperText=""
                :errorText="errorDisplay.location"
                @blur="updateValue('location')"
              ></InputContainer>
              <InputContainer
                v-model="formData.monkeyName"
                name="monkeyName"
                type="text"
                placeholder="Monkey Name"
                headerText="Please enter your favorite monkey name"
                helperText=""
                :errorText="errorDisplay.monkeyName"
                @blur="updateValue('monkeyName')"
              ></InputContainer>
              <InputContainer
                v-model="formData.password"
                name="password"
                type="password"
                placeholder="Your password"
                headerText="Create your password"
                helperText="Between 5-10 characters"
                :errorText="errorDisplay.password"
                @blur="updateValue('password')"
                required="true"
              ></InputContainer>
              <div class="mt-8 flex flex-row justify-between">
                <button class="btn btn-ghost" @click="prevPage">Back</button>
                <button class="btn">Submit!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { useFormStore } from "./stores/formStore";
import InputContainer from "./components/InputContainer.vue";
const emailsThatAreNotUnique = ["a@a.com", "email@email.com", "me@me.com"];

onMounted(() => {
  const formStore = useFormStore();
  const currentStep = ref(formStore.currentStep);
  const formData = formStore.data;

  const errorDisplay = reactive({
    email: "",
    phoneNumber: "",
    location: "",
    monkeyName: "",
    password: "",
  });

  const isError = ref(false);

  const updateValue = async (field) => {
    //we can now separate logic by field:

    if (field == "email") {
      //email validation logic and update
      if (formData.email == "") {
        errorDisplay.email = "Please enter a value";
        isError.value = true;
      } else if (formData.email && ValidateEmail(formData.email)) {
        // it is valid, make API call to check if the email is unique.
        // This is where we'd do an API call to get the validity.
        // this can be async and non-blocking, but bear in mind that you'll have to hold the form hostage (ie. no move)
        // forward till the API response has been received.

        if (!CheckEmailUniqueness(formData.email)) {
          //email doesn't exist on db
          // we'll store the info now
          errorDisplay.email = "";
          formStore.data.email = formData.email;
          isError.value = false;
        } else {
          errorDisplay.email =
            "An account exists with this email. Please login or try with a different email";
          isError.value = true;
        }
      } else {
        errorDisplay.email = "Invalid email. Please check...";
        isError.value = true;
      }
    }
    // phone number
    else if (field == "phonenumber") {
      if (formData.phoneNumber == "") {
        errorDisplay.email = "Please enter a value";
        isError.value = true;
      } else if (formData.phoneNumber && ValidatePhone(formData.phoneNumber)) {
        formStore.data.phoneNumber = formData.phoneNumber;
        isError.value = false;
        errorDisplay.phoneNumber = "";
      } else {
        errorDisplay.phoneNumber = "Invalid phone number. Please check...";
        isError.value = true;
      }
    }
    // combining the rest for basic validation - optional values with alphanumeric values
    else if (field == "location" || field == "monkeyName") {
      if (checkForAlphanumeric(formData[field]) || formData[field] == "") {
        formStore.data[field] = formData[field];
        isError.value = false;
        errorDisplay[field] = "";
      } else {
        isError.value = true;
        errorDisplay[field] = "Please enter a valid value OR leave blank.";
      }
    } else if (field == "password") {
    }
  };

  const nextPage = async () => {
    await updateValue("email");
    await updateValue("phonenumber");

    if (checkIfThereIsAnyError()) {
      formStore.increment;
      currentStep.value++;
    }
  };

  const prevPage = () => {
    if (checkIfThereIsAnyError()) {
      formStore.decrement;
      currentStep.value--;
    }
  };
});

//helper functions
function CheckEmailUniqueness(email) {
  //ideally an API call, but we'll just run a simple includes check
  return emailsThatAreNotUnique.includes(email);
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function checkForAlphanumeric(val) {
  const alphacheck = /^[a-z0-9]+$/i;
  if (val.match(alphacheck)) {
    return true;
  } else {
    return false;
  }
}

function ValidatePhone(inputtxt) {
  var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

function checkIfThereIsAnyError() {
  console.log(Object.values(errorDisplay));
  console.log(Object.values(errorDisplay).every((x) => x == ""));
  return Object.values(errorDisplay).every((x) => x == "");
}
</script>

<style scoped></style>
