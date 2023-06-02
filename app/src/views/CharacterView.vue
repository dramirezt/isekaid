<script setup lang="ts">
import { reactive } from 'vue';
import { useCharacterStore } from '@/stores/character'
import CharacterProfile from '@/components/CharacterProfile.vue'
import type Character from '@/types/Character';
import CharacterButton from '@/components/CharacterButton.vue';
import CharacterFooter from '@/components/CharacterFooter.vue';

const characterStore = useCharacterStore()

const state = reactive({
    selectedCharacter: <Character>({})
})

function displayCharacterProfile(data: { character: Character }) {
    if (data) {
        state.selectedCharacter = data.character
    }
}

</script>

<template>
    <main class="view-content">
        <div class="character-grid">
            <CharacterButton v-for="character in characterStore.characters" :character="character"
                @click="displayCharacterProfile($event.data)" @hold="displayCharacterProfile($event.data)" />
        </div>
        <CharacterFooter :character="characterStore.characters[0]" />
        <Transition name="fade">
            <div v-if="Object.keys(state.selectedCharacter).length > 0">
                <CharacterProfile :character="state.selectedCharacter" @close="state.selectedCharacter = <Character>({})" />
            </div>
        </Transition>
    </main>
</template>
