<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useSkillStore } from '@/stores/skill'
import { useCharacterStore } from './stores/character';

const skillStore = useSkillStore()
const characterStore = useCharacterStore()

onMounted(() => {
  skillStore.fetchSkills()
  characterStore.fetchCharacters()
})
</script>

<template>
  <!--<header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/skills">Skills</RouterLink>
        <RouterLink to="/character">Character</RouterLink>
        <RouterLink to="/character-selection">CharacterSelection</RouterLink>
      </nav>
    </div>
  </header>-->

  <RouterView />
</template>
