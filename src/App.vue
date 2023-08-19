<script setup lang="ts">
  import GameHeader from "@/components/GameHeader.vue";
  import GameFigure from "@/components/GameFigure.vue";
  import GameWrongLetters from "@/components/GameWrongLetters.vue";
  import GameWord from "@/components/GameWord.vue";
  import GamePopup from "@/components/GamePopup.vue";
  import GameNotification from "@/components/GameNotification.vue";
  import {computed, ref, watch} from "vue";

  const checkSymbol = (symbol: string): boolean => {
    // console.log(symbol);
    if (symbol >= "a" && symbol <= "z" && symbol.length === 1) {
      return true;
    }
    if (symbol >= "A" && symbol <= "Z" && symbol.length === 1) {
      return true;
    }
    return false;
  }

  const word = ref("aliaksei");
  const letters = ref<string[]>([]);

  const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)));
  const wrongLetters = computed(() => letters.value.filter(x => !word.value.includes(x)));

  const notification = ref<InstanceType<typeof GameNotification> | null>(null);
  const popup = ref<InstanceType<typeof GamePopup> | null>(null);

  watch(wrongLetters, () => {
    if (wrongLetters.value.length === 6) {
      popup.value?.open('lose');
    }
  });

  watch(correctLetters, () => {
    if (correctLetters.value.length === word.value.length) {
      popup.value?.open('win');
    }
  })
  
  window.addEventListener("keydown", ({key}) => {
    if (letters.value.includes(key)) {
      notification.value?.open();
      setTimeout(() => notification.value?.close(), 2000);
      return;
    }

    if (checkSymbol(key)) {
      letters.value.push(key.toLowerCase());
    }
  })

  const restart = () => {
    letters.value = [];
    popup.value?.close();
  }
</script>


<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure :wrongLettersCount="wrongLetters.length" />
    <GameWrongLetters :wrongLetters="wrongLetters" />
    <GameWord :word="word" :correctLetters="correctLetters" />
  </div>

  <!-- Container for final message -->
    <GamePopup ref="popup" :word="word" @restart="restart" />
  <!-- Notification -->
    <GameNotification ref="notification" />
</template>
