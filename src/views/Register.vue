<script setup lang="ts">
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({ email: "", password: "" });

const register = () => {
  createUserWithEmailAndPassword(getAuth(), formData.email, formData.password)
    .then((res) => {
      router.push({ name: "Feed" });
    })
    .catch((err) => {
      console.log({ err });
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
  <div class="card-container yellow-container flex flex-wrap justify-center">
    <div>
      <FormKit
        type="form"
        v-model="formData"
        submit-label="Register"
        @submit="register"
      >
        <FormKit
          type="text"
          name="email"
          label="Your email"
          placeholder="jane@example.com"
          help="What email should we use?"
          validation="required|email"
        />
        <div class="double">
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            help="Choose an account password"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            validation="required|confirm"
            help="Choose an account password"
          />
        </div>
      </FormKit>
      <FormKit
        type="button"
        help="Click to use Google account to sign up!"
        @click="signUpWithGoogle"
      >
        Sign up with Google account!
      </FormKit>
    </div>
  </div>
</template>
