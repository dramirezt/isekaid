<script setup lang="ts">
import type Character from '@/types/Character'
import CharacterStatusBar from './CharacterStatusBar.vue';

defineProps<{
    character: Character
}>()
</script>

<template>
    <button v-click-hold="{ character: character }" type="button" class="character-btn">
        <img :src="'/src/assets/icons/classes/' + character.class + '.png'" class="icon--xxlarge">
        <CharacterStatusBar :character="character" :type="'health'" :icon="false" />
    </button>
</template>