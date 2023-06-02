<script setup lang="ts">
import { ref } from 'vue'
import type Character from '@/types/Character'
import CharacterRoundIcon from './CharacterRoundIcon.vue'
import CharacterStatusBar from './CharacterStatusBar.vue'
import CharacterProfile from './CharacterProfile.vue'

defineProps<{
    character: Character
}>()

const displayProfile = ref(false)

defineEmits(['show-profile'])
</script>

<template>
    <Transition name="fade">
        <footer v-if="character">
            <button type="button" class="icon--medium" @click="displayProfile = true">
                <CharacterRoundIcon :character="character" :size="'medium'" />
            </button>
            <CharacterStatusBar :character="character" :type="'health'" />
            <CharacterStatusBar :character="character" :type="'mana'" />
        </footer>
    </Transition>

    <CharacterProfile :character="character" :display="displayProfile" @close="displayProfile = false" />
</template>

<style lang="scss">
footer {
    /*position: fixed;
    left: 0;
    bottom: 0;*/
    background-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 56px;
    width: 100%;
    box-shadow: 0 -4px 4px rgba(#000, 0.25);
    position: relative;
    z-index: 2;

    button {
        padding: 0;
        background-color: transparent;
        width: 100%;
    }

    >* {
        &:not(:last-child) {
            margin-right: 30px;
        }
    }
}
</style>