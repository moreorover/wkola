<script setup lang="ts">
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({ email: "", password: "" });
const errorMessage = ref("");

const login = () => {
  signInWithEmailAndPassword(getAuth(), formData.email, formData.password)
    .then((res) => {
      router.push({ name: "Feed" });
    })
    .catch((err) => {
      console.log({ err });
      switch (err.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "No account with such email";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
          break;
        default:
          errorMessage.value = "Email or password incorrect";
          break;
      }
    });
};

const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      router.push({ name: "Feed" });
    })
    .catch((err) => {
      console.log({ err });
    });
};
</script>
<template>
  <div
    class="
      flex
      justify-content-center
      flex-wrap
      card-container
      yellow-container
    "
  >
    <div>
      <FormKit
        type="form"
        v-model="formData"
        submit-label="Register"
        @submit="login"
      >
        <h1>Log In!</h1>

        <hr />
        <FormKit
          type="text"
          name="email"
          label="Your email"
          placeholder="jane@example.com"
          help="Enter your email address"
          validation="required|email"
        />
        <FormKit
          type="password"
          name="password"
          label="Password"
          validation="required|length:6"
          placeholder="Your password"
          help="Enter your account password"
        />
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </FormKit>
      <FormKit
        type="button"
        help="Click to use Google account to sign up!"
        @click="signUpWithGoogle"
      >
        Sign in with Google account!
      </FormKit>
    </div>
  </div>
</template>
