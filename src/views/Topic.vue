<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getDoc, getFirestore, doc } from "firebase/firestore";

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

// const topics = await
</script>
<template>
  <div class="px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 text-2xl font-bold mb-3">Pick Book</div>
    <Accordion :activeIndex="0">
      <AccordionTab v-for="year in topic.years" :header="`Year: ${year.title}`">
        <ul>
          <li v-for="book in year.books" @click="toBook(book.id)">
            {{ book.title }}
          </li>
        </ul>
      </AccordionTab>
    </Accordion>
  </div>
</template>
