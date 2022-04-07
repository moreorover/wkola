<script setup lang="ts">
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const fireStore = getFirestore();

const router = useRouter();

const topics = ref<any>([]);

const querySnapshot = await getDocs(collection(fireStore, "Topics"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().title}`);
  topics.value.push({ id: doc.id, ...doc.data() });
});

const toTopic = (id: string) => {
  router.push({ name: "Topic", params: { topicId: id } });
};
</script>
<template>
  <div class="justify center">
    <p
      v-for="topic in topics"
      class="py-8 text-center text-6xl dark:text-white md:text-9xl"
      @click="toTopic(topic.id)"
    >
      {{ topic.title }}
    </p>
  </div>
</template>
