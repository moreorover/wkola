<script setup lang="ts">
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const activeClass = ref(
  "block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
);

const inactiveClass = ref(
  "block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
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
  <!-- <div
    class="surface-overlay shadow-2 align-items-center justify-content-between relative flex py-3 px-6 lg:static"
    style="min-height: 80px"
  >
    <a
      class="text-700 p-ripple mt-1 block cursor-pointer lg:hidden"
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
      class="align-items-center flex-grow-1 justify-content-between surface-overlay top-100 z-1 shadow-2 absolute left-0 hidden w-full lg:static lg:flex lg:shadow-none"
    >
      <ul
        class="lg:align-items-center flex-column m-0 flex select-none list-none p-0 lg:flex-row"
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
        class="lg:align-items-center flex-column border-top-1 surface-border lg:border-top-none m-0 flex select-none list-none p-0 lg:flex-row"
      >
        <li>
          <a
            class="align-items-center text-600 hover:text-900 hover:surface-100 border-round transition-duration-150 p-ripple flex cursor-pointer p-3 px-6 font-medium transition-colors lg:px-3 lg:py-2"
          >
            <i class="pi pi-heart mr-2 text-base lg:mr-0 lg:text-2xl"></i>
            <span class="block font-medium lg:hidden">Favourites</span>
          </a>
        </li>
        <li class="border-top-1 surface-border lg:border-top-none">
          <a
            class="align-items-center hover:surface-100 border-round transition-duration-150 p-ripple flex cursor-pointer p-3 px-6 font-medium transition-colors lg:px-3 lg:py-2"
          >
            <img
              v-if="data.user?.photoURL"
              :src="data.user?.photoURL || ''"
              class="mr-3 lg:mr-0"
              style="width: 28px; height: 28px"
            />
            <i v-else class="pi pi-user mr-2 text-base lg:mr-0 lg:text-2xl"></i>
            <div class="ml-2">
              <div class="text-900 font-medium">
                {{ data.user?.displayName }}
              </div>
              <span class="text-600 text-sm font-medium">{{
                data.user?.email
              }}</span>
            </div>
          </a>
        </li>
        <li>
          <a
            class="align-items-center text-600 hover:text-900 hover:surface-100 border-round transition-duration-150 p-ripple flex cursor-pointer p-3 px-6 font-medium transition-colors lg:px-3 lg:py-2"
            @click="handleSignOut"
          >
            <i class="pi pi-sign-out mr-2 text-base lg:mr-0 lg:text-2xl"></i>
            <span class="block font-medium lg:hidden">Log Out</span>
          </a>
        </li>
      </ul>
      <ul
        v-if="!data.isLoggedIn"
        class="lg:align-items-center flex-column m-0 flex select-none list-none p-0 lg:flex-row"
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
  </div> -->

  <nav
    class="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <router-link
        :class="[$route.name === 'Home' ? activeClass : inactiveClass]"
        to="/"
      >
        <span>DOM DOM</span>
      </router-link>

      <div class="flex md:order-2">
        <div class="relative mr-3 hidden md:mr-0 md:block">
          <div v-if="data.user" class="flex">
            <span
              class="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              >{{ data.user?.email }}</span
            >
            <button
              @click="handleSignOut"
              type="button"
              class="rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log Out
            </button>
          </div>
        </div>
        <button
          data-collapse-toggle="mobile-menu-3"
          type="button"
          class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="mobile-menu-3"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        id="mobile-menu-3"
      >
        <ul
          v-if="data.user"
          class="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              :class="[$route.name === 'Feed' ? activeClass : inactiveClass]"
              to="/feed"
            >
              <span>Feed</span>
            </router-link>
          </li>
          <li>
            <router-link
              :class="[$route.name === 'Topics' ? activeClass : inactiveClass]"
              to="/topics"
            >
              <span>Topics</span>
            </router-link>
          </li>
        </ul>
        <ul
          v-else
          class="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
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
              :class="[
                $route.name === 'Register' ? activeClass : inactiveClass,
              ]"
              to="/register"
            >
              <span>Register</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
