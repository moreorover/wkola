<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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

// const topics = await
</script>
<template>
  <div class="px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 text-2xl font-bold mb-3">Pick Topic</div>
    <div class="grid mt-7">
      <div v-for="topic in topics" class="col-12 md:col-4">
        <div
          @click="toTopic(topic.id)"
          class="shadow-1 p-5 surface-card text-center"
        >
          <div class="text-900 font-medium text-xl mb-4">{{ topic.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
