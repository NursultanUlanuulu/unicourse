<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
    <div class="bg-gradient-to-br from-[#B6B6B6] to-[#291A40] px-6 py-8 md:px-8 rounded-2xl w-full max-w-[800px] md:h-[500px] shadow-2xl flex flex-col relative text-white">
      
      <div class="text-2xl font-bold mb-3 flex gap-2 items-center justify-center">
        <img :src="aiIcon" alt="AI" class="h-8 w-8">
        <p>AI Чат</p>
      </div>
      
      <div class="overflow-y-auto h-[90cqw] p-4 border border-white/20 rounded-lg flex flex-col gap-3 bg-[#d7d4d7] backdrop-blur-md shadow-inner">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          class="flex items-start gap-2"
          :class="msg.isUser ? 'justify-end' : 'justify-start'">
          
          <img v-if="!msg.isUser" :src="gptIcon" alt="AI" class="h-6 w-6 self-start">
          
          <p
            class="p-3 rounded-lg shadow-md max-w-[80%] transition-all"
            :class="msg.isUser
              ? 'bg-[#5b5a87] text-white self-end'
              : 'bg-gray-700 text-gray-200 self-start'">
            <TypingMessage v-if="!msg.isUser" :text="msg.text" />
            <span v-else v-html="msg.text"></span>
          </p>
        </div>
        
        <div v-if="loading" class="text-black animate-typing">AI печатает...</div>
      </div>
      
      <div class="mt-3 flex gap-3">
        <input 
          v-model="inputMessage" 
          type="text" 
          class="border p-3 rounded-lg flex-1 focus:ring-2 focus:ring-white/50 focus:outline-none shadow-sm bg-gray-700 placeholder-gray-300 text-white"
          placeholder="Введите сообщение..." 
          @keyup.enter="sendMessage" />
        
        <button 
          @click="sendMessage" 
          class="bg-gray-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-gray-500 transition">📩</button>
      </div>
      
      <button @click="props.handleClose" class="absolute top-3 right-3 text-white hover:text-red-500 transition">✖</button>
    </div>
  </div>
</template>

<style>
@keyframes typingEffect {
  from { width: 0; }
  to { width: 100%; }
}

.typing-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: typingEffect 2s steps(40, end);
}

@keyframes typing {
  0%, 100% { content: "AI печатает..."; }
  33% { content: "AI печатает."; }
  66% { content: "AI печатает.."; }
}

.animate-typing::after {
  content: "AI печатает...";
  animation: typing 1.5s infinite steps(4, end);
}
</style>

<script setup>
import { ref, computed, watch, nextTick, defineComponent } from "vue";
import { useChatStore } from "../../model/store";
import gptIcon from "/assets/svg/gpt.svg";
import aiIcon from "/assets/svg/ai.svg";

const props = defineProps({
  aiHelpData: Object,
  handleClose: Function
});

const chatStore = useChatStore();
const inputMessage = ref("");
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const loading = computed(() => chatStore.loading);
const messages = computed(() => chatStore.currentChat?.messages || []);

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;
  
  const userMessage = inputMessage.value;
  inputMessage.value = "";
  
  await nextTick(); 
  await chatStore.sendMessageToOpenAI(apiKey, userMessage);
};

watch(
  () => props.aiHelpData,
  async (newData) => {
    if (newData?.question) {
      let fullMessage = `<b>Вопрос:</b> ${newData.question}`;

      if (Array.isArray(newData?.options) && newData.options.length > 0) {
        fullMessage += `<br/><b>Варианты ответов:</b><br/>` + 
          newData.options.map((opt, i) => `${i + 1}. ${opt}`).join("<br/>");
      }

      await nextTick();
      await chatStore.sendMessageToOpenAI(apiKey, fullMessage);
    }
  },
  { immediate: true }
);

const TypingMessage = defineComponent({
  props: { text: String },
  setup(props) {
    const displayedText = ref("");
    let index = 0;

    const typeText = () => {
      if (index < props.text.length) {
        displayedText.value += props.text[index];
        index++;
        setTimeout(typeText, 30);
      }
    };

    watch(() => props.text, () => {
      displayedText.value = "";
      index = 0;
      typeText();
    }, { immediate: true });

    return () => displayedText.value;
  }
});
</script>
