<script setup lang="ts">
import CharacterProfile from '@/components/CharacterProfile.vue';
import CharacterSelectButton from '@/components/CharacterSelectButton.vue';
import router from '@/router';
import { useCharacterStore } from '@/stores/character';
import type Character from '@/types/Character';
import { ref } from 'vue';

const characterStore = useCharacterStore()

const profileCharacter = ref<Character>()

function selectCharacter(data: { character: Character }) {
    characterStore.currentCharacter = data.character
    router.push({ name: 'campaign' })
}

function previewCharacter(data: { character: Character }) {
    profileCharacter.value = data.character
}

</script>

<template>
    <header>
        <div class="view-title">
            Elige tu personaje
        </div>
    </header>
    <main>
        <div class="view-content">
            <span class="view-text">Todos</span>
            <CharacterSelectButton v-for="character in characterStore.characters" :character="character"
                @click-default="selectCharacter($event.data)" @hold="previewCharacter($event.data)" />

            <CharacterProfile @close="profileCharacter = undefined" :character="profileCharacter"
                :display="profileCharacter !== undefined" />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.view-content {
    .character-selection-btn {
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}
</style>