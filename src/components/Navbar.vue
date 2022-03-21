<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
  Auth,
  User,
} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const activeClass = ref(
  "flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 text-900 surface-400 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
);

const inactiveClass = ref(
  "flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
);

const data = reactive<{ user: User | null; isLoggedIn: boolean }>({
  user: null,
  isLoggedIn: false,
});

let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      data.isLoggedIn = true;
      data.user = user;
    } else {
      data.isLoggedIn = false;
      data.user = null;
    }
  });
});

const handleSignOut = async () => {
  await signOut(auth);
  router.push("/login");
};
</script>
<template>
  <div
    class="
      surface-overlay
      py-3
      px-6
      shadow-2
      flex
      align-items-center
      justify-content-between
      relative
      lg:static
    "
    style="min-height: 80px"
  >
    <a
      class="cursor-pointer block lg:hidden text-700 mt-1 p-ripple"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        leaveToClass: 'hidden',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-bars text-4xl"></i>
    </a>
    <div
      class="
        align-items-center
        flex-grow-1
        justify-content-between
        hidden
        lg:flex
        absolute
        lg:static
        w-full
        surface-overlay
        left-0
        top-100
        z-1
        shadow-2
        lg:shadow-none
      "
    >
      <ul
        class="
          list-none
          p-0
          m-0
          flex
          lg:align-items-center
          select-none
          flex-column
          lg:flex-row
        "
      >
        <li>
          <router-link
            :class="[$route.name === 'Home' ? activeClass : inactiveClass]"
            to="/"
          >
            <i class="pi pi-home mr-2"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link
            :class="[$route.name === 'Feed' ? activeClass : inactiveClass]"
            to="/feed"
          >
            <i class="pi pi-home mr-2"></i>
            <span>Feed</span>
          </router-link>
        </li>
        <li>
          <router-link
            :class="[$route.name === 'Topics' ? activeClass : inactiveClass]"
            to="/topics"
          >
            <i class="pi pi-home mr-2"></i>
            <span>Topics</span>
          </router-link>
        </li>
      </ul>
      <ul
        v-if="data.isLoggedIn"
        class="
          list-none
          p-0
          m-0
          flex
          lg:align-items-center
          select-none
          flex-column
          lg:flex-row
          border-top-1
          surface-border
          lg:border-top-none
        "
      >
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
              p-ripple
            "
          >
            <i class="pi pi-heart text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Favourites</span>
          </a>
        </li>
        <li class="border-top-1 surface-border lg:border-top-none">
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
              p-ripple
            "
          >
            <img
              v-if="data.user?.photoURL"
              :src="data.user?.photoURL || ''"
              class="mr-3 lg:mr-0"
              style="width: 28px; height: 28px"
            />
            <i v-else class="pi pi-user text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <div class="ml-2">
              <div class="text-900 font-medium">
                {{ data.user?.displayName }}
              </div>
              <span class="text-600 font-medium text-sm">{{
                data.user?.email
              }}</span>
            </div>
          </a>
        </li>
        <li>
          <a
            class="
              flex
              px-6
              p-3
              lg:px-3 lg:py-2
              align-items-center
              text-600
              hover:text-900 hover:surface-100
              font-medium
              border-round
              cursor-pointer
              transition-colors transition-duration-150
              p-ripple
            "
            @click="handleSignOut"
          >
            <i class="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Log Out</span>
          </a>
        </li>
      </ul>
      <ul
        v-if="!data.isLoggedIn"
        class="
          list-none
          p-0
          m-0
          flex
          lg:align-items-center
          select-none
          flex-column
          lg:flex-row
        "
      >
        <li>
          <router-link
            :class="[$route.name === 'Log In' ? activeClass : inactiveClass]"
            to="/login"
          >
            <span>Log In</span>
          </router-link>
        </li>
        <li>
          <router-link
            :class="[$route.name === 'Register' ? activeClass : inactiveClass]"
            to="/register"
          >
            <span>Register</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
