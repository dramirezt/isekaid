<script setup lang="ts">
import type Character from '@/types/Character'

defineProps<{
    character: Character
    size: string
}>()
</script>

<template>
    <div class="character-round-icon" :class="['icon--' + size]" :style="'border-color: ' + character.color">
        <img :src="'/src/assets/icons/classes/' + character.class + '.png'">
    </div>
</template>
