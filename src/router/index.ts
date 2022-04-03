import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "Log In",
      component: () => import("../views/LogIn.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/feed",
      name: "Feed",
      component: () => import("../views/Feed.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topics/:topicId",
      name: "Topic",
      component: () => import("../views/ShowTopic.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/topics",
      name: "Topics",
      component: () => import("../views/ShowTopics.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/books/:bookId",
      name: "Book",
      component: () => import("../views/ShowBook.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
