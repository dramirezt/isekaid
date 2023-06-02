<script setup lang="ts">
import { computed } from 'vue';
import type Character from '@/types/Character';
import type Skill from '@/types/Skill';
import getSkillIconPath from '@/composables/GetSkillIconPath';
import SkillType from '@/types/SkillType';

const props = defineProps<{
    skill: Skill,
    character?: Character,
    level?: number
}>()

const isCastable = computed((): boolean => {
    return !props.character || props.skill.mana == 1
})

const isPassive = computed((): boolean => {
    return props.skill.type == SkillType.Passive
})
</script>

<template>
    <button class="skill-btn" :class="{ 'disabled': !isCastable }"
        v-click-hold="{ skill: skill, castable: isCastable && !isPassive }">
        <div class="skill-btn-title">
            <span>{{ skill.name }}</span>
        </div>
        <img :src="getSkillIconPath(skill)" class="icon--medium">
        <div>
            <div class="skill-btn-details" v-if="isCastable">
                <div v-if="skill.range">
                    {{ skill.range }}
                    <img src="@/assets/icons/skills/range.png" class="icon--xsmall" />
                </div>

                <div v-if="skill.targets">
                    {{ skill.targets }}
                    <img src="@/assets/icons/skills/targets.png" class="icon--xsmall" />
                </div>

                <div v-if="skill.mana">
                    {{ skill.mana }}
                    <img src="@/assets/icons/statistics/mana.png" class="icon--xsmall" />
                </div>
            </div>
            <div class="skill-nomana" v-else-if="!isPassive">
                MANÁ INSUFICIENTE
            </div>
        </div>
    </button>
</template>
