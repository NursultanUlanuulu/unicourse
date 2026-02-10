<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "../../../../process/auth/auth.interceptor";
import type { Subject } from "../../test.interface";
import { useI18n } from "vue-i18n";
import { useUserProfileStore } from '../../../user-profile/user-profile.service';
import education from '../../../../../public/assets/image/free-icon-education-8590710.png'
const { t, locale } = useI18n();
const router = useRouter();
const subjects = ref<Subject[]>([]);
const subjectsAfterFilter = ref<Subject[]>([]);
const store = useUserProfileStore();
const accessed = ref();
const showModal = ref(false);

const subjectIcons: Record<string, string> = {
  "Математика": '/assets/image/free-icon-mathematics-8432094.png',
  "математика": '/assets/image/free-icon-mathematics-8432094.png',
  "Алгебра": '/assets/image/free-icon-mathematics-8432094.png',
  "алгебра": '/assets/image/free-icon-mathematics-8432094.png',
  "Биология": '/assets/image/free-icon-biology-1456648.png',
  "биология": '/assets/image/free-icon-biology-1456648.png',
  "Химия": '/assets/image/free-icon-chemistry-3066058.png',
  "химия": '/assets/image/free-icon-chemistry-3066058.png',
  "Английский": '/assets/image/free-icon-understanding-4927772.png',
  "английский": '/assets/image/free-icon-understanding-4927772.png',
  "Кыргыз тили": '/assets/image/free-icon-book-1276669.png',
  "кыргыз тили": '/assets/image/free-icon-book-1276669.png',
  "Русский язык": '/assets/image/free-icon-geometry-8486444.png',
  "русский язык": '/assets/image/free-icon-geometry-8486444.png',
  "Геометрия": '/assets/image/free-icon-book-1276669.png',
  "геометрия": '/assets/image/free-icon-book-1276669.png',
  "Физика": '/assets/image/free-icon-education-8590710.png',
  "физика": '/assets/image/free-icon-education-8590710.png',
};

const getSubjectIcon = (subjectName: string) => {
  return subjectIcons[subjectName] ?? education;
};

const fetchSubjects = async () => {
  try {
    const response = await axiosInstance.get('/api/subjects/list/of/subjects');
    subjects.value = response.data.sort((a: Subject, b: Subject) => (a.questionCount === 0 ? 1 : b.questionCount === 0 ? -1 : 0));
    updateSubjectLangFilter();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const updateSubjectLangFilter = () => {
  if (locale.value === 'ky') {
    subjectsAfterFilter.value = subjects.value.filter((s: Subject) => s.kgLanguage === true || s.kgLanguage === null);
  } else {
    subjectsAfterFilter.value = subjects.value.filter((s: Subject) => s.kgLanguage === false || s.kgLanguage === null);
  }
};

const fetchStatus = async () => {
  await store.fetchProfile();
  accessed.value = store.userProfile?.access;
};

const nav = async (questionCount: number, sub: Subject, path: "trial" | "training") => {
  if (questionCount > 0) {
    await fetchStatus();
    if (accessed.value === false) {
      showModal.value = true;
      return;
    }
    switch (path) {
      case "training":
        await router.push({
          path: 'user-panel/training-test',
          state: {
            subjectName: sub.subjectName,
            subjectId: sub.id,
            questionCount: sub.questionCount
          }
        });
        break;
      case "trial":
        await router.push({
          path: 'user-panel/trial-test',
          state: {
            subjectName: sub.subjectName,
            subjectId: sub.id,
            questionLimit: sub.questionCount,
            time: sub.time
          }
        });
        break;
    }
  }
};

watch(() => locale.value, () => {
  updateSubjectLangFilter();
});

onMounted(async () => {
  await fetchSubjects();
  await fetchStatus();
});
</script>

<template>
  <div class="w-10/12 mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-white text-center text-3xl font-semibold my-2">{{ t('userMainPage.mainTest') }}</h1>
      <div class="hidden sm:flex w-1/2">
        <button class="flex-1 py-1 px-4 font-semibold text-white border-b border-lime-300 hover:shadow-[inset_0px_-35px_35px_-35px_green]" @click="router.push('/user-panel/archive')">Архив</button>
        <button class="flex-1 py-1 px-4 font-semibold text-white border-b border-lime-300 hover:shadow-[inset_0px_-35px_35px_-35px_green]" @click="router.push('/user-panel/profile')">Профиль</button>
      </div>
    </div>

    <div class="text-white max-h-[70vh] overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <button v-for="subject in subjectsAfterFilter" :key="subject.id" class="bg-[#32183b] rounded-lg p-3 flex flex-col disabled:bg-[rgb(30,30,30,.4)] gap-2 border border-purple-950 h-min" :disabled="subject.questionCount === 0">
        <div class="flex items-center gap-3">
          <span class="flex items-center justify-center rounded-full bg-white w-[40px] h-[40px] p-[7px] border border-red-500">
            <img class="" :src="getSubjectIcon(subject.subjectName)" alt="subject icon"/>
          </span>
          <span class="text-xl md:text-2xl font-semibold max-w-[80%]">{{ subject.subjectName }}</span>
        </div>
        <span class="text-[12px] text-start">{{ subject.questionCount === 0 ? t('userMainPage.testPrepareNot') : t('userMainPage.testOrPrepare') }}</span>
        <div class="flex w-full gap-2">
          <button :disabled="subject.questionCount === 0" class="text-sm border disabled:pointer-events-none disabled:bg-[rgb(30,30,30,.4)] rounded-l-lg border-lime-300 flex-1 text-lime-400 py-[2px] px-4 hover:bg-lime-300 hover:text-black" @click="nav(subject.questionCount, subject, 'trial')">{{ t('userMainPage.trialTest') }}</button>
          <button :disabled="subject.questionCount === 0" class="text-sm border disabled:pointer-events-none disabled:bg-[rgb(30,30,30,.4)] rounded-r-lg border-lime-300 flex-1 text-lime-400 py-[2px] px-4 hover:bg-lime-300 hover:text-black" @click="nav(subject.questionCount, subject, 'training')">{{ t('userMainPage.preparation') }}</button>
        </div>
      </button>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-96 text-center">
      <p class="text-lg font-semibold">{{ t('userMainPage.Notification') }}</p>
      <p class="mt-2 text-sm">{{ t('userMainPage.Notification2') }}</p>
      <div class="mt-4 flex justify-center gap-3">
        <button @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded">{{ t('userMainPage.Notification4') }}</button>
        <a href="https://wa.me/996501122121" target="_blank" class="px-4 py-2 bg-green-500 text-white rounded">
          {{ t('userMainPage.Notification3') }}
        </a>
      </div>
    </div>
  </div>
</template>
