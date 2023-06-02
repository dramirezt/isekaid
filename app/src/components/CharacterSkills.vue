<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSkillStore } from '@/stores/skill'
import type Character from '@/types/Character'
import type Skill from '@/types/Skill'
import type CharacterSkill from '@/types/CharacterSkill'
import SkillButton from './SkillButton.vue'
import SkillCard from './SkillCard.vue'
import SkillType from '@/types/SkillType'
import Modal from './Modal.vue'

const skillStore = useSkillStore()

const props = defineProps<{
    character: Character
}>()

type ParsedSkill = {
    skill: Skill,
    level: number
}

function parseSkill(s: CharacterSkill): ParsedSkill {
    return {
        skill: skillStore.getSkillBySlug(s.skill) as Skill,
        level: s.level
    }
}

const characterParsedSkills = computed((): Array<ParsedSkill> => {
    let skills: Array<ParsedSkill> = []

    props.character?.skills.forEach(s => {
        skills.push(parseSkill(s))
    })

    return skills
})

const characterActiveSkills = computed((): Array<ParsedSkill> => {
    return characterParsedSkills.value.filter(s => {
        return s.skill.type !== SkillType.Passive
    })
})

const characterPassiveSkills = computed((): Array<ParsedSkill> => {
    return characterParsedSkills.value.filter(s => {
        return s.skill.type == SkillType.Passive
    })
})

const skillToDisplay = ref<Skill>()

type SkillButtonEvent = {
    skill: Skill,
    castable: boolean
}

function displaySkillCard(data: SkillButtonEvent): void {
    if (data) {
        skillToDisplay.value = data.skill
    }
}
</script>

<template>
    <span class="view-text">Activas</span>
    <div class="skill-grid">
        <SkillButton v-for="charSkill in characterActiveSkills" :skill="charSkill.skill"
            :level="charSkill.level" @click="displaySkillCard($event.data)"
            @hold="displaySkillCard($event.data)" />
    </div>
    <span class="view-text">Pasivas</span>
    <div class="skill-grid">
        <SkillButton v-for="charSkill in characterPassiveSkills" :skill="charSkill.skill"
            :level="charSkill.level" @click="displaySkillCard($event.data)"
            @hold="displaySkillCard($event.data)" />
    </div>
    
    <Modal @close="skillToDisplay = undefined" :display="skillToDisplay !== undefined">
        <template v-slot:content>
            <SkillCard :skill="skillToDisplay" v-if="skillToDisplay"/>
        </template>
    </Modal>
</template>