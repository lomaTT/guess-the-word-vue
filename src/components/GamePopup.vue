<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  word: string
}

defineProps<Props>();

type Status = 'win' | 'lose';

const gameStatus = ref<Status | null>(null);
const isVisible = ref(false);

const open = (status: Status) => {
  gameStatus.value = status;
  isVisible.value = true;
}

const close = () => {
  isVisible.value = false;
}

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'restart'): void
}>()
</script>


<template>
  <div v-show="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Congrats, you won! 😃</h2>
      <template v-else>
        <h2>You lost... 😕</h2>
        <h3>... word: {{word}}</h3>
      </template>
      <button @click="emit('restart')">Play again</button>
    </div>
  </div>
</template>