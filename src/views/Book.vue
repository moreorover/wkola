<script setup lang="ts">
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const fireStore = getFirestore();

const route = useRoute();
const router = useRouter();

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
  router.push("/topics");
}

const sortTasks = (tasks: any[]) => {
  return tasks.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
};

const sortLessons = (lessons: any[]) => {
  return lessons.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
};

const selectedLesson = ref(0);
const selectedTask = ref(0);

const select = (lesson: number, task: number) => {
  selectedLesson.value = lesson;
  selectedTask.value = task;
};

const unSelectedTaskClass =
  "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300";
const selectedTaskClass =
  "bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900";
</script>
<template>
  <p class="text-6xl dark:text-white">
    {{ book.topic }} -> year {{ book.year }} -> {{ book.title }}
  </p>
  <div
    v-for="lesson in sortLessons(book.lessons)"
    class="container mx-auto my-4 flex flex-col items-center border border-gray-400 py-4 md:flex-row"
  >
    <div class="flex flex-col text-center md:w-5/12 md:text-7xl">
      <p class="text-6xl dark:text-white">
        {{ lesson.title }}
      </p>
    </div>

    <div class="flex w-full flex-col">
      <div class="flex justify-around pb-4">
        <span
          v-for="task in sortTasks(lesson.tasks)"
          @click="select(lesson.sequence, task.sequence)"
          :class="[
            lesson.sequence === selectedLesson && task.sequence === selectedTask
              ? selectedTaskClass
              : unSelectedTaskClass,
          ]"
          >Task: {{ task.sequence }}</span
        >
      </div>
      <div
        v-for="task in sortTasks(lesson.tasks)"
        v-show="
          lesson.sequence === selectedLesson && task.sequence === selectedTask
        "
        class="mx-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
      >
        <img class="rounded" :src="task.img" />
      </div>
    </div>
  </div>
</template>
