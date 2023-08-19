<script setup lang="ts">
  import GameHeader from "@/components/GameHeader.vue";
  import GameFigure from "@/components/GameFigure.vue";
  import GameWrongLetters from "@/components/GameWrongLetters.vue";
  import GameWord from "@/components/GameWord.vue";
  import GamePopup from "@/components/GamePopup.vue";
  import GameNotification from "@/components/GameNotification.vue";
  import {computed, ref} from "vue";

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
</script>


<template>
  {{ correctLetters }}
  {{ wrongLetters }}

  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetters :wrongLetters="wrongLetters" />
    <GameWord :word="word" :correctLetters="correctLetters" />
  </div>

  <!-- Container for final message -->
    <GamePopup v-if="false" />
  <!-- Notification -->
    <GameNotification ref="notification" />
</template>
