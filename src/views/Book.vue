<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getDoc, getFirestore, doc } from "firebase/firestore";

const fireStore = getFirestore();

const route = useRoute();

const bookId = route.params["bookId"] as string;

const book = ref<any>();

const bookRef = doc(fireStore, "Books", bookId);
const docSnap = await getDoc(bookRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  book.value = docSnap.data();
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

const sortTasks = (tasks: any[]) => {
  return tasks.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
};
</script>
<template>
  <div class="px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 text-2xl font-bold mb-3">Pick Lesson</div>
    <Accordion :activeIndex="0">
      <AccordionTab
        v-for="lesson in book.lessons"
        :header="`${lesson.title} - Tasks Count: ${lesson.tasksCount}`"
      >
        <div v-for="task in sortTasks(lesson.tasks)">
          <h5>Sequence no: {{ task.sequence }}</h5>
          <Image :src="task.img" alt="Image" width="250" />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>
