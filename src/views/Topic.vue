<script setup lang="ts">
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const fireStore = getFirestore();

const route = useRoute();
const router = useRouter();

const topicId = route.params["topicId"] as string;

const topicRef = doc(fireStore, "Years", topicId);
const docSnap = await getDoc(topicRef);

const topic = ref<any>();

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  topic.value = docSnap.data();
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

const toBook = (id: string) => {
  router.push({ name: "Book", params: { bookId: id } });
};
</script>
<template>
  <p class="text-6xl dark:text-white">
    {{ topic.topic }}
  </p>
  <div
    v-for="year in topic.years"
    class="container mx-auto my-4 flex flex-col items-center border border-gray-400 py-4 md:flex-row"
  >
    <p
      class="flex flex-col text-center text-6xl dark:text-white md:w-5/12 md:text-7xl"
    >
      year {{ year.title }}
    </p>
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
      <div
        v-for="book in year.books"
        class="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        <!-- <img
            class="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          /> -->
        <div class="p-5">
          <router-link
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            :to="{ name: 'Book', params: { bookId: book.id } }"
          >
            <span>{{ book.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
