<script setup lang="ts">
  import GameHeader from "@/components/GameHeader.vue";
  import GameFigure from "@/components/GameFigure.vue";
  import GameWrongLetters from "@/components/GameWrongLetters.vue";
  import GameWord from "@/components/GameWord.vue";
  import GamePopup from "@/components/GamePopup.vue";
  import GameNotification from "@/components/GameNotification.vue";
  import {computed, ref, watch} from "vue";
  import { getRandomName } from './api/getRandomName';

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

  const word = ref('');
  const getRandomWord = async () => {
    try {
      // const {data} = await axios<[0]>('https://random-word-api.herokuapp.com/word');
      const randomWord = await getRandomName();
      word.value = randomWord.toString().toLowerCase();
      // console.log(randomWord);
    } catch (error) {
      console.log(error);
      word.value = '';
    }
  }

  getRandomWord();
  const letters = ref<string[]>([]);

  const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)));
  const wrongLetters = computed(() => letters.value.filter(x => !word.value.includes(x)));

  const notification = ref<InstanceType<typeof GameNotification> | null>(null);
  const popup = ref<InstanceType<typeof GamePopup> | null>(null);
  const isWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)));
  const isLose = computed(() => wrongLetters.value.length === 6);

  watch(wrongLetters, () => {
    if (isLose.value) {
      popup.value?.open('lose');
    }
  });

  watch(correctLetters, () => {
    // if (correctLetters.value.length === word.value.length) {
    //   popup.value?.open('win');
    // }
    if (isWin.value) {
      popup.value?.open('win');
    }
  })
  
  window.addEventListener("keydown", ({key}) => {
    if (isLose.value || isWin.value) return;
    if (letters.value.includes(key)) {
      notification.value?.open();
      setTimeout(() => notification.value?.close(), 2000);
      return;
    }

    if (checkSymbol(key)) {
      letters.value.push(key.toLowerCase());
    }
  })

  const restart = async () => {
    await getRandomWord();
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
