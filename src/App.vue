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

  const word = ref("Aliaksei");
  const letters = ref<string[]>([]);

  const correctLetters = computed(() => {
    letters.value.filter(x => word.value.includes(x));
  })

  window.addEventListener("keydown", ({key}) => {
    // console.log(key);
    if (checkSymbol(key)) {
      letters.value.push(key.toLowerCase());
    }
  })
</script>


<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetters />
    <GameWord :word="word" />
  </div>

  <!-- Container for final message -->
    <GamePopup v-if="false" />
  <!-- Notification -->
    <GameNotification />
</template>
