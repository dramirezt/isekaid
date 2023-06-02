<script setup lang="ts">
import getSkillIconPath from '@/composables/GetSkillIconPath';
import type Skill from '@/types/Skill';

defineProps<{
    skill: Skill
}>()
</script>

<template>
    <div class="skill-card">
        <div class="skill-card-header">
            <img :src="getSkillIconPath(skill)" class="icon--large">
            <div class="skill-card-title">
                {{ skill.name }}
            </div>
        </div>
        <div class="skill-card-content">
            {{ skill.description }}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
            <br>
            <br>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div class="skill-card-footer">
            <div>
                <img :src="'/src/assets/icons/skills/' + skill.type + '.png'" class="icon--small" />
            </div>
            <div v-if="skill.range">
                <span>{{ skill.range }}</span>
                <img src="@/assets/icons/skills/range.png" class="icon--small" />
            </div>

            <div v-if="skill.targets">
                <span>{{ skill.targets }}</span>
                <img src="@/assets/icons/skills/targets.png" class="icon--small" />
            </div>

            <div v-if="skill.mana">
                <span>{{ skill.mana }}</span>
                <img src="@/assets/icons/statistics/mana.png" class="icon--small" />
            </div>
        </div>
    </div>
</template>
