<script setup lang="ts">
import type Character from '@/types/Character'

defineProps<{
    character: Character
}>()
</script>

<template>
    <button v-click-hold="{ character: character }" type="button" class="character-selection-btn">
        <img :src="'/src/assets/icons/classes/' + character.class + '.png'" class="icon--xlarge">
        <div>
            <div class="text-title">{{ character.name }}</div>
            <div class="text-subtitle">{{ character.class }}</div>
        </div>
    </button>
</template>