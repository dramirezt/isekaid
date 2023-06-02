<script setup lang="ts">
import { computed, reactive, onBeforeMount, ref } from 'vue'
import { useCharacterStore } from '@/stores/character'
import CharacterButton from '@/components/CharacterButton.vue'
import CharacterFooter from '@/components/CharacterFooter.vue'
import CharacterProfile from '@/components/CharacterProfile.vue'
import SkillButton from '@/components/SkillButton.vue'
import ViewSelector from '@/components/ViewSelector.vue'
import router from '@/router'
import type Character from '@/types/Character'
import type CharacterSkill from '@/types/CharacterSkill'
import type Skill from '@/types/Skill'
import getCharacterSkills from '@/composables/GetCharacterSkills'
import Modal from '@/components/Modal.vue'
import SkillCard from '@/components/SkillCard.vue'

onBeforeMount(() => {
    if (characterStore.currentCharacter == null) {
        router.push({ name: 'character-selection' })
    }
})

const characterStore = useCharacterStore()

const state = reactive({
    currentView: 'characters'
})

const characterProfile = ref<Character>()

const views = [
    {
        slug: 'characters',
        text: 'Personajes'
    },
    {
        slug: 'skills',
        text: 'Habilidades'
    }
]

function displayCharacterProfile(data: { character: Character }) {
    if (data) {
        characterProfile.value = data.character
    }
}

const characterActiveSkills = computed((): Array<CharacterSkill> => {
    return getCharacterSkills(characterStore.currentCharacter, 'active')
})

const characterPassiveSkills = computed((): Array<CharacterSkill> => {
    return getCharacterSkills(characterStore.currentCharacter, 'passive')
})


type SkillButtonEvent = {
    skill: Skill,
    castable: boolean
}

const skillToDisplay = ref<Skill>()

function displaySkillCard(data: SkillButtonEvent): void {
    skillToDisplay.value = data.skill
}

function useSkill(data: SkillButtonEvent): void {
    console.log('entra en useSkill')
    console.log(data)
}
</script>

<template>
    <div v-if="characterStore.currentCharacter">
        <header class="large">
            <div class="view-title">
                <button type="button" class="btn-close" @click="router.push({ name: 'character-selection' })">
                    <img src="@/assets/icons/arrow.svg" />
                </button>
                {{ characterStore.currentCharacter.name }}
            </div>
            <ViewSelector :views="views" :current-view="state.currentView" @update-view="state.currentView = $event.data" />
        </header>
        <main class="view-content">
            <Transition name="fade" mode="out-in">
                <div class="character-grid" v-if="state.currentView == 'characters'">
                    <CharacterButton v-for="character in characterStore.characters" :character="character"
                        @click="displayCharacterProfile($event.data)" @hold="displayCharacterProfile($event.data)" />
                </div>
                <div v-else-if="state.currentView == 'skills'">
                    <span class="view-text">Activas</span>
                    <div class="skill-grid">
                        <SkillButton v-for="charSkill in characterActiveSkills" :skill="(charSkill.skill as Skill)"
                            :level="charSkill.level" @click-default="useSkill($event.data)"
                            @hold="displaySkillCard($event.data)" />
                    </div>
                    <span class="view-text">Pasivas</span>
                    <div class="skill-grid">
                        <SkillButton v-for="charSkill in characterPassiveSkills" :skill="(charSkill.skill as Skill)"
                            :level="charSkill.level" @click-default="useSkill($event.data)"
                            @hold="displaySkillCard($event.data)" />
                    </div>
                </div>
            </Transition>
        </main>

        <CharacterProfile :character="characterProfile" :display="characterProfile !== undefined"
            @close="characterProfile = undefined" />

        <Modal @close="skillToDisplay = undefined" :display="skillToDisplay !== undefined">
            <template v-slot:content>
                <SkillCard :skill="skillToDisplay" v-if="skillToDisplay" />
            </template>
        </Modal>
        <CharacterFooter :character="characterStore.currentCharacter" />
    </div>
</template>