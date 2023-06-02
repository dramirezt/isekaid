<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import CharacterStatusPanel from './CharacterStatusPanel.vue'
import CharacterStatisticsPanel from './CharacterStatisticsPanel.vue'
import CharacterResistancesPanel from './CharacterResistancesPanel.vue'
import SkillButton from './SkillButton.vue'
import SkillCard from './SkillCard.vue'
import ViewSelector from './ViewSelector.vue'
import Modal from './Modal.vue'
import type Character from '@/types/Character'
import ResistanceThreshold from '@/types/ResistanceThreshold'
import type CharacterSkill from '@/types/CharacterSkill'
import type Skill from '@/types/Skill'
import getCharacterSkills from '@/composables/GetCharacterSkills'

const state = reactive({
    currentView: 'details'
})

const props = defineProps<{
    character?: Character,
    display: boolean
}>()

watch(
    () => props.character,
    () => {
        state.currentView = 'details'
    }
)

defineEmits(['close'])

const characterActiveSkills = computed((): Array<CharacterSkill> => {
    return getCharacterSkills(props.character, 'active')
})

const characterPassiveSkills = computed((): Array<CharacterSkill> => {
    return getCharacterSkills(props.character, 'passive')
})

type SkillButtonEvent = {
    skill: Skill,
    castable: boolean
}

const skillToDisplay = ref<Skill>()

function displaySkillCard(data: SkillButtonEvent): void {
    skillToDisplay.value = data.skill
}

const views = [
    {
        slug: 'details',
        text: 'Detalles'
    },
    {
        slug: 'skills',
        text: 'Habilidades'
    }
]

</script>

<template>
    <Transition name="slide-left">
        <div class="character-profile" v-if="display && character">
            <div class="view-title">
                <button type="button" class="btn-close" @click="$emit('close')">
                    <img src="@/assets/icons/close.svg" />
                </button>
                <div>
                    {{ character.name }}
                </div>
            </div>
            <ViewSelector :views="views" :current-view="state.currentView" @update-view="state.currentView = $event.data" />
            <div class="view-content">
                <Transition name="fade" mode="out-in">
                    <div class="character-details" v-if="state.currentView == 'details'">
                        <CharacterStatusPanel :character="character" />

                        <CharacterStatisticsPanel :base-color="character.color" :statistics="character.statistics" />

                        <CharacterResistancesPanel :resistances="character.resistances"
                            :threshold="ResistanceThreshold.Resistances" />

                        <CharacterResistancesPanel :resistances="character.resistances"
                            :threshold="ResistanceThreshold.Weakness" />
                    </div>
                    <div class="character-skills" v-else-if="state.currentView == 'skills'">
                        <span class="view-text">Activas</span>
                        <div class="skill-grid">
                            <SkillButton v-for="charSkill in characterActiveSkills" :skill="(charSkill.skill as Skill)"
                                :level="charSkill.level" @click-default="displaySkillCard($event.data)"
                                @hold="displaySkillCard($event.data)" />
                        </div>
                        <span class="view-text">Pasivas</span>
                        <div class="skill-grid">
                            <SkillButton v-for="charSkill in characterPassiveSkills" :skill="(charSkill.skill as Skill)"
                                :level="charSkill.level" @click-default="displaySkillCard($event.data)"
                                @hold="displaySkillCard($event.data)" />
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </Transition>
    <Modal @close="skillToDisplay = undefined" :display="skillToDisplay !== undefined">
        <template v-slot:content>
            <SkillCard :skill="skillToDisplay" v-if="skillToDisplay" />
        </template>
    </Modal>
</template>

<style lang="scss" scoped>
.character-profile {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .view-content {
        height: calc(100vh - 106px);
    }

    .character-details {
        width: 100%;

        >div:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}
</style>